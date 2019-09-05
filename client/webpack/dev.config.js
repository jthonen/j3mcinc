const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './build',
        historyApiFallback: true,
        compress: true,
        port: 3000,
        proxy: {
            '/api/**/**': {
                changeOrigin: true,
                target: "http://localhost:6030",
                secure: true
            }
        }
    }
});
