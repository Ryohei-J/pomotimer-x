"use client";

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
  return (
    <div className="flex gap-4">
      {status === "idle" && (
        <Button onClick={onStart} className="w-[110px]">
          {isComplete ? "Restart" : "Start"}
        </Button>
      )}
      {status === "running" && (
        <Button onClick={onPause} className="w-[110px]">
          Pause
        </Button>
      )}
      {status === "paused" && (
        <Button onClick={onResume} className="w-[110px]">
          Resume
        </Button>
      )}
      <Button
        onClick={onReset}
        variant="secondary"
        disabled={status === "idle" && !isComplete}
        className="w-[110px]"
      >
        Reset
      </Button>
    </div>
  );
}
