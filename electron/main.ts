import { app, BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import fs from "fs";
import { CONTENT_POOL, resolveContentItem } from "./content-pool";
import { enrichRecommendations, type RecommendResponse } from "./enrich";

const isDev = !app.isPackaged;
const SETTINGS_PATH = path.join(app.getPath("userData"), "settings.json");

interface Settings {
  apiKey?: string;
  apiBaseUrl?: string;
  model?: string;
}

function loadSettings(): Settings {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      return JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf-8"));
    }
  } catch {
    // ignore corrupt settings
  }
  return {};
}

function saveSettings(settings: Settings): void {
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
}

function createWindow(): void {
  const win = new BrowserWindow({
    width: 960,
    height: 720,
    minWidth: 720,
    minHeight: 560,
    title: "无聊",
    backgroundColor: "#050508",
    titleBarStyle: process.platform === "darwin" ? "hiddenInset" : "default",
    trafficLightPosition: { x: 16, y: 18 },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("get-settings", () => loadSettings());

ipcMain.handle("save-settings", (_event, settings: Settings) => {
  saveSettings(settings);
  return true;
});

ipcMain.handle("open-external", (_event, url: string) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    shell.openExternal(url);
    return true;
  }
  return false;
});

interface RecommendRequest {
  mood: string;
  apiKey?: string;
  apiBaseUrl?: string;
  model?: string;
}

ipcMain.handle("get-recommendations", async (_event, req: RecommendRequest) => {
  const settings = loadSettings();
  const apiKey = req.apiKey || settings.apiKey;
  const apiBaseUrl = req.apiBaseUrl || settings.apiBaseUrl || "https://api.openai.com/v1";
  const model = req.model || settings.model || "gpt-4o-mini";

  if (apiKey) {
    try {
      const result = await fetchAIRecommendations(req.mood, apiKey, apiBaseUrl, model);
      return result;
    } catch (err) {
      console.error("AI recommendation failed, falling back to local:", err);
    }
  }

  return getLocalRecommendations(req.mood);
});

async function fetchAIRecommendations(
  mood: string,
  apiKey: string,
  apiBaseUrl: string,
  model: string
): Promise<RecommendResponse> {
  const systemPrompt = `你是「无聊」应用的心情推荐助手。用户感到无聊时会描述自己的心情或想法，你需要根据描述推荐合适的内容。

请严格返回 JSON，格式如下：
{
  "insight": "一段温暖、简短的理解与回应（2-3句话）",
  "books": [{"title": "书名", "description": "一句话介绍", "reason": "为什么适合此刻"}],
  "music": [{"title": "歌名 - 艺术家", "description": "一句话介绍", "reason": "为什么适合此刻"}],
  "videos": [{"title": "片名/视频名", "description": "一句话介绍", "reason": "为什么适合此刻"}]
}

每类推荐 2-3 条。推荐要具体、有品味，贴合用户当下心境。书名请带《》；音乐格式为「歌名 - 艺术家」；视频名请带《》。用中文回复。`;

  const response = await fetch(`${apiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `我现在的心情/想法是：${mood}` },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty AI response");

  const parsed = JSON.parse(content);
  return enrichRecommendations({
    insight: parsed.insight || "也许，此刻的无聊也是一种休息。",
    books: parsed.books || [],
    music: parsed.music || [],
    videos: parsed.videos || [],
    source: "ai",
  });
}

function getLocalRecommendations(mood: string): RecommendResponse {
  const text = mood.toLowerCase();
  const tags = detectMoodTags(text);

  const pool = CONTENT_POOL;
  const scored = pool.map((item) => ({
    item,
    score: item.tags.filter((t) => tags.includes(t)).length,
  }));

  scored.sort((a, b) => b.score - a.score);

  const pick = (type: "book" | "music" | "video", count: number) => {
    const filtered = scored.filter((s) => s.item.type === type);
    const selected = filtered.length > 0 ? filtered : scored;
    return selected.slice(0, count).map((s) => resolveContentItem(s.item));
  };

  const insight = generateInsight(tags, mood);

  return {
    insight,
    books: pick("book", 3),
    music: pick("music", 3),
    videos: pick("video", 3),
    source: "local",
  };
}

function detectMoodTags(text: string): string[] {
  const moodMap: Record<string, string[]> = {
    空虚: ["empty", "quiet"],
    无聊: ["empty", "restless"],
    累: ["tired", "calm"],
    疲惫: ["tired", "calm"],
    烦: ["restless", "anxious"],
    焦虑: ["anxious", "calm"],
    紧张: ["anxious", "calm"],
    孤独: ["lonely", "warm"],
    寂寞: ["lonely", "warm"],
    迷茫: ["lost", "inspiring"],
    困惑: ["lost", "inspiring"],
    难过: ["sad", "warm"],
    伤心: ["sad", "warm"],
    低落: ["sad", "warm"],
    开心: ["happy", "energetic"],
    兴奋: ["happy", "energetic"],
    平静: ["calm", "quiet"],
    安静: ["calm", "quiet"],
    想动: ["energetic", "restless"],
    发呆: ["empty", "quiet"],
    思考: ["reflective", "inspiring"],
    想学: ["inspiring", "reflective"],
    放松: ["calm", "quiet"],
    治愈: ["warm", "calm"],
  };

  const tags = new Set<string>();
  for (const [keyword, tagList] of Object.entries(moodMap)) {
    if (text.includes(keyword)) {
      tagList.forEach((t) => tags.add(t));
    }
  }

  if (tags.size === 0) tags.add("empty");
  return Array.from(tags);
}

function generateInsight(tags: string[], mood: string): string {
  const insights: Record<string, string> = {
    empty: "无聊有时候是大脑在请求一点新鲜感。不必急着填满它，先听听自己想什么。",
    tired: "累了就慢一点。好的休息不是浪费时间，是在给明天的自己充电。",
    anxious: "焦虑说明你在乎。深呼吸，先照顾好自己的感受，再决定下一步。",
    lonely: "孤独并不等于孤单。此刻有人（包括我）在听你说。",
    lost: "迷茫是转变的前奏。你不需要立刻看清整条路，看清下一步就够了。",
    sad: "难过的时候，允许自己软下来。温柔地对待自己，本身就是一种力量。",
    happy: "开心的时刻值得被记住。不妨把这份好心情分享给一本书或一首歌。",
    calm: "平静是难得的礼物。享受这份宁静，让它多停留一会儿。",
    energetic: "有劲儿的时候，正好去探索一点新鲜的东西。",
    restless: "心里痒痒的？也许你需要一个小的冒险，而不是大的决定。",
    warm: "你值得被温柔对待。这些内容或许能给你一点陪伴。",
    inspiring: "好奇心是很好的向导。跟着它走走看。",
    reflective: "思考的时刻很珍贵。一些慢节奏的内容或许能陪你一起想。",
    quiet: "安静没什么不好。在沉默里，有时候反而能听见自己。",
  };

  const primary = tags[0] || "empty";
  const base = insights[primary] || insights.empty;

  if (mood.length > 20) {
    return `${base} 你说的「${mood.slice(0, 30)}${mood.length > 30 ? "…" : ""}」，我听到了。`;
  }
  return base;
}
