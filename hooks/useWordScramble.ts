"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "@/components/ui/use-toast"
import {
  type WordPuzzle,
  scrambleWord,
  getRandomPuzzle,
  getRandomPuzzleByCategory,
  type Category,
} from "@/app/games/wordscramble/data"

export type GameStatus = "ready" | "playing" | "correct" | "incorrect" | "timeout" | "finished"

export interface GameState {
  currentPuzzle: WordPuzzle | null
  scrambledWord: string
  userGuess: string
  score: number
  highScore: number
  timeLeft: number
  hintsRevealed: number
  gameStatus: GameStatus
  round: number
  totalRounds: number
  selectedCategory: Category | "all"
  selectedDifficulty: "easy" | "medium" | "hard" | "all"
}

export const useWordScramble = (initialRounds = 10) => {
  const [gameState, setGameState] = useState<GameState>({
    currentPuzzle: null,
    scrambledWord: "",
    userGuess: "",
    score: 0,
    highScore: typeof window !== "undefined" ? Number(localStorage.getItem("wordscramble-high-score") || "0") : 0,
    timeLeft: 60,
    hintsRevealed: 0,
    gameStatus: "ready",
    round: 0,
    totalRounds: initialRounds,
    selectedCategory: "all",
    selectedDifficulty: "all",
  })

  // Initialize game
  const initGame = useCallback(() => {
    const puzzle = getRandomPuzzle()
    setGameState({
      currentPuzzle: puzzle,
      scrambledWord: scrambleWord(puzzle.answer),
      userGuess: "",
      score: 0,
      highScore: typeof window !== "undefined" ? Number(localStorage.getItem("wordscramble-high-score") || "0") : 0,
      timeLeft: 60,
      hintsRevealed: 0,
      gameStatus: "ready",
      round: 0,
      totalRounds: initialRounds,
      selectedCategory: "all",
      selectedDifficulty: "all",
    })
  }, [initialRounds])

  // Start game
  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: "playing",
    }))
  }, [])

  // Set category
  const setCategory = useCallback((category: Category | "all") => {
    setGameState((prev) => ({
      ...prev,
      selectedCategory: category,
    }))
  }, [])

  // Set difficulty
  const setDifficulty = useCallback((difficulty: "easy" | "medium" | "hard" | "all") => {
    setGameState((prev) => ({
      ...prev,
      selectedDifficulty: difficulty,
    }))
  }, [])

  // Next puzzle
  const nextPuzzle = useCallback(() => {
    let puzzle: WordPuzzle

    if (gameState.selectedCategory === "all") {
      puzzle = getRandomPuzzle()
    } else {
      puzzle = getRandomPuzzleByCategory(gameState.selectedCategory)
    }

    // Filter by difficulty if needed
    if (gameState.selectedDifficulty !== "all" && puzzle.difficulty !== gameState.selectedDifficulty) {
      // Try to find a puzzle with the right difficulty and category
      const attempts = 10 // Limit attempts to avoid infinite loop
      for (let i = 0; i < attempts; i++) {
        if (gameState.selectedCategory === "all") {
          puzzle = getRandomPuzzle()
        } else {
          puzzle = getRandomPuzzleByCategory(gameState.selectedCategory)
        }
        if (puzzle.difficulty === gameState.selectedDifficulty) break
      }
    }

    setGameState((prev) => {
      const newRound = prev.round + 1
      const isFinished = newRound >= prev.totalRounds

      return {
        ...prev,
        currentPuzzle: puzzle,
        scrambledWord: scrambleWord(puzzle.answer),
        userGuess: "",
        timeLeft: 60,
        hintsRevealed: 0,
        gameStatus: isFinished ? "finished" : "playing",
        round: newRound,
      }
    })
  }, [gameState.selectedCategory, gameState.selectedDifficulty])

  // Update user guess
  const updateGuess = useCallback((guess: string) => {
    setGameState((prev) => ({
      ...prev,
      userGuess: guess.toUpperCase(),
    }))
  }, [])

  // Submit guess
  const submitGuess = useCallback(() => {
    if (!gameState.currentPuzzle) return

    const isCorrect = gameState.userGuess.toUpperCase() === gameState.currentPuzzle.answer.toUpperCase()

    if (isCorrect) {
      // Calculate score based on time left, difficulty, and hints used
      let pointsForPuzzle = 100

      // Adjust for difficulty
      if (gameState.currentPuzzle.difficulty === "medium") pointsForPuzzle = 150
      if (gameState.currentPuzzle.difficulty === "hard") pointsForPuzzle = 200

      // Adjust for time left (more time = more points)
      pointsForPuzzle += gameState.timeLeft * 2

      // Reduce points for hints used
      pointsForPuzzle -= gameState.hintsRevealed * 25

      // Ensure minimum points
      pointsForPuzzle = Math.max(pointsForPuzzle, 50)

      const newScore = gameState.score + pointsForPuzzle

      // Update high score if needed
      if (newScore > gameState.highScore) {
        if (typeof window !== "undefined") {
          localStorage.setItem("wordscramble-high-score", newScore.toString())
        }
      }

      setGameState((prev) => ({
        ...prev,
        score: newScore,
        highScore: Math.max(newScore, prev.highScore),
        gameStatus: "correct",
      }))

      toast({
        title: "Correct!",
        description: `+${pointsForPuzzle} points`,
        variant: "default",
      })

      // Move to next puzzle after delay
      setTimeout(() => {
        nextPuzzle()
      }, 2000)
    } else {
      setGameState((prev) => ({
        ...prev,
        gameStatus: "incorrect",
      }))

      toast({
        title: "Incorrect!",
        description: "Try again or use a hint",
        variant: "destructive",
      })

      // Reset to playing after delay
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          gameStatus: "playing",
        }))
      }, 1500)
    }
  }, [
    gameState.currentPuzzle,
    gameState.userGuess,
    gameState.timeLeft,
    gameState.hintsRevealed,
    gameState.score,
    gameState.highScore,
    nextPuzzle,
  ])

  // Reveal hint
  const revealHint = useCallback(() => {
    if (!gameState.currentPuzzle) return

    if (gameState.hintsRevealed < gameState.currentPuzzle.hints.length) {
      setGameState((prev) => ({
        ...prev,
        hintsRevealed: prev.hintsRevealed + 1,
      }))
    }
  }, [gameState.currentPuzzle, gameState.hintsRevealed])

  // Skip current puzzle
  const skipPuzzle = useCallback(() => {
    toast({
      title: "Puzzle Skipped",
      description: `The answer was: ${gameState.currentPuzzle?.answer}`,
    })

    nextPuzzle()
  }, [gameState.currentPuzzle, nextPuzzle])

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (gameState.gameStatus === "playing" && gameState.timeLeft > 0) {
      timer = setInterval(() => {
        setGameState((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(timer)

            // Time's up
            toast({
              title: "Time's up!",
              description: `The answer was: ${prev.currentPuzzle?.answer}`,
              variant: "destructive",
            })

            // Move to next puzzle after delay
            setTimeout(() => {
              nextPuzzle()
            }, 2000)

            return {
              ...prev,
              timeLeft: 0,
              gameStatus: "timeout",
            }
          }

          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          }
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [gameState.gameStatus, gameState.timeLeft, nextPuzzle])

  // Initialize on mount
  useEffect(() => {
    initGame()
  }, [initGame])

  return {
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
  }
}
