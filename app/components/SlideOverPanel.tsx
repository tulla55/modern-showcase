
"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface SlideOverPanelProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  children?: React.ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
}

export default function SlideOverPanel({
  open,
  onClose,
  title,
  children,
  width = "lg",
}: SlideOverPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    setTimeout(() => {
      const el = panelRef.current;
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

  const widthClasses = {
    sm: "max-w-md",   // ~448px
    md: "max-w-lg",   // ~512px
    lg: "max-w-2xl",  // ~672px
    xl: "max-w-4xl",  // ~896px
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      aria-hidden={false}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="panel-title"
          tabIndex={-1}
          className={`
            relative w-screen ${widthClasses[width]}
            bg-white shadow-xl
            transform transition-transform duration-300 ease-in-out
            animate-in slide-in-from-right
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
            <h2
              id="panel-title"
              className="text-base font-semibold text-gray-900"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1 hover:bg-gray-100"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body - Scrollable */}
          <div className="px-8 py-6 overflow-y-auto h-[calc(100vh-88px)]">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
