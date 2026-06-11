import { contextBridge, ipcRenderer } from "electron";

export interface Settings {
  apiKey?: string;
  apiBaseUrl?: string;
  model?: string;
}

export interface RecommendationItem {
  title: string;
  description: string;
  url?: string;
  platform?: "weread" | "qqmusic" | "bilibili";
  reason?: string;
}

export interface RecommendResponse {
  books: RecommendationItem[];
  music: RecommendationItem[];
  videos: RecommendationItem[];
  insight: string;
  source: "local" | "ai";
}

contextBridge.exposeInMainWorld("wuliao", {
  getSettings: (): Promise<Settings> => ipcRenderer.invoke("get-settings"),
  saveSettings: (settings: Settings): Promise<boolean> =>
    ipcRenderer.invoke("save-settings", settings),
  getRecommendations: (mood: string): Promise<RecommendResponse> =>
    ipcRenderer.invoke("get-recommendations", { mood }),
  openExternal: (url: string): Promise<boolean> =>
    ipcRenderer.invoke("open-external", url),
});
