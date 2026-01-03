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
    DollarSign,
    Compass,
    Plane,
    ArrowRight
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
            const [tripsResponse, statsResponse, popularResponse] = await Promise.all([
                tripAPI.getAll(),
                userAPI.getStats(),
                searchAPI.popular(6)
            ]);

            if (tripsResponse.data.success) {
                const trips = tripsResponse.data.trips || [];
                const upcoming = trips.filter(trip =>
                    new Date(trip.startDate) > new Date()
                ).slice(0, 3);
                setUpcomingTrips(upcoming);
            }

            if (statsResponse.data.success) {
                setStats(statsResponse.data.stats);
            }

            if (popularResponse.data.success) {
                setPopularDestinations(popularResponse.data.destinations || []);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setStats({ totalTrips: 0, upcomingTrips: 0, destinationsVisited: 0, totalBudget: 0 });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="loading-state flex flex-col items-center justify-center p-20">
                    <div className="spinner mb-4"></div>
                    <p className="voyage-gradient-text font-bold text-xl">Calibrating your adventure radar...</p>
                </div>
            </div>
        );
    }

    const missionStats = [
        { label: 'Expeditions', value: stats?.totalTrips || 0, icon: Plane, color: 'voyage' },
        { label: 'Waypoints', value: stats?.destinationsVisited || 0, icon: MapPin, color: 'sunset' },
        { label: 'Voyage Fund', value: `₹${((stats?.totalBudget || 0) / 1000).toFixed(1)}K`, icon: DollarSign, color: 'aurora' },
        { label: 'On Horizon', value: stats?.upcomingTrips || 0, icon: Calendar, color: 'primary' }
    ];

    return (
        <div className="dashboard-container">
            {/* Mission Hero */}
            <header className="dashboard-hero">
                <div className="hero-welcome">
                    <h1 className="hero-title voyage-gradient-text">
                        Captain {user?.name.split(' ')[0]}
                    </h1>
                    <p className="hero-subtitle">Your next global waypoint is waiting to be discovered.</p>
                </div>
                <div className="hero-actions">
                    <Link to="/trips/create">
                        <Button variant="primary" size="large" icon={PlusCircle}>
                            Plot New Voyage
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Stats Mission Control */}
            <div className="stats-grid">
                {missionStats.map((stat, i) => (
                    <Card key={i} className={`stat-card card-glass`}>
                        <div className={`stat-icon stat-icon-${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="stat-label">{stat.label}</p>
                            <h3 className="stat-value">{stat.value}</h3>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Upcoming Expeditions */}
            <section className="dashboard-section">
                <div className="section-header">
                    <h2 className="section-title">Current Horizon</h2>
                    <Link to="/trips" className="link-primary flex items-center gap-2">
                        Logbook <ArrowRight size={16} />
                    </Link>
                </div>

                {upcomingTrips.length > 0 ? (
                    <div className="trips-grid">
                        {upcomingTrips.map((trip) => (
                            <div key={trip._id} className="trip-card-premium card">
                                <div className="trip-image-container">
                                    {trip.coverImage ? (
                                        <img src={`http://localhost:5000${trip.coverImage}`} alt={trip.name} />
                                    ) : (
                                        <div className="trip-placeholder-icon">
                                            <Compass size={64} />
                                        </div>
                                    )}
                                    <div className="trip-image-overlay" />
                                </div>
                                <div className="trip-content">
                                    <span className="trip-badge">Next Adventure</span>
                                    <h3 className="trip-title">{trip.name}</h3>
                                    <div className="trip-meta-row">
                                        <div className="trip-meta-item">
                                            <MapPin size={14} /> <span>{trip.destinations?.[0] || 'Unknown'}</span>
                                        </div>
                                        <div className="trip-meta-item">
                                            <Calendar size={14} /> <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <Link to={`/trips/${trip._id}`}>
                                        <Button variant="glass" size="small" className="w-full">
                                            Mission Intel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Card className="empty-state p-12 text-center card-voyage">
                        <Compass className="voyage-gradient-text mx-auto mb-6" size={80} />
                        <h3 className="text-2xl font-bold mb-2">No expeditions planned</h3>
                        <p className="text-secondary mb-8 max-w-md mx-auto">
                            Your mission log is empty. It's time to set coordinates for your next great journey.
                        </p>
                        <Link to="/trips/create">
                            <Button variant="primary">Initialize First Mission</Button>
                        </Link>
                    </Card>
                )}
            </section>

            {/* Popular Waypoints */}
            <section className="dashboard-section">
                <div className="section-header">
                    <h2 className="section-title">Global Hotspots</h2>
                    <Link to="/search/cities" className="link-primary flex items-center gap-2">
                        Star Maps <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="destinations-row">
                    {popularDestinations.map((dest, i) => (
                        <div key={i} className="dest-pill">
                            <div className="dest-icon-box">
                                <MapPin size={20} className="text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm leading-tight">{dest.name}</h4>
                                <p className="text-xs text-secondary">{dest.trips} active voyagers</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
