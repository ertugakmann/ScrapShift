"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Message, Offer } from "@/types/conversation";
import { MessageBubble } from "./MessageBubble";
import { OfferCard } from "./OfferCard";

type MessageListProps = {
  messages: Message[];
  offers: Offer[];
  currentUserId?: number;
};

type ContentItem =
  | { kind: "message"; item: Message; key: string }
  | { kind: "offer"; item: Offer; key: string };

type TimelineItem =
  | ContentItem
  | { kind: "separator"; label: string; key: string };

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  if (isToday) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  if (isYesterday) return "Yesterday";
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function buildTimeline(messages: Message[], offers: Offer[]): TimelineItem[] {
  const contentItems: ContentItem[] = [
    ...messages.map(
      (m): ContentItem => ({ kind: "message", item: m, key: `msg-${m.id}` }),
    ),
    ...offers.map(
      (o): ContentItem => ({ kind: "offer", item: o, key: `offer-${o.id}` }),
    ),
  ].sort(
    (a, b) =>
      new Date(a.item.created_at).getTime() -
      new Date(b.item.created_at).getTime(),
  );

  const result: TimelineItem[] = [];
  let lastDateStr = "";

  for (const entry of contentItems) {
    const dateStr = new Date(entry.item.created_at).toDateString();
    if (dateStr !== lastDateStr) {
      result.push({
        kind: "separator",
        label: formatDateLabel(entry.item.created_at),
        key: `sep-${dateStr}`,
      });
      lastDateStr = dateStr;
    }
    result.push(entry);
  }

  return result;
}

const SCROLL_THRESHOLD = 100;

export function MessageList({
  messages,
  offers,
  currentUserId,
}: MessageListProps) {
  const timeline = useMemo(
    () => buildTimeline(messages, offers),
    [messages, offers],
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const isNearBottom = useRef(true);
  const prevCount = useRef(messages.length + offers.length);
  const [showBanner, setShowBanner] = useState(false);

  function scrollToBottom(behavior: ScrollBehavior = "smooth") {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }

  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  useEffect(() => {
    const total = messages.length + offers.length;
    if (total === prevCount.current) return;
    prevCount.current = total;

    if (isNearBottom.current) {
      scrollToBottom("smooth");
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, [messages, offers]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isNearBottom.current = distanceFromBottom <= SCROLL_THRESHOLD;
    if (isNearBottom.current) setShowBanner(false);
  }

  if (messages.length === 0 && offers.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-xs text-slate-400">
          No messages yet. Start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex flex-1 flex-col gap-2 overflow-y-auto px-5 py-5"
      >
        {timeline.map((entry) => {
          if (entry.kind === "separator") {
            return (
              <div
                key={entry.key}
                className="flex items-center justify-center py-1"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-400">
                  {entry.label}
                </span>
              </div>
            );
          }

          if (entry.kind === "message") {
            const msg = entry.item as Message;
            return (
              <MessageBubble
                key={entry.key}
                message={msg}
                isOwn={
                  currentUserId !== undefined && msg.sender_id === currentUserId
                }
              />
            );
          }

          const offer = entry.item as Offer;
          return (
            <OfferCard
              key={entry.key}
              offer={offer}
              isOwn={
                currentUserId !== undefined && offer.sender_id === currentUserId
              }
            />
          );
        })}
      </div>

      {showBanner && (
        <button
          onClick={() => {
            scrollToBottom("smooth");
            setShowBanner(false);
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-700 px-4 py-1.5 text-xs font-medium text-white shadow-lg transition-colors hover:bg-slate-600"
        >
          New messages ↓
        </button>
      )}
    </div>
  );
}
