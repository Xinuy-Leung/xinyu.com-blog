var User = require('../app/controllers/user')
var Admin = require('../app/controllers/admin')
var fs = require('fs')
var mongoose = require('mongoose')
var marked = require('marked')

module.exports = function(app) {
    app.locals.marked = marked
    app.locals.moment = require('moment')

    // user
    app.get('/', User.index)
    app.get('/blog', User.getAllBlogs)
    app.get('/about', User.aboutPage)
    app.get('/p/:articleId', User.getOneBlog)
    app.get('/tag/:tag', User.getTag)
    app.get('/signup', User.signUpPage)
    app.get('/login', User.logInPage)
    app.post('/signup', User.signUp)
    app.post('/login', User.logIn)
    app.get('/logout', User.logout)
        // admin
    app.get('/xinyu/', Admin.adminRequired, Admin.List);
    app.get('/xinyu/blog/create', Admin.adminRequired, Admin.create);
    app.get('/xinyu/blog/update/:articleId', Admin.adminRequired, Admin.update)
    app.post('/xinyu/blog/create', Admin.adminRequired, Admin.submit)
    app.delete('/xinyu/blog/delete/:articleId', Admin.adminRequired, Admin.delete)

}
