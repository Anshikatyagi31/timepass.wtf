"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LudoGame() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = () => {
    // Check if fullscreen is supported
    if (
      !document.fullscreenEnabled &&
      !document.webkitFullscreenEnabled &&
      !document.mozFullScreenEnabled &&
      !document.msFullscreenEnabled
    ) {
      console.log("Fullscreen not supported in this browser/environment")
      return
    }

    try {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        // Request fullscreen with vendor prefixes
        const docEl = document.documentElement

        if (docEl.requestFullscreen) {
          docEl.requestFullscreen()
        } else if (docEl.webkitRequestFullscreen) {
          docEl.webkitRequestFullscreen()
        } else if (docEl.mozRequestFullScreen) {
          docEl.mozRequestFullScreen()
        } else if (docEl.msRequestFullscreen) {
          docEl.msRequestFullscreen()
        }
      } else {
        // Exit fullscreen with vendor prefixes
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  useEffect(() => {
    // Add fullscreen change event listener with vendor prefixes
    const handleFullscreenChange = () => {
      const isInFullScreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      )
      setIsFullscreen(isInFullScreen)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-background/95">
      {!isFullscreen && (
        <header className="p-4 border-b border-white/10 backdrop-blur-lg">
          <div className="container flex justify-between items-center">
            <Link href="/games" className="flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-bold">Back to Games</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="text-primary border-primary/30 hover:bg-primary/10"
            >
              Fullscreen Mode
            </Button>
          </div>
        </header>
      )}

      <main className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Loading Ludo game...</p>
            </motion.div>
          </div>
        )}

        <iframe
          src="https://zv1y2i8p.play.gamezop.com/g/SkhljT2fdgb"
          style={{ width: "100%", height: "100%", border: 0 }}
          seamless="seamless"
          allowTransparency="true"
          allowFullScreen={true}
          frameBorder="0"
          onLoad={() => setIsLoading(false)}
          title="Ludo Game"
          className="bg-black"
        />
      </main>
    </div>
  )
}
