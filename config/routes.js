var Blog = require('../app/models/blog')
var fs = require('fs')
var mongoose = require('mongoose')
var markdown = require('markdown').markdown
var _ = require('underscore')
    // var newblog = new Blog({
    //     title: '我的NodeJS学习之路5（路由设计）',
    //     summary: '所以我们的路由要针对这两部分用户分别进行设计， 我遵循的原则是： 普通用户： 路由尽量简短明了（ 可参考简书）； 管理员用户： 直观表达功能 ',
    //     tags: ['Xinyu', 'Xinyu', 'Xinyu'],
    //     category: 'Skill',
    //     content: '所以我们的路由要针对这两部分用户分别进行设计， 我遵循的原则是： 普通用户： 路由尽量简短明了（ 可参考简书）； 管理员用户： 直观表达功能所以我们的路由要针对这两部分用户分别进行设计， 我遵循的原则是： 普通用户： 路由尽量简短明了（ 可参考简书）； 管理员用户： 直观表达功能所以我们的路由要针对这两部分用户分别进行设计， 我遵循的原则是： 普通用户： 路由尽量简短明了（ 可参考简书）； 管理员用户： 直观表达功能'
    // })
    // newblog.save(function(err, blogDoc) {
    //     if (err) {
    //         console.log('Error happens');
    //     }
    //     console.log(blogDoc.title + 'has been saved!!!');
    // })
module.exports = function(app) {
    //index page
    app.get('/', function(req, res) {
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
    });
    // artilce details 
    app.get('/p/:articleId', function(req, res) {
        Blog.findById(req.params.articleId, function(err, item) {
            if (err) {
                console.log('Error happens');
            }
            res.render('article', {
                item: item,
                now: 'Blog'
            });
        })
    });


    // join page
    app.get('/join', function(req, res) {

    });
    // login page
    app.get('/login', function(req, res) {

    });
    // logout page
    app.get('/logout', function(req, res) {

    });

    // /*             admin                 */
    // // dashboard index
    app.get('/xinyu', function(req, res) {
        res.render('admin', {
            blog: {
                title: '',
                summary: '',
                tags: [],
                content: '',
                category: ''
            }
        })
    });

    app.get('/xinyu/update/:articleId', function(req, res) {
        var id = req.params.articleId
        if (id) {
            Blog.findById(id, function(err, BlogDoc) {
                if (err) {
                    console.log('Error happens');
                }
                res.render('admin', {
                    blog: BlogDoc
                })
            })
        }
    })

    app.post('/xinyu/blog/create', function(req, res) {
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
                    _blog = _.extend(blog, blogObj)
                    _blog.save(function(err, blogDoc) {
                        if (err) {
                            console.log('Error happens');
                        }
                        res.redirect('/p/' + blogDoc._id)
                    })
                })
            }
        })
        // //  dashboard artilces

    //     1.p/create
    //     2.p/delete//:id
    //     3.p/edit/:id
    //     4.p

    // app.use('/dashboard/p', authority.isAuthenticated, require('./routes/dashboard-p'));

    // // dashboard users
    // app.use('/dashboard/u', authority.isAuthenticated, require('./routes/dashboard-u'));
}
