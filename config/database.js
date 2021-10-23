const mongoose = require('mongoose');
const { DB_CONNECTION_STRING } = require('../constants');

function initialDatabase() {
    return mongoose.connect(DB_CONNECTION_STRING);
}

module.exports = initialDatabase;