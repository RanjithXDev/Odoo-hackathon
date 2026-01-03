const express = require('express');
const router = express.Router();
const {
    getBudget,
    updateBudget,
    addExpense,
    updateExpense,
    deleteExpense,
    getBudgetBreakdown
} = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');

router.get('/trip/:tripId', protect, getBudget);
router.put('/:id', protect, updateBudget);
router.post('/:id/expenses', protect, addExpense);
router.put('/:id/expenses/:expenseId', protect, updateExpense);
router.delete('/:id/expenses/:expenseId', protect, deleteExpense);
router.get('/:id/breakdown', protect, getBudgetBreakdown);

module.exports = router;
