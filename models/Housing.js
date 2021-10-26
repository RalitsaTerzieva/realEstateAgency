const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        enum: ["Apartment", "Villa", "House"],
        default: "Apartment",
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pieces: {
        type: Number,
        required: true
    },
    rented: {
        friends: [{ type: ObjectId, ref: 'User' }]
    },
    owner: {

    }
})

const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;