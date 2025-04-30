"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import confetti from "canvas-confetti"

// Types
export type Brick = {
  x: number
  y: number
  width: number
  height: number
  color: string
  strength: number
  points: number
  hit: boolean
}

export type PowerUp = {
  x: number
  y: number
  type: "expand" | "shrink" | "multiball" | "slow" | "fast" | "extraLife"
  active: boolean
  width: number
  height: number
  speed: number
}

export type Ball = {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
  speed: number
}

export type GameState = "ready" | "playing" | "paused" | "levelComplete" | "gameOver" | "victory"

export interface BreakoutGameState {
  paddle: {
    x: number
    width: number
    height: number
    speed: number
  }
  balls: Ball[]
  bricks: Brick[]
  powerUps: PowerUp[]
  score: number
  lives: number
  level: number
  gameState: GameState
  highScore: number
}

const COLORS = [
  "#FF5252", // Red
  "#FF7F50", // Coral
  "#FFD700", // Gold
  "#7CFC00", // Lawn Green
  "#00BFFF", // Deep Sky Blue
  "#9370DB", // Medium Purple
  "#FF69B4", // Hot Pink
]

const POWER_UP_COLORS = {
  expand: "#4CAF50",
  shrink: "#F44336",
  multiball: "#2196F3",
  slow: "#9C27B0",
  fast: "#FF9800",
  extraLife: "#E91E63",
}

const POWER_UP_TYPES = ["expand", "shrink", "multiball", "slow", "fast", "extraLife"] as const

const LEVELS = [
  // Level 1 - Simple rows
  {
    rows: 3,
    cols: 8,
    strength: 1,
    powerUpChance: 0.1,
  },
  // Level 2 - More rows
  {
    rows: 4,
    cols: 9,
    strength: 1,
    powerUpChance: 0.15,
  },
  // Level 3 - Some stronger bricks
  {
    rows: 5,
    cols: 10,
    strength: 2,
    powerUpChance: 0.2,
  },
  // Level 4 - Complex pattern
  {
    rows: 6,
    cols: 11,
    strength: 2,
    powerUpChance: 0.25,
  },
  // Level 5 - Final challenge
  {
    rows: 7,
    cols: 12,
    strength: 3,
    powerUpChance: 0.3,
  },
]

export function useBreakoutGame(canvasWidth: number, canvasHeight: number) {
  const [gameState, setGameState] = useState<BreakoutGameState>({
    paddle: {
      x: 0,
      width: 100,
      height: 15,
      speed: 8,
    },
    balls: [],
    bricks: [],
    powerUps: [],
    score: 0,
    lives: 3,
    level: 1,
    gameState: "ready",
    highScore: 0,
  })

  const animationRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const keysPressed = useRef<Set<string>>(new Set())
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const touchStartXRef = useRef<number | null>(null)

  // Initialize game
  const initGame = useCallback(() => {
    // Reset game state
    const initialBall: Ball = {
      x: canvasWidth / 2,
      y: canvasHeight - 50,
      dx: 0,
      dy: 0,
      radius: 8,
      speed: 5,
    }

    const paddleWidth = Math.min(canvasWidth / 5, 100)

    setGameState((prev) => ({
      ...prev,
      paddle: {
        ...prev.paddle,
        x: canvasWidth / 2 - paddleWidth / 2,
        width: paddleWidth,
      },
      balls: [initialBall],
      bricks: generateBricks(canvasWidth, prev.level),
      powerUps: [],
      gameState: "ready",
    }))

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem("breakoutHighScore")
    if (savedHighScore) {
      setGameState((prev) => ({
        ...prev,
        highScore: Number.parseInt(savedHighScore, 10),
      }))
    }
  }, [canvasWidth, canvasHeight])

  // Generate bricks for a level
  const generateBricks = (canvasWidth: number, level: number): Brick[] => {
    const bricks: Brick[] = []
    const levelConfig = LEVELS[level - 1] || LEVELS[0]
    const { rows, cols, strength } = levelConfig

    const brickWidth = (canvasWidth - 20) / cols
    const brickHeight = 25
    const topMargin = 50

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Create patterns based on level
        let brickStrength = strength

        // Skip some bricks to create patterns in higher levels
        if (level > 2) {
          if ((r + c) % 3 === 0 && Math.random() > 0.7) {
            continue
          }
        }

        // Vary strength in higher levels
        if (level > 3) {
          brickStrength = Math.max(1, Math.floor(Math.random() * (strength + 1)))
        }

        bricks.push({
          x: c * brickWidth + 10,
          y: r * brickHeight + topMargin,
          width: brickWidth - 4,
          height: brickHeight - 4,
          color: COLORS[(r + c) % COLORS.length],
          strength: brickStrength,
          points: brickStrength * 10,
          hit: false,
        })
      }
    }

    return bricks
  }

  // Start the game
  const startGame = useCallback(() => {
    if (
      gameState.gameState === "ready" ||
      gameState.gameState === "paused" ||
      gameState.gameState === "levelComplete"
    ) {
      setGameState((prev) => {
        const updatedBalls = prev.balls.map((ball) => ({
          ...ball,
          dx: ball.dx || (Math.random() > 0.5 ? 1 : -1) * ball.speed,
          dy: ball.dy || -ball.speed,
        }))

        return {
          ...prev,
          balls: updatedBalls,
          gameState: "playing",
        }
      })
    }
  }, [gameState.gameState])

  // Pause the game
  const pauseGame = useCallback(() => {
    if (gameState.gameState === "playing") {
      setGameState((prev) => ({
        ...prev,
        gameState: "paused",
      }))
    }
  }, [gameState.gameState])

  // Reset the game
  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      score: 0,
      lives: 3,
      level: 1,
      gameState: "ready",
    }))
    initGame()
  }, [initGame])

  // Next level
  const nextLevel = useCallback(() => {
    setGameState((prev) => {
      const newLevel = prev.level + 1

      if (newLevel > LEVELS.length) {
        // Victory - completed all levels
        return {
          ...prev,
          gameState: "victory",
        }
      }

      return {
        ...prev,
        level: newLevel,
        balls: [
          {
            x: canvasWidth / 2,
            y: canvasHeight - 50,
            dx: 0,
            dy: 0,
            radius: 8,
            speed: 5 + (newLevel - 1) * 0.5, // Increase speed with each level
          },
        ],
        powerUps: [],
        bricks: generateBricks(canvasWidth, newLevel),
        gameState: "ready",
      }
    })
  }, [canvasWidth, canvasHeight])

  // Handle game over
  const handleGameOver = useCallback(() => {
    setGameState((prev) => {
      // Update high score if needed
      const newHighScore = prev.score > prev.highScore ? prev.score : prev.highScore

      if (newHighScore > prev.highScore) {
        localStorage.setItem("breakoutHighScore", newHighScore.toString())
      }

      return {
        ...prev,
        highScore: newHighScore,
        gameState: "gameOver",
      }
    })
  }, [])

  // Handle ball out of bounds
  const handleBallOutOfBounds = useCallback(
    (ballIndex: number) => {
      setGameState((prev) => {
        const updatedBalls = [...prev.balls]
        updatedBalls.splice(ballIndex, 1)

        // If no balls left, lose a life
        if (updatedBalls.length === 0) {
          const newLives = prev.lives - 1

          if (newLives <= 0) {
            return {
              ...prev,
              balls: [],
              lives: 0,
              gameState: "gameOver",
            }
          }

          // Reset ball position
          return {
            ...prev,
            balls: [
              {
                x: canvasWidth / 2,
                y: canvasHeight - 50,
                dx: 0,
                dy: 0,
                radius: 8,
                speed: 5 + (prev.level - 1) * 0.5,
              },
            ],
            lives: newLives,
            gameState: "ready",
          }
        }

        return {
          ...prev,
          balls: updatedBalls,
        }
      })
    },
    [canvasWidth, canvasHeight],
  )

  // Create a power-up
  const createPowerUp = useCallback((x: number, y: number) => {
    const type = POWER_UP_TYPES[Math.floor(Math.random() * POWER_UP_TYPES.length)]

    setGameState((prev) => ({
      ...prev,
      powerUps: [
        ...prev.powerUps,
        {
          x,
          y,
          type,
          active: false,
          width: 30,
          height: 15,
          speed: 2,
        },
      ],
    }))
  }, [])

  // Apply power-up effect
  const applyPowerUp = useCallback(
    (type: PowerUp["type"]) => {
      setGameState((prev) => {
        const updatedState = { ...prev }

        switch (type) {
          case "expand":
            updatedState.paddle.width = Math.min(prev.paddle.width * 1.5, canvasWidth / 3)
            break
          case "shrink":
            updatedState.paddle.width = Math.max(prev.paddle.width * 0.75, 60)
            break
          case "multiball":
            // Add two more balls
            const newBalls = prev.balls.flatMap((ball) => [
              { ...ball },
              { ...ball, dx: -ball.dx, dy: ball.dy },
              { ...ball, dx: ball.dx * 0.8, dy: ball.dy * 1.2 },
            ])
            updatedState.balls = newBalls
            break
          case "slow":
            updatedState.balls = prev.balls.map((ball) => ({
              ...ball,
              speed: Math.max(ball.speed * 0.7, 3),
              dx: ball.dx > 0 ? Math.max(ball.speed * 0.7, 3) : -Math.max(ball.speed * 0.7, 3),
              dy: ball.dy > 0 ? Math.max(ball.speed * 0.7, 3) : -Math.max(ball.speed * 0.7, 3),
            }))
            break
          case "fast":
            updatedState.balls = prev.balls.map((ball) => ({
              ...ball,
              speed: ball.speed * 1.3,
              dx: ball.dx > 0 ? ball.speed * 1.3 : -ball.speed * 1.3,
              dy: ball.dy > 0 ? ball.speed * 1.3 : -ball.speed * 1.3,
            }))
            break
          case "extraLife":
            updatedState.lives = prev.lives + 1
            break
        }

        return updatedState
      })
    },
    [canvasWidth],
  )

  // Game loop
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (!canvasRef.current) return

      const ctx = canvasRef.current.getContext("2d")
      if (!ctx) return

      // Calculate delta time
      const deltaTime = timestamp - (lastTimeRef.current || timestamp)
      lastTimeRef.current = timestamp

      // Clear canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      setGameState((prev) => {
        if (prev.gameState !== "playing") return prev

        const updatedState = { ...prev }

        // Move paddle based on keys pressed
        if (keysPressed.current.has("ArrowLeft") || keysPressed.current.has("a")) {
          updatedState.paddle.x = Math.max(0, updatedState.paddle.x - updatedState.paddle.speed)
        }
        if (keysPressed.current.has("ArrowRight") || keysPressed.current.has("d")) {
          updatedState.paddle.x = Math.min(
            canvasWidth - updatedState.paddle.width,
            updatedState.paddle.x + updatedState.paddle.speed,
          )
        }

        // Update balls
        const updatedBalls = updatedState.balls.map((ball, index) => {
          // If ball is out of bounds
          if (ball.y > canvasHeight + ball.radius) {
            handleBallOutOfBounds(index)
            return ball
          }

          // Move ball
          let newX = ball.x + ball.dx
          let newY = ball.y + ball.dy
          let newDx = ball.dx
          let newDy = ball.dy

          // Wall collisions
          if (newX - ball.radius < 0 || newX + ball.radius > canvasWidth) {
            newDx = -newDx
            newX = newX - ball.radius < 0 ? ball.radius : canvasWidth - ball.radius
          }

          if (newY - ball.radius < 0) {
            newDy = -newDy
            newY = ball.radius
          }

          // Paddle collision
          if (
            newY + ball.radius > canvasHeight - updatedState.paddle.height &&
            newX > updatedState.paddle.x &&
            newX < updatedState.paddle.x + updatedState.paddle.width
          ) {
            // Calculate bounce angle based on where the ball hit the paddle
            const hitPosition = (newX - updatedState.paddle.x) / updatedState.paddle.width
            const bounceAngle = hitPosition * Math.PI - Math.PI / 2

            newDy = -Math.abs(newDy)

            // Add some randomness to the bounce
            newDx = ball.speed * Math.cos(bounceAngle) * 1.5

            // Ensure the ball doesn't get stuck in the paddle
            newY = canvasHeight - updatedState.paddle.height - ball.radius
          }

          // Brick collisions
          updatedState.bricks.forEach((brick, brickIndex) => {
            if (brick.hit) return

            // Check for collision
            if (
              newX + ball.radius > brick.x &&
              newX - ball.radius < brick.x + brick.width &&
              newY + ball.radius > brick.y &&
              newY - ball.radius < brick.y + brick.height
            ) {
              // Determine collision direction
              const overlapLeft = newX + ball.radius - brick.x
              const overlapRight = brick.x + brick.width - (newX - ball.radius)
              const overlapTop = newY + ball.radius - brick.y
              const overlapBottom = brick.y + brick.height - (newY - ball.radius)

              // Find the smallest overlap
              const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom)

              // Bounce based on collision direction
              if (minOverlap === overlapLeft || minOverlap === overlapRight) {
                newDx = -newDx
              } else {
                newDy = -newDy
              }

              // Reduce brick strength or mark as hit
              updatedState.bricks[brickIndex].strength -= 1

              if (updatedState.bricks[brickIndex].strength <= 0) {
                updatedState.bricks[brickIndex].hit = true
                updatedState.score += brick.points

                // Chance to create power-up
                const levelConfig = LEVELS[updatedState.level - 1] || LEVELS[0]
                if (Math.random() < levelConfig.powerUpChance) {
                  createPowerUp(brick.x + brick.width / 2, brick.y + brick.height / 2)
                }
              }
            }
          })

          return {
            ...ball,
            x: newX,
            y: newY,
            dx: newDx,
            dy: newDy,
          }
        })

        // Update power-ups
        const updatedPowerUps = updatedState.powerUps.filter((powerUp) => {
          // Move power-up down
          const newY = powerUp.y + powerUp.speed

          // Check if power-up is caught by paddle
          if (
            newY + powerUp.height > canvasHeight - updatedState.paddle.height &&
            newY < canvasHeight &&
            powerUp.x + powerUp.width > updatedState.paddle.x &&
            powerUp.x < updatedState.paddle.x + updatedState.paddle.width
          ) {
            // Apply power-up effect
            applyPowerUp(powerUp.type)
            return false
          }

          // Remove if out of bounds
          if (newY > canvasHeight) {
            return false
          }

          powerUp.y = newY
          return true
        })

        // Check if level is complete
        const remainingBricks = updatedState.bricks.filter((brick) => !brick.hit).length
        if (remainingBricks === 0) {
          // Trigger confetti
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          })

          return {
            ...updatedState,
            balls: updatedBalls,
            powerUps: updatedPowerUps,
            gameState: "levelComplete",
          }
        }

        return {
          ...updatedState,
          balls: updatedBalls,
          powerUps: updatedPowerUps,
        }
      })

      // Draw game elements
      drawGame(ctx)

      // Continue animation loop
      animationRef.current = requestAnimationFrame(gameLoop)
    },
    [canvasWidth, canvasHeight, handleBallOutOfBounds, createPowerUp, applyPowerUp],
  )

  // Draw game elements
  const drawGame = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // Draw paddle
      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(
        gameState.paddle.x,
        canvasHeight - gameState.paddle.height,
        gameState.paddle.width,
        gameState.paddle.height,
      )

      // Draw balls
      gameState.balls.forEach((ball) => {
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fillStyle = "#FFFFFF"
        ctx.fill()
        ctx.closePath()
      })

      // Draw bricks
      gameState.bricks.forEach((brick) => {
        if (brick.hit) return

        ctx.fillStyle = brick.color
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height)

        // Add 3D effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
        ctx.fillRect(brick.x, brick.y, brick.width, 2)
        ctx.fillRect(brick.x, brick.y, 2, brick.height)

        ctx.fillStyle = "rgba(0, 0, 0, 0.3)"
        ctx.fillRect(brick.x + brick.width - 2, brick.y, 2, brick.height)
        ctx.fillRect(brick.x, brick.y + brick.height - 2, brick.width, 2)

        // Show strength for multi-hit bricks
        if (brick.strength > 1) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(brick.strength.toString(), brick.x + brick.width / 2, brick.y + brick.height / 2 + 4)
        }
      })

      // Draw power-ups
      gameState.powerUps.forEach((powerUp) => {
        ctx.fillStyle = POWER_UP_COLORS[powerUp.type] || "#FFFFFF"
        ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height)

        // Draw power-up icon/symbol
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"

        let symbol = "?"
        switch (powerUp.type) {
          case "expand":
            symbol = "+"
            break
          case "shrink":
            symbol = "-"
            break
          case "multiball":
            symbol = "*"
            break
          case "slow":
            symbol = "↓"
            break
          case "fast":
            symbol = "↑"
            break
          case "extraLife":
            symbol = "♥"
            break
        }

        ctx.fillText(symbol, powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2 + 3)
      })

      // Draw game state messages
      if (gameState.gameState !== "playing") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(0, canvasHeight / 2 - 40, canvasWidth, 80)

        ctx.fillStyle = "#FFFFFF"
        ctx.font = "24px Arial"
        ctx.textAlign = "center"

        let message = ""
        switch (gameState.gameState) {
          case "ready":
            message = "Press SPACE to start"
            break
          case "paused":
            message = "PAUSED - Press SPACE to resume"
            break
          case "levelComplete":
            message = `Level ${gameState.level} Complete! Press SPACE for next level`
            break
          case "gameOver":
            message = "GAME OVER - Press R to restart"
            break
          case "victory":
            message = "VICTORY! You completed all levels! Press R to play again"
            break
        }

        ctx.fillText(message, canvasWidth / 2, canvasHeight / 2)

        if (gameState.gameState === "gameOver" || gameState.gameState === "victory") {
          ctx.font = "18px Arial"
          ctx.fillText(
            `Final Score: ${gameState.score} - High Score: ${gameState.highScore}`,
            canvasWidth / 2,
            canvasHeight / 2 + 30,
          )
        }
      }

      // Draw score and lives
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "16px Arial"
      ctx.textAlign = "left"
      ctx.fillText(`Score: ${gameState.score}`, 10, 25)
      ctx.fillText(`Level: ${gameState.level}`, canvasWidth / 2 - 30, 25)

      // Draw lives
      ctx.textAlign = "right"
      ctx.fillText(`Lives: ${gameState.lives}`, canvasWidth - 10, 25)
    },
    [gameState, canvasHeight, canvasWidth],
  )

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key)

      // Game controls
      switch (e.key) {
        case " ":
          if (gameState.gameState === "ready" || gameState.gameState === "paused") {
            startGame()
          } else if (gameState.gameState === "levelComplete") {
            nextLevel()
          } else if (gameState.gameState === "playing") {
            pauseGame()
          }
          break
        case "r":
        case "R":
          if (gameState.gameState === "gameOver" || gameState.gameState === "victory") {
            resetGame()
          }
          break
        case "p":
        case "P":
          if (gameState.gameState === "playing") {
            pauseGame()
          } else if (gameState.gameState === "paused") {
            startGame()
          }
          break
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [gameState.gameState, startGame, pauseGame, resetGame, nextLevel])

  // Handle touch events for mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartXRef.current = e.touches[0].clientX

        // Start game on touch if ready
        if (gameState.gameState === "ready" || gameState.gameState === "levelComplete") {
          startGame()
        } else if (gameState.gameState === "gameOver" || gameState.gameState === "victory") {
          resetGame()
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && touchStartXRef.current !== null && gameState.gameState === "playing") {
        const touchX = e.touches[0].clientX
        const deltaX = touchX - touchStartXRef.current

        setGameState((prev) => {
          const newX = Math.max(0, Math.min(canvasWidth - prev.paddle.width, prev.paddle.x + deltaX))
          return {
            ...prev,
            paddle: {
              ...prev.paddle,
              x: newX,
            },
          }
        })

        touchStartXRef.current = touchX
      }
    }

    const handleTouchEnd = () => {
      touchStartXRef.current = null
    }

    if (canvasRef.current) {
      canvasRef.current.addEventListener("touchstart", handleTouchStart)
      canvasRef.current.addEventListener("touchmove", handleTouchMove)
      canvasRef.current.addEventListener("touchend", handleTouchEnd)
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("touchstart", handleTouchStart)
        canvasRef.current.removeEventListener("touchmove", handleTouchMove)
        canvasRef.current.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [gameState.gameState, canvasWidth, startGame, resetGame])

  // Start/stop game loop
  useEffect(() => {
    initGame()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initGame])

  // Start animation loop when canvas is ready
  useEffect(() => {
    if (canvasRef.current) {
      animationRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameLoop])

  return {
    gameState,
    canvasRef,
    startGame,
    pauseGame,
    resetGame,
    nextLevel,
  }
}
