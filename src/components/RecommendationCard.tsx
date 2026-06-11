import {
  PLATFORM_ACTIONS,
  PLATFORM_LABELS,
  type Platform,
} from "@shared/links";
import SpotlightCard from "./SpotlightCard";

interface Props {
  item: RecommendationItem;
  delay?: number;
}

const PLATFORM_COLORS: Record<Platform, string> = {
  weread: "text-blue-400/80",
  qqmusic: "text-green-400/80",
  bilibili: "text-pink-400/80",
};

const PLATFORM_SPOTLIGHT: Record<Platform, string> = {
  weread: "rgba(96, 165, 250, 0.22)",
  qqmusic: "rgba(74, 222, 128, 0.2)",
  bilibili: "rgba(244, 114, 182, 0.22)",
};

const DEFAULT_SPOTLIGHT = "rgba(180, 151, 207, 0.2)";

export default function RecommendationCard({ item, delay = 0 }: Props) {
  const handleOpen = () => {
    if (item.url && window.wuliao) {
      window.wuliao.openExternal(item.url);
    }
  };

  const actionLabel = item.platform
    ? PLATFORM_ACTIONS[item.platform]
    : "去看看";
  const platformLabel = item.platform
    ? PLATFORM_LABELS[item.platform]
    : null;
  const spotlightColor = item.platform
    ? PLATFORM_SPOTLIGHT[item.platform]
    : DEFAULT_SPOTLIGHT;

  return (
    <SpotlightCard
      className="animate-slide-up p-4"
      spotlightColor={spotlightColor}
      style={{ animationDelay: `${delay}ms`, opacity: 0 } as React.CSSProperties}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-text-primary">{item.title}</h3>
            {platformLabel && (
              <span className={`text-xs ${PLATFORM_COLORS[item.platform!]}`}>
                {platformLabel}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-text-secondary">
            {item.description}
          </p>
          {item.reason && (
            <p className="mt-2 text-xs text-accent-muted">{item.reason}</p>
          )}
        </div>
        {item.url && (
          <button
            onClick={handleOpen}
            className="shrink-0 rounded-lg px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/10"
          >
            {actionLabel} →
          </button>
        )}
      </div>
    </SpotlightCard>
  );
}
