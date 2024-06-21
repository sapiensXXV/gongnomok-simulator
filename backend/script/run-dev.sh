#!/bin/sh

nginx -g daemon off

# java -jar \
# -javaagent:/backend/pinpoint-agent-2.5.4/pinpoint-bootstrap-2.5.4.jar \
# -Dpinpoint.applicationName=gongnomok-dev-2 \
# -Dpinpoint.config=/backend/pinpoint-agent-2.5.4/pinpoint-root.config \
# -Dspring.profiles.active=dev \
# app.jar

java -jar \
-Dspring.profiles.active=dev \
app.jar