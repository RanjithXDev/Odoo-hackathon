require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/trips', require('./routes/trips'));
app.use('/api/itineraries', require('./routes/itineraries'));
app.use('/api/budgets', require('./routes/budgets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/search', require('./routes/search'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Globe Trotter API is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Globe Trotter API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            trips: '/api/trips',
            itineraries: '/api/itineraries',
            budgets: '/api/budgets',
            users: '/api/users',
            search: '/api/search',
            health: '/api/health'
        }
    });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🌍 Globe Trotter API Server                        ║
║                                                       ║
║   Server running on port ${PORT}                        ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
║                                                       ║
║   API Endpoints:                                      ║
║   • Auth:        /api/auth                           ║
║   • Trips:       /api/trips                          ║
║   • Itineraries: /api/itineraries                    ║
║   • Budgets:     /api/budgets                        ║
║   • Users:       /api/users                          ║
║   • Search:      /api/search                         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

module.exports = app;
