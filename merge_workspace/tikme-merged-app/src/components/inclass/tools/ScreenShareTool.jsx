import { useState, useEffect } from 'react'
import { mockClassStudents } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './ScreenShareTool.css'

function ScreenShareTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSharing, setIsSharing] = useState(false)
  const [shareType, setShareType] = useState('screen') // screen, window, tab
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [cursorVisible, setCursorVisible] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewerCount, setViewerCount] = useState(0)
  const [quality, setQuality] = useState('HD')
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Simulate viewers joining when sharing starts
  useEffect(() => {
    if (isSharing) {
      const activeStudents = mockClassStudents.filter(s => s.status === 'active').length
      // Gradually increase viewers
      let count = 0
      const interval = setInterval(() => {
        count += Math.ceil(Math.random() * 3)
        if (count >= activeStudents) {
          count = activeStudents
          clearInterval(interval)
        }
        setViewerCount(count)
      }, 500)

      return () => clearInterval(interval)
    } else {
      setViewerCount(0)
    }
  }, [isSharing])

  // Timer when sharing
  useEffect(() => {
    if (!isSharing) {
      setElapsedTime(0)
      return
    }

    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isSharing])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startSharing = () => {
    setIsSharing(true)
  }

  const stopSharing = () => {
    setIsSharing(false)
    setIsFullscreen(false)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const shareTypes = [
    { id: 'screen', name: 'Entire Screen', icon: '🖥️', desc: 'Share everything on your screen' },
    { id: 'window', name: 'Window', icon: '🪟', desc: 'Share a specific application' },
    { id: 'tab', name: 'Browser Tab', icon: '🌐', desc: 'Share a browser tab' }
  ]

  const qualityOptions = ['Auto', 'HD', 'SD', 'Low']

  if (isLoading) {
    return <ToolLoader toolName="Chia sẻ màn hình" />
  }

  return (
    <div className={`screen-share-tool ${isFullscreen ? 'fullscreen' : ''}`}>
      {!isSharing ? (
        // Setup View
        <div className="share-setup">
          <div className="setup-icon">🖥️</div>
          <h2>Screen Share</h2>
          <p>Share your screen with students in real-time</p>

          {/* Share Type Selection */}
          <div className="share-types">
            {shareTypes.map(type => (
              <button
                key={type.id}
                className={`share-type-btn ${shareType === type.id ? 'active' : ''}`}
                onClick={() => setShareType(type.id)}
              >
                <span className="type-icon">{type.icon}</span>
                <span className="type-name">{type.name}</span>
                <span className="type-desc">{type.desc}</span>
              </button>
            ))}
          </div>

          {/* Quick Settings */}
          <div className="quick-settings">
            <label className="setting-toggle">
              <input
                type="checkbox"
                checked={audioEnabled}
                onChange={(e) => setAudioEnabled(e.target.checked)}
              />
              <span className="toggle-label">
                <span className="toggle-icon">{audioEnabled ? '🔊' : '🔇'}</span>
                Share Audio
              </span>
            </label>

            <label className="setting-toggle">
              <input
                type="checkbox"
                checked={cursorVisible}
                onChange={(e) => setCursorVisible(e.target.checked)}
              />
              <span className="toggle-label">
                <span className="toggle-icon">👆</span>
                Show Cursor
              </span>
            </label>
          </div>

          {/* Start Button */}
          <button className="start-share-btn" onClick={startSharing}>
            <span>📺</span>
            Start Sharing
          </button>

          <p className="share-hint">
            Students will see your {shareType === 'screen' ? 'entire screen' : shareType === 'window' ? 'selected window' : 'browser tab'}
          </p>
        </div>
      ) : (
        // Active Sharing View
        <div className="share-active">
          {/* Control Bar */}
          <div className="share-controls">
            <div className="control-left">
              <div className="live-indicator">
                <span className="live-dot"></span>
                LIVE
              </div>
              <div className="share-timer">{formatTime(elapsedTime)}</div>
            </div>

            <div className="control-center">
              <button
                className={`control-btn ${audioEnabled ? 'active' : ''}`}
                onClick={() => setAudioEnabled(!audioEnabled)}
                title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
              >
                {audioEnabled ? '🔊' : '🔇'}
              </button>
              <button
                className={`control-btn ${cursorVisible ? 'active' : ''}`}
                onClick={() => setCursorVisible(!cursorVisible)}
                title={cursorVisible ? 'Hide Cursor' : 'Show Cursor'}
              >
                👆
              </button>
              <button
                className="control-btn"
                onClick={() => setShowSettings(!showSettings)}
                title="Settings"
              >
                ⚙️
              </button>
              <button
                className="control-btn"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? '⛶' : '⛶'}
              </button>
            </div>

            <div className="control-right">
              <div className="viewer-count">
                <span className="viewer-icon">👁️</span>
                <span className="viewer-number">{viewerCount}</span>
                <span className="viewer-label">viewing</span>
              </div>
              <button className="stop-share-btn" onClick={stopSharing}>
                Stop Sharing
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="settings-panel">
              <div className="settings-row">
                <span className="setting-label">Quality:</span>
                <div className="quality-options">
                  {qualityOptions.map(q => (
                    <button
                      key={q}
                      className={`quality-btn ${quality === q ? 'active' : ''}`}
                      onClick={() => setQuality(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="settings-row">
                <span className="setting-label">Sharing:</span>
                <span className="setting-value">
                  {shareTypes.find(t => t.id === shareType)?.name}
                </span>
              </div>
            </div>
          )}

          {/* Preview Area */}
          <div className="share-preview">
            <div className="preview-container">
              {/* Mock Screen Content */}
              <div className="mock-screen">
                <div className="mock-header">
                  <div className="mock-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="mock-title">Tikme - Lesson Materials</span>
                </div>
                <div className="mock-content">
                  <div className="mock-sidebar">
                    <div className="mock-nav-item active"></div>
                    <div className="mock-nav-item"></div>
                    <div className="mock-nav-item"></div>
                    <div className="mock-nav-item"></div>
                  </div>
                  <div className="mock-main">
                    <div className="mock-text-block"></div>
                    <div className="mock-text-block short"></div>
                    <div className="mock-image-block">
                      <span>📊</span>
                    </div>
                    <div className="mock-text-block"></div>
                  </div>
                </div>
              </div>

              {/* Cursor Animation */}
              {cursorVisible && (
                <div className="animated-cursor">
                  <span>👆</span>
                </div>
              )}

              {/* Quality Badge */}
              <div className="quality-badge">{quality}</div>

              {/* Share Type Indicator */}
              <div className="share-type-indicator">
                {shareTypes.find(t => t.id === shareType)?.icon}
                {shareTypes.find(t => t.id === shareType)?.name}
              </div>
            </div>
          </div>

          {/* Viewer List */}
          <div className="viewer-list">
            <h4>Currently Viewing ({viewerCount})</h4>
            <div className="viewers">
              {mockClassStudents
                .filter(s => s.status === 'active')
                .slice(0, viewerCount)
                .map(student => (
                  <div key={student.id} className="viewer-item">
                    <img src={student.avatar} alt={student.name} />
                    <span className="viewer-name">{student.name}</span>
                    <span className="viewer-status">👁️</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScreenShareTool
