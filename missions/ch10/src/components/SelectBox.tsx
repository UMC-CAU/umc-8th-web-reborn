interface SelectBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
  className?: string;
}

export default function SelectBox({
  checked,
  onChange,
  label,
  id,
  className,
}: SelectBoxProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-gray-300 bg-gray-200 text-blue-600 focus:border-blue-500"
      />
      <label htmlFor={id} className="ml-4 text-gray-700">
        {label}
      </label>
    </div>
  );
}
