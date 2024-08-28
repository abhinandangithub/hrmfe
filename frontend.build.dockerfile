FROM node:12-alpine as ui_builder

WORKDIR /app

ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_DOCKER=true

COPY package.json ./

COPY package-lock.json ./

RUN npm install --ci

COPY . ./

RUN npm run build

FROM nginx:stable-alpine as ui

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=ui_builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]