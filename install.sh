#!/bin/bash

AuthKey=`uuidgen`
Time=`date +%H%M%S`
Time=`echo $Time | base64`
AuthKey=${AuthKey//-/}$Time
AuthKey=${AuthKey//=/}
echo $AuthKey > /AuthKey
echo -n $AuthKey > /home/conf/AuthKey

service mariadb start
service nginx start
redis-server --daemonize yes
mysql -u root -pdeployz -e "create database deployz"
mysql -u root -pdeployz -e "set password = password('deployz')"
java -jar -Duser.timezone=Asia/Seoul home/conf/app.jar
