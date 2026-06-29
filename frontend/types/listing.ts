export type Listing = {
  id: number;
  title: string;
  price: number;
  location: string;
  image_url: string;
  description: string;
  mileage: number;
  year: number;
  sellerName: string;
  sellerPhone: string;
  status: "active" | "sold";
};
