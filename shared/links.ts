export type Platform = "weread" | "qqmusic" | "bilibili";

export type ContentType = "book" | "music" | "video";

export interface ContentLink {
  wereadId?: string;
  qqSongmid?: string;
  bilibiliBvid?: string;
  bilibiliSeasonId?: string;
  bilibiliMediaId?: string;
  searchQuery?: string;
}

export interface ResolvedLink {
  url: string;
  platform: Platform;
}

export function cleanTitleForSearch(title: string): string {
  return title
    .replace(/[《》「」【】]/g, "")
    .replace(/\s*[—–-]\s*.+$/, "")
    .trim();
}

export function wereadBookUrl(id: string): string {
  return `https://weread.qq.com/web/bookDetail/${id}`;
}

export function wereadSearchUrl(query: string): string {
  return `https://weread.qq.com/web/search/books?keyword=${encodeURIComponent(query)}`;
}

export function qqMusicSongUrl(songmid: string): string {
  return `https://y.qq.com/n/ryqq/songDetail/${songmid}`;
}

export function qqMusicSearchUrl(query: string): string {
  return `https://y.qq.com/n/ryqq/search?w=${encodeURIComponent(query)}`;
}

export function bilibiliVideoUrl(bvid: string): string {
  return `https://www.bilibili.com/video/${bvid}`;
}

export function bilibiliSeasonUrl(seasonId: string): string {
  return `https://www.bilibili.com/bangumi/play/ss${seasonId}`;
}

export function bilibiliMediaUrl(mediaId: string): string {
  return `https://www.bilibili.com/bangumi/media/md${mediaId}`;
}

export function bilibiliSearchUrl(query: string): string {
  return `https://search.bilibili.com/all?keyword=${encodeURIComponent(query)}`;
}

export function buildContentUrl(
  type: ContentType,
  link: ContentLink,
  title?: string
): ResolvedLink {
  if (type === "book") {
    if (link.wereadId) {
      return { url: wereadBookUrl(link.wereadId), platform: "weread" };
    }
    const query = link.searchQuery || (title ? cleanTitleForSearch(title) : "");
    return { url: wereadSearchUrl(query), platform: "weread" };
  }

  if (type === "music") {
    if (link.qqSongmid) {
      return { url: qqMusicSongUrl(link.qqSongmid), platform: "qqmusic" };
    }
    const query = link.searchQuery || (title ? cleanTitleForSearch(title) : "");
    return { url: qqMusicSearchUrl(query), platform: "qqmusic" };
  }

  if (link.bilibiliBvid) {
    return { url: bilibiliVideoUrl(link.bilibiliBvid), platform: "bilibili" };
  }
  if (link.bilibiliSeasonId) {
    return {
      url: bilibiliSeasonUrl(link.bilibiliSeasonId),
      platform: "bilibili",
    };
  }
  if (link.bilibiliMediaId) {
    return {
      url: bilibiliMediaUrl(link.bilibiliMediaId),
      platform: "bilibili",
    };
  }
  const query = link.searchQuery || (title ? cleanTitleForSearch(title) : "");
  return { url: bilibiliSearchUrl(query), platform: "bilibili" };
}

export function buildUrlFromTitle(type: ContentType, title: string): ResolvedLink {
  return buildContentUrl(type, { searchQuery: cleanTitleForSearch(title) }, title);
}

export function detectPlatformFromUrl(url: string): Platform | undefined {
  if (url.includes("weread.qq.com")) return "weread";
  if (url.includes("y.qq.com") || url.includes("i.y.qq.com")) return "qqmusic";
  if (url.includes("bilibili.com") || url.includes("b23.tv")) return "bilibili";
  return undefined;
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  weread: "微信读书",
  qqmusic: "QQ音乐",
  bilibili: "哔哩哔哩",
};

export const PLATFORM_ACTIONS: Record<Platform, string> = {
  weread: "去微信读书",
  qqmusic: "去QQ音乐听",
  bilibili: "去B站看",
};
