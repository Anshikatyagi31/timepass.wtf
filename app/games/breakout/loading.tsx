import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
      <h2 className="text-2xl font-bold text-white">Loading Brick Breaker...</h2>
      <p className="text-gray-300 mt-2">Get ready to smash some bricks!</p>
    </div>
  )
}
