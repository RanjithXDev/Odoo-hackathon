const express = require('express');
const router = express.Router();
const {
    getProfile,
    updateProfile,
    uploadAvatar,
    getUserStats
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.get('/stats', protect, getUserStats);

module.exports = router;
