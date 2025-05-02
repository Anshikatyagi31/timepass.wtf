"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Play, Save, Trash2 } from "lucide-react"
import CodeEditor from "./code-editor"

export default function CodePlayground() {
  const [code, setCode] = useState(`// Welcome to the JavaScript Playground!
// Here you can experiment with any JavaScript code.
// Try out the examples below or write your own code.

// Example 1: Array Methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

// Example 2: String Manipulation
const message = "Hello, JavaScript!";
console.log("Uppercase:", message.toUpperCase());
console.log("Contains 'Script':", message.includes("Script"));

// Example 3: Object Operations
const person = {
  name: "Alex",
  age: 28,
  hobbies: ["coding", "reading"]
};
console.log("Person's hobbies:", person.hobbies.join(", "));

// Now try your own code below!
`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [savedSnippets, setSavedSnippets] = useState<string[]>([])
  const consoleOutputRef = useRef<HTMLDivElement>(null)

  const runCode = () => {
    setIsRunning(true)
    setOutput("")

    // Create a mock console
    const originalConsole = { ...console }
    const logs: string[] = []

    console.log = (...args) => {
      const formatted = args
        .map((arg) => (typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)))
        .join(" ")
      logs.push(formatted)
      originalConsole.log(...args)
    }

    console.error = (...args) => {
      const formatted = args.map((arg) => String(arg)).join(" ")
      logs.push(`Error: ${formatted}`)
      originalConsole.error(...args)
    }

    console.warn = (...args) => {
      const formatted = args.map((arg) => String(arg)).join(" ")
      logs.push(`Warning: ${formatted}`)
      originalConsole.warn(...args)
    }

    try {
      // Execute the code
      eval(code)
      setOutput(logs.join("\n"))
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      // Restore original console
      console.log = originalConsole.log
      console.error = originalConsole.error
      console.warn = originalConsole.warn
      setIsRunning(false)

      // Scroll to bottom of output
      if (consoleOutputRef.current) {
        consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight
      }
    }
  }

  const saveSnippet = () => {
    setSavedSnippets([...savedSnippets, code])

    // Show toast or notification
    alert("Code snippet saved!")
  }

  const loadSnippet = (index: number) => {
    setCode(savedSnippets[index])
  }

  const clearOutput = () => {
    setOutput("")
  }

  return (
    <div className="space-y-6">
      <motion.div
        className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-6 shadow-xl border border-purple-500/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
          Code Punchline - Timepass.wtf
        </h2>
        <p className="text-purple-200 mb-4">
          Experiment with JavaScript code in this sandbox environment. Try out different methods, test ideas, and see
          the results instantly.
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={runCode}
            disabled={isRunning}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <Play className="w-4 h-4 mr-2" /> Run Code
          </Button>

          <Button
            onClick={saveSnippet}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" /> Save Snippet
          </Button>

          <Button
            onClick={clearOutput}
            variant="outline"
            className="bg-purple-800/50 hover:bg-purple-700/50 border-purple-600/30 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Clear Output
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CodeEditor code={code} setCode={setCode} onRun={runCode} />
        </div>

        <div className="lg:col-span-1">
          <motion.div
            className="rounded-xl overflow-hidden border-2 border-purple-500/50 bg-gray-900 shadow-xl shadow-purple-900/20 h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-gray-400 text-sm font-mono">console</span>
            </div>

            <div
              ref={consoleOutputRef}
              className="p-4 font-mono text-sm text-gray-200 h-[400px] overflow-y-auto whitespace-pre-wrap"
            >
              {output || <span className="text-gray-500">// Console output will appear here</span>}
            </div>
          </motion.div>
        </div>
      </div>

      {savedSnippets.length > 0 && (
        <motion.div
          className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-6 shadow-xl border border-purple-500/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-bold mb-4 text-purple-200">Saved Snippets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedSnippets.map((snippet, index) => (
              <motion.div
                key={index}
                className="bg-purple-900/60 p-4 rounded-lg cursor-pointer hover:bg-purple-800/60 transition-colors"
                onClick={() => loadSnippet(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-xs text-gray-400 mb-2">Snippet {index + 1}</div>
                <div className="text-xs font-mono line-clamp-3 text-purple-200">{snippet.substring(0, 150)}...</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
