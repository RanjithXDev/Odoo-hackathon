import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tripAPI } from '../../services/api';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
    PlusCircle,
    Map,
    Calendar,
    MapPin,
    DollarSign,
    Edit,
    Trash2
} from 'lucide-react';
import './MyTrips.css';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, upcoming, past

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            const response = await tripAPI.getAll();

            if (response.data.success) {
                setTrips(response.data.trips || []);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (tripId) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            try {
                await tripAPI.delete(tripId);
                // Remove from local state
                setTrips(trips.filter(trip => trip._id !== tripId));
            } catch (error) {
                console.error('Error deleting trip:', error);
                alert('Failed to delete trip');
            }
        }
    };

    const filterTrips = (tripsList) => {
        const now = new Date();

        switch (filter) {
            case 'upcoming':
                return tripsList.filter(trip => new Date(trip.startDate) > now);
            case 'past':
                return tripsList.filter(trip => new Date(trip.endDate) < now);
            default:
                return tripsList;
        }
    };

    const filteredTrips = filterTrips(trips);

    if (loading) {
        return (
            <div className="my-trips-container">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your trips...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="my-trips-container">
            <div className="page-header animate-fadeInDown">
                <div>
                    <h1 className="page-title">My Trips</h1>
                    <p className="page-subtitle">Manage all your travel plans</p>
                </div>
                <Link to="/trips/create">
                    <Button variant="primary" icon={PlusCircle}>
                        Create New Trip
                    </Button>
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs animate-fadeInUp">
                <button
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Trips ({trips.length})
                </button>
                <button
                    className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setFilter('upcoming')}
                >
                    Upcoming ({trips.filter(t => new Date(t.startDate) > new Date()).length})
                </button>
                <button
                    className={`filter-tab ${filter === 'past' ? 'active' : ''}`}
                    onClick={() => setFilter('past')}
                >
                    Past ({trips.filter(t => new Date(t.endDate) < new Date()).length})
                </button>
            </div>

            {/* Trips Grid */}
            {filteredTrips.length > 0 ? (
                <div className="trips-grid animate-fadeInUp">
                    {filteredTrips.map((trip) => (
                        <Card key={trip._id} className="trip-card">
                            <div className="trip-image">
                                {trip.coverImage ? (
                                    <img
                                        src={`http://localhost:5000${trip.coverImage}`}
                                        alt={trip.name}
                                        className="trip-cover-image"
                                    />
                                ) : (
                                    <div className="trip-image-placeholder">
                                        <Map size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="trip-content">
                                <h3 className="trip-name">{trip.name}</h3>

                                <div className="trip-info">
                                    <div className="trip-info-item">
                                        <MapPin size={16} />
                                        <span>{trip.destinations?.join(', ') || 'No destinations'}</span>
                                    </div>

                                    <div className="trip-info-item">
                                        <Calendar size={16} />
                                        <span>
                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className="trip-info-item">
                                        <DollarSign size={16} />
                                        <span>₹{trip.budget?.toLocaleString('en-IN') || 0}</span>
                                    </div>
                                </div>

                                {trip.description && (
                                    <p className="trip-description">{trip.description}</p>
                                )}
                            </div>

                            <div className="trip-actions">
                                <Link to={`/trips/${trip._id}`}>
                                    <Button variant="secondary" size="small">
                                        View Details
                                    </Button>
                                </Link>
                                <Link to={`/trips/${trip._id}/itinerary`}>
                                    <Button variant="outline" size="small" icon={Edit}>
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="danger"
                                    size="small"
                                    icon={Trash2}
                                    onClick={() => handleDelete(trip._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="empty-state animate-fadeInUp">
                    <Map className="empty-state-icon" size={64} />
                    <h3 className="empty-state-title">
                        {filter === 'all' ? 'No trips yet' : `No ${filter} trips`}
                    </h3>
                    <p className="empty-state-description">
                        {filter === 'all'
                            ? 'Start planning your next adventure!'
                            : `You don't have any ${filter} trips.`
                        }
                    </p>
                    <Link to="/trips/create">
                        <Button variant="primary" icon={PlusCircle}>
                            Create Your First Trip
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyTrips;
