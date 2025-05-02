import type { Challenge, TestCase } from "../types"

export function evaluateCode(
  code: string,
  challenge: Challenge,
): {
  output: string | any
  isCorrect: boolean
  visualData?: any
} {
  // Create a sandbox to safely evaluate the code
  const sandbox = {
    output: "",
    result: undefined as any,
    console: {
      log: (...args: any[]) => {
        sandbox.output = args.join(" ")
        sandbox.result = args.length === 1 ? args[0] : args
      },
      error: (...args: any[]) => {
        sandbox.output = "Error: " + args.join(" ")
      },
      warn: (...args: any[]) => {
        sandbox.output = "Warning: " + args.join(" ")
      },
    },
  }

  try {
    // If the challenge has test cases, we need to evaluate the code as a function
    if (challenge.testCases && challenge.testCases.length > 0) {
      return evaluateWithTestCases(code, challenge.testCases)
    }

    // Otherwise, we just evaluate the code directly
    const codeToEval = `
      ${code}
    `

    // Create a function from the code and execute it with the sandbox as context
    const fn = new Function("console", codeToEval)
    fn(sandbox.console)

    // Check if the output matches the expected output
    const isCorrect = challenge.expectedOutput ? sandbox.output.trim() === challenge.expectedOutput.trim() : false

    // Prepare visualization data
    let visualData
    if (challenge.visualizerType) {
      visualData = prepareVisualizationData(sandbox.result, challenge.visualizerType)
    }

    return {
      output: sandbox.output,
      isCorrect,
      visualData,
    }
  } catch (error) {
    return {
      output: `Error: ${error instanceof Error ? error.message : String(error)}`,
      isCorrect: false,
    }
  }
}

function evaluateWithTestCases(
  code: string,
  testCases: TestCase[],
): {
  output: any
  isCorrect: boolean
  visualData?: any
} {
  try {
    // Extract the function name from the code
    const functionNameMatch = code.match(/function\s+([a-zA-Z0-9_]+)\s*\(/)
    if (!functionNameMatch) {
      return {
        output: "Error: Could not find a function definition in your code",
        isCorrect: false,
      }
    }

    const functionName = functionNameMatch[1]

    // Create a function from the code
    const fn = new Function(`
      ${code}
      return ${functionName};
    `)

    // Get the function
    const userFunction = fn()

    // Test the function against all test cases
    const results = testCases.map((testCase) => {
      try {
        const result = userFunction(...testCase.input)
        const isCorrect = deepEqual(result, testCase.expectedOutput)
        return {
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: result,
          isCorrect,
        }
      } catch (error) {
        return {
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: `Error: ${error instanceof Error ? error.message : String(error)}`,
          isCorrect: false,
        }
      }
    })

    // Check if all test cases passed
    const allPassed = results.every((result) => result.isCorrect)

    // Format the output
    const output = results
      .map((result, index) => {
        return `Test ${index + 1}: ${result.isCorrect ? "PASS" : "FAIL"}
Input: ${JSON.stringify(result.input)}
Expected: ${JSON.stringify(result.expected)}
Actual: ${JSON.stringify(result.actual)}
`
      })
      .join("\n")

    // Prepare visualization data from the first test case if it passed
    let visualData
    if (allPassed && results.length > 0) {
      visualData = results[0].actual
    }

    return {
      output,
      isCorrect: allPassed,
      visualData,
    }
  } catch (error) {
    return {
      output: `Error: ${error instanceof Error ? error.message : String(error)}`,
      isCorrect: false,
    }
  }
}

function deepEqual(a: any, b: any): boolean {
  if (a === b) return true

  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
    return a === b
  }

  const keysA = Object.keys(a)
  const keysB = Object.keys(b)

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key)) return false
    if (!deepEqual(a[key], b[key])) return false
  }

  return true
}

function prepareVisualizationData(data: any, type: string): any {
  switch (type) {
    case "array":
      return Array.isArray(data) ? data : []
    case "object":
      return typeof data === "object" && data !== null ? data : {}
    case "string":
      return typeof data === "string" ? data : String(data)
    default:
      return data
  }
}
