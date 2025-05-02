"use client"

import { motion } from "framer-motion"
import { X, Award, Star, Code, List, Type, Box, Check } from "lucide-react"

interface AchievementsPanelProps {
  achievements: string[]
  onClose: () => void
}

export default function AchievementsPanel({ achievements, onClose }: AchievementsPanelProps) {
  const allAchievements = [
    {
      id: "first_challenge",
      name: "First Steps",
      description: "Complete your first challenge",
      icon: <Award className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "five_challenges",
      name: "Getting Started",
      description: "Complete 5 challenges",
      icon: <Star className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "complete_jokes",
      name: "Comedy Master",
      description: "Complete all joke challenges",
      icon: <Code className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "complete_arrays",
      name: "Array Wizard",
      description: "Complete all array challenges",
      icon: <List className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "complete_strings",
      name: "String Virtuoso",
      description: "Complete all string challenges",
      icon: <Type className="w-6 h-6 text-yellow-400" />,
    },
    {
      id: "complete_objects",
      name: "Object Oriented",
      description: "Complete all object challenges",
      icon: <Box className="w-6 h-6 text-yellow-400" />,
    },
  ]

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-6 shadow-2xl border border-purple-500/50 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
            Achievements
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allAchievements.map((achievement) => {
            const isUnlocked = achievements.includes(achievement.id)

            return (
              <motion.div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  isUnlocked
                    ? "bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-500/50"
                    : "bg-gray-800/50 border-gray-700/50"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isUnlocked ? "bg-yellow-900/50" : "bg-gray-700/50"}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${isUnlocked ? "text-yellow-300" : "text-gray-400"}`}>
                        {achievement.name}
                      </h3>
                      {isUnlocked && <Check className="w-4 h-4 text-green-400" />}
                    </div>
                    <p className={`text-sm ${isUnlocked ? "text-yellow-200/70" : "text-gray-500"}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
