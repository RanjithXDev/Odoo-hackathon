const express = require('express');
const router = express.Router();
const {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    deleteTrip,
    shareTrip,
    getSharedTrip
} = require('../controllers/tripController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/shared/:token', getSharedTrip);

// Protected routes
router.route('/')
    .get(protect, getTrips)
    .post(protect, upload.single('coverImage'), createTrip);

router.route('/:id')
    .get(protect, getTrip)
    .put(protect, upload.single('coverImage'), updateTrip)
    .delete(protect, deleteTrip);

router.post('/:id/share', protect, shareTrip);

module.exports = router;
