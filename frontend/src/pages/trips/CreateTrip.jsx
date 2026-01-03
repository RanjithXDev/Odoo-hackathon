import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { Calendar, FileText, Image as ImageIcon, ArrowRight } from 'lucide-react';
import './CreateTrip.css';

const CreateTrip = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
        coverImage: null
    });
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        // TODO: Replace with actual API call
        setTimeout(() => {
            const tripId = Date.now();
            navigate(`/trips/${tripId}/itinerary`);
        }, 1000);
    };

    return (
        <div className="create-trip-container">
            <div className="page-header animate-fadeInDown">
                <h1 className="page-title">Plan Your Next Adventure</h1>
                <p className="page-subtitle">Let's start by creating your trip details</p>
            </div>

            <Card className="create-trip-card animate-fadeInUp">
                <form onSubmit={handleSubmit} className="create-trip-form">
                    <div className="form-section">
                        <h3 className="form-section-title">Trip Information</h3>

                        <Input
                            label="Trip Name"
                            name="name"
                            placeholder="e.g., European Summer Adventure"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <div className="form-row">
                            <Input
                                label="Start Date"
                                name="startDate"
                                type="date"
                                value={formData.startDate}
                                onChange={handleChange}
                                icon={Calendar}
                                required
                            />
                            <Input
                                label="End Date"
                                name="endDate"
                                type="date"
                                value={formData.endDate}
                                onChange={handleChange}
                                icon={Calendar}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                Description
                            </label>
                            <textarea
                                name="description"
                                className="input textarea"
                                placeholder="Describe your trip plans..."
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3 className="form-section-title">Cover Photo (Optional)</h3>

                        <div className="image-upload-area">
                            {imagePreview ? (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Cover preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setFormData(prev => ({ ...prev, coverImage: null }));
                                        }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <label className="image-upload-label">
                                    <ImageIcon size={48} />
                                    <p>Click to upload cover photo</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="form-actions">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/trips')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="large"
                            icon={ArrowRight}
                            loading={loading}
                        >
                            Continue to Itinerary
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CreateTrip;
