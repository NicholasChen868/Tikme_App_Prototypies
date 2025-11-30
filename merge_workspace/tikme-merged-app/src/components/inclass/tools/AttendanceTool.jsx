import { useState, useEffect } from 'react'
import { mockClassStudents, attendanceStatuses } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './AttendanceTool.css'

function AttendanceTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [studentAttendance, setStudentAttendance] = useState(() => {
    const initial = {}
    mockClassStudents.forEach(s => {
      initial[s.id] = s.attendance || 'present'
    })
    return initial
  })
  // Phase 4B: Reason input for absent students
  const [absentReasons, setAbsentReasons] = useState({})
  const [reasonModal, setReasonModal] = useState(null) // { studentId, status, currentReason }

  // Initialize loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleStatusChange = (studentId, status) => {
    // If absent or excused, show modal to enter reason
    if (status === 'absent' || status === 'excused') {
      setReasonModal({
        studentId,
        status,
        currentReason: absentReasons[studentId] || ''
      })
      return
    }

    // Other statuses, update directly
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))

    // Clear reason if not absent/excused anymore
    if (absentReasons[studentId]) {
      setAbsentReasons(prev => {
        const newReasons = { ...prev }
        delete newReasons[studentId]
        return newReasons
      })
    }
  }

  const saveAbsentReason = (reason) => {
    if (!reasonModal) return

    const { studentId, status } = reasonModal

    // Update attendance status
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }))

    // Save reason
    if (reason.trim()) {
      setAbsentReasons(prev => ({
        ...prev,
        [studentId]: reason.trim()
      }))
    }

    // Close modal
    setReasonModal(null)
  }

  const editReason = (studentId) => {
    const currentStatus = studentAttendance[studentId]
    if (currentStatus !== 'absent' && currentStatus !== 'excused') {
      return
    }

    setReasonModal({
      studentId,
      status: currentStatus,
      currentReason: absentReasons[studentId] || ''
    })
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
          const reason = absentReasons[student.id]

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
                  {/* Display reason if exists */}
                  {reason && (
                    <div className="absent-reason">
                      <span className="reason-label">Lý do:</span>
                      <span
                        className="reason-text"
                        onClick={() => editReason(student.id)}
                        title="Nhấn để sửa"
                      >
                        {reason}
                      </span>
                    </div>
                  )}
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

      {/* Reason Input Modal */}
      {reasonModal && (
        <div className="reason-modal-overlay" onClick={() => setReasonModal(null)}>
          <div className="reason-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Lý do vắng học</h3>
              <button
                className="modal-close"
                onClick={() => setReasonModal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <textarea
                className="reason-textarea"
                placeholder="Nhập lý do vắng học (không bắt buộc)..."
                defaultValue={reasonModal.currentReason}
                rows={4}
                autoFocus
                id="reason-input"
              />

              <div className="quick-reasons">
                <span className="quick-label">Lý do thường gặp:</span>
                <button onClick={() => {
                  document.getElementById('reason-input').value = 'Ốm'
                }}>
                  🤒 Ốm
                </button>
                <button onClick={() => {
                  document.getElementById('reason-input').value = 'Việc gia đình'
                }}>
                  👨‍👩‍👧 Việc gia đình
                </button>
                <button onClick={() => {
                  document.getElementById('reason-input').value = 'Đi muộn'
                }}>
                  ⏰ Đi muộn
                </button>
                <button onClick={() => {
                  document.getElementById('reason-input').value = 'Xin phép trước'
                }}>
                  📝 Xin phép trước
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setReasonModal(null)}
              >
                Hủy
              </button>
              <button
                className="save-reason-btn"
                onClick={() => {
                  const reason = document.getElementById('reason-input').value
                  saveAbsentReason(reason)
                }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AttendanceTool
