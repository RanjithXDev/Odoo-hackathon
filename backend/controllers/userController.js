const User = require('../models/User');
const Trip = require('../models/Trip');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
                avatar: user.avatar,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            contactNumber: req.body.contactNumber
        };

        // Don't allow email or password updates through this endpoint
        const user = await User.findByIdAndUpdate(
            req.user.id,
            fieldsToUpdate,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNumber: user.contactNumber,
                avatar: user.avatar
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Upload user avatar
// @route   POST /api/users/avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Please upload a file'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { avatar: `/uploads/${req.file.filename}` },
            { new: true }
        );

        res.status(200).json({
            success: true,
            avatar: user.avatar
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user statistics
// @route   GET /api/users/stats
// @access  Private
exports.getUserStats = async (req, res, next) => {
    try {
        const trips = await Trip.find({ userId: req.user.id });

        const totalTrips = trips.length;
        const upcomingTrips = trips.filter(trip => new Date(trip.startDate) > new Date()).length;
        const pastTrips = trips.filter(trip => new Date(trip.endDate) < new Date()).length;

        // Get unique destinations
        const allDestinations = trips.flatMap(trip => trip.destinations || []);
        const uniqueDestinations = [...new Set(allDestinations)];

        // Calculate total budget
        const totalBudget = trips.reduce((sum, trip) => sum + (trip.budget || 0), 0);

        res.status(200).json({
            success: true,
            stats: {
                totalTrips,
                upcomingTrips,
                pastTrips,
                destinationsVisited: uniqueDestinations.length,
                totalBudget
            }
        });
    } catch (error) {
        next(error);
    }
};
