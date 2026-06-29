"use client";

import { getMyListings } from "@/api/listing";
import MyListingsSection from "@/components/MyListings/MyListingsSection";
import api from "@/lib/axios";
import { Listing } from "@/types/listing";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const myListings = await getMyListings();
      setListings(myListings);
    };

    fetchListings();
  }, []);

  const handleMarkAsSold = async (listingId: number) => {
    try {
      await api.patch(`/listings/${listingId}/sold`);
      setListings(
        listings.map((listing) =>
          listing.id === listingId ? { ...listing, status: "sold" } : listing,
        ),
      );
    } catch (error) {
      console.error("Error marking listing as sold:", error);
    }
  };

  const handleMarkAsActive = async (listingId: number) => {
    try {
      await api.patch(`/listings/${listingId}/active`);
      setListings(
        listings.map((listing) =>
          listing.id === listingId ? { ...listing, status: "active" } : listing,
        ),
      );
    } catch (error) {
      console.error("Error marking listing as active:", error);
    }
  };

  const handleEdit = (listingId: number) => {
    router.push(`/my-listings/${listingId}/edit`);
  };

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          My Listings
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Manage your posted cars with quick actions.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-md">
        <p className="text-sm font-medium text-slate-600">
          You have{" "}
          <span className="font-semibold text-slate-900">
            {listings.length}
          </span>{" "}
          active listings
        </p>
        <p className="rounded-lg bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          Seller dashboard
        </p>
      </div>

      <MyListingsSection
        listings={listings}
        handleMarkAsSold={handleMarkAsSold}
        handleMarkAsActive={handleMarkAsActive}
        handleEdit={handleEdit}
      />
    </section>
  );
}
