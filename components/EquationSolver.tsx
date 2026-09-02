"use client";

import { ArrowLeft, Calculator } from "lucide-react";

interface EquationSolverProps {
  onBack: () => void;
}

export default function EquationSolver({ onBack }: EquationSolverProps) {
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
        <Calculator className="mb-6 h-20 w-20 text-sky-400" />
        <h2 className="text-5xl font-bold text-white">Equation Solver</h2>
        <p className="mt-4 max-w-2xl text-center text-2xl text-slate-300">
          Guess the secret equation — Nerdle style. Activity coming soon.
        </p>
      </div>
    </div>
  );
}
