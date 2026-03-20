import { ListingCard } from "@/components/listing-card";
import { mockListings } from "@/lib/mock-listings";

export default function HomePage() {
  return (
    <section className="space-y-4">
      <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-brand-50 via-white to-blue-50 p-5 shadow-md sm:p-7">
        <p className="text-sm font-semibold text-brand-600">Budget-friendly marketplace</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Find quality used cars under £5000
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Browse local listings, compare options quickly, and connect with sellers in minutes.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Browse cars
          </button>
          <button
            type="button"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Sell your car
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-lg backdrop-blur sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
              <div className="space-y-2">
                <label
                  htmlFor="search"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Search
                </label>
                <input
                  id="search"
                  name="search"
                  type="text"
                  placeholder="e.g. Ford Fiesta"
                  className="w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="city"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="e.g. Leeds"
                  className="w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="maxPrice"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  Max Price
                </label>
                <input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  placeholder="5000"
                  className="w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 lg:w-auto"
            >
              Search cars
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">Latest Listings</h2>
        <p className="text-sm font-medium text-slate-500">{mockListings.length} cars available</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
