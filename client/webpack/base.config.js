const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", path.join(__dirname, '../src', 'index.js')],
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            'react': path.resolve(path.join(__dirname, '../node_modules/react')),
            'react-dom': path.resolve(path.join(__dirname, '../node_modules/react-dom'))
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './build/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', "eslint-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /(\.css$)/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }
};
