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

  const { isOtherUserOnline } = useConversationSocket({
    conversationId,
    otherUserId,
    onMessageCreated: (message: Message) => {
      setMessages((prev) => [...prev, message]);
    },
  });

  const sendMessage = async (body: string): Promise<void> => {
    await createMessage(conversationId, body);
  };

  return {
    messages,
    sendMessage,
    isOtherUserOnline,
  };
}
