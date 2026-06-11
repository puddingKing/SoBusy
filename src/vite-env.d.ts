/// <reference types="vite/client" />

type Platform = "weread" | "qqmusic" | "bilibili";

interface RecommendationItem {
  title: string;
  description: string;
  url?: string;
  platform?: Platform;
  reason?: string;
}

interface RecommendResponse {
  books: RecommendationItem[];
  music: RecommendationItem[];
  videos: RecommendationItem[];
  insight: string;
  source: "local" | "ai";
}

interface Settings {
  apiKey?: string;
  apiBaseUrl?: string;
  model?: string;
}

interface WuliaoAPI {
  getSettings: () => Promise<Settings>;
  saveSettings: (settings: Settings) => Promise<boolean>;
  getRecommendations: (mood: string) => Promise<RecommendResponse>;
  openExternal: (url: string) => Promise<boolean>;
}

interface Window {
  wuliao: WuliaoAPI;
}
