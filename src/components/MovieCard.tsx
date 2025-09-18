import { Link } from "react-router-dom";
import { tmdb } from "../api/tmdb";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { add, remove } from "../store/watchlistSlice";
import type { Movie } from "../types";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((s) => s.watchlist.items);
  const inList = watchlist.some((i) => i.id === movie.id);
  const poster = tmdb.image(movie.poster_path);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "";

  return (
    <div className="bg-white rounded shadow overflow-hidden">
      {poster ? (
        <img
          src={poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          No Image
        </div>
      )}
      <div className="p-3">
        <Link to={`/movie/${movie.id}`} className="font-semibold block">
          {movie.title} <span className="text-sm text-gray-600">({year})</span>
        </Link>
        <div className="mt-2 flex justify-between items-center">
          <button
            onClick={() => dispatch(inList ? remove(movie.id) : add(movie))}
            className="text-sm px-2 py-1 border rounded"
          >
            {inList ? "Видалити з watchlist" : "Додати у watchlist"}
          </button>
          <div className="text-sm text-gray-600">
            {movie.vote_average ?? ""}
          </div>
        </div>
      </div>
    </div>
  );
}
