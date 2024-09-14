FROM nginx:1.18.0-alpine
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
COPY ./nginx/dev/default.conf /etc/nginx/conf.d

#------------ SSH 키 설정 ------------- 

RUN mkdir /etc/secret
RUN chmod 755 /etc/secret

ARG SSL_FULLCHAIN
ARG SSL_PRIVKEY
ARG SERVER_OPTIONS_SSL_NGINX

ENV SSL_FULLCHAIN=${SSL_FULLCHAIN}
ENV SSL_PRIVKEY=${SSL_PRIVKEY}
ENV SERVER_OPTIONS_SSL_NGINX=${SERVER_OPTIONS_SSL_NGINX}

RUN echo -n "${SSL_FULLCHAIN}" > /etc/secret/fullchain.pem
RUN echo -n "${SSL_PRIVKEY}" > /etc/secret/privkey.pem
RUN echo -n "${SERVER_OPTIONS_SSL_NGINX}}" > /etc/secret/options-ssl-nginx.conf

#----------- 정적 데이터 복사 -----------

COPY ./static/images /etc/static/images
COPY ./static/sound /etc/static/sound

RUN chmod 755 /etc/static/images
RUN chmod 755 /etc/static/sound




