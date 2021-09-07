const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const child_process = require('child_process');

const ROOT = path.join(__dirname, '..');
const VERSION = child_process.execSync('git describe --always', {cwd: ROOT, encoding: 'utf8'});

module.exports = {

    entry: {
        'app': path.join(ROOT, 'src', 'index.jsx')
    },

    output: {
        filename: '[name].dist.js',
        path: path.join(ROOT, 'dist/'),
        publicPath: "/",
        clean: true
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },

    module: {
        rules: [
            // Javascript
            {
                test: /\.js(x)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },

            //CSS
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },

            //SCSS
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },

            //Fonts
            {
                test: /\.(ttf|eot|svg|woff(2)?)$/,
                use: [
                    'file-loader'
                ]
            },

            //Images
            {
                test: /\.(png|jpg)$/,
                use: [
                    'file-loader'
                ]
            }
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            'template': path.join(ROOT, 'src', 'index.html')
        }),

        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(VERSION),
            'BUILD_TIME': JSON.stringify((new Date()).toISOString()),
            'ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        })
    ]
};
