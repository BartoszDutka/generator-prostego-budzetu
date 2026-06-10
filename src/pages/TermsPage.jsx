import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { downloadRegulamin } from '../utils/pdf';

const sections = [
  {
    title: 'Postanowienia Ogólne',
    paragraphs: [
      'Niniejszy Regulamin określa zasady korzystania z platformy internetowej "Generator prostego budżetu", dostępnej pod adresem domeny głównej.',
      'Właścicielem serwisu jest spółka BudgetFlow Solutions Sp. z o.o. z siedzibą w Rabce Zdroju.',
      'Użytkownik przed rozpoczęciem korzystania z Usług jest zobowiązany do zapoznania się z treścią Regulaminu.',
    ],
  },
  {
    title: 'Definicje',
    list: [
      { term: 'Serwis', def: '– aplikacja internetowa służąca do zarządzania finansami osobistymi.' },
      { term: 'Użytkownik', def: '– każda osoba fizyczna korzystająca z funkcjonalności Serwisu.' },
      { term: 'Konto', def: '– indywidualny profil Użytkownika, zabezpieczony hasłem, umożliwiający gromadzenie danych.' },
    ],
  },
  {
    title: 'Świadczenie Usług',
    paragraphs: [
      'Usługa polega na udostępnieniu narzędzi do kategoryzacji wydatków, planowania oszczędności oraz generowania raportów finansowych.',
      'Korzystanie z podstawowych funkcji Serwisu jest bezpłatne, o ile cennik nie stanowi inaczej.',
      'Właściciel zastrzega sobie prawo do wprowadzania przerw technicznych w celu konserwacji systemu.',
    ],
    callout: {
      icon: '🔒',
      title: 'Twoje dane są bezpieczne',
      text: 'Wszystkie wprowadzane przez Ciebie kwoty i kategorie są szyfrowane. Nie mamy wglądu w Twoje prywatne oszczędności bez Twojej wyraźnej zgody.',
    },
  },
  {
    title: 'Ochrona Danych Osobowych',
    paragraphs: [
      'Administratorem danych osobowych Użytkowników jest Właściciel Serwisu.',
      'Szczegółowe zasady przetwarzania danych określa Polityka Prywatności, stanowiąca załącznik do Regulaminu.',
      'Użytkownik ma prawo do wglądu, poprawiania oraz usunięcia swoich danych w dowolnym momencie.',
    ],
  },
  {
    title: 'Postanowienia Końcowe',
    paragraphs: [
      'Wszelkie spory będą rozstrzygane polubownie, a w przypadku braku porozumienia – przez sąd właściwy dla siedziby Właściciela.',
      'Regulamin może ulec zmianie, o czym Użytkownicy zostaną powiadomieni drogą mailową.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6]">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#111827] text-center mb-2">Regulamin Serwisu</h1>
          <p className="text-[#6B7280] text-sm text-center mb-8">
            Prosimy o uważne zapoznanie się z poniższymi zasadami korzystania z platformy Generator prostego budżetu. Ostatnia aktualizacja: 24 maja 2024 r.
          </p>

          <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-8 space-y-8">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h2 className="text-lg font-bold text-[#2563EB] mb-3">{sec.title}</h2>
                {sec.paragraphs && (
                  <div className="space-y-2">
                    {sec.paragraphs.map((p, i) => (
                      <p key={i} className="text-sm text-[#374151] leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}
                {sec.list && (
                  <div className="space-y-1.5">
                    {sec.list.map((item) => (
                      <p key={item.term} className="text-sm text-[#374151]">
                        <strong>{item.term}</strong> {item.def}
                      </p>
                    ))}
                  </div>
                )}
                {sec.callout && (
                  <div className="mt-4 bg-[#EFF6FF] border-l-4 border-[#2563EB] rounded-r-xl px-5 py-4 flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-[#1D4ED8] mb-1">{sec.callout.title}</p>
                      <p className="text-sm text-[#374151]">{sec.callout.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => { window.print(); }} className="flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#374151] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Pobierz wersję PDF do druku
            </button>
            <button onClick={downloadRegulamin} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
              Pobierz Regulamin
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
