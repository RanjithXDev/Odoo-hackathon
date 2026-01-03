import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { Search, MapPin, Calendar, Users, TrendingUp, ArrowRight, Globe } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const topRegions = [
        { id: 1, name: 'Goa', image: null, trips: 1250 },
        { id: 2, name: 'Kerala', image: null, trips: 980 },
        { id: 3, name: 'Rajasthan', image: null, trips: 1100 },
        { id: 4, name: 'Himachal', image: null, trips: 850 },
        { id: 5, name: 'Kashmir', image: null, trips: 920 }
    ];

    const previousTrips = [
        {
            id: 1,
            destination: 'Goa Beach Paradise',
            user: 'Authorized Panther',
            image: null,
            likes: 245
        },
        {
            id: 2,
            destination: 'Kerala Backwaters',
            user: 'Accurate Yak',
            image: null,
            likes: 189
        },
        {
            id: 3,
            destination: 'Rajasthan Heritage',
            user: 'Virtuous Caterpillar',
            image: null,
            likes: 312
        }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/login');
        }
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="landing-header">
                <div className="header-container">
                    <div className="brand">
                        <Globe size={32} className="brand-icon" />
                        <span className="brand-name gradient-text">GlobeTrotter</span>
                    </div>
                    <div className="header-actions">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="primary">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="hero-banner animate-fadeInDown">
                <div className="banner-overlay"></div>
                <div className="banner-content">
                    <h1 className="hero-title">
                        Discover India's Hidden Gems
                    </h1>
                    <p className="hero-subtitle">
                        Plan your perfect journey across incredible destinations
                    </p>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hero-search">
                        <div className="search-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search destinations, cities, or experiences..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="search-filters">
                            <button type="button" className="filter-btn">
                                <Users size={16} />
                                Group by
                            </button>
                            <button type="button" className="filter-btn">
                                <TrendingUp size={16} />
                                Filter
                            </button>
                            <button type="button" className="filter-btn">
                                Sort by...
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Main Content */}
            <main className="landing-main">
                <div className="container">
                    {/* Top Regional Selections */}
                    <section className="regional-section animate-fadeInUp">
                        <h2 className="section-title">Top Regional Selections</h2>
                        <div className="regional-grid">
                            {topRegions.map((region) => (
                                <Card key={region.id} className="region-card">
                                    <div className="region-image">
                                        <MapPin size={48} />
                                    </div>
                                    <div className="region-info">
                                        <h3 className="region-name">{region.name}</h3>
                                        <p className="region-trips">
                                            <TrendingUp size={14} />
                                            {region.trips} trips
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* Previous Trips */}
                    <section className="trips-section animate-fadeInUp">
                        <div className="section-header">
                            <h2 className="section-title">Previous Trips</h2>
                            <button className="plan-trip-btn" onClick={() => navigate('/signup')}>
                                <span>+</span> Plan a trip
                            </button>
                        </div>

                        <div className="trips-grid">
                            {previousTrips.map((trip) => (
                                <Card key={trip.id} className="trip-card-landing">
                                    <div className="trip-image-landing">
                                        <Calendar size={48} />
                                    </div>
                                    <div className="trip-details">
                                        <h3 className="trip-destination">{trip.destination}</h3>
                                        <div className="trip-meta-landing">
                                            <div className="trip-user">
                                                <div className="user-avatar-small">
                                                    {trip.user.charAt(0)}
                                                </div>
                                                <span className="user-name-small">{trip.user}</span>
                                            </div>
                                            <div className="trip-likes">
                                                ❤️ {trip.likes}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="cta-section animate-fadeInUp">
                        <Card className="cta-card card-gradient">
                            <h2 className="cta-title">Start Your Journey Today</h2>
                            <p className="cta-description">
                                Join thousands of travelers exploring India's most beautiful destinations
                            </p>
                            <Link to="/signup">
                                <Button variant="secondary" size="large" icon={ArrowRight}>
                                    Create Free Account
                                </Button>
                            </Link>
                        </Card>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <Globe size={24} />
                            <span>GlobeTrotter</span>
                        </div>
                        <p className="footer-text">
                            Your trusted companion for exploring India and beyond
                        </p>
                        <div className="footer-links">
                            <a href="#about">About</a>
                            <a href="#contact">Contact</a>
                            <a href="#privacy">Privacy</a>
                            <a href="#terms">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
