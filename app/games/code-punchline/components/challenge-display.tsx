"use client"

import type { Challenge } from "../types"
import { motion } from "framer-motion"
import { Lightbulb, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChallengeDisplayProps {
  challenge: Challenge
  categoryName: string
  challengeIndex: number
  totalChallenges: number
  hintLevel: number
  onRequestHint: () => void
}

export default function ChallengeDisplay({
  challenge,
  categoryName,
  challengeIndex,
  totalChallenges,
  hintLevel,
  onRequestHint,
}: ChallengeDisplayProps) {
  const availableHints = challenge.hints || []
  const hasMoreHints = hintLevel < availableHints.length

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-6 shadow-xl border border-purple-500/50 relative overflow-hidden"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      layout
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full filter blur-3xl opacity-10"></div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
        <motion.h2
          className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
          whileHover={{ scale: 1.05 }}
        >
          {categoryName}
        </motion.h2>
        <div className="flex items-center gap-2">
          <span className="bg-purple-700/50 backdrop-blur-sm px-4 py-1 rounded-full text-sm border border-purple-500/30 shadow-inner">
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </span>
          <span className="bg-purple-700/50 backdrop-blur-sm px-4 py-1 rounded-full text-sm border border-purple-500/30 shadow-inner">
            Challenge {challengeIndex} of {totalChallenges}
          </span>
        </div>
      </div>

      <motion.div
        className="bg-purple-900/60 backdrop-blur-sm rounded-xl p-5 mb-4 border-l-4 border-pink-500 shadow-lg"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-medium mb-2 text-purple-200">Challenge:</h3>
        <p className="text-xl md:text-2xl text-white font-medium mb-2">{challenge.title}</p>
        <p className="text-purple-200">{challenge.description}</p>
      </motion.div>

      {challenge.testCases && challenge.testCases.length > 0 && (
        <motion.div
          className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-4 mb-4 border border-indigo-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-bold text-indigo-200 mb-2">Test Cases:</h4>
          <div className="space-y-2">
            {challenge.testCases.map((testCase, index) => (
              <div key={index} className="bg-indigo-950/50 p-3 rounded-lg text-sm">
                <div className="font-mono mb-1">
                  <span className="text-gray-400">Input: </span>
                  <span className="text-indigo-200">{JSON.stringify(testCase.input)}</span>
                </div>
                <div className="font-mono mb-1">
                  <span className="text-gray-400">Expected: </span>
                  <span className="text-green-300">{JSON.stringify(testCase.expectedOutput)}</span>
                </div>
                <div className="text-xs text-indigo-300">{testCase.description}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="space-y-2">
        {availableHints.slice(0, hintLevel).map((hint, index) => (
          <motion.div
            key={index}
            className="bg-indigo-800/50 backdrop-blur-sm rounded-xl p-4 text-sm border border-indigo-500/30 flex items-start gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Lightbulb className="text-yellow-300 w-5 h-5 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-yellow-200">Hint {index + 1}:</span>{" "}
              <span className="text-indigo-100">{hint}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {hasMoreHints && (
        <motion.div className="mt-4 flex justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={onRequestHint}
            className="bg-indigo-800/50 hover:bg-indigo-700/50 border-indigo-500/30 text-white"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            {hintLevel === 0 ? "Show Hint" : "Show Next Hint"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}
