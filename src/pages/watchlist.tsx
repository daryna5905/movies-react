import { useAppSelector } from "../store/hooks";
import MovieCard from "../components/MovieCard";

export default function WatchlistPage() {
  const items = useAppSelector((s) => s.watchlist.items);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Мій Watchlist</h2>
      {items.length === 0 ? (
        <div>Пусто</div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {items.map((m) => (
            <div key={m.id}>
              <MovieCard movie={m} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
