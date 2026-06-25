import type { Conversation, Message, Offer } from "@/types/conversation";
import type { Listing } from "@/types/listing";
import { ConversationHeader } from "./ConversationHeader";
import { ListingPreviewCard } from "./ListingPreviewCard";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

type ConversationViewProps = {
  conversation: Conversation;
  messages: Message[];
  offers: Offer[];
  listing: Listing;
  currentUserId: number;
};

export function ConversationView({
  conversation,
  messages,
  offers,
  listing,
  currentUserId,
}: ConversationViewProps) {
  const otherUser =
    Number(conversation.buyer.id) === currentUserId
      ? conversation.seller
      : conversation.buyer;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <ConversationHeader listing={listing} otherUser={otherUser} />
      <ListingPreviewCard listing={listing} />
      <MessageList
        messages={messages}
        offers={offers}
        currentUserId={currentUserId}
      />
      <MessageInput onSend={() => {}} />
    </div>
  );
}
