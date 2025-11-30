import { useState, useRef, useEffect } from 'react'
import { ToolLoader } from '@/components/common/LoadingStates'
import './WhiteboardTool.css'

function WhiteboardTool() {
  const [isLoading, setIsLoading] = useState(true)
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#1a202c')
  const [brushSize, setBrushSize] = useState(3)
  const [tool, setTool] = useState('pen') // pen | eraser | text
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const contextRef = useRef(null)

  const colors = [
    '#1a202c', '#EF4444', '#F59E0B', '#10B981',
    '#3B82F6', '#8B5CF6', '#EC4899', '#FFFFFF'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    canvas.style.width = `${canvas.offsetWidth}px`
    canvas.style.height = `${canvas.offsetHeight}px`

    const context = canvas.getContext('2d')
    context.scale(2, 2)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = color
    context.lineWidth = brushSize
    contextRef.current = context

    // Fill white background
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvas.width, canvas.height)

    // Save initial state
    saveToHistory()
  }, [])

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
      contextRef.current.lineWidth = tool === 'eraser' ? brushSize * 3 : brushSize
    }
  }, [color, brushSize, tool])

  const saveToHistory = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const imageData = canvas.toDataURL()
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const getCoordinates = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    const { x, y } = getCoordinates(e)
    contextRef.current.beginPath()
    contextRef.current.moveTo(x, y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    const { x, y } = getCoordinates(e)
    contextRef.current.lineTo(x, y)
    contextRef.current.stroke()
  }

  const stopDrawing = () => {
    if (isDrawing) {
      contextRef.current.closePath()
      setIsDrawing(false)
      saveToHistory()
    }
  }

  const handleUndo = () => {
    if (historyIndex <= 0) return
    const newIndex = historyIndex - 1
    setHistoryIndex(newIndex)
    loadFromHistory(history[newIndex])
  }

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return
    const newIndex = historyIndex + 1
    setHistoryIndex(newIndex)
    loadFromHistory(history[newIndex])
  }

  const loadFromHistory = (imageData) => {
    const canvas = canvasRef.current
    const context = contextRef.current
    const img = new Image()
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, 0, 0, canvas.offsetWidth, canvas.offsetHeight)
    }
    img.src = imageData
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const context = contextRef.current
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }

  const handleDownload = () => {
    const canvas = canvasRef.current
    const link = document.createElement('a')
    link.download = `whiteboard-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="whiteboard-tool">
      {/* Toolbar */}
      <div className="whiteboard-toolbar">
        {/* Tools */}
        <div className="toolbar-group">
          <button
            className={`tool-btn ${tool === 'pen' ? 'active' : ''}`}
            onClick={() => setTool('pen')}
            title="Bút vẽ"
          >
            ✏️
          </button>
          <button
            className={`tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Tẩy"
          >
            🧹
          </button>
        </div>

        {/* Colors */}
        <div className="toolbar-group colors">
          {colors.map((c) => (
            <button
              key={c}
              className={`color-btn ${color === c ? 'active' : ''}`}
              style={{ background: c, border: c === '#FFFFFF' ? '2px solid #e2e8f0' : 'none' }}
              onClick={() => { setColor(c); setTool('pen'); }}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="toolbar-group">
          <span className="size-label">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="size-slider"
          />
          <span className="size-value">{brushSize}</span>
        </div>

        {/* Actions */}
        <div className="toolbar-group">
          <button
            className="action-btn"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Hoàn tác"
          >
            ↩️
          </button>
          <button
            className="action-btn"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Làm lại"
          >
            ↪️
          </button>
          <button className="action-btn" onClick={handleClear} title="Xóa tất cả">
            🗑️
          </button>
          <button className="action-btn" onClick={handleDownload} title="Tải xuống">
            💾
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="whiteboard-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Current Tool Indicator */}
      <div className="tool-indicator">
        <span>{tool === 'pen' ? '✏️ Bút vẽ' : '🧹 Tẩy'}</span>
        <span style={{ background: tool === 'eraser' ? '#FFFFFF' : color }} className="current-color" />
      </div>
    </div>
  )
}

export default WhiteboardTool
