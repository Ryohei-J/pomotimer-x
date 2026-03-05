"use client";

import type { StatsData } from "@/types/stats";
import { formatMinutes, getDayLabel, getLocalDateStr } from "@/lib/statsUtils";

interface Props {
  stats: StatsData;
  onOpenDetail: () => void;
}

export function StatsSummary({ stats, onOpenDetail }: Props) {
  const today = getLocalDateStr();
  const maxMinutes = Math.max(...stats.weeklyData.map((d) => d.minutes), 1);

  return (
    <div className="bg-surface rounded-2xl shadow-xl p-6 h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-text-primary">統計</h2>
        <button
          onClick={onOpenDetail}
          className="text-xs text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-lg hover:bg-surface-alt"
        >
          詳細
        </button>
      </div>

      {/* Today's stats */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">今日の集中</span>
          <span className="font-semibold text-text-primary">{formatMinutes(stats.todayMinutes)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">完了セッション</span>
          <span className="font-semibold text-text-primary">{stats.todaySessions}回</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary">連続日数</span>
          <span className="font-semibold" style={{ color: "var(--c-work)" }}>{stats.streak}日</span>
        </div>
      </div>

      {/* 7-day bar chart */}
      <div className="flex-1 flex flex-col justify-end">
        <p className="text-xs text-text-secondary mb-2">過去7日間</p>
        <div className="flex items-end gap-1" style={{ height: "72px" }}>
          {stats.weeklyData.map(({ date, minutes }) => {
            const isToday = date === today;
            const barHeightPx = minutes > 0 ? Math.max((minutes / maxMinutes) * 52, 4) : 2;

            return (
              <div
                key={date}
                className="flex-1 flex flex-col items-center justify-end gap-1"
                style={{ height: "72px" }}
              >
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${barHeightPx}px`,
                    backgroundColor: isToday ? "var(--c-work)" : "var(--c-text-secondary)",
                    opacity: isToday ? 1 : 0.45,
                  }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: isToday ? "var(--c-work)" : "var(--c-text-secondary)",
                    fontWeight: isToday ? 600 : 400,
                  }}
                >
                  {getDayLabel(date)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
