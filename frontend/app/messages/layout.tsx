"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ConversationSidebar } from "@/components/Messages/ConversationSidebar";
import { getConversations } from "@/api/conversations";
import { Conversation } from "@/types/conversation";
import { useAuth } from "@/hooks/useAuth";

export default function MessagesLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isInConversation = pathname !== "/messages";

  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const conversations = await getConversations();
        setConversations(conversations);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    fetchConversations();

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [user]);

  const selectedId = isInConversation
    ? Number(pathname.split("/messages/")[1])
    : undefined;

  return (
    <div className="-mb-6 -mt-6 flex h-[calc(100dvh-57px)] gap-3 overflow-hidden py-4 pb-6">
      {/* Left sidebar card */}
      <div
        className={`${
          isInConversation ? "hidden md:flex" : "flex"
        } w-full flex-col overflow-hidden rounded-2xl border border-slate-200 shadow-sm md:w-80 lg:w-96`}
      >
        <ConversationSidebar
          conversations={conversations}
          selectedConversationId={selectedId}
          currentUserId={user?.id}
        />
      </div>

      {/* Right conversation card */}
      <div
        className={`${
          isInConversation ? "flex" : "hidden md:flex"
        } min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm`}
      >
        {children}
      </div>
    </div>
  );
}
