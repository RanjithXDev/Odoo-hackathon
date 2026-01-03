import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, Globe } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <nav className="navbar glass-strong">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <Globe className="brand-icon" size={32} />
                    <span className="brand-text gradient-text">GlobeTrotter</span>
                </Link>

                <div className="navbar-actions">
                    <ThemeToggle />
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
                            <div className="user-menu-dropdown glass animate-fadeInDown">
                                <Link
                                    to="/profile"
                                    className="menu-item"
                                    onClick={() => setShowUserMenu(false)}
                                >
                                    <User size={18} />
                                    <span>Profile</span>
                                </Link>
                                <button className="menu-item" onClick={logout}>
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
