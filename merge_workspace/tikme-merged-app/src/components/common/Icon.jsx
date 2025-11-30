import '../../styles/icon-system.css'

/**
 * Enhanced Icon Component with Premium Effects
 * Phase 4D - World-Class Icon System
 *
 * Usage:
 * <Icon emoji="⭐" size="md" color="warning" />
 * <Icon emoji="📊" container size="lg" color="info" hover="lift" />
 * <Icon emoji="🎯" container circle size="xl" color="primary" />
 */

// Main Icon Component
export function Icon({
  emoji,
  children,
  size = 'md', // xs, sm, md, lg, xl, 2xl
  color = 'neutral', // primary, success, warning, danger, info, accent, neutral, special
  container = false,
  circle = false,
  soft = false, // soft background variant
  hover = null, // lift, scale, bounce, glow, rotate, shake
  pulse = false,
  className = '',
  onClick,
  title,
  ...props
}) {
  const classes = [
    container ? 'icon-container' : 'icon emoji-icon',
    size,
    container ? (soft ? `${color}-soft` : color) : `icon-${color}`,
    circle && 'circle',
    hover && `icon-hover-${hover}`,
    pulse && 'icon-pulse',
    className
  ].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      onClick={onClick}
      title={title}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {emoji || children}
    </span>
  )
}

// Icon Button Component
export function IconButton({
  emoji,
  children,
  color = 'neutral',
  filled = false,
  size = 'md',
  onClick,
  title,
  disabled = false,
  className = '',
  ...props
}) {
  const sizeStyles = {
    xs: { padding: '6px', fontSize: '14px' },
    sm: { padding: '8px', fontSize: '16px' },
    md: { padding: '10px', fontSize: '20px' },
    lg: { padding: '12px', fontSize: '24px' },
    xl: { padding: '14px', fontSize: '28px' }
  }

  const classes = [
    'icon-btn',
    filled && 'filled',
    color,
    className
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      onClick={onClick}
      title={title}
      disabled={disabled}
      style={sizeStyles[size]}
      {...props}
    >
      {emoji || children}
    </button>
  )
}

// Tool Icon Component (for teaching tools)
export function ToolIcon({
  emoji,
  toolType, // timer, picker, poll, quiz, whiteboard, flashcard, attendance, behavior, groups, breakout, screen, progress
  size = 'md',
  onClick,
  active = false,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: { width: '36px', height: '36px', fontSize: '18px', borderRadius: '10px' },
    md: { width: '48px', height: '48px', fontSize: '24px', borderRadius: '14px' },
    lg: { width: '64px', height: '64px', fontSize: '32px', borderRadius: '18px' },
    xl: { width: '80px', height: '80px', fontSize: '40px', borderRadius: '22px' }
  }

  const classes = [
    'tool-icon',
    toolType,
    active && 'active',
    className
  ].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      onClick={onClick}
      style={sizeStyles[size]}
      {...props}
    >
      {emoji}
    </span>
  )
}

// Status Icon Component
export function StatusIcon({
  status = 'offline', // online, away, offline, busy
  size = 'md', // md, lg
  className = '',
  ...props
}) {
  const classes = [
    'status-icon',
    status,
    size === 'lg' && 'lg',
    className
  ].filter(Boolean).join(' ')

  return <span className={classes} {...props} />
}

// Icon with Badge
export function IconBadge({
  emoji,
  children,
  badge,
  badgeColor = 'danger', // danger, success, warning, primary
  dot = false, // Show dot instead of number
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <span className={`icon-badge-wrapper ${className}`} {...props}>
      <Icon emoji={emoji} size={size}>
        {children}
      </Icon>
      {dot ? (
        <span className="icon-dot" />
      ) : badge !== undefined && badge !== null ? (
        <span className={`icon-badge ${badgeColor}`}>
          {badge > 99 ? '99+' : badge}
        </span>
      ) : null}
    </span>
  )
}

// Animated Icon Component
export function AnimatedIcon({
  emoji,
  children,
  animation = 'pulse', // spin, float, wiggle, heartbeat, pulse
  size = 'md',
  color,
  className = '',
  ...props
}) {
  const animationClass = {
    spin: 'icon-spin',
    float: 'icon-float',
    wiggle: 'icon-wiggle',
    heartbeat: 'icon-heartbeat',
    pulse: 'icon-pulse'
  }

  const classes = [
    'icon emoji-icon',
    `icon-${size}`,
    color && `icon-${color}`,
    animationClass[animation],
    className
  ].filter(Boolean).join(' ')

  return (
    <span className={classes} {...props}>
      {emoji || children}
    </span>
  )
}

// Emoji with Depth Effect
export function EmojiIcon({
  emoji,
  size = 'md',
  withBg = false,
  hover = true,
  className = '',
  ...props
}) {
  const sizeStyles = {
    xs: { fontSize: '16px' },
    sm: { fontSize: '20px' },
    md: { fontSize: '28px' },
    lg: { fontSize: '36px' },
    xl: { fontSize: '48px' },
    '2xl': { fontSize: '64px' }
  }

  if (withBg) {
    return (
      <span
        className={`emoji-bg ${className}`}
        style={sizeStyles[size]}
        {...props}
      >
        {emoji}
      </span>
    )
  }

  return (
    <span
      className={`emoji-icon ${hover ? 'icon-hover-scale' : ''} ${className}`}
      style={sizeStyles[size]}
      {...props}
    >
      {emoji}
    </span>
  )
}

// Quick Access Icon Sets
export const TeachingToolIcons = {
  timer: { emoji: '⏱️', color: '#EF4444' },
  picker: { emoji: '🎯', color: '#8B5CF6' },
  poll: { emoji: '📊', color: '#3B82F6' },
  quiz: { emoji: '❓', color: '#10B981' },
  whiteboard: { emoji: '🎨', color: '#64748B' },
  flashcard: { emoji: '📇', color: '#F59E0B' },
  attendance: { emoji: '✅', color: '#06B6D4' },
  behavior: { emoji: '⭐', color: '#EC4899' },
  groups: { emoji: '👥', color: '#059669' },
  breakout: { emoji: '🚪', color: '#0891B2' },
  screen: { emoji: '🖥️', color: '#7C3AED' },
  progress1: { emoji: '📋', color: '#0D9488' },
  progress2: { emoji: '📈', color: '#DC2626' }
}

export const StatusIcons = {
  active: '🟢',
  idle: '🟡',
  offline: '⚫',
  handRaised: '🙋',
  micOn: '🎤',
  micOff: '🔇',
  cameraOn: '📹',
  cameraOff: '📷',
  star: '⭐',
  check: '✅',
  warning: '⚠️',
  error: '❌'
}

export default Icon
