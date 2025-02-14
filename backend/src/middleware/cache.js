const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 минут

const cacheMiddleware = (duration) => (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    res.setHeader('X-Cache', 'HIT');
    res.json(cachedResponse);
    return;
  }

  res.originalJson = res.json;
  res.json = (body) => {
    res.setHeader('X-Cache', 'MISS');
    cache.set(key, body, duration);
    res.originalJson(body);
  };
  next();
};

module.exports = {
  middleware: cacheMiddleware,
  cache: cache
}; 