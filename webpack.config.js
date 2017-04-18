const WebpackConfig = require('webpack-config');

WebpackConfig.environment.setAll({
    env: function() {
        return (process.env.NODE_ENV || 'development').toLowerCase();
    }
});

module.exports = new WebpackConfig.Config().extend('./config/webpack.[env].js');