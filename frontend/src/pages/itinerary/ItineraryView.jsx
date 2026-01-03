import { useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';

const ItineraryView = () => {
    const { tripId } = useParams();

    return (
        <div className="container">
            <h1 className="page-title">Itinerary View</h1>
            <Card><p>Day-wise itinerary view will be displayed here</p></Card>
        </div>
    );
};

export default ItineraryView;
