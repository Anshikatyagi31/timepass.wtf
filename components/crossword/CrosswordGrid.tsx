"use client"

import { motion } from "framer-motion"
import type { CrosswordCell } from "@/app/games/crossword/data"

interface CrosswordGridProps {
  grid: CrosswordCell[][]
  selectedCell: { row: number; col: number } | null
  onCellClick: (row: number, col: number) => void
}

export function CrosswordGrid({ grid, selectedCell, onCellClick }: CrosswordGridProps) {
  if (!grid.length) return null

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      <div
        className="grid gap-[1px] h-full w-full"
        style={{
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`
                relative border border-primary/20
                ${
                  !cell.filled
                    ? "bg-black/80"
                    : cell.isSelected
                      ? "bg-primary/30"
                      : cell.isHighlighted
                        ? "bg-primary/15"
                        : cell.isRevealed
                          ? "bg-purple-500/10"
                          : cell.isError
                            ? "bg-red-500/10"
                            : "bg-background/80"
                }
                ${cell.filled ? "cursor-pointer" : "cursor-default"}
                transition-colors duration-200
              `}
              onClick={() => cell.filled && onCellClick(rowIndex, colIndex)}
            >
              {cell.number && (
                <span className="absolute top-0.5 left-0.5 text-[8px] sm:text-[10px] font-medium text-white/70">
                  {cell.number}
                </span>
              )}

              {cell.value && (
                <motion.div
                  className={`
                    flex items-center justify-center h-full w-full text-lg sm:text-2xl font-bold
                    ${cell.isRevealed ? "text-purple-400" : cell.isError ? "text-red-400" : "text-white"}
                  `}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {cell.value}
                </motion.div>
              )}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
