#!/bin/bash

# Переходим в директорию проекта
cd "$(dirname "$0")"

# Добавляем все изменения
git add .

# Создаем коммит с текущей датой и временем
git commit -m "Auto backup $(date '+%Y-%m-%d %H:%M:%S')"

# Отправляем изменения на GitHub
git push 