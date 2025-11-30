import { useRef, useState, useEffect } from 'react'
import { fitVietnameseName, fitJapaneseText, smartTruncate } from '../../utils/textFitting'
import '../../styles/typography-golden.css'

/**
 * SmartText Component
 * Automatically fits text to container without truncation
 * Phase 4D - No More "Nguyễn Vă..." Ever!
 */

// Main SmartText Component
export function SmartText({
  children,
  text,
  type = 'text', // text, name, title, japanese, label
  maxWidth,
  minFontSize = 10,
  maxFontSize = 16,
  weight = 'normal',
  color = 'primary',
  className = '',
  as: Component = 'span',
  ...props
}) {
  const containerRef = useRef(null)
  const [fontSize, setFontSize] = useState(maxFontSize)
  const content = text || children

  useEffect(() => {
    if (!containerRef.current || !content) return

    const containerWidth = maxWidth || containerRef.current.parentElement?.offsetWidth || 200

    // Calculate optimal font size based on type
    if (type === 'name') {
      const result = fitVietnameseName(content, containerWidth, {
        minSize: minFontSize,
        maxSize: maxFontSize
      })
      setFontSize(result.fontSize)
    } else if (type === 'japanese') {
      const result = fitJapaneseText(content, containerWidth, {
        minSize: minFontSize,
        maxSize: maxFontSize
      })
      setFontSize(result.fontSize)
    } else {
      // Generic text fitting
      const charWidth = 0.55
      const availableWidth = containerWidth - 8
      const idealSize = Math.floor(availableWidth / (content.length * charWidth))
      setFontSize(Math.max(minFontSize, Math.min(maxFontSize, idealSize)))
    }
  }, [content, type, maxWidth, minFontSize, maxFontSize])

  const weightClass = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  }[weight] || 'font-normal'

  const colorClass = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    tertiary: 'text-tertiary',
    muted: 'text-muted',
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    info: 'text-info'
  }[color] || ''

  return (
    <Component
      ref={containerRef}
      className={`text-no-truncate ${weightClass} ${colorClass} ${className}`}
      style={{ fontSize: `${fontSize}px` }}
      {...props}
    >
      {content}
    </Component>
  )
}

// Vietnamese Name Component - Never Truncates
export function VietnameseName({
  name,
  maxWidth = 150,
  size = 'md', // sm, md, lg
  weight = 'semibold',
  className = '',
  ...props
}) {
  const sizeConfig = {
    sm: { min: 10, max: 12 },
    md: { min: 11, max: 14 },
    lg: { min: 12, max: 16 }
  }

  const { min, max } = sizeConfig[size] || sizeConfig.md

  return (
    <SmartText
      text={name}
      type="name"
      maxWidth={maxWidth}
      minFontSize={min}
      maxFontSize={max}
      weight={weight}
      className={`text-vietnamese ${className}`}
      {...props}
    />
  )
}

// Student Name Card Component
export function StudentNameDisplay({
  name,
  status = 'active',
  showStatus = true,
  compact = false,
  className = '',
  ...props
}) {
  const containerRef = useRef(null)
  const [displayName, setDisplayName] = useState(name)
  const [fontSize, setFontSize] = useState(14)

  useEffect(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth

    // Smart fitting for Vietnamese names
    const result = fitVietnameseName(name, containerWidth, {
      minSize: compact ? 10 : 11,
      maxSize: compact ? 12 : 14,
      showFullName: !compact
    })

    setDisplayName(result.displayName)
    setFontSize(result.fontSize)
  }, [name, compact])

  const statusColor = {
    active: '#10B981',
    idle: '#F59E0B',
    offline: '#94A3B8'
  }[status] || '#94A3B8'

  return (
    <div
      ref={containerRef}
      className={`student-name-display ${compact ? 'compact' : ''} ${className}`}
      {...props}
    >
      {showStatus && (
        <span
          className="status-dot"
          style={{ backgroundColor: statusColor }}
        />
      )}
      <span
        className="name-text text-vietnamese font-semibold"
        style={{ fontSize: `${fontSize}px` }}
        title={name}
      >
        {displayName}
      </span>
    </div>
  )
}

// Heading with Auto-sizing
export function AutoHeading({
  children,
  level = 2, // 1-6
  maxWidth,
  className = '',
  ...props
}) {
  const Tag = `h${level}`
  const sizeMap = {
    1: { min: 32, max: 48 },
    2: { min: 24, max: 36 },
    3: { min: 20, max: 28 },
    4: { min: 18, max: 22 },
    5: { min: 16, max: 18 },
    6: { min: 14, max: 16 }
  }

  const { min, max } = sizeMap[level] || sizeMap[2]

  return (
    <SmartText
      as={Tag}
      text={children}
      type="title"
      maxWidth={maxWidth}
      minFontSize={min}
      maxFontSize={max}
      weight="bold"
      className={`heading-${level} ${className}`}
      {...props}
    />
  )
}

// Japanese Text with Furigana
export function JapaneseText({
  kanji,
  furigana,
  romaji,
  meaning,
  size = 'md', // sm, md, lg, xl (for Zoom)
  showFurigana = true,
  showRomaji = false,
  className = '',
  ...props
}) {
  const sizeStyles = {
    sm: { kanji: 20, furigana: 10, romaji: 12 },
    md: { kanji: 28, furigana: 12, romaji: 14 },
    lg: { kanji: 36, furigana: 14, romaji: 16 },
    xl: { kanji: 48, furigana: 18, romaji: 20 }, // Zoom-friendly
    '2xl': { kanji: 64, furigana: 22, romaji: 24 }
  }

  const styles = sizeStyles[size] || sizeStyles.md

  return (
    <span className={`japanese-text-container ${className}`} {...props}>
      <ruby className="japanese-ruby" style={{ fontSize: styles.kanji }}>
        <span className="kanji font-japanese">{kanji}</span>
        {showFurigana && furigana && (
          <rt className="furigana font-japanese" style={{ fontSize: styles.furigana }}>
            {furigana}
          </rt>
        )}
      </ruby>
      {showRomaji && romaji && (
        <span
          className="romaji text-romaji"
          style={{ fontSize: styles.romaji }}
        >
          {romaji}
        </span>
      )}
      {meaning && (
        <span className="meaning text-secondary" style={{ fontSize: styles.romaji }}>
          {meaning}
        </span>
      )}
    </span>
  )
}

// Truncate with Tooltip (fallback for extreme cases)
export function TruncateWithTooltip({
  text,
  maxChars = 20,
  className = '',
  ...props
}) {
  const result = smartTruncate(text, maxChars)

  return (
    <span
      className={`truncate-tooltip ${className}`}
      title={result.truncated ? text : undefined}
      {...props}
    >
      {result.text}
    </span>
  )
}

// Responsive Text (uses clamp)
export function ResponsiveText({
  children,
  minSize = 12,
  maxSize = 18,
  preferredSize = '4vw',
  weight = 'normal',
  className = '',
  ...props
}) {
  const style = {
    fontSize: `clamp(${minSize}px, ${preferredSize}, ${maxSize}px)`
  }

  const weightClass = `font-${weight}`

  return (
    <span
      className={`responsive-text ${weightClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </span>
  )
}

// Label with Golden Ratio
export function GoldenLabel({
  children,
  size = 'base', // xs, sm, base, lg
  uppercase = false,
  className = '',
  ...props
}) {
  const sizeMap = {
    xs: 'text-2xs',
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base'
  }

  return (
    <span
      className={`
        ${sizeMap[size] || sizeMap.base}
        font-medium
        text-secondary
        ${uppercase ? 'uppercase tracking-wider' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}

// Export all
export default SmartText

// CSS for components (inline styles backup)
const componentStyles = `
  .student-name-display {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    max-width: 100%;
  }

  .student-name-display .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .student-name-display .name-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .student-name-display.compact {
    gap: 4px;
  }

  .student-name-display.compact .status-dot {
    width: 6px;
    height: 6px;
  }

  .japanese-text-container {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .japanese-ruby {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
  }

  .japanese-ruby rt {
    font-size: 0.5em;
    color: var(--slate-500);
  }

  .truncate-tooltip {
    cursor: default;
  }
`
