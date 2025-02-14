const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const rateLimiter = require('./middleware/rateLimiter');
const { middleware: cacheMiddleware, cache } = require('./middleware/cache');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(rateLimiter);

// Базовый роут с документацией API
app.get('/', cacheMiddleware(300), (req, res) => {
  res.json({
    message: 'DApp Backend API',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: {
        get: {
          path: '/api/v1/users/:address',
          description: 'Get user data by wallet address',
          example: '/api/v1/users/0x1234...'
        }
      },
      transactions: {
        get: {
          path: '/api/v1/transactions/:address',
          description: 'Get user transactions by wallet address',
          example: '/api/v1/transactions/0x1234...'
        }
      }
    }
  });
});

// API routes с кэшированием
app.use('/api', cacheMiddleware(60), apiRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      '/',
      '/api/v1/users/:address',
      '/api/v1/transactions/:address'
    ]
  });
});

// Регистрируем обработчик ошибок
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Documentation available at http://localhost:${PORT}`);
  
  // Вывод статистики кэша каждую минуту
  setInterval(() => {
    const stats = cache.getStats();
    console.log('\nCache Statistics:');
    console.log(`Hits: ${stats.hits}`);
    console.log(`Misses: ${stats.misses}`);
    console.log(`Keys: ${cache.keys().length}`);
  }, 60000);
}); 