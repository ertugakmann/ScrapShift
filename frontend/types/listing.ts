export type Listing = {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  description: string;
  mileage: number;
  year: number;
  sellerName: string;
  sellerPhone: string;
  sold?: boolean;
};
