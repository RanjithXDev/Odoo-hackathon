const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
    signup,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Validation middleware
const signupValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('contactNumber').optional().matches(/^[\d\s\-\+\(\)]+$/).withMessage('Invalid contact number')
];

const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];

const forgotPasswordValidation = [
    body('email').isEmail().withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password/:resetToken', resetPasswordValidation, resetPassword);
router.post('/logout', protect, logout);

module.exports = router;
