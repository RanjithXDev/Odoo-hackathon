const Itinerary = require('../models/Itinerary');
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

// @desc    Get itinerary for a trip
// @route   GET /api/itineraries/trip/:tripId
// @access  Private
exports.getItinerary = async (req, res, next) => {
    try {
        const ownership = await checkTripOwnership(req.params.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        let itinerary = await Itinerary.findOne({ tripId: req.params.tripId });

        if (!itinerary) {
            // Create empty itinerary if doesn't exist
            itinerary = await Itinerary.create({
                tripId: req.params.tripId,
                activities: []
            });
        }

        itinerary.sortActivities();

        res.status(200).json({
            success: true,
            itinerary
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update itinerary
// @route   PUT /api/itineraries/:id
// @access  Private
exports.updateItinerary = async (req, res, next) => {
    try {
        let itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        const ownership = await checkTripOwnership(itinerary.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        itinerary = await Itinerary.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        itinerary.sortActivities();

        res.status(200).json({
            success: true,
            itinerary
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add activity to itinerary
// @route   POST /api/itineraries/:id/activities
// @access  Private
exports.addActivity = async (req, res, next) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        const ownership = await checkTripOwnership(itinerary.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        itinerary.activities.push(req.body);
        itinerary.sortActivities();
        await itinerary.save();

        res.status(201).json({
            success: true,
            itinerary
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update activity in itinerary
// @route   PUT /api/itineraries/:id/activities/:activityId
// @access  Private
exports.updateActivity = async (req, res, next) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        const ownership = await checkTripOwnership(itinerary.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        const activity = itinerary.activities.id(req.params.activityId);

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: 'Activity not found'
            });
        }

        Object.assign(activity, req.body);
        itinerary.sortActivities();
        await itinerary.save();

        res.status(200).json({
            success: true,
            itinerary
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete activity from itinerary
// @route   DELETE /api/itineraries/:id/activities/:activityId
// @access  Private
exports.deleteActivity = async (req, res, next) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);

        if (!itinerary) {
            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });
        }

        const ownership = await checkTripOwnership(itinerary.tripId, req.user.id);
        if (ownership.error) {
            return res.status(ownership.status).json({
                success: false,
                message: ownership.error
            });
        }

        itinerary.activities.pull(req.params.activityId);
        await itinerary.save();

        res.status(200).json({
            success: true,
            itinerary
        });
    } catch (error) {
        next(error);
    }
};
