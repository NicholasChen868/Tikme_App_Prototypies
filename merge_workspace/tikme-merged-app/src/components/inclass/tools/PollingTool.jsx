import { useState, useEffect } from 'react'
import { pollTemplates, mockClassStudents } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './PollingTool.css'

function PollingTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [activePoll, setActivePoll] = useState(null)
  const [pollResults, setPollResults] = useState({})
  const [isPollLive, setIsPollLive] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [customQuestion, setCustomQuestion] = useState('')
  const [customOptions, setCustomOptions] = useState(['', '', ''])
  // Phase 4B: Anonymous voting + Export
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [voters, setVoters] = useState({}) // { optionId: [studentNames] }

  // Initialize loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Simulate votes coming in
  useEffect(() => {
    if (isPollLive && activePoll) {
      let voteCount = 0
      const activeStudents = mockClassStudents.filter(s => s.status === 'active')
      const votedStudents = new Set()

      const voteInterval = setInterval(() => {
        // Get students who haven't voted yet
        const availableStudents = activeStudents.filter(s => !votedStudents.has(s.id))
        if (availableStudents.length === 0 || voteCount >= 10) {
          clearInterval(voteInterval)
          return
        }

        const randomStudent = availableStudents[Math.floor(Math.random() * availableStudents.length)]
        const randomOption = activePoll.options[Math.floor(Math.random() * activePoll.options.length)]

        votedStudents.add(randomStudent.id)
        voteCount++

        setPollResults(prev => ({
          ...prev,
          [randomOption.id]: (prev[randomOption.id] || 0) + 1
        }))

        // Track who voted for what (for non-anonymous display)
        setVoters(prev => ({
          ...prev,
          [randomOption.id]: [...(prev[randomOption.id] || []), randomStudent.name]
        }))
      }, 800 + Math.random() * 1200)

      // Stop after ~10 seconds
      const stopTimeout = setTimeout(() => {
        clearInterval(voteInterval)
      }, 10000)

      return () => {
        clearInterval(voteInterval)
        clearTimeout(stopTimeout)
      }
    }
  }, [isPollLive, activePoll])

  const totalVotes = Object.values(pollResults).reduce((a, b) => a + b, 0)

  const handleStartPoll = (poll) => {
    setActivePoll({ ...poll, isAnonymous })
    setPollResults({})
    setVoters({})
    setIsPollLive(true)
    setShowResults(false)
  }

  const handleEndPoll = () => {
    setIsPollLive(false)
    setShowResults(true)
  }

  const handleClosePoll = () => {
    setActivePoll(null)
    setPollResults({})
    setVoters({})
    setShowResults(false)
  }

  const getPercentage = (optionId) => {
    if (totalVotes === 0) return 0
    return Math.round((pollResults[optionId] || 0) / totalVotes * 100)
  }

  // Export results to CSV
  const exportResults = () => {
    if (!activePoll) return

    // Create CSV content with Vietnamese headers
    const headers = 'Lựa chọn,Số phiếu,Phần trăm\n'
    const rows = activePoll.options.map(option => {
      const votes = pollResults[option.id] || 0
      const percentage = getPercentage(option.id)
      return `"${option.text}",${votes},${percentage}%`
    }).join('\n')

    const csv = '\uFEFF' + headers + rows // BOM for UTF-8

    // Download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    const now = new Date()
    const filename = `poll-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}.csv`

    link.href = url
    link.download = filename
    link.click()

    URL.revokeObjectURL(url)
  }

  const handleCreateCustomPoll = () => {
    if (!customQuestion.trim()) return
    const validOptions = customOptions.filter(o => o.trim())
    if (validOptions.length < 2) return

    const newPoll = {
      id: Date.now(),
      question: customQuestion,
      type: 'custom',
      options: validOptions.map((text, idx) => ({
        id: String.fromCharCode(97 + idx),
        text,
        votes: 0
      }))
    }

    handleStartPoll(newPoll)
    setCustomQuestion('')
    setCustomOptions(['', '', ''])
  }

  if (isLoading) {
    return <ToolLoader toolName="Bình chọn" />
  }

  return (
    <div className="polling-tool">
      {/* Active Poll View */}
      {activePoll ? (
        <div className="active-poll">
          <div className="poll-header">
            <div className={`poll-status ${isPollLive ? 'live' : 'ended'}`}>
              {isPollLive ? '🔴 LIVE' : '✅ Kết thúc'}
            </div>
            <h2 className="poll-question">{activePoll.question}</h2>
            <div className="poll-stats">
              <span>👥 {totalVotes} phiếu</span>
              <span>📊 {activePoll.options.length} lựa chọn</span>
            </div>
          </div>

          {/* Anonymous indicator */}
          {activePoll.isAnonymous && (
            <div className="anonymous-badge">
              🔒 Bình chọn ẩn danh
            </div>
          )}

          {/* Poll Options */}
          <div className="poll-options">
            {activePoll.options.map(option => {
              const percentage = getPercentage(option.id)
              const votes = pollResults[option.id] || 0
              const optionVoters = voters[option.id] || []

              return (
                <div key={option.id} className="poll-option">
                  <div className="option-content">
                    <span className="option-text">{option.text}</span>
                    {(showResults || isPollLive) && (
                      <span className="option-stats">
                        {votes} ({percentage}%)
                      </span>
                    )}
                  </div>
                  <div className="option-bar-bg">
                    <div
                      className="option-bar-fill"
                      style={{
                        width: `${percentage}%`,
                        background: isPollLive
                          ? 'linear-gradient(90deg, #3B82F6, #60A5FA)'
                          : 'linear-gradient(90deg, #10B981, #34D399)'
                      }}
                    />
                  </div>
                  {/* Show voters if not anonymous */}
                  {!activePoll.isAnonymous && optionVoters.length > 0 && showResults && (
                    <div className="voters-list">
                      <small>👥 {optionVoters.join(', ')}</small>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Poll Controls */}
          <div className="poll-controls">
            {isPollLive ? (
              <button className="control-btn end" onClick={handleEndPoll}>
                ⏹️ Kết thúc bình chọn
              </button>
            ) : (
              <>
                <button className="control-btn restart" onClick={() => handleStartPoll(activePoll)}>
                  🔄 Bình chọn lại
                </button>
                <button className="control-btn export" onClick={exportResults}>
                  📥 Xuất kết quả
                </button>
                <button className="control-btn close" onClick={handleClosePoll}>
                  ✕ Đóng
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Poll Templates */}
          <div className="poll-templates">
            <h3>📊 Mẫu bình chọn có sẵn</h3>
            <div className="templates-grid">
              {pollTemplates.map(poll => (
                <div key={poll.id} className="template-card" onClick={() => handleStartPoll(poll)}>
                  <div className="template-type">{poll.type}</div>
                  <h4>{poll.question}</h4>
                  <div className="template-options">
                    {poll.options.map(opt => (
                      <span key={opt.id}>{opt.text}</span>
                    ))}
                  </div>
                  <button className="start-btn">▶️ Bắt đầu</button>
                </div>
              ))}
            </div>
          </div>

          {/* Create Custom Poll */}
          <div className="custom-poll-section">
            <h3>✨ Tạo bình chọn mới</h3>
            <div className="custom-poll-form">
              <input
                type="text"
                placeholder="Nhập câu hỏi..."
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="question-input"
              />
              <div className="options-inputs">
                {customOptions.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Lựa chọn ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...customOptions]
                      newOptions[index] = e.target.value
                      setCustomOptions(newOptions)
                    }}
                  />
                ))}
                {customOptions.length < 5 && (
                  <button
                    className="add-option-btn"
                    onClick={() => setCustomOptions([...customOptions, ''])}
                  >
                    + Thêm lựa chọn
                  </button>
                )}
              </div>

              {/* Anonymous Toggle */}
              <div className="poll-setting">
                <label className="setting-toggle">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <span className="toggle-label">
                    <span className="toggle-icon">🔒</span>
                    Bình chọn ẩn danh
                  </span>
                </label>
                <span className="setting-hint">
                  Ẩn tên học sinh khi bình chọn
                </span>
              </div>

              <button
                className="create-btn"
                onClick={handleCreateCustomPoll}
                disabled={!customQuestion.trim() || customOptions.filter(o => o.trim()).length < 2}
              >
                🚀 Tạo & Bắt đầu
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PollingTool
