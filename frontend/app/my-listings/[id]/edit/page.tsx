"use client";

import { getListing } from "@/api/listing";
import { ListingForm } from "@/components/listing-form";
import { Listing } from "@/types/listing";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);

  useEffect(() => {
    getListing(id).then(setListing);
  }, [id]);

  if (!listing) {
    return (
      <section className="mx-auto w-full max-w-6xl space-y-6">
        <p className="text-sm text-slate-500">Loading...</p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Edit Listing
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Update your listing details below.
        </p>
      </div>

      <ListingForm initialData={listing} />
    </section>
  );
}
