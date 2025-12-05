
"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  label: string;
  name: string;
  accept?: string;
  onChange: (file: File | null) => void;
  error?: string;
  helperText?: string;
}

export default function FileUpload({
  label,
  name,
  accept = "image/*",
  onChange,
  error,
  helperText,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      setFileName(file.name);
      
      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
      
      onChange(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>

      {!preview ? (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor={name}
            className={`
              flex flex-col items-center justify-center w-full h-32
              border-2 border-dashed rounded-md cursor-pointer
              bg-gray-50 hover:bg-gray-100 transition-colors
              ${error ? "border-red-300" : "border-gray-300"}
            `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-2 text-xs text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              {helperText && (
                <p className="text-[10px] text-gray-500">{helperText}</p>
              )}
            </div>
            <input
              id={name}
              name={name}
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleFileChange}
            />
          </label>
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {fileName}
              </p>
              <p className="text-xs text-gray-500">Click the × to remove</p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
