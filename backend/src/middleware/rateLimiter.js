const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // максимум 100 запросов
  standardHeaders: true, // Возвращать заголовки rate limit info в ответах
  legacyHeaders: false, // Отключить устаревшие заголовки X-RateLimit-*
  message: {
    status: 429,
    error: 'Too Many Requests',
    message: 'Rate limit exceeded. Please try again later.'
  }
});

module.exports = limiter; 