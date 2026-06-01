# syntax=docker/dockerfile:1.7
FROM python:3.12.13-slim AS builder

ENV UV_PROJECT_ENVIRONMENT=/app/.venv
ENV UV_LINK_MODE=copy

COPY --from=ghcr.io/astral-sh/uv:0.11.17 /uv /usr/local/bin/uv

COPY --from=vn-news-platform-lib / /app/vn-news-platform-lib/
WORKDIR /app/vn-news-app

COPY pyproject.toml uv.lock ./
COPY api/pyproject.toml api/pyproject.toml

RUN --mount=type=cache,id=uv-api,sharing=locked,target=/root/.cache/uv \
    uv sync --frozen --no-dev --package news-api --no-install-workspace

COPY api api

RUN --mount=type=cache,id=uv-api,sharing=locked,target=/root/.cache/uv \
    uv sync --frozen --no-dev --package news-api --no-editable

FROM python:3.12.13-slim

WORKDIR /app

ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV VN_NEWS_CONFIG_DIR=/app/configs

RUN addgroup --system app && adduser --system --ingroup app app

COPY --from=builder /app/.venv /app/.venv

USER app

CMD ["uvicorn", "news_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
