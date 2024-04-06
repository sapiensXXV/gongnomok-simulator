FROM openjdk:17-alpine

ARG JAR_FILE=/build/libs/gongnomok-app.jar

COPY ${JAR_FILE} /gongnomok-app.jar

ENTRYPOINT ["java", "-jar", "gongnomok-app.jar"]