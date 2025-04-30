"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Clock, Award, Eye, RefreshCw } from "lucide-react"

interface GameControlsProps {
  timer: number
  score: number
  isComplete: boolean
  formatTime: (seconds: number) => string
  onRevealCell: () => void
  onRevealPuzzle: () => void
  onResetPuzzle: () => void
}

export function GameControls({
  timer,
  score,
  isComplete,
  formatTime,
  onRevealCell,
  onRevealPuzzle,
  onResetPuzzle,
}: GameControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-md">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-mono text-lg">{formatTime(timer)}</span>
        </div>

        {isComplete && (
          <motion.div
            className="flex items-center gap-2 bg-primary/20 px-3 py-1.5 rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <Award className="h-4 w-4 text-primary" />
            <span className="font-mono text-lg">{score} pts</span>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onRevealCell} className="text-xs">
          <Eye className="h-3 w-3 mr-1" />
          Reveal Letter
        </Button>

        <Button variant="outline" size="sm" onClick={onRevealPuzzle} className="text-xs">
          <Eye className="h-3 w-3 mr-1" />
          Reveal All
        </Button>

        <Button variant="outline" size="sm" onClick={onResetPuzzle} className="text-xs">
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  )
}
