import type React from "react"
export default function BreakoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="flex-1 container max-w-7xl mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
