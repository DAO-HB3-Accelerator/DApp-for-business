const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Находим правило для source-map-loader
      const sourceMapRule = webpackConfig.module.rules.find(
        rule => rule.enforce === 'pre' && rule.use && rule.use.loader === 'source-map-loader'
      );

      if (sourceMapRule) {
        // Исключаем @reown/appkit из обработки source-map-loader
        sourceMapRule.exclude = [
          /node_modules\/@reown\/appkit/,
          /node_modules\/@reown\/appkit-ui/,
          /node_modules\/@reown\/appkit-utils/,
          /node_modules\/@reown\/appkit-wallet/
        ];
      }

      return webpackConfig;
    },
  },
}; 