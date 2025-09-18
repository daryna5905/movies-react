export interface Genre {
  id: number;
  name: string;
}
export interface Country {
  iso_3166_1: string;
  english_name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cast {
  id: number;
  name: string;
  character?: string;
}
export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
  name: string;
}

export interface MovieDetails extends Movie {
  credits?: { cast: Cast[] };
  videos?: { results: Video[] };
}
