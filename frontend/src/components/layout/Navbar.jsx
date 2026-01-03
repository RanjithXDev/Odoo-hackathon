import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, Globe, Map } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <Link to="/app" className="navbar-brand">
                    <Globe className="brand-icon" size={32} />
                    <span className="brand-text">GlobeTrotter</span>
                </Link>

                <div className="navbar-actions">
                    <ThemeToggle />

                    {user && (
                        <div className="user-menu-container">
                            <button
                                className="user-menu-trigger"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                            >
                                <div className="user-avatar">
                                    {user?.avatar ? (
                                        <img src={user.avatar} alt={user.name} />
                                    ) : (
                                        <User size={20} />
                                    )}
                                </div>
                                <span className="user-name">{user?.name}</span>
                            </button>

                            {showUserMenu && (
                                <div className="user-menu-dropdown animate-scaleIn">
                                    <Link
                                        to="/profile"
                                        className="menu-item"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <User size={18} />
                                        <span>Commander Profile</span>
                                    </Link>
                                    <Link
                                        to="/trips"
                                        className="menu-item"
                                        onClick={() => setShowUserMenu(false)}
                                    >
                                        <Map size={18} />
                                        <span>Mission Log</span>
                                    </Link>
                                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '4px 8px' }} />
                                    <button className="menu-item menu-item-danger" onClick={logout}>
                                        <LogOut size={18} />
                                        <span>Exit Voyage</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
