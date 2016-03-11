var Blog = require('../models/blog')

exports.index = function(req, res) {
        // fs.readFile('./md/xinyu.md', 'utf-8', function(err, md_content) {
        //     if (err) res.send(err);
        //     html_content = markdown.toHTML(md_content)
        //     res.render('index', {
        //             title: 'markdown page',
        //             md_content: html_content
        //         })
        //         // res.render('index', {
        //         //     title: 'index-page'
        //         // })
        // });
        Blog.find({}, function(err, content) {
            if (err) {
                console.log('Error happens');
            }
            res.render('index', {
                content: content,
                now: 'Home'
            });
        })
    }
    // artilce details 
exports.getOneBlog = function(req, res) {
        Blog.findById(req.params.articleId, function(err, item) {
            if (err) {
                console.log('Error happens');
            }
            res.render('article', {
                item: item,
                now: 'Blog'
            });
        })
    }
    // join page
exports.join = function(req, res) {

    }
    // login page
exports.login = function(req, res) {

    }
    // logout page
exports.logout = function(req, res) {

}
