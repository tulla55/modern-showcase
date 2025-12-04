"use client";

import { Monitor, MonitorSmartphone, Smartphone } from "lucide-react";
import Image from "next/image";

import { cards as allCards } from "../../data/data";
import { useFilters } from "../../components/FilterProvider";
import { useModal } from "../../components/ModalProvider";
import ScrollToTop from "../../components/ScrollToTop";

// ICON MAPPER
const renderIcon = (type: string) => {
  switch (type) {
    case "monitor":
      return <Monitor size={18} color="#ffffff" />;
    case "mobile":
      return <Smartphone size={18} color="#ffffff" />;
    case "both":
      return <MonitorSmartphone size={18} color="#ffffff" />;
    default:
      return <Smartphone size={18} color="#ffffff" />;
  }
};

export default function Home() {
  const {
    selectedIndustries,
    selectedFormats,
    selectedChannels,
    searchQuery,
  } = useFilters();
  const { openModal } = useModal();

  const isCategoryFiltering = (set: Set<string>) => {
    if (set.size === 0) return false;
    if (set.has("ALL")) return false;
    return true;
  };

  const industryFiltering = isCategoryFiltering(selectedIndustries);
  const formatFiltering = isCategoryFiltering(selectedFormats);
  const channelFiltering = isCategoryFiltering(selectedChannels);

  const q = searchQuery.trim().toLowerCase();

  const filtered = allCards.filter((card) => {
    if (industryFiltering && !selectedIndustries.has(card.industry)) return false;
    if (formatFiltering && !selectedFormats.has(card.format)) return false;
    if (channelFiltering && !selectedChannels.has(card.channel)) return false;

    if (q) {
      const hay = `${card.title} ${card.brand} ${card.industry} ${card.format} ${card.channel}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    return true;
  });

  const cardsToShow = filtered;

  return (
    <div className="w-full min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cardsToShow.map((card) => (
          <div
            key={card.id}
            className="group bg-white/20 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden w-full aspect-[3/4] relative flex flex-col"
          >
            {/* ADAPTIVE GLASS ICON */}
            <div
              role="button"
              aria-label={`Open modal for ${card.title}`}
              onClick={() => openModal({ size: card.icon as "monitor" | "mobile" | "both" })}
              className="
                absolute top-4 right-4 z-30 
                bg-black/20 backdrop-blur-md border border-white/40 shadow-md
                rounded-full flex items-center justify-center h-10 w-10
                cursor-pointer
              "
            >
              {renderIcon(card.icon)}
            </div>

            {/* IMAGE SECTION */}
            <div
              className="
                group bg-gray-300 rounded-xl shadow-md overflow-hidden 
                w-[calc(100%-10px)] h-[70%] group-hover:h-[98%]
                transition-all duration-300
                absolute top-1 left-1 right-1 z-20
              "
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
              />
            </div>

            {/* TEXT SECTION */}
            <div className="p-4 flex flex-col transition-opacity duration-300 absolute bottom-4 left-4 right-4">
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {card.brand} — {card.industry}
              </p>
              <h1 className="text-lg font-semibold mt-1">{card.title}</h1>
              <p className="text-xs text-gray-400 mt-1 hidden">{card.format} • {card.channel}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll-to-top button */}
      <ScrollToTop />
    </div>
  );
}