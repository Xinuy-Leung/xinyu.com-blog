var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var logger = require('morgan')
var expressSession = require('express-session')
var cookieParser =require('cookie-parser')
var mongoStore = require('connect-mongo')(expressSession)
var port = process.env.PORT || 3000
var app = express()
var livereload = require('livereload').createServer({
    exts: ['jade', 'css']
})
livereload.watch(path.join(__dirname, '/public/css'))
livereload.watch(path.join(__dirname, '/app/views'))

var dbUrl = 'mongodb://localhost/blog'
mongoose.connect(dbUrl)

app.set('views', path.join(__dirname, 'app/views/pages/'))
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
    secret: 'xinyu-admin',
    store: new mongoStore({
        url: dbUrl,
        collections: 'sessions'
    })
}))
app.listen(port)
app.use(express.static('public'))

if ('development' === app.get('env')) {
    app.set('showStackError', true)
    app.use(logger(':method :url :status'))
    app.locals.pretty = true
    mongoose.set('debug', true)
}



require('./config/routes')(app)

console.log('Xinyu is listening on port ' + port);
