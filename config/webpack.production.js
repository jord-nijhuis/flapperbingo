const path = require('path');
const WebpackConfig = require('webpack-config');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

const ROOT = path.join(__dirname, '..');

//noinspection JSUnresolvedFunction
module.exports =  new WebpackConfig.Config().extend(path.join(ROOT, 'config' , 'webpack.common.js')).merge({

    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/
        })
    ]
});
