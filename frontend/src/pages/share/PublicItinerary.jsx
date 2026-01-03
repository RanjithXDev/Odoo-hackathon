import { useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Share2, Copy } from 'lucide-react';
import './PublicItinerary.css';

const PublicItinerary = () => {
    const { tripId } = useParams();

    return (
        <div className="public-itinerary-container">
            <div className="public-header">
                <h1 className="page-title gradient-text">European Adventure</h1>
                <p className="page-subtitle">Shared by Travel Enthusiast</p>
                <div className="public-actions">
                    <Button variant="primary" icon={Copy}>Copy This Trip</Button>
                    <Button variant="secondary" icon={Share2}>Share</Button>
                </div>
            </div>

            <Card className="public-content">
                <p>Public read-only itinerary view will be displayed here</p>
            </Card>
        </div>
    );
};

export default PublicItinerary;
