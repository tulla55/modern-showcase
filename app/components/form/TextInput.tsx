"use client";

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: "text" | "email" | "url" | "tel";
}

export default function TextInput({
  label,
  name,
  placeholder,
  required,
  value,
  onChange,
  error,
  type = "text",
}: TextInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label} 
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={`
          w-full px-4 py-2.5 bg-gray-50 border rounded 
          focus:outline-none focus:ring-1 focus:ring-[#267282] focus:border-transparent
          text-gray-900 placeholder-gray-400 transition-all text-xs
          ${error ? "border-red-300 focus:ring-red-500" : "border-gray-200"}
        `}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}


         