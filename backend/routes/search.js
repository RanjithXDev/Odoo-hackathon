const express = require('express');
const router = express.Router();
const {
    searchCities,
    searchActivities,
    getPopularDestinations
} = require('../controllers/searchController');

// All search routes are public
router.get('/cities', searchCities);
router.get('/activities', searchActivities);
router.get('/popular', getPopularDestinations);

module.exports = router;
