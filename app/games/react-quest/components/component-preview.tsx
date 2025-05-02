"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

interface ComponentPreviewProps {
  code: string
  onComplete: () => void
}

export default function ComponentPreview({ code, onComplete }: ComponentPreviewProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [renderedComponent, setRenderedComponent] = useState<React.ReactNode | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    const timeout = setTimeout(() => {
      try {
        // This is a simplified version for the demo
        // In a real implementation, we would use a sandboxed environment
        // to safely evaluate and render the code

        // Check if the code matches expected patterns
        const isCorrect = validateCode(code)

        if (isCorrect) {
          setSuccess(true)
          // In a real implementation, we would render the actual component
          setRenderedComponent(<div className="p-4">Component rendered successfully!</div>)

          // Notify parent that level is complete
          setTimeout(() => {
            onComplete()
          }, 1500)
        } else {
          setError("Your solution doesn't match the expected output. Try again!")
        }
      } catch (err) {
        setError(`Error: ${err instanceof Error ? err.message : "Unknown error"}`)
      } finally {
        setLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timeout)
  }, [code, onComplete])

  // Simple validation function - in a real implementation this would be more sophisticated
  const validateCode = (code: string): boolean => {
    // Check for common patterns that should be in the solution
    if (code.includes("Hello React World!")) return true
    if (code.includes("Hello, {props.name}!")) return true
    if (code.includes("useState(0)") && code.includes("onClick={increment}")) return true
    if (code.includes("useEffect") && code.includes("setInterval")) return true
    if (code.includes("ThemeContext") && code.includes("useContext")) return true

    return false
  }

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-100 border-b border-gray-300 p-2 text-gray-700 text-sm flex items-center">
        <span>Preview</span>
      </div>

      <div className="flex-1 p-4 bg-white text-black relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-center">
              <Loader2 className="h-8 w-8 mx-auto mb-2 text-indigo-600 animate-spin" />
              <p className="text-gray-600">Evaluating your code...</p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-center max-w-md">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-red-600 font-medium">Oops! Something's not right.</p>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        ) : success ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-green-600 font-medium">Great job!</p>
              <p className="text-gray-600 mt-2">Your solution is correct!</p>
            </div>
          </div>
        ) : null}

        <div className="component-preview">
          {renderedComponent || (
            <div className="p-4 border border-dashed border-gray-300 rounded-md text-gray-400 text-center">
              Your component will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
