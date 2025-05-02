# Timepass.wtf

![Timepass.wtf Banner](/public/game-night-fun.png)

## 🎮 About The Project

Timepass.wtf is an open-source gaming platform built with Next.js that offers a collection of casual browser games designed to entertain, challenge, and help you pass time. From classic Tic-Tac-Toe to brain-teasing Memory Games, we've got something for everyone.

**Live Demo:** [timepass.wtf](https://timepass-wtf.vercel.app/)

## ✨ Features

- **Multiple Games:** Tic-Tac-Toe, Memory Game, Typing Test, Snake Game, Word Scramble, Crossword Puzzle, and more
- **Responsive Design:** Works seamlessly on desktop and mobile devices
- **Modern UI:** Beautiful, animated interfaces with a consistent design language
- **Multiplayer Support:** Real-time multiplayer functionality for select games
- **Embedded Games:** Support for third-party game integration
- **Performance Optimized:** Fast loading times and smooth gameplay

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Socket.IO](https://socket.io/) - Real-time communication
- [Lucide React](https://lucide.dev/) - Beautiful icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
   \`\`\`sh
   git clone https://github.com/Anshikatyagi31/timepass.wtf.git
   \`\`\`

2. Install NPM packages
   \`\`\`sh
   npm install
   # or
   yarn install
   \`\`\`

3. Run the development server
   \`\`\`sh
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

Create a `.env.local` file in the root directory and add the following:

\`\`\`
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
\`\`\`

For production, set this to your deployed URL.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Leaderboards and achievements
- [ ] More games (Chess, Tetris, etc.)
- [ ] Customizable themes
- [ ] Progressive Web App (PWA) support
- [ ] Offline gameplay

## 📄 Project Structure

\`\`\`
timepass-games/
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── games/            # Game pages
│   │   ├── memory/       # Memory game
│   │   ├── tictactoe/    # Tic-Tac-Toe game
│   │   ├── typing/       # Typing test game
│   │   ├── snake/        # Snake game
│   │   ├── wordscramble/ # Word Scramble game
│   │   ├── crossword/    # Crossword puzzle game
│   │   └── ludo/         # Embedded Ludo game
│   └── page.tsx          # Landing page
├── components/           # Reusable components
│   ├── ui/               # UI components
│   └── [game-specific]/  # Game-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── ...
\`\`\`

## 🙏 Acknowledgments

- [Vercel](https://vercel.com) for hosting
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Gamezop](https://www.gamezop.com/) for the embedded Ludo game
- All the amazing contributors who have helped shape this project

## 📬 Contact

Project Link: [https://github.com/Anshikatyagi31/timepass.wtf.git](https://github.com/Anshikatyagi31/timepass.wtf.git)

---

<p align="center">Made with ❤️ by the Botbyte AI Team</p>
