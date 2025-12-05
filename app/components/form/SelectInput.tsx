"use client";

import { ChevronDown } from "lucide-react";

interface SelectInputProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export default function SelectInput({
  label,
  name,
  required,
  value,
  onChange,
  error,
  options,
}: SelectInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label} 
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className={`
            w-full px-4 py-2.5 bg-gray-50 border rounded
            focus:outline-none focus:ring-1 focus:ring-[#267282] focus:border-transparent
            text-gray-900 transition-all
            appearance-none pr-10
            ${error ? "border-red-300 focus:ring-red-500" : "border-gray-200"}
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
