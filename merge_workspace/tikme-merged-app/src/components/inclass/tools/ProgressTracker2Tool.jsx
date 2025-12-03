import { useState, useEffect } from 'react'
import { mockClassStudents } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './ProgressTracker2Tool.css'

// Generate mock student progress data
const generateStudentProgress = () => {
  return mockClassStudents.map(student => ({
    ...student,
    progress: Math.floor(Math.random() * 100),
    timeSpent: Math.floor(Math.random() * 15) + 1, // 1-15 minutes
    questionsAnswered: Math.floor(Math.random() * 10),
    correctAnswers: Math.floor(Math.random() * 8),
    lastActive: new Date(Date.now() - Math.random() * 300000), // Within 5 minutes
    needsHelp: Math.random() > 0.7,
    isComplete: Math.random() > 0.6
  }))
}

function ProgressTracker2Tool() {
  const [isLoading, setIsLoading] = useState(true)
  const [students, setStudents] = useState(generateStudentProgress())
  const [sortBy, setSortBy] = useState('progress') // progress, time, name
  const [filterStatus, setFilterStatus] = useState('all') // all, complete, inProgress, needsHelp
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showActionModal, setShowActionModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStudents(prev => prev.map(student => {
        if (student.isComplete || student.status !== 'active') return student

        const progressIncrease = Math.random() * 5
        const newProgress = Math.min(student.progress + progressIncrease, 100)
        const isNowComplete = newProgress >= 100

        return {
          ...student,
          progress: newProgress,
          timeSpent: student.timeSpent + 1/60, // Add 1 second
          lastActive: new Date(),
          isComplete: isNowComplete,
          needsHelp: !isNowComplete && student.progress < 30 && student.timeSpent > 5
        }
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Calculate stats
  const activeStudents = students.filter(s => s.status === 'active')
  const completedCount = students.filter(s => s.isComplete).length
  const needsHelpCount = students.filter(s => s.needsHelp).length
  const avgProgress = Math.round(activeStudents.reduce((sum, s) => sum + s.progress, 0) / activeStudents.length || 0)
  const avgTime = Math.round(activeStudents.reduce((sum, s) => sum + s.timeSpent, 0) / activeStudents.length || 0)

  // Sort students
  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'progress') return b.progress - a.progress
    if (sortBy === 'time') return b.timeSpent - a.timeSpent
    return a.name.localeCompare(b.name)
  })

  // Filter students
  const filteredStudents = sortedStudents.filter(s => {
    if (filterStatus === 'complete') return s.isComplete
    if (filterStatus === 'inProgress') return !s.isComplete && s.status === 'active'
    if (filterStatus === 'needsHelp') return s.needsHelp
    return true
  })

  // Top performers (top 3)
  const topPerformers = [...students]
    .filter(s => s.status === 'active')
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3)

  // Needs attention (bottom 3 active students not complete)
  const needsAttention = [...students]
    .filter(s => s.status === 'active' && !s.isComplete)
    .sort((a, b) => a.progress - b.progress)
    .slice(0, 3)

  const sendEncouragement = (studentId) => {
    // Mock action
    alert(`Encouragement sent to student!`)
  }

  const awardStar = (studentId) => {
    setStudents(prev => prev.map(s =>
      s.id === studentId ? { ...s, stars: (s.stars || 0) + 1 } : s
    ))
  }

  const requestAttention = (studentId) => {
    alert(`Attention requested from student!`)
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10B981'
    if (progress >= 50) return '#3B82F6'
    if (progress >= 30) return '#F59E0B'
    return '#EF4444'
  }

  const formatTime = (mins) => {
    const m = Math.floor(mins)
    const s = Math.round((mins - m) * 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return <ToolLoader toolName="Tiến độ học sinh" />
  }

  return (
    <div className="progress-tracker2-tool">
      {/* Overview Stats */}
      <div className="tracker2-header">
        <div className="header-stats">
          <div className="header-stat">
            <span className="stat-value">{avgProgress}%</span>
            <span className="stat-label">Avg Progress</span>
          </div>
          <div className="header-stat">
            <span className="stat-value">{completedCount}/{students.length}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="header-stat warning">
            <span className="stat-value">{needsHelpCount}</span>
            <span className="stat-label">Need Help</span>
          </div>
          <div className="header-stat">
            <span className="stat-value">{formatTime(avgTime)}</span>
            <span className="stat-label">Avg Time</span>
          </div>
        </div>

        {/* Controls */}
        <div className="header-controls">
          <div className="filter-buttons">
            {[
              { id: 'all', label: 'All' },
              { id: 'complete', label: 'Done' },
              { id: 'inProgress', label: 'Working' },
              { id: 'needsHelp', label: 'Help' }
            ].map(filter => (
              <button
                key={filter.id}
                className={`filter-btn ${filterStatus === filter.id ? 'active' : ''}`}
                onClick={() => setFilterStatus(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="progress">Sort by Progress</option>
            <option value="time">Sort by Time</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Comparison Panels */}
      <div className="comparison-panels">
        {/* Top Performers */}
        <div className="comparison-panel success">
          <h4>🏆 Top Performers</h4>
          <div className="comparison-list">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="comparison-item">
                <span className="rank">{index + 1}</span>
                <img src={student.avatar} alt={student.name} />
                <span className="name">{student.name}</span>
                <span className="value">{Math.round(student.progress)}%</span>
                <button className="award-btn" onClick={() => awardStar(student.id)}>⭐</button>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="comparison-panel warning">
          <h4>⚠️ Needs Attention</h4>
          <div className="comparison-list">
            {needsAttention.map((student, index) => (
              <div key={student.id} className="comparison-item">
                <span className="rank">{index + 1}</span>
                <img src={student.avatar} alt={student.name} />
                <span className="name">{student.name}</span>
                <span className="value">{Math.round(student.progress)}%</span>
                <button className="help-btn" onClick={() => sendEncouragement(student.id)}>💬</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Progress Grid */}
      <div className="student-progress-grid">
        <h4>All Students ({filteredStudents.length})</h4>
        <div className="progress-grid">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className={`student-progress-card ${student.isComplete ? 'complete' : ''} ${student.needsHelp ? 'needs-help' : ''} ${student.status !== 'active' ? 'offline' : ''}`}
              onClick={() => setSelectedStudent(student)}
            >
              <div className="card-header">
                <img src={student.avatar} alt={student.name} />
                <div className="card-info">
                  <span className="card-name">{student.name}</span>
                  <span className="card-time">{formatTime(student.timeSpent)}</span>
                </div>
                {student.isComplete && <span className="complete-badge">✓</span>}
                {student.needsHelp && <span className="help-badge">!</span>}
              </div>

              <div className="card-progress">
                <div className="progress-bar-wrapper">
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${student.progress}%`,
                      background: getProgressColor(student.progress)
                    }}
                  ></div>
                </div>
                <span className="progress-text">{Math.round(student.progress)}%</span>
              </div>

              <div className="card-stats">
                <span className="mini-stat">
                  ✅ {student.correctAnswers}/{student.questionsAnswered}
                </span>
                {student.stars > 0 && (
                  <span className="mini-stat stars">⭐ {student.stars}</span>
                )}
              </div>

              <div className="card-actions">
                <button
                  className="action-icon"
                  onClick={(e) => { e.stopPropagation(); sendEncouragement(student.id) }}
                  title="Send encouragement"
                >
                  💬
                </button>
                <button
                  className="action-icon"
                  onClick={(e) => { e.stopPropagation(); awardStar(student.id) }}
                  title="Award star"
                >
                  ⭐
                </button>
                <button
                  className="action-icon"
                  onClick={(e) => { e.stopPropagation(); requestAttention(student.id) }}
                  title="Request attention"
                >
                  📢
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="detail-modal" onClick={() => setSelectedStudent(null)}>
          <div className="detail-content" onClick={e => e.stopPropagation()}>
            <div className="detail-header">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} />
              <div>
                <h3>{selectedStudent.name}</h3>
                <span className={`status-badge ${selectedStudent.status}`}>
                  {selectedStudent.status}
                </span>
              </div>
              <button className="close-btn" onClick={() => setSelectedStudent(null)}>×</button>
            </div>

            <div className="detail-progress">
              <div className="big-progress-ring" style={{ '--progress': selectedStudent.progress }}>
                <span>{Math.round(selectedStudent.progress)}%</span>
              </div>
              <div className="progress-label">Current Progress</div>
            </div>

            <div className="detail-stats">
              <div className="detail-stat">
                <span className="label">Time Spent</span>
                <span className="value">{formatTime(selectedStudent.timeSpent)}</span>
              </div>
              <div className="detail-stat">
                <span className="label">Questions</span>
                <span className="value">{selectedStudent.questionsAnswered}</span>
              </div>
              <div className="detail-stat">
                <span className="label">Correct</span>
                <span className="value">{selectedStudent.correctAnswers}</span>
              </div>
              <div className="detail-stat">
                <span className="label">Accuracy</span>
                <span className="value">
                  {selectedStudent.questionsAnswered > 0
                    ? Math.round((selectedStudent.correctAnswers / selectedStudent.questionsAnswered) * 100)
                    : 0}%
                </span>
              </div>
            </div>

            <div className="detail-actions">
              <button className="detail-action" onClick={() => sendEncouragement(selectedStudent.id)}>
                💬 Send Message
              </button>
              <button className="detail-action" onClick={() => awardStar(selectedStudent.id)}>
                ⭐ Award Star
              </button>
              <button className="detail-action" onClick={() => requestAttention(selectedStudent.id)}>
                📢 Request Attention
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressTracker2Tool
