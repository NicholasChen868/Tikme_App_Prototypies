import './LoadingStates.css'

/**
 * Loading State Components
 * Provides various loading indicators for different use cases
 */

// Full Page Loader
export function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="page-loader">
      <div className="loader-content">
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loader-message">{message}</p>
      </div>
    </div>
  )
}

// Inline Loader (for buttons, small areas)
export function InlineLoader({ size = 'medium', color = 'primary' }) {
  return (
    <span className={`inline-loader ${size} ${color}`}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </span>
  )
}

// Skeleton Loader for Cards
export function CardSkeleton({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-skeleton">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-content">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line subtitle"></div>
          </div>
        </div>
      ))}
    </>
  )
}

// Skeleton Loader for Lists
export function ListSkeleton({ rows = 5 }) {
  return (
    <div className="list-skeleton">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton-row">
          <div className="skeleton-cell narrow"></div>
          <div className="skeleton-cell wide"></div>
          <div className="skeleton-cell medium"></div>
        </div>
      ))}
    </div>
  )
}

// Skeleton Loader for Text
export function TextSkeleton({ lines = 3, width = 'random' }) {
  const getWidth = (index) => {
    if (width === 'random') {
      const widths = ['100%', '90%', '80%', '70%', '60%']
      return widths[index % widths.length]
    }
    return width
  }

  return (
    <div className="text-skeleton">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton-line text"
          style={{ width: getWidth(i) }}
        ></div>
      ))}
    </div>
  )
}

// Progress Loader
export function ProgressLoader({ progress = 0, showPercent = true, label = '' }) {
  return (
    <div className="progress-loader">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
      {showPercent && <span className="progress-percent">{Math.round(progress)}%</span>}
    </div>
  )
}

// Pulse Loader (for real-time data)
export function PulseLoader({ text = 'Updating...' }) {
  return (
    <div className="pulse-loader">
      <span className="pulse-dot"></span>
      <span className="pulse-text">{text}</span>
    </div>
  )
}

// Tool Loading Overlay
export function ToolLoader({ toolName = 'Tool' }) {
  return (
    <div className="tool-loader">
      <div className="tool-loader-content">
        <div className="tool-spinner"></div>
        <p>Loading {toolName}...</p>
      </div>
    </div>
  )
}

// Connecting Loader
export function ConnectingLoader({ status = 'connecting' }) {
  const messages = {
    connecting: 'Connecting to classroom...',
    reconnecting: 'Reconnecting...',
    syncing: 'Syncing data...'
  }

  return (
    <div className="connecting-loader">
      <div className="connection-indicator">
        <span className="conn-dot"></span>
        <span className="conn-dot"></span>
        <span className="conn-dot"></span>
      </div>
      <p>{messages[status] || 'Loading...'}</p>
    </div>
  )
}

export default {
  PageLoader,
  InlineLoader,
  CardSkeleton,
  ListSkeleton,
  TextSkeleton,
  ProgressLoader,
  PulseLoader,
  ToolLoader,
  ConnectingLoader
}
