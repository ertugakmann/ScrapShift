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
  const statusLabel = listing.sold ? "Sold" : "Available";
  const statusClasses = listing.sold
    ? "bg-slate-100 text-slate-700"
    : "bg-blue-50 text-blue-700";

  const keyFacts = [
    { label: "Year", value: listing.year.toString() },
    { label: "Mileage", value: formattedMileage },
  ];

  const vehicleDetails = [
    {
      label: "Condition",
      value: listing.sold ? "Previously sold" : "Ready to view",
    },
    { label: "Seller type", value: "Private seller" },
    { label: "Location", value: listing.location },
    { label: "Listing ID", value: `#${listing.id.padStart(4, "0")}` },
  ];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-8">
        <Link
          href="/"
          className="inline-flex text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          Back to listings
        </Link>

        <article className="space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="relative h-64 w-full bg-slate-100 sm:h-72">
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>

              <div className="rounded-xl bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">
                  Description
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-700">
                  {listing.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses}`}
                >
                  {statusLabel}
                </span>
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Private seller
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                  {listing.title}
                </h1>
                <p className="text-3xl font-bold text-blue-600">
                  {formattedPrice}
                </p>
                <p className="text-sm font-medium text-slate-500">
                  {listing.location}
                </p>
              </div>

              <div className="mt-6 rounded-lg bg-gray-50 p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {keyFacts.map((fact) => (
                    <div key={fact.label} className="space-y-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {fact.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Seller
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {listing.sellerName}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Contact
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {listing.sellerPhone}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <p className="text-sm leading-7 text-slate-600">
                  Built for quick scanning, this layout highlights the
                  essentials first so buyers can evaluate price, location,
                  mileage, and seller details at a glance.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-8 md:col-span-2">
              <div className="rounded-xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Vehicle details
                  </h2>
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    At a glance
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {vehicleDetails.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Contact seller
                  </h2>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
                    Seller name
                  </p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {listing.sellerName}
                  </p>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
                    Phone
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {listing.sellerPhone}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">
                    Manage listing
                  </h3>
                  <div className="mt-4 space-y-3">
                    <button
                      type="button"
                      className="w-full rounded-lg border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Mark as Sold
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900">
                    Make an offer
                  </h3>
                  <div className="mt-4 space-y-3">
                    <input
                      type="number"
                      placeholder="Enter your offer"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    <button
                      type="button"
                      className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Send Offer
                    </button>
                    <p className="text-xs leading-5 text-slate-500">
                      Enter your best offer in GBP. The seller will receive it
                      directly with the rest of your enquiry details.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
