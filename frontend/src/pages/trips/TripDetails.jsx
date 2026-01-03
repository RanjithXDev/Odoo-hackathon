import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tripAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, MapPin, DollarSign, Edit, Share2, Trash2, ArrowLeft } from 'lucide-react';
import './TripDetails.css';

const TripDetails = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [shareToken, setShareToken] = useState(null);

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
                setShareToken(token);
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
        if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
            try {
                await tripAPI.delete(tripId);
                navigate('/trips');
            } catch (error) {
                console.error('Error deleting trip:', error);
                alert('Failed to delete trip');
            }
        }
    };

    if (loading) {
        return (
            <div className="trip-details-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading trip details...</p>
                </div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="trip-details-container">
                <div className="empty-state">
                    <h3>Trip not found</h3>
                    <Link to="/trips">
                        <Button variant="primary">Back to My Trips</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const tripDuration = Math.ceil(
        (new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)
    );

    return (
        <div className="trip-details-container">
            <div className="trip-details-header animate-fadeInDown">
                <div className="header-top">
                    <Link to="/trips" className="back-link">
                        <ArrowLeft size={20} />
                        <span>Back to Trips</span>
                    </Link>
                </div>

                {trip.coverImage && (
                    <div className="trip-cover">
                        <img src={`http://localhost:5000${trip.coverImage}`} alt={trip.name} />
                    </div>
                )}

                <div className="header-content">
                    <div>
                        <h1 className="page-title">{trip.name}</h1>
                        <p className="page-subtitle">{trip.description || 'No description provided'}</p>
                    </div>
                    <div className="header-actions">
                        <Link to={`/trips/${tripId}/itinerary`}>
                            <Button variant="primary" icon={Edit}>Edit Itinerary</Button>
                        </Link>
                        <Button variant="secondary" icon={Share2} onClick={handleShare}>
                            Share
                        </Button>
                        <Button variant="danger" icon={Trash2} onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            <div className="trip-details-content animate-fadeInUp">
                <Card className="trip-info-card">
                    <h3>Trip Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <Calendar size={24} />
                            <div>
                                <p className="info-label">Duration</p>
                                <p className="info-value">
                                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                </p>
                                <p className="info-detail">{tripDuration} days</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <MapPin size={24} />
                            <div>
                                <p className="info-label">Destinations</p>
                                <p className="info-value">
                                    {trip.destinations?.join(', ') || 'No destinations'}
                                </p>
                                <p className="info-detail">{trip.destinations?.length || 0} locations</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <DollarSign size={24} />
                            <div>
                                <p className="info-label">Budget</p>
                                <p className="info-value">₹{trip.budget?.toLocaleString('en-IN') || 0}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="trip-quick-links">
                    <h3>Quick Links</h3>
                    <div className="quick-links-grid">
                        <Link to={`/trips/${tripId}/view`}>
                            <Card className="quick-link-card">
                                <h4>View Itinerary</h4>
                                <p>See your complete travel schedule</p>
                            </Card>
                        </Link>
                        <Link to={`/trips/${tripId}/budget`}>
                            <Card className="quick-link-card">
                                <h4>Budget Breakdown</h4>
                                <p>Track your expenses</p>
                            </Card>
                        </Link>
                        <Link to={`/trips/${tripId}/timeline`}>
                            <Card className="quick-link-card">
                                <h4>Timeline</h4>
                                <p>Visual trip timeline</p>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
