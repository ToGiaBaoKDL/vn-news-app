FROM node:22-bookworm AS deps

WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm ci

FROM node:22-bookworm AS build

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY web/ ./
RUN npm run build

FROM node:22-bookworm AS runtime

WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app ./

CMD ["npm", "run", "start"]
