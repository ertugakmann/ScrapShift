import { useEffect, useRef, useState } from "react";
import type { Message } from "@/types/conversation";

type MessageCreatedEvent = { type: "message_created"; data: Message };
type UserOnlineEvent = { type: "user_online"; user_id: number };
type UserOfflineEvent = { type: "user_offline"; user_id: number };
type TypingStartEvent = { type: "typing_start"; user_id: number };
type TypingStopEvent = { type: "typing_stop"; user_id: number };
type MessageDeliveredEvent = {
  type: "message_delivered";
  message_id: number;
  delivered_at: string;
};
type MessageReadEvent = {
  type: "message_read";
  message_id: number;
  read_at: string;
};

type WebSocketEvent =
  | MessageCreatedEvent
  | UserOnlineEvent
  | UserOfflineEvent
  | TypingStartEvent
  | TypingStopEvent
  | MessageDeliveredEvent
  | MessageReadEvent;

type Props = {
  conversationId: number;
  otherUserId: number;
  onMessageCreated: (message: Message) => void;
  onMessageDelivered: (messageId: number, deliveredAt: string) => void;
  onMessageRead: (messageId: number, readAt: string) => void;
};

export function useConversationSocket({
  conversationId,
  otherUserId,
  onMessageCreated,
  onMessageDelivered,
  onMessageRead,
}: Props) {
  const socketRef = useRef<WebSocket | null>(null);

  // Stable refs so the effect never re-runs just because a callback changed
  const onMessageCreatedRef = useRef(onMessageCreated);
  onMessageCreatedRef.current = onMessageCreated;
  const onMessageDeliveredRef = useRef(onMessageDelivered);
  onMessageDeliveredRef.current = onMessageDelivered;
  const onMessageReadRef = useRef(onMessageRead);
  onMessageReadRef.current = onMessageRead;

  const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/ws/conversations/${conversationId}`,
    );

    socketRef.current = socket;

    socket.onmessage = (event) => {
      const payload: WebSocketEvent = JSON.parse(event.data);
      console.log("[ws] received event:", payload.type);

      switch (payload.type) {
        case "message_created":
          onMessageCreatedRef.current(payload.data);
          break;
        case "user_online":
          if (payload.user_id === otherUserId) setIsOtherUserOnline(true);
          break;
        case "user_offline":
          if (payload.user_id === otherUserId) setIsOtherUserOnline(false);
          break;
        case "typing_start":
          if (payload.user_id === otherUserId) setIsOtherUserTyping(true);
          break;
        case "typing_stop":
          if (payload.user_id === otherUserId) setIsOtherUserTyping(false);
          break;
        case "message_delivered":
          onMessageDeliveredRef.current(payload.message_id, payload.delivered_at);
          break;
        case "message_read":
          onMessageReadRef.current(payload.message_id, payload.read_at);
          break;
      }
    };

    socket.onerror = (error) => {
      console.error("[ws] error", error);
    };

    socket.onclose = () => {
      setIsOtherUserTyping(false);
    };

    return () => {
      socket.close();
    };
  }, [conversationId, otherUserId]);

  function sendTypingEvent(type: "typing_start" | "typing_stop") {
    const socket = socketRef.current;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type }));
    }
  }

  return { socketRef, isOtherUserOnline, isOtherUserTyping, sendTypingEvent };
}
