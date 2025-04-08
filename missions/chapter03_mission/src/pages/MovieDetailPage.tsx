import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetail } from "../types/movieDetail";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MovieDetailPage() : React.ReactElement {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            if (!movieId) return;
            
            setIsPending(true);
            try {
                const { data } = await axios.get<MovieDetail>(
                    `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${movieId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                        }
                    }
                );
                setMovie(data);
            } catch (error) {
                setIsError(true);
                console.error('Error fetching movie details:', error);
            } finally {
                setIsPending(false);
            }
        };
        fetchMovie();

    }, [movieId]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <span>에러가 발생했습니다. 다시 시도해주세요.</span>
                <button 
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    onClick={() => window.location.reload()}
                >
                    새로고침
                </button>
            </div>
        );
    }   
    if (isPending) {
        return <LoadingSpinner />;
    }
    if (!movie) {
        return <div className="flex justify-center items-center h-screen">영화 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-gray-400 mb-4">{movie.tagline}</p>
                    <div className="mb-4">
                        <span className="font-semibold">개봉일:</span> {movie.release_date}
                        <span className="mx-2">|</span>
                        <span className="font-semibold">러닝타임:</span> {movie.runtime}분
                        <span className="mx-2">|</span>
                        <span className="font-semibold">평점:</span> {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">장르:</span>{' '}
                        {movie.genres.map(genre => genre.name).join(', ')}
                    </div>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">줄거리</h2>
                        <p className="text-gray-300">{movie.overview}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">제작사</h2>
                        <div className="flex flex-wrap gap-2">
                            {movie.production_companies.map(company => (
                                <span key={company.id} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                    {company.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
