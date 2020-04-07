const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: './',
    assetsDir: 'static',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
    configureWebpack: {
        plugins: [
            // Ignore all locale files of moment.js
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    },
                },
                sourceMap: false,
                parallel: true
            }),
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        externals: {
            // 'vue': 'Vue',
            // 'jquery' : '$',
        }
    },
 
}