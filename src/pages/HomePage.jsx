import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    icon: '🟢',
    emoji: (
      <svg className="w-6 h-6 text-[#16A34A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    bg: 'bg-[#F0FDF4]',
    title: 'Dodawaj przychody',
    desc: 'Rejestruj wszystkie wpływy z różnych źródeł w kilka sekund.',
  },
  {
    emoji: (
      <svg className="w-6 h-6 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    bg: 'bg-[#FEF2F2]',
    title: 'Dodawaj wydatki',
    desc: 'Kategoryzuj swoje wydatki i miej oko na to, gdzie uciekają Twoje pieniądze.',
  },
  {
    emoji: (
      <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    bg: 'bg-[#EFF6FF]',
    title: 'Analizuj budżet',
    desc: 'Otrzymuj czytelne wykresy i statystyki dotyczące Twojej kondycji finansowej.',
  },
  {
    emoji: (
      <svg className="w-6 h-6 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bg: 'bg-[#FFFBEB]',
    title: 'Przeglądaj historię',
    desc: 'Wracaj do poprzednich miesięcy, aby porównywać i optymalizować swoje nawyki.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-[#EFF6FF] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight mb-5 uppercase tracking-tight">
            Kontroluj swoje finanse<br />w prosty sposób
          </h1>
          <p className="text-[#6B7280] text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Przejmij kontrolę nad swoimi pieniędzmi dzięki intuicyjnemu narzędziu do
            zarządzania budżetem. Bez zbędnych komplikacji, tylko czysta przejrzystość finansowa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-7 py-3 rounded-lg transition-colors text-base">
              Rozpocznij teraz
            </Link>
            <Link to="/jak-to-dziala" className="bg-white border border-[#2563EB] text-[#2563EB] hover:bg-[#EFF6FF] font-semibold px-7 py-3 rounded-lg transition-colors text-base">
              Jak to działa?
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-5">
                <div className={`w-10 h-10 ${f.bg} rounded-full flex items-center justify-center mb-4`}>
                  {f.emoji}
                </div>
                <h3 className="font-semibold text-[#111827] mb-2">{f.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD PREVIEW (Twój finansowy kokpit) ── */}
      <section className="bg-[#F3F4F6] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-[#111827] text-center mb-1">Twój finansowy kokpit</h2>
          <p className="text-[#6B7280] text-center text-sm mb-10">
            Wszystko, czego potrzebujesz, w jednym przejrzystym widoku.
          </p>

          <div className="grid md:grid-cols-5 gap-5">
            {/* Left: balance + bar chart */}
            <div className="md:col-span-3 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">CAŁKOWITY BILANS</p>
                <span className="bg-[#EFF6FF] text-[#2563EB] text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 border border-[#BFDBFE]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  +12%
                </span>
              </div>
              <p className="text-3xl font-bold text-[#111827] mb-6">12 450,00 PLN</p>
              {/* Bar chart */}
              <div className="flex items-end gap-1.5 h-32">
                {[62, 55, 68, 52, 72, 58, 100, 70, 60, 75, 63].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md"
                    style={{
                      height: `${h}%`,
                      backgroundColor: i === 6 ? '#2563EB' : '#BFDBFE',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: categories + image */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 flex flex-col">
              <h3 className="font-bold text-[#111827] mb-4">Wydatki wg kategorii</h3>
              <div className="space-y-3 flex-1">
                {[
                  { cat: 'Mieszkanie', amount: '2 500 PLN', color: '#2563EB', pct: 80 },
                  { cat: 'Jedzenie', amount: '1 200 PLN', color: '#F59E0B', pct: 48 },
                  { cat: 'Rozrywka', amount: '450 PLN', color: '#A78BFA', pct: 18 },
                ].map((row) => (
                  <div key={row.cat}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-[#374151]">{row.cat}</span>
                      <span className="font-semibold text-[#111827]">{row.amount}</span>
                    </div>
                    <div className="bg-[#F3F4F6] rounded-full h-2">
                      <div className="h-2 rounded-full" style={{ width: `${row.pct}%`, backgroundColor: row.color }} />
                    </div>
                  </div>
                ))}
              </div>
              {/* Decorative chart image placeholder */}
              <div className="mt-4 h-28 bg-gradient-to-br from-[#E0F2FE] to-[#BFDBFE] rounded-xl overflow-hidden flex items-end justify-end p-2">
                <div className="flex items-end gap-1 h-20">
                  {[30, 50, 40, 65, 55, 80, 70, 100].map((h, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-t-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i >= 5 ? '#1D4ED8' : '#60A5FA',
                        opacity: 0.8 + i * 0.025,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-4 bg-[#F3F4F6]">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-[#2563EB] rounded-3xl px-8 py-16 text-center overflow-hidden">
            {/* decorative circles */}
            <div className="absolute -top-8 -left-8 w-36 h-36 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-white/10 rounded-full" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Gotowy, aby zacząć?</h2>
              <p className="text-blue-100 mb-8 text-base leading-relaxed max-w-lg mx-auto">
                Dołącz do tysięcy użytkowników, którzy już odzyskali spokój ducha dzięki
                lepszemu planowaniu swoich finansów.
              </p>
              <Link to="/register" className="bg-white hover:bg-gray-50 text-[#2563EB] font-semibold px-8 py-3 rounded-xl transition-colors inline-block text-base border border-white/20">
                Utwórz darmowe konto
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
