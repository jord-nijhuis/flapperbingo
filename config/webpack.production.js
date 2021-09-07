const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const CompressionPlugin = require("compression-webpack-plugin");

//noinspection JSUnresolvedFunction
module.exports =  merge(common,{

    mode: 'production',
    devtool: 'source-map',

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new CompressionPlugin()
    ]
});
