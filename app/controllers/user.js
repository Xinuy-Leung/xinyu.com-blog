var Blog = require('../models/blog')
var User = require('../models/user')

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
        Blog.find({}, function(err, allArticle) {
            if (err) {
                console.log('Error happens');
            }
            res.render('index', {
                items: allArticle,
                now: 'Home'
            });
        })
    }
    // artilce details 
exports.getOneBlog = function(req, res) {
    Blog.findById(req.params.articleId, function(err, articleDoc) {
        if (err) {
            console.log('Error happens');
        }
        res.render('article', {
            item: articleDoc,
            now: 'Blog'
        });
    })
}
exports.getTag = function(req, res) {
        var tag = req.params.tag
        if (tag) {
            Blog.findByTag(tag, function(err, tagDoc) {
                if (err) {
                    console.log('Error happens');
                }
                res.render('tag', {
                    items: tagDoc,
                    now: 'Blog',
                    tag: tag
                })
            })
        }

    }
    // join page
exports.signUpPage = function(req, res) {
        res.render('signup')
    }
    // login page
exports.logInPage = function(req, res) {
    res.render('login')
}
exports.signUp = function(req, res) {
    var userObj = req.body.user
    var _user = new User(userObj)
    _user.save(function(err, userDoc) {
        console.log('1');
    })
    res.redirect('/signup')
}
exports.logIn = function(req, res) {
    var _name = req.body.user.name
    var _password = req.body.user.password
    User.findOne({ 'name': _name }, function(err, userObj) {
        if (err) {
            console.log(err);
        }
        if (!userObj) {
            console.log('NO admin');
            return res.redirect('/signup')
        }
        userObj.comparePassword(_password, function(err, isMatch) {
            if (err) {
                console.log(err);
            }
            if (isMatch) {
                console.log('password is matched');
                res.redirect('/')
            } else {
                console.log('password is not matched');
                res.redirect('/login')
            }
        })
    })
}
