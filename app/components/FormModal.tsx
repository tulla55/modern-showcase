
"use client";

import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type FormModalProps = {
  open: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
};

export default function FormModal({
  open,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: FormModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    setTimeout(() => {
      const el = dialogRef.current;
      if (el) {
        const focusable = el.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        (focusable || el).focus();
      }
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", onKey);
    
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;
  if (!open) return null;

  const maxWidthClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-hidden={false}
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={`
          relative w-full ${maxWidthClasses[maxWidth]}
          bg-white rounded-md  shadow-xl
          max-h-[90vh] overflow-hidden
          animate-in fade-in zoom-in-95 duration-200
        `}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <h2
            id="modal-title"
            className="text-base font-semibold text-gray-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 py-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
