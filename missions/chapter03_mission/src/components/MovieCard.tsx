import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../types/movie";
import { useState } from "react";
interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) : React.ReactElement {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const params = useParams();

    return (
        <div 
            onClick={() : void | Promise<void> => navigate(`/movie/${params.category}/${movie.id}`)}
            className="w-full h-full relative rounded-xl overflow-hidden 
            cursor-pointer w-44 transition-transform duration-500 justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img 
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={`${movie.title} 영화의 이미지`}
                className = 'w-full h-full object-cover'
            />
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50
                to-transparent backdrop-blur-md flex flex-col justify-end 
                items-center text-white p-4">
                    <h2 className="text-lg font-bold leading-snug">{movie.title}</h2>
                    <p className="text-sm text-gray-300 leading-snug mt-2
                    line-clamp-3">
                        {movie.overview}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
