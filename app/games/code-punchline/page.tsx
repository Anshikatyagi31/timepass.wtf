"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { challenges } from "./data/challenges"
import CodeEditor from "./components/code-editor"
import ChallengeDisplay from "./components/challenge-display"
import LevelSelector from "./components/level-selector"
import ResultDisplay from "./components/result-display"
import TutorialModal from "./components/tutorial-modal"
import CodePlayground from "./components/code-playground"
import CodeVisualizer from "./components/code-visualizer"
import AchievementsPanel from "./components/achievements-panel"
import { evaluateCode } from "./utils/code-evaluator"
import confetti from "canvas-confetti"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Code, Lightbulb, Puzzle, Zap } from "lucide-react"
import type { ChallengeCategory } from "./types"

export default function CodePunchlinePage() {
  const [currentCategory, setCurrentCategory] = useState<ChallengeCategory>(challenges[0])
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [code, setCode] = useState("")
  const [result, setResult] = useState<{
    output: string
    isCorrect: boolean
    message: string
    visualData?: any
  } | null>(null)
  const [showTutorial, setShowTutorial] = useState(true)
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())
  const [score, setScore] = useState(0)
  const [showMobileLevels, setShowMobileLevels] = useState(false)
  const [activeTab, setActiveTab] = useState("challenge")
  const [achievements, setAchievements] = useState<string[]>([])
  const [showAchievements, setShowAchievements] = useState(false)
  const [hintLevel, setHintLevel] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const successAudioRef = useRef<HTMLAudioElement>(null)
  const { toast } = useToast()

  const currentChallenge = currentCategory.challenges[currentChallengeIndex]

  useEffect(() => {
    // Reset code and result when changing challenges
    setCode(currentChallenge.initialCode || "// Write your code here")
    setResult(null)
    setHintLevel(0)
  }, [currentChallengeIndex, currentCategory])

  const runCode = async () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play()
      }

      const { output, isCorrect, visualData } = evaluateCode(code, currentChallenge)

      setResult({
        output,
        isCorrect,
        message: isCorrect ? getRandomSuccessMessage() : "Not quite right. Try again!",
        visualData,
      })

      if (isCorrect && !completedChallenges.has(`${currentCategory.id}-${currentChallenge.id}`)) {
        // Play success sound
        if (successAudioRef.current) {
          successAudioRef.current.currentTime = 0
          successAudioRef.current.play()
        }

        // Celebrate with confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#FF1493", "#00FFFF", "#7CFC00"],
        })

        // Update score and completed challenges
        const newCompletedChallenges = new Set(completedChallenges)
        newCompletedChallenges.add(`${currentCategory.id}-${currentChallenge.id}`)
        setCompletedChallenges(newCompletedChallenges)

        const pointsEarned = currentCategory.pointsPerChallenge
        setScore((prev) => prev + pointsEarned)

        toast({
          title: "Challenge Completed!",
          description: `You earned ${pointsEarned} points!`,
          className: "bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white",
        })

        // Check for achievements
        checkForAchievements(newCompletedChallenges)
      }
    } catch (error) {
      setResult({
        output: `Error: ${error instanceof Error ? error.message : String(error)}`,
        isCorrect: false,
        message: "Oops! Your code has an error.",
      })
    }
  }

  const checkForAchievements = (completed: Set<string>) => {
    const newAchievements: string[] = []

    // First challenge completed
    if (completed.size === 1 && !achievements.includes("first_challenge")) {
      newAchievements.push("first_challenge")
    }

    // Complete 5 challenges
    if (completed.size >= 5 && !achievements.includes("five_challenges")) {
      newAchievements.push("five_challenges")
    }

    // Complete a category
    for (const category of challenges) {
      const categoryCompleted = category.challenges.every((challenge) =>
        completed.has(`${category.id}-${challenge.id}`),
      )

      if (categoryCompleted && !achievements.includes(`complete_${category.id}`)) {
        newAchievements.push(`complete_${category.id}`)
      }
    }

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements])

      toast({
        title: "Achievement Unlocked!",
        description: getAchievementName(newAchievements[0]),
        className: "bg-gradient-to-r from-yellow-500 to-amber-600 border-none text-white",
      })
    }
  }

  const getAchievementName = (id: string) => {
    switch (id) {
      case "first_challenge":
        return "First Steps: Complete your first challenge"
      case "five_challenges":
        return "Getting Started: Complete 5 challenges"
      case "complete_jokes":
        return "Comedy Master: Complete all joke challenges"
      case "complete_arrays":
        return "Array Wizard: Complete all array challenges"
      case "complete_strings":
        return "String Virtuoso: Complete all string challenges"
      case "complete_objects":
        return "Object Oriented: Complete all object challenges"
      default:
        return "Achievement Unlocked!"
    }
  }

  const getRandomSuccessMessage = () => {
    const messages = [
      "Perfect! You nailed it! 🎯",
      "Awesome job! That's correct! 🚀",
      "Brilliant solution! 🧠",
      "You're on fire! 🔥",
      "Coding genius alert! 💡",
      "That's exactly right! 👏",
      "Impressive work! ⭐",
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const nextChallenge = () => {
    if (currentChallengeIndex < currentCategory.challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
    } else {
      toast({
        title: "Category Completed!",
        description: "Try another category for more challenges!",
        className: "bg-gradient-to-r from-purple-600 to-pink-600 border-none text-white",
      })
    }
  }

  const prevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(currentChallengeIndex - 1)
    }
  }

  const selectCategory = (category: ChallengeCategory) => {
    setCurrentCategory(category)
    setCurrentChallengeIndex(0)
    setShowMobileLevels(false)
  }

  const showNextHint = () => {
    if (hintLevel < (currentChallenge.hints?.length || 0)) {
      setHintLevel(hintLevel + 1)

      toast({
        title: "Hint Revealed",
        description: "A new hint has been unlocked!",
        className: "bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white",
      })
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-pink-900 text-white p-4 md:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/code-pattern.png')] opacity-5 z-0"></div>

      {/* Audio elements */}
      <audio ref={audioRef} src="/sounds/click.mp3" preload="auto"></audio>
      <audio ref={successAudioRef} src="/sounds/success.mp3" preload="auto"></audio>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
              Code Punchline - Timepass.wtf
            </h1>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-purple-200 mt-4">Master JavaScript with interactive challenges!</p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-full shadow-lg shadow-purple-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-purple-900 px-6 py-2 rounded-full">
                <span className="font-bold">Score: </span>
                <span className="text-yellow-300 font-mono">{score}</span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setShowTutorial(true)}
                className="bg-purple-800 hover:bg-purple-700 border-purple-600 text-white shadow-lg shadow-purple-900/30"
              >
                <Lightbulb className="w-4 h-4 mr-2" /> How to Play
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setShowAchievements(!showAchievements)}
                className="bg-purple-800 hover:bg-purple-700 border-purple-600 text-white shadow-lg shadow-purple-900/30"
              >
                <Award className="w-4 h-4 mr-2" /> Achievements ({achievements.length})
              </Button>
            </motion.div>

            <motion.div className="md:hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={() => setShowMobileLevels(!showMobileLevels)}
                className="bg-purple-800 hover:bg-purple-700 border-purple-600 text-white shadow-lg shadow-purple-900/30"
              >
                {showMobileLevels ? "Hide Categories" : "Show Categories"}
              </Button>
            </motion.div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnimatePresence>
          {(showMobileLevels || (typeof window !== "undefined" && window.innerWidth >= 1024)) && (
              <motion.div
                className={`${showMobileLevels ? "order-first" : "lg:col-span-1"}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LevelSelector
                  categories={challenges}
                  currentCategory={currentCategory}
                  onSelectCategory={selectCategory}
                  completedChallenges={completedChallenges}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 bg-purple-800/50 p-1 rounded-lg">
                <TabsTrigger
                  value="challenge"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <Puzzle className="w-4 h-4 mr-2" /> Challenge
                </TabsTrigger>
                <TabsTrigger
                  value="playground"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <Code className="w-4 h-4 mr-2" /> Playground
                </TabsTrigger>
                <TabsTrigger
                  value="visualizer"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                >
                  <Zap className="w-4 h-4 mr-2" /> Visualizer
                </TabsTrigger>
              </TabsList>

              <TabsContent value="challenge" className="mt-0">
                <ChallengeDisplay
                  challenge={currentChallenge}
                  categoryName={currentCategory.name}
                  challengeIndex={currentChallengeIndex + 1}
                  totalChallenges={currentCategory.challenges.length}
                  hintLevel={hintLevel}
                  onRequestHint={showNextHint}
                />

                <CodeEditor code={code} setCode={setCode} onRun={runCode} />

                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key={`result-${currentChallenge.id}-${result.isCorrect}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ResultDisplay result={result} challenge={currentChallenge} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={prevChallenge}
                      disabled={currentChallengeIndex === 0}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none shadow-lg shadow-purple-900/30 disabled:opacity-50"
                    >
                      Previous Challenge
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={nextChallenge}
                      disabled={!result?.isCorrect && currentChallengeIndex === currentCategory.challenges.length - 1}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 border-none shadow-lg shadow-purple-900/30 disabled:opacity-50"
                    >
                      {currentChallengeIndex < currentCategory.challenges.length - 1
                        ? "Next Challenge"
                        : "Finish Category"}
                    </Button>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="playground" className="mt-0">
                <CodePlayground />
              </TabsContent>

              <TabsContent value="visualizer" className="mt-0">
                <CodeVisualizer visualData={result?.visualData} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>{showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}</AnimatePresence>

      <AnimatePresence>
        {showAchievements && (
          <AchievementsPanel achievements={achievements} onClose={() => setShowAchievements(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
