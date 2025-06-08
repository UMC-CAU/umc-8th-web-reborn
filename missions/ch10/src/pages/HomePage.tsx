import { useCallback, useEffect, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type {
  MovieFilters,
  MovieResponse,
  Movie,
  GenreResponse,
} from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 영화 장르 목록 가져오기
  const {
    data: genreData,
    error: genreError,
    isLoading: isGenreLoading,
  } = useFetch<GenreResponse>("/genre/movie/list");
  const genres = useMemo(() => genreData?.genres || [], [genreData]);

  const axiosRequestConfig = useMemo(() => {
    return {
      params: {
        ...filters,
        page: page,
      },
    };
  }, [filters, page]);

  const { data, error, isLoading } = useFetch<MovieResponse>(
    filters.query ? "/search/movie" : "/discover/movie", // 검색어가 있을 때는 search, 없을 때는 discover 사용
    axiosRequestConfig
  );

  useEffect(() => {
    if (data) {
      if (page === 1) {
        setMovies(data.results);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
      setTotalPages(data.total_pages);
    }
  }, [data, page]);

  const handleMovieFilter = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
      setPage(1); // 필터 변경 시 페이지 초기화
      setMovies([]); // 필터 변경 시 기존 영화 목록 초기화
    },
    [setFilters]
  );

  const handleLoadMore = () => {
    if (page < totalPages && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (error || genreError) {
    return <div>데이터를 불러오는데 에러가 발생했습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {isGenreLoading ? (
        <div>장르 목록 로딩 중...</div>
      ) : (
        <MovieFilter onChange={handleMovieFilter} genres={genres} />
      )}

      {isLoading && page === 1 ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList movies={movies} />
      )}
      {isLoading && page > 1 && <div>더 불러오는 중...</div>}
      {!isLoading && page < totalPages && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
          >
            더보기
          </button>
        </div>
      )}
      {!isLoading && movies.length > 0 && page === totalPages && (
        <div className="flex justify-center mt-4">
          <p>마지막 페이지입니다.</p>
        </div>
      )}
      {!isLoading && movies.length === 0 && filters.query !== "" && (
        <div className="flex justify-center mt-4">
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
      {!isLoading && movies.length === 0 && filters.query === "" && (
        <div className="flex justify-center mt-4">
          <p>영화를 검색해보세요.</p>
        </div>
      )}
    </div>
  );
}

// 검색 필터
// 영화 무비
