import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/90">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
      <h2 className="mt-4 text-xl font-semibold animate-pulse">Loading Crossword Puzzle...</h2>
    </div>
  )
}
