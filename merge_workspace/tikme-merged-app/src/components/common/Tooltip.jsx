import { useState, useRef, useEffect } from 'react'
import './Tooltip.css'

/**
 * Tooltip Component
 * Displays contextual information on hover
 */
export function Tooltip({
  children,
  content,
  position = 'top', // top, bottom, left, right
  delay = 300,
  disabled = false
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const tooltipRef = useRef(null)
  const timeoutRef = useRef(null)

  const showTooltip = () => {
    if (disabled) return
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    let top, left

    switch (position) {
      case 'bottom':
        top = triggerRect.bottom + 8
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
        break
      case 'left':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.left - tooltipRect.width - 8
        break
      case 'right':
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
        left = triggerRect.right + 8
        break
      case 'top':
      default:
        top = triggerRect.top - tooltipRect.height - 8
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
    }

    // Ensure tooltip stays within viewport
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8))
    top = Math.max(8, Math.min(top, window.innerHeight - tooltipRect.height - 8))

    setTooltipPosition({ top, left })
  }, [isVisible, position])

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  return (
    <div
      ref={triggerRef}
      className="tooltip-trigger"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && content && (
        <div
          ref={tooltipRef}
          className={`tooltip tooltip-${position}`}
          style={{
            position: 'fixed',
            top: tooltipPosition.top,
            left: tooltipPosition.left
          }}
        >
          {content}
          <span className="tooltip-arrow"></span>
        </div>
      )}
    </div>
  )
}

/**
 * Info Tooltip - For help/info icons
 */
export function InfoTooltip({ content, position = 'top' }) {
  return (
    <Tooltip content={content} position={position}>
      <span className="info-icon">ℹ️</span>
    </Tooltip>
  )
}

/**
 * Button Tooltip - Wraps buttons with tooltip
 */
export function ButtonTooltip({ children, label, shortcut, position = 'top' }) {
  const content = (
    <div className="button-tooltip-content">
      <span className="tooltip-label">{label}</span>
      {shortcut && <span className="tooltip-shortcut">{shortcut}</span>}
    </div>
  )

  return (
    <Tooltip content={content} position={position}>
      {children}
    </Tooltip>
  )
}

/**
 * Status Tooltip - Shows status information
 */
export function StatusTooltip({ status, message, position = 'top', children }) {
  const statusIcons = {
    success: '✅',
    warning: '⚠️',
    error: '❌',
    info: 'ℹ️',
    loading: '⏳'
  }

  const content = (
    <div className={`status-tooltip-content ${status}`}>
      <span className="status-icon">{statusIcons[status] || statusIcons.info}</span>
      <span className="status-message">{message}</span>
    </div>
  )

  return (
    <Tooltip content={content} position={position}>
      {children}
    </Tooltip>
  )
}

export default Tooltip
