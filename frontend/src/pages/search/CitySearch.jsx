import { useState } from 'react';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { Search, MapPin, TrendingUp } from 'lucide-react';
import './CitySearch.css';

const CitySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const cities = [
        { name: 'Paris', country: 'France', costIndex: 'High', popularity: 1250 },
        { name: 'Tokyo', country: 'Japan', costIndex: 'High', popularity: 980 },
        { name: 'Bali', country: 'Indonesia', costIndex: 'Medium', popularity: 850 },
        { name: 'Bangkok', country: 'Thailand', costIndex: 'Low', popularity: 920 }
    ];

    return (
        <div className="city-search-container">
            <div className="page-header animate-fadeInDown">
                <h1 className="page-title">Explore Cities</h1>
                <p className="page-subtitle">Discover amazing destinations for your next trip</p>
            </div>

            <Card className="search-card animate-fadeInUp">
                <Input
                    placeholder="Search for cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    icon={Search}
                />
            </Card>

            <div className="cities-grid animate-fadeInUp">
                {cities.map((city, index) => (
                    <Card key={index} className="city-card">
                        <div className="city-icon">
                            <MapPin size={32} />
                        </div>
                        <h3 className="city-name">{city.name}</h3>
                        <p className="city-country">{city.country}</p>
                        <div className="city-meta">
                            <span className="cost-badge">{city.costIndex} Cost</span>
                            <span className="popularity">
                                <TrendingUp size={14} />
                                {city.popularity} trips
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CitySearch;
