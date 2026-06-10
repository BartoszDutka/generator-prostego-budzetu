import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  }

  const navLinkCls = ({ isActive }) =>
    `text-sm font-medium transition-colors pb-0.5 ${
      isActive
        ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
        : 'text-[#374151] hover:text-[#2563EB]'
    }`;

  return (
    <nav className="bg-white border-b border-[#E5E7EB]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={currentUser ? '/dashboard' : '/'} className="flex-shrink-0">
            <Logo />
          </Link>

          {currentUser ? (
            /* ── LOGGED IN ── */
            <>
              {/* Center nav links */}
              <div className="hidden sm:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                <NavLink to="/dashboard" className={navLinkCls}>Pulpit</NavLink>
                <NavLink to="/history" className={navLinkCls}>Historia</NavLink>
                <NavLink to="/add" className={navLinkCls}>Dodaj operację</NavLink>
              </div>
              {/* Right: profile + logout */}
              <div className="flex items-center gap-5">
                <NavLink to="/profile" className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition-colors ${isActive ? 'text-[#2563EB]' : 'text-[#374151] hover:text-[#2563EB]'}`
                }>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mój profil
                </NavLink>
                <button onClick={handleLogout} className="text-sm font-semibold text-[#EF4444] hover:text-red-600 transition-colors">
                  Wyloguj się
                </button>
              </div>
            </>
          ) : (
            /* ── PUBLIC ── */
            <div className="flex items-center gap-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-[#2563EB]' : 'text-[#374151] hover:text-[#2563EB]'}`
                }
              >
                Zaloguj się
              </NavLink>
              <NavLink
                to="/register"
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
              >
                Zarejestruj się
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
