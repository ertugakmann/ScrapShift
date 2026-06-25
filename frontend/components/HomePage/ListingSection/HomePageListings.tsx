"use client";

import React from "react";
import { ListingCard } from "@/components/listing-card";
import { Listing } from "@/types/listing";

interface HomePageListingsProps {
  listings: Listing[];
}

const HomePageListings = ({ listings }: HomePageListingsProps) => {
  return (
    <div className="space-y-6 ">
      {" "}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Latest Listings
        </h2>
        <p className="text-sm font-medium text-slate-500">
          {listings.length} cars available
        </p>
      </div>
      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <p className="text-base font-semibold text-slate-700">
            No cars match your search
          </p>
          <p className="max-w-sm text-sm text-slate-500">
            Try adjusting your filters or clearing them to see all available
            listings.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing: Listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePageListings;
