import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-violet-900 to-blue-900">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-violet-400 animate-spin" />
        <p className="text-lg font-medium text-white">Loading Word Scramble...</p>
      </div>
    </div>
  )
}
