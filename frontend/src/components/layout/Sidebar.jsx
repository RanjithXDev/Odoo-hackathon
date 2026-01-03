import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    PlusCircle,
    Search,
    DollarSign,
    Calendar,
    User
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/trips', icon: Map, label: 'My Trips' },
        { to: '/trips/create', icon: PlusCircle, label: 'Plan New Trip' },
        { to: '/search/cities', icon: Search, label: 'Explore Cities' },
        { to: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <aside className="sidebar glass">
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
