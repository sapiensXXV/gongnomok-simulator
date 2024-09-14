FROM nginx:1.18.0-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/dev/default.conf /etc/nginx/conf.d

#------------ SSH 키 설정 ------------- 

RUN mkdir /etc/secret
RUN chmod 755 /etc/secret

ARG CDN_NGINX_FULLCHAIN
ARG CDN_NGINX_PRIVKEY
ARG CDN_OPTIONS_SSL_NGINX

ENV FULLCHAIN=${CDN_NGINX_FULLCHAIN}
ENV PRIVKEY=${CDN_NGINX_PRIVKEY}
ENV OPTIONS_SSL_NGINX=${CDN_OPTIONS_SSL_NGINX}

RUN echo -n "${FULLCHAIN}" > /etc/secret/fullchain.pem
RUN echo -n "${PRIVKEY}" > /etc/secret/privkey.pem
RUN echo -n "${OPTIONS_SSL_NGINX}}" > /etc/secret/options-ssl-nginx.conf

#----------- 정적 데이터 복사 -----------

RUN mkdir /etc/images
RUN chmod 755 /etc/images


