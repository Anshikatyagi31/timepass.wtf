import type React from "react"
import type { Metadata } from "next"
import "./styles.css"

export const metadata: Metadata = {
  title: "Code Punchline - Timepass.wtf || A JavaScript Coding Game",
  description: "Complete jokes by writing JavaScript code in this fun coding game!",
}

export default function CodePunchlineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
