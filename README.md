# Generator Prostego Budżetu

Aplikacja webowa do zarządzania budżetem osobistym, zbudowana w React z Firebase Authentication.

## Screeny aplikacji

> Dodaj screeny aplikacji po uruchomieniu projektu.

## Funkcjonalności

- Strona główna z opisem funkcji
- Rejestracja i logowanie (email/hasło + Google) — Firebase Auth
- Chroniony panel użytkownika (Dashboard)
- Dodawanie operacji (przychód/wydatek)
- Historia operacji z filtrowaniem
- Plan oszczędnościowy
- Profil użytkownika (zmiana hasła, usunięcie konta)
- Regulamin, Polityka prywatności, Centrum pomocy, Kontakt
- Routing wszystkich ekranów (React Router v6)
- Analityka: Google Analytics 4 + Hotjar
- Responsywny design (Tailwind CSS)

## Technologie

- React 18 + Vite
- React Router DOM v6
- Firebase Authentication
- Tailwind CSS
- Google Analytics 4 (react-ga4)
- Hotjar

## Uruchomienie lokalne

```bash
npm install --legacy-peer-deps
npm run dev
```

## Konfiguracja Firebase

1. Utwórz projekt na [Firebase Console](https://console.firebase.google.com)
2. Dodaj aplikację webową
3. Włącz uwierzytelnianie Email/Hasło oraz Google w zakładce Authentication
4. Skopiuj dane konfiguracyjne do pliku `src/firebase/config.js`:

```js
const firebaseConfig = {
  apiKey: "Twój-API-Key",
  authDomain: "Twój-projekt.firebaseapp.com",
  projectId: "Twój-projekt-id",
  storageBucket: "Twój-projekt.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## Konfiguracja Google Analytics

1. Utwórz właściwość GA4 na [Google Analytics](https://analytics.google.com)
2. Skopiuj Measurement ID (np. `G-XXXXXXXXXX`)
3. Zaktualizuj `GA4_MEASUREMENT_ID` w `src/App.jsx`

## Konfiguracja Hotjar

1. Utwórz konto na [Hotjar](https://www.hotjar.com)
2. Dodaj nową stronę i skopiuj Site ID
3. Zaktualizuj `HOTJAR_SITE_ID` w `src/App.jsx`

## Deploy (Railway / Netlify / Vercel)

### Vercel (zalecane)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Wgraj folder dist/ przez panel netlify.app
```

## Screeny z Google Analytics

> Dodaj screeny po skonfigurowaniu GA4.

## Screeny z Hotjar

> Dodaj screeny po skonfigurowaniu Hotjar.

## Struktura projektu

```
src/
├── components/
│   ├── AnalyticsListener.jsx   # GA4 page view tracking
│   ├── Button.jsx               # Reużywalny przycisk
│   ├── Card.jsx                 # Reużywalna karta
│   ├── Footer.jsx               # Stopka
│   ├── ImportModal.jsx          # Modal importu danych
│   ├── Logo.jsx                 # Logo aplikacji
│   ├── Navbar.jsx               # Nawigacja (publiczna/zalogowana)
│   └── ProtectedRoute.jsx       # Ochrona tras
├── context/
│   └── AuthContext.jsx          # Kontekst uwierzytelniania
├── firebase/
│   └── config.js                # Konfiguracja Firebase
├── pages/
│   ├── HomePage.jsx             # /
│   ├── LoginPage.jsx            # /login
│   ├── RegisterPage.jsx         # /register
│   ├── DashboardPage.jsx        # /dashboard (chroniona)
│   ├── AddOperationPage.jsx     # /add (chroniona)
│   ├── HistoryPage.jsx          # /history (chroniona)
│   ├── SavingsPlanPage.jsx      # /plan (chroniona)
│   ├── ProfilePage.jsx          # /profile (chroniona)
│   ├── TermsPage.jsx            # /regulamin
│   ├── PrivacyPage.jsx          # /polityka-prywatnosci
│   ├── HowItWorksPage.jsx       # /jak-to-dziala
│   ├── HelpPage.jsx             # /pomoc
│   ├── ContactPage.jsx          # /kontakt
│   └── NotFoundPage.jsx         # /* (404)
├── App.jsx                      # Routing + inicjalizacja GA4/Hotjar
├── index.css                    # Tailwind + style globalne
└── main.jsx                     # Entry point
```

## Autorzy

- Bartosz Dutka
- Patryk Gal

Politechnika Krakowska im. Tadeusza Kościuszki  
Techniki projektowania frontendowego, 2026
