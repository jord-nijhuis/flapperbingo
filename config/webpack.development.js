const path = require('path');
const WebpackConfig = require('webpack-config');
const webpack = require('webpack');

const ROOT = path.join(__dirname, '..');

//noinspection JSUnresolvedFunction
module.exports =  new WebpackConfig.Config().extend(path.join(ROOT, 'config' , 'webpack.common.js')).merge({

    devtool: 'source-map',

    entry: {
        'hot':
            [
                'webpack/hot/only-dev-server',
                'webpack-dev-server/client?http://localhost:80',
                'react-hot-loader/patch'
            ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
