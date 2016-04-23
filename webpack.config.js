var webpack = require('webpack');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    // plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        index : './public/js/test.js'
    },
    //入口文件输出配置
    output: {
        path: './public/js/',
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.scss$/, loader: 'style!css!sass'},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
            // { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
};