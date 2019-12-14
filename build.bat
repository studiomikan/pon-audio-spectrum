@echo off
call npm install
call npm run build
copy dist\pon-audio-spectrum.js docs\
copy src\index.html docs\
@echo on
