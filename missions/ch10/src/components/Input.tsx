interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: keyof typeof inputType;
  options?: string[];
  id?: string;
}

const inputType = {
  text: "text",
  select: "select",
  checkbox: "checkbox",
};

export default function Input({
  value,
  onChange,
  placeholder = "검색어를 입력하세요",
  className,
  type = "text",
  options,
  id,
}: InputProps) {
  return (
    <>
      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          checked={type === "checkbox" && value === "true"}
          placeholder={placeholder}
          className={className}
        />
      )}
    </>
  );
}
