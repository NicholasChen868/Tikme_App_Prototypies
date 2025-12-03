import { useState, useEffect, useRef } from 'react'
import { mockClassStudents } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './BreakoutRoomsTool.css'

const roomColors = [
  '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
  '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
]

function BreakoutRoomsTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [rooms, setRooms] = useState([])
  const [roomCount, setRoomCount] = useState(4)
  const [roomTimer, setRoomTimer] = useState(10) // minutes
  const [isActive, setIsActive] = useState(false)
  const [assignMethod, setAssignMethod] = useState('auto')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [broadcastMessage, setBroadcastMessage] = useState('')
  const [showBroadcast, setShowBroadcast] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Timer effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isActive])

  // Check timer expiry
  useEffect(() => {
    if (isActive && roomTimer > 0 && elapsedTime >= roomTimer * 60) {
      // Timer expired - alert
    }
  }, [isActive, elapsedTime, roomTimer])

  // Create rooms with auto-assignment
  const createRooms = () => {
    const activeStudents = mockClassStudents.filter(s => s.status !== 'offline')
    const shuffled = [...activeStudents].sort(() => Math.random() - 0.5)
    const studentsPerRoom = Math.ceil(shuffled.length / roomCount)

    const newRooms = []
    for (let i = 0; i < roomCount; i++) {
      const start = i * studentsPerRoom
      const end = start + studentsPerRoom
      newRooms.push({
        id: i + 1,
        name: `Phòng ${i + 1}`,
        color: roomColors[i],
        students: assignMethod === 'auto' ? shuffled.slice(start, end) : [],
        activity: 'waiting', // waiting | active | idle
        messages: []
      })
    }

    setRooms(newRooms)
    setIsActive(true)
    setElapsedTime(0)

    // Simulate activity after a delay
    setTimeout(() => {
      setRooms(prev => prev.map(room => ({
        ...room,
        activity: Math.random() > 0.3 ? 'active' : 'idle'
      })))
    }, 2000)
  }

  // Return all to main room
  const returnAll = () => {
    setIsActive(false)
    setRooms([])
    setElapsedTime(0)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // Send broadcast message
  const sendBroadcast = () => {
    if (!broadcastMessage.trim()) return

    setRooms(prev => prev.map(room => ({
      ...room,
      messages: [...room.messages, {
        type: 'broadcast',
        text: broadcastMessage,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]
    })))

    setBroadcastMessage('')
    setShowBroadcast(false)
  }

  // Send message to specific room
  const sendToRoom = (roomId, message) => {
    setRooms(prev => prev.map(room =>
      room.id === roomId
        ? {
          ...room,
          messages: [...room.messages, {
            type: 'teacher',
            text: message,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          }]
        }
        : room
    ))
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const timeRemaining = roomTimer * 60 - elapsedTime
  const isTimeUp = roomTimer > 0 && timeRemaining <= 0

  if (isLoading) {
    return <ToolLoader toolName="Phòng nhỏ" />
  }

  // Setup View
  if (!isActive) {
    return (
      <div className="breakout-rooms-tool">
        <div className="setup-view">
          <div className="setup-icon">🚪</div>
          <h2>Breakout Rooms</h2>
          <p>Chia lớp thành các phòng nhỏ để thảo luận</p>

          {/* Room Count */}
          <div className="setup-section">
            <label>Số phòng:</label>
            <div className="count-buttons">
              {[2, 3, 4, 5, 6, 7, 8].map(num => (
                <button
                  key={num}
                  className={`count-btn ${roomCount === num ? 'active' : ''}`}
                  onClick={() => setRoomCount(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment Method */}
          <div className="setup-section">
            <label>Phân chia:</label>
            <div className="method-buttons">
              <button
                className={`method-btn ${assignMethod === 'auto' ? 'active' : ''}`}
                onClick={() => setAssignMethod('auto')}
              >
                🎲 Tự động
              </button>
              <button
                className={`method-btn ${assignMethod === 'manual' ? 'active' : ''}`}
                onClick={() => setAssignMethod('manual')}
              >
                ✋ Thủ công
              </button>
            </div>
          </div>

          {/* Timer */}
          <div className="setup-section">
            <label>Thời gian (phút):</label>
            <div className="timer-input">
              <input
                type="number"
                min="0"
                max="60"
                value={roomTimer}
                onChange={(e) => setRoomTimer(parseInt(e.target.value) || 0)}
              />
              <span className="timer-hint">0 = không giới hạn</span>
            </div>
          </div>

          {/* Create Button */}
          <button className="create-rooms-btn" onClick={createRooms}>
            🚀 Tạo Phòng
          </button>
        </div>
      </div>
    )
  }

  // Active View
  return (
    <div className="breakout-rooms-tool">
      {/* Header */}
      <div className="rooms-header">
        <div className="header-left">
          <span className="live-badge">🔴 LIVE</span>
          <h3>{rooms.length} Phòng đang hoạt động</h3>
        </div>
        <div className="header-right">
          {roomTimer > 0 && (
            <div className={`timer-display ${isTimeUp ? 'expired' : timeRemaining < 60 ? 'warning' : ''}`}>
              ⏱️ {isTimeUp ? "Hết giờ!" : formatTime(timeRemaining)}
            </div>
          )}
          <button className="broadcast-btn" onClick={() => setShowBroadcast(true)}>
            📢 Thông báo
          </button>
          <button className="return-all-btn" onClick={returnAll}>
            🏠 Kết thúc
          </button>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showBroadcast && (
        <div className="broadcast-modal">
          <div className="broadcast-content">
            <h4>📢 Gửi thông báo đến tất cả phòng</h4>
            <textarea
              placeholder="Nhập nội dung thông báo..."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              rows={3}
            />
            <div className="broadcast-actions">
              <button className="cancel-btn" onClick={() => setShowBroadcast(false)}>
                Hủy
              </button>
              <button className="send-btn" onClick={sendBroadcast}>
                Gửi đến tất cả
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rooms Grid */}
      <div className="rooms-grid">
        {rooms.map(room => (
          <div
            key={room.id}
            className={`room-card ${room.activity}`}
            style={{ '--room-color': room.color }}
          >
            {/* Room Header */}
            <div className="room-header">
              <div className="room-name">
                <div className="room-color-dot" />
                <span>{room.name}</span>
              </div>
              <div className={`activity-indicator ${room.activity}`}>
                {room.activity === 'active' ? '🟢' : room.activity === 'idle' ? '🟡' : '⚪'}
              </div>
            </div>

            {/* Students */}
            <div className="room-students">
              {room.students.length > 0 ? (
                <>
                  <div className="students-avatars">
                    {room.students.slice(0, 4).map(student => (
                      <img
                        key={student.id}
                        src={student.avatar}
                        alt={student.name}
                        title={student.name}
                      />
                    ))}
                    {room.students.length > 4 && (
                      <div className="more-count">+{room.students.length - 4}</div>
                    )}
                  </div>
                  <div className="student-count">{room.students.length} học sinh</div>
                </>
              ) : (
                <div className="empty-room">Chưa có học sinh</div>
              )}
            </div>

            {/* Messages */}
            {room.messages.length > 0 && (
              <div className="room-messages">
                {room.messages.slice(-2).map((msg, idx) => (
                  <div key={idx} className={`message ${msg.type}`}>
                    <span className="msg-icon">{msg.type === 'broadcast' ? '📢' : '💬'}</span>
                    <span className="msg-text">{msg.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Room Actions */}
            <div className="room-actions">
              <button className="join-btn" title="Tham gia phòng">
                👁️ Xem
              </button>
              <button
                className="message-btn"
                title="Gửi tin nhắn"
                onClick={() => {
                  const msg = prompt('Nhập tin nhắn:')
                  if (msg) sendToRoom(room.id, msg)
                }}
              >
                💬
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Bar */}
      <div className="summary-bar">
        <div className="summary-item">
          <span className="label">Thời gian:</span>
          <span className="value">{formatTime(elapsedTime)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Học sinh:</span>
          <span className="value">{rooms.reduce((sum, r) => sum + r.students.length, 0)}</span>
        </div>
        <div className="summary-item">
          <span className="label">Đang hoạt động:</span>
          <span className="value">{rooms.filter(r => r.activity === 'active').length}/{rooms.length}</span>
        </div>
      </div>
    </div>
  )
}

export default BreakoutRoomsTool
