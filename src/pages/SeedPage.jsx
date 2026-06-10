import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addOperation, saveProfile, saveSavingsGoal } from '../firebase/db';
import { useNavigate } from 'react-router-dom';

const MOCK_OPERATIONS = [
  { name: 'Wynagrodzenie - Październik', category: 'Pensja', type: 'income', amount: 8200.00, date: '2024-10-20', description: 'Wynagrodzenie miesięczne' },
  { name: 'Zakupy Biedronka', category: 'Jedzenie', type: 'expense', amount: -142.50, date: '2024-10-24', description: 'Zakupy spożywcze' },
  { name: 'Shell paliwo', category: 'Transport', type: 'expense', amount: -280.00, date: '2024-10-23', description: 'Tankowanie samochodu' },
  { name: 'Netflix', category: 'Rozrywka', type: 'expense', amount: -43.00, date: '2024-10-22', description: 'Subskrypcja Netflix' },
  { name: 'Czynsz - Wynajem', category: 'Mieszkanie', type: 'expense', amount: -1300.00, date: '2024-10-19', description: 'Czynsz za mieszkanie' },
  { name: 'Wynagrodzenie - Maj', category: 'Pensja', type: 'income', amount: 8500.00, date: '2024-05-23', description: 'Wynagrodzenie miesięczne' },
  { name: 'Zakupy spożywcze - Biedronka', category: 'Jedzenie', type: 'expense', amount: -145.20, date: '2024-05-24', description: 'Zakupy tygodniowe' },
  { name: 'Paliwo - Orlen', category: 'Transport', type: 'expense', amount: -320.00, date: '2024-05-22', description: 'Tankowanie' },
  { name: 'Netflix - Subskrypcja', category: 'Rozrywka', type: 'expense', amount: -60.00, date: '2024-05-20', description: 'Subskrypcja miesięczna' },
  { name: 'Czynsz za mieszkanie', category: 'Mieszkanie', type: 'expense', amount: -2800.00, date: '2024-05-18', description: 'Czynsz + media' },
  { name: 'Zakupy Żabka', category: 'Jedzenie', type: 'expense', amount: -38.50, date: '2024-10-15', description: '' },
  { name: 'Bilet miesięczny ZTM', category: 'Transport', type: 'expense', amount: -120.00, date: '2024-10-01', description: 'Komunikacja miejska' },
  { name: 'Spotify', category: 'Rozrywka', type: 'expense', amount: -23.99, date: '2024-10-05', description: 'Subskrypcja Spotify' },
  { name: 'Apteka', category: 'Zdrowie', type: 'expense', amount: -67.30, date: '2024-10-10', description: 'Leki i suplementy' },
  { name: 'Przelew od rodziny', category: 'Inne', type: 'income', amount: 500.00, date: '2024-10-12', description: '' },
];

const MOCK_PROFILE = { firstName: 'Bartosz', lastName: 'Dutka' };

const MOCK_GOAL = {
  title: 'Oszczędności na wakacje',
  targetAmount: 12000,
  savedAmount: 9000,
  monthlyContribution: 500,
  deadline: '2026-06-30',
};

export default function SeedPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSeed() {
    if (!currentUser) return;
    setLoading(true);
    setStatus('Dodawanie operacji…');
    try {
      for (const op of MOCK_OPERATIONS) {
        await addOperation(currentUser.uid, op);
      }
      setStatus('Zapisywanie profilu…');
      await saveProfile(currentUser.uid, MOCK_PROFILE);
      setStatus('Zapisywanie planu oszczędnościowego…');
      await saveSavingsGoal(currentUser.uid, MOCK_GOAL);
      setStatus('Gotowe!');
      setDone(true);
    } catch (e) {
      setStatus('Błąd: ' + e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4">
      <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#111827] mb-2">Seed danych testowych</h1>
        <p className="text-[#6B7280] text-sm mb-2">Zalogowany jako: <strong>{currentUser?.email}</strong></p>
        <p className="text-[#6B7280] text-sm mb-6">
          Kliknij przycisk żeby dodać {MOCK_OPERATIONS.length} operacji, profil i plan oszczędnościowy.
        </p>

        {status && (
          <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${done ? 'bg-[#F0FDF4] text-[#16A34A]' : 'bg-[#EFF6FF] text-[#2563EB]'}`}>
            {status}
          </div>
        )}

        {!done ? (
          <button
            onClick={handleSeed}
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-60"
          >
            {loading ? 'Trwa dodawanie…' : 'Dodaj dane testowe'}
          </button>
        ) : (
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-[#16A34A] hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Przejdź do pulpitu →
          </button>
        )}
      </div>
    </div>
  );
}
