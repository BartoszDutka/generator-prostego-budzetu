import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImportModal from '../components/ImportModal';

const recentOperations = [
  { date: '24.10.2024', name: 'Zakupy Biedronka', category: 'Jedzenie', catColor: '#FEF9C3', catText: '#854D0E', amount: -142.50 },
  { date: '23.10.2024', name: 'Shell paliwo', category: 'Transport', catColor: '#DBEAFE', catText: '#1D4ED8', amount: -280.00 },
  { date: '22.10.2024', name: 'Netflix', category: 'Rozrywka', catColor: '#F3E8FF', catText: '#7C3AED', amount: -43.00 },
  { date: '20.10.2024', name: 'Wynagrodzenie', category: 'Przychód', catColor: '#D1FAE5', catText: '#065F46', amount: 8200.00 },
  { date: '19.10.2024', name: 'Czynsz - Wynajem', category: 'Mieszkanie', catColor: '#E0F2FE', catText: '#0369A1', amount: -1300.00 },
];

const categoryExpenses = [
  { name: 'Mieszkanie', amount: 1300, color: '#2563EB', pct: 55 },
  { name: 'Jedzenie', amount: 950, color: '#16A34A', pct: 40 },
  { name: 'Transport', amount: 420, color: '#3B82F6', pct: 18 },
  { name: 'Rozrywka', amount: 300, color: '#EC4899', pct: 13 },
];

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const [showImport, setShowImport] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Header with date nav */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Przegląd</h1>
              <p className="text-[#6B7280] mt-0.5 text-sm">Witaj ponownie! Oto Twój aktualny stan finansów.</p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm font-medium text-[#374151]">
              <button className="hover:text-[#2563EB] transition-colors">‹</button>
              <span>Październik 2024</span>
              <button className="hover:text-[#2563EB] transition-colors">›</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Aktualny bilans */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">AKTUALNY BILANS</p>
                <div className="w-8 h-8 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#111827]">3 480 PLN</p>
              <span className="inline-flex items-center gap-1 bg-[#D1FAE5] text-[#065F46] text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                +12% vs poprz. miesiąc
              </span>
            </div>

            {/* Suma przychodów */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">SUMA PRZYCHODÓW</p>
                <div className="w-8 h-8 bg-[#F0FDF4] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#16A34A]">8 200 PLN</p>
              <p className="text-xs text-[#6B7280] mt-2">Główne źródło: Wynagrodzenie</p>
            </div>

            {/* Suma wydatków */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">SUMA WYDATKÓW</p>
                <div className="w-8 h-8 bg-[#FEF2F2] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#EF4444]">4 720 PLN</p>
              <p className="text-xs text-[#6B7280] mt-2">Pozostało: 3 480 PLN</p>
            </div>

            {/* Plan na miesiąc */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider">PLAN NA MIESIĄC</p>
                <div className="w-8 h-8 bg-[#FFFBEB] rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#111827]">5 500 PLN</p>
              <div className="mt-2">
                <div className="bg-[#E5E7EB] rounded-full h-1.5 mb-1">
                  <div className="bg-[#2563EB] h-1.5 rounded-full" style={{ width: '85%' }} />
                </div>
                <div className="flex justify-between text-xs text-[#6B7280]">
                  <span>Wykorzystano 85%</span>
                  <span>Cel: Oszczędność</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories + Biggest expense */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Category bars */}
            <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-[#111827] text-sm uppercase tracking-wide">WYDATKI WEDŁUG KATEGORII</h2>
                <Link to="/history" className="text-sm text-[#2563EB] hover:underline font-medium">Zobacz szczegóły</Link>
              </div>
              <div className="space-y-4">
                {categoryExpenses.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-4">
                    <span className="text-sm text-[#374151] w-24 flex-shrink-0">{cat.name}</span>
                    <div className="flex-1 bg-[#F3F4F6] rounded-full h-3">
                      <div className="h-3 rounded-full" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
                    </div>
                    <span className="text-sm font-semibold text-[#111827] w-20 text-right flex-shrink-0">{cat.amount} PLN</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="space-y-4">
              {/* Biggest expense - blue card */}
              <div className="bg-[#2563EB] rounded-xl p-5 text-white">
                <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider mb-3">NAJWIĘKSZY WYDATEK</p>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1 300 PLN</p>
                    <p className="text-sm text-blue-200">Mieszkanie</p>
                  </div>
                </div>
                <p className="text-xs text-blue-200 italic mt-3">
                  "Wynajem i media pochłonęły 27% Twojego budżetu w tym miesiącu."
                </p>
              </div>

              {/* Savings tip */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-[#111827] mb-1">Potencjał oszczędności</p>
                  <p className="text-xs text-[#6B7280] mb-4">
                    Zoptymalizuj kategorię "Rozrywka", aby zaoszczędzić 120 PLN.
                  </p>
                  <Link to="/plan" className="w-full text-center border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] font-semibold py-2 rounded-lg transition-colors text-sm">
                    Stwórz plan
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 items-center">
            <Link to="/add" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Dodaj wydatek
            </Link>
            <button onClick={() => setShowImport(true)} className="border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#374151] font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Importuj dane
            </button>
            <button className="border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[#374151] font-medium px-5 py-2.5 rounded-lg text-sm transition-colors inline-flex items-center gap-2 ml-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Eksportuj PDF
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
                {recentOperations
                  .filter((op) => !search || op.name.toLowerCase().includes(search.toLowerCase()))
                  .map((op, i) => (
                    <tr key={i} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3.5 text-[#6B7280] text-sm">{op.date}</td>
                      <td className="py-3.5 text-[#111827] font-medium text-sm">{op.name}</td>
                      <td className="py-3.5">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: op.catColor, color: op.catText }}>
                          {op.category}
                        </span>
                      </td>
                      <td className={`py-3.5 font-semibold text-right text-sm ${op.amount > 0 ? 'text-[#16A34A]' : 'text-[#EF4444]'}`}>
                        {op.amount > 0 ? '+ ' : '- '}{Math.abs(op.amount).toFixed(2).replace('.', ',')} PLN
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>

            <div className="mt-4 pt-4 border-t border-[#F3F4F6] text-center">
              <Link to="/history" className="text-sm text-[#2563EB] hover:underline font-medium">
                Pokaż pełną historię
              </Link>
            </div>
          </div>
        </div>
      </main>

      {showImport && <ImportModal onClose={() => setShowImport(false)} />}
      <Footer />
    </div>
  );
}
