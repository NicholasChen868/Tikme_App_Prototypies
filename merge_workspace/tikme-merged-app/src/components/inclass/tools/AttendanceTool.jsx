import { useState } from 'react'
import { mockClassStudents, attendanceStatuses } from '@/utils/inclassData'
import './AttendanceTool.css'

function AttendanceTool() {
  const [studentAttendance, setStudentAttendance] = useState(() => {
    const initial = {}
    mockClassStudents.forEach(s => {
      initial[s.id] = s.attendance || 'present'
    })
    return initial
  })

  const handleStatusChange = (studentId, status) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))
  }

  const handleMarkAllPresent = () => {
    const newAttendance = {}
    mockClassStudents.forEach(s => {
      newAttendance[s.id] = 'present'
    })
    setStudentAttendance(newAttendance)
  }

  // Calculate summary
  const summary = attendanceStatuses.map(status => ({
    ...status,
    count: Object.values(studentAttendance).filter(s => s === status.id).length
  }))

  const attendanceRate = Math.round(
    (summary.find(s => s.id === 'present')?.count || 0) / mockClassStudents.length * 100
  )

  return (
    <div className="attendance-tool">
      {/* Summary Header */}
      <div className="attendance-header">
        <div className="attendance-summary">
          {summary.map(status => (
            <div
              key={status.id}
              className="summary-item"
              style={{ '--status-color': status.color }}
            >
              <span className="status-icon">{status.icon}</span>
              <span className="status-count">{status.count}</span>
              <span className="status-label">{status.label}</span>
            </div>
          ))}
        </div>

        <div className="attendance-rate">
          <div className="rate-circle" style={{
            background: `conic-gradient(#10B981 ${attendanceRate}%, #E2E8F0 0%)`
          }}>
            <span>{attendanceRate}%</span>
          </div>
          <span className="rate-label">Tỉ lệ có mặt</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn" onClick={handleMarkAllPresent}>
          ✅ Đánh dấu tất cả có mặt
        </button>
      </div>

      {/* Student List */}
      <div className="attendance-list">
        {mockClassStudents.map(student => {
          const currentStatus = studentAttendance[student.id]
          const statusInfo = attendanceStatuses.find(s => s.id === currentStatus)

          return (
            <div key={student.id} className="attendance-row">
              <div className="student-info">
                <img src={student.avatar} alt={student.name} className="student-avatar" />
                <div className="student-details">
                  <span className="student-name">{student.name}</span>
                  <span
                    className="current-status"
                    style={{ color: statusInfo?.color }}
                  >
                    {statusInfo?.icon} {statusInfo?.label}
                  </span>
                </div>
              </div>

              <div className="status-buttons">
                {attendanceStatuses.map(status => (
                  <button
                    key={status.id}
                    className={`status-btn ${currentStatus === status.id ? 'active' : ''}`}
                    style={{ '--btn-color': status.color }}
                    onClick={() => handleStatusChange(student.id, status.id)}
                    title={status.label}
                  >
                    {status.icon}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Actions */}
      <div className="attendance-footer">
        <button className="save-btn">
          💾 Lưu điểm danh
        </button>
        <button className="export-btn">
          📤 Xuất báo cáo
        </button>
      </div>
    </div>
  )
}

export default AttendanceTool
