import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-darker mb-3">Strona nie istnieje</h1>
          <p className="text-gray-text mb-8">
            Strona, której szukasz, nie została znaleziona. Możliwe, że link jest nieprawidłowy
            lub strona została przeniesiona.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg">Wróć na stronę główną</Button>
            </Link>
            <Link to="/pomoc">
              <Button variant="outline" size="lg">Centrum pomocy</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
