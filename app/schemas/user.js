var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {
    console.log('2');
    var user = this
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
        //that is the point
        // next()
})
UserSchema.methods = {
    comparePassword: function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) return cb(err)

            cb(null, isMatch)
        })
    }
}

module.exports = UserSchema
