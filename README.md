# Generator Prostego Budżetu

Aplikacja webowa umożliwiająca proste zarządzanie budżetem osobistym — zbudowana w React i Vite, wdrożona na Netlify.

---

## Opis projektu

**Generator Prostego Budżetu** to aplikacja webowa służąca do zarządzania finansami osobistymi. Użytkownik może przeglądać stronę główną, rejestrować się i logować, korzystać z panelu (dashboard), dodawać przychody i wydatki, przeglądać historię transakcji, zarządzać planem oszczędnościowym oraz edytować swój profil.

Projekt jest realizacją wymagań zaliczeniowych z przedmiotu TPF (Technologie i Platformy Frontendowe) na Politechnice Krakowskiej.

---

## Link do aplikacji

Aplikacja jest publicznie dostępna pod adresem:

**[https://generator-prostego-budzetu.netlify.app](https://generator-prostego-budzetu.netlify.app)**

---

## Najważniejsze funkcjonalności

- Strona główna aplikacji z opisem funkcji i przyciskiem CTA
- Rejestracja i logowanie użytkownika (e-mail + hasło)
- Logowanie przez Google z użyciem Firebase Authentication
- Chronione trasy dla zalogowanych użytkowników (`ProtectedRoute`)
- Dashboard użytkownika z podsumowaniem bilansu, przychodów i wydatków
- Dodawanie przychodów i wydatków z kategoryzacją
- Historia operacji finansowych z filtrowaniem
- Plan oszczędnościowy z prognozą i możliwością wpłat
- Profil użytkownika z możliwością edycji danych i zmiany hasła
- Zapis danych w Cloud Firestore z regułami bezpieczeństwa
- Integracja z Google Analytics 4 (zdarzenia `page_view`, `session_start`, `user_engagement`)
- Integracja z Hotjar / Contentsquare (heatmapy, zoning, nagrania sesji)
- Deploy aplikacji na Netlify z CI/CD przez GitHub
- Eksport raportu finansowego do PDF

---

## Technologie

| Technologia | Zastosowanie |
|---|---|
| **React 18** | Biblioteka UI |
| **Vite** | Bundler i narzędzie deweloperskie |
| **React Router DOM v6** | Routing po stronie klienta |
| **Firebase Authentication** | Logowanie e-mail/hasło i przez Google |
| **Cloud Firestore** | Baza danych NoSQL |
| **Tailwind CSS** | Stylowanie komponentów |
| **Google Analytics 4 (react-ga4)** | Analityka ruchu |
| **Hotjar / Contentsquare** | Heatmapy i nagrania sesji |
| **Netlify** | Hosting i CI/CD |

---

## Uruchomienie projektu lokalnie

### Wymagania

- Node.js w wersji 18 lub nowszej
- npm

### Instalacja zależności

```bash
npm install
```

### Uruchomienie serwera deweloperskiego

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

### Budowanie wersji produkcyjnej

```bash
npm run build
```

Pliki wynikowe znajdą się w katalogu `dist/`.

---

## Zmienne środowiskowe

Utwórz plik `.env` (lub `.env.local`) w głównym katalogu projektu i uzupełnij go własnymi kluczami:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_GA4_MEASUREMENT_ID=your_ga4_measurement_id
```

> **Ważne:** Prawdziwe klucze Firebase należy dodać lokalnie w pliku `.env.local` oraz w ustawieniach Netlify jako zmienne środowiskowe (zakładka *Site configuration → Environment variables*).

Plik `.env` z prawdziwymi kluczami **nie powinien** być commitowany do repozytorium — jest wykluczony przez `.gitignore`.

---

## Struktura projektu

```
generator-prostego-budzetu/
├── public/                  # Pliki statyczne (logo, obrazy)
├── src/
│   ├── components/          # Komponenty wielokrotnego użytku
│   │   ├── Navbar.jsx       # Pasek nawigacji (publiczny i zalogowany)
│   │   ├── Footer.jsx       # Stopka aplikacji
│   │   ├── Logo.jsx         # Komponent logo
│   │   ├── ProtectedRoute.jsx  # Ochrona tras wymagających logowania
│   │   ├── AnalyticsListener.jsx  # Śledzenie pageview w GA4
│   │   └── ImportModal.jsx  # Modal importu danych
│   ├── context/
│   │   └── AuthContext.jsx  # Kontekst autoryzacji Firebase
│   ├── firebase/
│   │   └── config.js        # Konfiguracja Firebase (czyta z .env)
│   ├── pages/               # Główne widoki aplikacji
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── AddOperationPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── SavingsPlanPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── HowItWorksPage.jsx
│   │   ├── HelpPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── TermsPage.jsx
│   │   ├── PrivacyPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx              # Routing aplikacji, inicjalizacja GA4
│   ├── main.jsx             # Punkt wejścia aplikacji
│   └── index.css            # Globalne style
├── index.html               # Szablon HTML (zawiera skrypt Contentsquare)
├── .env.local               # Zmienne środowiskowe (nie commitować!)
├── .gitignore
├── .npmrc                   # legacy-peer-deps=true (wymagane dla Netlify)
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Routing

Aplikacja wykorzystuje **React Router DOM v6** z `BrowserRouter`. Trasy są podzielone na publiczne i chronione.

### Trasy publiczne

| Ścieżka | Komponent | Opis |
|---|---|---|
| `/` | `HomePage` | Strona główna |
| `/login` | `LoginPage` | Logowanie |
| `/register` | `RegisterPage` | Rejestracja |
| `/jak-to-dziala` | `HowItWorksPage` | Jak to działa |
| `/pomoc` | `HelpPage` | Centrum pomocy |
| `/kontakt` | `ContactPage` | Kontakt |
| `/regulamin` | `TermsPage` | Regulamin |
| `/polityka-prywatnosci` | `PrivacyPage` | Polityka prywatności |

### Trasy chronione (wymagają zalogowania)

| Ścieżka | Komponent | Opis |
|---|---|---|
| `/dashboard` | `DashboardPage` | Panel użytkownika |
| `/add` | `AddOperationPage` | Dodawanie operacji |
| `/history` | `HistoryPage` | Historia transakcji |
| `/plan` | `SavingsPlanPage` | Plan oszczędnościowy |
| `/profile` | `ProfilePage` | Profil użytkownika |

Chronione trasy są opakowane w komponent `<ProtectedRoute />`, który przekierowuje niezalogowanych użytkowników na stronę `/login`.

![Kod routingu App.jsx](./screens/routing-code.png)

---

## Firebase Authentication

Aplikacja wykorzystuje **Firebase Authentication** do obsługi logowania użytkowników.

Obsługiwane metody logowania:
- E-mail i hasło
- Konto Google (OAuth 2.0)

Konfiguracja Firebase (klucze API) jest przechowywana w zmiennych środowiskowych i wczytywana przez plik `src/firebase/config.js`. Domena Netlify (`generator-prostego-budzetu.netlify.app`) została dodana do listy autoryzowanych domen w konsoli Firebase.

![Firebase Authentication — metoda e-mail](./screens/firebase-auth.png)

![Firebase Authentication — autoryzowane domeny](./screens/firebase-auth-domains.png)

---

## Cloud Firestore

W projekcie utworzono bazę danych **Cloud Firestore** (Standard edition) i skonfigurowano reguły bezpieczeństwa, które ograniczają dostęp do danych wyłącznie do uwierzytelnionego właściciela zasobów:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Dane operacji finansowych (kwoty, kategorie, opisy) są przechowywane w kolekcji `users/{userId}/operations`.

![Firestore — reguły bezpieczeństwa](./screens/firestore-rules.png)

![Firestore — podgląd danych](./screens/firestore-data.png)

---

## Google Analytics

Projekt jest zintegrowany z **Google Analytics 4** przy użyciu biblioteki `react-ga4`.

Aplikacja rejestruje:
- Odsłony stron (`page_view`) — przy każdej zmianie trasy
- Zdarzenia systemowe: `session_start`, `first_visit`, `user_engagement`, `scroll`

Śledzenie pageview odbywa się automatycznie przez komponent `AnalyticsListener`, który nasłuchuje zmian lokalizacji z React Router i wysyła zdarzenie do GA4.

![Google Analytics — widok czasu rzeczywistego](./screens/google-analytics-realtime.png)

![Google Analytics — przegląd raportów](./screens/google-analytics-overview.png)

![Kod AnalyticsListener.jsx](./screens/analytics-listener-code.png)

---

## Hotjar / Contentsquare

Projekt jest zintegrowany z narzędziem **Contentsquare** (następca Hotjar) do analizy zachowań użytkowników. Skrypt śledzący jest załadowany bezpośrednio w pliku `index.html`:

```html
<script src="https://t.contentsquare.net/uxa/4c874c34f6561.js"></script>
```

Narzędzie umożliwia:
- **Heatmapy kliknięć i ruchów myszy** — identyfikacja najczęściej klikanych elementów
- **Zoning Analysis** — analiza wskaźnika kliknięć w poszczególnych strefach strony
- **Scroll maps** — sprawdzenie, jak daleko użytkownicy scrollują
- **Session Replay** — nagrania sesji użytkowników

> **Uwaga:** Nagrania sesji wymagają wygenerowania ruchu na stronie i mogą pojawić się z pewnym opóźnieniem po pierwszym uruchomieniu.

![Contentsquare — instalacja zakończona sukcesem](./screens/hotjar-installation.png)

![Contentsquare — heatmapa kliknięć (dashboard)](./screens/hotjar-heatmap.png)

![Contentsquare — nagranie sesji](./screens/hotjar-session-replay.png)

---

## Deploy na Netlify

Aplikacja jest wdrożona na platformie **Netlify** i jest publicznie dostępna.

Proces CI/CD:
1. Kod jest przechowywany w repozytorium GitHub: [BartoszDutka/generator-prostego-budzetu](https://github.com/BartoszDutka/generator-prostego-budzetu)
2. Netlify automatycznie wykrywa zmiany w gałęzi `main`
3. Uruchamia build: `npm run build` (katalog wyjściowy: `dist`)
4. Publikuje zaktualizowaną wersję aplikacji

Zmienne środowiskowe Firebase i GA4 są skonfigurowane w panelu Netlify (*Site configuration → Environment variables*).

![Netlify — projekt opublikowany](./screens/netlify-deploy.png)

![Netlify — zmienne środowiskowe](./screens/netlify-env-vars.png)

---

## Screeny aplikacji

### Strona główna

![Strona główna — hero](./screens/home.png)

### Logowanie

![Logowanie](./screens/login.png)

### Rejestracja

![Rejestracja](./screens/register.png)

### Dashboard (Panel użytkownika)

![Dashboard](./screens/dashboard.png)

### Dodawanie operacji

![Dodawanie operacji](./screens/add.png)

### Historia operacji

![Historia operacji](./screens/history.png)

### Profil użytkownika

![Profil użytkownika](./screens/profile.png)

---

## Problemy napotkane podczas realizacji

### 1. Konflikt zależności przy deployowaniu na Netlify

**Problem:** Build na Netlify kończył się błędem `ERESOLVE` spowodowanym konfliktem wersji pakietu `eslint` z innymi zależnościami.

**Rozwiązanie:** Dodano plik `.npmrc` z konfiguracją `legacy-peer-deps=true`, który instruuje npm, aby ignorował konflikty peer dependencies i kontynuował instalację.

### 2. Google Analytics — brak danych po wdrożeniu

**Problem:** GA4 nie rejestrował danych, ponieważ zmienna środowiskowa `VITE_GA4_MEASUREMENT_ID` nie była dodana w ustawieniach Netlify.

**Rozwiązanie:** Dodano zmienną środowiskową w panelu Netlify oraz upewniono się, że inicjalizacja GA4 w `App.jsx` poprawnie odczytuje wartość przez `import.meta.env.VITE_GA4_MEASUREMENT_ID`.

### 3. Logowanie przez Google — błąd autoryzowanej domeny

**Problem:** Po wdrożeniu na Netlify logowanie przez Google kończyło się błędem, ponieważ domena `generator-prostego-budzetu.netlify.app` nie była na liście autoryzowanych domen Firebase.

**Rozwiązanie:** Dodano domenę Netlify do listy autoryzowanych domen w konsoli Firebase (*Authentication → Settings → Authorized domains*).

### 4. Contentsquare — brak danych w heatmapach i nagraniach sesji

**Problem:** Po dodaniu skryptu Contentsquare do `index.html` narzędzie przez pewien czas nie wyświetlało danych, ponieważ nie wygenerowano jeszcze wystarczającego ruchu na stronie.

**Rozwiązanie:** Po wygenerowaniu ruchu (wizyty na stronie, kliknięcia, scrollowanie) dane zaczęły pojawiać się w panelu Contentsquare. Nagrania sesji pojawiają się z kilkuminutowym opóźnieniem po zakończeniu wizyty.

Wszystkie powyższe problemy zostały rozwiązane i aplikacja działa poprawnie.

---

## Podsumowanie

Projekt **Generator Prostego Budżetu** spełnia wszystkie wymagania projektowe:

- Odwzorowanie widoków aplikacji zgodnie z projektem Figma
- Routing po stronie klienta zrealizowany przez React Router (trasy publiczne i chronione)
- Podział na strony (`pages/`) i komponenty wielokrotnego użytku (`components/`)
- Stylowanie aplikacji przy użyciu Tailwind CSS
- Logowanie i rejestracja przez Firebase Authentication (e-mail + Google)
- Integracja z Google Analytics 4 (śledzenie pageview i zdarzeń)
- Integracja z Hotjar / Contentsquare (heatmapy, zoning, session replay)
- Wdrożenie aplikacji na platformie Netlify z CI/CD przez GitHub
- Dokumentacja projektu z opisem struktury, routingu, technologii i screenami

---

## Autor

**Bartosz Dutka**  
Politechnika Krakowska  
Projekt zaliczeniowy — TPF 2025/2026
