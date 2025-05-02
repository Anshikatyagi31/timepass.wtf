import type { Level } from "../types"

export const levels: Level[] = [
  {
    id: "beginner",
    name: "Beginner Laughs",
    description: "Simple string operations and basic math",
    difficulty: "beginner",
    pointsPerJoke: 10,
    jokes: [
      {
        id: "joke1",
        setup: "Why do programmers prefer dark mode?",
        expectedOutput: "Because light attracts bugs!",
        initialCode: '// Complete the joke with console.log\n\nconsole.log("Because ");',
        hint: "Just complete the string with the punchline text",
      },
      {
        id: "joke2",
        setup: "Why was the JavaScript developer sad?",
        expectedOutput: "Because he didn't know how to 'null' his feelings",
        initialCode: "// Use string concatenation\n\nlet emotion = null;\nconsole.log();",
        hint: "Use the 'emotion' variable in your output",
      },
      {
        id: "joke3",
        setup: "How many programmers does it take to change a light bulb?",
        expectedOutput: "None, that's a hardware problem",
        initialCode: "// Write your code here\n",
        hint: "Just output the punchline with console.log",
      },
      {
        id: "joke4",
        setup: "What's a programmer's favorite place to hang out?",
        expectedOutput: "Foo Bar",
        initialCode:
          '// Combine two programming terms\nlet term1 = "Foo";\nlet term2 = "Bar";\n\n// Output the combined terms',
        hint: "Combine term1 and term2 with a space between them",
      },
    ],
  },
  {
    id: "intermediate",
    name: "Function Funnies",
    description: "Functions, arrays, and string manipulation",
    difficulty: "intermediate",
    pointsPerJoke: 20,
    jokes: [
      {
        id: "joke1",
        setup: "Why do JavaScript developers need to wear glasses?",
        expectedOutput: "Because they don't see sharp",
        initialCode:
          "// Create a function that returns the punchline\nfunction getPunchline() {\n  // Your code here\n}\n\nconsole.log(getPunchline());",
        hint: "Return a string with a C# (C sharp) programming language pun",
      },
      {
        id: "joke2",
        setup: "What did the array say after it was extended?",
        expectedOutput: "That felt good, I needed that push",
        initialCode:
          '// Use array methods in your punchline\nlet arr = ["That", "felt", "good,"];\n\n// Complete the joke by adding to the array and outputting it',
        hint: "Use the push() method to add elements to the array, then join them",
      },
      {
        id: "joke3",
        setup: "Why did the functions stop calling each other?",
        expectedOutput: "They had too many arguments",
        initialCode:
          "// Create a function with multiple parameters\nfunction debate(a, b, c, d, e) {\n  // Return the punchline based on the number of parameters\n}\n\nconsole.log(debate(1, 2, 3, 4, 5));",
        hint: "Count the number of arguments in the function",
      },
      {
        id: "joke4",
        setup: "What's a JavaScript developer's favorite sandwich?",
        expectedOutput: "One with Promise and then() some bacon",
        initialCode:
          '// Use a Promise to create the punchline\nnew Promise((resolve) => {\n  resolve("Promise");\n})\n// Chain the promise and output the punchline',
        hint: "Use the then() method to add to the punchline",
      },
    ],
  },
  {
    id: "advanced",
    name: "Async Amusement",
    description: "Promises, callbacks, and timing functions",
    difficulty: "advanced",
    pointsPerJoke: 30,
    jokes: [
      {
        id: "joke1",
        setup: "How do JavaScript developers break up?",
        expectedOutput: "They promise to callback, but then never do",
        initialCode: "// Use async concepts to create the punchline\n\n// Your code here\n",
        hint: "Use both Promise and callback concepts in your answer",
      },
      {
        id: "joke2",
        setup: "Why was the async function so calm under pressure?",
        expectedOutput: "It knew how to await its turn",
        initialCode:
          "// Create an async function\nasync function stressTest() {\n  // Your code here\n}\n\n// Call the function and output the result\nstressTest().then(console.log);",
        hint: "Return a string with a pun about 'await'",
      },
      {
        id: "joke3",
        setup: "What did the JavaScript Promise say to the callback?",
        expectedOutput: "Don't call me, I'll call you... eventually",
        initialCode: "// Create a delayed response using setTimeout\n\n// Your code here\n",
        hint: "Use setTimeout to simulate a delayed response",
      },
    ],
  },
  {
    id: "expert",
    name: "Regex Rib-ticklers",
    description: "Regular expressions, closures, and advanced concepts",
    difficulty: "expert",
    pointsPerJoke: 50,
    jokes: [
      {
        id: "joke1",
        setup: "Why don't regular expressions ever end their relationships?",
        expectedOutput: "They have commitment issues with their /g flag",
        initialCode: "// Use regex concepts in your punchline\nlet regex = /pattern/g;\n\n// Your code here\n",
        hint: "Make a joke about the global flag in regex",
      },
      {
        id: "joke2",
        setup: "What's a closure's favorite hobby?",
        expectedOutput: "Keeping things private while remembering the good times",
        initialCode:
          '// Create a closure to generate the punchline\nfunction createJoke() {\n  let privateMemory = "good times";\n  \n  // Return a function that uses privateMemory\n}\n\nlet tellJoke = createJoke();\nconsole.log(tellJoke());',
        hint: "Use the concept of private variables and memory in closures",
      },
      {
        id: "joke3",
        setup: "Why did the developer go broke?",
        expectedOutput: "Because he used up all his cache",
        initialCode:
          "// Create a memoization function to illustrate the joke\nfunction memoize(fn) {\n  const cache = {};\n  return function(...args) {\n    // Your code here\n  };\n}\n\n// Use the memoize function to output the punchline",
        hint: "Make a pun about cache/cash in your implementation",
      },
    ],
  },
]
