"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Heart, RefreshCw } from "lucide-react";

interface MathConnectionsProps {
  onBack: () => void;
}

type Difficulty = "easy" | "medium" | "hard" | "tricky";

interface Category {
  id: string;
  title: string;
  items: string[];
  difficulty: Difficulty;
}

interface Tile {
  id: string;
  text: string;
  categoryId: string;
}

const DIFFICULTY_BANNER: Record<Difficulty, string> = {
  easy: "bg-yellow-400 text-yellow-950",
  medium: "bg-emerald-500 text-emerald-950",
  hard: "bg-sky-500 text-sky-950",
  tricky: "bg-violet-500 text-violet-950",
};

const TILE_NEUTRAL =
  "bg-slate-700 border-slate-500 text-white hover:bg-slate-600";
const TILE_SELECTED =
  "bg-slate-500 border-sky-400 text-white ring-2 ring-sky-400";

const PUZZLES: Category[][] = [
  [
    {
      id: "primes",
      title: "Prime Numbers",
      items: ["7", "13", "19", "23"],
      difficulty: "easy",
    },
    {
      id: "half",
      title: "Equivalent to ½",
      items: ["4/8", "0.5", "50%", "6/12"],
      difficulty: "medium",
    },
    {
      id: "squares",
      title: "Perfect Squares",
      items: ["16", "36", "64", "81"],
      difficulty: "hard",
    },
    {
      id: "triangle-angles",
      title: "Angles in a Triangle",
      items: ["60-60-60", "90-45-45", "100-40-40", "120-30-30"],
      difficulty: "tricky",
    },
  ],
  [
    {
      id: "cubes",
      title: "Cube Numbers",
      items: ["1", "8", "27", "64"],
      difficulty: "easy",
    },
    {
      id: "three-quarters",
      title: "Equivalent to ¾",
      items: ["6/8", "0.75", "75%", "9/12"],
      difficulty: "medium",
    },
    {
      id: "div-by-5",
      title: "Divisible by 5",
      items: ["15", "25", "35", "45"],
      difficulty: "hard",
    },
    {
      id: "supplementary",
      title: "Angles Summing to 180°",
      items: ["90° + 90°", "60° + 120°", "45° + 135°", "100° + 80°"],
      difficulty: "tricky",
    },
  ],
];

const MAX_LIVES = 4;
const MAX_SELECTION = 4;

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildTiles(categories: Category[]): Tile[] {
  const tiles = categories.flatMap((category) =>
    category.items.map((text, index) => ({
      id: `${category.id}-${index}`,
      text,
      categoryId: category.id,
    }))
  );
  return shuffle(tiles);
}

function findCategory(categories: Category[], id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export default function MathConnections({ onBack }: MathConnectionsProps) {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>(() => buildTiles(PUZZLES[0]));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [solvedCategoryIds, setSolvedCategoryIds] = useState<string[]>([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [shake, setShake] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const categories = PUZZLES[puzzleIndex];

  const solvedCategories = useMemo(
    () =>
      solvedCategoryIds
        .map((id) => findCategory(categories, id))
        .filter((c): c is Category => c !== undefined),
    [solvedCategoryIds, categories]
  );

  const remainingTiles = useMemo(
    () =>
      tiles.filter(
        (tile) => !solvedCategoryIds.includes(tile.categoryId)
      ),
    [tiles, solvedCategoryIds]
  );

  const isWon = solvedCategoryIds.length === 4;
  const isLost = lives === 0;
  const gameOver = isWon || isLost;

  const resetPuzzle = useCallback((index: number) => {
    setPuzzleIndex(index);
    setTiles(buildTiles(PUZZLES[index]));
    setSelectedIds([]);
    setSolvedCategoryIds([]);
    setLives(MAX_LIVES);
    setShake(false);
    setFeedback(null);
  }, []);

  const toggleTile = (tileId: string) => {
    if (gameOver) return;

    setSelectedIds((prev) => {
      if (prev.includes(tileId)) {
        return prev.filter((id) => id !== tileId);
      }
      if (prev.length >= MAX_SELECTION) return prev;
      return [...prev, tileId];
    });
    setFeedback(null);
  };

  const handleSubmit = () => {
    if (selectedIds.length !== MAX_SELECTION || gameOver) return;

    const selectedTiles = tiles.filter((t) => selectedIds.includes(t.id));
    const categoryIds = new Set(selectedTiles.map((t) => t.categoryId));

    if (categoryIds.size === 1) {
      const categoryId = selectedTiles[0].categoryId;
      if (!solvedCategoryIds.includes(categoryId)) {
        setSolvedCategoryIds((prev) => [...prev, categoryId]);
        setSelectedIds([]);
        setFeedback(null);
        return;
      }
    }

    setLives((prev) => prev - 1);
    setShake(true);
    setFeedback("Not a match — try again!");
    setTimeout(() => {
      setShake(false);
      setSelectedIds([]);
    }, 600);
  };

  const togglePuzzle = () => {
    const nextIndex = puzzleIndex === 0 ? 1 : 0;
    resetPuzzle(nextIndex);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Controls row */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex min-h-14 items-center gap-3 rounded-xl bg-slate-700 px-6 text-xl font-semibold text-white transition-colors hover:bg-slate-600"
        >
          <ArrowLeft className="h-6 w-6" />
          Back to Activities
        </button>

        <div className="flex flex-wrap items-center gap-6">
          {/* Lives */}
          <div className="flex items-center gap-3" aria-label={`${lives} lives remaining`}>
            <span className="text-xl font-semibold text-slate-300">Mistakes:</span>
            <div className="flex gap-2">
              {Array.from({ length: MAX_LIVES }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-8 w-8 transition-colors ${
                    i < lives
                      ? "fill-red-500 text-red-500"
                      : "fill-slate-700 text-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={togglePuzzle}
            className="flex min-h-14 items-center gap-3 rounded-xl bg-violet-600 px-6 text-xl font-semibold text-white transition-colors hover:bg-violet-500"
          >
            <RefreshCw className="h-6 w-6" />
            New Puzzle ({puzzleIndex === 0 ? "Set 2" : "Set 1"})
          </button>
        </div>
      </div>

      <h2 className="mb-4 text-center text-4xl font-bold text-white">
        Math Connections
      </h2>
      <p className="mb-6 text-center text-xl text-slate-300">
        Select 4 related tiles, then submit. Find all 4 groups!
      </p>

      {/* Solved category banners */}
      <div className="mb-4 flex flex-col gap-3">
        <AnimatePresence>
          {solvedCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`flex w-full flex-wrap items-center justify-center gap-4 rounded-xl px-6 py-5 ${DIFFICULTY_BANNER[category.difficulty]}`}
            >
              <span className="text-2xl font-extrabold md:text-3xl">
                {category.title}
              </span>
              <span className="hidden text-2xl font-bold opacity-60 md:inline">
                —
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-black/15 px-4 py-2 text-xl font-bold md:text-2xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Game over messages */}
      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 rounded-xl bg-emerald-600 px-6 py-4 text-center text-2xl font-bold text-white"
        >
          All groups found — great work!
        </motion.div>
      )}
      {isLost && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 rounded-xl bg-red-600 px-6 py-4 text-center text-2xl font-bold text-white"
        >
          Out of mistakes — tap New Puzzle to try again!
        </motion.div>
      )}

      {/* Tile grid */}
      <motion.div
        animate={shake ? { x: [0, -12, 12, -12, 12, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {remainingTiles.map((tile) => {
            const isSelected = selectedIds.includes(tile.id);

            return (
              <motion.button
                key={tile.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                type="button"
                disabled={gameOver}
                onClick={() => toggleTile(tile.id)}
                className={`flex min-h-24 items-center justify-center rounded-xl border-2 px-3 py-4 text-xl font-bold transition-colors sm:min-h-28 sm:text-2xl ${
                  isSelected ? TILE_SELECTED : TILE_NEUTRAL
                } ${gameOver ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              >
                {tile.text}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Submit + feedback */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {feedback && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-red-400"
          >
            {feedback}
          </motion.p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            selectedIds.length !== MAX_SELECTION || gameOver
          }
          className="min-h-16 min-w-48 rounded-xl bg-sky-600 px-12 text-2xl font-bold text-white transition-colors hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit ({selectedIds.length}/{MAX_SELECTION})
        </button>
      </div>
    </div>
  );
}
