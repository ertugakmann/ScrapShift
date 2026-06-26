"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getConversation, getConversationContent } from "@/api/conversations";
import { ConversationView } from "@/components/Messages/ConversationView";
import { useAuth } from "@/hooks/useAuth";

import type { Conversation, Message, Offer } from "@/types/conversation";

export default function ConversationPage() {
  const { conversationId } = useParams();
  const { user } = useAuth();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchConversation = async () => {
      const data = await getConversationContent(Number(conversationId));

      setConversation(data.conversation);
      setMessages(data.messages);
      setOffers(data.offers);
    };

    fetchConversation();
  }, [conversationId]);

  if (!conversation) {
    return null;
  }

  return (
    <ConversationView
      conversation={conversation}
      messages={messages}
      offers={offers}
      listing={conversation.listing}
      currentUserId={user?.id}
    />
  );
}
