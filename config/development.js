var path = require('path')
var logger = require('morgan')
var mongoose = require('mongoose')

module.exports = function(app) {
    var livereload = require('livereload').createServer({
        exts: ['jade', 'css']
    })
    livereload.watch(path.join(__dirname, '../public/css'))
    livereload.watch(path.join(__dirname, '../app/views'))
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
    port = process.env.PORT || 3000
    viewsPath = path.join(__dirname, '../app/views/pages/')
    faviconPath = path.join(__dirname,'../public/images/favicon.ico')
    return {
        "dbConfig": {
            "host": "mongodb://localhost/blog",
            "port": "3000",
            "dbName": "blog"
        },
        "port": port,
        "viewsPath": viewsPath,
        "faviconPath": faviconPath ,
        "sessionSecret":"xinyu-admin"
    }
}
