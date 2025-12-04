"use client";

import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  size?: "monitor" | "mobile" | "both";
};

export default function Modal({
  open,
  onClose,
  title = "Modal title",
  children,
  size = "monitor",
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // focus the modal container
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
    // lock background scroll
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

  const sizeClassMap: Record<string, string> = {
    monitor: "w-full max-w-[96vw] h-[95vh]",
    mobile: "w-[45vw] max-w-[25vw] h-[90vh]",
    both: "w-[60vw] max-w-[60vw] h-[95vh]",
  };

  const modalSizeClass = sizeClassMap[size] ?? sizeClassMap["monitor"];

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none"
      aria-hidden={false}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal box */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`relative pointer-events-auto bg-white/75 border border-white/10 rounded-2xl shadow-2xl overflow-auto p-6 ${modalSizeClass}`}
      >
        <div className="flex items-start justify-between gap-4">
          {/* <h2 className="text-lg font-semibold text-white">{title}</h2> */}
          <button
            type="button"
            className="ml-auto bg-black/20 hover:bg-black/50 backdrop-blur-sm border border-black/20 text-white rounded-full p-2 cursor-pointer
            transition-all duration-300"
            aria-label="Close"
            onClick={() => onClose?.()}
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 text-white/90">{children}</div>
      </div>
    </div>,
    document.body
  );
}