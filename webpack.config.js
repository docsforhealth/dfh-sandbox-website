const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    { loader: 'sass-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/i,
                use: 'file-loader',
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: /node_modules/,
                use: ['url-loader'],
            },
            // So that automatic image-requiring of `html-loader` can co-exist with
            // the html pre-processing of `html-webpack-plugin`
            // see: https://github.com/webpack-contrib/html-loader/issues/195#issuecomment-461315765
            {
                test: /\.ejs$/,
                exclude: /node_modules/,
                use: ['extract-loader', 'html-loader', 'ejs-loader'],
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.ejs',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
}
