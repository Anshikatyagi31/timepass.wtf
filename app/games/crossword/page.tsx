"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, HelpCircle } from "lucide-react"
import { useCrossword } from "@/hooks/useCrossword"
import { CrosswordGrid } from "@/components/crossword/CrosswordGrid"
import { ClueList } from "@/components/crossword/ClueList"
import { Keyboard } from "@/components/crossword/Keyboard"
import { GameControls } from "@/components/crossword/GameControls"
import { CompletionModal } from "@/components/crossword/CompletionModal"

export default function CrosswordPage() {
  const {
    puzzle,
    grid,
    selectedCell,
    selectedDirection,
    selectedClue,
    isComplete,
    timer,
    score,
    isLoading,
    selectCell,
    toggleDirection,
    enterLetter,
    deleteLetter,
    revealCell,
    revealPuzzle,
    selectClue,
    resetPuzzle,
    formatTime,
  } = useCrossword()

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.match(/^[a-zA-Z]$/) && e.key.length === 1) {
        enterLetter(e.key)
      } else if (e.key === "Backspace" || e.key === "Delete") {
        deleteLetter()
      } else if (e.key === "Tab") {
        e.preventDefault()
        toggleDirection()
      } else if (e.key === "ArrowRight") {
        if (selectedCell) {
          const { row, col } = selectedCell
          if (col < grid[0].length - 1) {
            selectCell(row, col + 1)
          }
        }
      } else if (e.key === "ArrowLeft") {
        if (selectedCell) {
          const { row, col } = selectedCell
          if (col > 0) {
            selectCell(row, col - 1)
          }
        }
      } else if (e.key === "ArrowDown") {
        if (selectedCell) {
          const { row, col } = selectedCell
          if (row < grid.length - 1) {
            selectCell(row + 1, col)
          }
        }
      } else if (e.key === "ArrowUp") {
        if (selectedCell) {
          const { row, col } = selectedCell
          if (row > 0) {
            selectCell(row - 1, col)
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedCell, grid, enterLetter, deleteLetter, toggleDirection, selectCell])

  if (isLoading || !puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/90">
        <div className="animate-pulse text-xl font-bold">Loading puzzle...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/95">
      <header className="p-4 border-b border-white/10 backdrop-blur-lg">
        <div className="container flex justify-between items-center">
          <Link href="/games" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Back to Games</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Crossword Puzzle
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-6 px-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-8">
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <GameControls
                timer={timer}
                score={score}
                isComplete={isComplete}
                formatTime={formatTime}
                onRevealCell={revealCell}
                onRevealPuzzle={revealPuzzle}
                onResetPuzzle={resetPuzzle}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary/20 backdrop-blur-sm border border-primary/10 rounded-xl p-4 shadow-xl"
            >
              <CrosswordGrid grid={grid} selectedCell={selectedCell} onCellClick={selectCell} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:hidden"
            >
              <Keyboard onKeyPress={enterLetter} onDelete={deleteLetter} onToggleDirection={toggleDirection} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-secondary/10 backdrop-blur-sm border border-primary/10 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Clues</h2>
            </div>

            {selectedClue && (
              <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-white/80">Current Clue</p>
                <p className="font-bold">
                  {selectedClue.number} {selectedClue.direction === "across" ? "Across" : "Down"}: {selectedClue.clue}
                </p>
              </div>
            )}

            <ClueList clues={puzzle.clues} selectedClue={selectedClue} onClueSelect={selectClue} />

            <div className="hidden md:block mt-6">
              <Keyboard onKeyPress={enterLetter} onDelete={deleteLetter} onToggleDirection={toggleDirection} />
            </div>
          </motion.div>
        </div>
      </main>

      <CompletionModal
        isComplete={isComplete}
        score={score}
        timer={timer}
        formatTime={formatTime}
        onResetPuzzle={resetPuzzle}
      />
    </div>
  )
}
