const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
    plugins: [
        // Minify JS
        new UglifyJsPlugin({
            sourceMap: false,
            compress: true
        }),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
});
