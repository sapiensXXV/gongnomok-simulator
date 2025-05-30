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

ARG HOST_MASTER_DB
ARG HOST_REPLICA_DB_1
ARG HOST_REPLICA_DB_2
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG HOST_REDIS_DB
ARG REDIS_PASSWORD

ENV HOST_MASTER_DB=${HOST_MASTER_DB}
ENV HOST_REPLICA_DB_1=${HOST_REPLICA_DB_1}
ENV HOST_REPLICA_DB_2=${HOST_REPLICA_DB_2}
ENV DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
ENV HOST_REDIS_DB=${HOST_REDIS_DB}
ENV REDIS_PASSWORD=${REDIS_PASSWORD}

ENTRYPOINT [ "java", "-jar", "app.jar" ]
