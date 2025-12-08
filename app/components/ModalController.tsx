
"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useModal } from "./ModalProvider";
import { Monitor, Smartphone } from "lucide-react";

// Import modal components
import AddAdFormatModal from "./modals/AddAdFormatModal";
import AddCompanyModal from "./modals/AddCompanyModal";
import AddCampaignModal from "./modals/AddCampaignModal";
import AddIndustryModal from "./modals/AddIndustryModal";
import AddEffectModal from "./modals/AddEffectModal";
import AddBannerModal from "./modals/AddBannerModal";

export default function ModalController() {
  const { open, closeModal, options } = useModal();
  const [activeSize, setActiveSize] = useState<"monitor" | "mobile">("monitor");

  useEffect(() => {
    if (!open) return;

    if (options?.size === "mobile") {
      setActiveSize("mobile");
    } else if (options?.size === "monitor") {
      setActiveSize("monitor");
    } else if (options?.size === "both") {
      setActiveSize((prev) => (prev === "monitor" || prev === "mobile" ? prev : "monitor"));
    } else {
      setActiveSize("monitor");
    }
  }, [open, options?.size]);

  // Render form modals
  if (options?.type === "addAdFormat") {
    return open ? <AddAdFormatModal /> : null;
  }

  if (options?.type === "addCompany") {
    return open ? <AddCompanyModal /> : null;
  }

  if (options?.type === "addCampaign") {
    return open ? <AddCampaignModal /> : null;
  }

  if (options?.type === "addIndustry") {
    return open ? <AddIndustryModal /> : null;
  }

  if (options?.type === "addEffect") {
    return open ? <AddEffectModal /> : null;
  }

  if (options?.type === "addBanner") {
    return open ? <AddBannerModal /> : null;
  }

  // For search/filter modal
  const modalSize =
    options?.size === "both" ? activeSize : (options?.size as "monitor" | "mobile" | undefined) ?? "monitor";

  return (
    <Modal open={open} onClose={closeModal} title="Search & Filters" size={modalSize}>
      {options?.size === "both" && (
        <div className="absolute top-6 left-6 z-50 flex items-center gap-2">
          <button
            type="button"
            aria-pressed={activeSize === "monitor"}
            onClick={() => setActiveSize("monitor")}
            className={`p-2 rounded-md transition-colors border border-black/20 cursor-pointer ${
              activeSize === "monitor"
                ? "bg-black/50"
                : "bg-black/20 hover:bg-black/50 backdrop-blur-lg border border-black/20 transition-all duration-300"
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
              activeSize === "mobile"
                ? "bg-black/50"
                : "bg-black/20 hover:bg-black/50 backdrop-blur-lg border border-black/20 transition-all duration-300"
            }`}
            title="Mobile view"
          >
            <Smartphone size={16} color="#ffffff" />
          </button>
        </div>
      )}

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
