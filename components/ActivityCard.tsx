"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ActivityCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onClick: () => void;
}

export default function ActivityCard({
  title,
  description,
  icon: Icon,
  color,
  onClick,
}: ActivityCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex min-h-48 cursor-pointer flex-col items-start gap-4 rounded-2xl border-2 border-slate-600 bg-slate-800 p-8 text-left shadow-lg transition-colors hover:border-sky-400 hover:bg-slate-700"
    >
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-xl ${color}`}
      >
        <Icon className="h-9 w-9 text-white" strokeWidth={2.5} />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
        <p className="mt-2 text-xl text-slate-300">{description}</p>
      </div>
    </motion.button>
  );
}
