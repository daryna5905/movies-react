import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Filters from "../components/Filters";
import Search from "../components/Search";
import type { Genre, Country, MovieListResponse } from "../types";

export default function Home() {
  const [filters, setFilters] = useState<{
    genres: number[];
    country: string;
    year: string;
  }>({ genres: [], country: "", year: "" });
  const [query, setQuery] = useState("");

  const { data: genres } = useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: () => tmdb.genres(),
  });
  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: () => tmdb.countries(),
  });

  const discoverParams = useMemo(() => {
    const p: Record<string, any> = { sort_by: "popularity.desc" };
    if (filters.genres.length) p.with_genres = filters.genres.join(",");
    if (filters.year) p.primary_release_year = filters.year;
    if (filters.country) p.with_original_language = filters.country; // approximation
    return p;
  }, [filters]);

  const { data: list, isLoading } = useQuery<MovieListResponse>({
    queryKey: ["discover", discoverParams, query],
    queryFn: () => {
      if (query) return tmdb.search(query);
      return tmdb.discover({ ...discoverParams, page: 1 });
    },
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3">
        <Filters
          genres={genres}
          countries={countries}
          filters={filters}
          setFilters={setFilters}
        />
      </aside>
      <section className="col-span-9">
        <Search onSearch={setQuery} />
        <h2 className="text-xl font-semibold my-4">Популярні новинки</h2>
        {isLoading && <div>Завантаження...</div>}
        <div className="grid grid-cols-3 gap-4">
          {list?.results?.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
