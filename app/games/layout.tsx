import type React from "react";
import "../globals.css";
import "./games.css";

export const metadata = {
  title: "Games Collection | Timepass.wtf By Botbyte AI",
  description: "Explore our collection of fun and engaging games",
  generator: "Botbyte AI",
  applicationName: "Timepass.wtf",
    keywords: [
        "games",
        "fun",
        "entertainment",
        "casual games",
        "play online",
        "challenge",
        "pass time",
        "relaxation",
        "enjoyment",
        "gaming",
        "leisure",
        "interactive",
        "fun games",
        "online gaming",
        "game collection",
        "botbyte ai",
        "botbyte",
        "ai",
        "artificial intelligence",
        "game development",
    ]
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
