export interface Joke {
    id: string
    setup: string
    punchline?: string
    expectedOutput: string
    initialCode: string
    hint?: string
  }
  
  export interface Level {
    id: string
    name: string
    description: string
    difficulty: string
    pointsPerJoke: number
    jokes: Joke[]
  }
  
  export interface Challenge {
    id: string
    title: string
    description: string
    type: "code" | "completion" | "drag-n-drop" | "multiple-choice"
    difficulty: "beginner" | "intermediate" | "advanced" | "expert"
    expectedOutput?: string
    expectedResult?: any
    initialCode?: string
    hints?: string[]
    explanation?: string
    testCases?: TestCase[]
    visualizerType?: "array" | "object" | "string" | "dom" | "animation"
  }
  
  export interface TestCase {
    input: any[]
    expectedOutput: any
    description: string
  }
  
  export interface ChallengeCategory {
    id: string
    name: string
    description: string
    icon: string
    pointsPerChallenge: number
    challenges: Challenge[]
  }
  
  export interface Achievement {
    id: string
    name: string
    description: string
    icon: string
    unlocked: boolean
  }
  