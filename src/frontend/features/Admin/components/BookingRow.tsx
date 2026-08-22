import type { AdminBooking } from "../backend/admin";

const STATUS_STYLES: Record<AdminBooking["status"], string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500",
  confirmed: "bg-green-500/15 text-green-400 border-green-500",
  cancelled: "bg-gray-500/15 text-gray-400 border-gray-500",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500",
};

const ACTIONS: Array<{ label: string; status: AdminBooking["status"] }> = [
  { label: "Confirm", status: "confirmed" },
  { label: "Complete", status: "completed" },
  { label: "Cancel", status: "cancelled" },
];

interface BookingRowProps {
  booking: AdminBooking;
  onStatusChange: (bookingId: string, status: string) => void;
  isUpdating: boolean;
}

function BookingRow({ booking, onStatusChange, isUpdating }: BookingRowProps) {
  const formatted = new Date(booking.requestedTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex md:flex-row flex-col md:items-center gap-4 bg-(--navBG) p-4 border border-red-500/40 rounded-xl w-full text-white">
      {/* Who booked it */}
      <div className="md:w-[18%]">
        <p className="font-semibold text-sm">
          {booking.userId?.username ?? "Deleted user"}
        </p>
        <p className="text-[#94A3B8] text-xs">{booking.userId?.fullName}</p>
      </div>

      {/* What and when */}
      <div className="md:w-[27%]">
        <p className="text-sm">{booking.serviceType}</p>
        <p className="text-[#94A3B8] text-xs">{formatted}</p>
      </div>

      {/* Notes */}
      <div className="md:w-[25%]">
        {booking.notes ? (
          <p className="text-[#94A3B8] text-xs italic line-clamp-2">
            {booking.notes}
          </p>
        ) : (
          <p className="text-[#94A3B8]/50 text-xs">No notes</p>
        )}
      </div>

      {/* Current status */}
      <div className="md:w-[10%]">
        <span
          className={`inline-block px-2 py-0.5 border rounded-full text-[10px] uppercase tracking-wide ${STATUS_STYLES[booking.status]}`}
        >
          {booking.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 md:w-[20%]">
        {ACTIONS.map((action) => (
          <button
            key={action.status}
            onClick={() => onStatusChange(booking._id, action.status)}
            disabled={isUpdating || booking.status === action.status}
            className="hover:bg-red-500/20 disabled:opacity-30 px-2 py-1 border border-red-500/50 hover:border-red-500 rounded text-[10px] uppercase tracking-wide transition-colors cursor-pointer disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookingRow;
