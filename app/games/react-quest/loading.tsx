import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900">
      <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
      <h2 className="text-xl font-bold text-white">Loading React Quest...</h2>
      <p className="text-indigo-300">Preparing your adventure</p>
    </div>
  )
}
