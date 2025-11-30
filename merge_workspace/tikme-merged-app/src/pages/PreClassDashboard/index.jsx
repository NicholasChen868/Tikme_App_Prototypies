import { useState, useMemo } from 'react'
import StudentCard from '@/components/preclass/StudentCard'
import StudentDetailModal from '@/components/preclass/StudentDetailModal'
import { mockStudents } from '@/utils/preclassData'
import { calculateReadinessStats, calculateAttendanceStats } from '@/utils/preclassHelpers'
import '@/styles/preclass-vars.css'
import './styles.css'

function PreClassDashboard() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Calculate stats from real data
  const readinessStats = useMemo(() => calculateReadinessStats(mockStudents), [])
  const attendanceStats = useMemo(() => calculateAttendanceStats(mockStudents), [])

  // Count students with alarm (≥3 absences without reason)
  const alarmCount = useMemo(() =>
    mockStudents.filter(s => s.absentCount.noReason >= 3).length,
  [])

  // Filter students by readiness status and search query
  const filteredStudents = useMemo(() => {
    let result = mockStudents

    // Filter by readiness status
    if (filterStatus === 'alarm') {
      result = result.filter(s => s.absentCount.noReason >= 3)
    } else if (filterStatus !== 'all') {
      result = result.filter(s => s.readinessStatus === filterStatus)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.phone.includes(query)
      )
    }

    return result
  }, [filterStatus, searchQuery])

  return (
    <div className="preclass-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Pre-Class Dashboard</h1>
          <p className="dashboard-subtitle">
            N3 Grammar - Lesson 12 | {mockStudents.length} học sinh
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card green">
            <div className="stat-icon">✅</div>
            <div className="stat-value">{readinessStats.ready}</div>
            <div className="stat-label">Sẵn sàng</div>
          </div>
          <div className="stat-card orange">
            <div className="stat-icon">⚠️</div>
            <div className="stat-value">{readinessStats.partial}</div>
            <div className="stat-label">Chưa đủ</div>
          </div>
          <div className="stat-card red">
            <div className="stat-icon">❌</div>
            <div className="stat-value">{readinessStats.notReady}</div>
            <div className="stat-label">Chưa sẵn sàng</div>
          </div>
          <div className="stat-card blue">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{attendanceStats.present}</div>
            <div className="stat-label">Có mặt</div>
          </div>
          {alarmCount > 0 && (
            <div className="stat-card alarm">
              <div className="stat-icon">🚨</div>
              <div className="stat-value">{alarmCount}</div>
              <div className="stat-label">Cảnh báo</div>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="dashboard-controls">
        {/* Search */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm học sinh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          {[
            { value: 'all', label: 'Tất cả', count: mockStudents.length, color: '' },
            { value: 'ready', label: 'Sẵn sàng', count: readinessStats.ready, color: 'green' },
            { value: 'partial', label: 'Chưa đủ', count: readinessStats.partial, color: 'orange' },
            { value: 'not_ready', label: 'Chưa sẵn sàng', count: readinessStats.notReady, color: 'red' },
            ...(alarmCount > 0 ? [{ value: 'alarm', label: '🚨 Cảnh báo', count: alarmCount, color: 'alarm' }] : [])
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilterStatus(tab.value)}
              className={`filter-tab ${filterStatus === tab.value ? 'active' : ''} ${tab.color}`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <span>Hiển thị {filteredStudents.length} / {mockStudents.length} học sinh</span>
        {searchQuery && <span className="search-term">Tìm kiếm: "{searchQuery}"</span>}
      </div>

      {/* Students Grid */}
      <div className="students-grid">
        {filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <StudentCard
              key={student.id}
              student={student}
              onClick={setSelectedStudent}
            />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>Không tìm thấy học sinh</h3>
            <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            <button
              className="btn-reset"
              onClick={() => { setFilterStatus('all'); setSearchQuery(''); }}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  )
}

export default PreClassDashboard
