"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calculator,
  Grid3x3,
  Maximize,
  Minimize,
  Target,
} from "lucide-react";
import ActivityCard from "@/components/ActivityCard";
import CountdownTimer from "@/components/CountdownTimer";

const MathConnections = dynamic(() => import("@/components/MathConnections"));
const TargetNumber = dynamic(() => import("@/components/TargetNumber"));
const EquationSolver = dynamic(() => import("@/components/EquationSolver"));

type ActivityId = "math-connections" | "target-number" | "equation-solver";

const ACTIVITIES = [
  {
    id: "math-connections" as const,
    title: "Math Connections",
    description: "Group 16 terms into 4 categories",
    icon: Grid3x3,
    color: "bg-violet-600",
  },
  {
    id: "target-number" as const,
    title: "Target Number (24 Game)",
    description: "Use 5 numbers & basic ops to reach a target",
    icon: Target,
    color: "bg-orange-600",
  },
  {
    id: "equation-solver" as const,
    title: "Equation Solver",
    description: "Guess the secret equation — Nerdle style",
    icon: Calculator,
    color: "bg-sky-600",
  },
];

export default function HookDashboard() {
  const [activeActivity, setActiveActivity] = useState<ActivityId | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  const handleBack = () => setActiveActivity(null);

  const renderActivity = () => {
    switch (activeActivity) {
      case "math-connections":
        return <MathConnections onBack={handleBack} />;
      case "target-number":
        return <TargetNumber onBack={handleBack} />;
      case "equation-solver":
        return <EquationSolver onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen flex-col bg-slate-900"
    >
      {/* Top bar — always visible */}
      <header className="sticky top-0 z-50 border-b-4 border-sky-500 bg-slate-950 px-6 py-4 shadow-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Classroom Math Warmups
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <CountdownTimer />

            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex min-h-14 items-center gap-3 rounded-xl bg-sky-600 px-6 text-xl font-semibold text-white transition-colors hover:bg-sky-500"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="h-7 w-7" />
              ) : (
                <Maximize className="h-7 w-7" />
              )}
              <span className="hidden sm:inline">
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main stage */}
      <main className="mx-auto w-full max-w-7xl flex-1 p-6">
        <AnimatePresence mode="wait">
          {activeActivity === null ? (
            <motion.div
              key="hub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
              <p className="mb-8 text-center text-2xl text-slate-300">
                Choose an activity to begin
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ACTIVITIES.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    title={activity.title}
                    description={activity.description}
                    icon={activity.icon}
                    color={activity.color}
                    onClick={() => setActiveActivity(activity.id)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={activeActivity}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="min-h-[60vh]"
            >
              {renderActivity()}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
