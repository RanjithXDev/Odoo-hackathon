import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tripAPI, userAPI, searchAPI } from '../services/api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import {
    PlusCircle,
    Map,
    TrendingUp,
    Calendar,
    MapPin,
    DollarSign
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [popularDestinations, setPopularDestinations] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch all data in parallel
            const [tripsResponse, statsResponse, popularResponse] = await Promise.all([
                tripAPI.getAll(),
                userAPI.getStats(),
                searchAPI.popular(4)
            ]);

            // Set trips data
            if (tripsResponse.data.success) {
                const trips = tripsResponse.data.trips || [];
                // Filter upcoming trips
                const upcoming = trips.filter(trip =>
                    new Date(trip.startDate) > new Date()
                ).slice(0, 2);
                setUpcomingTrips(upcoming);
            }

            // Set stats data
            if (statsResponse.data.success) {
                const userStats = statsResponse.data.stats;
                setStats({
                    totalTrips: userStats.totalTrips || 0,
                    upcomingTrips: userStats.upcomingTrips || 0,
                    destinationsVisited: userStats.destinationsVisited || 0,
                    totalBudget: userStats.totalBudget || 0
                });
            }

            // Set popular destinations
            if (popularResponse.data.success) {
                setPopularDestinations(popularResponse.data.destinations || []);
            }

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            // Set default stats if API fails
            setStats({
                totalTrips: 0,
                upcomingTrips: 0,
                destinationsVisited: 0,
                totalBudget: 0
            });
        } finally {
            setLoading(false);
        }
    };

    const statsDisplay = stats ? [
        { label: 'Total Trips', value: stats.totalTrips.toString(), icon: Map, color: 'primary' },
        { label: 'Destinations', value: stats.destinationsVisited.toString(), icon: MapPin, color: 'secondary' },
        { label: 'Total Budget', value: `$${(stats.totalBudget / 1000).toFixed(1)}K`, icon: DollarSign, color: 'accent' },
        { label: 'Upcoming', value: stats.upcomingTrips.toString(), icon: Calendar, color: 'success' }
    ] : [];

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header animate-fadeInDown">
                <div>
                    <h1 className="page-title">Welcome back, {user?.name}! 👋</h1>
                    <p className="page-subtitle">Ready to plan your next adventure?</p>
                </div>
                <Link to="/trips/create">
                    <Button variant="primary" size="large" icon={PlusCircle}>
                        Plan New Trip
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid animate-fadeInUp">
                {statsDisplay.map((stat, index) => (
                    <Card key={index} className="stat-card">
                        <div className={`stat-icon stat-icon-${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">{stat.label}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Upcoming Trips */}
            <section className="dashboard-section animate-fadeInUp">
                <div className="section-header">
                    <h2 className="section-title">Upcoming Trips</h2>
                    <Link to="/trips" className="link-primary">
                        View all
                    </Link>
                </div>

                {upcomingTrips.length > 0 ? (
                    <div className="trips-grid">
                        {upcomingTrips.map((trip) => (
                            <Card key={trip._id} className="trip-card">
                                <div className="trip-image-placeholder">
                                    {trip.coverImage ? (
                                        <img src={`http://localhost:5000${trip.coverImage}`} alt={trip.name} />
                                    ) : (
                                        <Map size={48} />
                                    )}
                                </div>
                                <div className="trip-info">
                                    <h3 className="trip-name">{trip.name}</h3>
                                    <p className="trip-destination">
                                        <MapPin size={16} />
                                        {trip.destinations?.join(', ') || 'No destinations'}
                                    </p>
                                    <div className="trip-meta">
                                        <span className="trip-dates">
                                            <Calendar size={14} />
                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                        </span>
                                        <span className="trip-budget">
                                            <DollarSign size={14} />
                                            ${trip.budget}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/trips/${trip._id}`}>
                                    <Button variant="secondary" size="small" className="trip-action">
                                        View Details
                                    </Button>
                                </Link>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <Map className="empty-state-icon" size={64} />
                        <h3 className="empty-state-title">No upcoming trips</h3>
                        <p className="empty-state-description">
                            Start planning your next adventure today!
                        </p>
                        <Link to="/trips/create">
                            <Button variant="primary" icon={PlusCircle}>
                                Create Your First Trip
                            </Button>
                        </Link>
                    </div>
                )}
            </section>

            {/* Popular Destinations */}
            <section className="dashboard-section animate-fadeInUp">
                <div className="section-header">
                    <h2 className="section-title">Popular Destinations</h2>
                    <Link to="/search/cities" className="link-primary">
                        Explore more
                    </Link>
                </div>

                <div className="destinations-grid">
                    {popularDestinations.map((dest, index) => (
                        <Card key={index} className="destination-card">
                            <div className="destination-icon">
                                <MapPin size={24} />
                            </div>
                            <div className="destination-info">
                                <h4 className="destination-name">{dest.name}</h4>
                                <p className="destination-country">{dest.country}</p>
                                <p className="destination-trips">
                                    <TrendingUp size={14} />
                                    {dest.trips} trips planned
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
