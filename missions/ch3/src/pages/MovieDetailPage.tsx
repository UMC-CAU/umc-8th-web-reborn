import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetail } from "../types/movieDetail";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";

interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface Credits {
    cast: Cast[];
}

export default function MovieDetailPage() : React.ReactElement {
    const { movieId } = useParams<{ movieId: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) return;
            
            setIsPending(true);
            try {
                const [movieResponse, creditsResponse] = await Promise.all([
                    axios.get<MovieDetail>(
                        `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${movieId}`,
                        {
                            headers: {
                                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                            }
                        }
                    ),
                    axios.get<Credits>(
                        `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${movieId}/credits`,
                        {
                            headers: {
                                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                            }
                        }
                    )
                ]);
                
                setMovie(movieResponse.data);
                setCredits(creditsResponse.data);
            } catch (error) {
                setIsError(true);
                console.error('Error fetching movie details:', error);
            } finally {
                setIsPending(false);
            }
        };
        fetchMovieDetails();
    }, [movieId]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <span>에러가 발생했습니다. 다시 시도해주세요.</span>
                <button 
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
        <div className="min-h-screen bg-black text-white pt-16">
            {/* 배경 이미지 */}
            <div className="relative h-[60vh] w-full">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            {/* 영화 정보 */}
            <div className="container mx-auto px-4 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full md:w-2/3">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
                        <p className="text-xl text-gray-300 mb-4">{movie.tagline}</p>
                        <div className="mb-4 flex flex-wrap gap-4">
                            <span className="bg-gray-800 px-3 py-1 rounded-full">
                                {movie.release_date}
                            </span>
                            <span className="bg-gray-800 px-3 py-1 rounded-full">
                                {movie.runtime}분
                            </span>
                            <span className="bg-gray-800 px-3 py-1 rounded-full">
                                ⭐ {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">장르:</span>{' '}
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full mr-2">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">줄거리</h2>
                            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
                        </div>
                        
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">제작사</h2>
                            <div className="flex flex-wrap gap-4">
                                {movie.production_companies.map(company => (
                                    <div key={company.id} className="bg-gray-800/50 px-4 py-2 rounded-lg">
                                        <p className="font-medium">{company.name}</p>
                                        <p className="text-sm text-gray-400">{company.origin_country}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 출연진 */}
                {credits && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold mb-6">출연진</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {credits.cast.slice(0, 12).map((actor) => (
                                <div key={actor.id} className="text-center">
                                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-2">
                                        <img 
                                            src={actor.profile_path 
                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(actor.name)}&backgroundColor=808080&textColor=ffffff`
                                            }
                                            alt={actor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="font-medium">{actor.name}</p>
                                    <p className="text-sm text-gray-400">{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
