import type { Conversation } from "@/types/conversation";
import type { Listing } from "@/types/listing";
import { ConversationCard } from "./ConversationCard";

export type ConversationWithListing = Conversation & { listing: Listing };

type ConversationSidebarProps = {
  conversations: ConversationWithListing[];
  selectedConversationId?: number;
  currentUserId: number;
};

export function ConversationSidebar({
  conversations,
  selectedConversationId,
  currentUserId,
}: ConversationSidebarProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-bold text-slate-900">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
            <p className="text-sm font-medium text-slate-500">
              No conversations yet
            </p>
            <p className="text-xs text-slate-400">
              Message a seller to get started.
            </p>
          </div>
        ) : (
          <ul role="list">
            {conversations.map((conv) => (
              <li key={conv.id} role="listitem">
                <ConversationCard
                  conversation={conv}
                  listing={conv.listing}
                  isSelected={conv.id === selectedConversationId}
                  currentUserId={currentUserId}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
