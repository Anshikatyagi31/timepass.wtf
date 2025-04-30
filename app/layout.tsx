import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Timepass.wtf - Play Fun Games Online. Built By Botbyte AI Team",
  description: "Discover a world of casual games designed to entertain, challenge, and help you pass time.",
    generator: 'Botbyte AI',
  applicationName: 'Timepass.wtf',
  keywords: [
    "timepass", "games", "fun", "entertainment", "casual games", "play online", 
    "challenge", "pass time", "relaxation", "enjoyment", "gaming", "leisure",
    "interactive", "fun games", "online gaming", "game collection", "botbyte ai",
    "botbyte", "ai", "artificial intelligence", "game development", "game design",
    "game mechanics", "gameplay", "user experience", "game graphics", "game sound",
    "game levels", "game characters", "game story", "game strategy", "game community",
    "game updates", "game events", "game rewards", "game achievements", "game leaderboard",
    "game challenges", "game modes", "game multiplayer", "game singleplayer",
    "game co-op", "game competition", "game fun", "game enjoyment", "game relaxation",
    "game leisure", "game interactive", "game online", "game play", "game discover",
    "game entertainment", "game casual", "game challenge", "game pass time",
    "game relaxation", "game enjoyment", "game leisure", "game interactive",
    "game online", "game play", "game discover", "game entertainment", "game casual",
    "game challenge", "game pass time", "game relaxation", "game enjoyment",
  ],
  authors: [
    {
      name: "Botbyte AI",
      url: "https://botbyte.ai",
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
