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

export async function createListing(
  payload: CreateListingPayload,
): Promise<Listing> {
  const { data } = await api.post<Listing>("/listings/", payload);
  return data;
}

export async function getListings(
  params?: GetListingsParams,
): Promise<Listing[]> {
  const { data } = await api.get<ListingApiResponse[]>("/listings/", { params });
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
    image: data.image_url,
    description: data.description,
    mileage: data.mileage,
    year: data.year,
    sellerName: data.user?.username || "",
    sellerPhone: data.user?.phone_number || "",
    sold: data.status === "sold",
  };
}

export async function getListing(id: string): Promise<Listing> {
  const { data } = await api.get<ListingApiResponse>(`/listings/${id}`);
  console.log("Fetched listing data:", data); // Debugging line
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
