import type { AudioSource } from "./timer";

export interface Preset {
  id: string;
  name: string;
  createdAt: number;
  // Timer
  workDurationMinutes: number;
  shortBreakDurationMinutes: number;
  longBreakDurationMinutes: number;
  totalCycles: number;
  longBreakEnabled: boolean;
  // Audio
  workUrl: string;
  shortBreakUrl: string;
  longBreakUrl: string;
  workAudioSource: AudioSource;
  shortBreakAudioSource: AudioSource;
  longBreakAudioSource: AudioSource;
  workLibraryTrackId: string;
  shortBreakLibraryTrackId: string;
  longBreakLibraryTrackId: string;
}

export type PresetSettings = Omit<Preset, "id" | "name" | "createdAt">;
