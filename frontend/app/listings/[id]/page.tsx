import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getListingById } from "@/lib/mock-listings";

type ListingDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingDetailPage({ params }: ListingDetailPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 px-4">
      <Link
        href="/"
        className="inline-flex text-sm font-semibold text-slate-600 transition hover:text-brand-600"
      >
        ← Back to listings
      </Link>

      <article className="overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 shadow-md backdrop-blur">
        <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-100 sm:h-72">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {listing.title}
              </h1>
              <p className="mt-2 text-2xl font-bold leading-none text-blue-600 sm:text-3xl">
                £{listing.price}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <span aria-hidden>📍</span>
              <span>{listing.location}</span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-50 p-3">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Year
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {listing.year}
                </p>
              </div>
              <div className="space-y-0.5 text-right">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Mileage
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  {listing.mileage.toLocaleString()} miles
                </p>
              </div>
            </div>

            <div>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                  listing.sold
                    ? "bg-slate-100 text-slate-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                {listing.sold ? "Sold" : "Available"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 px-5 pb-5 sm:px-6 sm:pb-6 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Description
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-700">
                {listing.description}
              </p>
            </div>
          </div>

          <aside className="md:col-span-1">
            <div className="space-y-4 rounded-xl bg-white p-4 shadow-md">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Contact Seller
                </h2>
                <p className="mt-2 text-lg font-semibold text-slate-900">
                  {listing.sellerName}
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {listing.sellerPhone}
                </p>
              </div>

              <button
                type="button"
                className="w-full rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
              <button
                type="button"
                className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Mark as Sold
              </button>

              <div className="space-y-2 rounded-lg border border-slate-200 bg-white p-3">
                <h3 className="text-sm font-semibold text-slate-900">
                  Make an Offer
                </h3>
                <input
                  type="number"
                  placeholder="Enter your offer (£)"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
                <button
                  type="button"
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Send Offer
                </button>
                <p className="text-xs text-slate-500">
                  Offers are sent directly to the seller
                </p>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </section>
  );
}
