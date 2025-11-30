import './EmptyStates.css'

/**
 * Empty State Components
 * Provides meaningful feedback when there's no content to display
 */

// Generic Empty State
export function EmptyState({
  icon = '📭',
  title = 'Nothing here yet',
  description = 'There is no content to display at this time.',
  action = null,
  actionLabel = 'Get Started',
  onAction = () => {}
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {action && (
        <button className="empty-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

// No Students Empty State
export function NoStudentsState({ onInvite }) {
  return (
    <EmptyState
      icon="👥"
      title="No students yet"
      description="Students will appear here when they join the class."
      action={onInvite}
      actionLabel="Invite Students"
      onAction={onInvite}
    />
  )
}

// No Results Empty State (for search)
export function NoResultsState({ query, onClear }) {
  return (
    <EmptyState
      icon="🔍"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search.`}
      action={onClear}
      actionLabel="Clear Search"
      onAction={onClear}
    />
  )
}

// No Data Empty State
export function NoDataState({ dataType = 'data' }) {
  return (
    <EmptyState
      icon="📊"
      title={`No ${dataType} available`}
      description={`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} will appear here once there's activity.`}
    />
  )
}

// Select Tool Empty State
export function SelectToolState() {
  return (
    <div className="select-tool-state">
      <div className="select-icon">🛠️</div>
      <h3>Select a tool</h3>
      <p>Choose a teaching tool from the sidebar to get started</p>
      <div className="tool-suggestions">
        <span>Try:</span>
        <span className="suggestion">⏱️ Timer</span>
        <span className="suggestion">📊 Poll</span>
        <span className="suggestion">🎯 Picker</span>
      </div>
    </div>
  )
}

// No Groups Empty State
export function NoGroupsState({ onCreate }) {
  return (
    <EmptyState
      icon="👥"
      title="No groups created"
      description="Create groups to organize students for collaborative activities."
      action={onCreate}
      actionLabel="Create Groups"
      onAction={onCreate}
    />
  )
}

// No Messages Empty State
export function NoMessagesState() {
  return (
    <EmptyState
      icon="💬"
      title="No messages yet"
      description="Messages from students and broadcasts will appear here."
    />
  )
}

// Poll Not Started State
export function PollNotStartedState({ onStart }) {
  return (
    <div className="poll-not-started">
      <div className="poll-icon">📊</div>
      <h3>Ready to poll?</h3>
      <p>Create a question and get instant feedback from your class</p>
      <button className="start-poll-btn" onClick={onStart}>
        Create Poll
      </button>
    </div>
  )
}

// Quiz Not Started State
export function QuizNotStartedState({ onStart }) {
  return (
    <div className="quiz-not-started">
      <div className="quiz-icon">❓</div>
      <h3>Quiz Time!</h3>
      <p>Test your students' understanding with a quick quiz</p>
      <button className="start-quiz-btn" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  )
}

// Offline State
export function OfflineState({ onRetry }) {
  return (
    <div className="offline-state">
      <div className="offline-icon">📡</div>
      <h3>You're offline</h3>
      <p>Please check your internet connection and try again</p>
      <button className="retry-connection-btn" onClick={onRetry}>
        🔄 Retry Connection
      </button>
    </div>
  )
}

// Coming Soon State
export function ComingSoonState({ feature = 'feature' }) {
  return (
    <div className="coming-soon-state">
      <div className="coming-soon-icon">🚀</div>
      <h3>Coming Soon!</h3>
      <p>The {feature} feature is currently under development.</p>
      <span className="coming-soon-badge">In Progress</span>
    </div>
  )
}

// Permission Denied State
export function PermissionDeniedState({ permission = 'this feature' }) {
  return (
    <EmptyState
      icon="🔒"
      title="Permission Required"
      description={`You don't have access to ${permission}. Please contact your administrator.`}
    />
  )
}

export default {
  EmptyState,
  NoStudentsState,
  NoResultsState,
  NoDataState,
  SelectToolState,
  NoGroupsState,
  NoMessagesState,
  PollNotStartedState,
  QuizNotStartedState,
  OfflineState,
  ComingSoonState,
  PermissionDeniedState
}
