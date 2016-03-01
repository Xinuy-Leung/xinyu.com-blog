var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var Blog = require('./models/blog')
var fs = require('fs')
var markdown = require('markdown').markdown
var bodyParser = require('body-parser')
var port = process.env.PORT || 3000
var app = express()

mongoose.connect('mongodb://localhost/blog')

app.set('views', './views/pages/')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port)

console.log('Xinyu is listening on port ' + port);

//index page
app.get('/', function(req, res) {
    fs.readFile('./md/xinyu.md', 'utf-8', function(err, md_content) {
        if (err) res.send(err);
        html_content = markdown.toHTML(md_content)
        res.render('admin', {
            title: 'markdown page',
            md_content: html_content
        })
    });
});
