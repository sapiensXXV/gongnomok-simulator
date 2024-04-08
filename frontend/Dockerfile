# FROM node:20.11.0-alpine as builder
# WORKDIR /frontend
# COPY package.json .
# COPY vite.config.js .
# RUN npm install

# COPY ./ ./
# RUN npm run build

# FROM nginx
# EXPOSE 80 443
# COPY ./default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder usr/src/app/dist /usr/share/nginx/html

FROM node:20.11.0-bullseye as builder
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.18.0-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY ./default.conf /etc/nginx/conf.d/

COPY --from=builder frontend/dist /usr/share/nginx/html
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]






