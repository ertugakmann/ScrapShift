import Link from "next/link";
import { getSellerListings } from "@/api/listing";
import { ListingCard } from "@/components/listing-card";

type SellerListingsPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function SellerListingsPage({
  params,
}: SellerListingsPageProps) {
  const { userId } = await params;
  const listings = await getSellerListings(userId);

  const sellerName = listings.length > 0 ? listings[0].sellerName : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to listings
      </Link>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {sellerName ? `${sellerName}'s listings` : "Seller's listings"}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Active listings posted by this seller
        </p>
      </div>

      {listings.length === 0 ? (
        <p className="text-sm text-slate-500">
          This seller has no active listings.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
