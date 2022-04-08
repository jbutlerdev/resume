FROM node as app-builder
WORKDIR /app
COPY . /app/
RUN npm install jquery --save && \
    npm install react-ga --save && \
    npm run build
FROM nginx
COPY --from=app-builder /app/build/ /usr/share/nginx/html/

