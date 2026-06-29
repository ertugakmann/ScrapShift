import axios from "@/lib/axios";
import api from "@/lib/axios";
import { Listing } from "@/types/listing";

export type CreateListingPayload = {
  title: string;
  description: string;
  price: number;
  mileage: number;
  year: number;
  location_city: string;
  image_url: string;
  status: "active" | "sold";
};

export type GetListingsParams = {
  search?: string;
  max_price?: string;
  city?: string;
};

export async function createListing(
  payload: CreateListingPayload,
): Promise<Listing> {
  const { data } = await api.post<Listing>("/listings/", payload);
  return data;
}

export async function getListings(
  params?: GetListingsParams,
): Promise<Listing[]> {
  // Drop empty filters so we don't send e.g. max_price="" which the API
  // can't parse into a number (returns 422).
  const cleanParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(([, value]) => value !== ""),
  );

  const { data } = await api.get<ListingApiResponse[]>("/listings/", {
    params: cleanParams,
  });
  return data.map(mapListing);
}

export async function getMyListings(): Promise<Listing[]> {
  const { data } = await axios.get<ListingApiResponse[]>(
    "/listings/my-listings",
  );
  return data.map(mapListing);
}

type ListingApiResponse = {
  id: number;
  title: string;
  description: string;
  price: number;
  mileage: number;
  year: number;
  location_city: string;
  image_url: string;
  status: string;
  user: {
    username: string;
    phone_number: string;
  };
};

function mapListing(data: ListingApiResponse): Listing {
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    location: data.location_city,
    image_url: data.image_url,
    description: data.description,
    mileage: data.mileage,
    year: data.year,
    sellerName: data.user?.username || "",
    sellerPhone: data.user?.phone_number || "",
    status: data.status as "active" | "sold",
  };
}

export async function getListing(id: string): Promise<Listing> {
  const { data } = await api.get<ListingApiResponse>(`/listings/${id}`);

  return mapListing(data);
}

export async function updateListing(
  id: number,
  payload: CreateListingPayload,
): Promise<Listing> {
  const { data } = await api.put<Listing>(`/listings/${id}`, payload);
  return data;
}

export async function deleteListing(id: number): Promise<void> {
  await api.delete(`/listings/${id}`);
}

export async function markListingAsSold(id: number): Promise<void> {
  await api.patch(`/listings/${id}/sold`);
}

export async function markListingAsActive(id: number): Promise<void> {
  await api.patch(`/listings/${id}/active`);
}
