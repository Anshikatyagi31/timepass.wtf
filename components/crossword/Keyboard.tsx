"use client"

import { motion } from "framer-motion"
import { Delete, RotateCcw } from "lucide-react"

interface KeyboardProps {
  onKeyPress: (key: string) => void
  onDelete: () => void
  onToggleDirection: () => void
}

export function Keyboard({ onKeyPress, onDelete, onToggleDirection }: KeyboardProps) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]

  return (
    <div className="w-full max-w-[600px] mx-auto">
      {rows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex justify-center gap-1 mb-1">
          {rowIndex === 2 && (
            <motion.button
              className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/20 text-white"
              onClick={onToggleDirection}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw className="h-5 w-5" />
            </motion.button>
          )}

          {row.map((key) => (
            <motion.button
              key={key}
              className="w-8 h-10 flex items-center justify-center rounded-md bg-secondary text-white font-medium"
              onClick={() => onKeyPress(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {key}
            </motion.button>
          ))}

          {rowIndex === 2 && (
            <motion.button
              className="w-10 h-10 flex items-center justify-center rounded-md bg-primary/20 text-white"
              onClick={onDelete}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Delete className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      ))}
    </div>
  )
}
