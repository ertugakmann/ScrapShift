import api from "@/lib/axios";
import { Conversation, Message, Offer } from "@/types/conversation";

export type CreateConversationPayload = {
  listing_id: number;
};

export type ConversationContent = {
  conversation: Conversation;
  messages: Message[];
  offers: Offer[];
};

export async function createConversation(
  payload: CreateConversationPayload,
): Promise<Conversation> {
  const { data } = await api.post("/conversations", payload);
  return data;
}

export async function getConversations(): Promise<Conversation[]> {
  const { data } = await api.get<Conversation[]>("/conversations");
  return data;
}

export async function getConversation(
  conversationId: number,
): Promise<Conversation> {
  const { data } = await api.get<Conversation>(
    `/conversations/${conversationId}`,
  );
  return data;
}

export async function getConversationContent(
  conversationId: number,
): Promise<ConversationContent> {
  const { data } = await api.get<ConversationContent>(
    `/conversations/${conversationId}`,
  );

  return data;
}

export async function createMessage(
  conversationId: number,
  body: string,
): Promise<Message> {
  const { data } = await api.post<Message>(
    `/conversations/${conversationId}/messages`,
    { body },
  );
  return data;
}

export async function getMessages(conversationId: number): Promise<Message[]> {
  const { data } = await api.get<Message[]>(
    `/conversations/${conversationId}/messages`,
  );
  return data;
}

export async function createOffer(
  conversationId: number,
  amount: number,
): Promise<Offer> {
  const { data } = await api.post<Offer>(
    `/conversations/${conversationId}/offers`,
    {
      amount,
    },
  );
  return data;
}

export async function getOffers(conversationId: number): Promise<Offer[]> {
  const { data } = await api.get<Offer[]>(
    `/conversations/${conversationId}/offers`,
  );
  return data;
}

export async function answerOffer(
  conversationId: number,
  offerId: number,
  status: "accepted" | "declined",
): Promise<Offer> {
  const { data } = await api.patch<Offer>(
    `/conversations/${conversationId}/offers/${offerId}`,
    { status },
  );
  return data;
}

export async function getUnreadCount(): Promise<number> {
  const { data } = await api.get<{ unread_count: number }>(
    "/conversations/unread-count",
  );
  return data.unread_count;
}
