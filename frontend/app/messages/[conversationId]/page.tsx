"use client";

import { ConversationView } from "@/components/Messages/ConversationView";
import type { Conversation, Message, Offer } from "@/types/conversation";
import type { Listing } from "@/types/listing";

// Inline placeholders — replace with API fetch when backend is ready.
const PLACEHOLDER_LISTING: Listing = {
  id: 1,
  title: "2008 Ford Focus 1.6 TDCi",
  price: 1800,
  location: "Manchester",
  image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80",
  description: "Well maintained, one previous owner, full service history.",
  mileage: 112000,
  year: 2008,
  sellerName: "Alice",
  sellerPhone: "07700 900123",
  sold: false,
};

const PLACEHOLDER_CONVERSATION: Conversation = {
  id: 1,
  listing_id: 1,
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
    phone_number: "07700 900123",
    created_at: new Date().toISOString(),
  },
  unread_count: 0,
  last_message: {
    id: 3,
    conversation_id: 1,
    sender_id: 2,
    body: "Yes, it is! When would you like to come see it?",
    is_read: true,
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
};

const PLACEHOLDER_MESSAGES: Message[] = [
  {
    id: 1,
    conversation_id: 1,
    sender_id: 0,
    body: "Hi! Is this car still available?",
    is_read: true,
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    conversation_id: 1,
    sender_id: 2,
    body: "Yes, it is! When would you like to come see it?",
    is_read: true,
    created_at: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    conversation_id: 1,
    sender_id: 0,
    body: "Could we do this weekend? Saturday morning works for me.",
    is_read: true,
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    conversation_id: 1,
    sender_id: 2,
    body: "Saturday at 10am sounds great. I'm at 14 Elm Street, Manchester.",
    is_read: true,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

const PLACEHOLDER_OFFERS: Offer[] = [
  {
    id: 1,
    conversation_id: 1,
    sender_id: 0,
    amount: 1650,
    status: "pending",
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
  },
];

const CURRENT_USER_ID = 0;

export default function ConversationPage() {
  return (
    <ConversationView
      conversation={PLACEHOLDER_CONVERSATION}
      messages={PLACEHOLDER_MESSAGES}
      offers={PLACEHOLDER_OFFERS}
      listing={PLACEHOLDER_LISTING}
      currentUserId={CURRENT_USER_ID}
    />
  );
}
