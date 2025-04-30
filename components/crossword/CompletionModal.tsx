"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Clock, Share2 } from "lucide-react"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface CompletionModalProps {
  isComplete: boolean
  score: number
  timer: number
  formatTime: (seconds: number) => string
  onResetPuzzle: () => void
}

export function CompletionModal({ isComplete, score, timer, formatTime, onResetPuzzle }: CompletionModalProps) {
  useEffect(() => {
    if (isComplete) {
      // Trigger confetti when puzzle is completed
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [isComplete])

  return (
    <AnimatePresence>
      {isComplete && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background border border-primary/20 rounded-xl p-6 max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Award className="h-16 w-16 text-primary mx-auto mb-2" />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">Puzzle Complete!</h2>
              <p className="text-white/70 mb-6">Great job solving the crossword puzzle!</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/30 rounded-lg p-4">
                  <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-sm text-white/70">Time</p>
                  <p className="text-xl font-mono">{formatTime(timer)}</p>
                </div>

                <div className="bg-secondary/30 rounded-lg p-4">
                  <Award className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-sm text-white/70">Score</p>
                  <p className="text-xl font-mono">{score}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={onResetPuzzle}>
                  Play Again
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    try {
                      navigator.share({
                        title: "Crossword Puzzle",
                        text: `I completed a crossword puzzle with a score of ${score} in ${formatTime(timer)}!`,
                        url: window.location.href,
                      })
                    } catch (err) {
                      console.error("Share failed:", err)
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
