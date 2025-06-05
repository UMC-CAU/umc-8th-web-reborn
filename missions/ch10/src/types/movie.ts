export type MovieLanguage = "ko-KR" | "en-US" | "ja-JP";

export type MovieSortBy =
  | "popularity.asc"
  | "popularity.desc"
  | "release_date.asc"
  | "release_date.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export type MovieFilters = {
  query: string;
  include_adult: boolean;
  language: MovieLanguage;
  genre_id?: number | null;
  sort_by?: MovieSortBy;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type GenreResponse = {
  genres: Genre[];
};
