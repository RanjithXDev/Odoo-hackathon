const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const Budget = require('../models/Budget');

// @desc    Get all trips for logged in user
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res, next) => {
    try {
        const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: trips.length,
            trips
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
exports.getTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }

        // Check ownership
        if (trip.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this trip'
            });
        }

        res.status(200).json({
            success: true,
            trip
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res, next) => {
    try {
        const { name, description, startDate, endDate, destinations, budget } = req.body;

        const trip = await Trip.create({
            name,
            description,
            startDate,
            endDate,
            destinations,
            budget,
            userId: req.user.id,
            coverImage: req.file ? `/uploads/${req.file.filename}` : null
        });

        // Create empty itinerary for the trip
        await Itinerary.create({
            tripId: trip._id,
            activities: []
        });

        // Create budget for the trip
        await Budget.create({
            tripId: trip._id,
            totalBudget: budget || 0,
            expenses: []
        });

        res.status(201).json({
            success: true,
            trip
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
exports.updateTrip = async (req, res, next) => {
    try {
        let trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }

        // Check ownership
        if (trip.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this trip'
            });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.coverImage = `/uploads/${req.file.filename}`;
        }

        trip = await Trip.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            trip
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
exports.deleteTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }

        // Check ownership
        if (trip.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this trip'
            });
        }

        await trip.deleteOne();

        // Delete associated itinerary and budget
        await Itinerary.deleteOne({ tripId: req.params.id });
        await Budget.deleteOne({ tripId: req.params.id });

        res.status(200).json({
            success: true,
            message: 'Trip deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Generate share token for trip
// @route   POST /api/trips/:id/share
// @access  Private
exports.shareTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findById(req.params.id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Trip not found'
            });
        }

        // Check ownership
        if (trip.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to share this trip'
            });
        }

        const shareToken = trip.generateShareToken();
        await trip.save();

        res.status(200).json({
            success: true,
            shareToken,
            shareUrl: `${process.env.FRONTEND_URL}/shared/${shareToken}`
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get public trip by share token
// @route   GET /api/trips/shared/:token
// @access  Public
exports.getSharedTrip = async (req, res, next) => {
    try {
        const trip = await Trip.findOne({
            shareToken: req.params.token,
            isPublic: true
        }).populate('userId', 'name');

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: 'Shared trip not found'
            });
        }

        // Get itinerary
        const itinerary = await Itinerary.findOne({ tripId: trip._id });

        res.status(200).json({
            success: true,
            trip,
            itinerary
        });
    } catch (error) {
        next(error);
    }
};
