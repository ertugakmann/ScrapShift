import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getListingById } from "@/lib/mock-listings";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({
  params,
}: ListingDetailPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(listing.price);

  const formattedMileage = `${listing.mileage.toLocaleString()} miles`;

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to listings
      </Link>

      {/* Main layout */}
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Left: image + description */}
        <div className="space-y-4">
          {/* Image — clean, no overlays */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            {listing.sold && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rounded-full bg-slate-900/90 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-white">
                  Sold
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Description
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              {listing.description}
            </p>
          </div>

          {/* Vehicle details */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Details
            </h2>
            <dl className="mt-3 divide-y divide-slate-100">
              {[
                { label: "Year", value: listing.year.toString() },
                { label: "Mileage", value: formattedMileage },
                { label: "Location", value: listing.location },
                { label: "Seller type", value: "Private seller" },
                { label: "Listing ID", value: `#${listing.id.padStart(4, "0")}` },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3">
                  <dt className="text-sm text-slate-500">{row.label}</dt>
                  <dd className="text-sm font-semibold text-slate-900">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Right: sticky info panel */}
        <aside>
          <div className="sticky top-24 space-y-4">
            {/* Price & title */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
              <p className="text-2xl font-bold text-slate-900">{formattedPrice}</p>
              <h1 className="mt-1 text-lg font-semibold text-slate-800">{listing.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {listing.location}
              </p>

              {!listing.sold && (
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${listing.sellerPhone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call seller
                  </a>
                </div>
              )}
            </div>

            {/* Seller info */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Seller information
              </h3>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-base font-bold text-brand-700">
                  {listing.sellerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{listing.sellerName}</p>
                  <p className="text-xs text-slate-500">Private seller</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
                <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">{listing.sellerPhone}</span>
              </div>
            </div>

            {/* Make an offer */}
            {!listing.sold && (
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-900">Make an offer</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Send your best offer in GBP directly to the seller.
                </p>
                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-semibold text-slate-400">
                      £
                    </span>
                    <input
                      type="number"
                      placeholder="Your offer"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-7 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50"
                  >
                    Send offer
                  </button>
                </div>
              </div>
            )}

            {/* Manage listing */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Manage listing
              </h3>
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  Mark as sold
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Delete listing
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
