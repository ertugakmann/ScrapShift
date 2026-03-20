import { ListingCard } from "@/components/listing-card";
import { mockListings } from "@/lib/mock-listings";

export default function MyListingsPage() {
  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          My Listings
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Manage your posted cars with quick actions. (UI only)
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-md">
        <p className="text-sm font-medium text-slate-600">
          You have <span className="font-semibold text-slate-900">4 active listings</span>
        </p>
        <p className="rounded-lg bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
          Seller dashboard
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockListings.slice(0, 4).map((listing) => (
          <ListingCard key={listing.id} listing={listing} showActions />
        ))}
      </div>
    </section>
  );
}
