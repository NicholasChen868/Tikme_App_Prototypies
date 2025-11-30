import { useState, useEffect } from 'react'
import StudentListItem from '@/components/inclass/StudentListItem'
import {
  TimerTool,
  StudentPickerTool,
  PollingTool,
  QuizTool,
  WhiteboardTool,
  FlashcardTool,
  AttendanceTool,
  BehaviorTool,
  GroupManagerTool,
  BreakoutRoomsTool,
  ScreenShareTool,
  ProgressTracker1Tool,
  ProgressTracker2Tool
} from '@/components/inclass/tools'
import { phases, mockClassStudents, teachingTools, lessonInfo } from '@/utils/inclassData'
import '@/styles/inclass-vars.css'
import './styles.css'

// Tool component mapping
const toolComponents = {
  timer: TimerTool,
  picker: StudentPickerTool,
  poll: PollingTool,
  quiz: QuizTool,
  whiteboard: WhiteboardTool,
  flashcard: FlashcardTool,
  attendance: AttendanceTool,
  behavior: BehaviorTool,
  groups: GroupManagerTool,
  breakout: BreakoutRoomsTool,
  screen: ScreenShareTool,
  progress1: ProgressTracker1Tool,
  progress2: ProgressTracker2Tool
}

function InClassTeaching() {
  const [currentPhase, setCurrentPhase] = useState('warmup')
  const [timeRemaining, setTimeRemaining] = useState(90 * 60) // 90 minutes in seconds
  const [activeTool, setActiveTool] = useState(null)
  const [studentPanelCollapsed, setStudentPanelCollapsed] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Timer countdown
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const activeStudents = mockClassStudents.filter(s => s.status === 'active').length
  const handRaisedCount = mockClassStudents.filter(s => s.handRaised).length

  // Render active tool component
  const renderActiveTool = () => {
    if (!activeTool) return null
    const ToolComponent = toolComponents[activeTool]
    return ToolComponent ? <ToolComponent /> : null
  }

  const getTimerStatus = () => {
    if (timeRemaining < 300) return 'critical'
    if (timeRemaining < 600) return 'warning'
    return 'normal'
  }

  return (
    <div className="inclass-teaching">
      {/* Header Bar */}
      <div className="teaching-header">
        <div className="class-info">
          <div className="class-badge">{lessonInfo.level}</div>
          <div className="class-details">
            <h2>{lessonInfo.lesson}</h2>
            <p className="class-meta">
              <span>{lessonInfo.topic}</span>
              <span>•</span>
              <span>👥 {activeStudents}/{mockClassStudents.length}</span>
              {handRaisedCount > 0 && (
                <>
                  <span>•</span>
                  <span className="hand-raised">🙋 {handRaisedCount}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="timer-section">
          <div className="phase-timer">
            <div className="phase-name">{phases.find(p => p.id === currentPhase)?.name}</div>
            <div className="phase-duration">
              {phases.find(p => p.id === currentPhase)?.duration} min
            </div>
          </div>
          <div className={`main-timer ${getTimerStatus()}`}>
            <button
              className="timer-control-btn"
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? '▶️' : '⏸️'}
            </button>
            <div className="timer-display">
              <span className="timer-label">Total</span>
              <span className="timer-value">{formatTime(timeRemaining)}</span>
            </div>
            {timeRemaining < 600 && (
              <span className="timer-warning-icon">⚠️</span>
            )}
          </div>
        </div>
      </div>

      {/* Phase Bar */}
      <div className="phase-bar">
        {phases.map((phase, index) => {
          const isActive = currentPhase === phase.id
          const isPast = phases.findIndex(p => p.id === currentPhase) > index

          return (
            <button
              key={phase.id}
              className={`phase-btn ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
              style={{
                '--phase-color': phase.color,
                '--phase-gradient': phase.gradient
              }}
              onClick={() => setCurrentPhase(phase.id)}
            >
              <span className="phase-icon">
                {isPast ? '✓' : index + 1}
              </span>
              <span className="phase-name">{phase.name}</span>
              <span className="phase-duration">{phase.duration}m</span>
            </button>
          )
        })}
      </div>

      {/* Teaching Content */}
      <div className="teaching-content">
        {/* Tools Palette */}
        <div className="tools-palette">
          <div className="tools-header">
            <span className="tools-title">Tools</span>
          </div>
          <div className="tools-grid">
            {teachingTools.map((tool) => (
              <button
                key={tool.id}
                className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                style={{ '--tool-color': tool.color }}
                onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                title={tool.name}
              >
                <span className="tool-icon">{tool.icon}</span>
                <span className="tool-name">{tool.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Teaching Area */}
        <div className="main-teaching-area">
          <div className="teaching-canvas">
            {activeTool ? (
              <>
                <div className="canvas-header">
                  <div className="canvas-title">
                    <span className="canvas-icon">{teachingTools.find(t => t.id === activeTool)?.icon}</span>
                    <h3>{teachingTools.find(t => t.id === activeTool)?.name}</h3>
                  </div>
                  <div className="canvas-actions">
                    <button className="icon-btn" title="Fullscreen">⛶</button>
                    <button
                      className="icon-btn close"
                      onClick={() => setActiveTool(null)}
                      title="Đóng"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <div className="canvas-body">
                  {renderActiveTool()}
                </div>
              </>
            ) : (
              <div className="welcome-view">
                <div className="welcome-content">
                  <h2>👨‍🏫 Sẵn sàng giảng dạy</h2>
                  <p>Chọn công cụ từ thanh bên trái để bắt đầu</p>
                  <div className="phase-info">
                    <span
                      className="current-phase-badge"
                      style={{
                        background: phases.find(p => p.id === currentPhase)?.gradient
                      }}
                    >
                      {phases.find(p => p.id === currentPhase)?.name} Phase
                    </span>
                  </div>

                  {/* Quick Start Tools */}
                  <div className="quick-start-tools">
                    <h4>Bắt đầu nhanh:</h4>
                    <div className="quick-tools-grid">
                      {teachingTools.slice(0, 4).map(tool => (
                        <button
                          key={tool.id}
                          className="quick-tool-btn"
                          style={{ '--tool-color': tool.color }}
                          onClick={() => setActiveTool(tool.id)}
                        >
                          <span className="tool-icon">{tool.icon}</span>
                          <span className="tool-name">{tool.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Panel */}
        <div className={`student-panel ${studentPanelCollapsed ? 'collapsed' : ''}`}>
          <div className="panel-header">
            <div className="panel-title">
              {!studentPanelCollapsed && (
                <>
                  <span>Students</span>
                  <span className="student-count">{mockClassStudents.length}</span>
                </>
              )}
            </div>
            <button
              className="collapse-btn"
              onClick={() => setStudentPanelCollapsed(!studentPanelCollapsed)}
            >
              {studentPanelCollapsed ? '◀' : '▶'}
            </button>
          </div>

          {!studentPanelCollapsed && (
            <>
              {/* Panel Quick Stats */}
              <div className="panel-stats">
                <div className="panel-stat active">
                  <span className="stat-value">{activeStudents}</span>
                  <span className="stat-label">Online</span>
                </div>
                <div className="panel-stat">
                  <span className="stat-value">{handRaisedCount}</span>
                  <span className="stat-label">🙋</span>
                </div>
              </div>

              {/* Student List */}
              <div className="panel-body">
                <div className="student-list">
                  {mockClassStudents.map(student => (
                    <StudentListItem key={student.id} student={student} />
                  ))}
                </div>
              </div>

              {/* Panel Actions */}
              <div className="panel-actions">
                <button className="panel-action-btn" title="Mute All">
                  🔇 All
                </button>
                <button className="panel-action-btn" title="Message All">
                  💬
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default InClassTeaching
