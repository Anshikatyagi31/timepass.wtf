import type { ChallengeCategory } from "../types"

export const challenges: ChallengeCategory[] = [
  {
    id: "jokes",
    name: "Code Punchlines",
    description: "Complete the jokes with JavaScript",
    icon: "smile",
    pointsPerChallenge: 10,
    challenges: [
      {
        id: "joke1",
        title: "Why do programmers prefer dark mode?",
        description: "Complete the joke by returning the punchline",
        type: "code",
        difficulty: "beginner",
        expectedOutput: "Because light attracts bugs!",
        initialCode: "function getJokePunchline() {\n  // Return the punchline\n  \n}",
        hints: [
          "Think about what bugs are attracted to in real life",
          "Programmers call errors in their code 'bugs'",
          "Return a string that mentions bugs being attracted to light",
        ],
        explanation:
          "This joke plays on the dual meaning of 'bugs' - both insects that are attracted to light and errors in code that programmers try to avoid.",
        visualizerType: "string",
      },
      {
        id: "joke2",
        title: "How many programmers does it take to change a light bulb?",
        description: "Use string methods to complete this classic joke",
        type: "code",
        difficulty: "beginner",
        expectedOutput: "None, that's a hardware problem!",
        initialCode:
          '// Use string methods to construct the punchline\nconst part1 = "None";\nconst part2 = "hardware problem";\n\n// Complete the joke by combining the parts with proper punctuation',
        hints: [
          "Use string concatenation or template literals",
          "Don't forget to add the comma and apostrophe",
          "The final string should be: None, that's a hardware problem!",
        ],
        visualizerType: "string",
      },
      {
        id: "joke3",
        title: "Why did the functions stop calling each other?",
        description: "Use a function with parameters to deliver the punchline",
        type: "code",
        difficulty: "intermediate",
        expectedOutput: "They had too many arguments!",
        initialCode:
          "function debate(a, b, c, d, e) {\n  // Count the parameters and use that in your punchline\n  \n}",
        hints: [
          "Count the number of parameters in the function",
          "In JavaScript, function parameters are also called 'arguments'",
          "The joke plays on the double meaning of 'arguments'",
        ],
        visualizerType: "string",
      },
    ],
  },
  {
    id: "arrays",
    name: "Array Adventures",
    description: "Master JavaScript array methods",
    icon: "list",
    pointsPerChallenge: 15,
    challenges: [
      {
        id: "array1",
        title: "Filter the Evens",
        description: "Use array methods to filter out all odd numbers",
        type: "code",
        difficulty: "beginner",
        initialCode: "function filterEvenNumbers(numbers) {\n  // Use array methods to return only even numbers\n  \n}",
        testCases: [
          {
            input: [[1, 2, 3, 4, 5, 6]],
            expectedOutput: [2, 4, 6],
            description: "Should return only even numbers",
          },
          {
            input: [[11, 13, 15]],
            expectedOutput: [],
            description: "Should return empty array when no even numbers exist",
          },
        ],
        hints: ["Use the filter() method", "A number is even if number % 2 === 0", "Return the filtered array"],
        visualizerType: "array",
      },
      {
        id: "array2",
        title: "Sum It Up",
        description: "Calculate the sum of all numbers in an array",
        type: "code",
        difficulty: "beginner",
        initialCode: "function sumArray(numbers) {\n  // Use array methods to sum all numbers\n  \n}",
        testCases: [
          {
            input: [[1, 2, 3, 4, 5]],
            expectedOutput: 15,
            description: "Should sum all numbers in the array",
          },
          {
            input: [[-1, 1]],
            expectedOutput: 0,
            description: "Should handle negative numbers",
          },
        ],
        hints: [
          "Use the reduce() method",
          "The reduce method takes a callback with accumulator and current value",
          "Start with an initial value of 0",
        ],
        visualizerType: "array",
      },
      {
        id: "array3",
        title: "Transform and Conquer",
        description: "Transform an array of numbers into their squares",
        type: "code",
        difficulty: "intermediate",
        initialCode: "function squareNumbers(numbers) {\n  // Transform each number into its square\n  \n}",
        testCases: [
          {
            input: [[1, 2, 3, 4]],
            expectedOutput: [1, 4, 9, 16],
            description: "Should square each number",
          },
          {
            input: [[-2, 0, 2]],
            expectedOutput: [4, 0, 4],
            description: "Should handle negative numbers",
          },
        ],
        hints: [
          "Use the map() method",
          "For each number, return number * number",
          "The map method creates a new array with the results",
        ],
        visualizerType: "array",
      },
    ],
  },
  {
    id: "strings",
    name: "String Sorcery",
    description: "Master JavaScript string manipulation",
    icon: "type",
    pointsPerChallenge: 15,
    challenges: [
      {
        id: "string1",
        title: "Reverse Engineer",
        description: "Create a function that reverses a string",
        type: "code",
        difficulty: "beginner",
        initialCode: "function reverseString(str) {\n  // Reverse the string\n  \n}",
        testCases: [
          {
            input: ["hello"],
            expectedOutput: "olleh",
            description: "Should reverse the string",
          },
          {
            input: ["JavaScript"],
            expectedOutput: "tpircSavaJ",
            description: "Should handle mixed case",
          },
        ],
        hints: [
          "Split the string into an array of characters",
          "Reverse the array",
          "Join the array back into a string",
        ],
        visualizerType: "string",
      },
      {
        id: "string2",
        title: "Palindrome Detector",
        description: "Check if a string is a palindrome (reads the same forward and backward)",
        type: "code",
        difficulty: "intermediate",
        initialCode:
          "function isPalindrome(str) {\n  // Check if the string is a palindrome\n  // Return true or false\n  \n}",
        testCases: [
          {
            input: ["racecar"],
            expectedOutput: true,
            description: "Should identify palindromes",
          },
          {
            input: ["hello"],
            expectedOutput: false,
            description: "Should return false for non-palindromes",
          },
          {
            input: ["A man a plan a canal Panama"],
            expectedOutput: true,
            description: "Should handle spaces and case",
          },
        ],
        hints: [
          "Remove spaces and convert to lowercase",
          "Compare the string with its reverse",
          "Use string methods like replace() with regex to remove non-alphanumeric characters",
        ],
        visualizerType: "string",
      },
      {
        id: "string3",
        title: "Word Counter",
        description: "Count the number of words in a string",
        type: "code",
        difficulty: "beginner",
        initialCode: "function countWords(sentence) {\n  // Count the number of words\n  \n}",
        testCases: [
          {
            input: ["Hello world"],
            expectedOutput: 2,
            description: "Should count words separated by spaces",
          },
          {
            input: [""],
            expectedOutput: 0,
            description: "Should handle empty strings",
          },
          {
            input: ["One-two three:four"],
            expectedOutput: 4,
            description: "Should handle punctuation",
          },
        ],
        hints: ["Split the string by spaces", "Filter out empty strings", "Return the length of the resulting array"],
        visualizerType: "string",
      },
    ],
  },
  {
    id: "objects",
    name: "Object Odyssey",
    description: "Master JavaScript objects and their methods",
    icon: "box",
    pointsPerChallenge: 20,
    challenges: [
      {
        id: "object1",
        title: "Property Finder",
        description: "Extract specific properties from an object",
        type: "code",
        difficulty: "beginner",
        initialCode: "function getPersonInfo(person) {\n  // Return an object with only name and age properties\n  \n}",
        testCases: [
          {
            input: [{ name: "John", age: 30, job: "Developer", city: "New York" }],
            expectedOutput: { name: "John", age: 30 },
            description: "Should extract only name and age",
          },
        ],
        hints: [
          "Use object destructuring to get the properties",
          "Create a new object with just the properties you need",
          "You can use the spread operator or Object.entries() with filter()",
        ],
        visualizerType: "object",
      },
      {
        id: "object2",
        title: "Deep Clone",
        description: "Create a deep clone of an object",
        type: "code",
        difficulty: "advanced",
        initialCode: "function deepClone(obj) {\n  // Create a deep clone of the object\n  \n}",
        testCases: [
          {
            input: [{ a: 1, b: { c: 2 } }],
            expectedOutput: { a: 1, b: { c: 2 } },
            description: "Should clone nested objects",
          },
        ],
        hints: [
          "JSON.parse(JSON.stringify()) works for simple objects",
          "For a more robust solution, check the type of each property",
          "Recursively clone objects and arrays",
        ],
        visualizerType: "object",
      },
      {
        id: "object3",
        title: "Object Transformer",
        description: "Transform an array of objects into a single object",
        type: "code",
        difficulty: "intermediate",
        initialCode:
          "function arrayToObject(array) {\n  // Transform array of objects into a single object\n  // using the 'id' property as keys\n  \n}",
        testCases: [
          {
            input: [
              [
                { id: "a", value: 1 },
                { id: "b", value: 2 },
              ],
            ],
            expectedOutput: { a: { id: "a", value: 1 }, b: { id: "b", value: 2 } },
            description: "Should transform array to object using id as keys",
          },
        ],
        hints: [
          "Use reduce() to accumulate the result",
          "For each object, add a new property to the accumulator",
          "Use the id as the key and the entire object as the value",
        ],
        visualizerType: "object",
      },
    ],
  },
]
