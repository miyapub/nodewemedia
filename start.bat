@echo off
c:
cd Program Files
cd MongoDB
cd Server
cd 3.4
cd bin
start .\mongod.exe --dbpath d:\mp\mp\db
d:
cd mp
cd mp
node bin/www
start http://localhost:3000
