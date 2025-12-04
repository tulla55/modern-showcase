'use client';

import React, { createContext, useContext, useState } from 'react';

type Group = 'industry' | 'format' | 'channel';

interface FilterContextValue {
  selectedIndustries: Set<string>;
  selectedFormats: Set<string>;
  selectedChannels: Set<string>;
  toggleFilter: (group: Group, label: string) => void;
  isSelected: (group: Group, label: string) => boolean;
  clearAll: () => void;
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

export default function FilterProvider({ children }: { children: React.ReactNode }) {
  const [selectedIndustries, setSelectedIndustries] = useState<Set<string>>(new Set());
  const [selectedFormats, setSelectedFormats] = useState<Set<string>>(new Set());
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getSetFor = (group: Group) => {
    switch (group) {
      case 'industry':
        return selectedIndustries;
      case 'format':
        return selectedFormats;
      case 'channel':
        return selectedChannels;
    }
  };

  const setSetFor = (group: Group, set: Set<string>) => {
    switch (group) {
      case 'industry':
        setSelectedIndustries(new Set(set));
        break;
      case 'format':
        setSelectedFormats(new Set(set));
        break;
      case 'channel':
        setSelectedChannels(new Set(set));
        break;
    }
  };

  const toggleFilter = (group: Group, label: string) => {
    const current = new Set(getSetFor(group));

    // Special behavior for 'ALL'
    if (label === 'ALL') {
      if (current.has('ALL')) {
        // turn off ALL -> no filters (empty set)
        current.delete('ALL');
      } else {
        // set ALL -> clear others
        current.clear();
        current.add('ALL');
      }
      setSetFor(group, current);
      return;
    }

    // toggling a non-ALL option
    if (current.has('ALL')) {
      current.delete('ALL');
    }

    if (current.has(label)) {
      current.delete(label);
    } else {
      current.add(label);
    }

    setSetFor(group, current);
  };

  const isSelected = (group: Group, label: string) => {
    const set = getSetFor(group);
    return set.has(label);
  };

  const clearAll = () => {
    setSelectedIndustries(new Set());
    setSelectedFormats(new Set());
    setSelectedChannels(new Set());
    setSearchQuery('');
  };

  return (
    <FilterContext.Provider
      value={{
        selectedIndustries,
        selectedFormats,
        selectedChannels,
        toggleFilter,
        isSelected,
        clearAll,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilters must be used within FilterProvider');
  return ctx;
};