"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useModal } from "./ModalProvider";
import { Monitor, Smartphone } from "lucide-react";

export default function ModalController() {
  const { open, closeModal, options } = useModal();

  // activeSize drives the Modal sizing when the incoming option is "both".
  // It can be "monitor" or "mobile". Default to monitor.
  const [activeSize, setActiveSize] = useState<"monitor" | "mobile">("monitor");

  // Sync activeSize whenever modal options change or modal opens.
  useEffect(() => {
    if (!open) return;

    if (options?.size === "mobile") {
      setActiveSize("mobile");
    } else if (options?.size === "monitor") {
      setActiveSize("monitor");
    } else if (options?.size === "both") {
      // keep previous selection if it's monitor/mobile; otherwise default to monitor
      setActiveSize((prev) => (prev === "monitor" || prev === "mobile" ? prev : "monitor"));
    } else {
      // default
      setActiveSize("monitor");
    }
  }, [open, options?.size]);

  // If caller requested 'both' allow toggling between monitor/mobile.
  // Otherwise use the provided size or default to monitor.
  const modalSize =
    options?.size === "both" ? activeSize : (options?.size as "monitor" | "mobile" | undefined) ?? "monitor";

  return (
    <Modal open={open} onClose={closeModal} title="Search & Filters" size={modalSize}>
      {/* Top-left toggle visible only when modal was opened with size: "both" */}
      {options?.size === "both" && (
        <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
          <button
            type="button"
            aria-pressed={activeSize === "monitor"}
            onClick={() => setActiveSize("monitor")}
            className={`p-2 rounded-md transition-colors border border-black/20 cursor-pointer ${
              activeSize === "monitor" ? "bg-black/50" : "bg-black/20 hover:bg-black/50 backdrop-blur-lg border bodrer-black/20 transition-all duration-300"
            }`}
            title="Monitor view"
          >
            <Monitor size={16} color="#ffffff" />
          </button>

          <button
            type="button"
            aria-pressed={activeSize === "mobile"}
            onClick={() => setActiveSize("mobile")}
            className={`p-2 rounded-md transition-colors border border-black/20 cursor-pointer ${
              activeSize === "mobile" ? "bg-black/50" : "bg-black/20 hover:bg-black/50 backdrop-blur-lg border bodrer-black/20 transition-all duration-300"
            }`}
            title="Mobile view"
          >
            <Smartphone size={16} color="#ffffff" />
          </button>
        </div>
      )}

      {/* Put your search/filter UI here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="block text-sm text-white/80 mb-2">Search</label>
          <input
            className="w-full rounded-md p-2 bg-white/5 border border-white/10 text-white"
            placeholder="Search..."
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-2">Filters</label>
          <div className="space-y-2">
            <button className="px-3 py-1 bg-white/6 rounded text-white/90">Filter A</button>
            <button className="px-3 py-1 bg-white/6 rounded text-white/90">Filter B</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}