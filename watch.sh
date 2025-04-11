#!/bin/bash

# Переходим в директорию проекта
cd /Users/maak/Dropbox/Projects/lingwin

# Функция для создания бэкапа
backup() {
    # Проверяем, есть ли изменения для коммита
    if git status --porcelain | grep -q '^.M'; then
        # Получаем список измененных файлов
        changed_files=$(git status --porcelain | cut -c4-)
        
        # Создаем осмысленное сообщение коммита
        commit_msg="backup: $(date '+%Y-%m-%d %H:%M:%S')\n\nChanged files:\n$changed_files"
        
        git add .
        git commit -m "$commit_msg"
        git push
        echo "Backup created successfully"
    fi
}

# Запускаем fswatch для отслеживания изменений файлов
# Флаги:
# -e - исключаем временные файлы и git
# -l 1 - задержка в 1 секунду между событиями
# -0 - разделяем события нулевым байтом
/opt/homebrew/bin/fswatch -e ".*\\.swp$" -e ".*\\.swx$" -e "\\.git/*" -l 1 -0 . | while read -d "" event; do
    echo "File changed at $(date '+%Y-%m-%d %H:%M:%S'): $event"
    backup
done 