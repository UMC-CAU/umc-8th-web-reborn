import { useEffect, useState } from 'react';
import { Movie } from '../types/movie';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomePage() : React.ReactElement {
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            setIsPending(true);
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_TMDB_BASE_URL}/trending/movie/week`,
                    {
                        headers: {
                            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_KEY}`
                        }
                    }
                );
                setTrendingMovies(data.results);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                setIsPending(false);
            }
        };

        fetchTrendingMovies();
    }, []);

    if (isPending) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-black text-white pt-16">
            {/* 히어로 섹션 */}
            <div className="relative h-[80vh] w-full">
                {trendingMovies[0] && (
                    <>
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${trendingMovies[0].backdrop_path})`
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
                        <div className="absolute bottom-20 left-10 max-w-2xl">
                            <h1 className="text-5xl font-bold mb-4">{trendingMovies[0].title}</h1>
                            <p className="text-lg text-gray-300 mb-4">{trendingMovies[0].overview}</p>
                            <div className="flex gap-4">
                                <button className="bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                    재생
                                </button>
                                <button className="bg-gray-500/50 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-500/70 transition-colors">
                                    자세히 보기
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* 트렌딩 섹션 */}
            
            <div className="px-10 py-8">
                <h2 className="text-2xl font-bold mb-4">이번 주 인기 작품</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {trendingMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
}  
