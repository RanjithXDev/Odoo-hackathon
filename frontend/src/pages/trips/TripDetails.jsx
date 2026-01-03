import { useParams, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, MapPin, DollarSign, Edit, Share2, Trash2 } from 'lucide-react';
import './TripDetails.css';

const TripDetails = () => {
    const { tripId } = useParams();

    // Mock data
    const trip = {
        id: tripId,
        name: 'European Adventure',
        destinations: ['Paris', 'Rome', 'Barcelona'],
        startDate: '2026-03-15',
        endDate: '2026-03-25',
        budget: 3500,
        description: 'An amazing journey through Europe visiting iconic cities and experiencing diverse cultures.',
        stops: 3
    };

    return (
        <div className="trip-details-container">
            <div className="trip-details-header animate-fadeInDown">
                <div>
                    <h1 className="page-title">{trip.name}</h1>
                    <p className="page-subtitle">{trip.description}</p>
                </div>
                <div className="header-actions">
                    <Link to={`/trips/${tripId}/itinerary`}>
                        <Button variant="primary" icon={Edit}>Edit Itinerary</Button>
                    </Link>
                    <Button variant="secondary" icon={Share2}>Share</Button>
                </div>
            </div>

            <div className="trip-details-content animate-fadeInUp">
                <Card className="trip-info-card">
                    <h3>Trip Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <Calendar size={20} />
                            <div>
                                <p className="info-label">Duration</p>
                                <p className="info-value">{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <MapPin size={20} />
                            <div>
                                <p className="info-label">Destinations</p>
                                <p className="info-value">{trip.stops} stops</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <DollarSign size={20} />
                            <div>
                                <p className="info-label">Budget</p>
                                <p className="info-value">${trip.budget}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="trip-tabs">
                    <Link to={`/trips/${tripId}/view`} className="tab-link">
                        <Button variant="secondary">View Itinerary</Button>
                    </Link>
                    <Link to={`/trips/${tripId}/budget`} className="tab-link">
                        <Button variant="secondary">Budget Breakdown</Button>
                    </Link>
                    <Link to={`/trips/${tripId}/timeline`} className="tab-link">
                        <Button variant="secondary">Timeline</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
