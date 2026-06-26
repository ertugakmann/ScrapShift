import type { Conversation } from "@/types/conversation";
import { ConversationCard } from "./ConversationCard";

type ConversationSidebarProps = {
  conversations: Conversation[];
  selectedConversationId?: number;
  currentUserId?: number;
};

export function ConversationSidebar({
  conversations,
  selectedConversationId,
  currentUserId,
}: ConversationSidebarProps) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-slate-50/60">
      {/* Header — same 64px height as ConversationHeader */}
      <div className="flex h-16 flex-none items-center gap-3 border-b border-slate-100 px-4">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-600 text-[11px] font-bold text-white">
          S
        </div>
        <span className="text-[15.5px] font-semibold tracking-tight text-slate-900">
          Messages
        </span>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto py-1.5">
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
            {conversations.map((conv: Conversation) => (
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
