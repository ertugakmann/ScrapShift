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
  max_price?: number;
  city?: string;
};

export async function createListing(payload: CreateListingPayload): Promise<Listing> {
  const { data } = await api.post<Listing>("/listings/", payload);
  return data;
}

export async function getListings(params?: GetListingsParams): Promise<Listing[]> {
  const { data } = await api.get<Listing[]>("/listings/", { params });
  return data;
}

export async function getListing(id: number): Promise<Listing> {
  const { data } = await api.get<Listing>(`/listings/${id}`);
  return data;
}

export async function updateListing(id: number, payload: CreateListingPayload): Promise<Listing> {
  const { data } = await api.put<Listing>(`/listings/${id}`, payload);
  return data;
}

export async function deleteListing(id: number): Promise<void> {
  await api.delete(`/listings/${id}`);
}

export async function markListingAsSold(id: number): Promise<void> {
  await api.patch(`/listings/${id}/sold`);
}