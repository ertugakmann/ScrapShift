import type { Listing } from "@/types/listing";
import Image from "next/image";
import Link from "next/link";

type ListingPreviewCardProps = {
  listing: Listing;
};

export function ListingPreviewCard({ listing }: ListingPreviewCardProps) {
  return (
    <div className="flex flex-none items-center gap-3 border-b border-slate-100 bg-slate-50/50 px-5 py-[11px]">
      {/* Thumbnail */}
      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-[9px] bg-slate-100">
        <Image
          src={listing.image_url}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="44px"
        />
      </div>

      {/* Listing info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold tracking-tight text-slate-800">
          {listing.title}
        </p>
        <p className="text-[13px] font-semibold text-brand-600">
          £{listing.price.toLocaleString()}
          {listing.sold && (
            <span className="ml-1.5 font-normal text-slate-400">· Sold</span>
          )}
        </p>
      </div>

      {/* View Listing button */}
      <Link
        href={`/listings/${listing.id}`}
        className="flex-shrink-0 rounded-[10px] border border-slate-200 bg-white px-[13px] py-[7px] text-[12.5px] font-semibold text-brand-600 transition hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-1"
      >
        View Listing
      </Link>
    </div>
  );
}
