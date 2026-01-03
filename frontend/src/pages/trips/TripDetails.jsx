import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tripAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
    Calendar,
    MapPin,
    DollarSign,
    Edit,
    Share2,
    Trash2,
    ArrowLeft,
    Compass,
    CheckCircle,
    Info
} from 'lucide-react';
import './TripDetails.css';

const TripDetails = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTripDetails();
    }, [tripId]);

    const fetchTripDetails = async () => {
        try {
            setLoading(true);
            const response = await tripAPI.getById(tripId);

            if (response.data.success) {
                setTrip(response.data.trip);
            }
        } catch (error) {
            console.error('Error fetching trip:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        try {
            const response = await tripAPI.share(tripId);
            if (response.data.success) {
                const token = response.data.shareToken;
                const shareUrl = `${window.location.origin}/shared/${token}`;
                navigator.clipboard.writeText(shareUrl);
                alert('Share link copied to clipboard!');
            }
        } catch (error) {
            console.error('Error sharing trip:', error);
            alert('Failed to generate share link');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you certain you want to scrap this mission? All logged data will be lost forever.')) {
            try {
                await tripAPI.delete(tripId);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error deleting trip:', error);
                alert('Failed to delete trip');
            }
        }
    };

    if (loading) {
        return (
            <div className="trip-details-container">
                <div className="loading-state flex flex-col items-center justify-center p-20">
                    <div className="spinner mb-6"></div>
                    <p className="voyage-gradient-text font-bold text-2xl">Accessing Mission Briefing...</p>
                </div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="trip-details-container">
                <Card className="empty-state p-12 text-center card-sunset">
                    <Info className="text-accent-vibrant mx-auto mb-6" size={80} />
                    <h3 className="text-3xl font-bold mb-4">Mission Intel Missing</h3>
                    <p className="text-secondary mb-8 max-w-md mx-auto">
                        This waypoint appears to have been purged or relocated. Return to Mission Control to find a new route.
                    </p>
                    <Link to="/dashboard">
                        <Button variant="primary">Return to Command Center</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const tripDuration = Math.ceil(
        (new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="trip-details-container">
            <div className="trip-details-header animate-scaleIn">
                <div className="header-top">
                    <Link to="/app" className="back-link">
                        <ArrowLeft size={20} />
                        <span>Command Center</span>
                    </Link>
                </div>

                <div className="trip-cover">
                    {trip.coverImage ? (
                        <img src={`http://localhost:5000${trip.coverImage}`} alt={trip.name} />
                    ) : (
                        <div className="trip-placeholder-icon" style={{ height: '100%', background: 'var(--gradient-voyage)' }}>
                            <Compass size={120} color="white" className="mx-auto" />
                        </div>
                    )}
                </div>

                <div className="header-content">
                    <div>
                        <h1 className="page-title voyage-gradient-text">{trip.name}</h1>
                        <p className="page-subtitle">{trip.description || 'No mission summary provided.'}</p>
                    </div>
                    <div className="header-actions">
                        <Link to={`/trips/${tripId}/itinerary`}>
                            <Button variant="primary" icon={Edit}>Adjust Plan</Button>
                        </Link>
                        <Button variant="glass" icon={Share2} onClick={handleShare}>
                            Broadcast
                        </Button>
                        <Button variant="danger" icon={Trash2} onClick={handleDelete} className="p-3">
                            Scrap
                        </Button>
                    </div>
                </div>
            </div>

            <div className="trip-details-content">
                <div className="left-panel">
                    <Card className="trip-info-card animate-fadeInUp">
                        <h3>Mission Data</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <Calendar size={28} />
                                <div>
                                    <p className="info-label">Expedition Window</p>
                                    <p className="info-value">
                                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                    </p>
                                    <p className="info-detail">{tripDuration} days on course</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <MapPin size={28} />
                                <div>
                                    <p className="info-label">Current Waypoints</p>
                                    <p className="info-value">
                                        {trip.destinations?.join(', ') || 'Global Exploration'}
                                    </p>
                                    <p className="info-detail">{trip.destinations?.length || 0} targeted sectors</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <DollarSign size={28} />
                                <div>
                                    <p className="info-label">Voyage Resources</p>
                                    <p className="info-value">₹{trip.budget?.toLocaleString('en-IN') || 0}</p>
                                    <p className="info-detail">Allocated funds</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Placeholder for Timeline or Itinerary Preview */}
                    <div className="mt-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                        <Card className="p-8 card-voyage">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <CheckCircle className="text-secondary" /> Itinerary Progress
                            </h3>
                            <p className="text-secondary mb-6">Your travel agenda is being synchronized with local timezones.</p>
                            <Link to={`/trips/${tripId}/itinerary`}>
                                <Button variant="secondary" className="w-full">View Full Flight Plan</Button>
                            </Link>
                        </Card>
                    </div>
                </div>

                <div className="right-panel animate-fadeInRight">
                    <div className="trip-quick-links">
                        <h3>Mission Fast-Track</h3>
                        <div className="quick-links-grid">
                            <Link to={`/trips/${tripId}/view`}>
                                <Card className="quick-link-card">
                                    <h4>Briefing Doc</h4>
                                    <p>Detailed day-by-day logs</p>
                                </Card>
                            </Link>
                            <Link to={`/trips/${tripId}/budget`}>
                                <Card className="quick-link-card">
                                    <h4>Resource Tracker</h4>
                                    <p>Analyze fuel & supply costs</p>
                                </Card>
                            </Link>
                            <Link to={`/trips/${tripId}/timeline`}>
                                <Card className="quick-link-card">
                                    <h4>Chronosphere</h4>
                                    <p>Interactive journey visualizer</p>
                                </Card>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
