"use client"

import type { ChallengeCategory } from "../types"
import { motion } from "framer-motion"
import { CheckCircle, Star, Code, List, Type, Box } from "lucide-react"

interface LevelSelectorProps {
  categories: ChallengeCategory[]
  currentCategory: ChallengeCategory
  onSelectCategory: (category: ChallengeCategory) => void
  completedChallenges: Set<string>
}

export default function LevelSelector({
  categories,
  currentCategory,
  onSelectCategory,
  completedChallenges,
}: LevelSelectorProps) {
  // Calculate completion percentage for each category
  const getCategoryCompletion = (category: ChallengeCategory) => {
    const totalChallenges = category.challenges.length
    let completedCount = 0

    category.challenges.forEach((challenge) => {
      if (completedChallenges.has(`${category.id}-${challenge.id}`)) {
        completedCount++
      }
    })

    return {
      percentage: totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0,
      completed: completedCount,
      total: totalChallenges,
    }
  }

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "smile":
        return <Code className="w-5 h-5" />
      case "list":
        return <List className="w-5 h-5" />
      case "type":
        return <Type className="w-5 h-5" />
      case "box":
        return <Box className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-5 shadow-xl border border-purple-500/50"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-5 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
        Challenge Categories
      </h2>

      <div className="space-y-4">
        {categories.map((category, index) => {
          const completion = getCategoryCompletion(category)
          const isActive = currentCategory.id === category.id
          const isFullyCompleted = completion.completed === completion.total && completion.total > 0

          return (
            <motion.div
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className={`
                p-4 rounded-xl cursor-pointer transition-all relative overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-900/30"
                    : "bg-purple-800/50 hover:bg-purple-700/50 border border-purple-600/30"
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Background decorative elements */}
              {isActive && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full filter blur-3xl opacity-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-300 rounded-full filter blur-3xl opacity-10"></div>
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`
                  p-2 rounded-lg
                  ${isActive ? "bg-white/10" : "bg-purple-700/50"}
                `}
                >
                  {getCategoryIcon(category.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{category.name}</h3>
                    {isFullyCompleted && <CheckCircle className="w-4 h-4 text-green-400" />}
                  </div>
                  <p className="text-xs text-purple-200 line-clamp-1">{category.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-purple-200 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    {category.pointsPerChallenge}
                  </span>
                  <span>pts each</span>
                </div>
                <span>
                  {completion.completed}/{completion.total} completed
                </span>
              </div>

              <div className="w-full bg-purple-950/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${completion.percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                ></motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
