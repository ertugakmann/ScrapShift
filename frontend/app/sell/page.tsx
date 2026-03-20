import { ListingForm } from "@/components/listing-form";

export default function SellPage() {
  return (
    <section className="mx-auto w-full max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Create Listing
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Add your car details and publish your ad. (Frontend UI only)
        </p>
      </div>

      <ListingForm />
    </section>
  );
}
