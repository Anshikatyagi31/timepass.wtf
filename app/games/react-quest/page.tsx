"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Code, BookOpen, Trophy, ArrowLeft, Play, Lightbulb, HelpCircle, Zap } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

// Dynamically import the React component preview
const ComponentPreview = dynamic(() => import("./components/component-preview"), { ssr: false })

// Game levels data
const levels = [
  {
    id: 1,
    title: "Hello React World",
    description: "Create your first React component",
    difficulty: "beginner",
    xpReward: 100,
    initialCode: `function Greeting() {
  // TODO: Return a div with the text "Hello React World!"
  
  return (
    <div>
      
    </div>
  );
}

// Don't modify the export
export default Greeting;`,
    solution: `function Greeting() {
  return (
    <div>
      Hello React World!
    </div>
  );
}

export default Greeting;`,
    hints: [
      "React components return JSX elements",
      "Add your text inside the div element",
      "Make sure to export your component",
    ],
    instructions: "Create a simple React component that displays 'Hello React World!' in a div element.",
    concepts: ["JSX", "Components", "Return statements"],
  },
  {
    id: 2,
    title: "Props Magic",
    description: "Learn to use props in your components",
    difficulty: "beginner",
    xpReward: 150,
    initialCode: `function Greeting(props) {
  // TODO: Use the name prop to display a personalized greeting
  
  return (
    <div>
      
    </div>
  );
}

// Don't modify the export
export default Greeting;`,
    solution: `function Greeting(props) {
  return (
    <div>
      Hello, {props.name}!
    </div>
  );
}

export default Greeting;`,
    hints: [
      "Props are passed to components as function parameters",
      "Use curly braces {} to embed JavaScript expressions in JSX",
      "Access the name with props.name",
    ],
    instructions:
      "Modify the Greeting component to use the 'name' prop to display a personalized greeting like 'Hello, [name]!'",
    concepts: ["Props", "JSX expressions", "Component parameters"],
  },
  {
    id: 3,
    title: "State of Mind",
    description: "Implement useState to create interactive components",
    difficulty: "intermediate",
    xpReward: 200,
    initialCode: `import { useState } from 'react';

function Counter() {
  // TODO: Create a state variable called 'count' with initial value 0
  
  // TODO: Create functions to increment and decrement the count
  
  return (
    <div>
      <h2>Count: ?</h2>
      <button>Increment</button>
      <button>Decrement</button>
    </div>
  );
}

export default Counter;`,
    solution: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;`,
    hints: [
      "Use useState hook to create a state variable",
      "The useState hook returns an array with the state value and a setter function",
      "Use onClick event handlers to call your increment/decrement functions",
    ],
    instructions: "Create a Counter component with buttons to increment and decrement a count value stored in state.",
    concepts: ["useState hook", "Event handlers", "State updates"],
  },
  {
    id: 4,
    title: "Effect Mastery",
    description: "Learn to use useEffect for side effects",
    difficulty: "intermediate",
    xpReward: 250,
    initialCode: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  // TODO: Use useEffect to create a timer that increments 'seconds' every second
  
  return (
    <div>
      <h2>Time elapsed: {seconds} seconds</h2>
      <button>Reset Timer</button>
    </div>
  );
}

export default Timer;`,
    solution: `import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const resetTimer = () => {
    setSeconds(0);
  };
  
  return (
    <div>
      <h2>Time elapsed: {seconds} seconds</h2>
      <button onClick={resetTimer}>Reset Timer</button>
    </div>
  );
}

export default Timer;`,
    hints: [
      "useEffect takes a function and a dependency array",
      "Use setInterval to run code at regular intervals",
      "Clean up the interval in the useEffect return function to prevent memory leaks",
    ],
    instructions: "Create a Timer component that counts seconds and can be reset with a button.",
    concepts: ["useEffect hook", "Cleanup functions", "setInterval"],
  },
  {
    id: 5,
    title: "Context Kingdom",
    description: "Master React Context for state management",
    difficulty: "advanced",
    xpReward: 300,
    initialCode: `import { createContext, useContext, useState } from 'react';

// TODO: Create a ThemeContext

function ThemeProvider({ children }) {
  // TODO: Implement theme state and toggle function
  
  return (
    // TODO: Provide the theme context to children
  );
}

function ThemedButton() {
  // TODO: Consume the theme context
  
  return (
    <button>
      Toggle Theme
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme Context Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

export default App;`,
    solution: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      style={{ 
        backgroundColor: isDark ? '#333' : '#f0f0f0',
        color: isDark ? '#fff' : '#000'
      }}
    >
      Toggle Theme ({isDark ? 'Dark' : 'Light'})
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme Context Example</h1>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

export default App;`,
    hints: [
      "Create a context with createContext()",
      "Use a Provider component to pass the context value down",
      "Consume the context with useContext() hook",
    ],
    instructions:
      "Create a theme context system with a provider and consumer that allows toggling between light and dark themes.",
    concepts: ["Context API", "useContext hook", "Provider pattern"],
  },
]

// Character data
const characters = [
  { id: "wizard", name: "React Wizard", level: 1, xp: 0, maxXp: 100, avatar: "https://images.stockcake.com/public/1/a/6/1a659a35-a804-465d-8c62-36a05b8d394d_large/geometric-anime-portrait-stockcake.jpg" },
  { id: "knight", name: "JSX Knight", level: 1, xp: 0, maxXp: 100, avatar: "https://images.stockcake.com/public/9/a/3/9a3c1f68-7850-408b-97e7-891033488d94_large/warrior-s-crimson-resolve-stockcake.jpg" },
  { id: "ranger", name: "Hook Ranger", level: 1, xp: 0, maxXp: 100, avatar: "https://images.stockcake.com/public/7/b/f/7bfb6dc9-1b44-42cb-9b0c-4ffa24efdea3_large/power-unleashed-now-stockcake.jpg" },
]

export default function ReactQuest() {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0])
  const [currentLevel, setCurrentLevel] = useState(levels[0])
  const [userCode, setUserCode] = useState(currentLevel.initialCode)
  const [showPreview, setShowPreview] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [gameState, setGameState] = useState("character-select") // character-select, playing, level-complete
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [showSolution, setShowSolution] = useState(false)
  const [activeTab, setActiveTab] = useState("code") // Added for automatic tab switching

  // Reset code when level changes
  useEffect(() => {
    setUserCode(currentLevel.initialCode)
    setShowPreview(false)
    setShowHint(false)
    setCurrentHintIndex(0)
    setShowSolution(false)
    setActiveTab("code") // Reset active tab
  }, [currentLevel])

  const handleCharacterSelect = (character: (typeof characters)[0]) => {
    setSelectedCharacter(character)
    setGameState("playing")
  }

  const handleRunCode = () => {
    setShowPreview(true)
    setActiveTab("preview") // Switch to preview tab
  }

  const handleNextHint = () => {
    if (currentHintIndex < currentLevel.hints.length - 1) {
      setCurrentHintIndex((prev) => prev + 1)
    }
  }

  const handlePrevHint = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex((prev) => prev - 1)
    }
  }

  const handleLevelComplete = () => {
    // Add XP to character
    const updatedCharacter = {
      ...selectedCharacter,
      xp: selectedCharacter.xp + currentLevel.xpReward,
    }

    // Level up if enough XP
    if (updatedCharacter.xp >= updatedCharacter.maxXp) {
      updatedCharacter.level += 1
      updatedCharacter.xp = updatedCharacter.xp - updatedCharacter.maxXp
      updatedCharacter.maxXp = Math.floor(updatedCharacter.maxXp * 1.5)
    }

    setSelectedCharacter(updatedCharacter)
    setCompletedLevels([...completedLevels, currentLevel.id])
    setGameState("level-complete")
  }

  const handleSelectLevel = (level: (typeof levels)[0]) => {
    setCurrentLevel(level)
    setGameState("playing")
  }

  const handleShowSolution = () => {
    setShowSolution(true)
    setUserCode(currentLevel.solution)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Header */}
      <header className="p-4 border-b border-white/10 backdrop-blur-lg">
        <div className="container flex justify-between items-center">
          <Link href="/games" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Back to Games</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              React Quest
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        {/* Character Selection Screen */}
        <AnimatePresence mode="wait">
          {gameState === "character-select" && (
            <motion.div
              key="character-select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto my-8"
            >
              <Card className="bg-indigo-950/50 border-indigo-500/30">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Choose Your React Hero</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {characters.map((character) => (
                      <motion.div
                        key={character.id}
                        whileHover={{ scale: 1.05 }}
                        className="bg-indigo-900/50 rounded-lg p-4 text-center cursor-pointer border border-indigo-500/30 hover:border-indigo-400"
                        onClick={() => handleCharacterSelect(character)}
                      >
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-indigo-400">
                          <img
                            src={character.avatar || "/placeholder.svg"}
                            alt={character.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold">{character.name}</h3>
                        <p className="text-indigo-300">Level {character.level}</p>
                        <p className="text-sm text-indigo-300 mt-2">
                          {character.id === "wizard" && "Specializes in React state management"}
                          {character.id === "knight" && "Expert in JSX and component structure"}
                          {character.id === "ranger" && "Master of React hooks and effects"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Game Playing Screen */}
          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4"
            >
              {/* Left Panel - Character & Level Info */}
              <div className="lg:col-span-1">
                <Card className="bg-indigo-950/50 border-indigo-500/30 mb-4">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-400">
                        <img
                          src={selectedCharacter.avatar || "/placeholder.svg"}
                          alt={selectedCharacter.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{selectedCharacter.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                            Level {selectedCharacter.level}
                          </Badge>
                          <span className="text-xs text-indigo-300">
                            XP: {selectedCharacter.xp}/{selectedCharacter.maxXp}
                          </span>
                        </div>
                        <Progress
                          value={(selectedCharacter.xp / selectedCharacter.maxXp) * 100}
                          className="h-2 mt-2 bg-indigo-950"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-indigo-950/50 border-indigo-500/30 mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-lg">Current Quest</h3>
                      <Badge
                        variant="outline"
                        className={
                          currentLevel.difficulty === "beginner"
                            ? "bg-green-500/20 text-green-300 border-green-500/50"
                            : currentLevel.difficulty === "intermediate"
                              ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                              : "bg-red-500/20 text-red-300 border-red-500/50"
                        }
                      >
                        {currentLevel.difficulty}
                      </Badge>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{currentLevel.title}</h4>
                    <p className="text-indigo-300 mb-4">{currentLevel.description}</p>
                    <div className="bg-indigo-900/30 p-3 rounded-md border border-indigo-500/30">
                      <h5 className="font-semibold flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4" />
                        Instructions
                      </h5>
                      <p className="text-sm text-indigo-200">{currentLevel.instructions}</p>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold flex items-center gap-2 mb-2">
                        <Code className="h-4 w-4" />
                        Concepts
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {currentLevel.concepts.map((concept) => (
                          <Badge key={concept} variant="secondary" className="bg-purple-500/20 text-purple-300">
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold flex items-center gap-2 mb-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        Reward
                      </h5>
                      <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50">
                        {currentLevel.xpReward} XP
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-indigo-950/50 border-indigo-500/30">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-3">Quest Log</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {levels.map((level) => (
                        <div
                          key={level.id}
                          onClick={() => handleSelectLevel(level)}
                          className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                            currentLevel.id === level.id
                              ? "bg-indigo-600/50 border border-indigo-400/50"
                              : "bg-indigo-900/30 hover:bg-indigo-800/30 border border-indigo-500/30"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{level.title}</span>
                            <Badge
                              variant="outline"
                              className={
                                level.difficulty === "beginner"
                                  ? "bg-green-500/20 text-green-300 border-green-500/50"
                                  : level.difficulty === "intermediate"
                                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                                    : "bg-red-500/20 text-red-300 border-red-500/50"
                              }
                            >
                              {level.difficulty}
                            </Badge>
                          </div>
                          {completedLevels.includes(level.id) && <Trophy className="h-4 w-4 text-yellow-400" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel - Code Editor & Preview */}
              <div className="lg:col-span-2">
                <Card className="bg-indigo-950/50 border-indigo-500/30 mb-4">
                  <CardContent className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <div className="flex justify-between items-center mb-4">
                        <TabsList className="bg-indigo-900/50">
                          <TabsTrigger value="code" className="data-[state=active]:bg-indigo-700">
                            Code
                          </TabsTrigger>
                          <TabsTrigger value="preview" className="data-[state=active]:bg-indigo-700">
                            Preview
                          </TabsTrigger>
                        </TabsList>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-indigo-700/50 hover:bg-indigo-700 border-indigo-500"
                            onClick={() => setShowHint(!showHint)}
                          >
                            <Lightbulb className="h-4 w-4 mr-1" />
                            Hint
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-yellow-700/50 hover:bg-yellow-700 border-yellow-500"
                            onClick={handleShowSolution}
                          >
                            <HelpCircle className="h-4 w-4 mr-1" />
                            Solution
                          </Button>
                          <Button size="sm" onClick={handleRunCode} className="bg-green-700 hover:bg-green-600">
                            <Play className="h-4 w-4 mr-1" />
                            Run
                          </Button>
                        </div>
                      </div>

                      {showHint && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-indigo-800/50 border border-indigo-500/50 p-3 rounded-md mb-4"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold flex items-center gap-2">
                              <Lightbulb className="h-4 w-4 text-yellow-400" />
                              Hint {currentHintIndex + 1}/{currentLevel.hints.length}
                            </h4>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={currentHintIndex === 0}
                                onClick={handlePrevHint}
                                className="h-7 px-2"
                              >
                                Previous
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={currentHintIndex === currentLevel.hints.length - 1}
                                onClick={handleNextHint}
                                className="h-7 px-2"
                              >
                                Next
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-indigo-200">{currentLevel.hints[currentHintIndex]}</p>
                        </motion.div>
                      )}

                      <TabsContent value="code" className="mt-0">
                        <div className="border border-indigo-500/30 rounded-md overflow-hidden h-[500px]">
                          <MonacoEditor
                            height="500px"
                            language="javascript"
                            theme="vs-dark"
                            value={userCode}
                            onChange={(value) => setUserCode(value || "")}
                            options={{
                              minimap: { enabled: false },
                              scrollBeyondLastLine: false,
                              fontSize: 14,
                              wordWrap: "on",
                            }}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="preview" className="mt-0">
                        <div className="border border-indigo-500/30 rounded-md overflow-hidden bg-white h-[500px]">
                          {showPreview ? (
                            <div className="h-full">
                              <ComponentPreview code={userCode} onComplete={handleLevelComplete} />
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-gray-500">
                              <div className="text-center">
                                <Play className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p>Click "Run" to see your component preview</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Level Complete Screen */}
          {gameState === "level-complete" && (
            <motion.div
              key="level-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-lg mx-auto my-12"
            >
              <Card className="bg-indigo-950/50 border-indigo-500/30">
                <CardContent className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-500/20 flex items-center justify-center"
                  >
                    <Trophy className="h-10 w-10 text-yellow-400" />
                  </motion.div>

                  <h2 className="text-2xl font-bold mb-2">Quest Complete!</h2>
                  <p className="text-indigo-300 mb-6">{currentLevel.title} mastered!</p>

                  <div className="bg-indigo-900/30 p-4 rounded-md border border-indigo-500/30 mb-6">
                    <h3 className="font-semibold mb-2">Rewards</h3>
                    <div className="flex items-center justify-center gap-3">
                      <Badge
                        variant="outline"
                        className="bg-yellow-500/20 text-yellow-300 border-yellow-500/50 text-sm px-3 py-1"
                      >
                        +{currentLevel.xpReward} XP
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-purple-500/20 text-purple-300 border-purple-500/50 text-sm px-3 py-1"
                      >
                        {currentLevel.concepts.join(", ")} mastered
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={() => {
                        // Find next level or go back to first if at end
                        const currentIndex = levels.findIndex((l) => l.id === currentLevel.id)
                        const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : levels[0]
                        setCurrentLevel(nextLevel)
                        setGameState("playing")
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Next Quest
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setGameState("character-select")}
                      className="border-indigo-500 hover:bg-indigo-800/50"
                    >
                      Change Character
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
