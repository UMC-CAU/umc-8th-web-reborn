import { memo, useState } from "react";
import type {
  MovieFilters,
  MovieLanguage,
  Genre,
  MovieSortBy,
} from "../types/movie";
import Input from "./Input";
import SelectBox from "./SelectBox";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface MovieFilterProps {
  onChange: (filters: MovieFilters) => void;
  genres: Genre[];
}

const SORT_OPTIONS: { label: string; value: MovieSortBy }[] = [
  { label: "인기순 (내림차순)", value: "popularity.desc" },
  { label: "인기순 (오름차순)", value: "popularity.asc" },
  { label: "최신순 (내림차순)", value: "release_date.desc" },
  { label: "최신순 (오름차순)", value: "release_date.asc" },
  { label: "평점순 (내림차순)", value: "vote_average.desc" },
  { label: "평점순 (오름차순)", value: "vote_average.asc" },
  { label: "투표 수 (내림차순)", value: "vote_count.desc" },
  { label: "투표 수 (오름차순)", value: "vote_count.asc" },
];

function MovieFilter({ onChange, genres }: MovieFilterProps) {
  console.log("리렌더링 MovieFilter");
  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [selectedSortBy, setSelectedSortBy] =
    useState<MovieSortBy>("popularity.desc");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
      genre_id: selectedGenreId,
      sort_by: selectedSortBy,
    };
    onChange(filters);
  };

  const handleChangeLanguage = (value: string) => {
    setLanguage(value as MovieLanguage);
  };

  const handleChangeQuery = (value: string) => {
    setQuery(value);
  };

  const handleChangeIncludeAdult = (checked: boolean) => {
    setIncludeAdult(checked);
  };

  const handleChangeGenre = (value: string) => {
    setSelectedGenreId(value === "" ? null : Number(value));
  };

  const handleChangeSortBy = (value: string) => {
    setSelectedSortBy(value as MovieSortBy);
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-grow w-full sm:w-auto">
          <label
            htmlFor="movieTitle"
            className="block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input
            id="movieTitle"
            value={query}
            onChange={handleChangeQuery}
            placeholder="제목을 입력하세요"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <SelectBox
            checked={includeAdult}
            onChange={handleChangeIncludeAdult}
            label="성인 콘텐츠 표시"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label
            htmlFor="languageSelect"
            className="block text-sm font-medium text-gray-700 whitespace-nowrap">
            언어
          </label>
          <Input
            id="languageSelect"
            value={language}
            onChange={handleChangeLanguage}
            type="select"
            options={LANGUAGE_OPTIONS.map((option) => option.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label
            htmlFor="genreSelect"
            className="block text-sm font-medium text-gray-700 whitespace-nowrap">
            장르
          </label>
          <Input
            id="genreSelect"
            value={selectedGenreId?.toString() || ""}
            onChange={handleChangeGenre}
            type="select"
            options={[
              { label: "모든 장르", value: "" },
              ...genres.map((genre) => ({
                label: genre.name,
                value: genre.id.toString(),
              })),
            ].map((option) => option.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label
            htmlFor="sortBySelect"
            className="block text-sm font-medium text-gray-700 whitespace-nowrap">
            정렬
          </label>
          <Input
            id="sortBySelect"
            value={selectedSortBy}
            onChange={handleChangeSortBy}
            type="select"
            options={SORT_OPTIONS.map((option) => option.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 mt-auto">
          검색
        </button>
      </form>
    </div>
  );
}

export default memo(MovieFilter);
