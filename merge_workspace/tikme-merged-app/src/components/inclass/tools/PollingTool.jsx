import { useState, useEffect } from 'react'
import { pollTemplates, mockClassStudents } from '@/utils/inclassData'
import './PollingTool.css'

function PollingTool() {
  const [activePoll, setActivePoll] = useState(null)
  const [pollResults, setPollResults] = useState({})
  const [isPollLive, setIsPollLive] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [customQuestion, setCustomQuestion] = useState('')
  const [customOptions, setCustomOptions] = useState(['', '', ''])

  // Simulate votes coming in
  useEffect(() => {
    if (isPollLive && activePoll) {
      const voteInterval = setInterval(() => {
        setPollResults(prev => {
          const newResults = { ...prev }
          const randomOption = activePoll.options[Math.floor(Math.random() * activePoll.options.length)]
          newResults[randomOption.id] = (newResults[randomOption.id] || 0) + 1
          return newResults
        })
      }, 800 + Math.random() * 1200)

      // Stop after ~8 votes
      const stopTimeout = setTimeout(() => {
        clearInterval(voteInterval)
      }, 8000)

      return () => {
        clearInterval(voteInterval)
        clearTimeout(stopTimeout)
      }
    }
  }, [isPollLive, activePoll])

  const totalVotes = Object.values(pollResults).reduce((a, b) => a + b, 0)

  const handleStartPoll = (poll) => {
    setActivePoll(poll)
    setPollResults({})
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
    setShowResults(false)
  }

  const getPercentage = (optionId) => {
    if (totalVotes === 0) return 0
    return Math.round((pollResults[optionId] || 0) / totalVotes * 100)
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

          {/* Poll Options */}
          <div className="poll-options">
            {activePoll.options.map(option => {
              const percentage = getPercentage(option.id)
              const votes = pollResults[option.id] || 0

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
