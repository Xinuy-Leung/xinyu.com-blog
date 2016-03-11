var Blog = require('../app/models/blog')
var User = require('../app/controllers/user')
var Admin = require('../app/controllers/admin')
var fs = require('fs')
var mongoose = require('mongoose')
var markdown = require('markdown').markdown


module.exports = function(app) {
    // user
    app.get('/', User.index)
    app.get('/p/:articleId', User.getOneBlog)

    // admin
    app.get('/xinyu/blog/create', Admin.create);
    app.get('/xinyu/blog/update/:articleId', Admin.update)
    app.post('/xinyu/blog/create', Admin.submit)
    app.delete('/xinyu/blog/delete/:articleId', Admin.delete)

}
