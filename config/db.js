const sequelize = require('./db'); // Подключение к базе данных
const User = require('./models/user'); // Модель пользователя

(async () => {
    try {
        // Синхронизация базы данных
        await sequelize.sync(); 
        console.log('Database synchronized.');

        // Пример создания нового пользователя
        const newUser = await User.create({
            username: 'alex',
            email: 'alex@example.com',
            password: 'hashed_password',
        });

        console.log('New user created:', newUser);

        // Пример запроса существующего пользователя
        const user = await User.findOne({ where: { username: 'alex' } });
        console.log('User found:', user);

    } catch (error) {
        // Вывод ошибок, если что-то пошло не так
        console.error('Error during database operation:', error);
    }
})();
