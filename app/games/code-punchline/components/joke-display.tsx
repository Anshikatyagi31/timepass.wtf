"use client"

import type { Joke } from "../types"
import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"

interface JokeDisplayProps {
  joke: Joke
  levelName: string
  jokeIndex: number
  totalJokes: number
}

export default function JokeDisplay({ joke, levelName, jokeIndex, totalJokes }: JokeDisplayProps) {
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
          {levelName}
        </motion.h2>
        <span className="bg-purple-700/50 backdrop-blur-sm px-4 py-1 rounded-full text-sm border border-purple-500/30 shadow-inner">
          Joke {jokeIndex} of {totalJokes}
        </span>
      </div>

      <motion.div
        className="bg-purple-900/60 backdrop-blur-sm rounded-xl p-5 mb-4 border-l-4 border-pink-500 shadow-lg"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <h3 className="text-lg font-medium mb-2 text-purple-200">Setup:</h3>
        <p className="text-xl md:text-2xl text-white font-medium">{joke.setup}</p>
      </motion.div>

      {joke.hint && (
        <motion.div
          className="bg-indigo-800/50 backdrop-blur-sm rounded-xl p-4 text-sm border border-indigo-500/30 flex items-start gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Lightbulb className="text-yellow-300 w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-bold text-yellow-200">Hint:</span>{" "}
            <span className="text-indigo-100">{joke.hint}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
