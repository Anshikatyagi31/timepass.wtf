export interface CrosswordCell {
    row: number
    col: number
    value: string
    filled: boolean
    number?: number
    acrossClueIndex?: number
    downClueIndex?: number
    isRevealed: boolean
    isError: boolean
    isHighlighted: boolean
    isSelected: boolean
  }
  
  export interface CrosswordClue {
    number: number
    clue: string
    answer: string
    direction: "across" | "down"
    startRow: number
    startCol: number
    length: number
  }
  
  export interface CrosswordPuzzle {
    id: string
    title: string
    difficulty: "easy" | "medium" | "hard"
    size: { rows: number; cols: number }
    clues: {
      across: CrosswordClue[]
      down: CrosswordClue[]
    }
    grid: string[][]
  }
  
  export const puzzles: CrosswordPuzzle[] = [
    {
      id: "tech-puzzle-1",
      title: "Tech & Gaming",
      difficulty: "medium",
      size: { rows: 9, cols: 9 },
      grid: [
        ["B", "L", "O", "C", "K", "C", "H", "A", "I"],
        ["A", "", "N", "", "E", "", "T", "", "N"],
        ["C", "L", "O", "U", "D", "", "M", "A", "P"],
        ["K", "", "L", "", "I", "", "L", "", "U"],
        ["E", "S", "I", "N", "T", "E", "L", "", "T"],
        ["N", "", "N", "", "O", "", "", "", ""],
        ["D", "E", "E", "P", "R", "A", "Y", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
      ],
      clues: {
        across: [
          {
            number: 1,
            clue: "Distributed ledger technology behind cryptocurrencies",
            answer: "BLOCKCHAIN",
            direction: "across",
            startRow: 0,
            startCol: 0,
            length: 10,
          },
          {
            number: 3,
            clue: "Computing service delivered over the internet",
            answer: "CLOUD",
            direction: "across",
            startRow: 2,
            startCol: 0,
            length: 5,
          },
          {
            number: 4,
            clue: "Visual representation of game levels",
            answer: "MAP",
            direction: "across",
            startRow: 2,
            startCol: 6,
            length: 3,
          },
          {
            number: 6,
            clue: "Environmental, Social, and Intelligence gathering",
            answer: "ESINTEL",
            direction: "across",
            startRow: 4,
            startCol: 0,
            length: 7,
          },
          {
            number: 8,
            clue: "AI rendering technology used in modern games",
            answer: "DEEPRAY",
            direction: "across",
            startRow: 6,
            startCol: 0,
            length: 7,
          },
        ],
        down: [
          {
            number: 1,
            clue: "Security measure to prevent unauthorized access",
            answer: "BACKEND",
            direction: "down",
            startRow: 0,
            startCol: 0,
            length: 7,
          },
          {
            number: 2,
            clue: "Online gaming identity",
            answer: "AVATAR",
            direction: "down",
            startRow: 0,
            startCol: 2,
            length: 6,
          },
          {
            number: 3,
            clue: "Editor used for coding",
            answer: "CODEDIT",
            direction: "down",
            startRow: 0,
            startCol: 4,
            length: 7,
          },
          {
            number: 5,
            clue: "Hardware that processes graphics",
            answer: "HTML",
            direction: "down",
            startRow: 0,
            startCol: 6,
            length: 4,
          },
          {
            number: 7,
            clue: "Input device for gaming",
            answer: "INPUT",
            direction: "down",
            startRow: 0,
            startCol: 8,
            length: 5,
          },
        ],
      },
    },
    {
      id: "pop-culture-1",
      title: "Pop Culture",
      difficulty: "easy",
      size: { rows: 7, cols: 7 },
      grid: [
        ["M", "A", "R", "V", "E", "L", ""],
        ["O", "", "E", "", "M", "", ""],
        ["V", "I", "D", "E", "O", "", ""],
        ["I", "", "D", "", "J", "", ""],
        ["E", "P", "I", "C", "", "", ""],
        ["", "", "T", "", "", "", ""],
        ["", "", "", "", "", "", ""],
      ],
      clues: {
        across: [
          {
            number: 1,
            clue: "Comic book company behind Iron Man and Spider-Man",
            answer: "MARVEL",
            direction: "across",
            startRow: 0,
            startCol: 0,
            length: 6,
          },
          {
            number: 3,
            clue: "Moving picture content",
            answer: "VIDEO",
            direction: "across",
            startRow: 2,
            startCol: 0,
            length: 5,
          },
          {
            number: 5,
            clue: "Legendary or heroic",
            answer: "EPIC",
            direction: "across",
            startRow: 4,
            startCol: 0,
            length: 4,
          },
        ],
        down: [
          {
            number: 1,
            clue: "Film or show",
            answer: "MOVIE",
            direction: "down",
            startRow: 0,
            startCol: 0,
            length: 5,
          },
          {
            number: 2,
            clue: "Digital content platform",
            answer: "REDDIT",
            direction: "down",
            startRow: 0,
            startCol: 2,
            length: 6,
          },
          {
            number: 4,
            clue: "Disc jockey abbreviation",
            answer: "EMOJ",
            direction: "down",
            startRow: 0,
            startCol: 4,
            length: 4,
          },
        ],
      },
    },
  ]
  
  export function getRandomPuzzle(): CrosswordPuzzle {
    const randomIndex = Math.floor(Math.random() * puzzles.length)
    return puzzles[randomIndex]
  }
  
  export function initializeCrosswordGrid(puzzle: CrosswordPuzzle): CrosswordCell[][] {
    const { rows, cols } = puzzle.size
    const grid: CrosswordCell[][] = []
  
    // Initialize empty grid
    for (let i = 0; i < rows; i++) {
      grid[i] = []
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          row: i,
          col: j,
          value: "",
          filled: puzzle.grid[i][j] !== "",
          isRevealed: false,
          isError: false,
          isHighlighted: false,
          isSelected: false,
        }
      }
    }
  
    // Add clue numbers
    let clueNumber = 1
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (grid[i][j].filled) {
          let isStartOfAcross = false
          let isStartOfDown = false
  
          // Check if this is the start of an across clue
          if (j === 0 || !grid[i][j - 1].filled) {
            if (j < cols - 1 && grid[i][j + 1].filled) {
              isStartOfAcross = true
            }
          }
  
          // Check if this is the start of a down clue
          if (i === 0 || !grid[i - 1][j].filled) {
            if (i < rows - 1 && grid[i + 1][j].filled) {
              isStartOfDown = true
            }
          }
  
          if (isStartOfAcross || isStartOfDown) {
            grid[i][j].number = clueNumber++
          }
        }
      }
    }
  
    return grid
  }
  