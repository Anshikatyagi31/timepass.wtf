"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Zap,
  Star,
} from "lucide-react"
import { useSnakeGame, type Direction } from "@/hooks/useSnakeGame"

export default function SnakeGame() {
  const { gameState, startGame, pauseGame, changeDirection, CELL_SIZE } = useSnakeGame()
  const canvasRef = useRef<HTMLCanvasElement>(null)
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

  // Draw game on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid background (subtle)
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let x = 0; x < gameState.gridSize; x++) {
      for (let y = 0; y < gameState.gridSize; y++) {
        if ((x + y) % 2 === 0) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
          ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }
      }
    }

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const isHead = index === 0

      // Create gradient for snake body
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        segment.x * CELL_SIZE + CELL_SIZE,
        segment.y * CELL_SIZE + CELL_SIZE,
      )

      if (isHead) {
        gradient.addColorStop(0, "#10b981") // Emerald 600
        gradient.addColorStop(1, "#059669") // Emerald 700
      } else {
        const gradientIntensity = 1 - index / gameState.snake.length
        gradient.addColorStop(0, `rgba(16, 185, 129, ${0.7 + gradientIntensity * 0.3})`) // Emerald with opacity
        gradient.addColorStop(1, `rgba(5, 150, 105, ${0.7 + gradientIntensity * 0.3})`) // Emerald with opacity
      }

      ctx.fillStyle = gradient

      // Draw rounded rectangle for snake segments
      const radius = isHead ? 8 : 4
      const x = segment.x * CELL_SIZE
      const y = segment.y * CELL_SIZE
      const width = CELL_SIZE
      const height = CELL_SIZE

      ctx.beginPath()
      ctx.moveTo(x + radius, y)
      ctx.arcTo(x + width, y, x + width, y + height, radius)
      ctx.arcTo(x + width, y + height, x, y + height, radius)
      ctx.arcTo(x, y + height, x, y, radius)
      ctx.arcTo(x, y, x + width, y, radius)
      ctx.closePath()
      ctx.fill()

      // Add glow effect to head
      if (isHead) {
        ctx.shadowColor = "#10b981"
        ctx.shadowBlur = 15
        ctx.fillRect(x + 2, y + 2, width - 4, height - 4)
        ctx.shadowBlur = 0

        // Draw eyes
        ctx.fillStyle = "white"

        // Position eyes based on direction
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY

        switch (gameState.direction) {
          case "UP":
            leftEyeX = x + width * 0.3
            leftEyeY = y + height * 0.3
            rightEyeX = x + width * 0.7
            rightEyeY = y + height * 0.3
            break
          case "DOWN":
            leftEyeX = x + width * 0.3
            leftEyeY = y + height * 0.7
            rightEyeX = x + width * 0.7
            rightEyeY = y + height * 0.7
            break
          case "LEFT":
            leftEyeX = x + width * 0.3
            leftEyeY = y + height * 0.3
            rightEyeX = x + width * 0.3
            rightEyeY = y + height * 0.7
            break
          case "RIGHT":
            leftEyeX = x + width * 0.7
            leftEyeY = y + height * 0.3
            rightEyeX = x + width * 0.7
            rightEyeY = y + height * 0.7
            break
          default:
            leftEyeX = x + width * 0.3
            leftEyeY = y + height * 0.3
            rightEyeX = x + width * 0.7
            rightEyeY = y + height * 0.3
        }

        ctx.beginPath()
        ctx.arc(leftEyeX, leftEyeY, 2, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(rightEyeX, rightEyeY, 2, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    // Draw food with glow effect
    const foodX = gameState.food.position.x * CELL_SIZE
    const foodY = gameState.food.position.y * CELL_SIZE

    // Add pulsating effect for special foods
    let foodSize = CELL_SIZE * 0.7
    if (gameState.food.type !== "regular") {
      const pulseFactor = Math.sin(Date.now() / 200) * 0.1 + 0.9
      foodSize *= pulseFactor
    }

    // Draw glow
    ctx.shadowColor = gameState.food.color
    ctx.shadowBlur = 15
    ctx.fillStyle = gameState.food.color

    // Draw food shape based on type
    const centerX = foodX + CELL_SIZE / 2
    const centerY = foodY + CELL_SIZE / 2

    if (gameState.food.type === "regular") {
      // Circle for regular food
      ctx.beginPath()
      ctx.arc(centerX, centerY, foodSize / 2, 0, Math.PI * 2)
      ctx.fill()
    } else if (gameState.food.type === "bonus") {
      // Diamond for bonus food
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - foodSize / 2)
      ctx.lineTo(centerX + foodSize / 2, centerY)
      ctx.lineTo(centerX, centerY + foodSize / 2)
      ctx.lineTo(centerX - foodSize / 2, centerY)
      ctx.closePath()
      ctx.fill()
    } else {
      // Star for special food
      const spikes = 5
      const outerRadius = foodSize / 2
      const innerRadius = outerRadius / 2

      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (Math.PI * i) / spikes
        const x = centerX + Math.sin(angle) * radius
        const y = centerY - Math.cos(angle) * radius
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
    }

    // Reset shadow
    ctx.shadowBlur = 0

    // Draw particles
    gameState.particles.forEach((particle) => {
      ctx.globalAlpha = particle.life
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.globalAlpha = 1

    // Draw grid border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = 2
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
  }, [gameState, CELL_SIZE])

  // Handle mobile controls
  const handleMobileControl = (direction: Direction) => {
    changeDirection(direction)
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
            <Gamepad2 className="h-6 w-6 text-emerald-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
              Snake Game
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
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="font-mono font-bold text-lg">{gameState.score} Points</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <span className="font-mono font-bold text-lg">Level {gameState.level}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Star className="h-5 w-5 text-emerald-400" />
                  <span className="font-mono font-bold text-lg">High: {gameState.highScore}</span>
                </div>
              </div>
              <div className="flex gap-2">
                {gameState.gameStatus === "PLAYING" ? (
                  <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={pauseGame}>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5"
                    onClick={gameState.gameStatus === "PAUSED" ? pauseGame : startGame}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    {gameState.gameStatus === "PAUSED" ? "Resume" : "Start"}
                  </Button>
                )}
                {gameState.gameStatus === "GAME_OVER" && (
                  <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={startGame}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restart
                  </Button>
                )}
              </div>
            </div>

            {/* Game canvas */}
            <div className="relative mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur-lg"></div>
                <canvas
                  ref={canvasRef}
                  width={gameState.gridSize * CELL_SIZE}
                  height={gameState.gridSize * CELL_SIZE}
                  className="relative bg-gray-900/50 backdrop-blur-md rounded-lg border border-white/10 shadow-xl"
                ></canvas>
              </div>

              {/* Game overlay messages */}
              <AnimatePresence>
                {gameState.gameStatus === "READY" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg"
                  >
                    <div className="text-center p-8 bg-gray-900/80 rounded-xl border border-white/10 shadow-2xl max-w-sm">
                      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                        Snake Game
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Use arrow keys or swipe to control the snake. Eat food to grow longer and earn points!
                      </p>
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={startGame}>
                        <Play className="mr-2 h-4 w-4" />
                        Start Game
                      </Button>
                    </div>
                  </motion.div>
                )}

                {gameState.gameStatus === "PAUSED" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg"
                  >
                    <div className="text-center p-8 bg-gray-900/80 rounded-xl border border-white/10 shadow-2xl">
                      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                        Game Paused
                      </h2>
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={pauseGame}>
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                      </Button>
                    </div>
                  </motion.div>
                )}

                {gameState.gameStatus === "GAME_OVER" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-lg"
                  >
                    <div className="text-center p-8 bg-gray-900/80 rounded-xl border border-white/10 shadow-2xl max-w-sm">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="mb-6"
                      >
                        <div className="mx-auto w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                          <Trophy className="h-10 w-10 text-amber-400" />
                        </div>
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-500">
                          Game Over!
                        </h2>
                      </motion.div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-sm text-gray-400">Score</div>
                          <div className="text-2xl font-bold text-white">{gameState.score}</div>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-4">
                          <div className="text-sm text-gray-400">High Score</div>
                          <div className="text-2xl font-bold text-white">{gameState.highScore}</div>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 w-full" onClick={startGame}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Play Again
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile controls */}
            {isMobile && (
              <div className="mt-8">
                <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
                  <div className="col-start-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-16 h-16 rounded-full border-white/20 bg-gray-800/50 backdrop-blur-sm"
                      onClick={() => handleMobileControl("UP")}
                    >
                      <ChevronUp className="h-8 w-8" />
                    </Button>
                  </div>
                  <div className="col-start-1 col-end-2 flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-16 h-16 rounded-full border-white/20 bg-gray-800/50 backdrop-blur-sm"
                      onClick={() => handleMobileControl("LEFT")}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                  </div>
                  <div className="col-start-3 col-end-4 flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-16 h-16 rounded-full border-white/20 bg-gray-800/50 backdrop-blur-sm"
                      onClick={() => handleMobileControl("RIGHT")}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </div>
                  <div className="col-start-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-16 h-16 rounded-full border-white/20 bg-gray-800/50 backdrop-blur-sm"
                      onClick={() => handleMobileControl("DOWN")}
                    >
                      <ChevronDown className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Game info sidebar */}
          <div className="flex flex-col gap-6">
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4">Game Info</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Status</div>
                    <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                      {gameState.gameStatus === "READY"
                        ? "Ready"
                        : gameState.gameStatus === "PLAYING"
                          ? "Playing"
                          : gameState.gameStatus === "PAUSED"
                            ? "Paused"
                            : "Game Over"}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Snake Length</div>
                    <div className="font-medium">{gameState.snake.length}</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Speed</div>
                    <div className="font-medium">{Math.round(1000 / gameState.speed)} cells/sec</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">High Score</div>
                    <div className="font-medium">{gameState.highScore}</div>
                  </div>

                  <div className="border-t border-gray-700/50 my-4"></div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-emerald-400">Food Types</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-gray-300">Regular: 1 point</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-gray-300">Bonus: 3 points</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                      <span className="text-gray-300">Special: 5 points</span>
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
                    <span className="inline-block w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span>Use arrow keys or swipe to control the snake</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span>Eat food to grow longer and earn points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center mt-0.5">
                      3
                    </span>
                    <span>Avoid hitting walls or your own tail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center mt-0.5">
                      4
                    </span>
                    <span>Special foods appear occasionally for bonus points</span>
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
