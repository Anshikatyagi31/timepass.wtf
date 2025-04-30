export const paragraphs = [
  {
    id: 1,
    difficulty: "easy",
    text: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet. Isn't that interesting? The sentence is often used to test typewriters or keyboards because it includes all the letters. It originated in the late 19th century and has been a standard for typing practice ever since.",
  },
  {
    id: 2,
    difficulty: "easy",
    text: "Learning to type quickly and accurately is an essential skill in today's digital world. Regular practice can help you improve your typing speed and reduce errors. Set aside some time each day to practice, and you'll see improvement in no time. Remember to maintain good posture and hand position while typing.",
  },
  {
    id: 3,
    difficulty: "medium",
    text: "Technology has transformed the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, innovations continue to reshape our world at an unprecedented pace. While these advancements offer numerous benefits, they also present challenges that society must address. Finding a balance between embracing new technologies and maintaining human connection remains an important consideration.",
  },
  {
    id: 4,
    difficulty: "medium",
    text: "The art of storytelling has been central to human culture for thousands of years. Through narratives, we share knowledge, preserve history, and explore complex emotions. Every culture has its unique storytelling traditions, from oral folk tales to written epics. In the digital age, storytelling continues to evolve with new mediums like video games, virtual reality, and interactive media.",
  },
  {
    id: 5,
    difficulty: "hard",
    text: "Quantum computing represents a paradigm shift in computational capability, utilizing quantum mechanical phenomena such as superposition and entanglement to perform operations on data. Unlike classical computers that use bits, quantum computers use quantum bits or qubits, which can exist in multiple states simultaneously. This property potentially allows quantum computers to solve certain problems exponentially faster than classical computers, particularly in areas like cryptography, material science, and complex system simulation.",
  },
  {
    id: 6,
    difficulty: "hard",
    text: "The biodiversity of Earth's ecosystems is facing unprecedented threats due to human activities, including habitat destruction, pollution, climate change, and overexploitation of resources. Conservation biologists emphasize the importance of preserving biodiversity not only for ethical reasons but also for practical considerations, as diverse ecosystems provide essential services such as clean air, water purification, pollination, and climate regulation. Implementing sustainable practices and establishing protected areas are crucial strategies for mitigating biodiversity loss.",
  },
]

export const getRandomParagraph = (difficulty = "medium") => {
  const filteredParagraphs = paragraphs.filter((p) => p.difficulty === difficulty)
  const randomIndex = Math.floor(Math.random() * filteredParagraphs.length)
  return filteredParagraphs[randomIndex] || paragraphs[0]
}
