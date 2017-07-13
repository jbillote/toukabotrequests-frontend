var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'source-map',

    entry: [
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/public'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: /(node_modules)/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.less?$/,
                include: [
                    path.resolve(__dirname, 'style')
                ],
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }
        ]
    }
};
