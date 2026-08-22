import type { BookingStats } from "../../Booking/backend/booking";
import StatusDot from "./StatusDot";

interface StatTilesProps {
  stats: BookingStats | null;
  loading: boolean;
  error: string | null;
}

function StatTiles({ stats, loading, error }: StatTilesProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center bg-(--mainBGAccent) rounded-3xl w-full h-full">
        <p className="text-[#94A3B8] text-sm">Loading stats…</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex justify-center items-center bg-(--mainBGAccent) rounded-3xl w-full h-full">
        <p className="text-red-400 text-sm">{error ?? "Stats unavailable"}</p>
      </div>
    );
  }

  const upcoming = stats.byStatus.pending + stats.byStatus.confirmed;

  const tiles = [
    { label: "Total sessions", value: stats.total },
    { label: "Completed", value: stats.byStatus.completed },
    { label: "Upcoming", value: upcoming },
    { label: "Cancelled", value: stats.byStatus.cancelled },
  ];

  return (
    <div className="flex flex-col bg-(--mainBGAccent) p-6 rounded-3xl w-full h-full font-montserrat text-white">
      <h2 className="text-2xl shrink-0">Your Coaching Stats</h2>

      <div className="flex flex-wrap flex-1 justify-around items-center gap-4 py-4">
        {tiles.map((tile) => (
          <div key={tile.label} className="flex flex-col items-center gap-1">
            <span className="font-semibold text-3xl lg:text-5xl">{tile.value}</span>
            <span className="text-[#94A3B8] text-xs uppercase tracking-widest">
              {tile.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-5 pt-4 border-red-500/30 border-t shrink-0">
        <StatusDot
          colour="bg-yellow-400"
          label="Pending"
          count={stats.byStatus.pending}
        />
        <StatusDot
          colour="bg-green-400"
          label="Confirmed"
          count={stats.byStatus.confirmed}
        />
        <StatusDot
          colour="bg-blue-400"
          label="Completed"
          count={stats.byStatus.completed}
        />
        <StatusDot
          colour="bg-gray-400"
          label="Cancelled"
          count={stats.byStatus.cancelled}
        />
      </div>
    </div>
  );
}

export default StatTiles;
