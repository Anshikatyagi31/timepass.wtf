"use client"

import { useState, useEffect, useRef, useCallback } from "react"

// Types
export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
export type Position = { x: number; y: number }
export type Snake = Position[]
export type GameStatus = "READY" | "PLAYING" | "PAUSED" | "GAME_OVER"
export type FoodType = "regular" | "bonus" | "special"

export type Food = {
  position: Position
  type: FoodType
  points: number
  expiresAt?: number
  color: string
}

export type GameState = {
  snake: Snake
  food: Food
  direction: Direction
  nextDirection: Direction
  score: number
  highScore: number
  gameStatus: GameStatus
  speed: number
  gridSize: number
  level: number
  particles: Particle[]
}

export type Particle = {
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  life: number
  maxLife: number
}

// Constants
const INITIAL_SNAKE_LENGTH = 3
const CELL_SIZE = 20
const GRID_SIZE = 20
const INITIAL_SPEED = 150
const MAX_PARTICLES = 30

// Helper functions
const createInitialSnake = (gridSize: number): Snake => {
  const middle = Math.floor(gridSize / 2)
  return [
    { x: middle, y: middle },
    { x: middle - 1, y: middle },
    { x: middle - 2, y: middle },
  ]
}

const createFood = (snake: Snake, gridSize: number): Food => {
  // Generate random position that's not on the snake
  let position: Position
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    }
  } while (snake.some((segment) => segment.x === position.x && segment.y === position.y))

  // Determine food type (mostly regular, sometimes bonus or special)
  const rand = Math.random()
  let type: FoodType = "regular"
  let points = 1
  let color = "#4ade80" // Green for regular food

  if (rand > 0.9) {
    type = "bonus"
    points = 3
    color = "#facc15" // Yellow for bonus food
  } else if (rand > 0.97) {
    type = "special"
    points = 5
    color = "#f472b6" // Pink for special food
  }

  return {
    position,
    type,
    points,
    color,
    expiresAt: type !== "regular" ? Date.now() + 5000 : undefined, // Bonus and special food expire after 5 seconds
  }
}

const createParticles = (x: number, y: number, count: number, color: string): Particle[] => {
  const particles: Particle[] = []
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x * CELL_SIZE + CELL_SIZE / 2,
      y: y * CELL_SIZE + CELL_SIZE / 2,
      size: Math.random() * 6 + 2,
      color,
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      life: 1,
      maxLife: 1,
    })
  }
  return particles
}

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: createInitialSnake(GRID_SIZE),
    food: createFood(createInitialSnake(GRID_SIZE), GRID_SIZE),
    direction: "RIGHT",
    nextDirection: "RIGHT",
    score: 0,
    highScore: typeof window !== "undefined" ? Number(localStorage.getItem("snake-high-score") || "0") : 0,
    gameStatus: "READY",
    speed: INITIAL_SPEED,
    gridSize: GRID_SIZE,
    level: 1,
    particles: [],
  })

  const gameLoopRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.gameStatus !== "PLAYING") return

      switch (e.key) {
        case "ArrowUp":
          if (gameState.direction !== "DOWN") {
            setGameState((prev) => ({ ...prev, nextDirection: "UP" }))
          }
          break
        case "ArrowDown":
          if (gameState.direction !== "UP") {
            setGameState((prev) => ({ ...prev, nextDirection: "DOWN" }))
          }
          break
        case "ArrowLeft":
          if (gameState.direction !== "RIGHT") {
            setGameState((prev) => ({ ...prev, nextDirection: "LEFT" }))
          }
          break
        case "ArrowRight":
          if (gameState.direction !== "LEFT") {
            setGameState((prev) => ({ ...prev, nextDirection: "RIGHT" }))
          }
          break
        case " ":
          // Space to pause/resume
          setGameState((prev) => ({
            ...prev,
            gameStatus:
              prev.gameStatus === "PLAYING" ? "PAUSED" : prev.gameStatus === "PAUSED" ? "PLAYING" : prev.gameStatus,
          }))
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameState.direction, gameState.gameStatus])

  // Handle direction change
  const changeDirection = useCallback((newDirection: Direction) => {
    setGameState((prev) => {
      // Prevent 180-degree turns
      if (
        (prev.direction === "UP" && newDirection === "DOWN") ||
        (prev.direction === "DOWN" && newDirection === "UP") ||
        (prev.direction === "LEFT" && newDirection === "RIGHT") ||
        (prev.direction === "RIGHT" && newDirection === "LEFT")
      ) {
        return prev
      }
      return { ...prev, nextDirection: newDirection }
    })
  }, [])

  // Game loop
  const gameLoop = useCallback(
    (timestamp: number) => {
      if (gameState.gameStatus !== "PLAYING") {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
        return
      }

      // Update game at fixed intervals based on speed
      if (timestamp - lastUpdateTimeRef.current < gameState.speed) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
        return
      }

      lastUpdateTimeRef.current = timestamp

      setGameState((prev) => {
        // Update particles
        const updatedParticles = prev.particles
          .map((p) => ({
            ...p,
            x: p.x + p.speedX,
            y: p.y + p.speedY,
            life: p.life - 0.02,
            size: p.size * 0.97,
          }))
          .filter((p) => p.life > 0)

        // Check if bonus/special food expired
        let currentFood = prev.food
        if (currentFood.expiresAt && Date.now() > currentFood.expiresAt) {
          currentFood = createFood(prev.snake, prev.gridSize)
          // Add particles for expired food
          updatedParticles.push(...createParticles(prev.food.position.x, prev.food.position.y, 10, prev.food.color))
        }

        // Move snake
        const head = { ...prev.snake[0] }
        const direction = prev.nextDirection

        switch (direction) {
          case "UP":
            head.y -= 1
            break
          case "DOWN":
            head.y += 1
            break
          case "LEFT":
            head.x -= 1
            break
          case "RIGHT":
            head.x += 1
            break
        }

        // Check for collisions with walls
        if (head.x < 0 || head.x >= prev.gridSize || head.y < 0 || head.y >= prev.gridSize) {
          // Game over - hit wall
          if (typeof window !== "undefined" && prev.score > prev.highScore) {
            localStorage.setItem("snake-high-score", prev.score.toString())
          }

          // Add explosion particles
          const explosionParticles = createParticles(head.x, head.y, 30, "#ef4444")

          return {
            ...prev,
            gameStatus: "GAME_OVER",
            highScore: Math.max(prev.score, prev.highScore),
            particles: [...updatedParticles, ...explosionParticles],
          }
        }

        // Check for collisions with self
        if (prev.snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          // Game over - hit self
          if (typeof window !== "undefined" && prev.score > prev.highScore) {
            localStorage.setItem("snake-high-score", prev.score.toString())
          }

          // Add explosion particles
          const explosionParticles = createParticles(head.x, head.y, 30, "#ef4444")

          return {
            ...prev,
            gameStatus: "GAME_OVER",
            highScore: Math.max(prev.score, prev.highScore),
            particles: [...updatedParticles, ...explosionParticles],
          }
        }

        // Create new snake array with new head
        const newSnake = [head, ...prev.snake]

        // Check if snake ate food
        let ate = false
        if (head.x === currentFood.position.x && head.y === currentFood.position.y) {
          ate = true
        } else {
          // Remove tail if no food was eaten
          newSnake.pop()
        }

        // If food was eaten
        if (ate) {
          const newScore = prev.score + currentFood.points
          const newLevel = Math.floor(newScore / 10) + 1
          const newSpeed = Math.max(INITIAL_SPEED - (newLevel - 1) * 10, 50) // Speed up as level increases, min 50ms

          // Create new food and particles
          const newFood = createFood(newSnake, prev.gridSize)
          const foodParticles = createParticles(currentFood.position.x, currentFood.position.y, 15, currentFood.color)

          return {
            ...prev,
            snake: newSnake,
            food: newFood,
            score: newScore,
            level: newLevel,
            speed: newSpeed,
            direction,
            particles: [...updatedParticles, ...foodParticles].slice(0, MAX_PARTICLES),
          }
        }

        return {
          ...prev,
          snake: newSnake,
          direction,
          particles: updatedParticles,
        }
      })

      gameLoopRef.current = requestAnimationFrame(gameLoop)
    },
    [gameState.gameStatus, gameState.speed],
  )

  // Start/stop game loop
  useEffect(() => {
    if (gameState.gameStatus === "PLAYING" && !gameLoopRef.current) {
      lastUpdateTimeRef.current = performance.now()
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameState.gameStatus, gameLoop])

  // Start game
  const startGame = useCallback(() => {
    setGameState({
      snake: createInitialSnake(GRID_SIZE),
      food: createFood(createInitialSnake(GRID_SIZE), GRID_SIZE),
      direction: "RIGHT",
      nextDirection: "RIGHT",
      score: 0,
      highScore: typeof window !== "undefined" ? Number(localStorage.getItem("snake-high-score") || "0") : 0,
      gameStatus: "PLAYING",
      speed: INITIAL_SPEED,
      gridSize: GRID_SIZE,
      level: 1,
      particles: [],
    })
  }, [])

  // Pause game
  const pauseGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      gameStatus: prev.gameStatus === "PLAYING" ? "PAUSED" : "PLAYING",
    }))
  }, [])

  return {
    gameState,
    startGame,
    pauseGame,
    changeDirection,
    CELL_SIZE,
  }
}
