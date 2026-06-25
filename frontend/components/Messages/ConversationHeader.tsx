import type { Listing } from "@/types/listing";
import type { User } from "@/types/user";

type ConversationHeaderProps = {
  listing: Listing;
  otherUser: User;
  isOnline?: boolean;
};

export function ConversationHeader({
  listing,
  otherUser,
  isOnline = false,
}: ConversationHeaderProps) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
          aria-label={`${otherUser.username}'s avatar`}
        >
          {otherUser.username.charAt(0).toUpperCase()}
        </div>
        <span
          aria-label={isOnline ? "Online" : "Offline"}
          title={isOnline ? "Online" : "Offline"}
          className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white ${
            isOnline ? "bg-green-400" : "bg-slate-300"
          }`}
        />
      </div>

      {/* User and listing info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-900">
          {otherUser.username}
        </p>
        <p className="truncate text-xs text-slate-500">{listing.title}</p>
      </div>
    </div>
  );
}
