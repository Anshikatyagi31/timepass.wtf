"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Play, Copy, Trash2 } from "lucide-react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
  onRun: () => void
}

export default function CodeEditor({ code, setCode, onRun }: CodeEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [lineNumbers, setLineNumbers] = useState<string[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Update line numbers when code changes
  useEffect(() => {
    const lines = code.split("\n").length
    setLineNumbers(Array.from({ length: lines }, (_, i) => String(i + 1)))
  }, [code])

  // Handle tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd

      // Insert 2 spaces for tab
      const newCode = code.substring(0, start) + "  " + code.substring(end)
      setCode(newCode)

      // Move cursor position after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = start + 2
          textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      // Show a brief visual feedback
      const button = document.getElementById("copy-button")
      if (button) {
        button.classList.add("text-green-400")
        setTimeout(() => {
          button.classList.remove("text-green-400")
        }, 1000)
      }
    })
  }

  const handleClearCode = () => {
    if (confirm("Are you sure you want to clear all code?")) {
      setCode("")
    }
  }

  return (
    <motion.div
      className="rounded-xl overflow-hidden border-2 border-purple-500/50 bg-gray-900 shadow-xl shadow-purple-900/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.3)" }}
    >
      <div className="bg-gray-800 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-gray-400 text-sm font-mono">script.js</span>
        <div className="flex space-x-3">
          <button
            id="copy-button"
            onClick={handleCopyCode}
            className="text-gray-400 hover:text-white transition-colors"
            title="Copy code"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={handleClearCode}
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Clear code"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className={`relative ${isFocused ? "ring-2 ring-purple-500" : ""}`}>
        <div className="flex text-sm">
          <div className="py-4 px-2 bg-gray-800 text-gray-500 font-mono text-right select-none">
            {lineNumbers.map((num) => (
              <div key={num} className="px-2">
                {num}
              </div>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className="w-full bg-gray-900 text-gray-100 font-mono p-4 min-h-[200px] outline-none resize-y flex-1 overflow-auto"
            spellCheck="false"
            placeholder="Write your code here..."
            style={{ lineHeight: "1.5", tabSize: 2 }}
          />
        </div>
      </div>

      <div className="bg-gray-800 px-4 py-3 flex justify-end border-t border-gray-700">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onRun}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-6 shadow-lg shadow-green-900/20"
          >
            <Play className="w-4 h-4 mr-2" /> Run Code
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
