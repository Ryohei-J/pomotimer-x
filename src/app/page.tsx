"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTimer } from "@/hooks/useTimer";
import { useYouTubeApi } from "@/hooks/useYouTubeApi";
import { useDualDeckController } from "@/hooks/useDualDeckController";
import { useAlarm } from "@/hooks/useAlarm";
import { useStats } from "@/hooks/useStats";
import { usePresets } from "@/hooks/usePresets";
import { useTodos } from "@/hooks/useTodos";
import { DeckPanel } from "@/components/DeckPanel";
import { TimerDisplay } from "@/components/TimerDisplay";
import { ControlBar } from "@/components/ControlBar";
import { CycleSettings } from "@/components/CycleSettings";
import { SessionIndicator } from "@/components/SessionIndicator";
import { ErrorModal } from "@/components/ErrorModal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AlarmToggle } from "@/components/AlarmToggle";
import { Footer } from "@/components/Footer";
import { StatsPanel } from "@/components/StatsPanel";
import { StatsSummary } from "@/components/StatsSummary";
import { PresetsPanel } from "@/components/PresetsPanel";
import { TodoList } from "@/components/TodoList";
import { HelpModal } from "@/components/HelpModal";

export default function Home() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isDetailedStats, setIsDetailedStats] = useState(false);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("pomotimerx:onboardingSeen");
      if (!seen) {
        setIsHelpOpen(true);
        localStorage.setItem("pomotimerx:onboardingSeen", "true");
      }
    } catch {
      // ignore
    }
  }, []);

  const { stats, recordSession } = useStats();
  const { presets, savePreset, deletePreset } = usePresets();
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const timer = useTimer(recordSession);
  const ytApiReady = useYouTubeApi();
  const deck = useDualDeckController(
    timer.sessionType,
    timer.status,
    timer.remainingSeconds,
    timer.isComplete,
    ytApiReady,
  );
  const alarm = useAlarm(timer.remainingSeconds, timer.status, timer.sessionType);

  const isRunning = timer.status !== "idle";

  const handleStart = useCallback(() => {
    deck.initializePlayers();
    timer.start();
  }, [deck, timer]);

  return (
    <main className="min-h-screen bg-background text-text-primary p-4 md:p-8 font-sans flex flex-col items-center">
      <div className="w-full max-w-6xl bg-surface rounded-2xl overflow-hidden shadow-xl">
        {/* Header: 3-column grid matching deck layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 p-6 pb-4 items-start">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="PomotimerX logo" width={36} height={36} />
            <h1 className="text-2xl md:text-3xl font-bold">PomotimerX</h1>
          </div>

          {/* Center: Timer + Controls */}
          <div className="flex flex-col items-center gap-2">
            <TimerDisplay
              remainingSeconds={timer.remainingSeconds}
              sessionType={timer.sessionType}
              status={timer.status}
              isComplete={timer.isComplete}
            />
            <ControlBar
              status={timer.status}
              isComplete={timer.isComplete}
              onStart={handleStart}
              onPause={timer.pause}
              onResume={timer.resume}
              onReset={timer.reset}
            />
            <SessionIndicator
              sessionType={timer.sessionType}
              currentCycle={timer.currentCycle}
              totalCycles={timer.totalCycles}
              status={timer.status}
              isComplete={timer.isComplete}
            />
          </div>

          {/* Right: Settings + Theme */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPresetsOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-alt hover:bg-surface-alt/80 transition-colors text-text-secondary hover:text-text-primary"
                aria-label="プリセットを開く"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button
                onClick={() => { setIsDetailedStats(true); setIsStatsOpen(true); }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-alt hover:bg-surface-alt/80 transition-colors text-text-secondary hover:text-text-primary"
                aria-label="統計を開く"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                  <line x1="2" y1="20" x2="22" y2="20" />
                </svg>
              </button>
              <ThemeToggle />
              <button
                onClick={() => setIsHelpOpen(true)}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-alt hover:bg-surface-alt/80 transition-colors text-text-secondary hover:text-text-primary"
                aria-label="ヘルプを開く"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </button>
            </div>
            <CycleSettings
              totalCycles={timer.totalCycles}
              onTotalCyclesChange={timer.setTotalCycles}
              longBreakEnabled={timer.longBreakEnabled}
              onLongBreakEnabledChange={timer.setLongBreakEnabled}
              disabled={isRunning}
            />
            <AlarmToggle
              enabled={alarm.alarmEnabled}
              onToggle={alarm.setAlarmEnabled}
            />
          </div>
        </div>

        {/* 3-Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-divider border-t border-divider">
          {/* Work Deck */}
          <DeckPanel
            type="work"
            durationMinutes={timer.workDurationMinutes}
            onDurationChange={timer.setWorkDuration}
            isActive={isRunning && timer.sessionType === "work"}
            disabled={isRunning}
            youtubeUrl={deck.workUrl}
            onYoutubeUrlChange={deck.setWorkUrl}
            youtubeElementId="yt-player-work"
            urlError={deck.workUrlError}
            audioSource={deck.workAudioSource}
            onAudioSourceChange={deck.setWorkAudioSource}
            libraryTrackId={deck.workLibraryTrackId}
            onLibraryTrackChange={deck.setWorkLibraryTrackId}
          />

          {/* Short Break Deck */}
          <DeckPanel
            type="shortBreak"
            durationMinutes={timer.shortBreakDurationMinutes}
            onDurationChange={timer.setShortBreakDuration}
            isActive={isRunning && timer.sessionType === "shortBreak"}
            disabled={isRunning}
            youtubeUrl={deck.shortBreakUrl}
            onYoutubeUrlChange={deck.setShortBreakUrl}
            youtubeElementId="yt-player-short-break"
            urlError={deck.shortBreakUrlError}
            audioSource={deck.shortBreakAudioSource}
            onAudioSourceChange={deck.setShortBreakAudioSource}
            libraryTrackId={deck.shortBreakLibraryTrackId}
            onLibraryTrackChange={deck.setShortBreakLibraryTrackId}
          />

          {/* Long Break Deck */}
          <DeckPanel
            type="longBreak"
            durationMinutes={timer.longBreakDurationMinutes}
            onDurationChange={timer.setLongBreakDuration}
            isActive={isRunning && timer.sessionType === "longBreak"}
            disabled={isRunning}
            youtubeUrl={deck.longBreakUrl}
            onYoutubeUrlChange={deck.setLongBreakUrl}
            youtubeElementId="yt-player-long-break"
            urlError={deck.longBreakUrlError}
            audioSource={deck.longBreakAudioSource}
            onAudioSourceChange={deck.setLongBreakAudioSource}
            libraryTrackId={deck.longBreakLibraryTrackId}
            onLibraryTrackChange={deck.setLongBreakLibraryTrackId}
          />
        </div>
      </div>

      <div className="h-4" />
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TodoList
            todos={todos}
            onAdd={addTodo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
        <div>
          <StatsSummary stats={stats} onOpenDetail={() => { setIsDetailedStats(false); setIsStatsOpen(true); }} />
        </div>
      </div>

      <div className="flex-1" />
      <Footer />

      <ErrorModal
        isOpen={!!deck.playerError}
        message={deck.playerError || ""}
        onClose={deck.clearPlayerError}
      />

      <StatsPanel
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        detailed={isDetailedStats}
      />

      <PresetsPanel
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        presets={presets}
        currentSettings={{
          workDurationMinutes: timer.workDurationMinutes,
          shortBreakDurationMinutes: timer.shortBreakDurationMinutes,
          longBreakDurationMinutes: timer.longBreakDurationMinutes,
          totalCycles: timer.totalCycles,
          longBreakEnabled: timer.longBreakEnabled,
          workUrl: deck.workUrl,
          shortBreakUrl: deck.shortBreakUrl,
          longBreakUrl: deck.longBreakUrl,
          workAudioSource: deck.workAudioSource,
          shortBreakAudioSource: deck.shortBreakAudioSource,
          longBreakAudioSource: deck.longBreakAudioSource,
          workLibraryTrackId: deck.workLibraryTrackId,
          shortBreakLibraryTrackId: deck.shortBreakLibraryTrackId,
          longBreakLibraryTrackId: deck.longBreakLibraryTrackId,
        }}
        onSave={savePreset}
        onApply={(preset) => {
          timer.setWorkDuration(preset.workDurationMinutes);
          timer.setShortBreakDuration(preset.shortBreakDurationMinutes);
          timer.setLongBreakDuration(preset.longBreakDurationMinutes);
          timer.setTotalCycles(preset.totalCycles);
          timer.setLongBreakEnabled(preset.longBreakEnabled);
          deck.setWorkUrl(preset.workUrl);
          deck.setShortBreakUrl(preset.shortBreakUrl);
          deck.setLongBreakUrl(preset.longBreakUrl);
          deck.setWorkAudioSource(preset.workAudioSource);
          deck.setShortBreakAudioSource(preset.shortBreakAudioSource);
          deck.setLongBreakAudioSource(preset.longBreakAudioSource);
          deck.setWorkLibraryTrackId(preset.workLibraryTrackId);
          deck.setShortBreakLibraryTrackId(preset.shortBreakLibraryTrackId);
          deck.setLongBreakLibraryTrackId(preset.longBreakLibraryTrackId);
          setIsPresetsOpen(false);
        }}
        onDelete={deletePreset}
        disabled={isRunning}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </main>
  );
}
