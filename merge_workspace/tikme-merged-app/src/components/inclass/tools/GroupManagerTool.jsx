import { useState, useCallback } from 'react'
import { mockClassStudents } from '@/utils/inclassData'
import './GroupManagerTool.css'

const groupColors = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
]

const groupNames = [
  'Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta',
  'Team Epsilon', 'Team Zeta', 'Team Eta', 'Team Theta'
]

function GroupManagerTool() {
  const [groupCount, setGroupCount] = useState(4)
  const [groups, setGroups] = useState([])
  const [ungroupedStudents, setUngroupedStudents] = useState([...mockClassStudents])
  const [isCreated, setIsCreated] = useState(false)
  const [draggedStudent, setDraggedStudent] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  // Create random groups
  const createRandomGroups = () => {
    const shuffled = [...mockClassStudents].sort(() => Math.random() - 0.5)
    const studentsPerGroup = Math.ceil(shuffled.length / groupCount)

    const newGroups = []
    for (let i = 0; i < groupCount; i++) {
      const start = i * studentsPerGroup
      const end = start + studentsPerGroup
      newGroups.push({
        id: i + 1,
        name: groupNames[i],
        color: groupColors[i],
        students: shuffled.slice(start, end),
        task: '',
        isComplete: false,
        stars: 0
      })
    }

    setGroups(newGroups)
    setUngroupedStudents([])
    setIsCreated(true)
  }

  // Create empty groups for manual assignment
  const createManualGroups = () => {
    const newGroups = []
    for (let i = 0; i < groupCount; i++) {
      newGroups.push({
        id: i + 1,
        name: groupNames[i],
        color: groupColors[i],
        students: [],
        task: '',
        isComplete: false,
        stars: 0
      })
    }

    setGroups(newGroups)
    setUngroupedStudents([...mockClassStudents])
    setIsCreated(true)
  }

  // Reset all groups
  const resetGroups = () => {
    setGroups([])
    setUngroupedStudents([...mockClassStudents])
    setIsCreated(false)
    setEditingTask(null)
  }

  // Handle drag start
  const handleDragStart = (student, sourceGroupId) => {
    setDraggedStudent({ student, sourceGroupId })
  }

  // Handle drop on group
  const handleDropOnGroup = (targetGroupId) => {
    if (!draggedStudent) return

    const { student, sourceGroupId } = draggedStudent

    setGroups(prev => prev.map(group => {
      // Remove from source group
      if (sourceGroupId && group.id === sourceGroupId) {
        return {
          ...group,
          students: group.students.filter(s => s.id !== student.id)
        }
      }
      // Add to target group
      if (group.id === targetGroupId) {
        // Check if already in group
        if (group.students.some(s => s.id === student.id)) return group
        return {
          ...group,
          students: [...group.students, student]
        }
      }
      return group
    }))

    // Remove from ungrouped if came from there
    if (!sourceGroupId) {
      setUngroupedStudents(prev => prev.filter(s => s.id !== student.id))
    }

    setDraggedStudent(null)
  }

  // Handle drop back to ungrouped pool
  const handleDropToPool = () => {
    if (!draggedStudent) return

    const { student, sourceGroupId } = draggedStudent

    if (sourceGroupId) {
      // Remove from group
      setGroups(prev => prev.map(group => {
        if (group.id === sourceGroupId) {
          return {
            ...group,
            students: group.students.filter(s => s.id !== student.id)
          }
        }
        return group
      }))

      // Add to ungrouped
      setUngroupedStudents(prev => [...prev, student])
    }

    setDraggedStudent(null)
  }

  // Assign task to group
  const assignTask = (groupId, task) => {
    setGroups(prev => prev.map(group =>
      group.id === groupId ? { ...group, task } : group
    ))
    setEditingTask(null)
  }

  // Toggle group complete
  const toggleComplete = (groupId) => {
    setGroups(prev => prev.map(group =>
      group.id === groupId ? { ...group, isComplete: !group.isComplete } : group
    ))
  }

  // Set group stars
  const setGroupStars = (groupId, stars) => {
    setGroups(prev => prev.map(group =>
      group.id === groupId ? { ...group, stars } : group
    ))
  }

  // Update group name
  const updateGroupName = (groupId, name) => {
    setGroups(prev => prev.map(group =>
      group.id === groupId ? { ...group, name } : group
    ))
  }

  // Setup View
  if (!isCreated) {
    return (
      <div className="group-manager-tool">
        <div className="setup-view">
          <div className="setup-icon">👥</div>
          <h2>Quản Lý Nhóm</h2>
          <p>Chia học sinh thành các nhóm để hoạt động</p>

          <div className="group-count-selector">
            <label>Số nhóm:</label>
            <div className="count-buttons">
              {[2, 3, 4, 5, 6, 7, 8].map(num => (
                <button
                  key={num}
                  className={`count-btn ${groupCount === num ? 'active' : ''}`}
                  onClick={() => setGroupCount(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="group-size-info">
              ~{Math.ceil(mockClassStudents.length / groupCount)} học sinh/nhóm
            </p>
          </div>

          <div className="create-buttons">
            <button className="create-btn random" onClick={createRandomGroups}>
              🎲 Chia Ngẫu Nhiên
            </button>
            <button className="create-btn manual" onClick={createManualGroups}>
              ✋ Chia Thủ Công
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Groups View
  return (
    <div className="group-manager-tool">
      {/* Header */}
      <div className="manager-header">
        <div className="header-info">
          <h3>👥 {groups.length} Nhóm</h3>
          <span className="complete-count">
            ✅ {groups.filter(g => g.isComplete).length}/{groups.length} hoàn thành
          </span>
        </div>
        <button className="reset-btn" onClick={resetGroups}>
          🔄 Đặt lại
        </button>
      </div>

      {/* Groups Grid */}
      <div className="groups-grid">
        {groups.map(group => (
          <div
            key={group.id}
            className={`group-card ${group.isComplete ? 'complete' : ''}`}
            style={{ '--group-color': group.color }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropOnGroup(group.id)}
          >
            {/* Group Header */}
            <div className="group-header">
              <div className="group-color-dot" />
              <input
                type="text"
                className="group-name-input"
                value={group.name}
                onChange={(e) => updateGroupName(group.id, e.target.value)}
              />
              <span className="student-count">{group.students.length}</span>
            </div>

            {/* Students */}
            <div className="group-students">
              {group.students.length > 0 ? (
                group.students.map(student => (
                  <div
                    key={student.id}
                    className="student-chip"
                    draggable
                    onDragStart={() => handleDragStart(student, group.id)}
                  >
                    <img src={student.avatar} alt={student.name} />
                    <span>{student.name.split(' ').slice(-1)[0]}</span>
                  </div>
                ))
              ) : (
                <div className="empty-group">
                  Kéo thả học sinh vào đây
                </div>
              )}
            </div>

            {/* Task */}
            <div className="group-task">
              {editingTask === group.id ? (
                <div className="task-input-wrapper">
                  <input
                    type="text"
                    placeholder="Nhập nhiệm vụ..."
                    defaultValue={group.task}
                    autoFocus
                    onBlur={(e) => assignTask(group.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') assignTask(group.id, e.target.value)
                      if (e.key === 'Escape') setEditingTask(null)
                    }}
                  />
                </div>
              ) : (
                <div
                  className="task-display"
                  onClick={() => setEditingTask(group.id)}
                >
                  {group.task || '+ Thêm nhiệm vụ'}
                </div>
              )}
            </div>

            {/* Group Actions */}
            <div className="group-actions">
              <button
                className={`complete-btn ${group.isComplete ? 'checked' : ''}`}
                onClick={() => toggleComplete(group.id)}
              >
                {group.isComplete ? '✅ Hoàn thành' : '⬜ Đánh dấu xong'}
              </button>

              <div className="stars-selector">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={`star-btn ${group.stars >= star ? 'active' : ''}`}
                    onClick={() => setGroupStars(group.id, star)}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ungrouped Pool */}
      {ungroupedStudents.length > 0 && (
        <div
          className="ungrouped-pool"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToPool}
        >
          <h4>Chưa phân nhóm ({ungroupedStudents.length})</h4>
          <div className="pool-students">
            {ungroupedStudents.map(student => (
              <div
                key={student.id}
                className="student-chip pool"
                draggable
                onDragStart={() => handleDragStart(student, null)}
              >
                <img src={student.avatar} alt={student.name} />
                <span>{student.name.split(' ').slice(-1)[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GroupManagerTool
