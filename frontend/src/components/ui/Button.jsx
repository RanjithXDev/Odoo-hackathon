import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    icon: Icon,
    loading = false,
    disabled = false,
    onClick,
    type = 'button',
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''} ${className}`}
            onClick={onClick}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="btn-spinner"></div>
            ) : (
                <>
                    {Icon && <Icon size={18} />}
                    <span>{children}</span>
                </>
            )}
        </button>
    );
};

export default Button;
