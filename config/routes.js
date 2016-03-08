var Blog = require('../app/models/blog')
var fs = require('fs')
var mongoose = require('mongoose')
var markdown = require('markdown').markdown

module.exports = function(app) {
    //index page
    app.get('/', function(req, res) {
        // fs.readFile('./md/xinyu.md', 'utf-8', function(err, md_content) {
        //     if (err) res.send(err);
        //     html_content = markdown.toHTML(md_content)
        //     res.render('index', {
        //         title: 'markdown page',
        //         md_content: 'xxx'
        //     })
        res.render('index', {
            title: 'index-page'
        })
    });
}
