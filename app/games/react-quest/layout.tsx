import type React from "react"
import "../../globals.css"

export const metadata = {
  title: "React Quest | Timepass.wtf",
  description: "Learn React.js through an interactive adventure game",
}

export default function ReactQuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
