import { useEffect, useRef, useState } from "react";
import type { Message } from "@/types/conversation";

type MessageCreatedEvent = {
  type: "message_created";
  data: Message;
};

type UserOnlineEvent = { type: "user_online"; user_id: number };
type UserOfflineEvent = { type: "user_offline"; user_id: number };

type WebSocketEvent = MessageCreatedEvent | UserOnlineEvent | UserOfflineEvent;

type Props = {
  conversationId: number;
  otherUserId: number;
  onMessageCreated: (message: Message) => void;
};

export function useConversationSocket({
  conversationId,
  otherUserId,
  onMessageCreated,
}: Props) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(
      `${process.env.NEXT_PUBLIC_WS_URL}/ws/conversations/${conversationId}`,
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const payload: WebSocketEvent = JSON.parse(event.data);

      switch (payload.type) {
        case "message_created":
          onMessageCreated(payload.data);
          break;
        case "user_online":
          if (payload.user_id === otherUserId) setIsOtherUserOnline(true);
          break;
        case "user_offline":
          if (payload.user_id === otherUserId) setIsOtherUserOnline(false);
          break;
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket closed", event.code);
    };

    return () => {
      socket.close();
    };
  }, [conversationId, otherUserId, onMessageCreated]);

  return { socketRef, isOtherUserOnline };
}
