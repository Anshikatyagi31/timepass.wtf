"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Play,
  SkipForward,
  HelpCircle,
  Trophy,
  Timer,
  Check,
  X,
  Lightbulb,
  RefreshCw,
  Gamepad2,
  User,
  Building2,
  Building,
} from "lucide-react"
import { useWordScramble } from "@/hooks/useWordScramble"
import { LetterTile } from "@/components/wordscramble/LetterTile"
import type { Category } from "./data"

export default function WordScramble() {
  const {
    gameState,
    startGame,
    updateGuess,
    submitGuess,
    revealHint,
    skipPuzzle,
    nextPuzzle,
    setCategory,
    setDifficulty,
    initGame,
  } = useWordScramble(10) // 10 rounds

  const [selectedLetters, setSelectedLetters] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle letter tile click
  const handleLetterClick = (index: number) => {
    if (gameState.gameStatus !== "playing") return

    const isSelected = selectedLetters.includes(index)

    if (isSelected) {
      // Deselect letter
      setSelectedLetters(selectedLetters.filter((i) => i !== index))
    } else {
      // Select letter
      setSelectedLetters([...selectedLetters, index])
    }
  }

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitGuess()
    }
  }

  // Get category icon
  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case "personality":
        return <User className="h-5 w-5" />
      case "business":
        return <Building className="h-5 w-5" />
      case "company":
        return <Building2 className="h-5 w-5" />
      default:
        return null
    }
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-300"
      case "medium":
        return "bg-yellow-500/20 text-yellow-300"
      case "hard":
        return "bg-red-500/20 text-red-300"
      default:
        return "bg-violet-500/20 text-violet-300"
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
            <Gamepad2 className="h-6 w-6 text-violet-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-500">
              Word Scramble
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Game board */}
          <div className="flex flex-col">
            {/* Game stats */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span className="font-mono font-bold text-lg">{gameState.score} Points</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Timer className="h-5 w-5 text-blue-400" />
                  <span className="font-mono font-bold text-lg">{gameState.timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  <span className="font-mono font-bold text-lg">
                    {gameState.currentPuzzle ? gameState.hintsRevealed : 0}/
                    {gameState.currentPuzzle ? gameState.currentPuzzle.hints.length : 0}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {gameState.gameStatus === "ready" ? (
                  <Button className="bg-gradient-to-r from-violet-500 to-blue-500" onClick={startGame}>
                    <Play className="mr-2 h-4 w-4" />
                    Start Game
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={revealHint}>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Hint
                    </Button>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={skipPuzzle}>
                      <SkipForward className="mr-2 h-4 w-4" />
                      Skip
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Game progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">
                  Round {gameState.round + 1} of {gameState.totalRounds}
                </span>
                <span className="text-sm text-gray-400">High Score: {gameState.highScore}</span>
              </div>
              <Progress value={(gameState.round / gameState.totalRounds) * 100} className="h-2" />
            </div>

            {/* Game area */}
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm mb-6">
              <CardContent className="p-6">
                {gameState.gameStatus === "ready" ? (
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-500">
                      Word Scramble Challenge
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto">
                      Unscramble the letters to guess the personality, business, or company. Use hints if you get stuck!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <Button
                        variant={gameState.selectedCategory === "all" ? "default" : "outline"}
                        className={gameState.selectedCategory !== "all" ? "border-gray-700/50" : ""}
                        onClick={() => setCategory("all")}
                      >
                        <Gamepad2 className="mr-2 h-4 w-4" />
                        All Categories
                      </Button>
                      <Button
                        variant={gameState.selectedCategory === "personality" ? "default" : "outline"}
                        className={gameState.selectedCategory !== "personality" ? "border-gray-700/50" : ""}
                        onClick={() => setCategory("personality")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Personalities
                      </Button>
                      <Button
                        variant={gameState.selectedCategory === "business" ? "default" : "outline"}
                        className={gameState.selectedCategory !== "business" ? "border-gray-700/50" : ""}
                        onClick={() => setCategory("business")}
                      >
                        <Building className="mr-2 h-4 w-4" />
                        Businesses
                      </Button>
                      <Button
                        variant={gameState.selectedCategory === "company" ? "default" : "outline"}
                        className={gameState.selectedCategory !== "company" ? "border-gray-700/50" : ""}
                        onClick={() => setCategory("company")}
                      >
                        <Building2 className="mr-2 h-4 w-4" />
                        Companies
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <Button
                        variant={gameState.selectedDifficulty === "all" ? "default" : "outline"}
                        className={gameState.selectedDifficulty !== "all" ? "border-gray-700/50" : ""}
                        onClick={() => setDifficulty("all")}
                      >
                        All Difficulties
                      </Button>
                      <Button
                        variant={gameState.selectedDifficulty === "easy" ? "default" : "outline"}
                        className={gameState.selectedDifficulty !== "easy" ? "border-gray-700/50" : ""}
                        onClick={() => setDifficulty("easy")}
                      >
                        Easy
                      </Button>
                      <Button
                        variant={gameState.selectedDifficulty === "medium" ? "default" : "outline"}
                        className={gameState.selectedDifficulty !== "medium" ? "border-gray-700/50" : ""}
                        onClick={() => setDifficulty("medium")}
                      >
                        Medium
                      </Button>
                      <Button
                        variant={gameState.selectedDifficulty === "hard" ? "default" : "outline"}
                        className={gameState.selectedDifficulty !== "hard" ? "border-gray-700/50" : ""}
                        onClick={() => setDifficulty("hard")}
                      >
                        Hard
                      </Button>
                    </div>
                    <Button className="bg-gradient-to-r from-violet-500 to-blue-500" onClick={startGame}>
                      <Play className="mr-2 h-4 w-4" />
                      Start Game
                    </Button>
                  </div>
                ) : gameState.gameStatus === "finished" ? (
                  <div className="text-center py-12">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="mb-6"
                    >
                      <div className="mx-auto w-20 h-20 rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                        <Trophy className="h-10 w-10 text-amber-400" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-500">
                        Game Complete!
                      </h2>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-sm text-gray-400">Final Score</div>
                        <div className="text-2xl font-bold text-white">{gameState.score}</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="text-sm text-gray-400">High Score</div>
                        <div className="text-2xl font-bold text-white">{gameState.highScore}</div>
                      </div>
                    </div>

                    <Button className="bg-gradient-to-r from-violet-500 to-blue-500 w-full max-w-md" onClick={initGame}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Play Again
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Category and difficulty badges */}
                    {gameState.currentPuzzle && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1 border-violet-500/30 bg-violet-500/10"
                        >
                          {getCategoryIcon(gameState.currentPuzzle.category)}
                          <span className="capitalize">{gameState.currentPuzzle.category}</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`capitalize ${getDifficultyColor(gameState.currentPuzzle.difficulty)} border-opacity-30 bg-opacity-10`}
                        >
                          {gameState.currentPuzzle.difficulty}
                        </Badge>
                      </div>
                    )}

                    {/* Scrambled word */}
                    <div className="mb-8">
                      <h3 className="text-sm text-gray-400 mb-4">Unscramble the word:</h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {gameState.scrambledWord.split("").map((letter, index) => (
                          <LetterTile
                            key={`${letter}-${index}`}
                            letter={letter}
                            index={index}
                            isSelected={selectedLetters.includes(index)}
                            onClick={() => handleLetterClick(index)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Hints */}
                    <div className="mb-8">
                      <h3 className="text-sm text-gray-400 mb-2">Hints:</h3>
                      <div className="space-y-2">
                        {gameState.currentPuzzle?.hints.slice(0, gameState.hintsRevealed).map((hint, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50"
                          >
                            <div className="flex items-start gap-2">
                              <Lightbulb className="h-5 w-5 text-yellow-400 mt-0.5" />
                              <span>{hint}</span>
                            </div>
                          </motion.div>
                        ))}
                        {gameState.hintsRevealed === 0 && (
                          <div className="text-center p-4 text-gray-500 italic">
                            Click the Hint button to reveal hints
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User input */}
                    <div className="mb-4">
                      <h3 className="text-sm text-gray-400 mb-2">Your answer:</h3>
                      <div className="flex gap-2">
                        <Input
                          value={gameState.userGuess}
                          onChange={(e) => updateGuess(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type your answer..."
                          className="bg-gray-800/50 border-gray-700/50"
                          autoComplete="off"
                        />
                        <Button
                          onClick={submitGuess}
                          className={`min-w-[100px] ${
                            gameState.gameStatus === "correct"
                              ? "bg-green-600"
                              : gameState.gameStatus === "incorrect"
                                ? "bg-red-600"
                                : "bg-violet-600"
                          }`}
                        >
                          {gameState.gameStatus === "correct" ? (
                            <Check className="mr-2 h-4 w-4" />
                          ) : gameState.gameStatus === "incorrect" ? (
                            <X className="mr-2 h-4 w-4" />
                          ) : null}
                          {gameState.gameStatus === "correct"
                            ? "Correct!"
                            : gameState.gameStatus === "incorrect"
                              ? "Try Again"
                              : "Submit"}
                        </Button>
                      </div>
                    </div>

                    {/* Game status messages */}
                    <AnimatePresence>
                      {gameState.gameStatus === "correct" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg text-center"
                        >
                          <p className="text-green-300 font-medium">Correct! Moving to next puzzle...</p>
                        </motion.div>
                      )}
                      {gameState.gameStatus === "timeout" && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="bg-red-500/20 border border-red-500/30 p-4 rounded-lg text-center"
                        >
                          <p className="text-red-300 font-medium">
                            Time's up! The answer was: {gameState.currentPuzzle?.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Game info sidebar */}
          <div className="flex flex-col gap-6">
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Game Info</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Status</div>
                    <div className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium">
                      {gameState.gameStatus === "ready"
                        ? "Ready"
                        : gameState.gameStatus === "playing"
                          ? "Playing"
                          : gameState.gameStatus === "correct"
                            ? "Correct"
                            : gameState.gameStatus === "incorrect"
                              ? "Incorrect"
                              : gameState.gameStatus === "timeout"
                                ? "Time's Up"
                                : "Finished"}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Round</div>
                    <div className="font-medium">
                      {gameState.round + 1} / {gameState.totalRounds}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Score</div>
                    <div className="font-medium">{gameState.score}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">High Score</div>
                    <div className="font-medium">{gameState.highScore}</div>
                  </div>

                  <div className="border-t border-gray-700/50 my-4"></div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-violet-400">Categories</h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-blue-400" />
                        <span className="text-gray-300">Personalities: Famous individuals</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">Businesses: Types of establishments</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-amber-400" />
                        <span className="text-gray-300">Companies: Specific brand names</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span>Unscramble the letters to guess the word</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span>Use hints if you get stuck (costs points)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center mt-0.5">
                      3
                    </span>
                    <span>Submit your answer before time runs out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-violet-500/20 text-violet-400 text-xs flex items-center justify-center mt-0.5">
                      4
                    </span>
                    <span>Earn more points for faster answers and harder puzzles</span>
                  </li>
                </ul>
              </div>
            </Card>

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
