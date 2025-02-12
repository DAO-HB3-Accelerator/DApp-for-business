# Этап сборки: используем Node.js для установки зависимостей и сборки проекта
FROM node:20-alpine as builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект (команда может быть "npm run build" для Create React App)
RUN npm run build

# Этап продакшн: используем Nginx для отдачи статичных файлов
FROM nginx:alpine

# Копируем собранный билд в директорию для раздачи Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Открываем порт 80, по которому будет доступен сервис
EXPOSE 80

# Запускаем Nginx в foreground режиме
CMD ["nginx", "-g", "daemon off;"]
