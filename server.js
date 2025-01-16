const express = require('express');
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Web3 DApp for business!');
});

// Тестирование подключения к базе данных
sequelize.authenticate()
    .then(() => {
        console.log('Подключение к базе данных успешно установлено.');
    })
    .catch((err) => {
        console.error('Ошибка при подключении к базе данных:', err);
    });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
