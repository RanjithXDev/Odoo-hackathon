import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, Globe } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

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
            <div className="auth-background"></div>

            <div className="auth-content">
                <div className="auth-card glass-strong animate-scaleIn">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <Globe size={48} className="logo-icon" />
                        </div>
                        <h1 className="auth-title gradient-text">Welcome Back</h1>
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
                            label="Email"
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
                            <Link to="/forgot-password" className="link-primary">
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
                            <Link to="/signup" className="link-primary font-semibold">
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
