import { useState, useEffect } from 'react'
import { mockStudents } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './StudentPickerTool.css'

function StudentPickerTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [currentHighlight, setCurrentHighlight] = useState(null)
  const [history, setHistory] = useState([])
  const [excludePicked, setExcludePicked] = useState(false)
  const spinIntervalRef = useRef(null)

  const activeStudents = mockClassStudents.filter(s => s.status === 'active')
  const availableStudents = excludePicked
    ? activeStudents.filter(s => !history.includes(s.id))
    : activeStudents

  const handleSpin = () => {
    if (availableStudents.length === 0) return

    setIsSpinning(true)
    setSelectedStudent(null)

    let spinCount = 0
    const totalSpins = 20 + Math.floor(Math.random() * 10)
    let currentSpeed = 50

    spinIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availableStudents.length)
      setCurrentHighlight(availableStudents[randomIndex].id)

      spinCount++
      if (spinCount > totalSpins * 0.7) {
        currentSpeed += 20 // Slow down
      }

      if (spinCount >= totalSpins) {
        clearInterval(spinIntervalRef.current)
        const finalIndex = Math.floor(Math.random() * availableStudents.length)
        const picked = availableStudents[finalIndex]
        setSelectedStudent(picked)
        setCurrentHighlight(picked.id)
        setHistory(prev => [...prev, picked.id])
        setIsSpinning(false)
      }
    }, currentSpeed)
  }

  const handleReset = () => {
    setHistory([])
    setSelectedStudent(null)
    setCurrentHighlight(null)
  }

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="student-picker-tool">
      {/* Selected Student Display */}
      <div className={`selected-display ${selectedStudent ? 'show' : ''} ${isSpinning ? 'spinning' : ''}`}>
        {selectedStudent ? (
          <>
            <img
              src={selectedStudent.avatar}
              alt={selectedStudent.name}
              className="selected-avatar"
            />
            <h2 className="selected-name">{selectedStudent.name}</h2>
            <div className="selected-confetti">🎉</div>
          </>
        ) : (
          <div className="placeholder-display">
            <span className="placeholder-icon">🎯</span>
            <p>Nhấn "Chọn ngẫu nhiên" để bắt đầu</p>
          </div>
        )}
      </div>

      {/* Spin Button */}
      <button
        className={`spin-btn ${isSpinning ? 'spinning' : ''}`}
        onClick={handleSpin}
        disabled={isSpinning || availableStudents.length === 0}
      >
        {isSpinning ? (
          <>🎰 Đang chọn...</>
        ) : (
          <>🎯 Chọn ngẫu nhiên</>
        )}
      </button>

      {/* Options */}
      <div className="picker-options">
        <label className="option-checkbox">
          <input
            type="checkbox"
            checked={excludePicked}
            onChange={(e) => setExcludePicked(e.target.checked)}
          />
          <span>Không chọn lại học sinh đã chọn</span>
        </label>
        <button className="reset-btn" onClick={handleReset}>
          🔄 Đặt lại
        </button>
      </div>

      {/* Student Grid */}
      <div className="students-wheel">
        <h4>Danh sách học sinh ({availableStudents.length} / {activeStudents.length})</h4>
        <div className="wheel-grid">
          {activeStudents.map(student => {
            const isPicked = history.includes(student.id)
            const isHighlighted = currentHighlight === student.id
            const isSelected = selectedStudent?.id === student.id

            return (
              <div
                key={student.id}
                className={`wheel-student ${isPicked ? 'picked' : ''} ${isHighlighted ? 'highlight' : ''} ${isSelected ? 'selected' : ''}`}
              >
                <img src={student.avatar} alt={student.name} />
                <span>{student.name.split(' ').slice(-1)[0]}</span>
                {isPicked && <div className="picked-badge">✓</div>}
              </div>
            )
          })}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="pick-history">
          <h4>Lịch sử chọn ({history.length})</h4>
          <div className="history-list">
            {history.map((studentId, index) => {
              const student = mockClassStudents.find(s => s.id === studentId)
              return (
                <div key={index} className="history-item">
                  <span className="history-number">{index + 1}</span>
                  <img src={student?.avatar} alt={student?.name} />
                  <span>{student?.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* No students available */}
      {availableStudents.length === 0 && (
        <div className="no-students-msg">
          <span>🎉</span>
          <p>Đã chọn hết học sinh!</p>
          <button onClick={handleReset}>Bắt đầu lại</button>
        </div>
      )}
    </div>
  )
}

export default StudentPickerTool
