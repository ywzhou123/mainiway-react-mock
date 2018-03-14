const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'mobx',
    'mobx-react',
    'query-string',
    'prop-types',
    'antd',
    'antd/dist/antd.min.css',
    './src/views/dist/jsoneditor.css',
    './src/views/dist/jsoneditor.min.js',
];
module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, "dist/lib"),
        filename: '[name]_[chunkhash].js',
        library: '[name]_[chunkhash]'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[local]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require("autoprefixer")({
                                        browsers: ['last 2 versions', 'ie >= 9']
                                    })
                                ]
                            }
                        }
                    ]
                })
            }
        ]
    }, 
    plugins: [
        new CleanWebpackPlugin(['dist/lib']),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DllPlugin({
            context: __dirname,
            path: 'manifest.json',
            name: '[name]_[chunkhash]'
        }),
        new ExtractTextPlugin('[name]_[chunkhash].css')
    ]
}