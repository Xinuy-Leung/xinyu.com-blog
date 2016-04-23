var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressSession = require('express-session')
var cookieParser =require('cookie-parser')
var mongoStore = require('connect-mongo')(expressSession)
var port = process.env.PORT || 3000
var favicon = require('serve-favicon')
var app = express()
var configFile = path.resolve('./config/',process.env.NODE_ENV)
var config = require(configFile)(app)

mongoose.connect(config.dbConfig.host)

app.set('views',config.viewsPath )
app.set('view engine', 'jade')
app.use(favicon(config.faviconPath))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(expressSession({
    secret: config.sessionSecret,
    store: new mongoStore({
        url: config.dbConfig.host,
        collections: 'sessions'
    })
}))
app.listen(config.port)
app.use(express.static('public'))

require('./config/routes')(app)
console.log('Xinyu is listening on port ' + config.port);
