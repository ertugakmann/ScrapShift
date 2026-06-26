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
      <div
        className={`flex max-w-[62%] flex-col gap-0.5 ${isOwn ? "items-end" : "items-start"}`}
      >
        <div
          className={`px-3.5 py-2 text-[14.5px] leading-relaxed ${
            isOwn
              ? "rounded-[19px] rounded-br-[6px] bg-brand-600 text-white"
              : "rounded-[19px] rounded-bl-[6px] bg-slate-100 text-slate-900"
          }`}
        >
          <p className="whitespace-pre-wrap break-words">{message.body}</p>
        </div>
        <time
          dateTime={message.created_at}
          className="px-1 text-[10.5px] font-medium text-slate-400"
        >
          {formatTime(message.created_at)}
        </time>
      </div>
    </div>
  );
}
