const path = require('path');
const WebpackConfig = require('webpack-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const child_process = require('child_process');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT = path.join(__dirname, '..');
const VERSION = child_process.execSync('git describe --always', {cwd: ROOT, encoding: 'utf8'});

//noinspection JSUnresolvedFunction,JSUnresolvedVariable
module.exports = new WebpackConfig.Config().merge({

    entry: {
        'app': path.join(ROOT, 'src', 'index.jsx')
    },

    output: {
        filename: '[name].dist.js',
        path: path.join(ROOT, 'dist/'),
        publicPath: "/"
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

    plugins: [
        new CleanWebpackPlugin(
            ['dist'],
            {'root': ROOT}
        ),

        new HtmlWebpackPlugin({
            'template': path.join(ROOT, 'src', 'index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
            // Only add modules from the vendor folder, the key is a string to suppress a linter warning
            'minChunks': function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),

        new webpack.DefinePlugin({
            'VERSION': JSON.stringify(VERSION),
            'BUILD_TIME': JSON.stringify((new Date()).toISOString()),
            'ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'MAIN_API': JSON.stringify(process.env.MAIN_API || "http://localhost:8080"),

            //We do not actually use this, but react does use it internally. Please use the ENV constant.
            //See https://facebook.github.io/react/docs/optimizing-performance.html#use-the-production-build
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),

        // Only load the English and the Dutch Locale for MomentJS (Saves around 70 kB)
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nl/),
    ]
});