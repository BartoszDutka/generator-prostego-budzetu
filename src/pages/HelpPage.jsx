import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const categories = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bg: 'bg-[#EFF6FF]',
    title: 'Pierwsze kroki',
    desc: 'Naucz się podstaw zarządzania budżetem w kilka minut.',
    links: ['Konfiguracja konta', 'Twój pierwszy budżet'],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    bg: 'bg-[#EFF6FF]',
    title: 'Bezpieczeństwo',
    desc: 'Dowiedz się, jak chronimy Twoje dane finansowe.',
    links: ['Dwuetapowa weryfikacja', 'Polityka prywatności'],
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    bg: 'bg-[#EFF6FF]',
    title: 'Obsługa konta',
    desc: 'Zarządzanie subskrypcją, profilem i ustawieniami.',
    links: ['Zmiana planu', 'Eksportowanie danych'],
  },
];

const faqs = [
  {
    q: 'Czy mogę połączyć moje konto bankowe?',
    a: 'Tak, nasz system wspiera bezpieczne połączenia z większością polskich banków. Wszystkie dane są szyfrowane zgodnie ze standardami bankowymi, a my mamy jedynie uprawnienia do odczytu historii transakcji.',
  },
  {
    q: 'Jak zresetować hasło do konta?',
    a: 'Na stronie logowania kliknij "Zapomniałeś hasła?", podaj swój adres email, a my wyślemy Ci link do resetowania hasła.',
  },
  {
    q: 'Czy aplikacja jest darmowa?',
    a: 'Tak, podstawowa wersja aplikacji jest całkowicie bezpłatna. Dostępne są również plany premium z rozszerzonymi funkcjami.',
  },
];

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Blue hero search */}
      <section className="bg-[#2563EB] py-14 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Jak możemy Ci pomóc?</h1>
          <p className="text-blue-100 text-sm mb-6">Przeszukaj naszą bazę wiedzy lub wybierz kategorię poniżej</p>
          <div className="relative">
            <svg className="w-5 h-5 text-[#9CA3AF] absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              className="w-full bg-white border border-white rounded-xl pl-12 pr-4 py-3.5 text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Wpisz pytanie, np. Jak dodać wydatek?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-white border border-[#E5E7EB] rounded-xl p-5 shadow-sm">
                <div className={`w-10 h-10 ${cat.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-[#111827] mb-1">{cat.title}</h3>
                <p className="text-sm text-[#6B7280] mb-3">{cat.desc}</p>
                <ul className="space-y-1">
                  {cat.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[#2563EB] hover:underline flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + Contact */}
      <section className="py-12 px-4 bg-[#F3F4F6]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#111827] mb-5">Najczęściej zadawane pytania</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-[#111827]">{faq.q}</span>
                    <svg className={`w-5 h-5 text-[#6B7280] flex-shrink-0 ml-3 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-[#6B7280] leading-relaxed border-t border-[#F3F4F6]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact card */}
          <div>
            <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
              <div className="h-36 overflow-hidden">
                <img src="/czat.png" alt="Centrum pomocy" className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#111827] mb-2">Nie znalazłeś odpowiedzi?</h3>
                <p className="text-sm text-[#6B7280] mb-4">
                  Nasz zespół wsparcia jest dostępny od poniedziałku do piątku w godzinach 8:00 – 18:00.
                </p>
                <Link to="/contact" className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Skontaktuj się z nami
                </Link>
                <p className="text-xs text-[#9CA3AF] text-center mt-2">Średni czas odpowiedzi: 2 godziny</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
