"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { SessionType, TimerStatus } from "@/types/timer";

interface SessionIndicatorProps {
  sessionType: SessionType;
  currentCycle: number;
  totalCycles: number;
  status: TimerStatus;
  isComplete: boolean;
}

export function SessionIndicator({
  sessionType,
  currentCycle,
  totalCycles,
  status,
  isComplete,
}: SessionIndicatorProps) {
  const t = useTranslations("SessionIndicator");
  const tCommon = useTranslations("Common");

  let text: string;
  if (isComplete) {
    text = t("complete");
  } else if (status === "idle") {
    text = t("ready");
  } else {
    text = t("sessionProgress", {
      label: tCommon(sessionType),
      current: currentCycle,
      total: totalCycles,
    });
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={text}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className="text-sm text-text-secondary font-medium"
      >
        {text}
      </motion.div>
    </AnimatePresence>
  );
}
