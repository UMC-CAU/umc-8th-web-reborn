import MovieCard from "./MovieCard";
import type { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
}

export default function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <p className="text-2xl font-bold text-gray-500">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
