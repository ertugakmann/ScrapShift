export default function MessagesLoading() {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex lg:w-80">
        <div className="border-b border-slate-200 px-4 py-3">
          <div className="h-5 w-24 animate-pulse rounded-lg bg-slate-200" />
        </div>
        <div className="flex-1 space-y-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3"
            >
              <div className="h-12 w-12 flex-shrink-0 animate-pulse rounded-lg bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <div className="h-16 w-16 animate-pulse rounded-full bg-slate-200" />
        <div className="space-y-2 text-center">
          <div className="mx-auto h-4 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mx-auto h-3 w-56 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
