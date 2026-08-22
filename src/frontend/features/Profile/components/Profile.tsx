import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import SessionCard from "./SessionCard";
import StatTiles from "./StatTiles";
import ServiceBreakdown from "./ServiceBreakdown";
import type { Session } from "./SessionCard";
import type { BookingStats } from "../../Booking/backend/booking";
import { fetchMyBookings, fetchMyStats } from "../../Booking/backend/booking";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BigButton from "../../../components/BigButton";

function Profile() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadSessions() {
      const result = await fetchMyBookings();
      if (result?.success) {
        setSessions(result.data ?? []);
      }
    }
    loadSessions();
  }, []);

  useEffect(() => {
    async function loadStats() {
      const result = await fetchMyStats();
      if (result.success) {
        setStats(result.data ?? null);
      } else {
        setStatsError(result.error ?? "Failed to load stats");
      }
      setStatsLoading(false);
    }
    loadStats();
  }, []);

  const now = Date.now();
  const upcoming = sessions
    .filter((s) => new Date(s.requestedTime).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.requestedTime).getTime() -
        new Date(b.requestedTime).getTime(),
    );
  const previous = sessions
    .filter((s) => new Date(s.requestedTime).getTime() < now)
    .sort(
      (a, b) =>
        new Date(b.requestedTime).getTime() -
        new Date(a.requestedTime).getTime(),
    );

  return (
    <section className="bg-(--mainBG) relative flex flex-col items-center w-full min-h-[calc(100vh-4rem)] overflow-hidden">
      {auth.isLoggedIn ? (
        <>
          <ProfileHeader />
          <section className="flex lg:flex-row flex-col gap-5 p-5 w-full lg:h-[60vh]">
            <div className="flex flex-col lg:flex-[2] gap-5 min-w-0 min-h-0">
              <StatTiles
                stats={stats}
                loading={statsLoading}
                error={statsError}
              />
              <ServiceBreakdown
                stats={stats}
                loading={statsLoading}
                error={statsError}
              />
            </div>

            {/* Upcoming Sessions */}
            <div className="flex flex-col items-center bg-(--mainBGAccent) lg:flex-1 rounded-3xl w-full lg:w-auto min-w-0 h-[50vh] lg:h-auto font-montserrat text-white">
              <h1 className="mt-3 text-2xl text-center shrink-0">
                Upcoming Sessions
              </h1>
              <div className="flex flex-col flex-1 items-center gap-3 mt-3 p-3 w-full min-h-0 overflow-y-auto session-scroll">
                {upcoming.length === 0 ? (
                  <p className="mt-4 text-[#94A3B8] text-sm">
                    No upcoming sessions
                  </p>
                ) : (
                  upcoming.map((session) => (
                    <SessionCard key={session._id} session={session} />
                  ))
                )}
              </div>
            </div>

            {/* Previous Sessions */}
            <div className="flex flex-col items-center bg-(--mainBGAccent) lg:flex-1 rounded-3xl w-full lg:w-auto min-w-0 h-[50vh] lg:h-auto font-montserrat text-white">
              <h1 className="mt-3 text-2xl text-center shrink-0">
                Previous Sessions
              </h1>
              <div className="flex flex-col flex-1 items-center gap-3 mt-3 p-3 w-full min-h-0 overflow-y-auto session-scroll">
                {previous.length === 0 ? (
                  <p className="mt-4 text-[#94A3B8] text-sm">
                    No previous sessions
                  </p>
                ) : (
                  previous.map((session) => (
                    <SessionCard key={session._id} session={session} />
                  ))
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <h1 className="mt-10 font-montserrat text-white text-5xl text-center">
            UNABLE TO VIEW OTHERS PROFILES!
            <br /> LOGIN TO VIEW YOUR OWN PROFILE
          </h1>
          <BigButton
            text="Back To Home"
            className="mt-8 px-8! py-3! text-sm!"
            onClick={() => navigate("/")}
          />
        </>
      )}
    </section>
  );
}

export default Profile;
