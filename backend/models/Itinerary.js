const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an activity name'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'Please provide a date']
    },
    time: {
        type: String,
        trim: true
    },
    duration: {
        type: Number, // in minutes
        min: [0, 'Duration cannot be negative']
    },
    cost: {
        type: Number,
        default: 0,
        min: [0, 'Cost cannot be negative']
    },
    category: {
        type: String,
        enum: ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'other'],
        default: 'other'
    },
    notes: {
        type: String,
        trim: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    _id: true
});

const itinerarySchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
        unique: true
    },
    activities: [activitySchema]
}, {
    timestamps: true
});

// Sort activities by date and order
itinerarySchema.methods.sortActivities = function () {
    this.activities.sort((a, b) => {
        const dateCompare = new Date(a.date) - new Date(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.order - b.order;
    });
};

module.exports = mongoose.model('Itinerary', itinerarySchema);
