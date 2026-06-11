import { buildContentUrl, type ContentLink } from "../shared/links";

export interface ContentItem {
  type: "book" | "music" | "video";
  title: string;
  description: string;
  reason: string;
  tags: string[];
  link: ContentLink;
}

export const CONTENT_POOL: ContentItem[] = [
  // Books → 微信读书
  {
    type: "book",
    title: "《小王子》",
    description: "圣埃克苏佩里的童话，关于孤独、爱与看见",
    reason: "短小温暖，适合在空虚时重读",
    tags: ["empty", "lonely", "warm", "reflective"],
    link: { wereadId: "04e32e30534c9404e504598" },
  },
  {
    type: "book",
    title: "《瓦尔登湖》",
    description: "梭罗在湖畔独居的思考笔记",
    reason: "慢节奏的文字，陪你在安静里沉淀",
    tags: ["calm", "quiet", "reflective", "empty"],
    link: { wereadId: "0af32e00813ab77f7g0103c3" },
  },
  {
    type: "book",
    title: "《解忧杂货店》",
    description: "东野圭吾的治愈系小说",
    reason: "温暖的故事，适合心情低落时",
    tags: ["sad", "lonely", "warm", "anxious"],
    link: { wereadId: "6d132250813ab6e84g017ca5" },
  },
  {
    type: "book",
    title: "《人类简史》",
    description: "尤瓦尔·赫拉利讲述人类发展历程",
    reason: "打开视野，让思绪飞向更远的地方",
    tags: ["empty", "inspiring", "reflective", "lost"],
    link: { wereadId: "d4a322a05d0f04d4a01f0d6" },
  },
  {
    type: "book",
    title: "《心流》",
    description: "米哈里·契克森米哈赖探讨专注与幸福",
    reason: "帮你找到投入一件事的乐趣",
    tags: ["restless", "empty", "inspiring", "reflective"],
    link: { wereadId: "65e328b05e10e265eb76e03" },
  },
  {
    type: "book",
    title: "《挪威的森林》",
    description: "村上春树的长篇小说",
    reason: "在孤独与成长的故事里找到共鸣",
    tags: ["lonely", "sad", "reflective", "calm"],
    link: { wereadId: "60a32bf0813ab7e67g019913" },
  },
  {
    type: "book",
    title: "《被讨厌的勇气》",
    description: "岸见一郎解读阿德勒心理学",
    reason: "焦虑时读一读，或许能轻松一点",
    tags: ["anxious", "lost", "inspiring", "reflective"],
    link: { wereadId: "8b9329607186dc198b9bdab" },
  },
  {
    type: "book",
    title: "《活着》",
    description: "余华讲述福贵的一生",
    reason: "沉重的故事，反而让人珍惜当下",
    tags: ["sad", "reflective", "warm", "calm"],
    link: { wereadId: "33332bf05cbba0333b1efb4" },
  },

  // Music → QQ音乐
  {
    type: "music",
    title: "Weightless — Marconi Union",
    description: "被誉为最放松的科学配乐",
    reason: "焦虑或疲惫时，让呼吸慢下来",
    tags: ["anxious", "tired", "calm", "quiet"],
    link: { qqSongmid: "0006SvSN3ZVE4W" },
  },
  {
    type: "music",
    title: "Pink + White — Frank Ocean",
    description: "来自专辑《Blonde》，情绪细腻流动",
    reason: "适合在深夜独自消化情绪",
    tags: ["sad", "lonely", "reflective", "calm"],
    link: { qqSongmid: "003yZX8R0EU0FG" },
  },
  {
    type: "music",
    title: "Get Lucky — Daft Punk",
    description: "复古电子与现场乐器的融合之作",
    reason: "有点无聊的时候，来点律动感",
    tags: ["empty", "restless", "happy", "energetic"],
    link: { qqSongmid: "004fDVvw1DxZeE" },
  },
  {
    type: "music",
    title: "Jardin — Emilie Simon",
    description: "法语独立流行，轻盈梦幻",
    reason: "像在花园里散步一样轻松",
    tags: ["calm", "quiet", "warm", "empty"],
    link: { searchQuery: "Jardin Emilie Simon" },
  },
  {
    type: "music",
    title: "City of Stars — Ryan Gosling",
    description: "电影《爱乐之城》主题曲",
    reason: "迷茫时听一听，或许能找回一点梦想",
    tags: ["lost", "sad", "inspiring", "lonely"],
    link: { qqSongmid: "000T6ukh1Ja6Ze" },
  },
  {
    type: "music",
    title: "稻香 — 周杰伦",
    description: "关于故乡与简单的幸福",
    reason: "温暖治愈，适合想放松的时刻",
    tags: ["tired", "warm", "calm", "sad"],
    link: { qqSongmid: "003aAYrm3GE0Ac" },
  },
  {
    type: "music",
    title: "Space Oddity — David Bowie",
    description: "大卫·鲍伊的太空民谣经典",
    reason: "想逃离日常无聊的时候",
    tags: ["empty", "restless", "inspiring", "reflective"],
    link: { qqSongmid: "001b1xvV3C6fcp" },
  },
  {
    type: "music",
    title: "Aruarian Dance — Nujabes",
    description: "日系爵士嘻哈，采样《星际牛仔》",
    reason: "发呆的好伴侣",
    tags: ["empty", "calm", "quiet", "reflective"],
    link: { qqSongmid: "003DsauF3AcJ87" },
  },

  // Videos → 哔哩哔哩（均已核对标题匹配）
  {
    type: "video",
    title: "《海蒂和爷爷》",
    description: "瑞士阿尔卑斯山的治愈系电影",
    reason: "视觉和故事都很温暖",
    tags: ["tired", "warm", "calm", "sad"],
    link: { bilibiliSeasonId: "26976" },
  },
  {
    type: "video",
    title: "《心灵奇旅》",
    description: "皮克斯动画，探讨生命的意义",
    reason: "迷茫时看一看，或许有答案",
    tags: ["lost", "empty", "reflective", "inspiring"],
    link: { bilibiliBvid: "BV1jNiwBsEqT" },
  },
  {
    type: "video",
    title: "《地球脉动》",
    description: "BBC 自然纪录片",
    reason: "宏大的画面能转移焦虑的注意力",
    tags: ["anxious", "calm", "quiet", "empty"],
    link: { bilibiliMediaId: "20302" },
  },
  {
    type: "video",
    title: "《布达佩斯大饭店》",
    description: "韦斯·安德森的色彩美学",
    reason: "精美的画面本身就是享受",
    tags: ["empty", "happy", "restless", "calm"],
    link: { searchQuery: "布达佩斯大饭店 电影" },
  },
  {
    type: "video",
    title: "《孤独的美食家》",
    description: "五郎独自觅食的日剧",
    reason: "一个人也可以好好吃饭、好好生活",
    tags: ["lonely", "empty", "warm", "calm"],
    link: { bilibiliBvid: "BV1cb411W7nx" },
  },
  {
    type: "video",
    title: "《肖申克的救赎》",
    description: "关于希望与自由的经典",
    reason: "低落时的力量来源",
    tags: ["sad", "lost", "inspiring", "lonely"],
    link: { bilibiliSeasonId: "28274" },
  },
  {
    type: "video",
    title: "《人生果实》",
    description: "纪录片，记录一对老夫妇的田园生活",
    reason: "慢生活的范本，治愈疲惫",
    tags: ["tired", "calm", "warm", "reflective"],
    link: { bilibiliBvid: "BV1er4y137Zb" },
  },
  {
    type: "video",
    title: "《瞬息全宇宙》",
    description: "多元宇宙冒险，荒诞又感人",
    reason: "想动一动脑子的时候",
    tags: ["restless", "energetic", "empty", "inspiring"],
    link: { bilibiliBvid: "BV1GGVh6kEYs" },
  },
];

export function resolveContentItem(item: ContentItem) {
  const { url, platform } = buildContentUrl(item.type, item.link, item.title);
  return {
    title: item.title,
    description: item.description,
    reason: item.reason,
    url,
    platform,
  };
}
