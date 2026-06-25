import type { Conversation } from "@/types/conversation";
import type { Listing } from "@/types/listing";
import Image from "next/image";
import Link from "next/link";

type ConversationCardProps = {
  conversation: Conversation;
  listing: Listing;
  isSelected: boolean;
  currentUserId: number;
};

function formatTimestamp(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return date.toLocaleDateString([], { weekday: "short" });
  return date.toLocaleDateString([], { day: "numeric", month: "short" });
}

export function ConversationCard({
  conversation,
  listing,
  isSelected,
  currentUserId,
}: ConversationCardProps) {
  const otherUser =
    Number(conversation.buyer.id) === currentUserId
      ? conversation.seller
      : conversation.buyer;

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className={`flex items-center gap-3 border-l-2 px-4 py-3 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
        isSelected
          ? "border-brand-600 bg-brand-50"
          : "border-transparent hover:bg-slate-50"
      }`}
    >
      {/* Listing thumbnail */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* Text content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-slate-900">
            {listing.title}
          </p>
          <div className="flex flex-shrink-0 flex-col items-end gap-1">
            <time
              dateTime={conversation.last_message?.created_at}
              className="text-xs text-slate-400"
            >
              {conversation.last_message
                ? formatTimestamp(conversation.last_message.created_at)
                : ""}
            </time>
            {conversation.unread_count > 0 && (
              <span
                aria-label={`${conversation.unread_count} unread messages`}
                className="inline-flex min-w-5 items-center justify-center rounded-full bg-brand-600 px-1.5 py-0.5 text-xs font-bold text-white"
              >
                {conversation.unread_count > 99 ? "99+" : conversation.unread_count}
              </span>
            )}
          </div>
        </div>

        <p className="truncate text-xs font-medium text-slate-500">
          {otherUser.username}
        </p>

        {conversation.last_message && (
          <p className="truncate text-xs text-slate-400">
            {conversation.last_message.body}
          </p>
        )}
      </div>
    </Link>
  );
}
