import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = ['Jedzenie', 'Transport', 'Mieszkanie', 'Rozrywka', 'Zdrowie', 'Edukacja', 'Odzież', 'Rachunki', 'Inne'];

export default function AddOperationPage() {
  const navigate = useNavigate();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => navigate('/dashboard'), 1500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          {/* Outer card */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden">
            {/* Gray header */}
            <div className="bg-[#F3F4F6] px-8 py-6 border-b border-[#E5E7EB]">
              <h1 className="text-2xl font-bold text-[#111827] mb-0.5">Nowa operacja</h1>
              <p className="text-[#6B7280] text-sm">Wprowadź szczegóły swojego wpływu lub wydatku.</p>
            </div>

            <div className="p-8">
            {success && (
              <div className="bg-[#F0FDF4] border border-green-200 text-[#16A34A] rounded-lg px-4 py-3 text-sm mb-5">
                Operacja została zapisana. Przekierowuję do pulpitu…
              </div>
            )}

            {/* Inner white card with shadow */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
              {/* Tab toggle */}
              <div className="flex rounded-full bg-[#F3F4F6] p-1 mb-6 w-56 mx-auto">
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 py-1.5 text-sm font-semibold transition-all rounded-full ${
                    type === 'expense'
                      ? 'bg-white text-[#2563EB] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#374151]'
                  }`}
                >
                  Wydatek
                </button>
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 py-1.5 text-sm font-semibold transition-all rounded-full ${
                    type === 'income'
                      ? 'bg-white text-[#16A34A] shadow-sm'
                      : 'text-[#6B7280] hover:text-[#374151]'
                  }`}
                >
                  Przychód
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Amount */}
                <div className="text-center pb-4 border-b border-[#E5E7EB]">
                  <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-widest mb-3">KWOTA</p>
                  <div className="flex items-center justify-center gap-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="text-4xl font-bold text-[#9CA3AF] text-center bg-transparent border-none outline-none w-40 focus:text-[#111827]"
                      placeholder="0,00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                    <span className="text-2xl font-semibold text-[#6B7280]">PLN</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Data</label>
                    <input
                      type="date"
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-1.5">Kategoria</label>
                    <select
                      className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="">Wybierz kategorię</option>
                      {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-1.5">Opis</label>
                  <textarea
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                    rows={3}
                    placeholder="Np. Zakupy spożywcze w Biedronce"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Zapisz
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="flex-1 border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#374151] font-semibold py-2.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Anuluj
                  </button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
