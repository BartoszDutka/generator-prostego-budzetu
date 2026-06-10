export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { height: 36, text: 'text-sm' },
    md: { height: 48, text: 'text-lg' },
    lg: { height: 48, text: 'text-xl' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className="flex items-center gap-2">
      <img
        src="/LogoG.png"
        alt="Generator prostego budżetu"
        style={{ height: s.height, width: 'auto' }}
        className="flex-shrink-0"
      />
      <span className={`${s.text} font-bold text-[#2563EB] leading-tight`}>
        Generator prostego budżetu
      </span>
    </div>
  );
}
