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
        { to: '/app/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/app/trips', icon: Map, label: 'My Trips' },
        { to: '/app/trips/create', icon: PlusCircle, label: 'Plan New Trip' },
        { to: '/app/search/cities', icon: Search, label: 'Explore Cities' },
        { to: '/app/profile', icon: User, label: 'Profile' },
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
