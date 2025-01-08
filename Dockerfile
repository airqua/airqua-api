FROM --platform=$BUILDPLATFORM node:20-alpine as build
WORKDIR /build
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./
RUN npm ci
RUN npm i -D prisma
RUN npx prisma generate
COPY . ./
RUN npm run build

FROM --platform=$BUILDPLATFORM node:20-alpine as app
WORKDIR /app
COPY --from=build /build/package*.json ./
COPY --from=build /build/prisma ./
COPY --from=build /build/dist ./
RUN npm ci --only=production
RUN npm i -D prisma
RUN npx prisma generate

RUN apk add python3 make c++
RUN npm rebuild bcrypt --build-from-source

FROM node:20-alpine
WORKDIR /app
COPY --from=app /app ./

CMD VERSION=$(npm pkg get version | xargs) node index.js