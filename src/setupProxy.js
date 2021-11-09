const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.openweathermap.org/data/2.5/weather',
      changeOrigin: true,
    })
  );
};