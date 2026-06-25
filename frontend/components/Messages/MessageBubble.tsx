import type { Message } from "@/types/conversation";

type MessageBubbleProps = {
  message: Message;
  isOwn: boolean;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[75%] space-y-1 ${isOwn ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
            isOwn
              ? "rounded-br-sm bg-brand-600 text-white"
              : "rounded-bl-sm bg-slate-100 text-slate-900"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.body}</p>
        </div>
        <time
          dateTime={message.created_at}
          className="px-1 text-xs text-slate-400"
        >
          {formatTime(message.created_at)}
        </time>
      </div>
    </div>
  );
}
