export type Listing = {
  id: string;
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
