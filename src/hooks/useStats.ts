"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { SessionRecord, StatsData } from "@/types/stats";

function getLocalDateStr(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function computeStreak(sessions: SessionRecord[]): number {
  const uniqueDates = new Set(sessions.map((s) => s.date));
  if (uniqueDates.size === 0) return 0;

  let streak = 0;
  const cursor = new Date();

  while (true) {
    const dateStr = getLocalDateStr(cursor);
    if (uniqueDates.has(dateStr)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export function useStats() {
  const [sessions, setSessions] = useLocalStorage<SessionRecord[]>(
    "pomotimerx:sessions",
    [],
  );

  const recordSession = useCallback(
    (durationMinutes: number) => {
      const record: SessionRecord = {
        date: getLocalDateStr(),
        durationMinutes,
        completedAt: Date.now(),
      };
      setSessions((prev) => {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 90);
        const cutoffStr = getLocalDateStr(cutoff);
        return [...prev.filter((s) => s.date >= cutoffStr), record];
      });
    },
    [setSessions],
  );

  const stats: StatsData = useMemo(() => {
    const today = getLocalDateStr();
    const todaySessions = sessions.filter((s) => s.date === today);
    const todayMinutes = todaySessions.reduce(
      (sum, s) => sum + s.durationMinutes,
      0,
    );

    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const date = getLocalDateStr(d);
      const minutes = sessions
        .filter((s) => s.date === date)
        .reduce((sum, s) => sum + s.durationMinutes, 0);
      return { date, minutes };
    });

    const thisWeekMinutes = weeklyData.reduce((s, d) => s + d.minutes, 0);
    const lastWeekMinutes = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (13 - i));
      return getLocalDateStr(d);
    }).reduce(
      (sum, date) =>
        sum +
        sessions
          .filter((s) => s.date === date)
          .reduce((s, r) => s + r.durationMinutes, 0),
      0,
    );

    return {
      todayMinutes,
      todaySessions: todaySessions.length,
      streak: computeStreak(sessions),
      weeklyData,
      totalMinutes: sessions.reduce((sum, s) => sum + s.durationMinutes, 0),
      totalSessions: sessions.length,
      thisWeekMinutes,
      lastWeekMinutes,
    };
  }, [sessions]);

  return { stats, recordSession };
}
