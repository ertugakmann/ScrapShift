import { Listing } from "@/lib/types";

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "2011 Ford Fiesta Zetec",
    price: 2495,
    location: "Manchester",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1200&q=80",
    description:
      "Reliable hatchback with clean interior, low running costs, and full service history.",
    mileage: 93400,
    year: 2011,
    sellerName: "James K.",
    sellerPhone: "07911 000123"
  },
  {
    id: "2",
    title: "2009 Vauxhall Corsa SXi",
    price: 1790,
    location: "Birmingham",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Great first car, recently serviced, MOT until next year, small scratches outside.",
    mileage: 108200,
    year: 2009,
    sellerName: "Aisha M.",
    sellerPhone: "07822 100200"
  },
  {
    id: "3",
    title: "2013 Volkswagen Polo 1.2",
    price: 3995,
    location: "Leeds",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80",
    description:
      "Well looked after Polo in excellent condition. Smooth drive and economical engine.",
    mileage: 82100,
    year: 2013,
    sellerName: "Tom R.",
    sellerPhone: "07777 450990"
  },
  {
    id: "4",
    title: "2008 Toyota Yaris T3",
    price: 1650,
    location: "Liverpool",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    description:
      "Toyota reliability at a great price. Perfect city car with cheap insurance.",
    mileage: 120500,
    year: 2008,
    sellerName: "Sarah W.",
    sellerPhone: "07555 310888"
  },
  {
    id: "5",
    title: "2012 Hyundai i20 Classic",
    price: 2895,
    location: "Nottingham",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    description:
      "Clean and practical hatchback with spacious boot and recently replaced tyres.",
    mileage: 97500,
    year: 2012,
    sellerName: "Bilal H.",
    sellerPhone: "07444 888212"
  },
  {
    id: "6",
    title: "2010 Peugeot 207 Sport",
    price: 2200,
    location: "Bristol",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Sporty look with comfortable drive, good condition for age, partial service record.",
    mileage: 104300,
    year: 2010,
    sellerName: "Emma L.",
    sellerPhone: "07321 224466",
    sold: true
  }
];

export const getListingById = (id: string) =>
  mockListings.find((listing) => listing.id === id);
