"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Gamepad2, Copy, ArrowLeft, RefreshCw, Trophy } from "lucide-react"
import Link from "next/link"
import { nanoid } from "nanoid"
import { initializeSocket } from "@/lib/socket"
import { toast } from "@/components/ui/use-toast"

export default function TicTacToe() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gameId = searchParams.get("id")

  const [socket, setSocket] = useState(null)
  const [game, setGame] = useState(null)
  const [playerId, setPlayerId] = useState("")
  const [loading, setLoading] = useState(true)
  const [challengeLink, setChallengeLink] = useState("")

  // Initialize socket connection
  useEffect(() => {
    const socketInstance = initializeSocket()
    setSocket(socketInstance)
    setPlayerId(socketInstance.id)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  // Handle socket events
  useEffect(() => {
    if (!socket) return

    socket.on("game-created", (gameData) => {
      setGame(gameData)
      setLoading(false)
      setChallengeLink(`${window.location.origin}/games/tictactoe?id=${gameData.id}`)
    })

    socket.on("game-joined", (gameData) => {
      setGame(gameData)
      setLoading(false)
    })

    socket.on("move-made", (gameData) => {
      setGame(gameData)
    })

    socket.on("game-over", ({ winner, draw, board }) => {
      setGame((prev) => ({
        ...prev,
        status: "finished",
        winner,
        draw,
        board,
      }))

      if (winner === socket.id) {
        toast({
          title: "You won!",
          description: "Congratulations on your victory!",
        })
      } else if (draw) {
        toast({
          title: "It's a draw!",
          description: "The game ended in a tie.",
        })
      } else {
        toast({
          title: "You lost!",
          description: "Better luck next time!",
        })
      }
    })

    socket.on("game-restarted", (gameData) => {
      setGame(gameData)
    })

    socket.on("player-disconnected", () => {
      toast({
        title: "Player disconnected",
        description: "Your opponent has left the game.",
        variant: "destructive",
      })

      // Redirect to home after a delay
      setTimeout(() => {
        router.push("/games/tictactoe")
      }, 3000)
    })

    socket.on("error", (message) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    })

    return () => {
      socket.off("game-created")
      socket.off("game-joined")
      socket.off("move-made")
      socket.off("game-over")
      socket.off("game-restarted")
      socket.off("player-disconnected")
      socket.off("error")
    }
  }, [socket, router])

  // Join or create game based on URL
  useEffect(() => {
    if (!socket || !socket.connected) return

    if (gameId) {
      // Join existing game
      socket.emit("join-game", gameId)
    } else {
      // Create new game
      const newGameId = nanoid(8)
      socket.emit("create-game", newGameId)
    }
  }, [socket, gameId])

  // Handle making a move
  const handleCellClick = (index) => {
    if (!game || game.status !== "playing") return
    if (game.currentTurn !== socket.id) return
    if (game.board[index] !== null) return

    socket.emit("make-move", { gameId: game.id, index })
  }

  // Handle game restart
  const handleRestart = () => {
    if (!game) return
    socket.emit("restart-game", game.id)
  }

  // Copy challenge link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(challengeLink)
    toast({
      title: "Link copied!",
      description: "Share this link with a friend to play together.",
    })
  }

  // Determine player mark (X or O)
  const getPlayerMark = () => {
    if (!game || !socket) return ""
    const player = game.players.find((p) => p.id === socket.id)
    return player ? player.mark : ""
  }

  // Check if it's the current player's turn
  const isPlayerTurn = () => {
    if (!game || !socket) return false
    return game.currentTurn === socket.id
  }

  // Render game status message
  const renderStatusMessage = () => {
    if (!game) return "Loading..."

    if (game.status === "waiting") {
      return "Waiting for opponent to join..."
    }

    if (game.status === "playing") {
      return isPlayerTurn() ? "Your turn" : "Opponent's turn"
    }

    if (game.status === "finished") {
      if (game.draw) return "Game ended in a draw!"
      return game.winner === socket.id ? "You won!" : "You lost!"
    }

    return ""
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
              Tic-Tac-Toe
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-[1fr_400px] gap-8">
          {/* Game Board */}
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {loading ? (
                <div className="h-[350px] w-[350px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3 bg-black/20 backdrop-blur-md p-4 rounded-xl shadow-xl">
                    {game?.board.map((cell, index) => (
                      <motion.div
                        key={index}
                        whileHover={!cell && game.status === "playing" && isPlayerTurn() ? { scale: 1.05 } : {}}
                        whileTap={!cell && game.status === "playing" && isPlayerTurn() ? { scale: 0.95 } : {}}
                        className={`h-[100px] w-[100px] md:h-[120px] md:w-[120px] rounded-lg flex items-center justify-center cursor-pointer
                          ${!cell && game.status === "playing" && isPlayerTurn() ? "bg-white/10 hover:bg-white/20" : "bg-white/5"}
                          ${game.status === "finished" && game.board[index] ? "shadow-lg" : ""}
                        `}
                        onClick={() => handleCellClick(index)}
                      >
                        {cell === "X" && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="text-5xl font-bold text-rose-500"
                          >
                            X
                          </motion.div>
                        )}
                        {cell === "O" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-5xl font-bold text-blue-500"
                          >
                            O
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Game status overlay */}
                  {game?.status === "finished" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl"
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="mb-4"
                        >
                          {game.draw ? (
                            <div className="text-4xl font-bold text-yellow-500">Draw!</div>
                          ) : game.winner === socket.id ? (
                            <div className="flex flex-col items-center">
                              <Trophy className="h-16 w-16 text-yellow-500 mb-2" />
                              <div className="text-4xl font-bold text-green-500">You Won!</div>
                            </div>
                          ) : (
                            <div className="text-4xl font-bold text-red-500">You Lost!</div>
                          )}
                        </motion.div>
                        <Button onClick={handleRestart} className="bg-gradient-to-r from-primary to-purple-500">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Play Again
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>

            {/* Game status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <div className="text-xl font-semibold mb-2">{renderStatusMessage()}</div>
              {game?.status === "playing" && (
                <div className="flex items-center justify-center gap-4">
                  <div
                    className={`px-4 py-2 rounded-full ${getPlayerMark() === "X" ? "bg-rose-500/20 text-rose-300" : "bg-blue-500/20 text-blue-300"}`}
                  >
                    You are {getPlayerMark()}
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full ${isPlayerTurn() ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}
                  >
                    {isPlayerTurn() ? "Your turn" : "Waiting..."}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Game Info */}
          <div className="flex flex-col gap-6">
            <Card className="bg-black/20 border-white/10 backdrop-blur-md">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">Game Info</h2>

                {game?.status === "waiting" ? (
                  <div className="space-y-4">
                    <p className="text-white/80">Share this link with a friend to start playing:</p>
                    <div className="flex gap-2">
                      <Input value={challengeLink} readOnly className="bg-black/20 border-white/10" />
                      <Button onClick={copyLink} variant="outline" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                      <span>Waiting for opponent to join...</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                        <span className="font-medium">Player X</span>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${game?.currentTurn === game?.players[0]?.id ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}`}
                      >
                        {game?.currentTurn === game?.players[0]?.id ? "Current Turn" : "Waiting"}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="font-medium">Player O</span>
                      </div>
                      <div
                        className={`px-2 py-1 rounded-full text-xs ${game?.currentTurn === game?.players[1]?.id ? "bg-green-500/20 text-green-300" : "bg-white/10 text-white/60"}`}
                      >
                        {game?.currentTurn === game?.players[1]?.id ? "Current Turn" : "Waiting"}
                      </div>
                    </div>

                    <div className="border-t border-white/10 my-4"></div>

                    <div className="text-center">
                      <p className="text-white/80 mb-2">Game Status</p>
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                        ${game?.status === "playing" ? "bg-green-500/20 text-green-300" : ""}
                        ${game?.status === "finished" ? "bg-purple-500/20 text-purple-300" : ""}
                      `}
                      >
                        {game?.status === "playing" ? "In Progress" : "Game Over"}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10 backdrop-blur-md">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      1
                    </span>
                    <span>Take turns placing your mark (X or O) on the board</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      2
                    </span>
                    <span>Get three of your marks in a row (horizontally, vertically, or diagonally) to win</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center mt-0.5">
                      3
                    </span>
                    <span>If all cells are filled and no one has won, the game ends in a draw</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => router.push("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
