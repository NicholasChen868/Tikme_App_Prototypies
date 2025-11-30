import { useState } from 'react'
import { skillIcons, skillLabels, calculateAvgScore } from '@/utils/preclassData'
import { getScoreColor, getScoreBg, getStatusInfo, getReadinessInfo } from '@/utils/preclassHelpers'
import './StudentDetailModal.css'

function StudentDetailModal({ student, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [coachNote, setCoachNote] = useState('')

  if (!student) return null

  const avgScore = calculateAvgScore(student.metrics)
  const hasAlarm = student.absentCount.noReason >= 3

  const tabs = [
    { id: 'overview', label: 'Tổng Quan', icon: '👤' },
    { id: 'skills', label: '5 Kỹ Năng', icon: '📊' },
    { id: 'attendance', label: 'Điểm Danh', icon: '✅' },
    { id: 'notes', label: 'Ghi Chú', icon: '📝' }
  ]

  const getHistoryStatusInfo = (status) => {
    switch(status) {
      case 'present': return { bg: 'var(--edu-green-light)', color: 'var(--edu-green)', label: 'Có mặt', icon: '✓' }
      case 'late': return { bg: 'var(--edu-orange-light)', color: 'var(--edu-orange)', label: 'Đi trễ', icon: '⏰' }
      case 'absent-with-reason': return { bg: 'var(--edu-blue-light)', color: 'var(--edu-blue)', label: 'Vắng c/p', icon: '📝' }
      case 'absent-no-reason': return { bg: 'var(--edu-red-light)', color: 'var(--edu-red)', label: 'Vắng k/p', icon: '❌' }
      default: return { bg: 'var(--bg-light)', color: 'var(--text-muted)', label: 'Chưa rõ', icon: '?' }
    }
  }

  // Count attendance stats from history
  const attendanceCounts = student.attendanceHistory?.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1
    return acc
  }, {}) || {}

  return (
    <div className="modal-overlay animate-fade" onClick={onClose}>
      <div className="modal-content animate-scale" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-student-info">
            <img src={student.avatar} alt={student.name} className="modal-avatar" />
            <div className="modal-student-details">
              <h2 className="modal-student-name">{student.name}</h2>
              <div className="modal-student-meta">
                <span>📚 {student.totalSessions} buổi</span>
                <span>🔥 {student.streak} ngày</span>
                <span>📊 #{student.classRank}/15</span>
                <span>🕐 {student.lastActive}</span>
              </div>
            </div>
          </div>
          {hasAlarm && (
            <div className="modal-alarm-badge">
              🚨 Cảnh báo vắng học
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="modal-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`modal-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="modal-tab-content">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="tab-overview">
              {/* Contact Info */}
              <div className="info-section">
                <h4 className="section-title">Thông tin liên hệ</h4>
                <div className="contact-grid">
                  <div className="contact-item">
                    <span className="contact-icon">📞</span>
                    <span>{student.phone}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <span>{student.email}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📅</span>
                    <span>Nhập học: {student.enrollDate}</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="stats-section">
                <h4 className="section-title">Thống kê nhanh</h4>
                <div className="stats-grid-4">
                  <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-value" style={{ color: getScoreColor(avgScore) }}>{avgScore}%</div>
                    <div className="stat-label">Điểm TB</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-value">{student.streak}</div>
                    <div className="stat-label">Streak</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-value">{student.totalSessions}</div>
                    <div className="stat-label">Buổi học</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-value">#{student.classRank}</div>
                    <div className="stat-label">Xếp hạng</div>
                  </div>
                </div>
              </div>

              {/* Status Cards */}
              <div className="status-section">
                <div className="status-cards">
                  <div className="status-card">
                    <h5>Sẵn sàng học</h5>
                    <div
                      className="status-badge-large"
                      style={{
                        background: getReadinessInfo(student.readinessStatus).bg,
                        color: getReadinessInfo(student.readinessStatus).color
                      }}
                    >
                      {getReadinessInfo(student.readinessStatus).icon} {getReadinessInfo(student.readinessStatus).label}
                    </div>
                  </div>
                  <div className="status-card">
                    <h5>Trạng thái hôm nay</h5>
                    <div
                      className="status-badge-large"
                      style={{
                        background: getStatusInfo(student.attendanceStatus).bg,
                        color: getStatusInfo(student.attendanceStatus).color
                      }}
                    >
                      {getStatusInfo(student.attendanceStatus).icon} {getStatusInfo(student.attendanceStatus).label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Scores */}
              <div className="test-scores-section">
                <h4 className="section-title">Điểm kiểm tra</h4>
                <div className="test-scores-grid">
                  <div className="test-score-item">
                    <span className="label">Trung bình:</span>
                    <span className="value" style={{ color: getScoreColor(student.testScores.avg) }}>
                      {student.testScores.avg}
                    </span>
                  </div>
                  <div className="test-score-item">
                    <span className="label">Cao nhất:</span>
                    <span className="value success">{student.testScores.highest}</span>
                  </div>
                  <div className="test-score-item">
                    <span className="label">Thấp nhất:</span>
                    <span className="value warning">{student.testScores.lowest}</span>
                  </div>
                </div>
                <div className="last-5-scores">
                  <span className="label">5 bài gần nhất:</span>
                  <div className="scores-pills">
                    {student.testScores.last5.map((score, idx) => (
                      <span key={idx} className="score-pill" style={{ background: getScoreBg(score), color: getScoreColor(score) }}>
                        {score}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === 'skills' && (
            <div className="tab-skills">
              {Object.entries(student.metrics).map(([key, metric]) => {
                const diff = metric.current - metric.average
                return (
                  <div key={key} className="skill-detail-card">
                    <div className="skill-header">
                      <div className="skill-info">
                        <span className="skill-icon">{skillIcons[key]}</span>
                        <h4 className="skill-name">{skillLabels[key]}</h4>
                      </div>
                      <div className="skill-score-display">
                        <span className="skill-current" style={{ color: getScoreColor(metric.current) }}>
                          {metric.current}%
                        </span>
                        <span className={`skill-diff ${diff >= 0 ? 'positive' : 'negative'}`}>
                          {diff >= 0 ? '+' : ''}{diff}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="skill-progress-bar large">
                      <div
                        className="skill-progress-fill"
                        style={{
                          width: `${metric.current}%`,
                          background: getScoreColor(metric.current)
                        }}
                      />
                    </div>

                    {/* Meta Info */}
                    <div className="skill-meta-grid">
                      <div className="meta-item">
                        <span className="meta-label">TB lũy kế:</span>
                        <span className="meta-value">{metric.average}% ({metric.sessions} buổi)</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Đã học:</span>
                        <span className="meta-value">{metric.learned}/{metric.total}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Điểm gần nhất:</span>
                        <span className="meta-value">{metric.lastScore}</span>
                      </div>
                      <div className="meta-item">
                        <span className="meta-label">Cao nhất:</span>
                        <span className="meta-value">{metric.bestScore}</span>
                      </div>
                    </div>

                    {/* Trend Chart */}
                    <div className="trend-chart">
                      <div className="chart-label">6 buổi gần nhất:</div>
                      <div className="trend-bars">
                        {metric.trend.map((score, idx) => (
                          <div key={idx} className="trend-bar-container">
                            <div
                              className="trend-bar"
                              style={{
                                height: `${score}%`,
                                background: getScoreColor(score)
                              }}
                            />
                            <div className="trend-bar-label">{score}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* TAB 3: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="tab-attendance">
              {/* Attendance Summary */}
              <div className="attendance-summary">
                <div className="summary-card green">
                  <div className="summary-icon">✅</div>
                  <div className="summary-count">{attendanceCounts['present'] || 0}</div>
                  <div className="summary-label">Có mặt</div>
                </div>
                <div className="summary-card orange">
                  <div className="summary-icon">⏰</div>
                  <div className="summary-count">{attendanceCounts['late'] || 0}</div>
                  <div className="summary-label">Đi trễ</div>
                </div>
                <div className="summary-card blue">
                  <div className="summary-icon">📝</div>
                  <div className="summary-count">{student.absentCount.withReason}</div>
                  <div className="summary-label">Vắng c/p</div>
                </div>
                <div className={`summary-card red ${hasAlarm ? 'alarm' : ''}`}>
                  <div className="summary-icon">❌</div>
                  <div className="summary-count">{student.absentCount.noReason}</div>
                  <div className="summary-label">Vắng k/p</div>
                </div>
              </div>

              {/* Attendance History */}
              <div className="attendance-history">
                <h4 className="section-title">5 buổi gần nhất</h4>
                <div className="history-list">
                  {student.attendanceHistory?.map((record, idx) => {
                    const statusInfo = getHistoryStatusInfo(record.status)
                    return (
                      <div key={idx} className="history-record">
                        <div className="record-date">{record.date}</div>
                        <div
                          className="record-status"
                          style={{ background: statusInfo.bg, color: statusInfo.color }}
                        >
                          {statusInfo.icon} {statusInfo.label}
                        </div>
                        {record.reason && (
                          <div className="record-reason">Lý do: {record.reason}</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Absent Reason if currently absent */}
              {student.absentReason && (
                <div className="current-absent-reason">
                  <h4>Lý do vắng hôm nay:</h4>
                  <p>{student.absentReason}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: NOTES */}
          {activeTab === 'notes' && (
            <div className="tab-notes">
              {/* Weak Points */}
              <div className="notes-section">
                <h4 className="section-title">⚠ Điểm yếu cần cải thiện</h4>
                <div className="tags-list">
                  {student.weakPoints && student.weakPoints.length > 0 ? (
                    student.weakPoints.map((point, idx) => (
                      <span key={idx} className="tag tag-weak">{point}</span>
                    ))
                  ) : (
                    <p className="empty-state">Không có điểm yếu ghi nhận</p>
                  )}
                </div>
              </div>

              {/* Strengths */}
              <div className="notes-section">
                <h4 className="section-title">✨ Điểm mạnh</h4>
                <div className="tags-list">
                  {student.strengths && student.strengths.length > 0 ? (
                    student.strengths.map((point, idx) => (
                      <span key={idx} className="tag tag-strong">{point}</span>
                    ))
                  ) : (
                    <p className="empty-state">Chưa có điểm mạnh ghi nhận</p>
                  )}
                </div>
              </div>

              {/* Existing Coach Notes */}
              {student.coachNotes && student.coachNotes.length > 0 && (
                <div className="notes-section">
                  <h4 className="section-title">📋 Ghi chú trước đó</h4>
                  <div className="existing-notes">
                    {student.coachNotes.map((note, idx) => (
                      <div key={idx} className="note-item">{note}</div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Coach Note Input */}
              <div className="notes-section">
                <h4 className="section-title">📝 Thêm ghi chú mới</h4>
                <textarea
                  className="coach-notes-input"
                  placeholder="Nhập ghi chú về học sinh..."
                  rows="4"
                  value={coachNote}
                  onChange={(e) => setCoachNote(e.target.value)}
                />
                <button className="btn-save" disabled={!coachNote.trim()}>
                  💾 Lưu ghi chú
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDetailModal
