export type User = {
  id: string;
  email: string;
  username: string;
  phone_number: string;
  created_at: string;
};

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
