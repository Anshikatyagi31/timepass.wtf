"use client"

import { motion } from "framer-motion"
import { X, Code, Play, Award, Lightbulb, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TutorialModalProps {
  onClose: () => void
}

export default function TutorialModal({ onClose }: TutorialModalProps) {
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
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            How to Play
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-purple-800/50 p-4 rounded-lg border border-purple-600/30">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-700/50 rounded-lg">
                <Code className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-purple-200 mb-1">JavaScript Challenges</h3>
                <p className="text-purple-300">
                  Master JavaScript through interactive coding challenges across different categories:
                </p>
                <ul className="mt-2 space-y-1 text-purple-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    <span>Code Punchlines: Complete jokes with JavaScript</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    <span>Array Adventures: Master array methods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    <span>String Sorcery: String manipulation challenges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                    <span>Object Odyssey: Object-oriented challenges</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/50 p-4 rounded-lg border border-purple-600/30">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-700/50 rounded-lg">
                <Play className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-purple-200 mb-1">How to Solve Challenges</h3>
                <ol className="mt-2 space-y-3 text-purple-300">
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-700 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Read the challenge description and understand what you need to accomplish</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-700 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Write JavaScript code in the editor to solve the challenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-700 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Click "Run Code" to test your solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-700 w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>If your solution is correct, you'll earn points and can move to the next challenge</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-purple-800/50 p-4 rounded-lg border border-purple-600/30">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-700/50 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-purple-200 mb-1">Special Features</h3>
                <ul className="mt-2 space-y-2 text-purple-300">
                  <li className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-bold">Hints:</span> If you're stuck, you can reveal hints to guide you
                      toward the solution
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Code className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-bold">Playground:</span> Experiment with JavaScript code in a sandbox
                      environment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-bold">Visualizer:</span> See visual representations of your code's output
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <span className="font-bold">Achievements:</span> Earn achievements as you complete challenges
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-2"
          >
            Start Coding!
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
