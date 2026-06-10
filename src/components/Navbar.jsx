import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
    setMenuOpen(false);
  }

  const navLinkCls = ({ isActive }) =>
    `text-sm font-medium transition-colors whitespace-nowrap pb-0.5 ${
      isActive
        ? 'text-[#2563EB] border-b-2 border-[#2563EB]'
        : 'text-[#374151] hover:text-[#2563EB]'
    }`;

  const mobileNavLinkCls = ({ isActive }) =>
    `block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'text-[#2563EB] bg-[#EFF6FF]'
        : 'text-[#374151] hover:text-[#2563EB] hover:bg-[#F3F4F6]'
    }`;

  return (
    <nav className="bg-white border-b border-[#E5E7EB]">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link to={currentUser ? '/dashboard' : '/'} className="flex-shrink-0">
            <Logo />
          </Link>

          {currentUser ? (
            <>
              {/* Center nav — visible only on large screens */}
              <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
                <NavLink to="/dashboard" className={navLinkCls}>Pulpit</NavLink>
                <NavLink to="/history" className={navLinkCls}>Historia</NavLink>
                <NavLink to="/add" className={navLinkCls}>Dodaj operację</NavLink>
              </div>

              {/* Right — visible only on large screens */}
              <div className="hidden lg:flex items-center gap-5 flex-shrink-0">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                      isActive ? 'text-[#2563EB]' : 'text-[#374151] hover:text-[#2563EB]'
                    }`
                  }
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mój profil
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold whitespace-nowrap text-[#EF4444] hover:text-red-600 transition-colors"
                >
                  Wyloguj się
                </button>
              </div>

              {/* Hamburger — visible below lg */}
              <button
                className="lg:hidden p-2 rounded-lg text-[#374151] hover:bg-[#F3F4F6] transition-colors flex-shrink-0"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Menu"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Public links — desktop */}
              <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive ? 'text-[#2563EB]' : 'text-[#374151] hover:text-[#2563EB]'
                    }`
                  }
                >
                  Zaloguj się
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors whitespace-nowrap"
                >
                  Zarejestruj się
                </NavLink>
              </div>

              {/* Hamburger — mobile only (public) */}
              <button
                className="sm:hidden p-2 rounded-lg text-[#374151] hover:bg-[#F3F4F6] transition-colors flex-shrink-0"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Menu"
              >
                {menuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] bg-white px-4 py-3 space-y-1">
          {currentUser ? (
            <>
              <NavLink to="/dashboard" className={mobileNavLinkCls} onClick={() => setMenuOpen(false)}>Pulpit</NavLink>
              <NavLink to="/history" className={mobileNavLinkCls} onClick={() => setMenuOpen(false)}>Historia</NavLink>
              <NavLink to="/add" className={mobileNavLinkCls} onClick={() => setMenuOpen(false)}>Dodaj operację</NavLink>
              <NavLink to="/profile" className={mobileNavLinkCls} onClick={() => setMenuOpen(false)}>Mój profil</NavLink>
              <div className="pt-2 border-t border-[#F3F4F6]">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-semibold text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                >
                  Wyloguj się
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={mobileNavLinkCls} onClick={() => setMenuOpen(false)}>
                Zaloguj się
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors text-center"
              >
                Zarejestruj się
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
