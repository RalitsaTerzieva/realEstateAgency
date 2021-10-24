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
    homeimage: {
        type: String,
        required: true
    },
    propertydescription: {
        type: String,
        required: true
    },
    availablepieces: {
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