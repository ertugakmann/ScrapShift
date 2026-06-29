import { Listing } from "@/types/listing";
import { ListingCard } from "../listing-card";

type MyListingsSectionProps = {
  listings: Listing[];
  handleMarkAsSold?: (listingId: number) => void;
  handleMarkAsActive?: (listingId: number) => void;
  handleEdit?: (listingId: number) => void;
};

const MyListingsSection = ({
  listings,
  handleMarkAsSold,
  handleEdit,
  handleMarkAsActive,
}: MyListingsSectionProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.slice(0, 4).map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          showActions={true}
          handleMarkAsSold={handleMarkAsSold}
          handleMarkAsActive={handleMarkAsActive}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default MyListingsSection;
