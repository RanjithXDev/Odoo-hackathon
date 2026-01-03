import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripAPI } from '../../services/api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import {
    Calendar,
    FileText,
    Image as ImageIcon,
    ArrowRight,
    MapPin,
    DollarSign,
    Compass,
    Plane
} from 'lucide-react';
import './CreateTrip.css';

const CreateTrip = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        destinations: '',
        budget: '',
        coverImage: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, coverImage: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('startDate', formData.startDate);
            submitData.append('endDate', formData.endDate);
            submitData.append('description', formData.description || '');
            submitData.append('budget', formData.budget || 0);

            if (formData.destinations) {
                const destinationsArray = formData.destinations.split(',').map(d => d.trim());
                destinationsArray.forEach(dest => {
                    submitData.append('destinations', dest);
                });
            }

            if (formData.coverImage) {
                submitData.append('coverImage', formData.coverImage);
            }

            const response = await tripAPI.create(submitData);

            if (response.data.success) {
                const tripId = response.data.trip._id;
                navigate(`/trips/${tripId}/itinerary`);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to initialize voyage');
            setLoading(false);
        }
    };

    return (
        <div className="create-trip-container">
            <header className="page-header">
                <h1 className="page-title voyage-gradient-text">Initialize New Voyage</h1>
                <p className="page-subtitle">Plot your coordinates and set the mission parameters.</p>
            </header>

            <div className="create-trip-card animate-scaleIn">
                <form onSubmit={handleSubmit} className="create-trip-form">
                    {error && (
                        <div className="error-banner animate-fadeInDown">
                            {error}
                        </div>
                    )}

                    <section className="form-section">
                        <h3 className="form-section-title">
                            <Compass size={24} /> Mission Identity
                        </h3>

                        <Input
                            label="Voyage Designation"
                            name="name"
                            placeholder="e.g., Arctic Expedition 2026"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-row">
                            <Input
                                label="Launch Date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                icon={Calendar}
                                required
                            />
                            <Input
                                label="Return Date"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                icon={Calendar}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <Input
                                label="Target Sectors (Destinations)"
                                name="destinations"
                                placeholder="Paris, Tokyo, Mars..."
                                value={formData.destinations}
                                onChange={handleChange}
                                icon={MapPin}
                            />
                            <Input
                                label="Budget Allocation (₹)"
                                name="budget"
                                type="number"
                                placeholder="Resource limit"
                                value={formData.budget}
                                onChange={handleChange}
                                icon={DollarSign}
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">Mission Objectives (Description)</label>
                            <textarea
                                name="description"
                                className="input textarea"
                                placeholder="Summary of the planned itinerary and goals..."
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                    </section>

                    <section className="form-section">
                        <h3 className="form-section-title">
                            <Plane size={24} /> Visual Reconnaissance
                        </h3>

                        <div className="image-upload-area">
                            {imagePreview ? (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Mission preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setFormData(prev => ({ ...prev, coverImage: null }));
                                        }}
                                    >
                                        Scrap Image
                                    </button>
                                </div>
                            ) : (
                                <label className="image-upload-label">
                                    <ImageIcon size={64} />
                                    <p className="font-bold">Identify Mission Cover</p>
                                    <p className="text-xs text-secondary mt-1">Click to upload satellite imagery or photos</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                </label>
                            )}
                        </div>
                    </section>

                    <footer className="form-actions">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/app')}
                        >
                            Abort Mission
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            icon={ArrowRight}
                            loading={loading}
                        >
                            Confirm & Plot Route
                        </Button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CreateTrip;
