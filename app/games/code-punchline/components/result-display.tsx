"use client"

import type { Challenge } from "../types"
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface ResultDisplayProps {
  result: {
    output: string
    isCorrect: boolean
    message: string
    visualData?: any
  }
  challenge: Challenge
}

export default function ResultDisplay({ result, challenge }: ResultDisplayProps) {
  return (
    <motion.div
      className={`
        rounded-xl p-5 border-2 shadow-lg
        ${
          result.isCorrect
            ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50 shadow-green-900/20"
            : "bg-gradient-to-br from-red-900/30 to-rose-900/30 border-red-500/50 shadow-red-900/20"
        }
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="flex items-center mb-3">
        {result.isCorrect ? (
          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
        ) : (
          <XCircle className="w-5 h-5 text-red-400 mr-2" />
        )}
        <h3 className="font-bold text-lg">{result.message}</h3>
      </div>

      <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 font-mono text-sm mb-3 border border-gray-700/50">
        <div className="text-gray-400 mb-2 flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
          Your output:
        </div>
        <div className={`${result.isCorrect ? "text-green-400" : "text-white"} break-words`}>
          {typeof result.output === "object" ? JSON.stringify(result.output, null, 2) : result.output || "<no output>"}
        </div>
      </div>

      {!result.isCorrect && challenge.expectedOutput && (
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 font-mono text-sm border border-gray-700/50">
          <div className="text-gray-400 mb-2 flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            Expected output:
          </div>
          <div className="text-yellow-400 break-words">{challenge.expectedOutput}</div>
        </div>
      )}

      {result.isCorrect && challenge.explanation && (
        <motion.div
          className="mt-4 bg-indigo-900/40 backdrop-blur-sm rounded-lg p-4 text-sm border border-indigo-500/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="font-bold text-indigo-200 mb-1">Explanation:</div>
          <div className="text-indigo-100">{challenge.explanation}</div>
        </motion.div>
      )}
    </motion.div>
  )
}
