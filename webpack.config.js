const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        src: './client/src/index.js',
    },

    output: {
        publicPath: '/public/',
        filename: 'bundle.js',
    },

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015'],
                },
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader'),
            },
            {
                test: /\.woff$/,
                loader: 'url',
                query: {
                    name: 'font/[hash].[ext]',
                    limit: 5000,
                    mimetype: 'application/font-woff',
                },
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.woff'],
    },
    plugins: [
        new ExtractTextPlugin('main.css', {
            allChunks: true,
        }),
    ],
};

