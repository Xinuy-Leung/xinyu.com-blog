var express = require('express')
var app = express()
var fs = require('fs')
var markdown = require('markdown').markdown

app.set('views','./views/pages/')
app.set('view engine','jade')

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

// app.get('/xinyu/md', function(req, res) {
//     res.render('admin', {
//         title: 'markdown page'
//     })
// })

app.listen(2000);
console.log('Server is listening on port 2000');


var newBlog = new Blog({
    aurthor: 'bobby',
    title: 'markdown && mongodb && UI Prototype',
    summary: '3rd day work ',
    tags: ['markdown', 'mongodb', 'UI Prototype'],
    date: Date.now(),
    content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
})
newBlog.save(function(err) {
    if (err) handleError(err);
    console.log('Success');
});