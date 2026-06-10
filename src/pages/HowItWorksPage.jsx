import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = [
  {
    num: '1',
    icon: (
      <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    title: '1. Załóż konto',
    desc: 'Rejestracja zajmuje mniej niż minutę. Potrzebujemy tylko Twojego adresu e-mail, aby stworzyć bezpieczną przestrzeń dla Twoich finansów.',
  },
  {
    num: '2',
    icon: (
      <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    title: '2. Dodaj transakcje',
    desc: 'Wprowadzaj wydatki i przychody na bieżąco. Przypisuj je do kategorii, aby precyzyjnie wiedzieć, na co wydajesz najwięcej.',
  },
  {
    num: '3',
    icon: (
      <svg className="w-8 h-8 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: '3. Analizuj wydatki',
    desc: 'Otrzymuj czytelne raporty i wykresy. Odkryj wzorce swoich wydatków i znajdź miejsce na realne oszczędności.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero split */}
      <section className="bg-[#F3F4F6] py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#111827] mb-4 leading-tight">
              Poznaj prosty sposób na zarządzanie finansami
            </h1>
            <p className="text-[#6B7280] mb-7 leading-relaxed">
              Intuicyjne narzędzie, które pomoże Ci zrozumieć, gdzie trafiają Twoje pieniądze i jak zaoszczędzić na to, co dla Ciebie ważne.
            </p>
            <Link to="/register" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors inline-block">
              Rozpocznij teraz
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/laptop.png"
              alt="Aplikacja Generator prostego budżetu"
              className="w-full max-w-lg rounded-2xl shadow-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 bg-[#F3F4F6]">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs font-bold text-[#2563EB] uppercase tracking-widest mb-2">TRZY PROSTE KROKI</p>
          <h2 className="text-center text-2xl font-bold text-[#111827] mb-10">
            Zacznij kontrolować swój budżet w kilka minut
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step) => (
              <div key={step.num} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[#111827] mb-2 text-base">{step.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-[#F3F4F6]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#2563EB] rounded-2xl px-10 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">Gotowy na zmianę?</h2>
              <p className="text-blue-100 text-sm leading-relaxed">
                Dołącz do tysięcy użytkowników, którzy już odzyskali kontrolę nad swoim portfelem.
              </p>
            </div>
            <Link
              to="/register"
              className="bg-white hover:bg-gray-50 text-[#2563EB] font-semibold px-8 py-4 rounded-xl text-sm transition-colors flex-shrink-0 text-center leading-snug shadow-sm"
            >
              Załóż darmowe<br />konto
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
