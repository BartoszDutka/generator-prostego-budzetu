import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { saveProfile } from '../firebase/db';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) return setError('Hasła nie są identyczne.');
    if (password.length < 8) return setError('Hasło musi mieć co najmniej 8 znaków.');
    if (!accepted) return setError('Musisz zaakceptować Regulamin i Politykę Prywatności.');
    setLoading(true);
    try {
      const userCredential = await register(email, password);
      const user = userCredential.user;

      // Save displayName to Firebase Auth
      await updateProfile(user, { displayName: fullName });

      // Save first/last name to Firestore profile
      const parts = fullName.trim().split(' ');
      const firstName = parts[0] || '';
      const lastName = parts.slice(1).join(' ') || '';
      await saveProfile(user.uid, { firstName, lastName });

      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Ten adres email jest już zajęty.');
      } else {
        setError('Nie udało się utworzyć konta. Spróbuj ponownie.');
      }
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
      setError('Nie udało się zarejestrować przez Google.');
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all";

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Heading above card */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-[#111827]">Generator prostego budżetu</h1>
            <p className="text-[#6B7280] mt-2 text-sm">
              Twoja droga do finansowego spokoju zaczyna się tutaj.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8">
            {error && (
              <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] rounded-lg px-4 py-3 text-sm mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">Imię i nazwisko</label>
                <input type="text" className={inputCls} placeholder="Jan Kowalski" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#374151] mb-1.5">Adres email</label>
                <input type="email" className={inputCls} placeholder="nazwa@przyklad.pl" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Hasło</label>
                  <input type="password" className={inputCls} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Potwierdź hasło</label>
                  <input type="password" className={inputCls} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
              </div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#2563EB] flex-shrink-0" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                <span className="text-sm text-[#6B7280]">
                  Akceptuję <Link to="/regulamin" className="text-[#2563EB] hover:underline">Regulamin</Link> oraz{' '}
                  <Link to="/polityka-prywatnosci" className="text-[#2563EB] hover:underline">Politykę Prywatności</Link> serwisu.
                </span>
              </label>
              <button type="submit" disabled={loading} className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60 text-base">
                {loading ? 'Tworzenie konta...' : 'Zarejestruj się'}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <hr className="flex-1 border-[#E5E7EB]" />
              <span className="text-xs text-[#9CA3AF] uppercase tracking-wider">LUB KONTYNUUJ PRZEZ</span>
              <hr className="flex-1 border-[#E5E7EB]" />
            </div>

            <button onClick={handleGoogle} disabled={loading} className="w-full flex items-center justify-center gap-3 bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#374151] font-medium py-2.5 rounded-lg transition-colors text-sm">
              <GoogleIcon />
              Zarejestruj się przez Google
            </button>

            <p className="text-center text-sm text-[#6B7280] mt-5">
              Masz już konto?{' '}
              <Link to="/login" className="text-[#2563EB] font-semibold hover:underline">Zaloguj się</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
