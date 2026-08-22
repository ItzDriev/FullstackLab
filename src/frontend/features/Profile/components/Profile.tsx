import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import SessionCard from "./SessionCard";
import type { Session } from "./SessionCard";
import { fetchMyBookings } from "../../Booking/backend/booking";

function Profile() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    async function loadSessions() {
      const result = await fetchMyBookings();
      if (result?.success) {
        setSessions(result.data ?? []);
      }
    }
    loadSessions();
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
      <ProfileHeader />
      <section className="flex w-full h-[60vh]">
        <div className="flex flex-col gap-5 m-5 w-[75%]">
          <div className="bg-(--mainBGAccent) rounded-3xl w-full h-full"></div>
          <div className="bg-(--mainBGAccent) rounded-3xl w-full h-full"></div>
        </div>

        {/* Upcoming Sessions */}
        <div className="flex flex-col items-center bg-(--mainBGAccent) m-5 rounded-3xl w-[25%] h-[60vh] font-montserrat text-white">
          <h1 className="mt-3 text-2xl shrink-0">Upcoming Sessions</h1>
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
        <div className="flex flex-col items-center bg-(--mainBGAccent) m-5 rounded-3xl w-[25%] h-[60vh] font-montserrat text-white">
          <h1 className="mt-3 text-2xl shrink-0">Previous Sessions</h1>
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
    </section>
  );
}

export default Profile;
