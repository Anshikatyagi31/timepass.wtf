import type { NextRequest } from "next/server"
import type { Server as SocketIOServer } from "socket.io"

// Store for active connections and game rooms
let io: SocketIOServer | null = null
const gameRooms = new Map()

export async function GET(req: NextRequest) {
  // Get the pathname from the URL
  const searchParams = new URL(req.url).searchParams
  const socketPath = searchParams.get("path") || "/api/socket"

  if (!io) {
    // Create a new Socket.IO server if one doesn't exist
    const { createServer } = await import("http")
    const { Server } = await import("socket.io")

    // Create a simple HTTP server
    const httpServer = createServer()

    // Initialize Socket.IO server with CORS settings
    io = new Server(httpServer, {
      path: socketPath,
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    })

    // Set up Socket.IO event handlers
    io.on("connection", (socket) => {
      console.log("New client connected", socket.id)

      socket.on("create-game", (gameId) => {
        // Create a new game room
        gameRooms.set(gameId, {
          id: gameId,
          players: [{ id: socket.id, mark: "X" }],
          currentTurn: socket.id,
          board: Array(9).fill(null),
          status: "waiting",
        })

        socket.join(gameId)
        socket.emit("game-created", gameRooms.get(gameId))
      })

      socket.on("join-game", (gameId) => {
        const gameRoom = gameRooms.get(gameId)

        if (!gameRoom) {
          socket.emit("error", "Game not found")
          return
        }

        if (gameRoom.players.length >= 2) {
          socket.emit("error", "Game is full")
          return
        }

        // Add player to the game
        gameRoom.players.push({ id: socket.id, mark: "O" })
        gameRoom.status = "playing"

        socket.join(gameId)
        io.to(gameId).emit("game-joined", gameRoom)
      })

      socket.on("make-move", ({ gameId, index }) => {
        const gameRoom = gameRooms.get(gameId)

        if (!gameRoom) {
          socket.emit("error", "Game not found")
          return
        }

        if (gameRoom.status !== "playing") {
          socket.emit("error", "Game is not in progress")
          return
        }

        if (gameRoom.currentTurn !== socket.id) {
          socket.emit("error", "Not your turn")
          return
        }

        if (gameRoom.board[index] !== null) {
          socket.emit("error", "Cell already taken")
          return
        }

        // Find player mark
        const player = gameRoom.players.find((p) => p.id === socket.id)

        // Update board
        gameRoom.board[index] = player.mark

        // Check for winner
        const winner = checkWinner(gameRoom.board)
        if (winner) {
          gameRoom.status = "finished"
          gameRoom.winner = socket.id
          io.to(gameId).emit("game-over", { winner, board: gameRoom.board })
          return
        }

        // Check for draw
        if (!gameRoom.board.includes(null)) {
          gameRoom.status = "finished"
          io.to(gameId).emit("game-over", { draw: true, board: gameRoom.board })
          return
        }

        // Switch turns
        gameRoom.currentTurn = gameRoom.players.find((p) => p.id !== socket.id).id

        // Emit updated game state
        io.to(gameId).emit("move-made", gameRoom)
      })

      socket.on("restart-game", (gameId) => {
        const gameRoom = gameRooms.get(gameId)

        if (!gameRoom) {
          socket.emit("error", "Game not found")
          return
        }

        // Reset game state
        gameRoom.board = Array(9).fill(null)
        gameRoom.status = "playing"
        gameRoom.winner = null

        // Switch starting player
        const firstPlayer = gameRoom.players[1]
        gameRoom.players[1] = gameRoom.players[0]
        gameRoom.players[0] = firstPlayer
        gameRoom.currentTurn = firstPlayer.id

        io.to(gameId).emit("game-restarted", gameRoom)
      })

      socket.on("disconnect", () => {
        // Find and clean up any games this player was in
        for (const [gameId, game] of gameRooms.entries()) {
          if (game.players.some((p) => p.id === socket.id)) {
            io.to(gameId).emit("player-disconnected")
            gameRooms.delete(gameId)
          }
        }
      })
    })

    // Start the server on a random port
    httpServer.listen(0)
  }

  // Return a response to keep the connection alive
  return new Response("Socket.io server is running", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-store, max-age=0",
    },
  })
}

// Helper function to check for a winner
function checkWinner(board) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}
