export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    outline: 'border border-primary text-primary hover:bg-primary-light',
    danger: 'bg-danger hover:bg-red-600 text-white',
    ghost: 'text-gray-text hover:text-primary hover:bg-gray-50',
    success: 'bg-success hover:bg-green-700 text-white',
    white: 'bg-white hover:bg-gray-50 text-primary border border-gray-border',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}
