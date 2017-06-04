const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const CommonsPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');


const config = require('./gulp/config.js').site;




module.exports = {
    entry: {
        main: './_theme/'+ config.siteTheme +'/main.js',
    },
    output: {
        //plugin pare resolver path relativo
        path: path.resolve(__dirname, '_theme/'+ config.siteTheme +'/assets/'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            { loader: "css-loader", options: { minify: true } },
                            {loader: 'autoprefixer-loader'},
                            {loader: 'postcss-loader'},
                            { loader: "sass-loader" }
                        ],
                        publicPath: ''
                    }) //extract text
            },
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    { loader: "file-loader?name=[name].[ext]&outputPath=img/" },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false
                            },
                            // svgo:{},
                            mozjpeg: {
                                progressive: true,
                                optimizationLevel: 7,
                            }
                        }
                    }
                ]
            },
            {
                test: [/MaterialIcons-Regular.eot/, /MaterialIcons-Regular.woff2/, /MaterialIcons-Regular.woff/, /MaterialIcons-Regular.ttf/],
                loader: 'file?name=fonts/[name].[ext]'
            }
            
        ]
    },
    
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css",
            // disable: !isProd, //if it's not production - disable in dev mode
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery',

        }),
       
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, '_theme/**/**/*.html'))
        // }),
        // new PurifyCSSPlugin({
        //     // Give paths to parse for rules. These should be absolute!
        //     paths: glob.sync(path.join(__dirname, '_content/**/**/*.html'))
        // }),

        new CommonsPlugin({
            minChunks: 3,
            name: "common"
        }),
    ],
};