#!/bin/sh

docker compose -f docker-compose-front.yml rm
docker compose -f docker-compose-front.yml build --no-cache
docker compose -f docker-compose-front.yml push
