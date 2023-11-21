FROM node:20-alpine3.17 AS builder
ARG CI=true
WORKDIR /app
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm
COPY . /app
RUN pnpm i && pnpm run build:prod

FROM node:20-alpine3.17 AS prod
ENV workdir=/app NODE_ENV=prod
USER root
RUN apk --no-cache add curl
WORKDIR ${workdir}
COPY package.json .
COPY .env* .
COPY --from=builder /app/dist/ dist/
EXPOSE 3001
HEALTHCHECK CMD curl http://localhost:3001 -f || exit 1
ENTRYPOINT npm run start:prod
