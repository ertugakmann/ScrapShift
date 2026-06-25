"use client";

import HomePageSearch from "./HomePageSearch";
import HomePageListings from "./HomePageListings";
import { getListings } from "@/api/listing";
import { useState } from "react";
import { Listing } from "@/types/listing";

export interface filters {
  search: string;
  city: string;
  max_price: string;
}

export default function ListingsSection({
  initialListings,
}: {
  initialListings: Listing[];
}) {
  const [listings, setListings] = useState(initialListings);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<filters>({
    search: "",
    city: "",
    max_price: "",
  });

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    setError(null);

    if (filters.max_price && Number(filters.max_price) < 0) {
      setError("Max price can't be a negative number.");
      return;
    }

    if (filters.city.trim() && /\d/.test(filters.city)) {
      setError("City can't contain numbers.");
      return;
    }

    try {
      const data = await getListings(filters);
      setListings(data);
    } catch {
      setError(
        "Something went wrong while loading listings. Please try again.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <HomePageSearch
        filters={filters}
        handleChange={handleChange}
        handleSearch={handleSearch}
      />

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      <HomePageListings listings={listings} />
    </section>
  );
}
