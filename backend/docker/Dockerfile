FROM openjdk:17-oracle as builder
WORKDIR /backend

ARG JAR_PATH=gongnomok-api.jar
ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD

COPY ${JAR_PATH} app.jar

ENTRYPOINT [ "java", "-jar", "app.jar" ]

# ENTRYPOINT [ "java", \
# "-Dspring.datasource.url=${DATABASE_URL}", \
# "-Dspring.datasource.username=${DATABASE_USERNAME}", \
# "-Dspring.datasource.password=${DATABASE_PASSWORD}", \
# "-jar", "app.jar"]
