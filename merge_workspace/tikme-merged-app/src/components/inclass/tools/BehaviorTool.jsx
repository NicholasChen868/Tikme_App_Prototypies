import { useState } from 'react'
import { mockClassStudents, behaviorActions } from '@/utils/inclassData'
import './BehaviorTool.css'

function BehaviorTool() {
  const [studentPoints, setStudentPoints] = useState(() => {
    const initial = {}
    mockClassStudents.forEach(s => {
      initial[s.id] = s.stars || 0
    })
    return initial
  })

  const [recentActions, setRecentActions] = useState([])
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleAction = (studentId, action) => {
    setStudentPoints(prev => ({
      ...prev,
      [studentId]: Math.max(0, (prev[studentId] || 0) + action.points)
    }))

    const student = mockClassStudents.find(s => s.id === studentId)
    setRecentActions(prev => [{
      id: Date.now(),
      studentId,
      studentName: student?.name,
      action,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }, ...prev.slice(0, 9)])

    setSelectedStudent(null)
  }

  // Sort students by points
  const rankedStudents = [...mockClassStudents].sort((a, b) =>
    (studentPoints[b.id] || 0) - (studentPoints[a.id] || 0)
  )

  const totalPoints = Object.values(studentPoints).reduce((a, b) => a + b, 0)

  return (
    <div className="behavior-tool">
      {/* Stats Header */}
      <div className="behavior-header">
        <div className="total-stats">
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-value">{totalPoints}</span>
            <span className="stat-label">Tổng điểm</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <span className="stat-value">{rankedStudents[0]?.name?.split(' ').slice(-1)[0]}</span>
            <span className="stat-label">Dẫn đầu</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="behavior-content">
        {/* Leaderboard */}
        <div className="leaderboard-section">
          <h3>🏆 Bảng xếp hạng</h3>
          <div className="leaderboard-list">
            {rankedStudents.map((student, index) => {
              const points = studentPoints[student.id] || 0
              const isSelected = selectedStudent === student.id

              return (
                <div
                  key={student.id}
                  className={`leaderboard-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedStudent(isSelected ? null : student.id)}
                >
                  <div className="rank-badge" data-rank={index + 1}>
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1}
                  </div>
                  <img src={student.avatar} alt={student.name} className="student-avatar" />
                  <div className="student-info">
                    <span className="student-name">{student.name}</span>
                    <div className="star-display">
                      {'⭐'.repeat(Math.min(points, 5))}
                      {points > 5 && <span className="extra-stars">+{points - 5}</span>}
                    </div>
                  </div>
                  <div className="points-badge">
                    {points} điểm
                  </div>

                  {/* Quick Actions on Select */}
                  {isSelected && (
                    <div className="quick-actions-panel">
                      {behaviorActions.map(action => (
                        <button
                          key={action.id}
                          className="quick-action-btn"
                          style={{ '--action-color': action.color }}
                          onClick={(e) => { e.stopPropagation(); handleAction(student.id, action); }}
                        >
                          <span className="action-icon">{action.icon}</span>
                          <span className="action-points">
                            {action.points > 0 ? `+${action.points}` : action.points}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-section">
          <h3>📋 Hoạt động gần đây</h3>
          <div className="activity-list">
            {recentActions.length > 0 ? (
              recentActions.map(action => (
                <div key={action.id} className="activity-item">
                  <span className="activity-time">{action.timestamp}</span>
                  <span className="activity-icon">{action.action.icon}</span>
                  <span className="activity-text">
                    <strong>{action.studentName}</strong> {action.action.label}
                  </span>
                  <span
                    className="activity-points"
                    style={{ color: action.action.points > 0 ? '#10B981' : '#EF4444' }}
                  >
                    {action.action.points > 0 ? '+' : ''}{action.action.points}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-activity">
                <span>📝</span>
                <p>Chưa có hoạt động nào</p>
                <p className="hint">Chọn học sinh để thêm điểm</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Legend */}
      <div className="actions-legend">
        <h4>Hành động có sẵn:</h4>
        <div className="legend-items">
          {behaviorActions.map(action => (
            <div key={action.id} className="legend-item" style={{ '--action-color': action.color }}>
              <span>{action.icon}</span>
              <span>{action.label}</span>
              <span className="points-tag">
                {action.points > 0 ? `+${action.points}` : action.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BehaviorTool
