
"use client";

interface NumberInputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  error?: string;
}

export default function NumberInput({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  min = 1,
  max,
  error,
}: NumberInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xm font-medium text-gray-700">
        {label} 
      </label>
      <input
        type="number"
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`
          w-full px-4 py-2.5 bg-gray-50 border rounded
          focus:outline-none focus:ring-1 focus:ring-[#267282] focus:border-transparent
          text-gray-900 placeholder-gray-400 transition-all
          ${error ? "border-red-300 focus:ring-red-500" : "border-gray-200"}
        `}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}