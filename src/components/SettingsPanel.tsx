import { useState, useEffect } from "react";

interface Props {
  onBack: () => void;
}

export default function SettingsPanel({ onBack }: Props) {
  const [apiKey, setApiKey] = useState("");
  const [apiBaseUrl, setApiBaseUrl] = useState("https://api.openai.com/v1");
  const [model, setModel] = useState("gpt-4o-mini");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.wuliao?.getSettings().then((s) => {
      setApiKey(s.apiKey || "");
      setApiBaseUrl(s.apiBaseUrl || "https://api.openai.com/v1");
      setModel(s.model || "gpt-4o-mini");
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!window.wuliao) return;
    await window.wuliao.saveSettings({ apiKey, apiBaseUrl, model });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-text-muted">
        加载中……
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md animate-fade-in">
      <h2 className="mb-2 font-serif text-xl text-text-primary">设置</h2>
      <p className="mb-6 text-sm leading-relaxed text-text-secondary">
        不配置 API 也能使用——应用会根据你的描述，从本地精选库中推荐内容。
        配置后，可获得更个性化的 AI 推荐。
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm text-text-secondary">
            API Key
          </span>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="glass-panel w-full rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent/50"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm text-text-secondary">
            API 地址
          </span>
          <input
            type="text"
            value={apiBaseUrl}
            onChange={(e) => setApiBaseUrl(e.target.value)}
            placeholder="https://api.openai.com/v1"
            className="glass-panel w-full rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent/50"
          />
          <span className="mt-1 block text-xs text-text-muted">
            支持 OpenAI 兼容接口（如 DeepSeek、通义等）
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm text-text-secondary">
            模型
          </span>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="gpt-4o-mini"
            className="glass-panel w-full rounded-xl px-4 py-2.5 text-sm text-text-primary outline-none focus:border-accent/50"
          />
        </label>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-surface transition-colors hover:bg-accent/90"
        >
          {saved ? "已保存 ✓" : "保存"}
        </button>
        <button
          onClick={onBack}
          className="glass-panel rounded-xl px-5 py-2.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          返回
        </button>
      </div>
    </div>
  );
}
