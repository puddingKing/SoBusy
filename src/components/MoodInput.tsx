import { useState, useRef, useEffect } from "react";
import BorderGlow from "./BorderGlow";

const AURORA_COLORS = ["#7cff67", "#B497CF", "#5227FF"];

const PROMPTS = [
  "今天什么都不想做，有点空……",
  "刷了半天手机，越刷越无聊",
  "有点累，但又不想睡",
  "心里烦烦的，说不清为什么",
  "想看点什么，但不知道看什么",
];

interface Props {
  onSubmit: (text: string) => void;
  loading: boolean;
  error: string | null;
}

export default function MoodInput({ onSubmit, loading, error }: Props) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (text.trim() && !loading) onSubmit(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-lg animate-fade-in">
        <p className="mb-8 text-center font-serif text-lg leading-relaxed text-text-secondary">
          无聊的时候，
          <br />
          不妨先说说此刻的心情。
        </p>

        <div className="relative">
          <BorderGlow
            className="w-full"
            colors={AURORA_COLORS}
            backgroundColor="rgba(6, 6, 12, 0.82)"
            glowColor="270 55 72"
            borderRadius={16}
            glowRadius={28}
            coneSpread={28}
            fillOpacity={0.25}
            animated
          >
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="随便写点什么……"
              rows={4}
              disabled={loading}
              style={{ background: "rgba(0,0,0,0.85)", borderRadius: 16 }}
              className="w-full resize-none bg-transparent px-5 py-4 text-base leading-relaxed text-text-primary placeholder:text-text-muted outline-none disabled:opacity-60"
            />
          </BorderGlow>
          <div className="mt-2 text-right text-xs text-text-muted">
            ⌘ + Enter 提交
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setText(prompt)}
              disabled={loading}
              className="glass-panel rounded-full px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-400/80">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!text.trim() || loading}
          className="mt-6 w-full rounded-2xl bg-accent py-3.5 text-base font-medium text-surface transition-all hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-surface/30 border-t-surface" />
              正在感受你的心情……
            </span>
          ) : (
            "帮我找找"
          )}
        </button>
      </div>
    </div>
  );
}
