import { useCallback, useEffect, useState } from "react";
import BookingRow from "./BookingRow";
import { fetchAllBookings, updateBookingStatus } from "../backend/admin";
import type { AdminBooking } from "../backend/admin";

const STATUS_FILTERS = [
  "all",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

type StatusFilter = (typeof STATUS_FILTERS)[number];

// How often the dashboard silently re-fetches in the background.
const REFRESH_INTERVAL_MS = 15000;

function AdminDashboard() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  /*
    showSpinner is false for the background refreshes so the list
    doesn't flash back to a loading state every 15 seconds.
  */
  const loadBookings = useCallback(async (showSpinner: boolean) => {
    if (showSpinner) setLoading(true);
    const result = await fetchAllBookings();

    if (result.success) {
      setBookings(result.data ?? []);
      setError(null);
    } else {
      setError(result.error ?? "Failed to load bookings");
    }

    if (showSpinner) setLoading(false);
  }, []);

  // Initial load.
  useEffect(() => {
    loadBookings(true);
  }, [loadBookings]);

  // Auto-refresh. The cleanup clears the interval when the component unmounts,
  // otherwise it would keep firing (and setting state) after the page is gone.
  useEffect(() => {
    const intervalId = setInterval(() => {
      loadBookings(false);
    }, REFRESH_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [loadBookings]);

  async function handleStatusChange(bookingId: string, status: string) {
    setUpdatingId(bookingId);
    const result = await updateBookingStatus(bookingId, status);

    if (result.success) {
      // Swap the updated booking into place rather than re-fetching everything.
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? result.data! : b)),
      );
      setError(null);
    } else {
      setError(result.error ?? "Failed to update booking");
    }

    setUpdatingId(null);
  }

  const visible = bookings
    .filter((b) => statusFilter === "all" || b.status === statusFilter)
    .filter((b) =>
      search.trim() === ""
        ? true
        : (b.userId?.username ?? "")
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
    )
    .sort(
      (a, b) =>
        new Date(a.requestedTime).getTime() -
        new Date(b.requestedTime).getTime(),
    );

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <section className="relative flex flex-col items-center bg-(--mainBG) w-full min-h-[calc(100vh-4rem)] font-montserrat text-white">
      <div className="flex flex-col gap-5 mt-8 mb-10 w-[90%]">
        {/* Heading */}
        <div className="flex justify-between items-end pb-4 border-red-500 border-b">
          <div>
            <h1 className="font-bold text-4xl">Admin Dashboard</h1>
            <h2 className="font-light text-red-400">
              {bookings.length} total sessions · {pendingCount} awaiting review
            </h2>
          </div>
          <button
            onClick={() => loadBookings(true)}
            className="hover:bg-red-500/20 px-4 py-2 border border-red-500 rounded text-xs uppercase tracking-widest transition-colors cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex md:flex-row flex-col gap-4 md:items-center">
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 border rounded-full text-xs uppercase tracking-wide transition-colors cursor-pointer ${
                  statusFilter === status
                    ? "bg-red-500/20 border-red-500 text-white"
                    : "border-red-500/30 text-[#94A3B8] hover:border-red-500/60"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent px-3 py-1.5 border border-red-500/40 focus:border-red-500 rounded outline-none md:w-64 text-sm placeholder:text-gray-500"
          />
        </div>

        {/* Error banner - shown above the list so a failed refresh
            doesn't wipe out the data already on screen. */}
        {error && (
          <p className="bg-red-500/10 p-3 border border-red-500 rounded text-red-400 text-sm">
            {error}
          </p>
        )}

        {/* The list */}
        {loading ? (
          <p className="mt-10 text-[#94A3B8] text-center">Loading sessions…</p>
        ) : visible.length === 0 ? (
          <p className="mt-10 text-[#94A3B8] text-center">
            {bookings.length === 0
              ? "No sessions have been booked yet."
              : "No sessions match those filters."}
          </p>
        ) : (
          <div className="flex flex-col gap-3 pr-2 max-h-[60vh] overflow-y-auto session-scroll">
            {visible.map((booking) => (
              <BookingRow
                key={booking._id}
                booking={booking}
                onStatusChange={handleStatusChange}
                isUpdating={updatingId === booking._id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
