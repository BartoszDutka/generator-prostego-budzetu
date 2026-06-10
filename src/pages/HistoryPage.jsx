import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CategoryIcon = ({ type }) => {
  const icons = {
    JEDZENIE: {
      bg: '#FEF9C3', color: '#B45309',
      svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
    },
    PENSJA: {
      bg: '#D1FAE5', color: '#065F46',
      svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    TRANSPORT: {
      bg: '#DBEAFE', color: '#1D4ED8',
      svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM1 1h4l2.68 9.39a2 2 0 001.92 1.61h9.72a2 2 0 001.92-1.61L23 6H6" />,
    },
    ROZRYWKA: {
      bg: '#F3E8FF', color: '#7C3AED',
      svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />,
    },
    OPŁATY: {
      bg: '#E0F2FE', color: '#0369A1',
      svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    },
  };
  const { bg, color, svg } = icons[type] || icons['OPŁATY'];
  return (
    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
      <svg className="w-4 h-4" fill="none" stroke={color} viewBox="0 0 24 24">{svg}</svg>
    </div>
  );
};

const allOperations = [
  { date: '24 Maj 2024', desc: 'Zakupy spożywcze - Biedronka', category: 'JEDZENIE', catBg: '#FEF9C3', catText: '#854D0E', type: 'expense', amount: -145.20 },
  { date: '23 Maj 2024', desc: 'Wynagrodzenie - Maj', category: 'PENSJA', catBg: '#D1FAE5', catText: '#065F46', type: 'income', amount: 8500.00 },
  { date: '22 Maj 2024', desc: 'Paliwo - Orlen', category: 'TRANSPORT', catBg: '#DBEAFE', catText: '#1D4ED8', type: 'expense', amount: -320.00 },
  { date: '20 Maj 2024', desc: 'Netflix - Subskrypcja', category: 'ROZRYWKA', catBg: '#F3E8FF', catText: '#7C3AED', type: 'expense', amount: -60.00 },
  { date: '18 Maj 2024', desc: 'Czynsz za mieszkanie', category: 'OPŁATY', catBg: '#E0F2FE', catText: '#0369A1', type: 'expense', amount: -2800.00 },
];

export default function HistoryPage() {
  const [period, setPeriod] = useState('30');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filtered = allOperations.filter((op) => {
    if (categoryFilter && op.category !== categoryFilter) return false;
    if (typeFilter === 'income' && op.type !== 'income') return false;
    if (typeFilter === 'expense' && op.type !== 'expense') return false;
    return true;
  });

  const balance = filtered.reduce((sum, op) => sum + op.amount, 0);

  const selectCls = "bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#374151] font-medium focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer appearance-none pr-8";

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-5">

          {/* Header + filters in same row */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Historia operacji</h1>
              <p className="text-[#6B7280] text-sm mt-0.5">Przeglądaj i zarządzaj swoimi wszystkimi transakcjami</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="relative">
                <svg className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <select className={`${selectCls} pl-9`} value={period} onChange={(e) => setPeriod(e.target.value)}>
                  <option value="30">Ostatnie 30 dni</option>
                  <option value="90">Ostatnie 90 dni</option>
                  <option value="365">Ostatni rok</option>
                  <option value="all">Wszystkie</option>
                </select>
              </div>
              <div className="relative">
                <svg className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <select className={`${selectCls} pl-9`} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="">Wszystkie kategorie</option>
                  <option value="JEDZENIE">Jedzenie</option>
                  <option value="PENSJA">Pensja</option>
                  <option value="TRANSPORT">Transport</option>
                  <option value="ROZRYWKA">Rozrywka</option>
                  <option value="OPŁATY">Opłaty</option>
                </select>
              </div>
              <div className="relative">
                <svg className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <select className={`${selectCls} pl-9`} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="">Wszystkie typy</option>
                  <option value="income">Przychody</option>
                  <option value="expense">Wydatki</option>
                </select>
              </div>
              <button className="bg-white border border-[#E5E7EB] hover:bg-gray-50 text-[#374151] font-medium px-4 py-2 rounded-lg text-sm transition-colors inline-flex items-center gap-2">
                <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Eksportuj
              </button>
            </div>
          </div>

          {/* Table card */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden">
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
                {filtered.map((op, i) => (
                  <tr key={i} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-4 text-[#6B7280] whitespace-nowrap">{op.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <CategoryIcon type={op.category} />
                        <span className="text-[#111827] font-medium">{op.desc}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
                        style={{ backgroundColor: op.catBg, color: op.catText }}>
                        {op.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${op.type === 'income' ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                        {op.type === 'income'
                          ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                          : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                        }
                        {op.type === 'income' ? 'Przychód' : 'Wydatek'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 font-semibold text-right whitespace-nowrap ${op.amount > 0 ? 'text-[#16A34A]' : 'text-[#111827]'}`}>
                      {op.amount > 0 ? `+ ${op.amount.toFixed(2).replace('.', ',')}` : `- ${Math.abs(op.amount).toFixed(2).replace('.', ',')}`} PLN
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-[#9CA3AF] hover:text-[#374151] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>

            {/* Pagination row */}
            <div className="px-6 py-4 border-t border-[#E5E7EB] flex items-center justify-between bg-white">
              <p className="text-sm text-[#6B7280]">Pokazano 1–{filtered.length} z 142 operacji</p>
              <div className="flex gap-1">
                {[1, 2, 3, '...', 29].map((p, i) => (
                  <button key={i} className={`w-8 h-8 text-sm rounded-lg font-medium transition-colors ${p === 1 ? 'bg-[#2563EB] text-white' : 'text-[#6B7280] hover:bg-gray-100'}`}>
                    {p}
                  </button>
                ))}
                <button className="w-8 h-8 text-sm rounded-lg text-[#6B7280] hover:bg-gray-100">›</button>
              </div>
            </div>
          </div>

          {/* Bottom: PDF report (blue) + balance */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-[#2563EB] rounded-xl p-6 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-1">Potrzebujesz pełnego raportu?</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Wygeneruj szczegółowe zestawienie PDF ze wszystkimi operacjami z wybranego okresu.
                </p>
                <button className="bg-white text-[#2563EB] font-semibold px-5 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Pobierz Raport PDF
                </button>
              </div>
              {/* decorative circle */}
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full" />
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">BILANS OKRESU</p>
              <p className={`text-3xl font-bold ${balance >= 0 ? 'text-[#111827]' : 'text-[#EF4444]'} mb-2`}>
                {balance > 0 ? '+ ' : '- '}{Math.abs(balance).toFixed(2).replace('.', ',')} PLN
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#16A34A] rounded-full inline-block" />
                <span className="text-sm text-[#16A34A] font-medium">Trend wzrostowy (+12%)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
