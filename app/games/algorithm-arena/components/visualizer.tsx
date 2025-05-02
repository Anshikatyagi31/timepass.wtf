"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface VisualizerProps {
  data: any
  type: string
}

export default function Visualizer({ data, type }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // For tree visualization
  if (type === "tree" && data?.nodes) {
    return <TreeVisualizer data={data} />
  }

  // For graph visualization
  if (type === "graph" && data?.nodes) {
    return <GraphVisualizer data={data} />
  }

  // Default array visualization
  return <ArrayVisualizer data={data} />
}

function ArrayVisualizer({ data }: { data: any }) {
  if (!data || !data.array) {
    return <div>No data to visualize</div>
  }

  const { array, highlights, pointers, message } = data

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-1 mb-6">
        {array.map((value: any, index: number) => {
          const isHighlighted = highlights?.includes(index)
          const pointer = pointers?.find((p: any) => p.index === index)

          return (
            <div key={index} className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  backgroundColor: isHighlighted ? "rgba(124, 58, 237, 0.2)" : "rgba(255, 255, 255, 0.05)",
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`
                  w-12 h-12 flex items-center justify-center rounded-md border
                  ${isHighlighted ? "border-primary text-primary font-bold" : "border-white/10 text-white/80"}
                `}
              >
                {value}
              </motion.div>

              {pointer && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: -20, opacity: 1 }}
                  className="absolute top-0 left-0 right-0 text-center text-xs font-bold text-primary"
                >
                  {pointer.name}
                </motion.div>
              )}

              <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-white/60">{index}</div>
            </div>
          )
        })}
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-primary/10 rounded-md border border-primary/20 text-sm"
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}

function TreeVisualizer({ data }: { data: any }) {
  if (!data || !data.nodes) {
    return <div>No tree data to visualize</div>
  }

  const { nodes, highlights, message } = data

  // Calculate positions for a binary tree layout
  const treeDepth = Math.ceil(Math.log2(nodes.length + 1))
  const levelWidth = Math.pow(2, treeDepth - 1) * 60

  const getNodePosition = (index: number) => {
    const level = Math.floor(Math.log2(index + 1))
    const position = index - Math.pow(2, level) + 1
    const totalNodesInLevel = Math.pow(2, level)
    const x = (position + 0.5) * (levelWidth / totalNodesInLevel)
    const y = level * 70 + 30
    return { x, y }
  }

  return (
    <div className="w-full h-full overflow-auto">
      <svg width={levelWidth} height={treeDepth * 70 + 60} className="mx-auto">
        {/* Draw edges first so they appear behind nodes */}
        {nodes.map((node: any, index: number) => {
          if (index === 0) return null // Root has no parent

          const parentIndex = Math.floor((index - 1) / 2)
          const { x: x1, y: y1 } = getNodePosition(parentIndex)
          const { x: x2, y: y2 } = getNodePosition(index)

          return (
            <line
              key={`edge-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth={2}
            />
          )
        })}

        {/* Draw nodes */}
        {nodes.map((value: any, index: number) => {
          if (value === null) return null

          const isHighlighted = highlights?.includes(index)
          const { x, y } = getNodePosition(index)

          return (
            <g key={`node-${index}`} transform={`translate(${x}, ${y})`}>
              <circle
                r={20}
                fill={isHighlighted ? "rgba(124, 58, 237, 0.3)" : "rgba(255, 255, 255, 0.1)"}
                stroke={isHighlighted ? "rgb(124, 58, 237)" : "rgba(255, 255, 255, 0.3)"}
                strokeWidth={2}
              />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHighlighted ? "rgb(124, 58, 237)" : "white"}
                fontWeight={isHighlighted ? "bold" : "normal"}
                fontSize={14}
              >
                {value}
              </text>
            </g>
          )
        })}
      </svg>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-primary/10 rounded-md border border-primary/20 text-sm mt-4"
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}

function GraphVisualizer({ data }: { data: any }) {
  if (!data || !data.nodes) {
    return <div>No graph data to visualize</div>
  }

  const { nodes, edges, highlights, message } = data
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const width = canvas.width
    const height = canvas.height

    // Calculate node positions in a circle
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 40

    const nodePositions = nodes.map((_, i) => {
      const angle = (i / nodes.length) * 2 * Math.PI
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })

    // Draw edges
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 2

    edges.forEach((edge: any) => {
      const { from, to, directed = false, highlighted = false } = edge

      if (highlighted) {
        ctx.strokeStyle = "rgba(124, 58, 237, 0.6)"
      } else {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
      }

      const fromPos = nodePositions[from]
      const toPos = nodePositions[to]

      ctx.beginPath()
      ctx.moveTo(fromPos.x, fromPos.y)
      ctx.lineTo(toPos.x, toPos.y)
      ctx.stroke()

      // Draw arrow if directed
      if (directed) {
        const angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x)
        const arrowSize = 10

        ctx.beginPath()
        ctx.moveTo(
          toPos.x - arrowSize * Math.cos(angle - Math.PI / 6),
          toPos.y - arrowSize * Math.sin(angle - Math.PI / 6),
        )
        ctx.lineTo(toPos.x, toPos.y)
        ctx.lineTo(
          toPos.x - arrowSize * Math.cos(angle + Math.PI / 6),
          toPos.y - arrowSize * Math.sin(angle + Math.PI / 6),
        )
        ctx.closePath()
        ctx.fillStyle = highlighted ? "rgba(124, 58, 237, 0.6)" : "rgba(255, 255, 255, 0.2)"
        ctx.fill()
      }
    })

    // Draw nodes
    nodes.forEach((node: any, i: number) => {
      const isHighlighted = highlights?.includes(i)
      const pos = nodePositions[i]

      // Draw node circle
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI)
      ctx.fillStyle = isHighlighted ? "rgba(124, 58, 237, 0.3)" : "rgba(255, 255, 255, 0.1)"
      ctx.fill()
      ctx.strokeStyle = isHighlighted ? "rgb(124, 58, 237)" : "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw node value
      ctx.fillStyle = isHighlighted ? "rgb(124, 58, 237)" : "white"
      ctx.font = isHighlighted ? "bold 14px Arial" : "14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(node.toString(), pos.x, pos.y)
    })
  }, [data, nodes, edges, highlights, message])

  return (
    <div className="w-full h-full flex flex-col">
      <canvas ref={canvasRef} width={400} height={300} className="mx-auto" />

      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-primary/10 rounded-md border border-primary/20 text-sm mt-4"
        >
          {message}
        </motion.div>
      )}
    </div>
  )
}
