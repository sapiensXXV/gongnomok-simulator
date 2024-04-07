FROM openjdk:17-oracle

WORKDIR /backend

ARG JAR_FILE=/build/libs/gongnomok-app.jar

COPY ${JAR_FILE} ./gongnomok-app.jar

ENTRYPOINT ["nohup", "java", "-jar", "gongnomok-app.jar", "&"]