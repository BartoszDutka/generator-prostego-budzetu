export default function Card({ children, className = '', onClick }) {
  return (
    <div
      className={`bg-white border border-gray-border rounded-xl shadow-sm p-6 ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
