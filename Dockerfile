FROM node:20 AS app-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=app-builder /app/build/ /usr/share/nginx/html/
