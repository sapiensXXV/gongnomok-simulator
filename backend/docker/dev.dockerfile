# JAVA
FROM openjdk:17-oracle as builder
WORKDIR /backend

# 핀포인트와 함께 구동시 아래 주석을 해제한다.
# ADD https://github.com/pinpoint-apm/pinpoint/releases/download/v2.5.4/pinpoint-agent-2.5.4.tar.gz /backend/
# RUN tar -zxvf ./pinpoint-agent-2.5.4.tar.gz -C /backend/

# # 핀포인트 설정정보 업데이트
# RUN sed -i 's/profiler.transport.grpc.collector.ip=127.0.0.1/profiler.transport.grpc.collector.ip=175.197.202.8/g' pinpoint-agent-2.5.4/pinpoint-root.config
# RUN sed -i 's/profiler.collector.ip=127.0.0.1/profiler.collector.ip=175.197.202.8/g' pinpoint-agent-2.5.4/pinpoint-root.config

ARG JAR_PATH=gongnomok-api.jar
COPY ${JAR_PATH} app.jar

#ARG DATABASE_URL
ARG MASTER_DB_URL
ARG SLAVE1_DB_URL
ARG SLAVE2_DB_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG REDIS_HOST
ARG REDIS_PASSWORD

#ENV DATABASE_URL=${DATABASE_URL}
ARG MASTER_DB_URL=${MASTER_DB_URL}
ARG SLAVE1_DB_URL=${SLAVE1_DB_URL}
ARG SLAVE2_DB_URL=${SLAVE2_DB_URL}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

ENTRYPOINT [ "java", "-jar", "app.jar" ]
