import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, Globe, Plane, Wind, Compass, Map } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
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
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
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

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate('/app');
        } else {
            setError(result.error || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            {/* Dynamic Travel Background */}
            <div className="auth-bg-layers">
                <div className="auth-sky" />
                <div className="auth-sun" />

                <Wind className="auth-cloud" style={{ top: '15%', '--duration': '40s' }} size={100} />
                <Wind className="auth-cloud" style={{ top: '40%', '--duration': '60s', animationDelay: '-10s' }} size={150} />
                <Wind className="auth-cloud" style={{ top: '65%', '--duration': '50s', animationDelay: '-20s' }} size={120} />

                <Plane className="auth-plane" size={32} />

                <Compass className="float-icon" style={{ top: '20%', left: '15%', '--duration': '6s' }} size={40} />
                <Map className="float-icon" style={{ bottom: '20%', right: '15%', '--duration': '8s' }} size={48} />
            </div>

            <div className="auth-content">
                <div className="auth-card animate-scaleIn" ref={cardRef}>
                    <div className="auth-header">
                        <div className="auth-logo-box">
                            <Globe size={40} color="white" />
                        </div>
                        <h1 className="auth-title">Welcome Back</h1>
                        <p className="auth-subtitle">Continue your global adventure</p>
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
                                Join the Journey
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
