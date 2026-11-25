import { useEffect, useState } from "react";

/** Wall-clock time in `timeZone`, re-rendered on the minute. */
export default function useClock(timeZone = "America/New_York") {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let interval;
    const align = setTimeout(() => {
      setNow(new Date());
      interval = setInterval(() => setNow(new Date()), 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(align);
      clearInterval(interval);
    };
  }, []);

  return now.toLocaleTimeString("en-US", { timeZone, hour: "numeric", minute: "2-digit" });
}
