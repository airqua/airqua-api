FROM --platform=$BUILDPLATFORM node:19-alpine as build
WORKDIR /build
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./
RUN --mount=type=secret,id=NPM_TOKEN <<EOT
  set -e
  npm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/NPM_TOKEN)
  npm ci
  npm i -D prisma
  npx prisma generate
EOT
COPY . ./
RUN npm run build

FROM --platform=$BUILDPLATFORM node:19-alpine as app
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/prisma ./
COPY --from=build /build/dist ./
RUN --mount=type=secret,id=NPM_TOKEN <<EOT
    set -e
    npm config set //npm.pkg.github.com/:_authToken $(cat /run/secrets/NPM_TOKEN)
    npm ci --only=production
    npm i -D prisma
    npx prisma generate
EOT

FROM node:19-alpine
WORKDIR /app
RUN apk add openssl1.1-compat
COPY --from=app /app ./

CMD VERSION=$(npm pkg get version | xargs) node index.js