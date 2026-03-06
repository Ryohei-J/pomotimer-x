"use client";

import { useLocale, useTranslations } from "next-intl";
import type { StatsData } from "@/types/stats";
import { formatMinutes, getDayLabel, getLocalDateStr } from "@/lib/statsUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stats: StatsData;
  detailed?: boolean;
}

export function StatsPanel({ isOpen, onClose, stats, detailed }: Props) {
  const t = useTranslations("StatsPanel");
  const locale = useLocale();

  if (!isOpen) return null;

  const today = getLocalDateStr();
  const weeklyDiff = stats.thisWeekMinutes - stats.lastWeekMinutes;
  const maxMinutes = Math.max(...stats.weeklyData.map((d) => d.minutes), 1);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-text-primary">{t("title")}</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors p-1"
            aria-label={t("close")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        {/* Today's stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label={t("todayFocus")} value={formatMinutes(stats.todayMinutes)} />
          <StatCard label={t("completedSessions")} value={t("sessionsCount", { count: stats.todaySessions })} />
          <StatCard label={t("streak")} value={t("streakDays", { days: stats.streak })} accent />
        </div>

        {/* 7-day bar chart */}
        <div>
          <p className="text-sm text-text-secondary mb-3">{t("last7days")}</p>
          <div className="flex items-end gap-1.5" style={{ height: "96px" }}>
            {stats.weeklyData.map(({ date, minutes }) => {
              const isToday = date === today;
              const barHeightPx =
                minutes > 0 ? Math.max((minutes / maxMinutes) * 72, 4) : 2;

              return (
                <div
                  key={date}
                  className="flex-1 flex flex-col items-center justify-end gap-1"
                  style={{ height: "96px" }}
                >
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${barHeightPx}px`,
                      backgroundColor: isToday
                        ? "var(--c-work)"
                        : "var(--c-text-secondary)",
                      opacity: isToday ? 1 : 0.45,
                    }}
                  />
                  <span
                    className="text-xs"
                    style={{
                      color: isToday
                        ? "var(--c-work)"
                        : "var(--c-text-secondary)",
                      fontWeight: isToday ? 600 : 400,
                    }}
                  >
                    {getDayLabel(date, locale)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly comparison (detailed only) */}
        {detailed && (
          <div className="border-t border-divider pt-4 flex flex-col gap-2">
            <p className="text-sm text-text-secondary">{t("weeklyComparison")}</p>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{t("thisWeek")}</span>
              <span className="text-text-primary font-medium">{formatMinutes(stats.thisWeekMinutes)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{t("lastWeek")}</span>
              <span className="text-text-primary font-medium">{formatMinutes(stats.lastWeekMinutes)}</span>
            </div>
            <p
              className="text-xs"
              style={{ color: weeklyDiff >= 0 ? "var(--c-work)" : "var(--c-text-secondary)" }}
            >
              {weeklyDiff >= 0
                ? t("focusedMore", { minutes: formatMinutes(weeklyDiff) })
                : t("focusedLess", { minutes: formatMinutes(-weeklyDiff) })}
            </p>
          </div>
        )}

        {/* Totals */}
        <div className="border-t border-divider pt-4 flex flex-col gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">{t("totalFocus")}</span>
            <span className="text-text-primary font-medium">
              {formatMinutes(stats.totalMinutes)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">{t("totalSessions")}</span>
            <span className="text-text-primary font-medium">
              {t("sessionsCount", { count: stats.totalSessions })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-surface-alt rounded-xl p-3 flex flex-col gap-1">
      <span className="text-xs text-text-secondary">{label}</span>
      <span
        className="text-lg font-bold text-text-primary"
        style={accent ? { color: "var(--c-work)" } : {}}
      >
        {value}
      </span>
    </div>
  );
}
