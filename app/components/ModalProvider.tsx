"use client";

import React, { createContext, useContext, useState } from "react";

type ModalSize = "monitor" | "mobile" | "both" | undefined;

type ModalType = 
  | "search"           // Your existing search/filter modal
  | "addAdFormat"      // NEW
  | "addCompany"       // NEW
  | "addCampaign"      // NEW
  | "addIndustry"      // NEW
  | "addEffect"        // NEW
  | "addBanner";       // NEW

type ModalOptions = {
  size?: ModalSize;
  type?: ModalType;
  data?: any; // Optional: pass initial data to modal
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
    // Clear options after a short delay to allow exit animation
    setTimeout(() => setOptions(undefined), 200);
  };

  const toggleModal = (opts?: ModalOptions) => {
    if (open) {
      closeModal();
    } else {
      openModal(opts);
    }
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