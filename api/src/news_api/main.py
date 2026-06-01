from __future__ import annotations

from fastapi import FastAPI
from news_platform.config import load_sources

app = FastAPI(title="VN News Intelligence API", version="0.1.0")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/sources")
def sources() -> dict[str, list[dict]]:
    return {
        "sources": [
            {
                "source_id": source["source_id"],
                "display_name": source["display_name"],
                "domain": source["domain"],
                "enabled": source["enabled"],
                "audit_status": source["audit_status"],
                "feed_count": len(source["feed_discovery"]["feeds"]),
            }
            for source in load_sources()
        ]
    }
