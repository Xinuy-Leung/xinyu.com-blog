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
    app.get('/p/:articleId', User.getOneBlog)
    app.get('/tag/:tag', User.getTag)
    app.get('/signup', User.signUpPage)
    app.get('/login', User.logInPage)
    app.post('/signup', User.signUp)
    app.post('/login', User.logIn)

    // admin
    app.get('/xinyu/', Admin.List);
    app.get('/xinyu/blog/create', Admin.create);
    app.get('/xinyu/blog/update/:articleId', Admin.update)
    app.post('/xinyu/blog/create', Admin.submit)
    app.delete('/xinyu/blog/delete/:articleId', Admin.delete)

}
