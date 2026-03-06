"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import type { TimerStatus } from "@/types/timer";

interface ControlBarProps {
  status: TimerStatus;
  isComplete: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export function ControlBar({
  status,
  isComplete,
  onStart,
  onPause,
  onResume,
  onReset,
}: ControlBarProps) {
  const t = useTranslations("ControlBar");
  return (
    <div className="flex gap-4">
      {status === "idle" && (
        <Button onClick={onStart} className="w-[110px]">
          {isComplete ? t("restart") : t("start")}
        </Button>
      )}
      {status === "running" && (
        <Button onClick={onPause} className="w-[110px]">
          {t("pause")}
        </Button>
      )}
      {status === "paused" && (
        <Button onClick={onResume} className="w-[110px]">
          {t("resume")}
        </Button>
      )}
      <Button
        onClick={onReset}
        variant="secondary"
        disabled={status === "idle" && !isComplete}
        className="w-[110px]"
      >
        {t("reset")}
      </Button>
    </div>
  );
}
