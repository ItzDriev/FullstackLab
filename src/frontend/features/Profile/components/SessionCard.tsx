interface Session {
  _id: string;
  serviceType: string;
  requestedTime: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  notes?: string;
}

const STATUS_STYLES: Record<Session["status"], string> = {
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500",
  confirmed: "bg-green-500/15 text-green-400 border-green-500",
  cancelled: "bg-gray-500/15 text-gray-400 border-gray-500",
  completed: "bg-blue-500/15 text-blue-400 border-blue-500",
};

interface SessionCardProps {
  session: Session;
}

function SessionCard({ session }: SessionCardProps) {
  const formatted = new Date(session.requestedTime).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="flex flex-col gap-1 bg-(--navBG) shrink-0 p-3 border border-red-500/40 rounded-xl w-[90%] text-white">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-semibold text-sm">{session.serviceType}</h3>
        <span
          className={`shrink-0 px-2 py-0.5 border rounded-full text-[10px] uppercase tracking-wide ${STATUS_STYLES[session.status]}`}
        >
          {session.status}
        </span>
      </div>
      <p className="text-[#94A3B8] text-xs">{formatted}</p>
      {session.notes && (
        <p className="text-[#94A3B8] text-xs italic line-clamp-2">
          {session.notes}
        </p>
      )}
    </div>
  );
}

export default SessionCard;
export type { Session };
