import { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Map, Calendar, MapPin, DollarSign, Edit, Trash2, Eye, PlusCircle } from 'lucide-react';
import './MyTrips.css';

const MyTrips = () => {
    // Mock data - will be replaced with API calls
    const [trips] = useState([
        {
            id: 1,
            name: 'European Adventure',
            destinations: ['Paris', 'Rome', 'Barcelona'],
            startDate: '2026-03-15',
            endDate: '2026-03-25',
            budget: 290000,
            stops: 3,
            image: null
        },
        {
            id: 2,
            name: 'Southeast Asia Explorer',
            destinations: ['Bangkok', 'Singapore', 'Bali'],
            startDate: '2026-06-10',
            endDate: '2026-06-24',
            budget: 232000,
            stops: 3,
            image: null
        },
        {
            id: 3,
            name: 'India Road Trip',
            destinations: ['Delhi', 'Jaipur', 'Agra'],
            startDate: '2026-08-01',
            endDate: '2026-08-15',
            budget: 85000,
            stops: 3,
            image: null
        }
    ]);

    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const handleDelete = (tripId) => {
        if (window.confirm('Are you sure you want to delete this trip?')) {
            // TODO: Implement delete functionality
            console.log('Delete trip:', tripId);
        }
    };

    return (
        <div className="my-trips-container">
            <div className="page-header animate-fadeInDown">
                <div>
                    <h1 className="page-title">My Trips</h1>
                    <p className="page-subtitle">Manage and explore your travel plans</p>
                </div>
                <Link to="/trips/create">
                    <Button variant="primary" size="large" icon={PlusCircle}>
                        Plan New Trip
                    </Button>
                </Link>
            </div>

            {trips.length > 0 ? (
                <div className={`trips-${viewMode} animate-fadeInUp`}>
                    {trips.map((trip) => (
                        <Card key={trip.id} className="trip-card-item">
                            <div className="trip-card-image">
                                <Map size={48} />
                            </div>

                            <div className="trip-card-content">
                                <h3 className="trip-card-title">{trip.name}</h3>

                                <div className="trip-card-meta">
                                    <span className="meta-item">
                                        <MapPin size={16} />
                                        {trip.stops} stops
                                    </span>
                                    <span className="meta-item">
                                        <Calendar size={16} />
                                        {new Date(trip.startDate).toLocaleDateString()}
                                    </span>
                                    <span className="meta-item">
                                        <DollarSign size={16} />
                                        ₹{trip.budget.toLocaleString('en-IN')}
                                    </span>
                                </div>

                                <div className="trip-card-destinations">
                                    {trip.destinations.join(' → ')}
                                </div>
                            </div>

                            <div className="trip-card-actions">
                                <Link to={`/trips/${trip.id}`}>
                                    <Button variant="secondary" size="small" icon={Eye}>
                                        View
                                    </Button>
                                </Link>
                                <Link to={`/trips/${trip.id}/itinerary`}>
                                    <Button variant="ghost" size="small" icon={Edit}>
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="small"
                                    icon={Trash2}
                                    onClick={() => handleDelete(trip.id)}
                                    className="btn-delete"
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="empty-state animate-fadeInUp">
                    <Map className="empty-state-icon" size={80} />
                    <h3 className="empty-state-title">No trips yet</h3>
                    <p className="empty-state-description">
                        Start planning your first adventure and create unforgettable memories!
                    </p>
                    <Link to="/trips/create">
                        <Button variant="primary" size="large" icon={PlusCircle}>
                            Create Your First Trip
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyTrips;
