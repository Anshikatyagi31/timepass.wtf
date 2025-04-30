"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, RefreshCw, Trophy, Heart, Gamepad2, Zap, Info, Volume2, VolumeX } from "lucide-react"
import { useBreakoutGame } from "@/hooks/useBreakoutGame"

export default function BreakoutGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })
  const [isMuted, setIsMuted] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  // Initialize game with canvas dimensions
  const {
    gameState,
    canvasRef: gameCanvasRef,
    startGame,
    pauseGame,
    resetGame,
    nextLevel,
  } = useBreakoutGame(canvasSize.width, canvasSize.height)

  // Set canvas ref from game hook
  useEffect(() => {
    if (canvasRef.current) {
      gameCanvasRef.current = canvasRef.current
    }
  }, [canvasRef, gameCanvasRef])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById("game-container")
      if (container) {
        const width = Math.min(container.clientWidth, 800)
        const height = Math.min(width * 0.75, 600)
        setCanvasSize({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Toggle sound
  const toggleSound = () => {
    setIsMuted(!isMuted)
  }

  // Toggle instructions
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions)
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
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Brick Breaker
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Game area */}
          <div className="flex flex-col">
            {/* Game stats */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span className="font-mono font-bold text-lg">{gameState.score} Points</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <span className="font-mono font-bold text-lg">Level {gameState.level}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <Heart className="h-5 w-5 text-red-400" />
                  <span className="font-mono font-bold text-lg">{gameState.lives} Lives</span>
                </div>
              </div>
              <div className="flex gap-2">
                {gameState.gameState === "playing" ? (
                  <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={pauseGame}>
                    <Pause className="mr-2 h-4 w-4" />
                    Pause
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="border-white/10 hover:bg-white/5"
                    onClick={
                      gameState.gameState === "paused"
                        ? startGame
                        : gameState.gameState === "levelComplete"
                          ? nextLevel
                          : gameState.gameState === "gameOver" || gameState.gameState === "victory"
                            ? resetGame
                            : startGame
                    }
                  >
                    {gameState.gameState === "gameOver" || gameState.gameState === "victory" ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Restart
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        {gameState.gameState === "paused"
                          ? "Resume"
                          : gameState.gameState === "levelComplete"
                            ? "Next Level"
                            : "Start"}
                      </>
                    )}
                  </Button>
                )}
                <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={toggleSound}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={toggleInstructions}>
                  <Info className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Game canvas */}
            <div id="game-container" className="relative mx-auto">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur-lg"></div>
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  className="relative bg-gray-900/50 backdrop-blur-md rounded-lg border border-white/10 shadow-xl"
                ></canvas>
              </div>
            </div>

            {/* Mobile controls */}
            <div className="mt-6 text-center text-sm text-gray-400 md:hidden">
              <p>Tap and drag to move the paddle</p>
              <p className="mt-2">Tap the screen to start the game</p>
            </div>

            {/* Instructions modal */}
            {showInstructions && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md mx-4"
                >
                  <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-primary">Controls</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Use left and right arrow keys or A/D to move the paddle</li>
                        <li>Press Space to start/pause the game</li>
                        <li>Press R to restart after game over</li>
                        <li>On mobile, tap and drag to move the paddle</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Power-ups</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          <span className="text-green-400">+</span> Expand: Makes your paddle wider
                        </li>
                        <li>
                          <span className="text-red-400">-</span> Shrink: Makes your paddle narrower
                        </li>
                        <li>
                          <span className="text-blue-400">*</span> Multiball: Adds extra balls
                        </li>
                        <li>
                          <span className="text-purple-400">↓</span> Slow: Decreases ball speed
                        </li>
                        <li>
                          <span className="text-orange-400">↑</span> Fast: Increases ball speed
                        </li>
                        <li>
                          <span className="text-pink-400">♥</span> Extra Life: Gives you an additional life
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">Objective</h3>
                      <p className="mt-2">
                        Break all the bricks to complete each level. Some bricks require multiple hits to break. Try to
                        achieve the highest score!
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <Button onClick={toggleInstructions}>Close</Button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Game info sidebar */}
          <div className="flex flex-col gap-6">
            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Game Info</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Status</div>
                    <div className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                      {gameState.gameState === "ready"
                        ? "Ready"
                        : gameState.gameState === "playing"
                          ? "Playing"
                          : gameState.gameState === "paused"
                            ? "Paused"
                            : gameState.gameState === "levelComplete"
                              ? "Level Complete"
                              : gameState.gameState === "victory"
                                ? "Victory"
                                : "Game Over"}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-gray-300">Level</div>
                    <div className="font-medium">{gameState.level} / 5</div>
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
                    <h3 className="font-semibold text-primary">Power-ups</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-gray-300">Expand Paddle</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-gray-300">Shrink Paddle</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-gray-300">Multiball</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span className="text-gray-300">Slow Ball</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span className="text-gray-300">Fast Ball</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span className="text-gray-300">Extra Life</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span>Move the paddle to bounce the ball and break bricks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span>Collect power-ups to gain advantages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      3
                    </span>
                    <span>Clear all bricks to advance to the next level</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      4
                    </span>
                    <span>Some bricks require multiple hits to break</span>
                  </li>
                </ul>
              </CardContent>
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
