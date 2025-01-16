const User = require('./models/user');

(async () => {
    try {
        await sequelize.sync(); // Создаёт таблицы в базе данных
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
        console.error('Error during database operation:', error);
    }
})();
