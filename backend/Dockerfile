# FROM openjdk:17-oracle

# WORKDIR /backend

# ARG JAR_FILE=/build/libs/gongnomok-app.jar

# COPY ${JAR_FILE} ./gongnomok-app.jar

# ENTRYPOINT ["nohup", "java", "-jar", "gongnomok-app.jar", "&"]

FROM openjdk:17-oracle as builder
WORKDIR /backend
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY src src
RUN microdnf install findutils
RUN chmod +x ./gradlew
RUN ./gradlew clean build

FROM openjdk:17-oracle
COPY /build/libs/gongnomok-app.jar ./app-1.1.4.jar
ENTRYPOINT [ "java", "-jar", "/app-1.1.4.jar" ]
VOLUME [ "/tmp" ]