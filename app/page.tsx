"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Gamepad2,
  Clock,
  Brain,
  Keyboard,
  Trophy,
  Users,
  Sparkles,
  ChevronRight,
  Github,
  Twitter,
  Menu,
  X,
} from "lucide-react"
import { useState, useEffect } from "react"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-background/95 overflow-hidden">
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-lg transition-all duration-300 ${
          scrollY > 50 ? "bg-background/80 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center text-xl font-bold">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Gamepad2 className="h-7 w-7 text-primary" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-extrabold"
            >
              Timepass.wtf
            </motion.span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/games"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Games
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Testimonials
              </Link>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                asChild
              >
                <Link href="#play-now">Play Now</Link>
              </Button>
            </nav>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur-lg"
          >
            <div className="container py-4 flex flex-col space-y-4">
              <Link
                href="#games"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white w-full"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="#play-now">Play Now</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[120px] opacity-60" />
            <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] bg-purple-500/20 rounded-full blur-[120px] opacity-60" />
          </div>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              animate="show"
              variants={container}
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
            >
              <div className="flex flex-col justify-center space-y-4">
                <motion.div
                  variants={item}
                  className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  Fun at your fingertips
                </motion.div>
                <motion.h1
                  variants={item}
                  className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
                >
                  Play, Challenge, Code,{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Timepass
                  </span>
                </motion.h1>
                <motion.p variants={item} className="max-w-[600px] text-muted-foreground md:text-xl">
                  Discover a world of casual games designed to entertain, challenge, and help you pass time. From
                  classic Tic-Tac-Toe to brain-teasing Memory Games.
                </motion.p>
                <motion.div variants={item} className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                    asChild
                  >
                    <Link href="/games">
                      Start Playing
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5" asChild>
                    <Link href="/games">Explore Games</Link>
                  </Button>
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-full max-w-[500px] aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl opacity-30 animate-pulse" />
                  <Image
                    src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Timepass Games Illustration"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Games Section */}
        <section id="games" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Our Games
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  Games for Every Mood
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From quick brain teasers to skill-building challenges, we&apos;ve got something for everyone.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Game Card 1 - Tic-Tac-Toe */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2VhNXF0c3Q4eTVoMW8xMjN6ODRiZHpsNWMxZTczYW4yZThpbDRndyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/bGgsc5mWoryfgKBx1u/giphy.gif"
                    alt="Algorithm Arena"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Algorithm Arena - A Leetcode Alternative
                    </h3>
                    <p className="text-sm text-white/70">
                      Solve coding challenges and improve your skills in a fun way
                    </p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">2-5 mins</span>
                    </div>
                    <Link href="/games/algorithm-arena" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHQ0aWJ0NGRwYXIyd3ZyZmo2ZXY3ZWRiNG9rYjBuY3g0cHNndjRsZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/78XCFBGOlS6keY1Bil/giphy.gif"
                    alt="React JS Quest"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      React Quest - Learn React.js
                    </h3>
                    <p className="text-sm text-white/70">
                      Learn React.js through an interactive adventure game
                    </p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">2-5 mins</span>
                    </div>
                    <Link href="/games/react-quest" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXlzaGE0M2JzaXd4cnk1cXB5NGpqbzZsMnpkZXVsOHJ2Y2plNXd2MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IhWX9HfEwlwbWhYJju/giphy.gif"
                    alt="Ludo King Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Ludo King
                    </h3>
                    <p className="text-sm text-white/70">
                      Play the classic board game with friends or AI
                    </p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">2-5 mins</span>
                    </div>
                    <Link href="/games/ludo" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              </motion.div>


              
              {/* Game Card 2 - Typing Test */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzA0bGhjazR1NXY4Y2ozZGxnZ3plaXdycGc2NWg2ZjB5MnBnZm56aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/dJD0xpWqYDkic/giphy.gif"
                    alt="Typing Test Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Typing Test
                    </h3>
                    <p className="text-sm text-white/70">Test your typing speed and accuracy</p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">1-3 mins</span>
                    </div>
                    <Link href="/games/typing" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-purple-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </div>
              </motion.div>

              {/* Game Card 3 - Snake Game */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbndnanQ4MXo3Nm0zNGFucHR3cmlzd2ltejByaGRhOHBscXcxeTB1ZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/2lbhL8dSGMh8I/giphy.gif"
                    alt="Snake Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Snake Game
                    </h3>
                    <p className="text-sm text-white/70">Classic arcade game with modern visuals</p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Endless</span>
                    </div>
                    <Link href="/games/snake" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Game Card 3 - Memory Game */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXB2ejdxN3Q3ZWhvYmF2Z2lpdXA3endocGxoa3lrcml1c2xlcG04dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/D0RvPABUNF3AQ/giphy.gif"
                    alt="Memory Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Memory Game
                    </h3>
                    <p className="text-sm text-white/70">Test and improve your memory</p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">5-10 mins</span>
                    </div>
                    <Link href="/games/memory" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Game Card 4 - Words Scramble */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHJmdm9kbDd1MXhhYjl5ZGRwMWV0NmZsbXVtcXowemptdThmNno3ZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6ozjrPeWQifzyA6Y/giphy.gif"
                    alt="Words Scramble Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Words Scramble
                    </h3>
                    <p className="text-sm text-white/70">
                    Play with words and improve your vocabulary
                    </p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">
                        Single Player
                      </span>
                    </div>
                    <Link href="/games/wordscramble" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-purple-500/90 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  New
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJzaHVlMGtmaHQ1eWo3cTc4OWdtOTR6cDV0OW4xbmk5ZjdheXpqeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gR92EF4p9XyEHyD2n5/giphy.gif"
                    alt="Tic-Tac-Toe Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Tic-Tac-Toe
                    </h3>
                    <p className="text-sm text-white/70">Classic game of X&apos;s and O&apos;s</p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">2-5 mins</span>
                    </div>
                    <Link href="/games/tictactoe" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              </motion.div>

              {/* Crossword */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-xl bg-background/50 backdrop-blur-sm border border-primary/10 shadow-xl shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGxxbGc5eGE0azZmZXA1NTM4Z2NhaGxyczgwbDl6dmc0NHpsMWlkbiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3orieW58Roh8wDr1bW/giphy.gif"
                    alt="Crossword Game"
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 z-20"
                  >
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                      Crossword
                    </h3>
                    <p className="text-sm text-white/70">
                      Test your vocabulary and word knowledge
                    </p>
                  </motion.div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">2-5 mins</span>
                    </div>
                    <Link href="/games/crossword" className="w-full pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Popular
                </div>
              </motion.div>


            </div>

            {/* New Featured Game with Interactive Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-5xl mt-16 rounded-xl overflow-hidden border border-primary/10 shadow-xl shadow-primary/5"
            >
              <div className="grid md:grid-cols-2 bg-background/50 backdrop-blur-sm">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                    Featured Game
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Memory Challenge</h3>
                  <p className="text-muted-foreground mb-6">
                    Test your memory skills with our new Memory Challenge game! Match pairs of icons before time runs
                    out and compete for the highest score on our global leaderboard.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="text-xs">Brain Training</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-xs">5-10 mins</span>
                    </div>
                    <div className="flex items-center gap-2 bg-background/50 px-3 py-1.5 rounded-full">
                      <Trophy className="h-4 w-4 text-primary" />
                      <span className="text-xs">Leaderboards</span>
                    </div>
                  </div>
                  <Link href="/games/memory" className="w-full pointer-events-auto z-20">
                    <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white sm:w-auto">
                      Play Memory Challenge
                    </Button>
                  </Link>
                </div>
                <div className="relative aspect-video md:aspect-auto">
                  <Image
                    src="https://media.giphy.com/media/oNRluiVoSyIF1VCAEP/giphy.gif?cid=ecf05e47hvpqza5wmhz5l7fh569zd9s9ilpd1oe3yergrez7&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="Memory Challenge Game"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-background/20 backdrop-blur-sm p-4 cursor-pointer hover:bg-background/30 transition-all">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      >
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 5V19L19 12L8 5Z" fill="white" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Game Categories */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto max-w-5xl mt-16"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Arcade", icon: "🎮", count: 12 },
                  { name: "Puzzle", icon: "🧩", count: 8 },
                  { name: "Word", icon: "📝", count: 6 },
                  { name: "Strategy", icon: "♟️", count: 5 },
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="bg-background/50 backdrop-blur-sm border border-primary/10 rounded-xl p-4 text-center cursor-pointer"
                  >
                    <div className="text-4xl mb-2">{category.icon}</div>
                    <h4 className="font-bold">{category.name}</h4>
                    <p className="text-xs text-muted-foreground">{category.count} games</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 group" asChild>
                <Link href="/games" className="pointer-events-auto z-20">
                  View All Games
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Popular Games Carousel */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Trending Now
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  Popular Games This Week
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out what everyone is playing right now
                </p>
              </div>
            </motion.div>

            {/* Interactive Game Previews */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Game Preview 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-video">
                  <Image
                    src="https://media.giphy.com/media/S5qhrBEfPQHFS/giphy.gif?cid=ecf05e4700ay78ovn05bsl1h4mr3nitu953y8yayr24bsug5&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                    alt="Snake Game"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Snake</h3>
                    <p className="text-sm text-white/70 mb-4">Classic arcade game with a modern twist</p>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-primary/80" />
                        ))}
                      </div>
                      <p className="text-xs text-white/70">2.4k playing now</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/games/snake" className="pointer-events-auto z-20">
                      <Button className="bg-white text-primary hover:bg-white/90 z-30">Play Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Game Preview 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-video">
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzZoZGp6aWo0MzV0MTdydXNlYWxkMzA1N2FycGJ1dWs0aDV5OHFmMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/5OjI2vCzxo2kM/giphy.gif"
                    alt="Tetris Game"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Tetris</h3>
                    <p className="text-sm text-white/70 mb-4">The ultimate block-stacking challenge</p>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-purple-500/80" />
                        ))}
                      </div>
                      <p className="text-xs text-white/70">3.8k playing now</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="/games/tetris" className="pointer-events-auto z-20">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Game Preview 3 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-video">
                  <Image
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTF0b2oyMDVtOXduYjZjNDI4MXF4a2dna3Y2bDNtbjJteGZ3ZGZ3ZiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Qv6qXq1MvbP6ckemZE/giphy.gif"
                    alt="Chess Game"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Chess</h3>
                    <p className="text-sm text-white/70 mb-4">Challenge your strategic thinking</p>
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-primary/80" />
                        ))}
                      </div>
                      <p className="text-xs text-white/70">1.5k playing now</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href="#" className="pointer-events-auto z-20">
                      <Button className="bg-white text-primary hover:bg-white/90 z-30">Play Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[20%] right-[30%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px] opacity-40" />
          </div>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  Why Choose Timepass?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We&apos;ve designed our platform with you in mind. Here&apos;s what makes us special.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5 transition-all"
              >
                <div className="rounded-full bg-gradient-to-br from-primary to-purple-500 p-3 shadow-md shadow-primary/20">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Brain Training</h3>
                <p className="text-center text-muted-foreground">
                  Our games are designed to improve cognitive skills while having fun.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5 transition-all"
              >
                <div className="rounded-full bg-gradient-to-br from-primary to-purple-500 p-3 shadow-md shadow-primary/20">
                  <Keyboard className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Skill Building</h3>
                <p className="text-center text-muted-foreground">
                  Improve typing speed, memory, and problem-solving abilities.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5 transition-all"
              >
                <div className="rounded-full bg-gradient-to-br from-primary to-purple-500 p-3 shadow-md shadow-primary/20">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Leaderboards</h3>
                <p className="text-center text-muted-foreground">
                  Compete with friends and players worldwide on our global leaderboards.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5 transition-all"
              >
                <div className="rounded-full bg-gradient-to-br from-primary to-purple-500 p-3 shadow-md shadow-primary/20">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Multiplayer</h3>
                <p className="text-center text-muted-foreground">
                  Challenge friends to games and compete in real-time.
                </p>
              </motion.div>

              {/* Feature 5 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5 transition-all"
              >
                <div className="rounded-full bg-gradient-to-br from-primary to-purple-500 p-3 shadow-md shadow-primary/20">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">New Games Weekly</h3>
                <p className="text-center text-muted-foreground">
                  We regularly add new games to keep the experience fresh and exciting.
                </p>
              </motion.div>

              {/* Feature 6 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center space-y-4 rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5 transition-all"
              >
                <div className="rounded-full bg-gradient-to-br from-primary to-purple-500 p-3 shadow-md shadow-primary/20">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Quick Games</h3>
                <p className="text-center text-muted-foreground">
                  Perfect for short breaks or when you just need a quick mental refresh.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                  What Our Players Say
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don&apos;t just take our word for it. Here&apos;s what our community has to say.
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                      src="https://randomuser.me/api/portraits/women/44.jpg"
                      alt="Sarah J."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Sarah J.</h3>
                    <p className="text-sm text-primary">Typing Test Champion</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  &quot;I&apos;ve improved my typing speed by 20 WPM since I started using Timepass. The typing tests
                  are fun and challenging! I love the new animations and interface.&quot;
                </p>
                <div className="mt-4 flex text-primary">
                  <span>★★★★★</span>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Mike T."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Mike T.</h3>
                    <p className="text-sm text-primary">Memory Game Enthusiast</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  &quot;The memory games have helped me stay mentally sharp. I play during my lunch break every day! The
                  new UI is incredibly smooth and responsive.&quot;
                </p>
                <div className="mt-4 flex text-primary">
                  <span>★★★★★</span>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
                className="rounded-xl border border-primary/10 bg-background/50 backdrop-blur-sm p-6 shadow-lg shadow-primary/5"
              >
                <div className="flex items-start gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                      src="https://randomuser.me/api/portraits/men/86.jpg"
                      alt="Alex R."
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Alex R.</h3>
                    <p className="text-sm text-primary">Casual Gamer</p>
                  </div>
                </div>
                <p className="mt-4 text-muted-foreground">
                  &quot;Timepass is my go-to site when I need a quick break. The games are simple but addictive! The
                  animations make everything feel so much more engaging.&quot;
                </p>
                <div className="mt-4 flex text-primary">
                  <span>★★★★☆</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive Game Demo */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-[120px] opacity-40" />
          </div>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mx-auto max-w-5xl rounded-2xl overflow-hidden border border-primary/10 shadow-xl"
            >
              <div className="bg-background/50 backdrop-blur-sm p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                      Try It Now
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience Our Games</h2>
                    <p className="text-muted-foreground mb-6">
                      Get a taste of our interactive gameplay right here. No downloads required - just pure fun at your
                      fingertips.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white"
                      asChild
                    >
                      <Link href="/games">Play Full Version</Link>
                    </Button>
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-primary/20">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2ZibmkxeTEyc2NicHRieWw5c3g2cGcwdWkzcW5qemZjNzJnc25zMCZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/kyLYXonQYYfwYDIeZl/giphy.gif"
                          alt="Interactive Game Demo"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                            className="rounded-full bg-white/20 backdrop-blur-sm p-6"
                          >
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5V19L19 12L8 5Z" fill="white" />
                            </svg>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="play-now" className="w-full py-12 md:py-24 lg:py-32 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-[120px] opacity-50" />
          </div>
          <div className="container px-4 md:px-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto max-w-3xl rounded-2xl border border-primary/10 bg-background/60 backdrop-blur-xl p-8 md:p-12 shadow-xl shadow-primary/5"
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                    Ready to Play?
                  </h2>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of players already enjoying Timepass games. No downloads, no installations - just
                    instant fun.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-3 min-[400px]:flex-row mt-4"
                >
                  <Link href="/games/memory" className="pointer-events-auto z-20">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
                    >
                      Start Playing Now
                    </Button>
                  </Link>
                  <Link href="#" className="pointer-events-auto z-20">
                    <Button variant="outline" size="lg" className="w-full border-primary/20 hover:bg-primary/5">
                      Create Free Account
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-primary/10 bg-background/80 backdrop-blur-md py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:gap-0 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-lg font-bold"
          >
            <Gamepad2 className="h-5 w-5 text-primary" />
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent font-extrabold">
              Timepass.wtf
            </span>
          </motion.div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Timepass.wtf By Botbyte AI.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors pointer-events-auto z-20"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors pointer-events-auto z-20"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
