"use client";

import { useMemo, useState, type ChangeEvent } from "react";

type ListingFormProps = {
  submitLabel?: string;
};

type ListingFormState = {
  title: string;
  description: string;
  price: string;
  mileage: string;
  year: string;
  location: string;
  imageUrl: string;
};

export function ListingForm({
  submitLabel = "Create Listing",
}: ListingFormProps) {
  const sampleImageUrl =
    "https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/654131993_10241852049694971_1869751033498488982_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s565x565_tt6&_nc_cat=104&ccb=1-7&_nc_sid=4f26a2&_nc_ohc=BtXF0_v93uIQ7kNvwFpIO7i&_nc_oc=Ado3uem4_HHsUCjd1AmZHXdUsU9YiAtaMTKTEYk2vQAOOuWw5XDn1mij-Wgj72hw-eQ&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=HMagC25t9xiKFH84RVye3A&_nc_ss=7a30f&oh=00_Afz79uAKktrhDRyEty6Yrdm02qwblotwSxi7Ma7o4JSRRA&oe=69C3116B";

  const [formState, setFormState] = useState<ListingFormState>({
    title: "",
    description: "",
    price: "",
    mileage: "",
    year: "",
    location: "",
    imageUrl: "",
  });

  const titlePreview = formState.title.trim() || "Your listing title";
  const locationPreview = formState.location.trim() || "Add a location";
  const descriptionPreview =
    formState.description.trim() || "Your listing description appears here.";
  const pricePreview = useMemo(() => {
    if (!formState.price.trim()) return "£0";
    return `£${formState.price.trim()}`;
  }, [formState.price]);

  const onFieldChange =
    (field: keyof ListingFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <form className="space-y-6">
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Basic Information
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-slate-700"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formState.title}
                onChange={onFieldChange("title")}
                placeholder="e.g. 2012 Ford Fiesta"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formState.description}
                onChange={onFieldChange("description")}
                placeholder="Write details about condition, MOT, service history..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Vehicle Details
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-slate-700"
              >
                Price (£)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={formState.price}
                onChange={onFieldChange("price")}
                placeholder="2500"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="mileage"
                className="block text-sm font-semibold text-slate-700"
              >
                Mileage
              </label>
              <input
                id="mileage"
                name="mileage"
                type="number"
                value={formState.mileage}
                onChange={onFieldChange("mileage")}
                placeholder="85000"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="year"
                className="block text-sm font-semibold text-slate-700"
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                value={formState.year}
                onChange={onFieldChange("year")}
                placeholder="2012"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-slate-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formState.location}
                onChange={onFieldChange("location")}
                placeholder="Manchester"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Media
          </p>
          <div className="space-y-2">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-semibold text-slate-700"
            >
              Image URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formState.imageUrl}
              onChange={onFieldChange("imageUrl")}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 sm:w-auto"
          >
            {submitLabel}
          </button>
        </div>
      </form>

      <aside className="space-y-3 md:sticky md:top-24 md:self-start">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Preview updates live as you type
        </p>
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          {formState.imageUrl.trim() ? (
            <img
              src={formState.imageUrl}
              alt={titlePreview}
              className="h-56 w-full object-cover"
            />
          ) : (
            <div className="relative h-56 w-full bg-gray-200">
              <img
                src={sampleImageUrl}
                alt="Sample listing"
                className="h-56 w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <span className="rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-gray-600">
                  Add an image URL to preview
                </span>
              </div>
            </div>
          )}

          <div className="space-y-4 p-6">
            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              Preview
            </span>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900">
                {titlePreview}
              </h3>
              <p className="text-3xl font-bold text-blue-600">{pricePreview}</p>
              <p className="text-sm text-slate-500">📍 {locationPreview}</p>
            </div>

            <p className="max-h-24 overflow-hidden text-sm leading-relaxed text-slate-600">
              {descriptionPreview}
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
