#!/bin/bash

# Переходим в директорию проекта
cd /Users/maak/Dropbox/Projects/lingwin

# Функция для создания бэкапа
backup() {
    git add .
    git commit -m "Auto backup $(date '+%Y-%m-%d %H:%M:%S')"
    git push
}

# Запускаем fswatch для отслеживания изменений
/opt/homebrew/bin/fswatch -o . | while read -r event; do
    echo "Changes detected at $(date '+%Y-%m-%d %H:%M:%S')"
    backup
done 