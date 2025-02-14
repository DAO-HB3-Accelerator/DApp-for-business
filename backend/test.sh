#!/bin/bash

# Цвета для вывода
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m"
YELLOW="\033[1;33m"

# Тестовый адрес
ADDRESS="0xf45aa4917b3775ba37f48aeb3dc1a943561e9e0b"
API_URL="http://localhost:3001/api/v1/users/$ADDRESS"

# Проверка доступности сервера
echo -e "${YELLOW}Проверка доступности сервера...${NC}"
if ! curl -s "http://localhost:3001" > /dev/null; then
    echo -e "${RED}Ошибка: Сервер не доступен. Убедитесь, что сервер запущен на порту 3001${NC}"
    exit 1
fi
echo -e "${GREEN}Сервер доступен!${NC}\n"

echo -e "${GREEN}=== Тест 1: Проверка кэширования ===${NC}"

echo -e "\n${YELLOW}Первый запрос (должен быть MISS):${NC}"
curl -s -i "$API_URL" | grep -E "HTTP|X-Cache"

echo -e "\n${YELLOW}Второй запрос (должен быть HIT):${NC}"
curl -s -i "$API_URL" | grep -E "HTTP|X-Cache"

echo -e "\n${GREEN}=== Тест 2: Проверка Rate Limiting ===${NC}"
echo -e "${YELLOW}Отправка 110 запросов (лимит 100):${NC}\n"

for i in {1..110}; do
    response=$(curl -s -w "\n%{http_code}" "$API_URL")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "200" ]; then
        echo -e "${GREEN}Запрос $i: OK${NC}"
    else
        message=$(echo "$body" | grep -o "\"message\":\"[^\"]*\"" | cut -d"\"" -f4)
        echo -e "${RED}Запрос $i: $message${NC}"
    fi
    
    sleep 0.1
done
