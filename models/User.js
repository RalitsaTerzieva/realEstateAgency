const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salt_rounds = 10;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, salt_rounds)
        .then((hash) => {
            this.password = hash;
            return next();
        })
})

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
})

const User = mongoose.model('User', userSchema);
module.exports = User;