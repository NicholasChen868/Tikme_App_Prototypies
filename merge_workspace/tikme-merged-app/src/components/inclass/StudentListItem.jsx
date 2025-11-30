import { useState } from 'react'
import './StudentListItem.css'

function StudentListItem({ student, onSelect }) {
  const [showActions, setShowActions] = useState(false)

  const handleClick = () => {
    setShowActions(!showActions)
    if (onSelect) onSelect(student)
  }

  return (
    <div
      className={`student-list-item ${student.status} ${student.handRaised ? 'hand-raised' : ''}`}
      onClick={handleClick}
    >
      {/* Hand Raised Indicator */}
      {student.handRaised && (
        <div className="hand-indicator">🙋</div>
      )}

      {/* Avatar with Status Ring */}
      <div className="avatar-wrapper">
        <img src={student.avatar} alt={student.name} className="student-list-avatar" />
        <div className={`status-ring ${student.status}`} />
      </div>

      {/* Student Info */}
      <div className="student-list-info">
        <div className="student-list-name">{student.name}</div>
        <div className="student-list-meta">
          {/* Stars */}
          {student.stars > 0 && (
            <span className="stars-display">
              ⭐ {student.stars}
            </span>
          )}
          {/* Controls */}
          <div className="student-list-controls">
            <span
              className={`control-icon ${student.mic ? 'active' : 'inactive'}`}
              title={student.mic ? 'Mic on' : 'Mic off'}
            >
              {student.mic ? '🎤' : '🔇'}
            </span>
            <span
              className={`control-icon ${student.camera ? 'active' : 'inactive'}`}
              title={student.camera ? 'Camera on' : 'Camera off'}
            >
              {student.camera ? '📹' : '📷'}
            </span>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className={`status-indicator ${student.status}`} />

      {/* Quick Actions (shown on click) */}
      {showActions && (
        <div className="quick-actions" onClick={e => e.stopPropagation()}>
          <button className="action-btn star" title="Thêm sao">⭐</button>
          <button className="action-btn mic" title="Mute/Unmute">🔇</button>
          <button className="action-btn message" title="Nhắn tin">💬</button>
          <button className="action-btn call" title="Gọi phát biểu">📢</button>
        </div>
      )}
    </div>
  )
}

export default StudentListItem
