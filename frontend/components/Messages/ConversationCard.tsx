import type { Conversation } from "@/types/conversation";
import { getListing } from "@/api/listing";
import Image from "next/image";
import Link from "next/link";
import { Listing } from "@/types/listing";

type ConversationCardProps = {
  conversation: Conversation;
  listing: Listing;
  isSelected: boolean;
  currentUserId?: number;
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
    currentUserId && Number(conversation.buyer.id) === currentUserId
      ? conversation.seller
      : conversation.buyer;

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className={`flex items-center gap-3 mx-1.5 rounded-xl px-3 py-[9px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
        isSelected ? "bg-brand-50" : "hover:bg-slate-100/60"
      }`}
    >
      {/* Listing thumbnail */}
      <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-xl bg-slate-200">
        <Image
          src={listing.image_url}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="44px"
        />
      </div>

      {/* Text content — 3-line layout */}
      <div className="min-w-0 flex-1">
        {/* Row 1: listing title + timestamp */}
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[13.5px] font-semibold tracking-tight text-slate-900">
            {listing.title}
          </p>
          <time
            dateTime={conversation.last_message?.created_at}
            className="flex-shrink-0 text-[11px] text-slate-400"
          >
            {conversation.last_message
              ? formatTimestamp(conversation.last_message.created_at)
              : ""}
          </time>
        </div>

        {/* Row 2: other user's name */}
        <p className="text-[12px] text-slate-500">{otherUser.username}</p>

        {/* Row 3: preview + unread badge */}
        <div className="flex items-center justify-between gap-1">
          <p
            className={`truncate text-[12.5px] ${
              conversation.unread_count > 0
                ? "font-medium text-slate-700"
                : "text-slate-400"
            }`}
          >
            {conversation.last_message ? conversation.last_message.body : ""}
          </p>
          {conversation.unread_count > 0 && (
            <span
              aria-label={`${conversation.unread_count} unread messages`}
              className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white"
            >
              {conversation.unread_count > 9 ? "9+" : conversation.unread_count}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
