"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Preset, PresetSettings } from "@/types/preset";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  presets: Preset[];
  currentSettings: PresetSettings;
  onSave: (name: string, settings: PresetSettings) => void;
  onApply: (preset: Preset) => void;
  onDelete: (id: string) => void;
  disabled: boolean;
}

export function PresetsPanel({
  isOpen,
  onClose,
  presets,
  currentSettings,
  onSave,
  onApply,
  onDelete,
  disabled,
}: Props) {
  const t = useTranslations("PresetsPanel");
  const [name, setName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const presetSummary = (p: Preset | PresetSettings): string => {
    const lb =
      "longBreakEnabled" in p && p.longBreakEnabled
        ? t("presetSummaryLb", { lb: p.longBreakDurationMinutes })
        : "";
    return (
      t("presetSummary", {
        work: p.workDurationMinutes,
        break: p.shortBreakDurationMinutes,
        cycles: "totalCycles" in p ? p.totalCycles : "?",
      }) + lb
    );
  };

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed, currentSettings);
    setName("");
  };

  const handleDelete = (id: string) => {
    if (confirmDeleteId === id) {
      onDelete(id);
      setConfirmDeleteId(null);
    } else {
      setConfirmDeleteId(id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md flex flex-col"
        style={{ maxHeight: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
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

        {/* Save current settings */}
        <div className="px-6 pb-4">
          <p className="text-xs text-text-secondary mb-2">{t("saveCurrentSettings")}</p>
          <p className="text-xs text-text-secondary mb-3 opacity-70">
            {presetSummary(currentSettings)}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              placeholder={t("namePlaceholder")}
              maxLength={40}
              className="flex-1 bg-surface-alt rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:ring-1"
              style={{ "--tw-ring-color": "var(--c-accent)" } as React.CSSProperties}
            />
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
              style={{
                backgroundColor: "var(--c-accent)",
                color: "#fff",
              }}
            >
              {t("save")}
            </button>
          </div>
        </div>

        <div className="border-t border-divider mx-6" />

        {/* Preset list */}
        <div className="overflow-y-auto flex-1 px-6 py-4">
          {presets.length === 0 ? (
            <p className="text-sm text-text-secondary text-center py-6">
              {t("noPresets")}
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {presets.map((preset) => (
                <li
                  key={preset.id}
                  className="bg-surface-alt rounded-xl p-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {preset.name}
                    </p>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {presetSummary(preset)}
                    </p>
                  </div>
                  <button
                    onClick={() => onApply(preset)}
                    disabled={disabled}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 shrink-0"
                    style={{
                      backgroundColor: "var(--c-accent)",
                      color: "#fff",
                    }}
                    title={disabled ? t("applyDisabledTitle") : undefined}
                  >
                    {t("apply")}
                  </button>
                  <button
                    onClick={() => handleDelete(preset.id)}
                    className="p-1.5 rounded-lg text-text-secondary transition-colors shrink-0"
                    style={
                      confirmDeleteId === preset.id
                        ? { color: "#ef4444" }
                        : undefined
                    }
                    title={
                      confirmDeleteId === preset.id
                        ? t("deleteConfirmTitle")
                        : t("deleteTitle")
                    }
                    aria-label={t("deleteAriaLabel")}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M6 2a1 1 0 00-1 1H3a1 1 0 000 2h10a1 1 0 000-2h-2a1 1 0 00-1-1H6zM4 6v7a1 1 0 001 1h6a1 1 0 001-1V6H4zm2 2a.5.5 0 011 0v4a.5.5 0 01-1 0V8zm3 0a.5.5 0 011 0v4a.5.5 0 01-1 0V8z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
