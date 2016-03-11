var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()
var livereload = require('livereload').createServer({
    exts: ['jade', 'css']
})
livereload.watch(path.join(__dirname, '/public/css'))
livereload.watch(path.join(__dirname, '/app/views'))

mongoose.connect('mongodb://localhost/blog')

app.set('views', path.join(__dirname , 'app/views/pages/'))
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.listen(port)





require('./config/routes')(app)

console.log('Xinyu is listening on port ' + port);
