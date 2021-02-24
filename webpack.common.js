const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js?x$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/react']
                    }
                }],
                exclude: /node_modules/,
                include: path.join(__dirname, "..")
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/i,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template : __dirname + '/public/index.html'
        }),
        new FaviconsWebpackPlugin('./public/favicon.png'),
        new MiniCssExtractPlugin({        
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name]-[hash].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ],
    output: {
        filename: '[name]-[hash].bundle.js',
        chunkFilename: "[name]-[hash].js",
        path: path.resolve(__dirname, 'build'),
    },
};