import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImportModal from '../components/ImportModal';
import { getOperations } from '../firebase/db';

const CATEGORY_COLORS = {
  Jedzenie:   { bg: '#FEF9C3', text: '#854D0E' },
  Transport:  { bg: '#DBEAFE', text: '#1D4ED8' },
  Mieszkanie: { bg: '#E0F2FE', text: '#0369A1' },
  Rozrywka:   { bg: '#F3E8FF', text: '#7C3AED' },
  Zdrowie:    { bg: '#D1FAE5', text: '#065F46' },
  Edukacja:   { bg: '#FEF3C7', text: '#92400E' },
  Odzież:     { bg: '#FCE7F3', text: '#9D174D' },
  Rachunki:   { bg: '#E0F2FE', text: '#0369A1' },
  Pensja:     { bg: '#D1FAE5', text: '#065F46' },
  Inne:       { bg: '#F3F4F6', text: '#374151' },
};

function getCatStyle(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['Inne'];
}

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch] = useState('');
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;
    getOperations(currentUser.uid)
      .then(setOperations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentUser]);

  const income = operations.filter((o) => o.amount > 0).reduce((s, o) => s + o.amount, 0);
  const expenses = operations.filter((o) => o.amount < 0).reduce((s, o) => s + o.amount, 0);
  const balance = income + expenses;

  const categoryTotals = operations
    .filter((o) => o.amount < 0)
    .reduce((acc, o) => {
      acc[o.category] = (acc[o.category] || 0) + Math.abs(o.amount);
      return acc;
    }, {});

  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const maxCat = topCategories[0]?.[1] || 1;

  const biggestExpense = topCategories[0];

  const filtered = operations.filter(
    (op) => !search || (op.name || op.description || '').toLowerCase().includes(search.toLowerCase())
  );

  const fmt = (n) => Math.abs(n).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Przegląd</h1>
              <p className="text-[#6B7280] mt-0.5 text-sm">Witaj ponownie! Oto Twój aktualny stan finansów.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">AKTUALNY BILANS</p>
                <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
              </div>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-[#111827]' : 'text-[#EF4444]'}`}>
                {balance >= 0 ? '' : '-'}{fmt(balance)} PLN
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">SUMA PRZYCHODÓW</p>
                <div className="w-8 h-8 bg-[#F0FDF4] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#16A34A]">{fmt(income)} PLN</p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">SUMA WYDATKÓW</p>
                <div className="w-8 h-8 bg-[#FEF2F2] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#EF4444]">{fmt(expenses)} PLN</p>
            </div>
          </div>

          {/* Categories + biggest expense */}
          {topCategories.length > 0 && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-[#111827] text-sm uppercase tracking-wide">WYDATKI WEDŁUG KATEGORII</h2>
                  <Link to="/history" className="text-sm text-[#2563EB] hover:underline font-medium">Zobacz szczegóły</Link>
                </div>
                <div className="space-y-4">
                  {topCategories.map(([cat, amount]) => (
                    <div key={cat} className="flex items-center gap-4">
                      <span className="text-sm text-[#374151] w-24 flex-shrink-0">{cat}</span>
                      <div className="flex-1 bg-[#F3F4F6] rounded-full h-3">
                        <div className="h-3 rounded-full bg-[#2563EB]" style={{ width: `${(amount / maxCat) * 100}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-[#111827] w-24 text-right flex-shrink-0">{fmt(amount)} PLN</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {biggestExpense && (
                  <div className="bg-[#2563EB] rounded-xl p-5 text-white">
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-3">NAJWIĘKSZY WYDATEK</p>
                    <p className="text-2xl font-bold">{fmt(biggestExpense[1])} PLN</p>
                    <p className="text-sm text-blue-200">{biggestExpense[0]}</p>
                  </div>
                )}
                <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-3">
                      <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#111827] mb-4">Stwórz plan oszczędnościowy</p>
                    <Link to="/plan" className="w-full text-center border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] font-semibold py-2 rounded-lg transition-colors text-sm">
                      Stwórz plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/add" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Dodaj operację
            </Link>
            <button onClick={() => setShowImport(true)} className="border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#374151] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Importuj dane
            </button>
          </div>

          {/* Recent operations */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-[#111827] text-sm uppercase tracking-wide">OSTATNIE OPERACJE</h2>
              <div className="relative">
                <svg className="w-4 h-4 text-[#9CA3AF] absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg pl-9 pr-4 py-1.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#2563EB] w-52"
                  placeholder="Szukaj operacji..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-[#6B7280] text-center py-8">Ładowanie…</p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#6B7280] text-sm mb-3">Brak operacji. Dodaj pierwszą!</p>
                <Link to="/add" className="text-sm text-[#2563EB] font-medium hover:underline">+ Dodaj operację</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="pb-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">DATA</th>
                      <th className="pb-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">NAZWA</th>
                      <th className="pb-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">KATEGORIA</th>
                      <th className="pb-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">KWOTA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    {filtered.slice(0, 10).map((op) => {
                      const style = getCatStyle(op.category);
                      return (
                        <tr key={op.id} className="hover:bg-[#F9FAFB] transition-colors">
                          <td className="py-3.5 text-[#6B7280] text-sm whitespace-nowrap">{op.date}</td>
                          <td className="py-3.5 text-[#111827] font-medium text-sm">{op.name || op.description}</td>
                          <td className="py-3.5">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: style.bg, color: style.text }}>
                              {op.category}
                            </span>
                          </td>
                          <td className={`py-3.5 font-semibold text-right text-sm whitespace-nowrap ${op.amount > 0 ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                            {op.amount > 0 ? '+ ' : '- '}{fmt(op.amount)} PLN
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {filtered.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#F3F4F6] text-center">
                <Link to="/history" className="text-sm text-[#2563EB] hover:underline font-medium">
                  Pokaż pełną historię
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      {showImport && <ImportModal onClose={() => setShowImport(false)} />}
      <Footer />
    </div>
  );
}
