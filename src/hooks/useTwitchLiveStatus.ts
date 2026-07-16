import { useEffect, useState } from "react";

const TWITCH_CHANNEL = "drievtv";
const POLL_INTERVAL_MS = 60_000;

function useTwitchLiveStatus() {
  const [isLive, setIsLive] = useState(false);

  //Runs once when mounted cus empty dependency array
  //Uses the interval to
  useEffect(() => {
    //Added this to prevent react complaining about updating the state for an unmounted component
    let cancelled = false;

    async function checkLiveStatus() {
      try {
        const res = await fetch(
          `https://decapi.me/twitch/uptime/${TWITCH_CHANNEL}`,
        );
        const text = (await res.text()).trim().toLowerCase();
        //Response is either the time live or "drievtv is offline" so check for it including the word "offline"
        //To update isLive
        if (!cancelled) {
          setIsLive(text.length > 0 && !text.includes("offline"));
        }
      } catch {
        if (!cancelled) setIsLive(false);
      }
    }

    //Check immediately because otherwise it would take 60s to perform another check
    checkLiveStatus();

    //Checks the live status once every 60s
    const interval = setInterval(checkLiveStatus, POLL_INTERVAL_MS);

    //Runs when component unmounts
    //Stops the timer and sets cancelled to true to prevent updating state
    //on unmounted component
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return isLive;
}

export default useTwitchLiveStatus;
