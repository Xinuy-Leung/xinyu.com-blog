var Blog = require('../models/blog')
var _ = require('underscore')
var User = require('../models/user')

// exports.index = function(req, res) {
//     Blog.find({}, function(err, content) {
//         if (err) {
//             console.log(err);
//         }
//         res.render('adminIndex', {
//             title:'Admin Index Page',
//             content: content,
//             now: 'Logout',
//         });
//     })
// }

exports.List = function(req, res) {
    Blog.find({}, function(err, allArticle) {
        if (err) {
            console.log(err);
        }
        res.render('adminList', {
            title: 'Admin List Page',
            items: allArticle,
            now: 'Logout'
        });
    })
}
exports.create = function(req, res) {
    res.render('adminForm', {
        title: 'Admin Form Page',
        blog: {
            title: '',
            summary: '',
            tags: [],
            content: '',
            category: ''
        }
    })
}

// GET update page
exports.update = function(req, res) {
    var id = req.params.articleId
    if (id) {
        Blog.findById(id, function(err, BlogDoc) {
            if (err) {
                console.log('Error happens');
            }
            res.render('adminForm', {
                title: 'Admin Form Page',
                blog: BlogDoc,
            })
        })
    }
}

// Submit update/create form
exports.submit = function(req, res) {
    var id = req.body.blog._id
    var blogObj = req.body.blog
    var _blog
    if (id === 'undefined') {
        _blog = new Blog({
            title: blogObj.title,
            tags: blogObj.tags.split('-'),
            summary: blogObj.summary,
            category: blogObj.category,
            content: blogObj.content
        })
        _blog.save(function(err, blogDoc) {
            if (err) {
                console.log('Error happens');
            }
            res.redirect('/p/' + blogDoc._id)
        })
    } else {
        Blog.findById(id, function(err, blogDoc) {
            if (err) {
                console.log(err);
            }
            _blog = _.extend(blogDoc, blogObj)
            _blog.save(function(err, blogDoc) {
                if (err) {
                    console.log('Error happens');
                }
                res.redirect('/p/' + blogDoc._id)
            })
        })
    }
}

// delete 
exports.delete = function(req, res) {
    var id = req.params.articleId
    if (id) {
        Blog.remove({ _id: id }, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Delete done');
        })
    }
}
exports.adminRequired = function(req, res, next) {
    var _user = req.session.user
    if (_user) {
        var name = _user.name
        User.find({ name: name }, function(err, userObj) {
            if (err) {
                console.log(err);
            }
            if (!userObj) {
                console.log('No admin !');
                return res.redirect('/')
            }
            next()
        })
    } else {
        console.log('No admin in session !');
        return res.redirect('/')
    }
}
