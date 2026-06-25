"use client";

import React from "react";
import { filters } from "./ListingSection";

interface HomePageSearchProps {
  filters: filters;
  handleChange: (key: string, value: string) => void;
  handleSearch: () => void;
}

const HomePageSearch = ({
  filters,
  handleChange,
  handleSearch,
}: HomePageSearchProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="mt-6 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-2">
            <label
              htmlFor="search"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Search
            </label>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="e.g. Ford Fiesta"
              className="w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={filters.search}
              onChange={(e) => handleChange("search", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="city"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="e.g. Leeds"
              className="w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={filters.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="maxPrice"
              className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Max Price
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              placeholder="5000"
              className="w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              value={filters.max_price}
              onChange={(e) => handleChange("max_price", e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 lg:w-auto"
          onClick={handleSearch}
        >
          Search cars
        </button>
      </div>
    </form>
  );
};

export default HomePageSearch;
