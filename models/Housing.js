const mongoose = require('mongoose');

const housingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 6,
    },
    type: {
        enum: ["Apartment", "Villa", "House"],
    },
    year: {
        type: Number,
        required: true,
        min: 1960,
        max: 2080
    },
    city: {
        type: String,
        required: true,
        minlength: 4
    },
    image: {
        type: String,
        validate: [/^https?:\/\//, 'Image should starts with http or https.'],
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 60,
    },
    pieces: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    tenants: [
        {
        type: mongoose.Types.ObjectId,
        ref: 'User'

    }
    ],
    owner: {
        type: mongoose.Schema.ObjectId, 
        ref: "User"
    }
}, {
    timestamps: true
})

housingSchema.method('getTenants', function() {
    return this.tenants.map(x => x.name).join('. ');
})
const Housing = mongoose.model('Housing', housingSchema);
module.exports = Housing;