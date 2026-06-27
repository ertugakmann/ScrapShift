import { StringDecoder } from "string_decoder";
import { User } from "./user";
import { Listing } from "./listing";

export type Conversation = {
  id: number;
  listing: Listing;
  buyer: User;
  seller: User;
  unread_count: number;
  last_message: Message;
  created_at: string;
};

export type Message = {
  id: number;
  conversation_id: number;
  sender_id: number;
  body: string;
  is_read: boolean;
  created_at: string;
  delivered_at: string | null;
  read_at: string | null;
};

export type Offer = {
  id: number;
  conversation_id: number;
  sender_id: number;
  amount: number;
  status: "pending" | "accepted" | "declined";
  created_at: string;
  updated_at: string;
};
