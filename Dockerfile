FROM node:20-alpine3.17 AS builder
ARG CI=true
COPY . /app
WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm
RUN pnpm i && pnpm run build

FROM node:20-alpine3.17 AS prod
ENV workdir=/app
ENV NODE_ENV=prod
WORKDIR ${workdir}
USER root
COPY --from=builder /app/dist/ dist/
COPY .env* .
COPY package.json .
ENTRYPOINT npm run start:prod
