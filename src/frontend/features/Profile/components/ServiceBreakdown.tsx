import type { BookingStats } from "../../Booking/backend/booking";

interface ServiceBreakdownProps {
  stats: BookingStats | null;
  loading: boolean;
  error: string | null;
}

function ServiceBreakdown({ stats, loading, error }: ServiceBreakdownProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center bg-(--mainBGAccent) rounded-3xl w-full h-full">
        <p className="text-[#94A3B8] text-sm">Loading breakdown…</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex justify-center items-center bg-(--mainBGAccent) rounded-3xl w-full h-full">
        <p className="text-red-400 text-sm">
          {error ?? "Breakdown unavailable"}
        </p>
      </div>
    );
  }

  // Bars are scaled against the busiest service, not the total, so the
  // longest bar always fills the track.
  const max = Math.max(...stats.byService.map((s) => s.count), 1);

  return (
    <div className="flex flex-col bg-(--mainBGAccent) p-6 rounded-3xl w-full h-full font-montserrat text-white">
      <h2 className="text-2xl shrink-0">Sessions by Service</h2>

      {stats.byService.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <p className="text-[#94A3B8] text-sm">
            Book a session and your breakdown will show up here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col justify-center gap-4 mt-4 pr-2 min-h-0 overflow-y-auto session-scroll">
          {stats.byService.map((service) => (
            <div key={service.serviceType} className="flex flex-col gap-1.5">
              <span className="text-[#94A3B8] text-xs uppercase tracking-widest">
                {service.serviceType}
              </span>
              <div className="flex items-center gap-3">
                {/* Track: one recessive step behind the fill */}
                <div className="flex-1 bg-white/5 rounded-sm h-5">
                  {/* Fill: square at the baseline, 4px rounded data-end */}
                  <div
                    className="bg-red-500 rounded-r-[4px] h-5 transition-[width] duration-500"
                    style={{ width: `${(service.count / max) * 100}%` }}
                    title={`${service.serviceType}: ${service.count}`}
                  />
                </div>
                {/* Value at the tip */}
                <span className="w-6 font-semibold tabular-nums text-sm text-right">
                  {service.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ServiceBreakdown;
