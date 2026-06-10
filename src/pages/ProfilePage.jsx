import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getProfile, saveProfile } from '../firebase/db';

export default function ProfilePage() {
  const { currentUser, changePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email] = useState(currentUser?.email || '');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileError, setProfileError] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    const [googleFirst = '', googleLast = ''] = (currentUser.displayName || '').split(' ');
    getProfile(currentUser.uid).then((data) => {
      setFirstName(data.firstName || googleFirst);
      setLastName(data.lastName || googleLast);
    });
  }, [currentUser]);

  async function handleProfileSave(e) {
    e.preventDefault();
    setProfileError('');
    setProfileLoading(true);
    try {
      await saveProfile(currentUser.uid, { firstName, lastName });
      setProfileSuccess('Dane zostały zapisane.');
      setTimeout(() => setProfileSuccess(''), 3000);
    } catch {
      setProfileError('Nie udało się zapisać danych.');
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordChange(e) {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');
    if (newPwd.length < 8) return setPwdError('Nowe hasło musi mieć co najmniej 8 znaków.');
    if (newPwd !== repeatPwd) return setPwdError('Hasła nie są identyczne.');
    setPwdLoading(true);
    try {
      await changePassword(currentPwd, newPwd);
      setPwdSuccess('Hasło zostało zaktualizowane.');
      setCurrentPwd(''); setNewPwd(''); setRepeatPwd('');
      setTimeout(() => setPwdSuccess(''), 3000);
    } catch {
      setPwdError('Nie udało się zmienić hasła. Sprawdź obecne hasło.');
    } finally {
      setPwdLoading(false);
    }
  }

  async function handleDelete() {
    setDeleteError('');
    setDeleteLoading(true);
    try {
      await deleteAccount();
      navigate('/');
    } catch {
      setDeleteError('Nie udało się usunąć konta. Zaloguj się ponownie i spróbuj.');
    } finally {
      setDeleteLoading(false);
    }
  }

  const inputCls = "w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all";

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#111827] mb-1">Mój profil</h1>
          <p className="text-[#6B7280] text-sm mb-6">Zarządzaj swoimi danymi i ustawieniami bezpieczeństwa.</p>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Personal data */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-[#111827]">Dane osobowe</h2>
                </div>

                {profileSuccess && <div className="bg-[#F0FDF4] border border-green-200 text-[#16A34A] rounded-lg px-4 py-3 text-sm mb-4">{profileSuccess}</div>}
                {profileError && <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] rounded-lg px-4 py-3 text-sm mb-4">{profileError}</div>}

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">Imię</label>
                      <input type="text" className={inputCls} value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jan" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">Nazwisko</label>
                      <input type="text" className={inputCls} value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Kowalski" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Adres email</label>
                    <input type="email" className={`${inputCls} opacity-60 cursor-not-allowed`} value={email} readOnly />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={profileLoading} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
                      {profileLoading ? 'Zapisywanie…' : 'Zapisz zmiany'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Change password */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-[#EFF6FF] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-[#111827]">Zmiana hasła</h2>
                </div>

                {pwdSuccess && <div className="bg-[#F0FDF4] border border-green-200 text-[#16A34A] rounded-lg px-4 py-3 text-sm mb-4">{pwdSuccess}</div>}
                {pwdError && <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] rounded-lg px-4 py-3 text-sm mb-4">{pwdError}</div>}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Obecne hasło</label>
                    <input type="password" className={inputCls} placeholder="••••••••" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">Nowe hasło</label>
                      <input type="password" className={inputCls} placeholder="Min. 8 znaków" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#374151] mb-1.5">Powtórz nowe hasło</label>
                      <input type="password" className={inputCls} placeholder="" value={repeatPwd} onChange={(e) => setRepeatPwd(e.target.value)} required />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" disabled={pwdLoading} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
                      {pwdLoading ? 'Aktualizowanie…' : 'Aktualizuj hasło'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: delete account */}
            <div>
              <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
                  Usunięcie konta jest nieodwracalne. Wszystkie Twoje dane finansowe i historia transakcji zostaną trwale usunięte.
                </p>
                {deleteError && <div className="bg-[#FEF2F2] border border-red-200 text-[#EF4444] rounded-lg px-3 py-2.5 text-xs mb-4">{deleteError}</div>}
                {!deleteConfirm ? (
                  <button onClick={() => setDeleteConfirm(true)} className="w-full border border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] font-semibold py-2.5 rounded-lg text-sm transition-colors">
                    Usuń konto
                  </button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#EF4444] text-center">Czy na pewno?</p>
                    <button onClick={handleDelete} disabled={deleteLoading} className="w-full bg-[#EF4444] hover:bg-red-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
                      {deleteLoading ? 'Usuwanie...' : 'Tak, usuń moje konto'}
                    </button>
                    <button onClick={() => setDeleteConfirm(false)} className="w-full border border-[#E5E7EB] text-[#374151] hover:bg-gray-50 font-medium py-2.5 rounded-lg text-sm transition-colors">
                      Anuluj
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
