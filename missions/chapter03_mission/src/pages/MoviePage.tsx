import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { useMovies } from "../hooks/useMovies";

const CATEGORY_TITLES = {
    popular: '인기 영화',
    now_playing: '상영 중인 영화',
    top_rated: '평점 높은 영화',
    upcoming: '개봉 예정 영화'
} as const;

export default function MoviePage() : React.ReactElement {
    const [page, setPage] = useState(1);
    const { category } = useParams<{ category: string }>();
    const { movies, isPending, isError } = useMovies(category || 'popular', page);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
                <span className="text-xl mb-4">에러가 발생했습니다. 다시 시도해주세요.</span>
                <button 
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={() => window.location.reload()}
                >
                    새로고침
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-16">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">
                    {category && CATEGORY_TITLES[category as keyof typeof CATEGORY_TITLES]}
                </h1>

                {isPending ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <>
                        <Pagination 
                            currentPage={page}
                            onPageChange={setPage}
                        />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {movies.map((movie) : React.ReactElement => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
