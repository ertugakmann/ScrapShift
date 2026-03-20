import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900">Listing not found</h1>
      <p className="mt-2 text-sm text-slate-600">
        The page you are looking for does not exist in mock data.
      </p>
      <Link
        href="/"
        className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-500"
      >
        Back to homepage
      </Link>
    </section>
  );
}
