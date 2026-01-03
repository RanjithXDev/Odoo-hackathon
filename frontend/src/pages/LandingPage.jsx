import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Search, MapPin, Calendar, Users, TrendingUp, ArrowRight, Globe, Compass, Plane } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const topRegions = [
        { id: 1, name: 'Goa', trips: 1250, desc: 'Golden Sands' },
        { id: 2, name: 'Kerala', trips: 980, desc: 'Emerald Waters' },
        { id: 3, name: 'Rajasthan', trips: 1100, desc: 'Royal Heritage' },
        { id: 4, name: 'Himachal', trips: 850, desc: 'Alpine Magic' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/signup');
        }
    };

    return (
        <div className="landing-page">
            <header className={`landing-header ${scrolled ? 'scrolled' : ''}`}>
                <div className="header-container">
                    <div className="brand">
                        <Globe size={40} className="text-primary animate-pulse" />
                        <span className="brand-name voyage-gradient-text uppercase">GlobeTrotter</span>
                    </div>
                    <div className="header-actions">
                        <Link to="/login">
                            <Button variant="ghost">Sign In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="primary" className="shimmer">Begin Voyage</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="hero-banner">
                <div className="banner-content animate-scaleIn">
                    <Plane className="floating-deco deco-1" size={80} />
                    <Compass className="floating-deco deco-2" size={120} />
                    <Globe className="floating-deco deco-3" size={60} />

                    <h1 className="hero-title">
                        Beyond the <br />
                        <span className="voyage-gradient-text">Ultimate Horizon.</span>
                    </h1>
                    <p className="hero-subtitle">
                        The definitive mission control for modern explorers. Plot your coordinates,
                        synchronize your crew, and discover the world's most guarded waypoints.
                    </p>

                    <form onSubmit={handleSearch} className="hero-search">
                        <div className="search-wrapper">
                            <Compass className="text-primary mr-6 animate-spin-slow" size={32} />
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Enter secret coordinates or destination..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="primary" size="large" className="search-btn-hero shimmer">
                            Initialize Search
                        </Button>
                    </form>
                </div>
            </section>

            <main className="landing-main container">
                <section className="regional-section">
                    <h2 className="section-title">Prime Coordinates</h2>
                    <div className="regional-grid">
                        {topRegions.map((region) => (
                            <Card key={region.id} className="region-card card-hover">
                                <div className="region-image-box" />
                                <div className="region-content">
                                    <h3 className="region-name">{region.name}</h3>
                                    <p className="text-secondary text-sm mb-4">{region.desc}</p>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <TrendingUp size={16} />
                                        <span>{region.trips} Voyagers</span>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </section>

                <section className="cta-section animate-fadeInUp">
                    <Card className="cta-card">
                        <h2 className="cta-title">Ready for Liftoff?</h2>
                        <p className="cta-description mb-10 text-xl opacity-80">
                            Join the global network of voyagers and start plotting your next expedition.
                        </p>
                        <Link to="/signup">
                            <Button variant="secondary" size="large" icon={ArrowRight} className="bg-white text-primary hover:bg-opacity-90">
                                Create Mission Account
                            </Button>
                        </Link>
                    </Card>
                </section>
            </main>

            <footer className="landing-footer py-20 border-t border-divider mt-20">
                <div className="container flex flex-col items-center text-center">
                    <Globe size={40} className="mb-6 opacity-40" />
                    <h3 className="text-2xl font-bold mb-4 opacity-40">GLOBETROTTER</h3>
                    <p className="text-secondary max-w-md mb-10">
                        The ultimate mission control for modern explorers and global voyagers.
                    </p>
                    <div className="flex gap-8 text-sm font-bold opacity-40">
                        <Link to="/login">LOGIN</Link>
                        <Link to="/signup">SIGNUP</Link>
                        <span>© 2026 VOYAGE SYSTEM</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
