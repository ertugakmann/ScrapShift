import type { Listing } from "@/types/listing";
import Image from "next/image";
import Link from "next/link";

type ListingPreviewCardProps = {
  listing: Listing;
};

export function ListingPreviewCard({ listing }: ListingPreviewCardProps) {
  return (
    <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-3">
      <div className="flex items-center gap-3 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
        {/* Thumbnail */}
        <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="96px"
          />
          {listing.sold && (
            <span className="absolute left-1 top-1 rounded-full bg-slate-900/90 px-1.5 py-0.5 text-xs font-semibold text-white">
              Sold
            </span>
          )}
        </div>

        {/* Listing info */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <p className="line-clamp-1 text-sm font-bold text-slate-900">
            {listing.title}
          </p>
          <p className="text-base font-bold leading-none text-brand-600">
            £{listing.price.toLocaleString()}
          </p>
          <p className="text-xs font-medium text-slate-500">{listing.location}</p>
        </div>

        {/* View listing */}
        <Link
          href={`/listings/${listing.id}`}
          className="flex-shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-1"
        >
          View
        </Link>
      </div>
    </div>
  );
}
