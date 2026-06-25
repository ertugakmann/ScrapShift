import type { Message, Offer } from "@/types/conversation";
import { MessageBubble } from "./MessageBubble";
import { OfferCard } from "./OfferCard";

type MessageListProps = {
  messages: Message[];
  offers: Offer[];
  currentUserId: number;
};

type TimelineItem =
  | { kind: "message"; item: Message; key: string }
  | { kind: "offer"; item: Offer; key: string };

function buildTimeline(messages: Message[], offers: Offer[]): TimelineItem[] {
  const messageItems: TimelineItem[] = messages.map((m) => ({
    kind: "message",
    item: m,
    key: `msg-${m.id}`,
  }));
  const offerItems: TimelineItem[] = offers.map((o) => ({
    kind: "offer",
    item: o,
    key: `offer-${o.id}`,
  }));

  return [...messageItems, ...offerItems].sort(
    (a, b) =>
      new Date(a.item.created_at).getTime() -
      new Date(b.item.created_at).getTime(),
  );
}

export function MessageList({ messages, offers, currentUserId }: MessageListProps) {
  const timeline = buildTimeline(messages, offers);

  if (timeline.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-slate-400">
          No messages yet. Start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
      {timeline.map((entry) => {
        if (entry.kind === "message") {
          const msg = entry.item as Message;
          return (
            <MessageBubble
              key={entry.key}
              message={msg}
              isOwn={msg.sender_id === currentUserId}
            />
          );
        }

        const offer = entry.item as Offer;
        return (
          <OfferCard
            key={entry.key}
            offer={offer}
            isOwn={offer.sender_id === currentUserId}
          />
        );
      })}
    </div>
  );
}
