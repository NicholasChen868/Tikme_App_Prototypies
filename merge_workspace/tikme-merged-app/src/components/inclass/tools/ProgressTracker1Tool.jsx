import { useState, useEffect } from 'react'
import ToolLoader from '@/components/common/LoadingStates'
import './ProgressTracker1Tool.css'

// Default lesson activities
const defaultActivities = [
  { id: 1, name: 'Warm-up Discussion', duration: 5, elapsed: 5, completed: true, icon: '💬' },
  { id: 2, name: 'Vocabulary Review', duration: 10, elapsed: 10, completed: true, icon: '📚' },
  { id: 3, name: 'Grammar Explanation', duration: 15, elapsed: 8, completed: false, icon: '📝' },
  { id: 4, name: 'Listening Practice', duration: 10, elapsed: 0, completed: false, icon: '🎧' },
  { id: 5, name: 'Speaking Activity', duration: 15, elapsed: 0, completed: false, icon: '🗣️' },
  { id: 6, name: 'Group Work', duration: 10, elapsed: 0, completed: false, icon: '👥' },
  { id: 7, name: 'Wrap-up & Homework', duration: 5, elapsed: 0, completed: false, icon: '📋' }
]

const activityIcons = ['💬', '📚', '📝', '🎧', '🗣️', '👥', '📋', '🎮', '✍️', '🎯', '📊', '🎬']

function ProgressTracker1Tool() {
  const [isLoading, setIsLoading] = useState(true)
  const [activities, setActivities] = useState(defaultActivities)
  const [currentActivityId, setCurrentActivityId] = useState(3)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newActivity, setNewActivity] = useState({ name: '', duration: 10, icon: '📝' })
  const [draggedId, setDraggedId] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Auto-increment elapsed time for current activity
  useEffect(() => {
    const current = activities.find(a => a.id === currentActivityId && !a.completed)
    if (!current) return

    const timer = setInterval(() => {
      setActivities(prev => prev.map(a => {
        if (a.id === currentActivityId && !a.completed) {
          const newElapsed = a.elapsed + 1/60 // Add 1 second (in minutes)
          return { ...a, elapsed: Math.min(newElapsed, a.duration * 1.5) } // Cap at 150%
        }
        return a
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [currentActivityId, activities])

  const totalDuration = activities.reduce((sum, a) => sum + a.duration, 0)
  const totalElapsed = activities.reduce((sum, a) => sum + a.elapsed, 0)
  const completedCount = activities.filter(a => a.completed).length
  const overallProgress = (totalElapsed / totalDuration) * 100

  const markComplete = (id) => {
    setActivities(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, completed: true, elapsed: a.duration }
      }
      return a
    }))

    // Move to next activity
    const currentIndex = activities.findIndex(a => a.id === id)
    const nextActivity = activities[currentIndex + 1]
    if (nextActivity) {
      setCurrentActivityId(nextActivity.id)
    }
  }

  const startActivity = (id) => {
    // Mark all previous as complete
    const index = activities.findIndex(a => a.id === id)
    setActivities(prev => prev.map((a, i) => {
      if (i < index && !a.completed) {
        return { ...a, completed: true, elapsed: a.duration }
      }
      return a
    }))
    setCurrentActivityId(id)
  }

  const addActivity = () => {
    if (!newActivity.name.trim()) return

    const newId = Math.max(...activities.map(a => a.id)) + 1
    setActivities([...activities, {
      id: newId,
      name: newActivity.name,
      duration: newActivity.duration,
      elapsed: 0,
      completed: false,
      icon: newActivity.icon
    }])
    setNewActivity({ name: '', duration: 10, icon: '📝' })
    setShowAddModal(false)
  }

  const removeActivity = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id))
  }

  const handleDragStart = (id) => {
    setDraggedId(id)
  }

  const handleDragOver = (e, targetId) => {
    e.preventDefault()
    if (draggedId === targetId) return

    const dragIndex = activities.findIndex(a => a.id === draggedId)
    const targetIndex = activities.findIndex(a => a.id === targetId)

    const newActivities = [...activities]
    const [dragged] = newActivities.splice(dragIndex, 1)
    newActivities.splice(targetIndex, 0, dragged)
    setActivities(newActivities)
  }

  const formatDuration = (mins) => {
    if (mins < 1) return `${Math.round(mins * 60)}s`
    return `${Math.round(mins)}m`
  }

  if (isLoading) {
    return <ToolLoader toolName="Tiến độ bài học" />
  }

  return (
    <div className="progress-tracker1-tool">
      {/* Overview Header */}
      <div className="tracker-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <span className="stat-icon">📊</span>
            <div className="stat-info">
              <span className="stat-value">{completedCount}/{activities.length}</span>
              <span className="stat-label">Activities</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏱️</span>
            <div className="stat-info">
              <span className="stat-value">{formatDuration(totalElapsed)}/{formatDuration(totalDuration)}</span>
              <span className="stat-label">Time</span>
            </div>
          </div>
          <div className="stat-card progress-stat">
            <div className="circular-progress" style={{ '--progress': overallProgress }}>
              <span className="progress-value">{Math.round(overallProgress)}%</span>
            </div>
            <span className="stat-label">Progress</span>
          </div>
        </div>

        <button className="add-activity-btn" onClick={() => setShowAddModal(true)}>
          <span>+</span>
          Add Activity
        </button>
      </div>

      {/* Overall Progress Bar */}
      <div className="overall-progress-bar">
        <div className="progress-segments">
          {activities.map((activity, index) => {
            const widthPercent = (activity.duration / totalDuration) * 100
            const fillPercent = activity.completed ? 100 : (activity.elapsed / activity.duration) * 100

            return (
              <div
                key={activity.id}
                className={`progress-segment ${activity.completed ? 'completed' : ''} ${currentActivityId === activity.id ? 'current' : ''}`}
                style={{ width: `${widthPercent}%` }}
                title={`${activity.name}: ${Math.round(fillPercent)}%`}
              >
                <div className="segment-fill" style={{ width: `${Math.min(fillPercent, 100)}%` }}></div>
                <span className="segment-icon">{activity.icon}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Activities List */}
      <div className="activities-list">
        {activities.map((activity, index) => {
          const progress = (activity.elapsed / activity.duration) * 100
          const isOvertime = progress > 100
          const isCurrent = currentActivityId === activity.id && !activity.completed

          return (
            <div
              key={activity.id}
              className={`activity-item ${activity.completed ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isOvertime ? 'overtime' : ''}`}
              draggable={!activity.completed}
              onDragStart={() => handleDragStart(activity.id)}
              onDragOver={(e) => handleDragOver(e, activity.id)}
              onDragEnd={() => setDraggedId(null)}
            >
              <div className="activity-drag-handle">⋮⋮</div>

              <div className="activity-status">
                {activity.completed ? (
                  <span className="status-check">✓</span>
                ) : isCurrent ? (
                  <span className="status-playing">▶</span>
                ) : (
                  <span className="status-number">{index + 1}</span>
                )}
              </div>

              <div className="activity-icon">{activity.icon}</div>

              <div className="activity-details">
                <div className="activity-name">{activity.name}</div>
                <div className="activity-timing">
                  <span className="elapsed">{formatDuration(activity.elapsed)}</span>
                  <span className="separator">/</span>
                  <span className="planned">{formatDuration(activity.duration)}</span>
                  {isOvertime && <span className="overtime-badge">+{formatDuration(activity.elapsed - activity.duration)}</span>}
                </div>
              </div>

              <div className="activity-progress">
                <div className="mini-progress-bar">
                  <div
                    className="mini-progress-fill"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-percent">{Math.round(Math.min(progress, 100))}%</span>
              </div>

              <div className="activity-actions">
                {!activity.completed && !isCurrent && (
                  <button
                    className="action-btn start"
                    onClick={() => startActivity(activity.id)}
                    title="Start this activity"
                  >
                    ▶
                  </button>
                )}
                {isCurrent && (
                  <button
                    className="action-btn complete"
                    onClick={() => markComplete(activity.id)}
                    title="Mark complete"
                  >
                    ✓
                  </button>
                )}
                {!activity.completed && (
                  <button
                    className="action-btn delete"
                    onClick={() => removeActivity(activity.id)}
                    title="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Time Distribution */}
      <div className="time-distribution">
        <h4>Time Distribution</h4>
        <div className="distribution-chart">
          {activities.map(activity => {
            const percent = (activity.duration / totalDuration) * 100
            return (
              <div
                key={activity.id}
                className={`chart-bar ${activity.completed ? 'completed' : ''}`}
                style={{ '--bar-height': `${percent * 2}px` }}
                title={`${activity.name}: ${activity.duration}m (${Math.round(percent)}%)`}
              >
                <div className="bar-fill"></div>
                <span className="bar-label">{activity.icon}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="add-modal" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h4>Add New Activity</h4>

            <div className="form-group">
              <label>Activity Name</label>
              <input
                type="text"
                value={newActivity.name}
                onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                placeholder="e.g., Reading Practice"
              />
            </div>

            <div className="form-group">
              <label>Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={newActivity.duration}
                onChange={(e) => setNewActivity({ ...newActivity, duration: parseInt(e.target.value) || 10 })}
              />
            </div>

            <div className="form-group">
              <label>Icon</label>
              <div className="icon-grid">
                {activityIcons.map(icon => (
                  <button
                    key={icon}
                    className={`icon-btn ${newActivity.icon === icon ? 'active' : ''}`}
                    onClick={() => setNewActivity({ ...newActivity, icon })}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="save-btn" onClick={addActivity}>
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressTracker1Tool
