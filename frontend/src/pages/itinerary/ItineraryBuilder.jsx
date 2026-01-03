import { useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PlusCircle, MapPin, Calendar } from 'lucide-react';
import './ItineraryBuilder.css';

const ItineraryBuilder = () => {
    const { tripId } = useParams();

    return (
        <div className="itinerary-builder-container">
            <div className="page-header animate-fadeInDown">
                <h1 className="page-title">Build Your Itinerary</h1>
                <p className="page-subtitle">Add stops and activities to your trip</p>
            </div>

            <Card className="builder-card animate-fadeInUp">
                <div className="builder-toolbar">
                    <Button variant="primary" icon={PlusCircle}>Add Stop</Button>
                    <Button variant="secondary">Save Progress</Button>
                </div>

                <div className="empty-state">
                    <MapPin className="empty-state-icon" size={64} />
                    <h3 className="empty-state-title">Start Building Your Itinerary</h3>
                    <p className="empty-state-description">
                        Add your first destination to begin planning your journey
                    </p>
                    <Button variant="primary" icon={PlusCircle}>Add First Stop</Button>
                </div>
            </Card>
        </div>
    );
};

export default ItineraryBuilder;
