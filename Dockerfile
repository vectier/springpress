# Install required dependencies only when needed
FROM node:lts-alpine AS deps

WORKDIR /opt/webserver
COPY package.json yarn.lock .
RUN yarn install --frozen-lockfile

# Rebuild the source code of application only when needed
FROM node:lts-alpine AS builder

WORKDIR /opt/webserver
COPY --from=deps /opt/webserver/node_modules ./node_modules
COPY . .
RUN yarn build

# For running the application
FROM node:lts-alpine AS runner

WORKDIR /opt/webserver

ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

COPY --from=builder /opt/webserver/package.json .
COPY --from=builder --chown=app:nodejs /opt/webserver/dist ./dist

RUN yarn install --frozen-lockfile --production

USER app
EXPOSE 3000

CMD [ "yarn", "start" ]
