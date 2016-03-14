var Blog = require('../models/blog')
var _ = require('underscore')

exports.index = function(req, res) {
    Blog.find({}, function(err, content) {
        if (err) {
            console.log(err);
        }
        res.render('adminIndex', {
            content: content,
            now: ''
        });
    })
}

exports.List = function(req, res) {
    Blog.find({}, function(err, allArticle) {
        if (err) {
            console.log(err);
        }
        res.render('adminList', {
            items: allArticle,
            now: ''
        });
    })
}
exports.create = function(req, res) {
    res.render('adminForm', {
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
