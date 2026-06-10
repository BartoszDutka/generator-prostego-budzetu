import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Nieprawidłowy adres email lub hasło. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch {
      setError('Nie udało się zalogować przez Google.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
            <h1 className="text-2xl font-bold text-[#111827] mb-6">Zaloguj się</h1>

            {error && (
              <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] rounded-lg px-4 py-3 text-sm mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">E-mail</label>
                <input
                  type="email"
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-[#374151]">Hasło</label>
                  <Link to="/reset-hasla" className="text-xs text-[#2563EB] hover:underline">
                    Zapomniałeś hasła?
                  </Link>
                </div>
                <input
                  type="password"
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? 'Logowanie...' : (
                  <>Zaloguj się <span>→</span></>
                )}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <hr className="flex-1 border-[#E5E7EB]" />
              <span className="text-xs text-[#9CA3AF]">lub kontynuuj przez</span>
              <hr className="flex-1 border-[#E5E7EB]" />
            </div>

            <button
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#374151] font-medium py-2.5 rounded-lg transition-colors text-sm"
            >
              <GoogleIcon />
              Zaloguj się przez Google
            </button>
          </div>

          <p className="text-center text-sm text-[#6B7280] mt-5">
            Nie masz konta?{' '}
            <Link to="/register" className="text-[#2563EB] font-semibold hover:underline">
              Zarejestruj się
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
