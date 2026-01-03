import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, User as UserIcon, Globe, Phone, Plane, Wind, Compass, Map } from 'lucide-react';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();
    const cardRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (cardRef.current) {
                cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        const result = await signup(name, email, password, contactNumber);
        setLoading(false);

        if (result.success) {
            navigate('/app');
        } else {
            setError(result.error || 'Signup failed');
        }
    };

    return (
        <div className="auth-container">
            {/* Dynamic Travel Background */}
            <div className="auth-bg-layers">
                <div className="auth-sky" />
                <div className="auth-sun" />

                <Wind className="auth-cloud" style={{ top: '10%', '--duration': '45s', opacity: 0.15 }} size={120} />
                <Wind className="auth-cloud" style={{ top: '35%', '--duration': '65s', animationDelay: '-15s' }} size={180} />
                <Wind className="auth-cloud" style={{ top: '70%', '--duration': '55s', animationDelay: '-25s' }} size={140} />

                <Plane className="auth-plane" style={{ animationDuration: '25s' }} size={36} />

                <Compass className="float-icon" style={{ top: '15%', right: '10%', '--duration': '7s' }} size={44} />
                <Map className="float-icon" style={{ bottom: '15%', left: '10%', '--duration': '9s' }} size={52} />
            </div>

            <div className="auth-content">
                <div className="auth-card animate-scaleIn" ref={cardRef}>
                    <div className="auth-header">
                        <div className="auth-logo-box">
                            <Globe size={40} color="white" />
                        </div>
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join the world's best travel community</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-banner animate-fadeInDown">
                                {error}
                            </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                type="text"
                                label="Full Name"
                                placeholder="Traveler Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                icon={UserIcon}
                                required
                            />
                            <Input
                                type="email"
                                label="Email Address"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={Mail}
                                required
                            />
                        </div>

                        <Input
                            type="tel"
                            label="Contact Number"
                            placeholder="+1 234 567 890"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            icon={Phone}
                        />

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                type="password"
                                label="Password"
                                placeholder="Min. 6 chars"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={Lock}
                                required
                            />

                            <Input
                                type="password"
                                label="Confirm"
                                placeholder="Match password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                icon={Lock}
                                required
                            />
                        </div>

                        <div className="auth-terms">
                            <label className="checkbox-label">
                                <input type="checkbox" required />
                                <span>I agree to the <Link to="/terms" className="link-primary">Terms & Conditions</Link></span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            loading={loading}
                            className="auth-submit"
                        >
                            Start the Adventure
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already traveling with us?{' '}
                            <Link to="/login" className="link-primary">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
