import type { MovieLanguage } from "../types/movie";
import { LANGUAGE_OPTIONS } from "../constants/movie";

interface LanguageSelectorProps {
  value: MovieLanguage;
  onChange: (value: MovieLanguage) => void;
}

export default function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as MovieLanguage)}>
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
