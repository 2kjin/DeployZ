# Multi-Stage

# jdk 기반 springboot 빌드
FROM openjdk:11-jdk as springboot
COPY ./backend .
RUN chmod +x ./gradlew
RUN ./gradlew clean build

# node 기반 react 빌드
FROM node:18.16.0-alpine as react
COPY --from=springboot /build/libs/*.jar /app.jar
COPY ./frontend .
RUN npm install
RUN npm run build

# 최종 생성될 도커 이미지
FROM openjdk:11-jdk-slim
COPY --from=react /dist /usr/share/nginx/
COPY --from=react /app.jar /home/conf/app.jar

# 필요한 sw 설치
RUN apt-get update &&  apt-get install -y mariadb-server \
    && apt-get install -y uuid-runtime && apt-get update \
     && apt-get install -y git && apt-get update \
     && apt-get install -y nginx && apt-get update \
                 && apt-get install -y redis-server

# timezone 설정
RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY ./install.sh /home/conf/install.sh

# Nginx 설정
COPY ./default.conf /etc/nginx/sites-enabled/default

# 컨테이너를 실행할 때 실행할 명령어
ENTRYPOINT [ "bin/bash", "/home/conf/install.sh" ]
