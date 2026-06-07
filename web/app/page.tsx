import { Activity } from "lucide-react";

export const dynamic = "force-dynamic";

function apiBaseUrl() {
  const value = process.env.VN_NEWS_API_BASE_URL;
  if (!value) {
    throw new Error("VN_NEWS_API_BASE_URL is required");
  }
  return value;
}

async function getSources() {
  const baseUrl = apiBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/sources`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const data = (await response.json()) as { sources: Array<Record<string, unknown>> };
    return data.sources;
  } catch {
    return [];
  }
}

export default async function Home() {
  const sources = await getSources();
  const enabledCount = sources.filter((source) => source.enabled).length;

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <h1>VN News Intelligence</h1>
          <p>Configured Vietnamese RSS sources.</p>
        </div>
        <div className="status">
          <Activity size={18} />
          <span>{enabledCount} enabled sources</span>
        </div>
      </header>

      <section className="panel">
        <div className="panelHeader">
          <h2>Sources</h2>
          <span>{sources.length} configured</span>
        </div>
        <div className="table">
          <div className="row header">
            <span>Source</span>
            <span>Domain</span>
            <span>Status</span>
            <span>Feeds</span>
          </div>
          {sources.map((source) => (
            <div className="row" key={String(source.source_id)}>
              <span>{String(source.display_name)}</span>
              <span>{String(source.domain)}</span>
              <span>{source.enabled ? "enabled" : String(source.audit_status)}</span>
              <span>{String(source.feed_count)}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
