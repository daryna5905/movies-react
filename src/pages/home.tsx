import { useState, useMemo, useRef, useEffect } from "react";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { tmdb } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Filters from "../components/Filters";
import Search from "../components/Search";
import type { Genre, Country, MovieListResponse } from "../types";
import Loader from "../components/Loader";

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

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<MovieListResponse>({
      queryKey: ["discover", discoverParams, query],
      queryFn: async ({ pageParam = 1 }) => {
        if (query) {
          return tmdb.search(query, pageParam as number);
        }
        return tmdb.discover({ ...discoverParams, page: pageParam });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      placeholderData: keepPreviousData,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <aside className="col-span-3">
        <Filters
          genres={genres}
          countries={countries as any}
          filters={filters}
          setFilters={setFilters}
        />
      </aside>
      <section className="col-span-9">
        <Search onSearch={setQuery} />

        <h2 className="text-xl font-semibold my-4">Популярні новинки</h2>

        {isLoading && <Loader />}

        <div className="grid grid-cols-3 gap-4">
          {data?.pages.map((page) =>
            page.results.map((m) => <MovieCard key={m.id} movie={m} />)
          )}
        </div>

        {isFetchingNextPage && <Loader />}

        <div ref={loadMoreRef} className="h-10"></div>
      </section>
    </div>
  );
}
