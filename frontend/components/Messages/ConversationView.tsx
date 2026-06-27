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

  const {
    messages: conversationMessages,
    sendMessage,
    isOtherUserOnline,
    isOtherUserTyping,
    sendTypingEvent,
  } = useConversation({
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

      <div className="h-5 flex-none px-5 pt-1">
        {isOtherUserTyping && (
          <span className="text-[11.5px] text-slate-400">
            {otherUser.username} is typing…
          </span>
        )}
      </div>

      <MessageList
        messages={conversationMessages}
        offers={offers}
        currentUserId={currentUserId}
      />

      <MessageInput
        onSend={(body) => {
          sendTypingEvent("typing_stop");
          sendMessage(body);
        }}
        onTypingStart={() => sendTypingEvent("typing_start")}
        onTypingStop={() => sendTypingEvent("typing_stop")}
      />
    </div>
  );
}
