"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Gamepad2 } from "lucide-react"

export default function GamesIndex() {
  const games = [
    {
        title: "Ludo King",
        description: "Play the classic board game with friends and family",
        image:
          "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXlzaGE0M2JzaXd4cnk1cXB5NGpqbzZsMnpkZXVsOHJ2Y2plNXd2MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IhWX9HfEwlwbWhYJju/giphy.gif",
        href: "/games/ludo",
        isNew: false,
        isPopular: true,
    },
    {
      title: "Memory Game",
      description: "Test and improve your memory by matching pairs of cards",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41lUjUgLLwWrz20w/giphy.gif",
      href: "/games/memory",
      isNew: false,
      isPopular: true,
    },
    {
      title: "Typing Test",
      description: "Test your typing speed and accuracy",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JIX9t2j0ZTN9S/giphy.gif",
      href: "/games/typing",
      isNew: true,
      isPopular: false,
    },
    {
      title: "Snake Game",
      description: "Classic arcade game with modern visuals",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13HBDT4QSTpveU/giphy.gif",
      href: "/games/snake",
      isNew: false,
      isPopular: false,
    },
    {
      title: "Tic-Tac-Toe",
      description: "Classic game of X's and O's with multiplayer support",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMt1VVNkHV2PaE/giphy.gif",
      href: "/games/tictactoe",
      isNew: false,
      isPopular: true,
    },
    {
      title: "Word Scramble",
      description: "Unscramble words to guess personalities, businesses, and companies",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif",
      href: "/games/wordscramble",
      isNew: true,
      isPopular: false,
    },
    {
      title: "2048",
      description: "Slide tiles to combine them and reach 2048",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKM0q4X6a2gk4eA/giphy.gif",
      href: "/games/2048",
      isNew: false,
      isPopular: true,
    },
    {
      title: "Crossword",
      description: "Challenge your vocabulary and problem-solving skills with our modern crossword puzzle game",
      image:
        "https://media.giphy.com/media/v1.Y2lidPTc5MGI3NjExcjdtNWFvZWJtZnJxZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZnRnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKM0q4X6a2gk4eA/giphy.gif",
      href: "/games/sudoku",
      isNew: false,
      isPopular: false,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-background/95">
      <header className="p-4 border-b border-white/10 backdrop-blur-lg">
        <div className="container flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
              All Games
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-6xl mx-auto py-12 px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl"
            >
              <Link href={game.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      {game.title}
                    </h3>
                    <p className="text-sm text-white/70">{game.description}</p>
                  </div>
                </div>
                <div className="p-5">
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white">
                    Play Now
                  </Button>
                </div>
                {game.isNew && (
                  <div className="absolute top-3 right-3 bg-purple-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </div>
                )}
                {game.isPopular && (
                  <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
