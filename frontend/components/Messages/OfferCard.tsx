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
      <div
        className={`w-[250px] overflow-hidden border border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${
          isOwn
            ? "rounded-[17px] rounded-br-[6px]"
            : "rounded-[17px] rounded-bl-[6px]"
        }`}
      >
        <div className="space-y-2.5 p-[14px]">
          {/* Header: OFFER label + status badge */}
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.09em] text-slate-400">
              Offer
            </p>
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[offer.status]}`}
            >
              {STATUS_LABELS[offer.status]}
            </span>
          </div>

          {/* Price */}
          <p className="text-[25px] font-bold leading-none tracking-tight text-slate-900">
            £{offer.amount.toLocaleString()}
          </p>

          {/* Action buttons (receiver only, pending offers) */}
          {!isOwn && isPending && (
            <div className="flex gap-2 pt-0.5">
              <button
                type="button"
                onClick={onAccept}
                aria-label="Accept offer"
                className="flex-1 rounded-[10px] bg-brand-600 px-3 py-[7px] text-[13px] font-semibold text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-1"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={onDecline}
                aria-label="Decline offer"
                className="flex-1 rounded-[10px] border border-slate-200 bg-white px-3 py-[7px] text-[13px] font-semibold text-slate-500 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-1"
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
