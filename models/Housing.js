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