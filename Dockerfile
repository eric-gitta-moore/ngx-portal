FROM node:20-alpine3.17 AS builder
COPY . /data/app
RUN npm i -g pnpm
RUN pnpm i && pnpm run build

FROM node:20-alpine3.17 AS prod
ENV workdir=/data/app
WORKDIR ${workdir}
USER root
COPY --from=builder /data/app/dist/ ${workdir}
ENTRYPOINT node ${workdir}/app.js
