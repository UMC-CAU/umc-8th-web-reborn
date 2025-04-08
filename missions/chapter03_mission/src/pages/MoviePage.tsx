import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() : React.ReactElement {
    const [movies, setMovies] = useState<Movie[]>([]);

    // 로딩 상태 관리
    const [isPending, setIsPending] = useState(false);

    // 에러 상태 관리
    const [isError, setIsError] = useState(false);

    // 페이지 번호 관리
    const [page, setPage] = useState(1);

    // 카테고리 파라미터 가져오기 -> 구조분해할당 사용
    const { category } = useParams<{ category: string }>();

    // 영화 데이터 가져오기
    useEffect(() : void => {    
        const fetchMovies = async () : Promise<void> => {
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
            } finally {
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [page, category]);

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <span>에러가 발생했습니다. 다시 시도해주세요.</span>
                <button onClick={() => window.location.reload()}>
                    새로고침
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-center items-center gap-4">
                <button 
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === 1}
                    onClick={() : void => setPage((prev) : number => prev - 1)}
                >{'<'}</button>
                <span>{page}</span>
                <button 
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === 100}
                    onClick={() : void => setPage((prev) : number => prev + 1)}
                >{'>'}</button>
            </div>
            {isPending && <LoadingSpinner />}
            {!isPending && (
                <div className="p-10 grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 
                lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <h1>Movie Page</h1>
            {movies.map((movie) : React.ReactElement => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
                </div>
            )}
        </>
    );
}
