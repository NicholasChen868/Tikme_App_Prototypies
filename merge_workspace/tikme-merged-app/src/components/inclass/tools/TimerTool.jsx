import { useState, useEffect, useRef } from 'react'
import { timerPresets } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './TimerTool.css'

function TimerTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [mode, setMode] = useState('countdown') // countdown | stopwatch
  const [time, setTime] = useState(60)
  const [initialTime, setInitialTime] = useState(60)
  const [isRunning, setIsRunning] = useState(false)
  const [customMinutes, setCustomMinutes] = useState('')
  const [customSeconds, setCustomSeconds] = useState('')
  const audioRef = useRef(null)

  // Initialize loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let interval = null
    if (isRunning) {
      interval = setInterval(() => {
        if (mode === 'countdown') {
          setTime(prev => {
            if (prev <= 1) {
              setIsRunning(false)
              playAlarm()
              return 0
            }
            return prev - 1
          })
        } else {
          setTime(prev => prev + 1)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, mode])

  const playAlarm = () => {
    // Visual feedback since we can't play audio in mock
    document.body.classList.add('timer-alarm-flash')
    setTimeout(() => document.body.classList.remove('timer-alarm-flash'), 3000)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePreset = (seconds) => {
    setTime(seconds)
    setInitialTime(seconds)
    setIsRunning(false)
  }

  const handleCustomSet = () => {
    const mins = parseInt(customMinutes) || 0
    const secs = parseInt(customSeconds) || 0
    const total = mins * 60 + secs
    if (total > 0) {
      setTime(total)
      setInitialTime(total)
      setCustomMinutes('')
      setCustomSeconds('')
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(mode === 'countdown' ? initialTime : 0)
  }

  const progress = mode === 'countdown'
    ? ((initialTime - time) / initialTime) * 100
    : Math.min((time / 600) * 100, 100) // Max 10 min for stopwatch visual

  const getTimerColor = () => {
    if (mode === 'stopwatch') return '#3B82F6'
    if (time <= 10) return '#EF4444'
    if (time <= 30) return '#F59E0B'
    return '#10B981'
  }

  return (
    <div className="timer-tool">
      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'countdown' ? 'active' : ''}`}
          onClick={() => { setMode('countdown'); setTime(initialTime); setIsRunning(false); }}
        >
          ⏳ Đếm ngược
        </button>
        <button
          className={`mode-btn ${mode === 'stopwatch' ? 'active' : ''}`}
          onClick={() => { setMode('stopwatch'); setTime(0); setIsRunning(false); }}
        >
          ⏱️ Bấm giờ
        </button>
      </div>

      {/* Timer Display */}
      <div className="timer-display-container">
        <svg className="timer-ring" viewBox="0 0 200 200">
          <circle
            className="timer-ring-bg"
            cx="100"
            cy="100"
            r="90"
          />
          <circle
            className="timer-ring-progress"
            cx="100"
            cy="100"
            r="90"
            style={{
              stroke: getTimerColor(),
              strokeDasharray: `${2 * Math.PI * 90}`,
              strokeDashoffset: `${2 * Math.PI * 90 * (1 - progress / 100)}`
            }}
          />
        </svg>
        <div className="timer-value" style={{ color: getTimerColor() }}>
          {formatTime(time)}
        </div>
        {mode === 'countdown' && time <= 10 && isRunning && (
          <div className="timer-warning">⚠️ Sắp hết giờ!</div>
        )}
      </div>

      {/* Controls */}
      <div className="timer-controls">
        <button
          className={`control-btn ${isRunning ? 'pause' : 'play'}`}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? '⏸️ Tạm dừng' : '▶️ Bắt đầu'}
        </button>
        <button className="control-btn reset" onClick={handleReset}>
          🔄 Đặt lại
        </button>
      </div>

      {/* Presets (Countdown mode only) */}
      {mode === 'countdown' && (
        <div className="presets-section">
          <h4>Thời gian mẫu</h4>
          <div className="presets-grid">
            {timerPresets.map(preset => (
              <button
                key={preset.id}
                className="preset-btn"
                style={{ '--preset-color': preset.color }}
                onClick={() => handlePreset(preset.seconds)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Time Input (Countdown mode only) */}
      {mode === 'countdown' && (
        <div className="custom-time-section">
          <h4>Tùy chỉnh</h4>
          <div className="custom-time-inputs">
            <input
              type="number"
              placeholder="Phút"
              min="0"
              max="99"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
            />
            <span>:</span>
            <input
              type="number"
              placeholder="Giây"
              min="0"
              max="59"
              value={customSeconds}
              onChange={(e) => setCustomSeconds(e.target.value)}
            />
            <button className="set-btn" onClick={handleCustomSet}>
              Đặt
            </button>
          </div>
        </div>
      )}

      {/* Add +30s button when running */}
      {isRunning && mode === 'countdown' && (
        <button
          className="add-time-btn"
          onClick={() => setTime(prev => prev + 30)}
        >
          +30 giây
        </button>
      )}
    </div>
  )
}

export default TimerTool
