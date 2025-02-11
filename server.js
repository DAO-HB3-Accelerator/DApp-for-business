require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/user');
const bcrypt = require('bcrypt'); // Используем bcrypt вместо bcryptjs
const { Op } = require('sequelize');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Защита HTTP-заголовков с помощью Helmet
app.use(helmet());

// Устанавливаем ограничение на количество запросов (например, 100 запросов за 15 минут)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 100, // Максимум 100 запросов за 15 минут
    message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Добавляем middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Функция валидации email
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Роут для регистрации пользователя
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Валидация
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        // Проверка существующего пользователя
        const existingUser = await User.findOne({ 
            where: { 
                [Op.or]: [{ username }, { email }] 
            } 
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Хеширование пароля (используем bcrypt)
        const hashedPassword = await bcrypt.hash(password, 12); // Используем соль с 12 раундами

        // Создание пользователя
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Удаляем пароль из ответа
        const userResponse = { ...newUser.toJSON() };
        delete userResponse.password;

        res.status(201).json(userResponse);
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Роут для проверки работы сервера
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Запуск сервера
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        await sequelize.sync();
        console.log('Database synchronized.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
        process.exit(1);
    }
};

startServer();
