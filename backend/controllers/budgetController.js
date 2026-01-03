const Budget = require('../models/Budget');
const Trip = require('../models/Trip');

// Helper function to check trip ownership
const checkTripOwnership = async (tripId, userId) => {
    const trip = await Trip.findById(tripId);
    if (!trip) {
        return { error: 'Trip not found', status: 404 };
    }
    if (trip.userId.toString() !== userId) {
        return { error: 'Not authorized to access this trip', status: 403 };
    }
    return { trip };
};

// @desc    Get budget for a trip
// @route   GET /api/budgets/trip/:tripId
// @access  Private
exports.getBudget = async (req, res, next) => {
    try {
        const ownership = await checkTripOwnership(req.params.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        let budget = await Budget.findOne({ tripId: req.params.tripId });

        if (!budget) {
            // Create empty budget if doesn't exist
            budget = await Budget.create({
                tripId: req.params.tripId,
                totalBudget: 0,
                expenses: []
            });
        }

        res.status(200).json({
            success: true,
            budget
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
exports.updateBudget = async (req, res, next) => {
    try {
        let budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        const ownership = await checkTripOwnership(budget.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        budget = await Budget.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            budget
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add expense to budget
// @route   POST /api/budgets/:id/expenses
// @access  Private
exports.addExpense = async (req, res, next) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        const ownership = await checkTripOwnership(budget.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        budget.expenses.push(req.body);
        await budget.save();

        res.status(201).json({
            success: true,
            budget
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update expense in budget
// @route   PUT /api/budgets/:id/expenses/:expenseId
// @access  Private
exports.updateExpense = async (req, res, next) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        const ownership = await checkTripOwnership(budget.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        const expense = budget.expenses.id(req.params.expenseId);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        Object.assign(expense, req.body);
        await budget.save();

        res.status(200).json({
            success: true,
            budget
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete expense from budget
// @route   DELETE /api/budgets/:id/expenses/:expenseId
// @access  Private
exports.deleteExpense = async (req, res, next) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        const ownership = await checkTripOwnership(budget.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        budget.expenses.pull(req.params.expenseId);
        await budget.save();

        res.status(200).json({
            success: true,
            budget
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get budget breakdown by category
// @route   GET /api/budgets/:id/breakdown
// @access  Private
exports.getBudgetBreakdown = async (req, res, next) => {
    try {
        const budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        const ownership = await checkTripOwnership(budget.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        const breakdown = budget.getBreakdown();

        res.status(200).json({
            success: true,
            breakdown,
            totalBudget: budget.totalBudget,
            totalSpent: budget.totalSpent,
            remaining: budget.remaining
        });
    } catch (error) {
        next(error);
    }
};
