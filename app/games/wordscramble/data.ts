export type Category = "personality" | "business" | "company"

export interface WordPuzzle {
  id: number
  answer: string
  category: Category
  difficulty: "easy" | "medium" | "hard"
  hints: string[]
  description: string
}

export const wordPuzzles: WordPuzzle[] = [
  // Personalities
  {
    id: 1,
    answer: "EINSTEIN",
    category: "personality",
    difficulty: "easy",
    hints: ["Developed the theory of relativity", "Famous physicist with wild hair", "E = mc²"],
    description: "Albert Einstein was a theoretical physicist known for developing the theory of relativity.",
  },
  {
    id: 2,
    answer: "BEETHOVEN",
    category: "personality",
    difficulty: "medium",
    hints: ["Famous classical composer", "Continued to compose music after going deaf", "Composed 'Moonlight Sonata'"],
    description:
      "Ludwig van Beethoven was a German composer and pianist who remains one of the most admired composers in the history of Western music.",
  },
  {
    id: 3,
    answer: "PICASSO",
    category: "personality",
    difficulty: "easy",
    hints: ["Spanish painter and sculptor", "Co-founded Cubism", "Famous for 'Guernica'"],
    description:
      "Pablo Picasso was a Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France.",
  },
  {
    id: 4,
    answer: "OPRAH",
    category: "personality",
    difficulty: "easy",
    hints: [
      "Famous talk show host",
      "Philanthropist and billionaire",
      "First name ends with same letter it starts with",
    ],
    description:
      "Oprah Winfrey is an American talk show host, television producer, actress, author, and philanthropist.",
  },
  {
    id: 5,
    answer: "SHAKESPEARE",
    category: "personality",
    difficulty: "medium",
    hints: ["Famous playwright", "Wrote 'Romeo and Juliet'", "From Stratford-upon-Avon"],
    description:
      "William Shakespeare was an English poet, playwright, and actor, widely regarded as the greatest writer in the English language.",
  },
  {
    id: 6,
    answer: "MANDELA",
    category: "personality",
    difficulty: "medium",
    hints: [
      "South African anti-apartheid revolutionary",
      "First black president of South Africa",
      "Spent 27 years in prison",
    ],
    description:
      "Nelson Mandela was a South African anti-apartheid revolutionary, political leader, and philanthropist who served as President of South Africa.",
  },
  {
    id: 7,
    answer: "CURIE",
    category: "personality",
    difficulty: "medium",
    hints: [
      "First woman to win a Nobel Prize",
      "Discovered polonium and radium",
      "Pioneer in research on radioactivity",
    ],
    description:
      "Marie Curie was a Polish and naturalized-French physicist and chemist who conducted pioneering research on radioactivity.",
  },
  {
    id: 8,
    answer: "GANDHI",
    category: "personality",
    difficulty: "easy",
    hints: ["Led India to independence", "Known for nonviolent civil disobedience", "Often called 'Mahatma'"],
    description:
      "Mahatma Gandhi was an Indian lawyer, anti-colonial nationalist, and political ethicist who employed nonviolent resistance to lead India to independence.",
  },

  // Companies
  {
    id: 9,
    answer: "GOOGLE",
    category: "company",
    difficulty: "easy",
    hints: ["Search engine giant", "Parent company is Alphabet", "Founded by Larry Page and Sergey Brin"],
    description:
      "Google is a multinational technology company that specializes in Internet-related services and products.",
  },
  {
    id: 10,
    answer: "MICROSOFT",
    category: "company",
    difficulty: "easy",
    hints: ["Founded by Bill Gates", "Created Windows operating system", "Xbox is one of their products"],
    description:
      "Microsoft Corporation is an American multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, and personal computers.",
  },
  {
    id: 11,
    answer: "AMAZON",
    category: "company",
    difficulty: "easy",
    hints: ["Started as an online bookstore", "Founded by Jeff Bezos", "Now the world's largest online marketplace"],
    description:
      "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
  },
  {
    id: 12,
    answer: "TESLA",
    category: "company",
    difficulty: "easy",
    hints: ["Electric vehicle manufacturer", "CEO is Elon Musk", "Named after a famous inventor"],
    description: "Tesla, Inc. is an American electric vehicle and clean energy company founded by Elon Musk.",
  },
  {
    id: 13,
    answer: "NINTENDO",
    category: "company",
    difficulty: "medium",
    hints: ["Japanese video game company", "Created Mario and Zelda", "Makes the Switch console"],
    description:
      "Nintendo Co., Ltd. is a Japanese multinational consumer electronics and video game company headquartered in Kyoto, Japan.",
  },
  {
    id: 14,
    answer: "STARBUCKS",
    category: "company",
    difficulty: "medium",
    hints: ["Coffee chain", "Logo features a twin-tailed mermaid", "Founded in Seattle"],
    description:
      "Starbucks Corporation is an American multinational chain of coffeehouses and roastery reserves headquartered in Seattle, Washington.",
  },
  {
    id: 15,
    answer: "ADIDAS",
    category: "company",
    difficulty: "medium",
    hints: ["Sportswear manufacturer", "Logo has three stripes", "Founded in Germany"],
    description:
      "Adidas AG is a German multinational corporation that designs and manufactures shoes, clothing and accessories.",
  },
  {
    id: 16,
    answer: "SPOTIFY",
    category: "company",
    difficulty: "medium",
    hints: ["Music streaming service", "Founded in Sweden", "Logo is a green circle with three black curved lines"],
    description: "Spotify is a Swedish audio streaming and media services provider founded in 2006.",
  },

  // Businesses
  {
    id: 17,
    answer: "RESTAURANT",
    category: "business",
    difficulty: "easy",
    hints: ["Place where people go to eat", "Has a menu", "Can be fast food or fine dining"],
    description: "A restaurant is a business that prepares and serves food and drinks to customers.",
  },
  {
    id: 18,
    answer: "PHARMACY",
    category: "business",
    difficulty: "medium",
    hints: ["Dispenses medication", "Employs pharmacists", "Often has a green cross sign"],
    description: "A pharmacy is a retail shop which provides pharmaceutical drugs, among other products.",
  },
  {
    id: 19,
    answer: "BAKERY",
    category: "business",
    difficulty: "easy",
    hints: ["Makes bread and pastries", "Often smells delicious", "Products are baked in ovens"],
    description:
      "A bakery is an establishment that produces and sells flour-based food baked in an oven such as bread, cookies, cakes, and pies.",
  },
  {
    id: 20,
    answer: "HOTEL",
    category: "business",
    difficulty: "easy",
    hints: ["Provides lodging for travelers", "Has rooms for rent", "Can range from budget to luxury"],
    description: "A hotel is an establishment that provides paid lodging on a short-term basis.",
  },
  {
    id: 21,
    answer: "BOOKSTORE",
    category: "business",
    difficulty: "medium",
    hints: ["Sells reading materials", "Has shelves of novels and non-fiction", "May also sell stationery"],
    description: "A bookstore is a retail establishment that sells books, magazines, and other reading materials.",
  },
  {
    id: 22,
    answer: "LAUNDROMAT",
    category: "business",
    difficulty: "hard",
    hints: ["Self-service clothes washing facility", "Has rows of washers and dryers", "Pay per use"],
    description: "A laundromat is a facility where clothes are washed and dried using coin-operated machines.",
  },
  {
    id: 23,
    answer: "BARBERSHOP",
    category: "business",
    difficulty: "medium",
    hints: ["Place to get a haircut", "Traditional pole with red and white stripes", "Primarily serves men"],
    description: "A barbershop is a place where people, primarily men, go to get their hair cut, styled, or trimmed.",
  },
  {
    id: 24,
    answer: "GYMNASIUM",
    category: "business",
    difficulty: "hard",
    hints: ["Facility for fitness and exercise", "Has workout equipment", "People go there to stay in shape"],
    description: "A gymnasium, also known as a gym, is a facility equipped for sports or physical training.",
  },
]

// Function to get puzzles by category
export const getPuzzlesByCategory = (category: Category): WordPuzzle[] => {
  return wordPuzzles.filter((puzzle) => puzzle.category === category)
}

// Function to get puzzles by difficulty
export const getPuzzlesByDifficulty = (difficulty: "easy" | "medium" | "hard"): WordPuzzle[] => {
  return wordPuzzles.filter((puzzle) => puzzle.difficulty === difficulty)
}

// Function to scramble a word
export const scrambleWord = (word: string): string => {
  const wordArray = word.split("")

  // Fisher-Yates shuffle algorithm
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]
  }

  // Make sure the scrambled word is different from the original
  const scrambled = wordArray.join("")
  if (scrambled === word) {
    return scrambleWord(word) // Try again if the scrambled word is the same
  }

  return scrambled
}

// Function to get a random puzzle
export const getRandomPuzzle = (): WordPuzzle => {
  const randomIndex = Math.floor(Math.random() * wordPuzzles.length)
  return wordPuzzles[randomIndex]
}

// Function to get a random puzzle by category
export const getRandomPuzzleByCategory = (category: Category): WordPuzzle => {
  const puzzles = getPuzzlesByCategory(category)
  const randomIndex = Math.floor(Math.random() * puzzles.length)
  return puzzles[randomIndex]
}
