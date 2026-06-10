import { jsPDF } from 'jspdf';

const BLUE = [37, 99, 235];
const GRAY = [107, 114, 128];
const DARK = [17, 24, 39];

function baseDoc(title, subtitle = '') {
  const doc = new jsPDF();

  // Header bar
  doc.setFillColor(...BLUE);
  doc.rect(0, 0, 210, 22, 'F');

  // Title in header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Generator prostego budzetu', 14, 14);

  // Document title
  doc.setTextColor(...DARK);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(title, 14, 45);

  if (subtitle) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...GRAY);
    doc.text(subtitle, 14, 54);
  }

  // Separator line
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.5);
  doc.line(14, 60, 196, 60);

  return doc;
}

function addPlaceholderContent(doc, lines, startY = 72) {
  let y = startY;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...DARK);
  lines.forEach((line) => {
    if (line === '') { y += 5; return; }
    if (line.startsWith('##')) {
      y += 3;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text(line.replace('## ', ''), 14, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      y += 7;
    } else {
      const wrapped = doc.splitTextToSize(line, 182);
      doc.text(wrapped, 14, y);
      y += wrapped.length * 6;
    }
  });
  return doc;
}

// ── Help article PDFs ─────────────────────────────────────────────────────────

export function downloadKonfiguracjaKonta() {
  const doc = baseDoc('Konfiguracja konta', 'Pierwsze kroki - Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## 1. Rejestracja',
    'Aby skonfigurowac konto, wejdz na strone glowna i kliknij "Zarejestruj sie".',
    'Podaj adres e-mail i haslo lub zaloguj sie przez Google.',
    '',
    '## 2. Uzupelnienie profilu',
    'Po zalogowaniu przejdz do sekcji "Moj profil" i uzupelnij imie oraz nazwisko.',
    '',
    '## 3. Pierwsze kroki',
    'Kliknij "Dodaj operacje", aby dodac swoj pierwszy przychod lub wydatek.',
    'Aplikacja automatycznie obliczy bilans i wyswietli statystyki.',
  ]);
  doc.save('konfiguracja-konta.pdf');
}

export function downloadPierwszyBudzet() {
  const doc = baseDoc('Twoj pierwszy budzet', 'Pierwsze kroki - Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## Jak stworzyc swoj pierwszy budzet?',
    'Zacznij od dodania swoich stalych przychodow (np. wynagrodzenie).',
    '',
    '## Kategorie wydatkow',
    'Podziel wydatki na kategorie: Jedzenie, Transport, Mieszkanie, Rozrywka, Zdrowie.',
    '',
    '## Plan oszczednosciowy',
    'Przejdz do sekcji "Plan oszczednosciowy" i ustaw swoj cel finansowy.',
    'Aplikacja pomoze Ci sledzic postepy i sugerowac optymalizacje.',
  ]);
  doc.save('pierwszy-budzet.pdf');
}

export function downloadDwuetapowaWeryfikacja() {
  const doc = baseDoc('Dwuetapowa weryfikacja', 'Bezpieczenstwo - Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## Co to jest dwuetapowa weryfikacja?',
    'To dodatkowa warstwa ochrony Twojego konta finansowego.',
    '',
    '## Jak wlaczyc?',
    'Przejdz do ustawien konta i wybierz "Bezpieczenstwo".',
    'Aktywuj weryfikacje dwuetapowa i postepuj zgodnie z instrukcjami.',
    '',
    '## Zalecenia bezpieczenstwa',
    '- Uzywaj silnych, unikalnych hasel',
    '- Nie udostepniaj danych logowania',
    '- Regularnie sprawdzaj aktywnosc konta',
  ]);
  doc.save('dwuetapowa-weryfikacja.pdf');
}

export function downloadPolitykaPrywatnosci() {
  const doc = baseDoc('Polityka prywatnosci', 'Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## Administrator danych',
    'Administratorem danych jest Generator prostego budzetu.',
    '',
    '## Jakie dane zbieramy?',
    'Zbieramy adres e-mail, dane finansowe wprowadzone przez uzytkownika.',
    'Dane sa przechowywane w bezpiecznej bazie Firebase (Google).',
    '',
    '## Prawa uzytkownika',
    'Masz prawo do dostepu, poprawiania i usuniecia swoich danych.',
    'Aby usunac konto, przejdz do Profil > Usun konto.',
    '',
    '## Kontakt',
    'W sprawach ochrony danych: kontakt@budzet-generator.pl',
  ]);
  doc.save('polityka-prywatnosci.pdf');
}

export function downloadZmianePlanu() {
  const doc = baseDoc('Zmiana planu', 'Obsluga konta - Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## Dostepne plany',
    'Plan darmowy: do 50 operacji miesiecznie, podstawowe statystyki.',
    'Plan Premium: nielimitowane operacje, eksport PDF, priorytetowe wsparcie.',
    '',
    '## Jak zmienic plan?',
    'Przejdz do sekcji Profil > Plan subskrypcji.',
    'Wybierz odpowiedni plan i postepuj zgodnie z instrukcjami platnosci.',
  ]);
  doc.save('zmiana-planu.pdf');
}

export function downloadEksportowanieDanych() {
  const doc = baseDoc('Eksportowanie danych', 'Obsluga konta - Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## Eksport do PDF',
    'W sekcji Historia operacji kliknij "Pobierz Raport PDF".',
    'Raport zawiera wszystkie Twoje operacje z wybranego okresu.',
    '',
    '## Eksport do CSV',
    'Funkcja eksportu do CSV bedzie dostepna w kolejnej wersji aplikacji.',
    '',
    '## Import danych',
    'Mozesz importowac dane z bankow przez sekcje "Importuj dane" na pulpicie.',
  ]);
  doc.save('eksportowanie-danych.pdf');
}

// ── Regulamin ─────────────────────────────────────────────────────────────────

export function downloadRegulamin() {
  const doc = baseDoc('Regulamin uslug', 'Generator prostego budzetu');
  addPlaceholderContent(doc, [
    '## 1. Postanowienia ogolne',
    'Niniejszy regulamin okresla zasady korzystania z aplikacji Generator prostego budzetu.',
    '',
    '## 2. Rejestracja',
    'Korzystanie z aplikacji wymaga zalozenia konta uzytkownika.',
    'Uzytkownik zobowiazuje sie do podania prawdziwych danych.',
    '',
    '## 3. Ochrona danych',
    'Dane uzytkownikow sa chronione zgodnie z RODO.',
    'Szczegoly w Polityce Prywatnosci.',
    '',
    '## 4. Odpowiedzialnosc',
    'Aplikacja dostarczana jest "tak jak jest". Nie gwarantujemy nieprzerwanego dostepu.',
    '',
    '## 5. Zmiany regulaminu',
    'Zastrzegamy prawo do zmiany regulaminu. O zmianach informujemy drogą e-mail.',
  ]);
  doc.save('regulamin.pdf');
}

// ── Raport finansowy ──────────────────────────────────────────────────────────

export function downloadRaport(operations = []) {
  const doc = baseDoc('Raport finansowy', `Wygenerowano: ${new Date().toLocaleDateString('pl-PL')}`);

  const income = operations.filter((o) => o.amount > 0).reduce((s, o) => s + o.amount, 0);
  const expenses = operations.filter((o) => o.amount < 0).reduce((s, o) => s + o.amount, 0);
  const balance = income + expenses;
  const fmt = (n) => Math.abs(n).toFixed(2).replace('.', ',') + ' PLN';

  let y = 72;

  // Summary boxes
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(14, y, 54, 22, 2, 2, 'F');
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(72, y, 54, 22, 2, 2, 'F');
  doc.setFillColor(254, 242, 242);
  doc.roundedRect(130, y, 54, 22, 2, 2, 'F');

  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text('BILANS', 18, y + 7);
  doc.text('PRZYCHODY', 76, y + 7);
  doc.text('WYDATKI', 134, y + 7);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(balance >= 0 ? 17 : 239, balance >= 0 ? 24 : 68, balance >= 0 ? 39 : 68);
  doc.text(fmt(balance), 18, y + 17);
  doc.setTextColor(22, 163, 74);
  doc.text(fmt(income), 76, y + 17);
  doc.setTextColor(239, 68, 68);
  doc.text(fmt(expenses), 134, y + 17);

  y += 32;

  // Table header
  doc.setFillColor(249, 250, 251);
  doc.rect(14, y, 182, 9, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...GRAY);
  doc.text('DATA', 16, y + 6);
  doc.text('NAZWA', 50, y + 6);
  doc.text('KATEGORIA', 120, y + 6);
  doc.text('KWOTA', 165, y + 6);
  y += 9;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);

  operations.slice(0, 40).forEach((op, i) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    if (i % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(14, y, 182, 8, 'F');
    }
    doc.setTextColor(...DARK);
    doc.text(op.date || '', 16, y + 5.5);
    doc.text(doc.splitTextToSize(op.name || op.description || '', 65)[0], 50, y + 5.5);
    doc.text(op.category || '', 120, y + 5.5);
    const amtStr = (op.amount > 0 ? '+ ' : '- ') + fmt(op.amount);
    doc.setTextColor(op.amount > 0 ? 22 : 239, op.amount > 0 ? 163 : 68, op.amount > 0 ? 74 : 68);
    doc.text(amtStr, 165, y + 5.5);
    y += 8;
  });

  // Footer
  doc.setTextColor(...GRAY);
  doc.setFontSize(8);
  doc.text('Generator prostego budzetu  |  generator-prostego-budzetu.netlify.app', 14, 288);

  doc.save('raport-finansowy.pdf');
}
