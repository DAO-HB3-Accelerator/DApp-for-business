# Установка базового образа
FROM node:18

# Установка рабочей директории
WORKDIR /app

# Копирование зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всего проекта в контейнер
COPY . .

# Экспонирование порта
EXPOSE 5000

# Команда для запуска приложения
CMD ["node", "server.js"]
