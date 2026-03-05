export interface SessionRecord {
  date: string; // YYYY-MM-DD (local time)
  durationMinutes: number;
  completedAt: number; // timestamp
}

export interface DailyStats {
  date: string;
  minutes: number;
}

export interface StatsData {
  todayMinutes: number;
  todaySessions: number;
  streak: number;
  weeklyData: DailyStats[];
  totalMinutes: number;
  totalSessions: number;
  thisWeekMinutes: number;
  lastWeekMinutes: number;
}
