import { useEffect, useState } from "react";

import { createMessage } from "@/api/conversations";
import type { Message } from "@/types/conversation";
import { useConversationSocket } from "./useConversationSocket";

type UseConversationProps = {
  conversationId: number;
  otherUserId: number;
  initialMessages: Message[];
};

export function useConversation({
  conversationId,
  otherUserId,
  initialMessages,
}: UseConversationProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const { isOtherUserOnline, isOtherUserTyping, sendTypingEvent } =
    useConversationSocket({
      conversationId,
      otherUserId,
      onMessageCreated: (message: Message) => {
        setMessages((prev) => [...prev, message]);
      },
      onMessageDelivered: (messageId: number, deliveredAt: string) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, delivered_at: deliveredAt } : m,
          ),
        );
      },
      onMessageRead: (messageId: number, readAt: string) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId ? { ...m, read_at: readAt } : m,
          ),
        );
      },
    });

  const sendMessage = async (body: string): Promise<void> => {
    await createMessage(conversationId, body);
  };

  return {
    messages,
    sendMessage,
    isOtherUserOnline,
    isOtherUserTyping,
    sendTypingEvent,
  };
}
