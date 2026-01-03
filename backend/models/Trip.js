const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a trip name'],
        trim: true,
        maxlength: [100, 'Trip name cannot be more than 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    startDate: {
        type: Date,
        required: [true, 'Please provide a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please provide an end date'],
        validate: {
            validator: function (value) {
                return value >= this.startDate;
            },
            message: 'End date must be after start date'
        }
    },
    coverImage: {
        type: String,
        default: null
    },
    destinations: [{
        type: String,
        trim: true
    }],
    budget: {
        type: Number,
        default: 0,
        min: [0, 'Budget cannot be negative']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    shareToken: {
        type: String,
        unique: true,
        sparse: true
    }
}, {
    timestamps: true
});

// Generate share token
tripSchema.methods.generateShareToken = function () {
    const crypto = require('crypto');
    this.shareToken = crypto.randomBytes(16).toString('hex');
    this.isPublic = true;
    return this.shareToken;
};

module.exports = mongoose.model('Trip', tripSchema);
