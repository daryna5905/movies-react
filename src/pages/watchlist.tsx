import { useAppSelector, useAppDispatch } from "../store/hooks";
import { remove } from "../store/watchlistSlice";
import MovieCard from "../components/MovieCard";

export default function WatchlistPage() {
  const items = useAppSelector((s) => s.watchlist.items);
  const dispatch = useAppDispatch();

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
              <button
                onClick={() => dispatch(remove(m.id))}
                className="mt-2 text-sm text-red-600"
              >
                Видалити
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
