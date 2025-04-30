"use client"

import { useState, useEffect, useCallback } from "react"
import {
  type CrosswordCell,
  type CrosswordClue,
  type CrosswordPuzzle,
  getRandomPuzzle,
  initializeCrosswordGrid,
} from "@/app/games/crossword/data"

export interface CrosswordState {
  puzzle: CrosswordPuzzle
  grid: CrosswordCell[][]
  selectedCell: { row: number; col: number } | null
  selectedDirection: "across" | "down"
  selectedClue: CrosswordClue | null
  isComplete: boolean
  timer: number
  score: number
}

export function useCrossword() {
  const [puzzle, setPuzzle] = useState<CrosswordPuzzle | null>(null)
  const [grid, setGrid] = useState<CrosswordCell[][]>([])
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null)
  const [selectedDirection, setSelectedDirection] = useState<"across" | "down">("across")
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [timer, setTimer] = useState(0)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize the puzzle
  useEffect(() => {
    const newPuzzle = getRandomPuzzle()
    setPuzzle(newPuzzle)
    const initialGrid = initializeCrosswordGrid(newPuzzle)
    setGrid(initialGrid)

    // Find first filled cell to select initially
    let firstFilledCell = null
    for (let i = 0; i < newPuzzle.size.rows; i++) {
      for (let j = 0; j < newPuzzle.size.cols; j++) {
        if (newPuzzle.grid[i][j] !== "") {
          firstFilledCell = { row: i, col: j }
          break
        }
      }
      if (firstFilledCell) break
    }

    if (firstFilledCell) {
      setSelectedCell(firstFilledCell)

      // Find the clue for this cell
      const acrossClue = newPuzzle.clues.across.find(
        (clue) =>
          clue.startRow === firstFilledCell?.row &&
          clue.startCol <= firstFilledCell?.col &&
          clue.startCol + clue.length > firstFilledCell?.col,
      )

      if (acrossClue) {
        setSelectedClue(acrossClue)
        setSelectedDirection("across")
      } else {
        const downClue = newPuzzle.clues.down.find(
          (clue) =>
            clue.startCol === firstFilledCell?.col &&
            clue.startRow <= firstFilledCell?.row &&
            clue.startRow + clue.length > firstFilledCell?.row,
        )
        if (downClue) {
          setSelectedClue(downClue)
          setSelectedDirection("down")
        }
      }
    }

    setIsLoading(false)
  }, [])

  // Timer effect
  useEffect(() => {
    if (!isComplete && puzzle) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isComplete, puzzle])

  // Check if puzzle is complete
  useEffect(() => {
    if (grid.length === 0) return

    let complete = true
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].filled && grid[i][j].value.toLowerCase() !== puzzle?.grid[i][j].toLowerCase()) {
          complete = false
          break
        }
      }
      if (!complete) break
    }

    if (complete) {
      setIsComplete(true)
      // Calculate score based on difficulty and time
      const baseScore = puzzle?.difficulty === "easy" ? 1000 : puzzle?.difficulty === "medium" ? 2000 : 3000
      const timeDeduction = Math.floor(timer / 10)
      setScore(Math.max(baseScore - timeDeduction, 100))
    }
  }, [grid, puzzle, timer])

  // Select a cell
  const selectCell = useCallback(
    (row: number, col: number) => {
      if (!puzzle || row < 0 || row >= puzzle.size.rows || col < 0 || col >= puzzle.size.cols) return
      if (!grid[row][col].filled) return

      // Update grid with new selection
      setGrid((prev) => {
        const newGrid = prev.map((r) =>
          r.map((cell) => ({
            ...cell,
            isSelected: cell.row === row && cell.col === col,
            isHighlighted: false,
          })),
        )

        // Highlight cells in the same word
        if (selectedDirection === "across") {
          // Find the start and end of the word
          let startCol = col
          while (startCol > 0 && newGrid[row][startCol - 1].filled) {
            startCol--
          }

          let endCol = col
          while (endCol < puzzle.size.cols - 1 && newGrid[row][endCol + 1].filled) {
            endCol++
          }

          // Highlight the word
          for (let c = startCol; c <= endCol; c++) {
            newGrid[row][c].isHighlighted = true
          }

          // Find the clue for this word
          const clue = puzzle.clues.across.find((c) => c.startRow === row && c.startCol === startCol)
          if (clue) {
            setSelectedClue(clue)
          }
        } else {
          // Find the start and end of the word
          let startRow = row
          while (startRow > 0 && newGrid[startRow - 1][col].filled) {
            startRow--
          }

          let endRow = row
          while (endRow < puzzle.size.rows - 1 && newGrid[endRow + 1][col].filled) {
            endRow++
          }

          // Highlight the word
          for (let r = startRow; r <= endRow; r++) {
            newGrid[r][col].isHighlighted = true
          }

          // Find the clue for this word
          const clue = puzzle.clues.down.find((c) => c.startCol === col && c.startRow === startRow)
          if (clue) {
            setSelectedClue(clue)
          }
        }

        return newGrid
      })

      setSelectedCell({ row, col })
    },
    [puzzle, grid, selectedDirection],
  )

  // Toggle direction
  const toggleDirection = useCallback(() => {
    if (!selectedCell) return

    const newDirection = selectedDirection === "across" ? "down" : "across"
    setSelectedDirection(newDirection)

    // Re-select the cell to update highlighting
    selectCell(selectedCell.row, selectedCell.col)
  }, [selectedCell, selectedDirection, selectCell])

  // Enter a letter
  const enterLetter = useCallback(
    (letter: string) => {
      if (!selectedCell || !puzzle) return

      const { row, col } = selectedCell

      // Update the grid
      setGrid((prev) => {
        const newGrid = [...prev]
        newGrid[row][col] = {
          ...newGrid[row][col],
          value: letter.toUpperCase(),
          isError: letter.toUpperCase() !== puzzle.grid[row][col],
        }
        return newGrid
      })

      // Move to next cell
      if (selectedDirection === "across") {
        const nextCol = col + 1
        while (nextCol < puzzle.size.cols && grid[row][nextCol] && grid[row][nextCol].filled) {
          selectCell(row, nextCol)
          break
        }
      } else {
        const nextRow = row + 1
        while (nextRow < puzzle.size.rows && grid[nextRow][col] && grid[nextRow][col].filled) {
          selectCell(nextRow, col)
          break
        }
      }
    },
    [selectedCell, puzzle, grid, selectedDirection, selectCell],
  )

  // Delete a letter
  const deleteLetter = useCallback(() => {
    if (!selectedCell) return

    const { row, col } = selectedCell

    // Update the grid
    setGrid((prev) => {
      const newGrid = [...prev]
      newGrid[row][col] = {
        ...newGrid[row][col],
        value: "",
        isError: false,
      }
      return newGrid
    })

    // Move to previous cell
    if (selectedDirection === "across") {
      const prevCol = col - 1
      while (prevCol >= 0 && grid[row][prevCol] && grid[row][prevCol].filled) {
        selectCell(row, prevCol)
        break
      }
    } else {
      const prevRow = row - 1
      while (prevRow >= 0 && grid[prevRow][col] && grid[prevRow][col].filled) {
        selectCell(prevRow, col)
        break
      }
    }
  }, [selectedCell, grid, selectedDirection, selectCell])

  // Reveal the current cell
  const revealCell = useCallback(() => {
    if (!selectedCell || !puzzle) return

    const { row, col } = selectedCell

    setGrid((prev) => {
      const newGrid = [...prev]
      newGrid[row][col] = {
        ...newGrid[row][col],
        value: puzzle.grid[row][col],
        isRevealed: true,
        isError: false,
      }
      return newGrid
    })
  }, [selectedCell, puzzle])

  // Reveal the entire puzzle
  const revealPuzzle = useCallback(() => {
    if (!puzzle) return

    setGrid((prev) => {
      return prev.map((row, i) =>
        row.map((cell, j) => ({
          ...cell,
          value: puzzle.grid[i][j],
          isRevealed: cell.filled,
          isError: false,
        })),
      )
    })

    setIsComplete(true)
  }, [puzzle])

  // Select a clue
  const selectClue = useCallback(
    (clue: CrosswordClue) => {
      setSelectedClue(clue)
      setSelectedDirection(clue.direction)
      selectCell(clue.startRow, clue.startCol)
    },
    [selectCell],
  )

  // Reset the puzzle
  const resetPuzzle = useCallback(() => {
    if (!puzzle) return

    const initialGrid = initializeCrosswordGrid(puzzle)
    setGrid(initialGrid)
    setIsComplete(false)
    setTimer(0)
    setScore(0)

    // Find first filled cell
    let firstFilledCell = null
    for (let i = 0; i < puzzle.size.rows; i++) {
      for (let j = 0; j < puzzle.size.cols; j++) {
        if (puzzle.grid[i][j] !== "") {
          firstFilledCell = { row: i, col: j }
          break
        }
      }
      if (firstFilledCell) break
    }

    if (firstFilledCell) {
      setSelectedCell(firstFilledCell)
    }
  }, [puzzle])

  // Format timer
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }, [])

  return {
    puzzle,
    grid,
    selectedCell,
    selectedDirection,
    selectedClue,
    isComplete,
    timer,
    score,
    isLoading,
    selectCell,
    toggleDirection,
    enterLetter,
    deleteLetter,
    revealCell,
    revealPuzzle,
    selectClue,
    resetPuzzle,
    formatTime,
  }
}
