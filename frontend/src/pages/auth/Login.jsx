import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, Globe, Plane, Compass, Map, Wind } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const cardRef = useRef(null);

    // Mouse Parallax Effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!cardRef.current) return;
            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (cardRef.current) {
                cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            {/* Dynamic Background */}
            <div className="auth-background-wrapper">
                <div className="auth-background-sky"></div>
                <div className="sun"></div>

                {/* Decorative Clouds */}
                <div className="cloud cloud-1"><Wind size={120} color="white" /></div>
                <div className="cloud cloud-2"><Wind size={180} color="white" /></div>
                <div className="cloud cloud-3"><Wind size={150} color="white" /></div>

                {/* Animated Plane */}
                <div className="plane-path">
                    <Plane className="plane" size={24} />
                </div>

                {/* Floating Icons */}
                <div className="floating-icons">
                    <Compass className="float-icon icon-1" size={40} />
                    <Map className="float-icon icon-2" size={32} />
                </div>
            </div>

            <div className="auth-content" ref={cardRef}>
                <div className="auth-card animate-scaleIn">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <div className="logo-wrapper">
                                <Globe size={40} className="logo-icon" />
                            </div>
                        </div>
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Sign in to continue your journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-banner animate-fadeInDown">
                                {error}
                            </div>
                        )}

                        <Input
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={Mail}
                            required
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            required
                        />

                        <div className="auth-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>Remember me</span>
                            </label>
                            <Link to="/forgot-password" name="forgot-password" className="link-primary">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            loading={loading}
                            className="auth-submit"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup" className="link-primary">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
