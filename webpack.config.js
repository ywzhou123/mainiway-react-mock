const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

const Manifest = require('./manifest.json');
const publicPath = '/';
const excludes = [
    path.join(__dirname, 'node_modules'),
    path.join(__dirname, 'dist')
];

let config = {
    entry: {
        app: path.join(__dirname, 'src/App/entry.js')
    },
    output: {
        publicPath: publicPath,
        path: path.join(__dirname, 'dist'),
        filename: 'scripts/[name].[chunkHash:8].js',
        chunkFilename: 'scripts/[name].[chunkHash:8].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.(js|jsx)$/,
                loader: "eslint-loader",
                include: /src/,
                exclude: excludes,
                options: {
                    // eslint options (if necessary)
                }
            },
            {
                test: /\.bundle\.(js|jsx)$/, // 通过文件名后缀自动处理需要转成bundle的文件
                include: /src/,
                exclude: excludes,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: {
                            name: 'app-[name]',
                            lazy: true
                        }
                    },
                    {
                        loader: 'babel-loader',
                    }
                ]
            },
            {
                test: /.(js|jsx)$/,
                loader: 'babel-loader',
                include: /src/,
                exclude: excludes,
                query: {
                    plugins: [
                        "transform-runtime",
                        "transform-decorators-legacy"
                        // "transform-es2015-shorthand-properties",
                        // "transform-es3-property-literals",
                        // "transform-es3-member-expression-literals",
                    ]
                }
            },
            {
                test: /\.css$/,
                exclude: excludes,
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
            },
            {
                test: /\.scss$/,
                exclude: excludes,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader"
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
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: excludes,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
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
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.ejs$/,
                exclude: excludes,
                loader: 'ejs-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: excludes,
                loader: 'url-loader?name=img/[hash:8].[name].[ext]&limit=8192&outputPath=/'
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                exclude: excludes,
                loader: 'url-loader?name=../fonts/[hash:8].[name].[ext]&outputPath=font/'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'App',
            filename: 'index.html',
            inject: 'body',
            template: path.join(__dirname, 'src/Public/templates/template.html'),
            minify: {
                removeComents: true,
                collapseWhitespace: true,
            },
            publicPath,
            vendorName: Manifest.name,
            // chunks: ['webpack-runtime', 'app', 'commons/commons'],
        }),
        new CleanWebpackPlugin([
            'dist/css',
            'dist/img',
            'dist/scripts',
            'dist/*.html',
            'dist/*.json',
            'dist/*.js'
        ]),
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        new CommonsChunkPlugin({
            name: 'commons',
            filename: 'scripts/[name].[chunkhash:8].js',
            minChunks: 3
        }),
        new CommonsChunkPlugin({
            name: 'webpack-runtime',
            filename: 'scripts/webpack-runtime.[hash:8].js'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json')
        }),
        new ExtractTextPlugin({
            filename: "css/[name].[contenthash:8].css?",
            disable: false,
            allChunks: true
        })
    ]
};


const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

if (isDev) {
    config.devtool = "inline-source-map";
}
if (isProd) {
    config.plugins.push(new UglifyJSPlugin({
        sourceMap: true
    }));
    config.plugins.push(new webpack.HashedModuleIdsPlugin());
    config.plugins.push(new HashOutput({
        manifestFiles: 'webpack-runtime',
    }));
}


module.exports = config;