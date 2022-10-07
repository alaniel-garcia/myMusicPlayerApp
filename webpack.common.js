const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = ({mode}) => {
    const isProduction = mode === 'production';

    return {

        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '@components': path.resolve(__dirname, 'src/components/'),
                '@assets': path.resolve(__dirname, 'src/assets/'),
                '@services': path.resolve(__dirname, 'src/services/'),
                /*
                '@utils': path.resolve(__dirname, 'src/utils/'),
                '@styles': path.resolve(__dirname, 'src/styles/'),
                */
            }
        },
        plugins: [
            new HtmlWebpackPlugin({template: './public/index.html'}),
        ],
        module: {
            rules: [
                {
                    test: /\.(m?js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    } 
                },
                {
                    test: /\.(m?ts|tsx)$/,
                    exclude: /node_modules/,
                    use: [
                        'babel-loader',
                        'ts-loader'
                    ]
                },
                {
                    test: /\.(css|scss)$/,
                    //loaders are executed in reverse(lastOne to firstOne)
                    //So, order matters
                    use: [
                        isProduction 
                            ? MiniCssExtractPlugin.loader//3.creates separated files for css and then generates a single file 
                            : 'style-loader',//3. Injects styles into DOM
                        'css-loader',//2. Turns css into commonJs
                        'sass-loader',//1. Turns sass into css
                    ]
                },
                {
                    test: /\.(woff|woff2)$/,
                    exclude: /node_modules/,
                    type: 'asset/resource',//as webpack 5 has already implemented url-loader, 
                    //you only need this line in order to let assetModules procces this
                    //asset resource
                    generator: {
                        filename: 'assets/fonts/[name][ext]'
                    }
                },
                {
                    test: /\.svg$/,
                    exclude: /node_modules/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/icons/[name][ext]'
                    }
                },
                //test loaders
                {
                    test: /\.(jpg|png)$/,
                    type: 'asset/resource'
                }
                /*
                {
                    test: /\.(mp3|flac|opus|ogg|m4a)$/,
                    exclude: /node_modules/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
                */
            ]
        },
    }
}