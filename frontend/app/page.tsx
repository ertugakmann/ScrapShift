import { getListings } from "@/api/listing";
import ListingsSection from "@/components/HomePage/ListingSection/ListingSection";
import Link from "next/dist/client/link";

export default async function HomePage() {
  const listings = await getListings();
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-brand-50 via-white to-blue-50 p-5 shadow-md sm:p-7">
        <p className="text-sm font-semibold text-brand-600">
          Budget-friendly marketplace
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          ScrapShift - Your Local Car Marketplace
        </h1>

        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Browse local listings, compare options quickly, and connect with
          sellers in minutes.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-lg cursor-default bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Browse cars
          </button>

          <Link
            href="/sell"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Sell your car
          </Link>
        </div>
      </div>

      <ListingsSection initialListings={listings} />
    </section>
  );
}
