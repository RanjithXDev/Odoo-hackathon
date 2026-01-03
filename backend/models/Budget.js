const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['accommodation', 'transportation', 'food', 'activities', 'shopping', 'other']
    },
    amount: {
        type: Number,
        required: [true, 'Please provide an amount'],
        min: [0, 'Amount cannot be negative']
    },
    description: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    _id: true
});

const budgetSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
        unique: true
    },
    totalBudget: {
        type: Number,
        required: [true, 'Please provide a total budget'],
        min: [0, 'Budget cannot be negative']
    },
    expenses: [expenseSchema]
}, {
    timestamps: true
});

// Virtual for total spent
budgetSchema.virtual('totalSpent').get(function () {
    return this.expenses.reduce((total, expense) => total + expense.amount, 0);
});

// Virtual for remaining budget
budgetSchema.virtual('remaining').get(function () {
    return this.totalBudget - this.totalSpent;
});

// Method to get breakdown by category
budgetSchema.methods.getBreakdown = function () {
    const breakdown = {
        accommodation: 0,
        transportation: 0,
        food: 0,
        activities: 0,
        shopping: 0,
        other: 0
    };

    this.expenses.forEach(expense => {
        breakdown[expense.category] += expense.amount;
    });

    return breakdown;
};

// Ensure virtuals are included in JSON
budgetSchema.set('toJSON', { virtuals: true });
budgetSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Budget', budgetSchema);
