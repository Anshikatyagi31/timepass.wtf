"use client"

import { motion } from "framer-motion"
import type { CrosswordClue } from "@/app/games/crossword/data"

interface ClueListProps {
  clues: {
    across: CrosswordClue[]
    down: CrosswordClue[]
  }
  selectedClue: CrosswordClue | null
  onClueSelect: (clue: CrosswordClue) => void
}

export function ClueList({ clues, selectedClue, onClueSelect }: ClueListProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full overflow-hidden">
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-primary mb-2">Across</h3>
        <div className="space-y-1 overflow-y-auto max-h-[200px] md:max-h-[400px] pr-2">
          {clues.across.map((clue) => (
            <motion.button
              key={`across-${clue.number}`}
              className={`
                w-full text-left p-2 rounded-md text-sm transition-colors
                ${
                  selectedClue?.number === clue.number && selectedClue?.direction === "across"
                    ? "bg-primary/20 text-white"
                    : "hover:bg-primary/10 text-white/80"
                }
              `}
              onClick={() => onClueSelect(clue)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="font-bold mr-1">{clue.number}.</span> {clue.clue}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-primary mb-2">Down</h3>
        <div className="space-y-1 overflow-y-auto max-h-[200px] md:max-h-[400px] pr-2">
          {clues.down.map((clue) => (
            <motion.button
              key={`down-${clue.number}`}
              className={`
                w-full text-left p-2 rounded-md text-sm transition-colors
                ${
                  selectedClue?.number === clue.number && selectedClue?.direction === "down"
                    ? "bg-primary/20 text-white"
                    : "hover:bg-primary/10 text-white/80"
                }
              `}
              onClick={() => onClueSelect(clue)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <span className="font-bold mr-1">{clue.number}.</span> {clue.clue}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
