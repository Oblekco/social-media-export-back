const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: './src/server.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    externals: [nodeExternals()], // Exclude node_modules
}
