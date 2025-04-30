export default function Loading() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-t-4 border-primary rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-r-4 border-purple-400 rounded-full animate-spin animate-reverse"></div>
          </div>
          <p className="mt-4 text-white/70">Loading awesome games...</p>
        </div>
      </div>
    )
  }
  