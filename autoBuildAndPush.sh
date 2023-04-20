#!/bin/sh
dotnet publish -c release -r ubuntu.22.04-x64 --self-contained --output "./TvoiShopBuild"
cd ./TvoiShopBuild
git add *
git commit --message "Automated build"
git push