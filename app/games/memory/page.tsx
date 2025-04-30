"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  Timer,
  Trophy,
  Gamepad2,
  Zap,
  Star,
  RefreshCw,
  Brain,
  Sparkles,
  Medal,
  Clock,
  Check,
  X,
} from "lucide-react"

// All the icons we'll use for the memory game
const icons = [
  { name: "star", icon: <Star className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "zap", icon: <Zap className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "trophy", icon: <Trophy className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "gamepad", icon: <Gamepad2 className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "brain", icon: <Brain className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "sparkles", icon: <Sparkles className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "medal", icon: <Medal className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "clock", icon: <Clock className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "check", icon: <Check className="h-10 w-10 md:h-12 md:w-12" /> },
  { name: "x", icon: <X className="h-10 w-10 md:h-12 md:w-12" /> },
  // Add more icons to have enough for the game
  { name: "star-filled", icon: <Star className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "zap-filled", icon: <Zap className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "trophy-filled", icon: <Trophy className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "gamepad-filled", icon: <Gamepad2 className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "brain-filled", icon: <Brain className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "sparkles-filled", icon: <Sparkles className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "medal-filled", icon: <Medal className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "clock-filled", icon: <Clock className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "check-filled", icon: <Check className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  { name: "x-filled", icon: <X className="h-10 w-10 md:h-12 md:w-12 fill-current" /> },
  // Add more icons to have enough for the game
  { name: "star-outline", icon: <Star className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "zap-outline", icon: <Zap className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "trophy-outline", icon: <Trophy className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "gamepad-outline", icon: <Gamepad2 className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "brain-outline", icon: <Brain className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "sparkles-outline", icon: <Sparkles className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "medal-outline", icon: <Medal className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "clock-outline", icon: <Clock className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "check-outline", icon: <Check className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  { name: "x-outline", icon: <X className="h-10 w-10 md:h-12 md:w-12 stroke-[3]" /> },
  // Add more icons to have enough for the game
  { name: "star-thin", icon: <Star className="h-10 w-10 md:h-12 md:w-12 stroke-[1]" /> },
  { name: "zap-thin", icon: <Zap className="h-10 w-10 md:h-12 md:w-12 stroke-[1]" /> },
]

// Difficulty levels
const difficultyLevels = [
  { name: "Easy", gridSize: 4, timeLimit: 120 },
  { name: "Medium", gridSize: 6, timeLimit: 180 },
  { name: "Hard", gridSize: 8, timeLimit: 240 },
]

// Card patterns for the back of the cards
const cardPatterns = [
  "radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(76, 29, 149, 0.6) 100%)",
  "linear-gradient(45deg, rgba(139, 92, 246, 0.6) 0%, rgba(124, 58, 237, 0.8) 100%)",
  "repeating-linear-gradient(45deg, rgba(139, 92, 246, 0.3) 0px, rgba(139, 92, 246, 0.3) 2px, transparent 2px, transparent 4px)",
  "linear-gradient(135deg, rgba(139, 92, 246, 0.6) 25%, transparent 25%, transparent 50%, rgba(139, 92, 246, 0.6) 50%, rgba(139, 92, 246, 0.6) 75%, transparent 75%, transparent)",
]

// Card component for the memory game
const MemoryCard = ({ card, index, handleCardClick, flippedIndices, matchedPairs }) => {
  const isFlipped = flippedIndices.includes(index) || matchedPairs.includes(card.id)
  const isMatched = matchedPairs.includes(card.id)

  // Select a pattern for the card back
  const patternIndex = Math.floor(index / 2) % cardPatterns.length
  const cardPattern = cardPatterns[patternIndex]

  return (
    <div
      className="relative aspect-square w-full cursor-pointer perspective-500 group"
      onClick={() => handleCardClick(index)}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Back (shown when not flipped) */}
        <div
          className={`absolute inset-0 backface-hidden rounded-xl shadow-xl 
          ${isFlipped ? "pointer-events-none" : "hover:shadow-purple-500/30 hover:scale-[1.02]"}
          transition-all duration-300 ease-out
          bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700/50`}
        >
          <div
            className="absolute inset-0 rounded-[10px] m-[3px] flex items-center justify-center"
            style={{ background: cardPattern }}
          >
            {/* Card design elements */}
            <div className="absolute inset-2 rounded-lg border border-white/10"></div>
            <div className="absolute inset-0 bg-[url('/Interlocking Dimensions.png')] opacity-10 mix-blend-overlay"></div>

            {/* Card logo/symbol */}
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-500/80 to-indigo-600/80 flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 md:h-8 md:w-8 text-white/90" />
              <div className="absolute inset-0 rounded-full border border-white/20"></div>
            </div>
          </div>
        </div>

        {/* Card Front (shown when flipped) */}
        <div
          className={`absolute inset-0 backface-hidden rounded-xl rotate-y-180 shadow-xl
          ${
            isMatched
              ? "bg-gradient-to-br from-green-500/20 to-green-700/20 border-2 border-green-500/30"
              : "bg-gradient-to-br from-indigo-500/20 to-purple-700/20 border-2 border-indigo-500/30"
          }`}
        >
          <div className="absolute inset-0 rounded-[10px] m-[3px] flex items-center justify-center bg-gradient-to-br from-gray-800/90 to-gray-900/90">
            {/* Inner border */}
            <div className="absolute inset-2 rounded-lg border border-white/10"></div>

            {/* Icon container */}
            <div
              className={`relative flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full 
              ${
                isMatched
                  ? "bg-gradient-to-br from-green-500/30 to-green-700/30 text-green-400"
                  : "bg-gradient-to-br from-indigo-500/30 to-purple-700/30 text-white"
              } shadow-lg animate-fade-in`}
            >
              {card.icon}
              <div className="absolute inset-0 rounded-full border border-white/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState(null)
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedPairs, setMatchedPairs] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize the game based on difficulty
  const initializeGame = useCallback((level) => {
    setIsLoading(true)
    setDifficulty(level)
    setGameStarted(true)
    setGameOver(false)
    setFlippedIndices([])
    setMatchedPairs([])
    setMoves(0)
    setTimeLeft(level.timeLimit)
    setScore(0)

    // Get the best score from local storage
    if (typeof window !== "undefined") {
      const storedBestScore = localStorage.getItem(`memory-best-score-${level.name}`)
      if (storedBestScore) {
        setBestScore(Number.parseInt(storedBestScore))
      } else {
        setBestScore(0)
      }
    }

    // Create pairs of cards
    const gridSize = level.gridSize
    const totalPairs = (gridSize * gridSize) / 2

    // Select random icons for the pairs
    const shuffledIcons = [...icons].sort(() => Math.random() - 0.5).slice(0, totalPairs)

    // Create pairs of cards
    const cardPairs = []
    shuffledIcons.forEach((icon, index) => {
      // Create two cards with the same icon
      cardPairs.push({ id: `pair-${index}-1`, icon: icon.icon, pairId: index })
      cardPairs.push({ id: `pair-${index}-2`, icon: icon.icon, pairId: index })
    })

    // Shuffle the cards
    const shuffledCards = cardPairs.sort(() => Math.random() - 0.5)

    setCards(shuffledCards)
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  // Handle card click
  const handleCardClick = (index) => {
    // Ignore clicks if game is over or card is already flipped or matched
    if (gameOver || flippedIndices.includes(index) || matchedPairs.includes(cards[index].id)) {
      return
    }

    // If we already have 2 cards flipped, ignore the click
    if (flippedIndices.length === 2) {
      return
    }

    // Flip the card
    const newFlippedIndices = [...flippedIndices, index]
    setFlippedIndices(newFlippedIndices)

    // If we have 2 cards flipped, check for a match
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1)

      const [firstIndex, secondIndex] = newFlippedIndices
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      // Add a slight delay before checking for a match
      setTimeout(() => {
        // Check if the cards match
        if (firstCard.pairId === secondCard.pairId) {
          // Match found
          setMatchedPairs([...matchedPairs, firstCard.id, secondCard.id])
          setScore(score + 10) // Add points for a match
          setFlippedIndices([]) // Reset flipped cards

          // Check if game is completed
          if (matchedPairs.length + 2 === cards.length) {
            // Game completed
            handleGameComplete()
          } else {
            // Just a match
            toast({
              title: "Match found!",
              description: "+10 points",
              variant: "default",
            })
          }
        } else {
          // No match, flip cards back after a delay
          setTimeout(() => {
            setFlippedIndices([])
          }, 1000)
        }
      }, 500) // Add this delay for better visual effect
    }
  }

  // Handle game completion
  const handleGameComplete = () => {
    setGameOver(true)

    // Calculate final score based on time left and moves
    const timeBonus = timeLeft * 2
    const finalScore = score + timeBonus
    setScore(finalScore)

    // Check if this is a new best score
    if (finalScore > bestScore) {
      setBestScore(finalScore)
      if (typeof window !== "undefined") {
        localStorage.setItem(`memory-best-score-${difficulty.name}`, finalScore.toString())
      }
    }

    // Show completion message
    toast({
      title: "Congratulations!",
      description: `You completed the game with a score of ${finalScore}!`,
      variant: "default",
    })
  }

  // Timer effect
  useEffect(() => {
    let timer
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setGameOver(true)
            toast({
              title: "Time's up!",
              description: "You ran out of time!",
              variant: "destructive",
            })
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [gameStarted, gameOver, timeLeft])

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!difficulty) return 0
    return (matchedPairs.length / cards.length) * 100
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-950">
      <header className="p-4 border-b border-white/10 backdrop-blur-lg sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Link href="/games" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Back to Games</span>
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Memory Game
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {!difficulty ? (
          // Difficulty selection screen
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center flex-1 p-4"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                Memory Game
              </h1>
              <p className="text-lg text-white/80 max-w-md mx-auto">
                Test your memory by matching pairs of cards. Select a difficulty level to begin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              {difficultyLevels.map((level) => (
                <motion.div
                  key={level.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Card
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 hover:border-primary/50 cursor-pointer p-6 h-full"
                    onClick={() => initializeGame(level)}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="text-2xl font-bold mb-2">{level.name}</div>
                      <div className="text-white/60 mb-4">
                        {level.gridSize}x{level.gridSize} Grid
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Timer className="h-4 w-4" />
                        <span>{formatTime(level.timeLimit)}</span>
                      </div>
                      <div className="mt-4 text-sm text-white/60">
                        {level.name === "Easy"
                          ? "Perfect for beginners"
                          : level.name === "Medium"
                            ? "For experienced players"
                            : "For memory masters"}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Game screen
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Game board */}
            <div className="flex-1 flex flex-col p-4 lg:p-8">
              {/* Game stats */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div className="flex flex-wrap items-center gap-3 md:gap-6">
                  <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Timer className="h-5 w-5 text-yellow-400" />
                    <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Zap className="h-5 w-5 text-blue-400" />
                    <span className="font-mono font-bold text-lg">{moves} Moves</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <Trophy className="h-5 w-5 text-amber-400" />
                    <span className="font-mono font-bold text-lg">{score} Points</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-white/10 hover:bg-white/5"
                  onClick={() => initializeGame(difficulty)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restart
                </Button>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-gray-800/50 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-500"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>

              {/* Game grid */}
              {isLoading ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div
                    className="grid gap-3 sm:gap-4 w-full h-full"
                    style={{
                      gridTemplateColumns: `repeat(${difficulty.gridSize}, minmax(0, 1fr))`,
                      maxWidth: difficulty.gridSize <= 4 ? "100%" : "100%",
                      maxHeight: "100%",
                    }}
                  >
                    {cards.map((card, index) => (
                      <MemoryCard
                        key={card.id}
                        card={card}
                        index={index}
                        handleCardClick={handleCardClick}
                        flippedIndices={flippedIndices}
                        matchedPairs={matchedPairs}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Game info sidebar */}
            <div className="w-full lg:w-80 p-4 lg:p-8 lg:border-l lg:border-white/10 flex flex-col gap-6">
              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Game Info</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-white/80">Difficulty</div>
                      <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        {difficulty.name}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-white/80">Grid Size</div>
                      <div className="font-medium">
                        {difficulty.gridSize}x{difficulty.gridSize}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-white/80">Pairs Found</div>
                      <div className="font-medium">
                        {matchedPairs.length / 2} / {cards.length / 2}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-white/80">Best Score</div>
                      <div className="font-medium">{bestScore}</div>
                    </div>

                    <div className="border-t border-gray-700/50 my-4"></div>

                    <div className="text-center">
                      <div className="text-white/80 mb-2">Game Progress</div>
                      <div className="text-2xl font-bold">{Math.round(calculateProgress())}%</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        1
                      </span>
                      <span>Click on cards to flip them and reveal the icon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        2
                      </span>
                      <span>Find pairs of matching icons to remove them from the board</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        3
                      </span>
                      <span>Match all pairs before the time runs out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                        4
                      </span>
                      <span>Fewer moves and faster completion earn higher scores</span>
                    </li>
                  </ul>
                </div>
              </Card>

              <Button variant="outline" className="border-white/10 hover:bg-white/5" asChild>
                <Link href="/games">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Games
                </Link>
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Game over overlay */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                {matchedPairs.length === cards.length ? (
                  <Trophy className="h-8 w-8 text-yellow-400" />
                ) : (
                  <Clock className="h-8 w-8 text-red-400" />
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {matchedPairs.length === cards.length ? "Congratulations!" : "Game Over!"}
              </h2>
              <p className="text-white/80 mb-6">
                {matchedPairs.length === cards.length
                  ? `You completed the game with ${moves} moves in ${formatTime(difficulty.timeLimit - timeLeft)}!`
                  : "You ran out of time!"}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-white/60">Score</div>
                  <div className="text-2xl font-bold">{score}</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <div className="text-sm text-white/60">Best Score</div>
                  <div className="text-2xl font-bold">{Math.max(score, bestScore)}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-purple-500"
                  onClick={() => initializeGame(difficulty)}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Play Again
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-white/10"
                  onClick={() => {
                    setDifficulty(null)
                    setGameStarted(false)
                    setGameOver(false)
                  }}
                >
                  Change Difficulty
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
