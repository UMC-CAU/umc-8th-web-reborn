import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";


export default function MoviePage() : React.ReactElement {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() : void => {    
        const fetchMovies = async () : Promise<void> => {
            const { data } = await axios.get<MovieResponse>(
                `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=ko-KR`,
                {
                    headers: {
                        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                    }
                }
            );
            setMovies(data.results);
        }

        fetchMovies();
    }, []);

    return (
        <div className="p-10 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <h1>Movie Page</h1>
            {movies.map((movie) : React.ReactElement => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}
