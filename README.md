# Generator Prostego Budżetu

Aplikacja webowa do zarządzania budżetem osobistym — zbudowana w React 18 + Vite, z Firebase Authentication, Cloud Firestore, Google Analytics 4 oraz Contentsquare. Wdrożona na Netlify.

**Link do aplikacji:** [https://generator-prostego-budzetu.netlify.app](https://generator-prostego-budzetu.netlify.app)

**Repozytorium:** [github.com/BartoszDutka/generator-prostego-budzetu](https://github.com/BartoszDutka/generator-prostego-budzetu)

---

## Technologie

React 18 · Vite · React Router v6 · Firebase Authentication · Cloud Firestore · Tailwind CSS · Google Analytics 4 · Contentsquare · Netlify

---

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

---

## Screeny aplikacji

### Strona główna

![Strona główna](./screens/home.png)

### Logowanie

![Logowanie](./screens/login.png)

### Rejestracja

![Rejestracja](./screens/register.png)

### Dashboard — Panel użytkownika

![Dashboard](./screens/dashboard.png)

![Dashboard — ostatnie operacje](./screens/dashboard-operations.png)

![Dashboard — modal importu danych](./screens/import-modal.png)

### Dodawanie operacji

![Dodawanie operacji](./screens/add.png)

### Historia operacji

![Historia operacji](./screens/history.png)

### Plan oszczędnościowy

![Plan oszczędnościowy](./screens/savings-plan.png)

![Plan oszczędnościowy — modal wpłaty](./screens/savings-plan-deposit.png)

### Profil użytkownika

![Profil użytkownika](./screens/profile.png)

### Jak to działa

![Jak to działa](./screens/how-it-works.png)

### Centrum pomocy

![Centrum pomocy](./screens/help.png)

### Kontakt

![Kontakt](./screens/contact.png)

### Strona 404

![Strona 404](./screens/page-404.png)

---

## Google Analytics

Aplikacja jest zintegrowana z Google Analytics 4. Przy każdej zmianie trasy komponent `AnalyticsListener` wysyła zdarzenie `page_view` do GA4. Rejestrowane są również zdarzenia `session_start`, `first_visit`, `user_engagement` i `scroll`.

W trakcie testowania zebrano dane od 7 aktywnych użytkowników, którzy wykonali łącznie 451 odsłon stron i wygenerowali 506 zdarzeń.

![Google Analytics — widok czasu rzeczywistego](./screens/google-analytics-realtime.png)

![Google Analytics — przegląd raportów](./screens/google-analytics-overview.png)

![Google Analytics — raport stron (wszystkie trasy)](./screens/google-analytics-pages.png)

![Kod AnalyticsListener.jsx](./screens/analytics-listener-code.png)

---

## Hotjar / Contentsquare

Aplikacja jest zintegrowana z Contentsquare. Skrypt śledzący jest załadowany w `index.html`. Narzędzie umożliwia analizę heatmap kliknięć i ruchów myszy, scroll map, zoning analysis oraz nagrania sesji użytkowników.

![Contentsquare — potwierdzenie instalacji](./screens/hotjar-installation.png)

![Contentsquare — panel główny](./screens/contentsquare-home.png)

![Contentsquare — heatmapa kliknięć (dashboard)](./screens/hotjar-heatmap.png)

![Contentsquare — heatmapa ruchów myszy](./screens/contentsquare-moves.png)

![Contentsquare — scroll map](./screens/contentsquare-scrolls.png)

![Contentsquare — Zoning Analysis](./screens/contentsquare-zoning.png)

![Contentsquare — lista nagranych sesji](./screens/contentsquare-sessions-list.png)

![Contentsquare — nagranie sesji użytkownika](./screens/hotjar-session-replay.png)

---

## Autorzy

**Bartosz Dutka**  
**Patryk Gal**  
Politechnika Krakowska  
Przedmiot: TPF — Technologie i Platformy Frontendowe  
Rok akademicki: 2025/2026
