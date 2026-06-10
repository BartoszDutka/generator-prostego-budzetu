import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB]">
        <div className="w-full px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-[#111827] text-sm mb-0.5">Generator prostego budżetu</p>
          <p className="text-xs text-[#9CA3AF]">© 2026 Generator prostego budżetu. Wszelkie prawa zastrzeżone.</p>
        </div>
        <div className="flex flex-wrap gap-5">
          <Link to="/polityka-prywatnosci" className="text-sm text-[#6B7280] hover:text-[#374151] transition-colors">
            Polityka prywatności
          </Link>
          <Link to="/regulamin" className="text-sm text-[#6B7280] hover:text-[#374151] transition-colors">
            Regulamin
          </Link>
          <Link to="/pomoc" className="text-sm text-[#6B7280] hover:text-[#374151] transition-colors">
            Centrum pomocy
          </Link>
          <Link to="/kontakt" className="text-sm text-[#6B7280] hover:text-[#374151] transition-colors">
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  );
}
