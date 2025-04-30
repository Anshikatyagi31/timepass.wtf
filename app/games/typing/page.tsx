"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Timer, Keyboard, RefreshCw, CheckCircle, Zap } from "lucide-react"
import { getRandomParagraph } from "./paragraphs"

// Calculate WPM
const calculateWPM = (typedChars: number, timeElapsedInMinutes: number): number => {
  // Standard: 5 characters = 1 word
  const words = typedChars / 5
  return Math.round(words / timeElapsedInMinutes)
}

// Calculate accuracy
const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100
  return Math.round((correctChars / totalChars) * 100)
}

export default function TypingTest() {
  const [difficulty, setDifficulty] = useState<string>("medium")
  const [paragraph, setParagraph] = useState(getRandomParagraph(difficulty))
  const [input, setInput] = useState<string>("")
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [correctChars, setCorrectChars] = useState<number>(0)
  const [incorrectChars, setIncorrectChars] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [wpm, setWpm] = useState<number>(0)
  const [accuracy, setAccuracy] = useState<number>(100)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [visibleTextStart, setVisibleTextStart] = useState<number>(0)
  const [visibleTextEnd, setVisibleTextEnd] = useState<number>(100)

  const inputRef = useRef<HTMLInputElement>(null)
  const textDisplayRef = useRef<HTMLDivElement>(null)

  // Initialize or reset the test
  const initTest = useCallback(() => {
    const newParagraph = getRandomParagraph(difficulty)
    setParagraph(newParagraph)
    setInput("")
    setStartTime(null)
    setEndTime(null)
    setIsActive(false)
    setIsFinished(false)
    setCurrentIndex(0)
    setCorrectChars(0)
    setIncorrectChars(0)
    setElapsedTime(0)
    setWpm(0)
    setAccuracy(100)
    setShowResults(false)
    setVisibleTextStart(0)
    setVisibleTextEnd(100)

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [difficulty])

  // Start the test when user starts typing
  const startTest = () => {
    if (!isActive && !isFinished) {
      setIsActive(true)
      setStartTime(Date.now())
    }
  }

  // End the test
  const endTest = () => {
    if (isActive) {
      const end = Date.now()
      setEndTime(end)
      setIsActive(false)
      setIsFinished(true)

      const timeElapsed = (end - startTime!) / 60000 // in minutes
      const finalWpm = calculateWPM(correctChars, timeElapsed)
      const finalAccuracy = calculateAccuracy(correctChars, correctChars + incorrectChars)

      setWpm(finalWpm)
      setAccuracy(finalAccuracy)
      setShowResults(true)

      // Show toast with results
      toast({
        title: "Test completed!",
        description: `WPM: ${finalWpm} | Accuracy: ${finalAccuracy}%`,
      })
    }
  }

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return

    const value = e.target.value
    setInput(value)

    // Start the test if it hasn't started yet
    if (!isActive) {
      startTest()
    }

    // Check each character
    const targetText = paragraph.text
    let correct = 0
    let incorrect = 0

    for (let i = 0; i < value.length; i++) {
      if (i < targetText.length) {
        if (value[i] === targetText[i]) {
          correct++
        } else {
          incorrect++
        }
      }
    }

    setCorrectChars(correct)
    setIncorrectChars(incorrect)
    setCurrentIndex(value.length)

    // Update visible text window (for scrolling effect)
    if (value.length > 50) {
      setVisibleTextStart(Math.max(0, value.length - 50))
      setVisibleTextEnd(value.length + 50)
    }

    // Check if test is complete
    if (value.length === targetText.length) {
      endTest()
    }
  }

  // Update timer while test is active
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && startTime) {
      interval = setInterval(() => {
        const time = (Date.now() - startTime) / 1000 // in seconds
        setElapsedTime(time)

        // Calculate current WPM
        const currentWpm = calculateWPM(correctChars, time / 60)
        setWpm(currentWpm)

        // Calculate current accuracy
        const currentAccuracy = calculateAccuracy(correctChars, correctChars + incorrectChars)
        setAccuracy(currentAccuracy)
      }, 500)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, startTime, correctChars, incorrectChars])

  // Initialize the test on component mount
  useEffect(() => {
    initTest()
  }, [initTest])

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Change difficulty
  const changeDifficulty = (newDifficulty: string) => {
    if (difficulty !== newDifficulty) {
      setDifficulty(newDifficulty)
      initTest()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-white/10 backdrop-blur-lg">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Keyboard className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
              Typing Test
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Main typing area */}
          <div className="flex flex-col">
            {/* Stats bar */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Timer className="h-5 w-5 text-teal-400" />
                  <span className="font-mono font-bold text-lg">{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="font-mono font-bold text-lg">{wpm} WPM</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="font-mono font-bold text-lg">{accuracy}%</span>
                </div>
              </div>
              <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={initTest}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Restart
              </Button>
            </div>

            {/* Typing area */}
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm mb-6 overflow-hidden">
              <div className="p-6">
                <div ref={textDisplayRef} className="font-mono text-lg leading-relaxed mb-6 relative min-h-[200px]">
                  {paragraph.text.split("").map((char, index) => {
                    // Determine if this character should be visible based on the current window
                    const isVisible = index >= visibleTextStart && index <= visibleTextEnd

                    // Determine the character's state
                    let charClass = "text-gray-500" // Default: not typed yet

                    if (index < input.length) {
                      charClass = input[index] === char ? "text-green-400" : "text-red-400 bg-red-900/30"
                    }

                    // Current character to type
                    if (index === currentIndex) {
                      charClass += " relative"
                    }

                    return (
                      <span key={index} className={`${charClass} ${!isVisible ? "hidden" : ""}`}>
                        {char}
                        {index === currentIndex && (
                          <motion.span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                          />
                        )}
                      </span>
                    )
                  })}
                </div>

                {/* Hidden input field to capture typing */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className="opacity-0 absolute top-0 left-0 h-1 w-1"
                  autoFocus
                />

                {/* Visual keyboard input indicator */}
                <div
                  className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 text-center cursor-pointer"
                  onClick={() => inputRef.current?.focus()}
                >
                  {isFinished ? (
                    <span className="text-green-400">Test completed! Click restart to try again.</span>
                  ) : isActive ? (
                    <span className="text-primary">Typing...</span>
                  ) : (
                    <span className="text-gray-400">Click here or start typing to begin the test</span>
                  )}
                </div>
              </div>
            </Card>

            {/* Results modal */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-gray-800/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 mb-6"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2">Your Results</h2>
                    <p className="text-gray-400">Here's how you performed</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-400 mb-1">WPM</div>
                      <div className="text-2xl font-bold text-yellow-400">{wpm}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-400 mb-1">Accuracy</div>
                      <div className="text-2xl font-bold text-green-400">{accuracy}%</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-400 mb-1">Time</div>
                      <div className="text-2xl font-bold text-teal-400">{formatTime(elapsedTime)}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                      <div className="text-sm text-gray-400 mb-1">Characters</div>
                      <div className="text-2xl font-bold text-blue-400">
                        {correctChars}/{paragraph.text.length}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button className="bg-gradient-to-r from-primary to-teal-500" onClick={initTest}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Difficulty selection */}
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Difficulty</h2>
                <div className="space-y-2">
                  <Button
                    variant={difficulty === "easy" ? "default" : "outline"}
                    className={difficulty !== "easy" ? "border-gray-700/50 text-gray-400" : ""}
                    onClick={() => changeDifficulty("easy")}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    Easy
                  </Button>
                  <Button
                    variant={difficulty === "medium" ? "default" : "outline"}
                    className={difficulty !== "medium" ? "border-gray-700/50 text-gray-400" : ""}
                    onClick={() => changeDifficulty("medium")}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    Medium
                  </Button>
                  <Button
                    variant={difficulty === "hard" ? "default" : "outline"}
                    className={difficulty !== "hard" ? "border-gray-700/50 text-gray-400" : ""}
                    onClick={() => changeDifficulty("hard")}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    Hard
                  </Button>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Typing Tips</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span>Keep your fingers positioned on the home row keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span>Look at the screen, not your keyboard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      3
                    </span>
                    <span>Focus on accuracy first, then speed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      4
                    </span>
                    <span>Practice regularly to build muscle memory</span>
                  </li>
                </ul>
              </div>
            </Card>

            {/* Back to home */}
            <Button variant="outline" className="border-white/10 hover:bg-white/5" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Games
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
