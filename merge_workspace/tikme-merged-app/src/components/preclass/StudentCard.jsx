import { skillIcons, calculateAvgScore } from '@/utils/preclassData'
import { getStatusInfo, getReadinessInfo, getScoreColor } from '@/utils/preclassHelpers'
import './StudentCard.css'

function StudentCard({ student, onClick }) {
  const statusInfo = getStatusInfo(student.attendanceStatus)
  const readinessInfo = getReadinessInfo(student.readinessStatus)
  const hasAlarm = student.absentCount.noReason >= 3
  const avgScore = calculateAvgScore(student.metrics)

  return (
    <div
      className={`student-card hover-lift ${hasAlarm ? 'has-alarm' : ''}`}
      onClick={() => onClick(student)}
    >
      {/* 1. ALARM BADGE - for ≥3 absences without reason */}
      {hasAlarm && (
        <div className="alert-badge animate-blink">
          🚨 Vắng {student.absentCount.noReason} lần
        </div>
      )}

      {/* 2. HEADER: Avatar + Name + Badges */}
      <div className="student-card-header">
        <img
          src={student.avatar}
          alt={student.name}
          className="student-avatar"
          style={{ borderColor: statusInfo.color }}
        />
        <div className="student-info">
          <h3 className="student-name">{student.name}</h3>
          <div className="student-badges">
            <span
              className="badge"
              style={{ background: statusInfo.bg, color: statusInfo.color }}
            >
              {statusInfo.icon} {statusInfo.label}
            </span>
            <span
              className="badge"
              style={{ background: readinessInfo.bg, color: readinessInfo.color }}
            >
              {readinessInfo.icon} {readinessInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* 3. QUICK STATS GRID - 4 items */}
      <div className="quick-stats-grid">
        <div className="stat-item">
          <div className="stat-value" style={{ color: getScoreColor(avgScore) }}>
            {avgScore}%
          </div>
          <div className="stat-label">Điểm TB</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--edu-orange)' }}>
            🔥{student.streak}
          </div>
          <div className="stat-label">Streak</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{student.totalSessions}</div>
          <div className="stat-label">Buổi học</div>
        </div>
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--edu-purple)' }}>
            #{student.classRank}
          </div>
          <div className="stat-label">Xếp hạng</div>
        </div>
      </div>

      {/* 4. 5 SKILLS MINI DISPLAY */}
      <div className="skills-mini-grid">
        {Object.entries(student.metrics).map(([key, metric]) => (
          <div key={key} className="skill-mini-item">
            <div className="skill-icon">{skillIcons[key]}</div>
            <div className="skill-score" style={{ color: getScoreColor(metric.current) }}>
              {metric.current}%
            </div>
            <div className="skill-progress-bar">
              <div
                className="skill-progress-fill"
                style={{
                  width: `${metric.current}%`,
                  background: getScoreColor(metric.current)
                }}
              />
            </div>
            <div className="skill-learned">
              {metric.learned}/{metric.total}
            </div>
          </div>
        ))}
      </div>

      {/* 5. ABSENT STATS - show if any absences */}
      {(student.absentCount.withReason > 0 || student.absentCount.noReason > 0) && (
        <div className={`absent-stats ${hasAlarm ? 'has-alarm' : ''}`}>
          <span className="absent-with-reason">
            Vắng c/p: <strong>{student.absentCount.withReason}</strong>
          </span>
          <span className={`absent-no-reason ${hasAlarm ? 'danger' : ''}`}>
            Vắng k/p: <strong>{student.absentCount.noReason}</strong>
          </span>
        </div>
      )}

      {/* 6. WEAK POINTS */}
      {student.weakPoints && student.weakPoints.length > 0 && (
        <div className="weak-points-section">
          <div className="weak-points-label">⚠ Cần cải thiện:</div>
          <div className="weak-points-tags">
            {student.weakPoints.slice(0, 2).map((point, idx) => (
              <span key={idx} className="tag tag-weak">{point}</span>
            ))}
          </div>
        </div>
      )}

      {/* 7. FOOTER: Last Active + Progress Rate */}
      <div className="card-footer">
        <span className="last-active">
          🕐 {student.lastActive}
        </span>
        <span className={`progress-rate ${student.progressRate >= 0 ? 'positive' : 'negative'}`}>
          {student.progressRate >= 0 ? '↑' : '↓'} {Math.abs(student.progressRate)}% (2 tuần)
        </span>
      </div>
    </div>
  )
}

export default StudentCard
