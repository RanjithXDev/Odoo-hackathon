import './Input.css';

const Input = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    icon: Icon,
    required = false,
    disabled = false,
    className = '',
    ...props
}) => {
    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label className="input-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}
            <div className="input-wrapper">
                {Icon && (
                    <div className="input-icon">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    type={type}
                    className={`input ${Icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    {...props}
                />
            </div>
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;
