const express = require('express');
const sequelize = require('./db');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Ваши текущие операции с базой данных остаются в отдельной функции
(async () => {
    try {
        await sequelize.sync();
        console.log('Database synchronized.');

        const newUser = await User.create({
            username: 'alex',
            email: 'alex@example.com',
            password: 'hashed_password',
        });

        console.log('New user created:', newUser);

        const user = await User.findOne({ where: { username: 'alex' } });
        console.log('User found:', user);

    } catch (error) {
        console.error('Error during database operation:', error);
    }
})();

// Добавляем сервер для постоянного прослушивания запросов
app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

