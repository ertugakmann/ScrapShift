"use client";

import type { Conversation, Offer, Message } from "@/types/conversation";
import type { Listing } from "@/types/listing";

import { ConversationHeader } from "./ConversationHeader";
import { ListingPreviewCard } from "./ListingPreviewCard";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

import { useConversation } from "@/hooks/useConversation";

type ConversationViewProps = {
  conversation: Conversation;
  messages: Message[];
  offers: Offer[];
  listing: Listing;
  currentUserId?: number;
};

export function ConversationView({
  conversation,
  messages,
  offers,
  listing,
  currentUserId,
}: ConversationViewProps) {
  const otherUser =
    currentUserId && Number(conversation.buyer.id) === currentUserId
      ? conversation.seller
      : conversation.buyer;

  const { messages: conversationMessages, sendMessage, isOtherUserOnline } =
    useConversation({
      conversationId: conversation.id,
      otherUserId: Number(otherUser.id),
      initialMessages: messages,
    });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ConversationHeader
        listing={listing}
        otherUser={otherUser}
        isOnline={isOtherUserOnline}
      />

      <ListingPreviewCard listing={listing} />

      <MessageList
        messages={conversationMessages}
        offers={offers}
        currentUserId={currentUserId}
      />

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
