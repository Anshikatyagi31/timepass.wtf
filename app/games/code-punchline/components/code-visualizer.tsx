"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CodeVisualizerProps {
  visualData?: any
}

export default function CodeVisualizer({ visualData }: CodeVisualizerProps) {
  const [activeTab, setActiveTab] = useState("array")

  useEffect(() => {
    // If we have visual data, set the active tab based on the data type
    if (visualData) {
      if (Array.isArray(visualData)) {
        setActiveTab("array")
      } else if (typeof visualData === "object") {
        setActiveTab("object")
      } else if (typeof visualData === "string") {
        setActiveTab("string")
      }
    }
  }, [visualData])

  if (!visualData) {
    return (
      <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-6 shadow-xl border border-purple-500/50 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2 text-purple-200">Code Visualizer</h3>
          <p className="text-purple-300">Run your code to see a visualization of the output here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-6 shadow-xl border border-purple-500/50">
      <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
        Code Visualizer
      </h3>

      <div className="mb-4">
        <div className="flex space-x-2 border-b border-purple-700">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "array" ? "border-b-2 border-pink-500 text-white" : "text-purple-300"
            }`}
            onClick={() => setActiveTab("array")}
          >
            Array
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "object" ? "border-b-2 border-pink-500 text-white" : "text-purple-300"
            }`}
            onClick={() => setActiveTab("object")}
          >
            Object
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "string" ? "border-b-2 border-pink-500 text-white" : "text-purple-300"
            }`}
            onClick={() => setActiveTab("string")}
          >
            String
          </button>
        </div>
      </div>

      <div className="min-h-[300px]">
        {activeTab === "array" && Array.isArray(visualData) && <ArrayVisualizer data={visualData} />}
        {activeTab === "object" && typeof visualData === "object" && !Array.isArray(visualData) && (
          <ObjectVisualizer data={visualData} />
        )}
        {activeTab === "string" && typeof visualData === "string" && <StringVisualizer data={visualData} />}
      </div>
    </div>
  )
}

function ArrayVisualizer({ data }: { data: any[] }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="bg-indigo-800/60 p-3 rounded-lg border border-indigo-600/30 min-w-[60px] text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-xs text-indigo-300 mb-1">Index {index}</div>
            <div className="font-mono text-white">{typeof item === "object" ? JSON.stringify(item) : String(item)}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-indigo-900/40 p-4 rounded-lg">
        <h4 className="text-sm font-bold text-indigo-200 mb-2">Array Methods</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-indigo-800/40 p-2 rounded">
            <span className="font-bold">Length:</span> {data.length}
          </div>
          <div className="bg-indigo-800/40 p-2 rounded">
            <span className="font-bold">First:</span> {data.length > 0 ? String(data[0]) : "N/A"}
          </div>
          <div className="bg-indigo-800/40 p-2 rounded">
            <span className="font-bold">Last:</span> {data.length > 0 ? String(data[data.length - 1]) : "N/A"}
          </div>
        </div>
      </div>
    </div>
  )
}

function ObjectVisualizer({ data }: { data: Record<string, any> }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(data).map(([key, value], index) => (
          <motion.div
            key={key}
            className="bg-indigo-800/60 p-3 rounded-lg border border-indigo-600/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-xs text-indigo-300 mb-1">Property</div>
            <div className="font-mono text-pink-300 mb-2">{key}</div>
            <div className="text-xs text-indigo-300 mb-1">Value</div>
            <div className="font-mono text-white break-words">
              {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 bg-indigo-900/40 p-4 rounded-lg">
        <h4 className="text-sm font-bold text-indigo-200 mb-2">Object Info</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-indigo-800/40 p-2 rounded">
            <span className="font-bold">Properties:</span> {Object.keys(data).length}
          </div>
          <div className="bg-indigo-800/40 p-2 rounded">
            <span className="font-bold">Keys:</span> {Object.keys(data).slice(0, 3).join(", ")}
            {Object.keys(data).length > 3 ? "..." : ""}
          </div>
          <div className="bg-indigo-800/40 p-2 rounded">
            <span className="font-bold">Type:</span> {Object.prototype.toString.call(data)}
          </div>
        </div>
      </div>
    </div>
  )
}

function StringVisualizer({ data }: { data: string }) {
  return (
    <div className="space-y-4">
      <div className="bg-indigo-800/60 p-4 rounded-lg border border-indigo-600/30">
        <div className="text-xs text-indigo-300 mb-2">String Value</div>
        <div className="font-mono text-white break-words">{data}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <motion.div
          className="bg-indigo-800/60 p-3 rounded-lg border border-indigo-600/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-xs text-indigo-300 mb-1">Characters</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {data.split("").map((char, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center bg-indigo-900 rounded text-white font-mono text-sm"
              >
                {char === " " ? "␣" : char}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-indigo-800/60 p-3 rounded-lg border border-indigo-600/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-xs text-indigo-300 mb-1">String Methods</div>
          <div className="grid grid-cols-1 gap-2 text-xs mt-2">
            <div className="bg-indigo-900/40 p-2 rounded">
              <span className="font-bold">Length:</span> {data.length}
            </div>
            <div className="bg-indigo-900/40 p-2 rounded">
              <span className="font-bold">Uppercase:</span> {data.toUpperCase()}
            </div>
            <div className="bg-indigo-900/40 p-2 rounded">
              <span className="font-bold">Lowercase:</span> {data.toLowerCase()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
