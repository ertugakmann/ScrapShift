import Image from "next/image";
import Link from "next/link";

import { Listing } from "@/lib/types";

type ListingCardProps = {
  listing: Listing;
  showActions?: boolean;
};

export function ListingCard({ listing, showActions = false }: ListingCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-md transition duration-200 hover:scale-[1.02] hover:shadow-xl">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
              listing.sold ? "bg-slate-900/90 text-white" : "bg-brand-600/90 text-white"
            }`}
          >
            {listing.sold ? "Sold" : "Available"}
          </span>
        </div>
        <div className="space-y-2.5 p-4">
          <h2 className="line-clamp-1 text-base font-bold text-slate-900">
            {listing.title}
          </h2>
          <p className="text-2xl font-bold leading-none text-brand-600">£{listing.price}</p>
          <p className="text-sm font-medium text-slate-500">{listing.location}</p>
        </div>
      </Link>

      {showActions ? (
        <div className="flex flex-wrap gap-2 border-t border-slate-100 bg-slate-50/50 px-4 pb-4 pt-3">
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
          <button
            type="button"
            className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Mark as Sold
          </button>
        </div>
      ) : null}
    </article>
  );
}
