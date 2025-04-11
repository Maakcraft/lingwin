#!/bin/bash

# Переходим в директорию проекта
cd /Users/maak/Dropbox/Projects/lingwin

# Функция для создания бэкапа
backup() {
    # Проверяем, есть ли изменения для коммита
    if git status --porcelain | grep -q '^.M'; then
        git add .
        git commit -m "Auto backup $(date '+%Y-%m-%d %H:%M:%S')"
        git push
        echo "Backup created successfully"
    fi
}

# Запускаем fswatch для отслеживания только открытия файлов
# Флаги:
# -e ".*" - исключаем временные файлы
# --event OpenFD - только события открытия файла
/opt/homebrew/bin/fswatch -e ".*\\.swp$" -e ".*\\.swx$" -e "\\.git/*" --event OpenFD . | while read -r event; do
    echo "File opened at $(date '+%Y-%m-%d %H:%M:%S'): $event"
    # Ждем 2 секунды, чтобы файл успел измениться
    sleep 2
    backup
done 