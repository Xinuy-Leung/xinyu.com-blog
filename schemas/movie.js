var mongoose = require('mongoose')
var MovieSchema = new mongoose.Schema({
    director: String,
    title: String,
    language: String,
    country: String
})

module.exports = MovieSchema
