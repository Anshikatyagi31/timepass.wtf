"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Gamepad2,
  Search,
  Flame,
  Star,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// Game categories
const categories = [
  { id: "all", name: "All Games" },
  { id: "popular", name: "Popular" },
  { id: "new", name: "New" },
  { id: "arcade", name: "Arcade" },
  { id: "puzzle", name: "Puzzle" },
  { id: "skill", name: "Skill" },
];

// Game data
const gamesData = [
  {
    id: "ludo",
    title: "Ludo King",
    description: "Play the classic board game with friends and family",
    image:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXlzaGE0M2JzaXd4cnk1cXB5NGpqbzZsMnpkZXVsOHJ2Y2plNXd2MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IhWX9HfEwlwbWhYJju/giphy.gif",
    href: "/games/ludo",
    categories: ["popular", "arcade"],
    isNew: false,
    isPopular: true,
    playCount: 12345,
  },
  {
    id: "algorithm-arena",
    title: "Algorithm Arena",
    description:
      "Compete in algorithm challenges and improve your coding skills",
    image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VhNXF0c3Q4eTVoMW8xMjN6ODRiZHpsNWMxZTczYW4yZThpbDRndyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bGgsc5mWoryfgKBx1u/giphy.gif",
    href: "/games/algorithm-arena",
    categories: ["popular", "skill"],
    isNew: false,
    isPopular: true,
    playCount: 23456,
  },
  {
    id: "code-punchline",
    title: "Code Punchline",
    description:
      "Complete jokes by writing JavaScript code in this fun coding game!",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VhNXF0c3Q4eTVoMW8xMjN6ODRiZHpsNWMxZTczYW4yZThpbDRndyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oKIPnAiaMCws8nOsE/giphy.gif",
    href: "/games/code-punchline",
    categories: ["new", "skill"],
    isNew: true,
    isPopular: false,
    playCount: 34567,
  },
  {
    id: "react-quest",
    title: "React Quest",
    description: "Learn React.js through an interactive adventure game",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHQ0aWJ0NGRwYXIyd3ZyZmo2ZXY3ZWRiNG9rYjBuY3g0cHNndjRsZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/11j5OF7BTglVkc/giphy.gif",
    href: "/games/react-quest",
    categories: ["new", "skill"],
    isNew: true,
    isPopular: false,
    playCount: 45678,
  },
  {
    id: "crossword",
    title: "Crossword",
    description:
      "Challenge your vocabulary and problem-solving skills with our modern crossword puzzle game",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGxxbGc5eGE0azZmZXA1NTM4Z2NhaGxyczgwbDl6dmc0NHpsMWlkbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orieW58Roh8wDr1bW/giphy.gif",
    href: "/games/crossword",
    categories: ["puzzle"],
    isNew: false,
    isPopular: false,
    playCount: 9876,
  },
  {
    id: "memory",
    title: "Memory Game",
    description: "Test and improve your memory by matching pairs of cards",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3lybG1oZnRvc3dpNmNuNmo4aDZ6NW1sM2U5ZTM0amdycHNtZmh4MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3MicUvfOG2FGpoCfvH/giphy.gif",
    href: "/games/memory",
    categories: ["popular", "puzzle"],
    isNew: false,
    isPopular: true,
    playCount: 12453,
  },
  {
    id: "typing",
    title: "Typing Test",
    description: "Test your typing speed and accuracy with challenging texts",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWJpaXM0OXpmNzBscnR5MGx0N2lwamU0cmhtOTlqOXd5M3RwZmpzbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Hw0wIr1YL75VC/giphy.gif",
    href: "/games/typing",
    categories: ["new", "skill"],
    isNew: true,
    isPopular: false,
    playCount: 8721,
  },
  {
    id: "snake",
    title: "Snake Game",
    description: "Classic arcade game with modern visuals and smooth controls",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3U3YXN4YW5oMzZtMGRyeHQ2YnB3cHJ6Z2p5d3VhMzQ0M3ZoOTlweSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l7hW3QhDalRjW/giphy.gif",
    href: "/games/snake",
    categories: ["arcade"],
    isNew: false,
    isPopular: false,
    playCount: 9876,
  },
  {
    id: "tictactoe",
    title: "Tic-Tac-Toe",
    description: "Classic game of X's and O's with multiplayer support",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3N4amIybTdvdnFpcmFwODV4NjRpNGJybTZ5cmJneWs0cGZzN3hmaSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gR92EF4p9XyEHyD2n5/giphy.gif",
    href: "/games/tictactoe",
    categories: ["popular", "puzzle"],
    isNew: false,
    isPopular: true,
    playCount: 15678,
  },
  {
    id: "wordscramble",
    title: "Word Scramble",
    description:
      "Unscramble words to guess personalities, businesses, and companies",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExODR0M3Bqb3ltOGVjNGcyOGw5bTB6OXduczU5d3huaTFsNGlicWxhNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lKXEBR8m1jWso/giphy.gif",
    href: "/games/wordscramble",
    categories: ["new", "puzzle", "skill"],
    isNew: true,
    isPopular: false,
    playCount: 7654,
  },
  {
    id: "tetris",
    title: "Tetris",
    description: "The classic block-stacking puzzle game with a modern twist",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnVxdjhvZjc1MGNtcjhyenZveHlyeTJicm01ZjQ2czlydjRlOGp5cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5OjI2vCzxo2kM/giphy.gif",
    href: "/games/tetris",
    categories: ["arcade", "puzzle"],
    isNew: false,
    isPopular: true,
    playCount: 14532,
  },
  {
    id: "chess",
    title: "Chess",
    description: "The ultimate strategy game with beautiful 3D pieces",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGU3N2VpMTI4cmFsOWN5Z3IwYjF4azZwdzRiajBrcGx1MTZyNzBreiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VqTjKLGbaBI3JBdIIN/giphy.gif",
    href: "/games/chess",
    categories: ["skill"],
    isNew: false,
    isPopular: false,
    playCount: 11234,
  },
  {
    id: "interactive",
    title: "Interactive Adventure",
    description: "Choose your own adventure in this interactive story game",
    image:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWF4OGFwdmt4eXI2emd3cnBwaGp5eHkxd3VjNDg1ODZ3dHFmbXNvZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0IsIC9ZNOELYmuqc/giphy.gif",
    href: "/games/interactive",
    categories: ["new"],
    isNew: true,
    isPopular: false,
    playCount: 6543,
  },
];

export default function GamesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGames, setFilteredGames] = useState(gamesData);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  // Filter games based on category and search query
  useEffect(() => {
    let result = [...gamesData];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(
        (game) =>
          game.categories.includes(selectedCategory) ||
          (selectedCategory === "popular" && game.isPopular) ||
          (selectedCategory === "new" && game.isNew)
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query)
      );
    }

    setFilteredGames(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent opacity-70"></div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/10 rounded-full blur-3xl"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Header with navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/20 p-1.5 rounded-full group-hover:bg-primary/30 transition-all">
                <ArrowLeft className="h-4 w-4 text-white" />
              </div>
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                Back
              </span>
            </Link>

            <div className="flex items-center gap-2 md:hidden">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                Games
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Gamepad2 className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Arcade Collection
            </span>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 w-full focus:ring-primary/50"
            />
          </div>
        </div>
      </header>

      {/* Category filters */}
      <div className="container mx-auto px-4 pt-6 pb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-full px-4 border ${
                selectedCategory === category.id
                  ? "bg-primary/20 border-primary/50 text-white"
                  : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {category.id === "popular" && (
                <Flame className="mr-1 h-3.5 w-3.5" />
              )}
              {category.id === "new" && (
                <Sparkles className="mr-1 h-3.5 w-3.5" />
              )}
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured game */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70 z-10"></div>

          <Image
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjE1a3hwb3dvajg4aGowY2FjeXJxb3k0MnNlc3FwdGh3eml5MDZuYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/1gLZ32bMP5pY52PBsm/giphy.gif"
            alt="Featured Game"
            width={1200}
            height={600}
            className="w-full h-[300px] md:h-[400px] object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  <Star className="h-3.5 w-3.5" />
                  Featured Game
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Game Collection
                </h1>
                <p className="text-white/70 max-w-xl">
                  Explore our collection of addictive games designed to
                  challenge your skills, test your reflexes, and provide hours
                  of entertainment.
                </p>
              </div>

              <Link href="#games" className="group">
                <Button className="bg-primary hover:bg-primary/90 text-white px-6 group-hover:translate-x-1 transition-transform">
                  Browse Games
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Games grid */}
      <div id="games" className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {selectedCategory === "all"
              ? "All Games"
              : categories.find((c) => c.id === selectedCategory)?.name}
            <span className="text-white/50 ml-2 text-lg">
              ({filteredGames.length})
            </span>
          </h2>
        </div>

        {filteredGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Gamepad2 className="h-16 w-16 text-white/20 mb-4" />
            <h3 className="text-xl font-medium text-white/90">
              No games found
            </h3>
            <p className="text-white/50 mt-2">
              Try a different search or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredGames.map((game) => (
                <motion.div
                  key={game.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredGame(game.id)}
                  onMouseLeave={() => setHoveredGame(null)}
                >
                  <Link href={game.href} className="block">
                    <div className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:border-primary/30">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {/* Game image with overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                        <Image
                          src={game.image || "/placeholder.svg"}
                          alt={game.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />

                        {/* Hover effect */}
                        <motion.div
                          className="absolute inset-0 bg-primary/30 z-10"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: hoveredGame === game.id ? 0.2 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Game badges */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 z-20">
                          {game.isNew && (
                            <div className="bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                              <Sparkles className="h-3 w-3 mr-1" />
                              New
                            </div>
                          )}
                          {game.isPopular && (
                            <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                              <Flame className="h-3 w-3 mr-1" />
                              Hot
                            </div>
                          )}
                        </div>

                        {/* Play count */}
                        <div className="absolute bottom-3 left-3 z-20">
                          <div className="bg-black/50 backdrop-blur-sm text-white/90 text-xs px-2 py-1 rounded-full flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {game.playCount.toLocaleString()} plays
                          </div>
                        </div>
                      </div>

                      {/* Game info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                          {game.title}
                        </h3>
                        <p className="text-sm text-white/70 line-clamp-2 mb-4">
                          {game.description}
                        </p>

                        {/* Play button */}
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {game.categories.slice(0, 2).map((cat) => (
                              <span
                                key={cat}
                                className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>

                          <Button
                            size="sm"
                            className="bg-primary/80 hover:bg-primary text-white"
                          >
                            Play
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Coming soon section */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 via-black to-black p-8 md:p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              More Games Coming Soon
            </h2>
            <p className="text-white/70 max-w-2xl mb-6">
              We're constantly developing new games to add to our collection.
              Stay tuned for exciting new releases and updates to your favorite
              games.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white">
                    Multiplayer Support
                  </h3>
                  <p className="text-sm text-white/70">
                    Challenge your friends online
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Achievements</h3>
                  <p className="text-sm text-white/70">
                    Unlock rewards as you play
                  </p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Leaderboards</h3>
                  <p className="text-sm text-white/70">
                    Compete for the top spot
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 backdrop-blur-sm bg-black/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Timepass.wtf
            </span>
          </div>

          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} Timepass.wtf By Botbyte AI
          </div>

          <div className="flex gap-4">
            <Link
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-white/70 hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
