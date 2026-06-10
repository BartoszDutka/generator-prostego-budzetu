import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getOperations, deleteOperation } from '../firebase/db';

const CATEGORY_ICONS = {
  Jedzenie:   { bg: '#FEF9C3', color: '#B45309' },
  Pensja:     { bg: '#D1FAE5', color: '#065F46' },
  Transport:  { bg: '#DBEAFE', color: '#1D4ED8' },
  Rozrywka:   { bg: '#F3E8FF', color: '#7C3AED' },
  Mieszkanie: { bg: '#E0F2FE', color: '#0369A1' },
  Zdrowie:    { bg: '#D1FAE5', color: '#065F46' },
  Edukacja:   { bg: '#FEF3C7', color: '#92400E' },
  Odzież:     { bg: '#FCE7F3', color: '#9D174D' },
  Rachunki:   { bg: '#E0F2FE', color: '#0369A1' },
  Inne:       { bg: '#F3F4F6', color: '#374151' },
};

function getCatStyle(cat) {
  return CATEGORY_ICONS[cat] || CATEGORY_ICONS['Inne'];
}

export default function HistoryPage() {
  const { currentUser } = useAuth();
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    if (!currentUser) return;
    getOperations(currentUser.uid)
      .then(setOperations)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [currentUser]);

  async function handleDelete(id) {
    if (!window.confirm('Usunąć tę operację?')) return;
    await deleteOperation(currentUser.uid, id);
    setOperations((prev) => prev.filter((o) => o.id !== id));
  }

  const filtered = operations.filter((op) => {
    if (categoryFilter && op.category !== categoryFilter) return false;
    if (typeFilter === 'income' && op.amount <= 0) return false;
    if (typeFilter === 'expense' && op.amount >= 0) return false;
    return true;
  });

  const balance = filtered.reduce((s, o) => s + o.amount, 0);
  const fmt = (n) => Math.abs(n).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const selectCls = "bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#374151] font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer appearance-none pr-8";

  const allCategories = [...new Set(operations.map((o) => o.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-5">

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Historia operacji</h1>
              <p className="text-[#6B7280] text-sm mt-0.5">Przeglądaj i zarządzaj swoimi wszystkimi transakcjami</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative">
                <select className={`${selectCls} pl-3`} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="">Wszystkie kategorie</option>
                  {allCategories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="relative">
                <select className={`${selectCls} pl-3`} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="">Wszystkie typy</option>
                  <option value="income">Przychody</option>
                  <option value="expense">Wydatki</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
            {loading ? (
              <p className="text-sm text-[#6B7280] text-center py-12">Ładowanie…</p>
            ) : filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#6B7280] text-sm mb-3">Brak operacji.</p>
                <a href="/add" className="text-sm text-[#2563EB] font-medium hover:underline">+ Dodaj pierwszą operację</a>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">DATA</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">OPIS</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">KATEGORIA</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider">TYP</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-[#6B7280] uppercase tracking-wider">KWOTA</th>
                        <th className="px-6 py-3 text-center text-xs font-semibold text-[#6B7280] uppercase tracking-wider">AKCJE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {filtered.map((op) => {
                        const style = getCatStyle(op.category);
                        const isIncome = op.amount > 0;
                        return (
                          <tr key={op.id} className="hover:bg-[#F9FAFB] transition-colors">
                            <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">{op.date}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: style.bg }}>
                                  <svg className="w-4 h-4" fill="none" stroke={style.color} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <span className="text-[#111827] font-medium">{op.name || op.description}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                                style={{ backgroundColor: style.bg, color: style.color }}>
                                {op.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 text-sm font-medium ${isIncome ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                                {isIncome
                                  ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                                  : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                                }
                                {isIncome ? 'Przychód' : 'Wydatek'}
                              </span>
                            </td>
                            <td className={`px-6 py-4 font-semibold text-right whitespace-nowrap ${isIncome ? 'text-[#16A34A]' : 'text-[#111827]'}`}>
                              {isIncome ? '+ ' : '- '}{fmt(op.amount)} PLN
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleDelete(op.id)}
                                className="text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
                                title="Usuń"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-between bg-white">
                  <p className="text-sm text-[#6B7280]">Łącznie: {filtered.length} operacji</p>
                </div>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-[#2563EB] rounded-xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1">Potrzebujesz pełnego raportu?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Wygeneruj szczegółowe zestawienie ze wszystkimi operacjami.
                </p>
                <button className="bg-white text-[#2563EB] font-semibold px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Pobierz Raport PDF
                </button>
              </div>
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full" />
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">BILANS OKRESU</p>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-[#111827]' : 'text-[#EF4444]'} mb-2`}>
                {balance >= 0 ? '+ ' : '- '}{fmt(balance)} PLN
              </p>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full inline-block ${balance >= 0 ? 'bg-[#16A34A]' : 'bg-[#EF4444]'}`} />
                <span className={`text-sm font-medium ${balance >= 0 ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                  {balance >= 0 ? 'Saldo dodatnie' : 'Saldo ujemne'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
