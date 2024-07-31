FROM openjdk:17-oracle as builder
WORKDIR /backend

# ARG JAR_PATH=backend/gongnomok-api/build/libs/gongnomok-api.jar
# ARG JAR_PATH=build/gongnomok-api.jar
ARG JAR_PATH=gongnomok-api.jar
COPY ${JAR_PATH} app.jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]
