"use client";

import React, { createContext, useContext, useState } from "react";

type ModalSize = "monitor" | "mobile" | "both" | undefined;

type ModalOptions = {
  size?: ModalSize;
  // you can add more options here in future (e.g., initialData, title override, etc.)
};

type ModalContextValue = {
  open: boolean;
  options: ModalOptions | undefined;
  openModal: (options?: ModalOptions) => void;
  closeModal: () => void;
  toggleModal: (options?: ModalOptions) => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions | undefined>(undefined);

  const openModal = (opts?: ModalOptions) => {
    setOptions(opts);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
    // keep options until closed — clear if you prefer:
    setOptions(undefined);
  };
  const toggleModal = (opts?: ModalOptions) => {
    setOptions(opts);
    setOpen((s) => !s);
  };

  return (
    <ModalContext.Provider value={{ open, options, openModal, closeModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");
  return ctx;
}