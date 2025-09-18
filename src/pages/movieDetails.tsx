import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../api/tmdb";
import type { MovieDetails as MD } from "../types";

export default function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery<MD | undefined>({
    queryKey: ["movie", id],
    queryFn: () => (id ? tmdb.movieDetails(id) : Promise.resolve(undefined)),
  });

  if (isLoading) return <div>Завантаження...</div>;
  if (!data) return <div>Не знайдено</div>;

  const trailer = data.videos?.results?.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const poster = tmdb.image(data.poster_path);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-3 gap-4">
        <div>
          {poster ? (
            <img src={poster} alt={data.title} />
          ) : (
            <div className="w-full h-96 bg-gray-200" />
          )}
        </div>
        <div className="col-span-2">
          <h1 className="text-2xl font-bold">
            {data.title} ({data.release_date?.slice(0, 4)})
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Актори:{" "}
            {data.credits?.cast
              ?.slice(0, 6)
              .map((c) => c.name)
              .join(", ")}
          </p>
          <p className="mt-4">{data.overview}</p>

          {trailer && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Трейлер</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  title="trailer"
                  width={560}
                  height={315}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  frameBorder={0}
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
