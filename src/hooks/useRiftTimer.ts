import { useState, useEffect, useCallback } from "react";

const RIFT_HOURS = [2, 5, 8, 11, 14, 17, 20, 23];
const RIFT_DURATION_MINUTES = 60; // Rift stays open for 60 minutes

export const useRiftTimer = () => {
  const [serverTime, setServerTime] = useState(new Date());
  const [nextRiftTime, setNextRiftTime] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState("00:00:00");
  const [isRiftOpen, setIsRiftOpen] = useState(false);

  const getLocalTime = useCallback(() => {
    return new Date();
  }, []);

  const getTimezone = useCallback(() => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }, []);

  const calculateNextRift = useCallback((currentTime: Date) => {
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentSeconds = currentTime.getSeconds();

    // Create current time in minutes for easier comparison
    const currentTimeInMinutes = currentHour * 60 + currentMinute + currentSeconds / 60;

    // Check if rift is currently open
    const openRift = RIFT_HOURS.find(
      (riftHour) => {
        const riftStartMinutes = riftHour * 60;
        const riftEndMinutes = riftStartMinutes + RIFT_DURATION_MINUTES;
        return currentTimeInMinutes >= riftStartMinutes && currentTimeInMinutes < riftEndMinutes;
      }
    );

    if (openRift !== undefined) {
      // Rift is currently open - count down to when it closes
      setIsRiftOpen(true);
      const closeTime = new Date(currentTime);
      closeTime.setHours(openRift, RIFT_DURATION_MINUTES, 0, 0);
      return closeTime;
    }

    // Rift is closed - find the next rift opening
    setIsRiftOpen(false);

    // Find next rift hour that's after current time
    const nextHour = RIFT_HOURS.find((riftHour) => {
      const riftStartMinutes = riftHour * 60;
      return riftStartMinutes > currentTimeInMinutes;
    });

    const nextRift = new Date(currentTime);
    
    if (nextHour !== undefined) {
      // Next rift is later today
      nextRift.setHours(nextHour, 0, 0, 0);
    } else {
      // No more rifts today - next rift is tomorrow at first rift hour
      nextRift.setDate(nextRift.getDate() + 1);
      nextRift.setHours(RIFT_HOURS[0], 0, 0, 0);
    }

    return nextRift;
  }, []);

  const formatCountdown = useCallback((diffMs: number) => {
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const localTime = getLocalTime();
      setServerTime(localTime);

      const next = calculateNextRift(localTime);
      setNextRiftTime(next);

      const diff = next.getTime() - localTime.getTime();
      setCountdown(formatCountdown(diff));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [getLocalTime, calculateNextRift, formatCountdown]);

  return {
    serverTime,
    nextRiftTime,
    countdown,
    isRiftOpen,
    timezone: getTimezone(),
  };
};