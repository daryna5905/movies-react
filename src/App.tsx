import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import MovieDetails from "./pages/movieDetails";
import WatchlistPage from "./pages/watchlist";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              TMDB App
            </Link>
            <nav className="flex gap-4">
              <Link to="/" className="hover:underline">
                Головна
              </Link>
              <Link to="/watchlist" className="hover:underline">
                Watchlist
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
