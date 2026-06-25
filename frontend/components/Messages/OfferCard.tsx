import type { Offer } from "@/types/conversation";

type OfferCardProps = {
  offer: Offer;
  isOwn: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
};

const STATUS_STYLES: Record<Offer["status"], string> = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  accepted: "bg-green-50 text-green-700 border border-green-200",
  declined: "bg-red-50 text-red-700 border border-red-200",
};

const STATUS_LABELS: Record<Offer["status"], string> = {
  pending: "Pending",
  accepted: "Accepted",
  declined: "Declined",
};

export function OfferCard({ offer, isOwn, onAccept, onDecline }: OfferCardProps) {
  const isPending = offer.status === "pending";

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="w-64 overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-md">
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Offer
            </p>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[offer.status]}`}
            >
              {STATUS_LABELS[offer.status]}
            </span>
          </div>

          <p className="text-2xl font-bold leading-none text-brand-600">
            £{offer.amount.toLocaleString()}
          </p>

          {!isOwn && isPending && (
            <div className="flex gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={onAccept}
                aria-label="Accept offer"
                className="flex-1 rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-1"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={onDecline}
                aria-label="Decline offer"
                className="flex-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
              >
                Decline
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
