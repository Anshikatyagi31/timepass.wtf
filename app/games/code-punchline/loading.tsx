export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-300 border-r-4 border-yellow-300 border-b-4 border-transparent"></div>
          <h2 className="mt-4 text-xl text-yellow-300">Loading jokes and code...</h2>
          <p className="text-purple-300 mt-2">Preparing some hilarious punchlines!</p>
        </div>
      </div>
    )
  }
  