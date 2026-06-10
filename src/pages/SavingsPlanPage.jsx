import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const recommendations = [
  {
    iconBg: '#D1FAE5',
    iconColor: '#065F46',
    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    title: 'Ogranicz kategorię Rozrywka',
    saving: '+ 120,00 PLN / msc',
    savingColor: '#16A34A',
  },
  {
    iconBg: '#FEF9C3',
    iconColor: '#B45309',
    svg: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></>,
    title: 'Jedzenie na mieście',
    saving: '+ 85,00 PLN / msc',
    savingColor: '#B45309',
  },
  {
    iconBg: '#DBEAFE',
    iconColor: '#1D4ED8',
    svg: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />,
    title: 'Anuluj nieużywane subskrypcje',
    saving: '+ 45,00 PLN / msc',
    savingColor: '#1D4ED8',
  },
];

const chartData = [
  { month: 'Sty', value: 35 },
  { month: 'Lut', value: 45 },
  { month: 'Mar', value: 55 },
  { month: 'Kwi', value: 63 },
  { month: 'Maj', value: 73 },
  { month: 'Cze', value: 95, active: true },
];

export default function SavingsPlanPage() {
  const maxVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-5">

          <div>
            <h1 className="text-2xl font-bold text-[#111827]">Twój plan oszczędnościowy</h1>
            <p className="text-[#6B7280] text-sm mt-0.5">Oto Twoja spersonalizowana strategia osiągnięcia wolności finansowej.</p>
          </div>

          {/* Top row: goal card + recommendations */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* Goal card */}
            <div className="lg:col-span-2 bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#EFF6FF] rounded-xl flex items-center justify-center text-xl flex-shrink-0">✈️</div>
                  <h2 className="text-xl font-bold text-[#111827]">Oszczędności na wakacje</h2>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-3xl font-bold text-[#2563EB] leading-none">75%</p>
                  <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mt-0.5">UKOŃCZONO</p>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] mb-4 ml-12">
                Cel: 12 000,00 PLN &bull; Termin: Czerwiec 2026
              </p>
              <div className="bg-[#E5E7EB] rounded-full h-2 mb-6">
                <div className="bg-[#2563EB] h-2 rounded-full" style={{ width: '75%' }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Zaoszczędzono', value: '9 000,00 PLN', blue: false },
                  { label: 'Pozostało', value: '3 000,00 PLN', blue: false },
                  { label: 'Miesięczna wpłata', value: '500,00 PLN', blue: true },
                ].map((s) => (
                  <div key={s.label} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-4">
                    <p className="text-xs text-[#6B7280] mb-1">{s.label}</p>
                    <p className={`text-lg font-bold ${s.blue ? 'text-[#2563EB]' : 'text-[#111827]'}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="font-bold text-[#111827]">Rekomendacje</h3>
              </div>
              <div className="space-y-4">
                {recommendations.map((r) => (
                  <div key={r.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.iconBg }}>
                      <svg className="w-5 h-5" fill="none" stroke={r.iconColor} viewBox="0 0 24 24">{r.svg}</svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#374151] leading-snug">{r.title}</p>
                      <p className="text-sm font-bold mt-0.5" style={{ color: r.savingColor }}>{r.saving}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                Zastosuj wszystkie optymalizacje
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-bold text-[#111827] text-lg">Prognoza oszczędności</h2>
                <p className="text-[#6B7280] text-sm mt-0.5">Przewidywany wzrost kapitału w ciągu najbliższych 6 miesięcy</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#2563EB] inline-block" />Twój plan
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#BFDBFE] inline-block" />Trend obecny
                </span>
              </div>
            </div>

            {/* Chart with grid lines */}
            <div className="relative">
              {/* Horizontal grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="border-t border-[#F3F4F6] w-full" />
                ))}
              </div>
              {/* Bars */}
              <div className="relative flex items-end gap-4 h-44 pb-6">
                {chartData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-xl transition-all"
                      style={{
                        height: `${(d.value / maxVal) * 148}px`,
                        backgroundColor: d.active ? '#2563EB' : '#C7D7F9',
                      }}
                    />
                    <span className={`text-xs font-medium ${d.active ? 'text-[#2563EB] font-bold' : 'text-[#9CA3AF]'}`}>
                      {d.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="relative bg-[#2563EB] rounded-2xl p-8 overflow-hidden min-h-[160px] flex items-center">
            {/* Decorative oval — desktop only */}
            <div className="hidden sm:flex absolute right-8 top-1/2 -translate-y-1/2 w-48 h-44 rounded-full bg-[#1D4ED8] items-end justify-center overflow-hidden opacity-80">
              <div className="w-32 h-32 flex items-end justify-center pb-2">
                <svg viewBox="0 0 80 80" fill="none" className="w-full h-full opacity-70">
                  <ellipse cx="40" cy="72" rx="20" ry="5" fill="#1E40AF" opacity="0.5"/>
                  <path d="M40 70 L40 35" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M40 50 Q28 42 24 30 Q36 30 40 42" fill="#60A5FA" opacity="0.8"/>
                  <path d="M40 44 Q52 36 56 24 Q44 24 40 36" fill="#93C5FD" opacity="0.7"/>
                  <path d="M40 58 Q32 52 30 44 Q38 44 40 52" fill="#60A5FA" opacity="0.6"/>
                </svg>
              </div>
            </div>

            <div className="relative z-10 pr-0 sm:pr-56">
              <h2 className="text-2xl font-bold text-white mb-2">Zmotywowany do startu?</h2>
              <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                Twój plan jest gotowy do wdrożenia. Pierwsza wpłata dzisiaj przyspieszy Twój cel o 12 dni.
              </p>
              <div className="flex gap-3">
                <button className="bg-white hover:bg-gray-50 text-[#2563EB] font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors inline-flex items-center gap-2 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Wpłać 500 PLN teraz
                </button>
                <button className="border-2 border-white/50 hover:border-white text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
                  Edytuj plan
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
