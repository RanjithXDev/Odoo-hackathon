import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, User as UserIcon, Globe } from 'lucide-react';
import './Auth.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

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
        const result = await signup(name, email, password);
        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Signup failed');
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
                        <h1 className="auth-title gradient-text">Join GlobeTrotter</h1>
                        <p className="auth-subtitle">Start planning your dream trips today</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        {error && (
                            <div className="error-banner animate-fadeInDown">
                                {error}
                            </div>
                        )}

                        <Input
                            type="text"
                            label="Full Name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={UserIcon}
                            required
                        />

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            icon={Lock}
                            required
                        />

                        <Input
                            type="password"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            icon={Lock}
                            required
                        />

                        <div className="auth-terms">
                            <label className="checkbox-label">
                                <input type="checkbox" required />
                                <span>
                                    I agree to the{' '}
                                    <Link to="/terms" className="link-primary">
                                        Terms of Service
                                    </Link>
                                </span>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            loading={loading}
                            className="auth-submit"
                        >
                            Create Account
                        </Button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Already have an account?{' '}
                            <Link to="/login" className="link-primary font-semibold">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
