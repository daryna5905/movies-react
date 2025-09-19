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
    <div
      className="
        block bg-white rounded-2xl overflow-hidden 
        shadow-md hover:shadow-2xl
        transform hover:scale-102 hover:-translate-y-1
        transition-all duration-300 ease-out
        flex flex-col h-full"
    >
      <Link to={`/movie/${movie.id}`}>
        {poster ? (
          <div style={{ aspectRatio: 3 / 4 }}>
            <img
              src={poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
        <div className="p-3">
          <div className="font-semibold block">
            {movie.title}{" "}
            <span className="text-sm text-gray-600">({year})</span>
          </div>
          <div className="text-sm text-gray-600">
            {movie.vote_average ?? ""}
          </div>
        </div>
      </Link>
      <button
        onClick={() => dispatch(inList ? remove(movie.id) : add(movie))}
        className="
                mb-3 mx-3 mt-auto
                bg-blue-600 text-white px-4 py-2 rounded-lg
                hover:bg-blue-700
                transition-colors duration-300 ease-in-out
                border rounded cursor-pointer"
      >
        {inList ? "Видалити з watchlist" : "Додати у watchlist"}
      </button>
    </div>
  );
}
