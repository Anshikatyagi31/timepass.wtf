"use client"

import { motion } from "framer-motion"

interface LetterTileProps {
  letter: string
  index: number
  isSelected?: boolean
  onClick?: () => void
}

export const LetterTile = ({ letter, index, isSelected = false, onClick }: LetterTileProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: isSelected ? -10 : 0,
        backgroundColor: isSelected ? "rgba(139, 92, 246, 0.5)" : "rgba(255, 255, 255, 0.1)",
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        backgroundColor: "rgba(139, 92, 246, 0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      className={`
        w-12 h-12 sm:w-16 sm:h-16 
        flex items-center justify-center 
        rounded-lg cursor-pointer 
        border border-white/10
        backdrop-blur-sm
        shadow-lg
        font-bold text-2xl
        ${isSelected ? "border-violet-400/50 text-violet-200" : "text-white"}
      `}
      onClick={onClick}
    >
      {letter}
    </motion.div>
  )
}
