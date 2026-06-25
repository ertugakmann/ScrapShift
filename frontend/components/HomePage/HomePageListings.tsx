import React from "react";
import { ListingCard } from "../listing-card";
import { getListings } from "@/api/listing";

const HomePageListings = async () => {
  const listings = await getListings();

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default HomePageListings;
