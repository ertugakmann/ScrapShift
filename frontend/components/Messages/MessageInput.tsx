"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type MessageInputProps = {
  onSend: (body: string) => void;
  onTypingStart: () => void;
  onTypingStop: () => void;
  disabled?: boolean;
};

const TYPING_STOP_DELAY = 2000;

export function MessageInput({
  onSend,
  onTypingStart,
  onTypingStop,
  disabled = false,
}: MessageInputProps) {
  const [draft, setDraft] = useState("");
  const isTyping = useRef(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearStopTimer() {
    if (stopTimer.current !== null) {
      clearTimeout(stopTimer.current);
      stopTimer.current = null;
    }
  }

  function stopTyping(reason: string) {
    if (isTyping.current) {
      isTyping.current = false;
      onTypingStop();
    }
    clearStopTimer();
  }

  useEffect(() => {
    return () => {
      stopTyping("cleanup");
    };
    // stopTyping is stable — refs don't change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (value: string) => {
    setDraft(value);

    if (value.length > 0) {
      if (!isTyping.current) {
        isTyping.current = true;
        onTypingStart();
      }
      clearStopTimer();
      stopTimer.current = setTimeout(() => {
        isTyping.current = false;
        onTypingStop();
      }, TYPING_STOP_DELAY);
    } else {
      stopTyping("empty");
    }
  };

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    stopTyping("sendMessage");
    onSend(trimmed);
    setDraft("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = draft.trim().length === 0;

  return (
    <div className="flex-none border-t border-slate-100 bg-white px-5 pb-4 pt-[13px]">
      <div className="flex items-end gap-2.5">
        <textarea
          value={draft}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          aria-label="Message"
          aria-multiline="true"
          placeholder="Type a message…"
          className="max-h-36 min-h-[42px] flex-1 resize-none rounded-[21px] border border-slate-200 bg-slate-50 px-4 py-2.5 text-[14.5px] text-slate-900 placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={disabled || isEmpty}
          aria-label="Send message"
          className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white transition focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            isEmpty || disabled
              ? "cursor-not-allowed bg-slate-300"
              : "bg-brand-600 hover:bg-brand-700 focus:ring-brand-600"
          }`}
        >
          {/* Up-arrow icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-[18px] w-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
