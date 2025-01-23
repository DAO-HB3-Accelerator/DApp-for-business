// Подключаем необходимые модули
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/user');
require('dotenv').config();  // Подключаем dotenv для работы с переменными окружения

// Создаем экземпляр приложения
const app = express();
const PORT = process.env.PORT || 5000;  // Используем переменную окружения для порта, если она указана

// Вытягиваем переменные окружения для использования в коде
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


// Функция для синхронизации базы данных и работы с пользователями
(async () => {
    try {
        // Синхронизация базы данных
        await sequelize.sync();
        console.log('Database synchronized.');

        // Создание нового пользователя (псевдокод, используйте хеширование пароля в реальном проекте)
        const newUser = await User.create({
            username: 'alex',
            email: 'alex@example.com',
            password: 'hashed_password', // Здесь должен быть хешированный пароль
        });

        console.log('New user created:', newUser);

        // Поиск пользователя по имени
        const user = await User.findOne({ where: { username: 'alex' } });
        console.log('User found:', user);

    } catch (error) {
        console.error('Error during database operation:', error);
    }
})();

// Роут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Запуск сервера на указанном порту
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
