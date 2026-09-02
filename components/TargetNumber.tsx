"use client";

import { ArrowLeft, Target } from "lucide-react";

interface TargetNumberProps {
  onBack: () => void;
}

export default function TargetNumber({ onBack }: TargetNumberProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-14 items-center gap-3 rounded-xl bg-slate-700 px-6 text-xl font-semibold text-white transition-colors hover:bg-slate-600"
        >
          <ArrowLeft className="h-6 w-6" />
          Back to Activities
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-600 bg-slate-800/50 p-12">
        <Target className="mb-6 h-20 w-20 text-orange-400" />
        <h2 className="text-5xl font-bold text-white">Target Number (24 Game)</h2>
        <p className="mt-4 max-w-2xl text-center text-2xl text-slate-300">
          Use 5 numbers and basic operations to reach the target. Activity coming soon.
        </p>
      </div>
    </div>
  );
}
