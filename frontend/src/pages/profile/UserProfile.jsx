import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { User, Mail, Save } from 'lucide-react';
import './UserProfile.css';

const UserProfile = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(formData);
        alert('Profile updated successfully!');
    };

    return (
        <div className="profile-container">
            <div className="page-header animate-fadeInDown">
                <h1 className="page-title">Profile Settings</h1>
                <p className="page-subtitle">Manage your account information</p>
            </div>

            <Card className="profile-card animate-fadeInUp">
                <div className="profile-avatar-section">
                    <div className="profile-avatar-large">
                        <User size={48} />
                    </div>
                    <Button variant="secondary" size="small">Change Photo</Button>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        icon={User}
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        icon={Mail}
                    />
                    <div className="input-group">
                        <label className="input-label">Bio</label>
                        <textarea
                            className="input textarea"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            rows="4"
                            placeholder="Tell us about yourself..."
                        />
                    </div>
                    <Button type="submit" variant="primary" icon={Save}>
                        Save Changes
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default UserProfile;
