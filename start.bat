@echo off
@echo off
cd D:\Program Files\MongoDB\Server\3.4\bin
start mongod --dbpath d:\github\nodewemedia\db
cd D:\github\nodewemedia
start supervisor bin/www
start http://localhost:3000
