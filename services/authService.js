const User = require('../models/User');

exports.register = (userData) => User.create(userData);

exports.login = async ({ username, password }) => {
    let user =  await User.findOne({username});

    if(!user) {
        throw new Error('Ivalid username or password!');
    }

    let isValid = await user.validatePassword(password);

    if(!isValid) {
        throw new Error('Ivalid username or password!');
    }
}