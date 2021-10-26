const jwt = require('../utils/jwt');
const User = require('../models/User');

const { JWT_SECRET } = require('../constants');

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

    let payload = { _id: user._id, name: user.name, username: user.username }
    let token = await jwt.sign(payload, JWT_SECRET);
    return token
}