"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Play, RotateCcw, Award, BookOpen, Code, Zap, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import CodeEditor from "./components/code-editor"
import Visualizer from "./components/visualizer"
import { challenges } from "./data/challenges"
import { evaluateCode } from "./utils/code-evaluator"

export default function AlgorithmArena() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("arrays")
  const [selectedChallenge, setSelectedChallenge] = useState(challenges.arrays[0])
  const [code, setCode] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [visualizationData, setVisualizationData] = useState<any[]>([])
  const [visualizationStep, setVisualizationStep] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [points, setPoints] = useState(0)
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    // Load saved state from localStorage if available
    const savedCompletedChallenges = localStorage.getItem("completedChallenges")
    const savedPoints = localStorage.getItem("algorithmArenaPoints")

    if (savedCompletedChallenges) {
      setCompletedChallenges(JSON.parse(savedCompletedChallenges))
    }

    if (savedPoints) {
      setPoints(Number.parseInt(savedPoints))
    }

    // Set initial code template
    setCode(selectedChallenge.codeTemplate)
  }, [])

  useEffect(() => {
    // Update code when challenge changes
    setCode(selectedChallenge.codeTemplate)
    setVisualizationData([])
    setVisualizationStep(0)
    setShowHint(false)
  }, [selectedChallenge])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setSelectedChallenge(challenges[value as keyof typeof challenges][0])
  }

  const handleChallengeSelect = (challenge: any) => {
    setSelectedChallenge(challenge)
  }

  const handleRunCode = async () => {
    setIsRunning(true)
    setVisualizationStep(0)

    try {
      const result = await evaluateCode(code, selectedChallenge)

      if (result.success) {
        setVisualizationData(result.visualizationSteps)

        // Check if this challenge was already completed
        if (!completedChallenges.includes(selectedChallenge.id)) {
          const newCompletedChallenges = [...completedChallenges, selectedChallenge.id]
          setCompletedChallenges(newCompletedChallenges)
          localStorage.setItem("completedChallenges", JSON.stringify(newCompletedChallenges))

          const newPoints = points + selectedChallenge.points
          setPoints(newPoints)
          localStorage.setItem("algorithmArenaPoints", newPoints.toString())

          toast({
            title: "Challenge Completed! 🎉",
            description: `You earned ${selectedChallenge.points} points!`,
            variant: "default",
          })
        }
      } else {
        toast({
          title: "Oops! Something's not right",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while running your code",
        variant: "destructive",
      })
    }

    setIsRunning(false)
  }

  const handleReset = () => {
    setCode(selectedChallenge.codeTemplate)
    setVisualizationData([])
    setVisualizationStep(0)
    setShowHint(false)
  }

  const handleShowHint = () => {
    setShowHint(true)
    // Deduct a small amount of points for using a hint
    const newPoints = Math.max(0, points - 5)
    setPoints(newPoints)
    localStorage.setItem("algorithmArenaPoints", newPoints.toString())

    toast({
      title: "Hint Revealed",
      description: "Using hints costs 5 points",
      variant: "default",
    })
  }

  const handleNextStep = () => {
    if (visualizationStep < visualizationData.length - 1) {
      setVisualizationStep(visualizationStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (visualizationStep > 0) {
      setVisualizationStep(visualizationStep - 1)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/95">
      <header className="p-4 border-b border-white/10 backdrop-blur-lg sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <Link href="/games" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Back to Games</span>
          </Link>
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              Algorithm Arena
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-bold">{points} pts</span>
            </div>
            <div className="bg-green-500/20 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="font-bold">{completedChallenges.length} solved</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Challenge Selection Sidebar */}
          <div className="lg:col-span-3">
            <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
              <CardContent className="p-4">
                <Tabs defaultValue="arrays" value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="arrays">Arrays</TabsTrigger>
                    <TabsTrigger value="trees">Trees</TabsTrigger>
                    <TabsTrigger value="graphs">Graphs</TabsTrigger>
                  </TabsList>

                  <TabsContent value="arrays" className="space-y-2 mt-0">
                    {challenges.arrays.map((challenge) => (
                      <motion.div key={challenge.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant={selectedChallenge.id === challenge.id ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto py-3 ${
                            completedChallenges.includes(challenge.id) ? "border-green-500/50" : ""
                          }`}
                          onClick={() => handleChallengeSelect(challenge)}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`rounded-full p-1 ${
                                completedChallenges.includes(challenge.id)
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-primary/20 text-primary"
                              }`}
                            >
                              {completedChallenges.includes(challenge.id) ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Zap className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{challenge.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {challenge.difficulty} · {challenge.points} pts
                              </div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="trees" className="space-y-2 mt-0">
                    {challenges.trees.map((challenge) => (
                      <motion.div key={challenge.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant={selectedChallenge.id === challenge.id ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto py-3 ${
                            completedChallenges.includes(challenge.id) ? "border-green-500/50" : ""
                          }`}
                          onClick={() => handleChallengeSelect(challenge)}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`rounded-full p-1 ${
                                completedChallenges.includes(challenge.id)
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-primary/20 text-primary"
                              }`}
                            >
                              {completedChallenges.includes(challenge.id) ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Zap className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{challenge.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {challenge.difficulty} · {challenge.points} pts
                              </div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="graphs" className="space-y-2 mt-0">
                    {challenges.graphs.map((challenge) => (
                      <motion.div key={challenge.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant={selectedChallenge.id === challenge.id ? "default" : "outline"}
                          className={`w-full justify-start text-left h-auto py-3 ${
                            completedChallenges.includes(challenge.id) ? "border-green-500/50" : ""
                          }`}
                          onClick={() => handleChallengeSelect(challenge)}
                        >
                          <div className="flex items-start gap-2">
                            <div
                              className={`rounded-full p-1 ${
                                completedChallenges.includes(challenge.id)
                                  ? "bg-green-500/20 text-green-500"
                                  : "bg-primary/20 text-primary"
                              }`}
                            >
                              {completedChallenges.includes(challenge.id) ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <Zap className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{challenge.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {challenge.difficulty} · {challenge.points} pts
                              </div>
                            </div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Challenge Description */}
            <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedChallenge.title}</h2>
                    <div className="flex gap-2 mt-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          selectedChallenge.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-500"
                            : selectedChallenge.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {selectedChallenge.difficulty}
                      </span>
                      <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                        {selectedChallenge.points} points
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleShowHint} disabled={showHint}>
                      <BookOpen className="h-4 w-4 mr-1" />
                      Hint (-5 pts)
                    </Button>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p>{selectedChallenge.description}</p>

                  {selectedChallenge.examples && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Examples:</h3>
                      <div className="space-y-2">
                        {selectedChallenge.examples.map((example, index) => (
                          <div key={index} className="bg-background/50 p-3 rounded-md border border-primary/10">
                            <div>
                              <strong>Input:</strong> {example.input}
                            </div>
                            <div>
                              <strong>Output:</strong> {example.output}
                            </div>
                            {example.explanation && (
                              <div>
                                <strong>Explanation:</strong> {example.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {showHint && (
                    <div className="mt-4 bg-primary/10 p-3 rounded-md border border-primary/20">
                      <h3 className="text-lg font-semibold text-primary">Hint:</h3>
                      <p>{selectedChallenge.hint}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Code Editor and Visualizer */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Editor */}
              <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-0 overflow-hidden">
                  <div className="p-4 border-b border-primary/10 flex justify-between items-center">
                    <h3 className="font-semibold">Your Solution</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                      <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                    </div>
                  </div>
                  <div className="h-[400px]">
                    <CodeEditor value={code} onChange={setCode} language="javascript" />
                  </div>
                </CardContent>
              </Card>

              {/* Visualizer */}
              <Card className="bg-background/50 backdrop-blur-sm border border-primary/10">
                <CardContent className="p-0">
                  <div className="p-4 border-b border-primary/10 flex justify-between items-center">
                    <h3 className="font-semibold">Visualization</h3>
                    {visualizationData.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handlePrevStep} disabled={visualizationStep === 0}>
                          Previous
                        </Button>
                        <span className="text-sm">
                          {visualizationStep + 1} / {visualizationData.length}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleNextStep}
                          disabled={visualizationStep === visualizationData.length - 1}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="h-[400px] flex items-center justify-center p-4">
                    {visualizationData.length > 0 ? (
                      <Visualizer data={visualizationData[visualizationStep]} type={selectedChallenge.visualizerType} />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Code className="h-16 w-16 mx-auto mb-4 text-primary/30" />
                        <p>Run your code to see the visualization</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
