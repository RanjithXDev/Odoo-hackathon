const express = require('express');
const router = express.Router();
const {
    getItinerary,
    updateItinerary,
    addActivity,
    updateActivity,
    deleteActivity
} = require('../controllers/itineraryController');
const { protect } = require('../middleware/auth');

router.get('/trip/:tripId', protect, getItinerary);
router.put('/:id', protect, updateItinerary);
router.post('/:id/activities', protect, addActivity);
router.put('/:id/activities/:activityId', protect, updateActivity);
router.delete('/:id/activities/:activityId', protect, deleteActivity);

module.exports = router;
