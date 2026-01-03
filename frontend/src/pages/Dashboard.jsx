import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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

    // Mock data - will be replaced with API calls
    const upcomingTrips = [
        {
            id: 1,
            name: 'European Adventure',
            destination: 'Paris, Rome, Barcelona',
            startDate: '2026-03-15',
            endDate: '2026-03-25',
            budget: 290000,
            image: null
        },
        {
            id: 2,
            name: 'Southeast Asia Explorer',
            destination: 'Bangkok, Singapore, Bali',
            startDate: '2026-06-10',
            endDate: '2026-06-24',
            budget: 232000,
            image: null
        }
    ];

    const popularDestinations = [
        { name: 'Goa', country: 'India', trips: 1250 },
        { name: 'Dubai', country: 'UAE', trips: 980 },
        { name: 'Singapore', country: 'Singapore', trips: 1100 },
        { name: 'Bali', country: 'Indonesia', trips: 850 }
    ];

    const stats = [
        { label: 'Total Trips', value: '12', icon: Map, color: 'primary' },
        { label: 'Countries Visited', value: '8', icon: MapPin, color: 'secondary' },
        { label: 'Total Budget', value: '₹12.6L', icon: DollarSign, color: 'accent' },
        { label: 'Upcoming', value: '2', icon: Calendar, color: 'success' }
    ];

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
                {stats.map((stat, index) => (
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
                            <Card key={trip.id} className="trip-card">
                                <div className="trip-image-placeholder">
                                    <Map size={48} />
                                </div>
                                <div className="trip-info">
                                    <h3 className="trip-name">{trip.name}</h3>
                                    <p className="trip-destination">
                                        <MapPin size={16} />
                                        {trip.destination}
                                    </p>
                                    <div className="trip-meta">
                                        <span className="trip-dates">
                                            <Calendar size={14} />
                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                        </span>
                                        <span className="trip-budget">
                                            <DollarSign size={14} />
                                            ₹{trip.budget.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>
                                <Link to={`/trips/${trip.id}`}>
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
