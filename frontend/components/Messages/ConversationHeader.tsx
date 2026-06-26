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
    <div className="flex h-16 flex-none items-center gap-3 border-b border-slate-100 bg-white px-5">
      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0">
        <div
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600"
          aria-label={`${otherUser.username}'s avatar`}
        >
          {otherUser.username.charAt(0).toUpperCase()}
        </div>
        <span
          aria-label={isOnline ? "Online" : "Offline"}
          title={isOnline ? "Online" : "Offline"}
          className={`absolute bottom-0 right-0 h-[11px] w-[11px] rounded-full ring-2 ring-white ${
            isOnline ? "bg-green-400" : "bg-slate-300"
          }`}
        />
      </div>

      {/* User info + listing title */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <p className="truncate text-[15px] font-semibold tracking-tight text-slate-900">
            {otherUser.username}
          </p>
          <span className="flex-shrink-0 text-xs text-slate-400">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
        <p className="truncate text-[12.5px] text-slate-500">{listing.title}</p>
      </div>
    </div>
  );
}
