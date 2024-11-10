@echo off
echo Iniciando o servidor e app...
start /min cmd /k node ./src/application/start/index.js
timeout /t 3 > nul
start http://localhost:5558
