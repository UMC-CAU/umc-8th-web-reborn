import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageUrl =
    "https://cloudinary-marketing-res.cloudinary.com/images/w_1000,c_scale/v1699909962/fallback_image_header/fallback_image_header-png?_i=AA";

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg h-full flex flex-col">
      <div className="relative h-80 overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImageUrl
          }
          alt={`${movie.title} 포스터`}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
        <div className="absolute right-2 top-2 rounded-md bg-black bg-opacity-75 px-2 py-1 text-sm font-bold text-white">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {movie.release_date} | {movie.original_language.toUpperCase()}
        </p>
        <p className="line-clamp-3 text-sm text-gray-700 flex-grow">
          {movie.overview.length > 150
            ? `${movie.overview.slice(0, 150)}...`
            : movie.overview}
        </p>
      </div>
    </div>
  );
}
