import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  {
    title: 'Administrator Danych',
    content: `Administratorem danych osobowych jest BudgetFlow Solutions Sp. z o.o. z siedzibą w Rabce Zdroju. Kontakt z administratorem możliwy jest pod adresem: kontakt@budzet-generator.pl.`,
  },
  {
    title: 'Zakres Zbieranych Danych',
    content: `Zbieramy następujące dane osobowe: adres e-mail, imię i nazwisko (opcjonalnie), dane dotyczące aktywności w serwisie.

Dane finansowe (kwoty, kategorie, opisy transakcji) są przechowywane wyłącznie dla świadczenia usługi i nie są udostępniane osobom trzecim.`,
  },
  {
    title: 'Cel Przetwarzania',
    content: `Dane osobowe przetwarzamy w celu: świadczenia usług serwisu, komunikacji z użytkownikiem, zapewnienia bezpieczeństwa konta oraz ulepszania naszych usług.`,
  },
  {
    title: 'Prawa Użytkownika',
    content: `Przysługują Ci następujące prawa: dostęp do danych, sprostowanie danych, usunięcie danych ("prawo do bycia zapomnianym"), ograniczenie przetwarzania, przeniesienie danych, sprzeciw wobec przetwarzania.`,
  },
  {
    title: 'Pliki Cookie',
    content: `Serwis używa plików cookie niezbędnych do działania aplikacji oraz opcjonalnych plików analitycznych (Google Analytics, Hotjar). Możesz zarządzać ustawieniami plików cookie w przeglądarce.`,
  },
  {
    title: 'Bezpieczeństwo',
    content: `Stosujemy szyfrowanie SSL/TLS dla wszystkich danych przesyłanych między Twoją przeglądarką a naszymi serwerami. Dane finansowe są zaszyfrowane w spoczynku.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-darker">Polityka Prywatności</h1>
            <p className="text-gray-text mt-2">
              Informacje o tym, jak zbieramy, przetwarzamy i chronimy Twoje dane osobowe.
              Ostatnia aktualizacja: 24 maja 2024 r.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-border shadow-sm divide-y divide-gray-border">
            {sections.map((section) => (
              <div key={section.title} className="p-6">
                <h2 className="text-lg font-bold text-gray-darker mb-3">{section.title}</h2>
                <div className="space-y-2">
                  {section.content.split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-text text-sm leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
