import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';

export function useMovies(category: string, page: number) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsPending(true);
            try {
                const { data } = await axios.get<MovieResponse>(
                    `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${category}?page=${page}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                        }
                    }
                );
                setMovies(data.results);
            } catch (error) {
                setIsError(true);
                console.error('Error fetching movies:', error);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [category, page]);

    return { movies, isPending, isError };
} 