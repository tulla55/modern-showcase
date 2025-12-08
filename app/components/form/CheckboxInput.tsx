
"use client";

interface CheckboxInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function CheckboxInput({
  label,
  name,
  checked,
  onChange,
  disabled = false,
}: CheckboxInputProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-3 h-3 text-[#267282] bg-gray-50 border-gray-300 rounded
                 focus:ring-1 focus:ring-[#267282] focus:ring-offset-0
                 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      />
      <label
        htmlFor={name}
        className={`ml-2 text-sm font-medium text-gray-700 ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
