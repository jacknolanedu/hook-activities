"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";

const DEFAULT_SECONDS = 5 * 60;

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function CountdownTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isRunning) {
      clearTimer();
      return;
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, clearTimer]);

  const handleStart = () => {
    if (secondsLeft === 0) return;
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(DEFAULT_SECONDS);
  };

  const progress = (secondsLeft / DEFAULT_SECONDS) * 100;
  const isLow = secondsLeft <= 60 && secondsLeft > 0;
  const isDone = secondsLeft === 0;

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke="#334155"
            strokeWidth="6"
          />
          <motion.circle
            cx="40"
            cy="40"
            r="34"
            fill="none"
            stroke={isDone ? "#f87171" : isLow ? "#fbbf24" : "#38bdf8"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 34}
            animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - progress / 100) }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        <span
          className={`text-2xl font-bold tabular-nums ${
            isDone ? "text-red-400" : isLow ? "text-amber-400" : "text-white"
          }`}
        >
          {formatTime(secondsLeft)}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleStart}
          disabled={isRunning || secondsLeft === 0}
          className="flex min-h-14 min-w-14 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Start timer"
        >
          <Play className="h-7 w-7" fill="currentColor" />
        </button>
        <button
          type="button"
          onClick={handlePause}
          disabled={!isRunning}
          className="flex min-h-14 min-w-14 items-center justify-center rounded-xl bg-amber-600 text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Pause timer"
        >
          <Pause className="h-7 w-7" fill="currentColor" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex min-h-14 min-w-14 items-center justify-center rounded-xl bg-slate-600 text-white transition-colors hover:bg-slate-500"
          aria-label="Reset timer"
        >
          <RotateCcw className="h-7 w-7" />
        </button>
      </div>
    </div>
  );
}
