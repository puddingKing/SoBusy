import { useState } from "react";
import Aurora from "./components/Aurora";
import MoodInput from "./components/MoodInput";
import Recommendations from "./components/Recommendations";
import SettingsPanel from "./components/SettingsPanel";

const AURORA_COLORS = ["#7cff67", "#B497CF", "#5227FF"] as const;

type View = "home" | "settings";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (text: string) => {
    if (!text.trim() || !window.wuliao) return;

    setMood(text);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await window.wuliao.getRecommendations(text.trim());
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "获取推荐失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMood("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#050508]">
      <div className="pointer-events-none absolute inset-0">
        <Aurora
          colorStops={[...AURORA_COLORS]}
          amplitude={0.9}
          blend={0.45}
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <header className="drag-region relative z-10 flex shrink-0 items-center justify-between px-6 pb-2 pt-10">
        <div className="no-drag flex items-baseline gap-3">
          <h1 className="font-serif text-2xl tracking-wide text-text-primary">
            无聊
          </h1>
          <span className="text-sm text-text-muted">此刻，你想做什么？</span>
        </div>
        <button
          onClick={() => setView(view === "home" ? "settings" : "home")}
          className="no-drag rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-overlay hover:text-text-primary"
        >
          {view === "home" ? "设置" : "返回"}
        </button>
      </header>

      <main className="relative z-10 flex flex-1 flex-col overflow-hidden px-6 pb-6">
        {view === "settings" ? (
          <SettingsPanel onBack={() => setView("home")} />
        ) : (
          <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
            {!result ? (
              <MoodInput
                onSubmit={handleSubmit}
                loading={loading}
                error={error}
              />
            ) : (
              <Recommendations
                mood={mood}
                result={result}
                onReset={handleReset}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
