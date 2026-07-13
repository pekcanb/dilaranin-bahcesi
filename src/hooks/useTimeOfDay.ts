import { useEffect, useState } from "react";

export type TimeOfDay = "day" | "night";

export function getTimeOfDay(date = new Date()): TimeOfDay {
  const hour = date.getHours();
  return hour >= 6 && hour < 19 ? "day" : "night";
}

export function useTimeOfDay(): TimeOfDay {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeOfDay(getTimeOfDay()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return timeOfDay;
}
