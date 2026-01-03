// Mock data for cities and activities
// In production, this could be replaced with external APIs or database

const popularCities = [
    { id: 1, name: 'Paris', country: 'France', description: 'The City of Light', trips: 1250 },
    { id: 2, name: 'Tokyo', country: 'Japan', description: 'Modern meets traditional', trips: 980 },
    { id: 3, name: 'New York', country: 'USA', description: 'The Big Apple', trips: 1100 },
    { id: 4, name: 'Bali', country: 'Indonesia', description: 'Island paradise', trips: 850 },
    { id: 5, name: 'London', country: 'UK', description: 'Historic capital', trips: 920 },
    { id: 6, name: 'Barcelona', country: 'Spain', description: 'Gaudi\'s masterpiece', trips: 780 },
    { id: 7, name: 'Dubai', country: 'UAE', description: 'Luxury and innovation', trips: 690 },
    { id: 8, name: 'Rome', country: 'Italy', description: 'The Eternal City', trips: 840 },
    { id: 9, name: 'Bangkok', country: 'Thailand', description: 'Street food capital', trips: 750 },
    { id: 10, name: 'Singapore', country: 'Singapore', description: 'Garden city', trips: 680 }
];

const activities = [
    { id: 1, name: 'Eiffel Tower Visit', city: 'Paris', category: 'activities', avgCost: 25 },
    { id: 2, name: 'Louvre Museum', city: 'Paris', category: 'activities', avgCost: 17 },
    { id: 3, name: 'Tokyo Tower', city: 'Tokyo', category: 'activities', avgCost: 15 },
    { id: 4, name: 'Senso-ji Temple', city: 'Tokyo', category: 'activities', avgCost: 0 },
    { id: 5, name: 'Statue of Liberty', city: 'New York', category: 'activities', avgCost: 23 },
    { id: 6, name: 'Central Park Tour', city: 'New York', category: 'activities', avgCost: 0 },
    { id: 7, name: 'Ubud Rice Terraces', city: 'Bali', category: 'activities', avgCost: 5 },
    { id: 8, name: 'Beach Surfing', city: 'Bali', category: 'activities', avgCost: 30 },
    { id: 9, name: 'British Museum', city: 'London', category: 'activities', avgCost: 0 },
    { id: 10, name: 'Sagrada Familia', city: 'Barcelona', category: 'activities', avgCost: 26 }
];

// @desc    Search cities
// @route   GET /api/search/cities
// @access  Public
exports.searchCities = async (req, res, next) => {
    try {
        const { query, limit = 10 } = req.query;

        let results = popularCities;

        // Filter by search query if provided
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(city =>
                city.name.toLowerCase().includes(searchTerm) ||
                city.country.toLowerCase().includes(searchTerm) ||
                city.description.toLowerCase().includes(searchTerm)
            );
        }

        // Limit results
        results = results.slice(0, parseInt(limit));

        res.status(200).json({
            success: true,
            count: results.length,
            cities: results
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search activities
// @route   GET /api/search/activities
// @access  Public
exports.searchActivities = async (req, res, next) => {
    try {
        const { query, city, category, limit = 20 } = req.query;

        let results = activities;

        // Filter by city if provided
        if (city) {
            results = results.filter(activity =>
                activity.city.toLowerCase() === city.toLowerCase()
            );
        }

        // Filter by category if provided
        if (category) {
            results = results.filter(activity =>
                activity.category === category
            );
        }

        // Filter by search query if provided
        if (query) {
            const searchTerm = query.toLowerCase();
            results = results.filter(activity =>
                activity.name.toLowerCase().includes(searchTerm) ||
                activity.city.toLowerCase().includes(searchTerm)
            );
        }

        // Limit results
        results = results.slice(0, parseInt(limit));

        res.status(200).json({
            success: true,
            count: results.length,
            activities: results
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get popular destinations
// @route   GET /api/search/popular
// @access  Public
exports.getPopularDestinations = async (req, res, next) => {
    try {
        const { limit = 10 } = req.query;

        // Sort by trips count and limit
        const results = popularCities
            .sort((a, b) => b.trips - a.trips)
            .slice(0, parseInt(limit));

        res.status(200).json({
            success: true,
            count: results.length,
            destinations: results
        });
    } catch (error) {
        next(error);
    }
};
