const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common')

const ROOT = path.join(__dirname, '..');

//noinspection JSUnresolvedFunction
module.exports =  merge(common, {
    mode: 'development',
    devtool: false,
    devServer: {
        static: './dist',
    },
});
