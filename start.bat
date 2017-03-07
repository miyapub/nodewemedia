@echo off
c:
cd Program Files
cd MongoDB
cd Server
cd 3.4
cd bin
start .\mongod.exe --dbpath d:\nodewemedia\db
d:
cd nodewemedia
supervisor bin/www
start http://localhost:3000
