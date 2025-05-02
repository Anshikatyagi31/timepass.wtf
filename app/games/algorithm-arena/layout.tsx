import type React from "react";

import { Metadata } from "next";

const metadata: Metadata = {
  title: "Algorithm Arena - Timepass.wtf || A LeetCode Alternative",
  description: "Test your algorithm skills in a competitive environment.",
  openGraph: {
    title: "Algorithm Arena",
    description: "Test your algorithm skills in a competitive environment.",
    url: "/games/algorithm-arena",
    images: [
      {
        url: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*MdFVAWbwPKZzrkW4.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  keywords: [
    "Algorithm Arena",
    "Timepass.wtf",
    "LeetCode Alternative",
    "Competitive Programming",
    "Coding Challenges",
    "Algorithm Visualization",
    "Hackathon",
    "Code Evaluation",
    "Code Editor",
    "LeetCode",
    "Code Review",
    "Algorithm Visualization",
  ],
  authors: [{ name: "Timepass.wtf" }],
};

export default function AlgorithmArenaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
