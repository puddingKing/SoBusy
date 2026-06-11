import RecommendationCard from "./RecommendationCard";

interface Props {
  mood: string;
  result: RecommendResponse;
  onReset: () => void;
}

const SECTIONS = [
  { key: "books" as const, label: "书单", icon: "📖" },
  { key: "music" as const, label: "音乐", icon: "🎵" },
  { key: "videos" as const, label: "影像", icon: "🎬" },
];

export default function Recommendations({ mood, result, onReset }: Props) {
  return (
    <div className="animate-fade-in">
      <div className="glass-panel mb-6 rounded-2xl p-5">
        <p className="mb-2 text-xs text-text-muted">你说</p>
        <p className="mb-4 font-serif text-base italic text-text-primary">
          「{mood}」
        </p>
        <p className="leading-relaxed text-text-secondary">{result.insight}</p>
        <p className="mt-3 text-xs text-text-muted">
          {result.source === "ai" ? "由 AI 为你推荐" : "来自本地精选库"}
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section, sIdx) => {
          const items = result[section.key];
          if (!items?.length) return null;

          return (
            <section key={section.key}>
              <h2
                className="mb-3 flex items-center gap-2 text-sm font-medium text-text-secondary"
                style={{ animationDelay: `${sIdx * 100}ms` }}
              >
                <span>{section.icon}</span>
                {section.label}
              </h2>
              <div className="grid gap-3">
                {items.map((item, idx) => (
                  <RecommendationCard
                    key={`${section.key}-${idx}`}
                    item={item}
                    delay={sIdx * 100 + idx * 80}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <button
        onClick={onReset}
        className="glass-panel mt-8 w-full rounded-2xl py-3 text-sm text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
      >
        换个心情，再来一次
      </button>
    </div>
  );
}
