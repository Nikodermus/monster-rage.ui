import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import entryModule from './index';

const configDev = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        compress: true,
        hot: true,
        inline: true,
        open: true,
        port: 7000,
        contentBase: path.resolve(__dirname),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    cache: true,
                    failOnError: true,
                },
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ],
                    ],
                },
            },
            {
                test: /\.css$/,
                loader: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            import: false,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'stylus-loader'],
            },
            {
                loader: 'url-loader?limit=10000',
                test: /\.(woff|woff2|eot|ttf)$/,
                options: {
                    name: 'css/fonts/[name].[ext]',
                },
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: 'images/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/base/index.html'),
            title: 'Monster Rage',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'all',
                    enforce: true,
                    name: 'vendor',
                    test: /node_modules/,
                },
            },
        },
    },
};

const moduleDev = {
    ...configDev,
    ...entryModule,
};

export default moduleDev;
