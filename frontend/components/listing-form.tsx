"use client";

import {
  useMemo,
  useState,
  useRef,
  useCallback,
  type ChangeEvent,
} from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { createListing } from "@/api/listing";

type ListingFormProps = {
  submitLabel?: string;
};

type ListingFormState = {
  title: string;
  description: string;
  price: string;
  mileage: string;
  year: string;
  location_city: string;
};

type UploadState =
  | { status: "idle" }
  | { status: "uploading"; progress: number }
  | { status: "done"; url: string; previewUrl: string }
  | { status: "error"; message: string };

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary environment variables are not set.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!response.ok) throw new Error("Image upload failed. Please try again.");

  const data = await response.json();
  return data.secure_url as string;
}

export function ListingForm({
  submitLabel = "Create Listing",
}: ListingFormProps) {
  const router = useRouter();
  const { isAuthenticated: isLoggedIn, isLoading: authLoading } = useAuth();

  const sampleImageUrl =
    "https://scontent-lhr6-2.xx.fbcdn.net/v/t39.30808-6/654131993_10241852049694971_1869751033498488982_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s565x565_tt6&_nc_cat=104&ccb=1-7&_nc_sid=4f26a2&_nc_ohc=BtXF0_v93uIQ7kNvwFpIO7i&_nc_oc=Ado3uem4_HHsUCjd1AmZHXdUsU9YiAtaMTKTEYk2vQAOOuWw5XDn1mij-Wgj72hw-eQ&_nc_zt=23&_nc_ht=scontent-lhr6-2.xx&_nc_gid=HMagC25t9xiKFH84RVye3A&_nc_ss=7a30f&oh=00_Afz79uAKktrhDRyEty6Yrdm02qwblotwSxi7Ma7o4JSRRA&oe=69C3116B";

  const [formState, setFormState] = useState<ListingFormState>({
    title: "",
    description: "",
    price: "",
    mileage: "",
    year: "",
    location_city: "",
  });

  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const titlePreview = formState.title.trim() || "Your listing title";
  const locationPreview = formState.location_city.trim() || "Add a location";
  const descriptionPreview =
    formState.description.trim() || "Your listing description appears here.";
  const pricePreview = useMemo(() => {
    if (!formState.price.trim()) return "£0";
    return `£${Number(formState.price).toLocaleString("en-GB")}`;
  }, [formState.price]);

  const onFieldChange =
    (field: keyof ListingFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setUploadState({
        status: "error",
        message: "Please select an image file.",
      });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadState({ status: "error", message: "Image must be under 10MB." });
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setUploadState({ status: "uploading", progress: 0 });

    const progressInterval = setInterval(() => {
      setUploadState((prev) =>
        prev.status === "uploading" && prev.progress < 85
          ? { status: "uploading", progress: prev.progress + 10 }
          : prev,
      );
    }, 200);

    try {
      const url = await uploadToCloudinary(file);
      clearInterval(progressInterval);
      setUploadState({ status: "done", url, previewUrl: localPreview });
    } catch (err) {
      clearInterval(progressInterval);
      URL.revokeObjectURL(localPreview);
      setUploadState({
        status: "error",
        message: err instanceof Error ? err.message : "Upload failed.",
      });
    }
  }, []);

  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    if (uploadState.status === "done")
      URL.revokeObjectURL(uploadState.previewUrl);
    setUploadState({ status: "idle" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    const { title, description, price, mileage, year, location_city } =
      formState;

    if (
      !title ||
      !description ||
      !price ||
      !mileage ||
      !year ||
      !location_city
    ) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    if (uploadState.status !== "done") {
      setSubmitError("Please upload an image.");
      return;
    }

    if (!isLoggedIn) {
      setSubmitError("You must be logged in to create a listing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const listing = await createListing({
        title,
        description,
        price: Number(price),
        mileage: Number(mileage),
        year: Number(year),
        location_city,
        image_url: uploadState.url,
        status: "active",
      });

      router.push(`/listings/${listing.id}`);
    } catch (err: any) {
      setSubmitError(err?.response?.data?.detail ?? "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewImageUrl =
    uploadState.status === "done" ? uploadState.previewUrl : null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        {/* Basic Information */}
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
                rows={5}
                value={formState.description}
                onChange={onFieldChange("description")}
                placeholder="Write details about condition, MOT, service history..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
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
                type="number"
                value={formState.year}
                onChange={onFieldChange("year")}
                placeholder="2012"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="location_city"
                className="block text-sm font-semibold text-slate-700"
              >
                Location
              </label>
              <input
                id="location_city"
                type="text"
                value={formState.location_city}
                onChange={onFieldChange("location_city")}
                placeholder="Manchester"
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="space-y-4 rounded-xl bg-white p-6 shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Media
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileInputChange}
            className="hidden"
          />

          {uploadState.status === "idle" || uploadState.status === "error" ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <svg
                  className="h-6 w-6 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700">
                  Click to upload or drag & drop
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WEBP — max 10MB
                </p>
              </div>
              {uploadState.status === "error" && (
                <p className="text-xs font-medium text-red-500">
                  {uploadState.message}
                </p>
              )}
            </div>
          ) : uploadState.status === "uploading" ? (
            <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-200" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
                  <div className="h-2 w-20 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500">
                Uploading... {uploadState.progress}%
              </p>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-xl border border-slate-200">
              <img
                src={uploadState.previewUrl}
                alt="Uploaded preview"
                className="h-48 w-full object-cover"
              />
              <div className="absolute inset-0 flex items-start justify-end p-2">
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-2">
                <svg
                  className="h-4 w-4 flex-shrink-0 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-xs font-medium text-slate-600">
                  Image uploaded successfully
                </p>
              </div>
            </div>
          )}

          {submitError && (
            <p className="text-sm font-medium text-red-500">{submitError}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              isSubmitting || authLoading || uploadState.status === "uploading"
            }
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSubmitting ? "Creating listing..." : submitLabel}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <aside className="space-y-3 md:sticky md:top-24 md:self-start">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Preview updates live as you type
        </p>
        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          {previewImageUrl ? (
            <img
              src={previewImageUrl}
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
                  Upload an image to preview
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
