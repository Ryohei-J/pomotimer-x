"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEP_ICONS = [
  <svg key="clock" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>,
  <svg key="decks" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="5" height="18" rx="1" />
    <rect x="10" y="3" width="5" height="18" rx="1" />
    <rect x="17" y="3" width="5" height="18" rx="1" />
  </svg>,
  <svg key="music" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>,
  <svg key="star" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const t = useTranslations("HelpModal");
  const [step, setStep] = useState(0);

  const steps = [
    { icon: STEP_ICONS[0], title: t("step1Title"), body: t("step1Body") },
    { icon: STEP_ICONS[1], title: t("step2Title"), body: t("step2Body") },
    { icon: STEP_ICONS[2], title: t("step3Title"), body: t("step3Body") },
    { icon: STEP_ICONS[3], title: t("step4Title"), body: t("step4Body") },
  ];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && step < steps.length - 1) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    },
    [onClose, step, steps.length],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Reset to first step when opened
  useEffect(() => {
    if (isOpen) setStep(0);
  }, [isOpen]);

  const isLast = step === steps.length - 1;
  const current = steps[step];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
        >
          <motion.div
            className="bg-surface rounded-2xl p-8 max-w-sm w-full border border-surface-alt flex flex-col gap-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="flex justify-center" style={{ color: "var(--c-accent)" }}>
              {current.icon}
            </div>

            {/* Text */}
            <div className="text-center h-28">
              <h3
                id="help-modal-title"
                className="text-lg font-semibold mb-2"
              >
                {current.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {current.body}
              </p>
            </div>

            {/* Dot progress */}
            <div className="flex justify-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === step ? "var(--c-accent)" : "var(--c-text-secondary)",
                    opacity: i === step ? 1 : 0.4,
                  }}
                  aria-label={t("stepAriaLabel", { number: i + 1 })}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 0 ? (
                <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
                  {t("back")}
                </Button>
              ) : (
                <Button variant="secondary" onClick={onClose} className="flex-1">
                  {t("skip")}
                </Button>
              )}
              {isLast ? (
                <Button onClick={onClose} className="flex-1">
                  {t("getStarted")}
                </Button>
              ) : (
                <Button onClick={() => setStep((s) => s + 1)} className="flex-1">
                  {t("next")}
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
