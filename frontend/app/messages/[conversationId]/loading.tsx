export default function ConversationLoading() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-44 animate-pulse rounded bg-slate-200" />
        </div>
      </div>

      {/* Listing preview skeleton */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-4 py-3">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
          <div className="h-16 w-24 animate-pulse rounded-lg bg-slate-200" />
          <div className="flex-1 space-y-2">
            <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="h-8 w-14 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>

      {/* Messages skeleton */}
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 py-4">
        <div className="flex justify-start">
          <div className="h-10 w-48 animate-pulse rounded-xl rounded-bl-sm bg-slate-200" />
        </div>
        <div className="flex justify-end">
          <div className="h-10 w-56 animate-pulse rounded-xl rounded-br-sm bg-brand-100" />
        </div>
        <div className="flex justify-start">
          <div className="h-16 w-64 animate-pulse rounded-xl rounded-bl-sm bg-slate-200" />
        </div>
        <div className="flex justify-end">
          <div className="h-10 w-40 animate-pulse rounded-xl rounded-br-sm bg-brand-100" />
        </div>
        <div className="flex justify-start">
          <div className="h-10 w-52 animate-pulse rounded-xl rounded-bl-sm bg-slate-200" />
        </div>
      </div>

      {/* Input skeleton */}
      <div className="border-t border-slate-200 bg-white p-4">
        <div className="flex items-end gap-2">
          <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
          <div className="h-11 w-11 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
