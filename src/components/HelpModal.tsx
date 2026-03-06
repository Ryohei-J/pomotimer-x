"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/Button";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "PomotimerXへようこそ",
    body: "ポモドーロタイマーと音楽を組み合わせたアプリです。集中と休憩のリズムに合わせて、BGMが自動で切り替わります。",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="5" height="18" rx="1" />
        <rect x="10" y="3" width="5" height="18" rx="1" />
        <rect x="17" y="3" width="5" height="18" rx="1" />
      </svg>
    ),
    title: "3つのデッキ",
    body: "Work・Short Break・Long Break の3つのデッキがあります。それぞれにタイマーの長さと音源を設定して、スタートすれば自動で切り替わります。",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
    title: "音源を設定する",
    body: "各デッキで「Library」か「YouTube」を選べます。Library は内蔵の環境音（Rain, Cafe など）、YouTube は URL を貼るだけで再生できます。",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "さあ、始めよう",
    body: "設定はプリセットに保存して素早く呼び出せます。集中時間は統計で確認でき、TODOリストでタスク管理もできます。",
  },
];

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [step, setStep] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && step < STEPS.length - 1) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    },
    [onClose, step],
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

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

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
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    backgroundColor: i === step ? "var(--c-accent)" : "var(--c-text-secondary)",
                    opacity: i === step ? 1 : 0.4,
                  }}
                  aria-label={`ステップ ${i + 1}`}
                />
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              {step > 0 ? (
                <Button variant="secondary" onClick={() => setStep((s) => s - 1)} className="flex-1">
                  戻る
                </Button>
              ) : (
                <Button variant="secondary" onClick={onClose} className="flex-1">
                  スキップ
                </Button>
              )}
              {isLast ? (
                <Button onClick={onClose} className="flex-1">
                  始めよう
                </Button>
              ) : (
                <Button onClick={() => setStep((s) => s + 1)} className="flex-1">
                  次へ
                </Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
