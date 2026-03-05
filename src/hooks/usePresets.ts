"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { Preset, PresetSettings } from "@/types/preset";

export function usePresets() {
  const [presets, setPresets] = useLocalStorage<Preset[]>(
    "pomotimerx:presets",
    [],
  );

  const savePreset = useCallback(
    (name: string, settings: PresetSettings) => {
      const preset: Preset = {
        id: crypto.randomUUID(),
        name: name.trim(),
        createdAt: Date.now(),
        ...settings,
      };
      setPresets((prev) => [...prev, preset]);
    },
    [setPresets],
  );

  const deletePreset = useCallback(
    (id: string) => {
      setPresets((prev) => prev.filter((p) => p.id !== id));
    },
    [setPresets],
  );

  return { presets, savePreset, deletePreset };
}
