import { useState, useEffect } from 'react'
import './KeyboardShortcuts.css'

function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = {
    'Chung': [
      { key: '?', desc: 'Hiện/Ẩn phím tắt' },
      { key: 'Esc', desc: 'Đóng modal/hủy' },
      { key: 'Ctrl+S', desc: 'Lưu (nếu có)' }
    ],
    'Điều hướng': [
      { key: '←→', desc: 'Chuyển câu hỏi (Quiz)' },
      { key: '↑↓', desc: 'Di chuyển danh sách' },
      { key: 'Tab', desc: 'Focus tiếp theo' }
    ],
    'Công cụ': [
      { key: 'Space', desc: 'Bắt đầu/Dừng (Timer)' },
      { key: 'Enter', desc: 'Xác nhận/Submit' },
      { key: 'Ctrl+Z', desc: 'Hoàn tác (Whiteboard)' },
      { key: 'Ctrl+Y', desc: 'Làm lại (Whiteboard)' }
    ]
  }

  // Listen for ? key to toggle
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if ? key is pressed (shift + / on US keyboard)
      if (e.key === '?' && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Only if not in an input field
        if (!['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault()
          setIsOpen(prev => !prev)
        }
      }
      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  return (
    <>
      {/* Floating Help Button */}
      <button 
        className="kb-help-btn"
        onClick={() => setIsOpen(true)}
        title="Phím tắt (nhấn ?)"
        aria-label="Hiện phím tắt"
      >
        ?
      </button>

      {/* Shortcuts Modal */}
      {isOpen && (
        <div className="kb-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="kb-modal" onClick={e => e.stopPropagation()}>
            <div className="kb-header">
              <h2>⌨️ Phím tắt</h2>
              <button 
                className="kb-close" 
                onClick={() => setIsOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <div className="kb-content">
              {Object.entries(shortcuts).map(([category, items]) => (
                <div key={category} className="kb-section">
                  <h3>{category}</h3>
                  <div className="kb-list">
                    {items.map((shortcut, idx) => (
                      <div key={idx} className="kb-item">
                        <kbd className="kb-key">{shortcut.key}</kbd>
                        <span className="kb-desc">{shortcut.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="kb-footer">
              <p>Nhấn <kbd>?</kbd> bất kỳ lúc nào để xem phím tắt</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default KeyboardShortcuts
