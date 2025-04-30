import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Crossword Puzzle | Timepass Games",
  description: "Challenge your vocabulary and problem-solving skills with our modern crossword puzzle game",
}

export default function CrosswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
