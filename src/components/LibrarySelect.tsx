"use client";

import { useTranslations } from "next-intl";
import { LIBRARY_TRACKS } from "@/lib/libraryTracks";

interface LibrarySelectProps {
  trackId: string;
  onTrackChange: (id: string) => void;
  disabled: boolean;
}

export function LibrarySelect({ trackId, onTrackChange, disabled }: LibrarySelectProps) {
  const t = useTranslations("LibrarySelect");
  return (
    <div>
      <label className="block text-sm text-text-secondary mb-2">{t("sound")}</label>
      <select
        value={trackId}
        onChange={(e) => onTrackChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-lg bg-surface-alt p-3 text-sm
          border border-divider focus:outline-none focus:border-accent
          disabled:opacity-50 disabled:cursor-not-allowed
          text-text-primary"
      >
        {LIBRARY_TRACKS.map((track) => (
          <option key={track.id} value={track.id}>
            {track.label}
          </option>
        ))}
      </select>
    </div>
  );
}
