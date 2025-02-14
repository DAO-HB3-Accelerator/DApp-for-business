const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const cached = res.getHeader('X-Cache') === 'HIT' ? '(cached)' : '';
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms ${cached}`
    );
  });
  next();
};

module.exports = logger; 