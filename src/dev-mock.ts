import { buildContentUrl } from "@shared/links";

function mockItem(
  type: "book" | "music" | "video",
  title: string,
  description: string,
  reason: string,
  link: Parameters<typeof buildContentUrl>[1]
): RecommendationItem {
  const { url, platform } = buildContentUrl(type, link, title);
  return { title, description, reason, url, platform };
}

const MOCK_RESPONSE: RecommendResponse = {
  insight:
    "无聊有时候是大脑在请求一点新鲜感。不必急着填满它，先听听自己想什么。",
  books: [
    mockItem("book", "《小王子》", "圣埃克苏佩里的童话，关于孤独、爱与看见", "短小温暖，适合在空虚时重读", { wereadId: "04e32e30534c9404e504598" }),
    mockItem("book", "《瓦尔登湖》", "梭罗在湖畔独居的思考笔记", "慢节奏的文字，陪你在安静里沉淀", { wereadId: "0af32e00813ab77f7g0103c3" }),
    mockItem("book", "《人类简史》", "尤瓦尔·赫拉利讲述人类发展历程", "打开视野，让思绪飞向更远的地方", { wereadId: "d4a322a05d0f04d4a01f0d6" }),
  ],
  music: [
    mockItem("music", "Weightless — Marconi Union", "被誉为最放松的科学配乐", "让呼吸慢下来", { qqSongmid: "0006SvSN3ZVE4W" }),
    mockItem("music", "Aruarian Dance — Nujabes", "日系爵士嘻哈", "发呆的好伴侣", { qqSongmid: "003DsauF3AcJ87" }),
    mockItem("music", "稻香 — 周杰伦", "关于故乡与简单的幸福", "温暖治愈", { qqSongmid: "003aAYrm3GE0Ac" }),
  ],
  videos: [
    mockItem("video", "《海蒂和爷爷》", "瑞士阿尔卑斯山的治愈系电影", "视觉和故事都很温暖", { bilibiliSeasonId: "26976" }),
    mockItem("video", "《地球脉动》", "BBC 自然纪录片", "宏大的画面能转移注意力", { bilibiliMediaId: "20302" }),
    mockItem("video", "《孤独的美食家》", "五郎独自觅食的日剧", "一个人也可以好好生活", { bilibiliBvid: "BV1cb411W7nx" }),
  ],
  source: "local",
};

export function setupDevMock(): void {
  if (window.wuliao) return;

  window.wuliao = {
    getSettings: async () => ({}),
    saveSettings: async () => true,
    getRecommendations: async () => {
      await new Promise((r) => setTimeout(r, 800));
      return MOCK_RESPONSE;
    },
    openExternal: async (url) => {
      window.open(url, "_blank");
      return true;
    },
  };
}
