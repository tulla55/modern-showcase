'use client';

import { useState } from "react";
import { ChevronUp, Factory, Layers, MonitorSmartphone, Search } from "lucide-react";
import { useFilters } from "./FilterProvider";
import { industries, formats, channels, cards as allCards } from "../data/data";

export default function Sidebar() {
  const [openIndustry, setOpenIndustry] = useState(true);
  const [openFormat, setOpenFormat] = useState(false);
  const [openChannel, setOpenChannel] = useState(false);

  const {
    selectedIndustries,
    selectedFormats,
    selectedChannels,
    toggleFilter,
    isSelected,
    clearAll,
    searchQuery,
    setSearchQuery,
  } = useFilters();

  const toggleSwitch = (label: string, group: "industry" | "format" | "channel") => {
    toggleFilter(group, label);
  };

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

  const filteredCount = filtered.length;
  const totalCount = allCards.length;

  return (
    <aside
      className="
        fixed left-4 top-1/2 -translate-y-1/2 
        z-30 transition-all duration-300 ease-out
        h-[90vh] rounded-3xl shadow-xl shadow-black/5 overflow-hidden
        border border-white/50 bg-white/20 backdrop-blur-lg
        overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300
        lg:w-80 lg:left-6
        md:w-18 md:left-4
        max-md:hidden
        before:absolute before:inset-0 before:bg-white/5 before:top-0 before:h-1/3 before:rounded-3xl before:pointer-events-none
      "
    >
      <div className="h-full p-6 text-black">
        <div className="hidden lg:flex flex-col items-start text-gray-700">
          <h3 className="font-bold text-2xl mb-6">Creative Gallery</h3>

          <div className="space-y-6 w-full">
            <div className="flex items-center justify-between text-sm">
              <p className="text-gray-600">
                {filteredCount} <span className="text-gray-400">of {totalCount} items.</span>
              </p>
              <button
                onClick={() => clearAll()}
                className="text-emerald-500 font-medium hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

             {/* SEARCH with icon */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 
                  text-sm placeholder-gray-400
                  focus:outline-none focus:border-gray-400
                "
              />
            </div>

            {/* INDUSTRIES */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                setOpenIndustry(!openIndustry);
                setOpenFormat(false);
                setOpenChannel(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-gray-600" />
                <span className="uppercase text-sm tracking-wide text-gray-700">
                  Industry
                </span>
              </div>

              <ChevronUp
                className={`w-5 h-5 text-gray-500 transition-transform ${openIndustry ? "rotate-0" : "rotate-180"
                  }`}
              />
            </div>

            {openIndustry && (
              <div className="space-y-3 pl-1">
                {industries.map((label) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <p className="uppercase tracking-wide text-gray-500">{label}</p>

                    <div
                      onClick={() => toggleSwitch(label, "industry")}
                      className={`
                        w-10 h-5 rounded-full flex items-center cursor-pointer transition-all duration-300 border
                        ${isSelected("industry", label) ? "bg-red-200 border-red-500" : "bg-gray-200 border-gray-400"}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 rounded-full shadow-md transition-all duration-300
                          ${isSelected("industry", label) ? "translate-x-5 bg-red-500" : "translate-x-0.5 bg-gray-500"}
                        `}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* FORMATS */}
            <div
              className="flex items-center justify-between cursor-pointer mt-4"
              onClick={() => {
                setOpenFormat(!openFormat);
                setOpenIndustry(false);
                setOpenChannel(false);
              }}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-600" />
                <span className="uppercase text-sm tracking-wide text-gray-700">Formats</span>
              </div>

              <ChevronUp
                className={`w-5 h-5 text-gray-500 transition-transform ${openFormat ? "rotate-0" : "rotate-180"
                  }`}
              />
            </div>

            {openFormat && (
              <div className="space-y-3 pl-1">
                {formats.map((label) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <p className="uppercase tracking-wide text-gray-500">{label}</p>

                    <div
                      onClick={() => toggleSwitch(label, "format")}
                      className={`
                        w-10 h-5 rounded-full flex items-center cursor-pointer transition-all duration-300 border
                        ${isSelected("format", label) ? "bg-red-200 border-red-500" : "bg-gray-200 border-gray-400"}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 rounded-full shadow-md transition-all duration-300
                          ${isSelected("format", label) ? "translate-x-5 bg-red-500" : "translate-x-0.5 bg-gray-500"}
                        `}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CHANNEL */}
            <div
              className="flex items-center justify-between cursor-pointer mt-4"
              onClick={() => {
                setOpenChannel(!openChannel);
                setOpenIndustry(false);
                setOpenFormat(false);
              }}
            >
              <div className="flex items-center gap-2">
                <MonitorSmartphone className="w-4 h-4 text-gray-600" />
                <span className="uppercase text-sm tracking-wide text-gray-700">Channel</span>
              </div>

              <ChevronUp
                className={`w-5 h-5 text-gray-500 transition-transform ${openChannel ? "rotate-0" : "rotate-180"
                  }`}
              />
            </div>

            {openChannel && (
              <div className="space-y-3 pl-1">
                {channels.map((label) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <p className="uppercase tracking-wide text-gray-500">{label}</p>

                    <div
                      onClick={() => toggleSwitch(label, "channel")}
                      className={`
                        w-10 h-5 rounded-full flex items-center cursor-pointer transition-all duration-300 border
                        ${isSelected("channel", label) ? "bg-red-200 border-red-500" : "bg-gray-200 border-gray-400"}
                      `}
                    >
                      <div
                        className={`
                          w-4 h-4 rounded-full shadow-md transition-all duration-300
                          ${isSelected("channel", label) ? "translate-x-5 bg-red-500" : "translate-x-0.5 bg-gray-500"}
                        `}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Collapsed View */}
        <div className="flex lg:hidden flex-col items-center justify-start h-full">
          <div className="space-y-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 bg-rose-300/80 backdrop-blur-sm rounded-2xl 
                  hover:bg-rose-200 hover:scale-115 
                  transition-all duration-300 shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}