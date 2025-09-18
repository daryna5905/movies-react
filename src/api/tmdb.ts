import axios from "axios";
import type { MovieListResponse, MovieDetails, Genre, Country } from "../types";

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

const BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

const client = axios.create({
  baseURL: BASE,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const tmdb = {
  image: (path?: string | null) => (path ? `${IMAGE_BASE}${path}` : null),
  popular: (page = 1) =>
    client
      .get<MovieListResponse>(`/movie/now_playing`, {
        params: { page },
      })
      .then((r) => r.data),
  discover: (params: Record<string, any>) =>
    client
      .get<MovieListResponse>(`/discover/movie`, {
        params: { ...params },
      })
      .then((r) => r.data),
  search: (query: string, page = 1) =>
    client
      .get<MovieListResponse>(`/search/movie`, {
        params: { query, page },
      })
      .then((r) => r.data),
  genres: () =>
    client
      .get<{ genres: Genre[] }>(`/genre/movie/list`)
      .then((r) => r.data.genres),
  countries: () =>
    client.get<Country[]>(`/configuration/countries`).then((r) => r.data),
  movieDetails: (id: string) =>
    client
      .get<MovieDetails>(`/movie/${id}`, {
        params: { append_to_response: "credits,videos" },
      })
      .then((r) => r.data),
};
