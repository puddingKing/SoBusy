import {
  buildUrlFromTitle,
  detectPlatformFromUrl,
  type ContentType,
  type Platform,
} from "../shared/links";

export interface RecommendationItem {
  title: string;
  description: string;
  url?: string;
  platform?: Platform;
  reason?: string;
}

export interface RecommendResponse {
  books: RecommendationItem[];
  music: RecommendationItem[];
  videos: RecommendationItem[];
  insight: string;
  source: "local" | "ai";
}

const TYPE_MAP: Record<keyof Pick<RecommendResponse, "books" | "music" | "videos">, ContentType> = {
  books: "book",
  music: "music",
  videos: "video",
};

function enrichItem(
  item: RecommendationItem,
  type: ContentType
): RecommendationItem {
  if (item.url) {
    const platform = item.platform || detectPlatformFromUrl(item.url);
    return platform ? { ...item, platform } : item;
  }

  const { url, platform } = buildUrlFromTitle(type, item.title);
  return { ...item, url, platform };
}

export function enrichRecommendations(response: RecommendResponse): RecommendResponse {
  return {
    ...response,
    books: response.books.map((item) => enrichItem(item, TYPE_MAP.books)),
    music: response.music.map((item) => enrichItem(item, TYPE_MAP.music)),
    videos: response.videos.map((item) => enrichItem(item, TYPE_MAP.videos)),
  };
}
