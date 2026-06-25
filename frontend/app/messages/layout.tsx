"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  ConversationSidebar,
  type ConversationWithListing,
} from "@/components/Messages/ConversationSidebar";
import type { Listing } from "@/types/listing";

// Inline placeholder conversations — replace with API fetch when backend is ready.
const PLACEHOLDER_LISTING_A: Listing = {
  id: 1,
  title: "2008 Ford Focus 1.6 TDCi",
  price: 1800,
  location: "Manchester",
  image:
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  description: "",
  mileage: 112000,
  year: 2008,
  sellerName: "Alice",
  sellerPhone: "",
  sold: false,
};

const PLACEHOLDER_LISTING_B: Listing = {
  id: 2,
  title: "2011 Vauxhall Astra 1.4T SRi",
  price: 2950,
  location: "Leeds",
  image:
    "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab?w=400&q=80",
  description: "",
  mileage: 87000,
  year: 2011,
  sellerName: "Bob",
  sellerPhone: "",
  sold: false,
};

const PLACEHOLDER_CONVERSATIONS: ConversationWithListing[] = [
  {
    id: 1,
    listing_id: 1,
    listing: PLACEHOLDER_LISTING_A,
    buyer: {
      id: "0",
      email: "you@example.com",
      username: "you",
      phone_number: "",
      created_at: new Date().toISOString(),
    },
    seller: {
      id: "2",
      email: "alice@example.com",
      username: "alice92",
      phone_number: "",
      created_at: new Date().toISOString(),
    },
    unread_count: 3,
    last_message: {
      id: 10,
      conversation_id: 1,
      sender_id: 2,
      body: "Is the car still available?",
      is_read: false,
      created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    listing_id: 2,
    listing: PLACEHOLDER_LISTING_B,
    buyer: {
      id: "3",
      email: "bob@example.com",
      username: "bob_sells",
      phone_number: "",
      created_at: new Date().toISOString(),
    },
    seller: {
      id: "0",
      email: "you@example.com",
      username: "you",
      phone_number: "",
      created_at: new Date().toISOString(),
    },
    unread_count: 0,
    last_message: {
      id: 20,
      conversation_id: 2,
      sender_id: 0,
      body: "Sure, cash only though.",
      is_read: true,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

const CURRENT_USER_ID = 0;

export default function MessagesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isInConversation = pathname !== "/messages";

  const selectedId = isInConversation
    ? Number(pathname.split("/messages/")[1])
    : undefined;

  return (
    // Break out of root layout's max-w-7xl padding to create a full-width shell
    <div className="-mx-4 -mt-6 flex h-[calc(100dvh-57px)] overflow-hidden border-t border-slate-200/90 sm:-mx-6 lg:-mx-8">
      {/* Left sidebar */}
      <div
        className={`${
          isInConversation ? "hidden md:flex" : "flex"
        } w-full flex-col border-r border-slate-200 bg-white md:w-64 lg:w-80`}
      >
        <ConversationSidebar
          conversations={PLACEHOLDER_CONVERSATIONS}
          selectedConversationId={selectedId}
          currentUserId={CURRENT_USER_ID}
        />
      </div>

      {/* Right panel */}
      <div
        className={`${
          isInConversation ? "flex" : "hidden md:flex"
        } min-w-0 flex-1 flex-col overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
