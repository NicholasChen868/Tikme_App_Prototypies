/**
 * Smart Text Fitting Utilities
 * Phase 4D - No More Truncation!
 *
 * Uses golden ratio and dynamic scaling to fit text perfectly
 * "Nguyễn Văn An" should NEVER become "Nguyễn Vă..."
 */

// Golden Ratio constant
const PHI = 1.618033988749895

// Font size scale based on golden ratio
export const goldenScale = {
  '6xl': 64,   // 64px - Hero headlines
  '5xl': 48,   // 48px - Page titles
  '4xl': 36,   // 36px - Section titles
  '3xl': 28,   // 28px - Card titles (Japanese Zoom)
  '2xl': 22,   // 22px - Subheadings
  'xl': 18,    // 18px - Large text
  'lg': 16,    // 16px - Body large
  'base': 14,  // 14px - Body text
  'sm': 12,    // 12px - Small text
  'xs': 11,    // 11px - Extra small
  '2xs': 10,   // 10px - Tiny text
}

// Calculate font size to fit text in container
export function calculateFitFontSize(text, containerWidth, options = {}) {
  const {
    minSize = 10,
    maxSize = 24,
    fontFamily = 'system-ui',
    padding = 8,
    charWidthRatio = 0.55 // Average char width as ratio of font size
  } = options

  const availableWidth = containerWidth - (padding * 2)
  const textLength = text.length

  // Estimate ideal font size
  let fontSize = Math.floor(availableWidth / (textLength * charWidthRatio))

  // Clamp to min/max
  fontSize = Math.max(minSize, Math.min(maxSize, fontSize))

  return fontSize
}

// Vietnamese name fitting - handles diacritics
export function fitVietnameseName(name, containerWidth, options = {}) {
  const {
    minSize = 11,
    maxSize = 16,
    showFullName = true
  } = options

  // Vietnamese names often have 3-4 parts
  const parts = name.split(' ')
  const charCount = name.length

  // Special handling for long Vietnamese names
  if (charCount > 20 && containerWidth < 150) {
    // Show first and last name only
    if (!showFullName && parts.length > 2) {
      return {
        displayName: `${parts[0]} ${parts[parts.length - 1]}`,
        fontSize: maxSize,
        truncated: true
      }
    }
  }

  // Calculate optimal font size
  // Vietnamese chars with diacritics are slightly wider
  const avgCharWidth = 0.6
  const fontSize = calculateFitFontSize(name, containerWidth, {
    minSize,
    maxSize,
    charWidthRatio: avgCharWidth
  })

  return {
    displayName: name,
    fontSize,
    truncated: false
  }
}

// Japanese text fitting - handles kanji, hiragana, katakana
export function fitJapaneseText(text, containerWidth, options = {}) {
  const {
    minSize = 14,
    maxSize = 48,
    includeRuby = false // For furigana consideration
  } = options

  // Japanese chars are typically square (1:1 ratio)
  // Hiragana/Katakana slightly narrower than Kanji
  const hasKanji = /[\u4e00-\u9faf]/.test(text)
  const charWidthRatio = hasKanji ? 1.0 : 0.9

  // If including furigana, reduce effective height
  const effectiveWidth = includeRuby ? containerWidth * 0.85 : containerWidth

  const fontSize = calculateFitFontSize(text, effectiveWidth, {
    minSize,
    maxSize,
    charWidthRatio
  })

  return {
    displayText: text,
    fontSize,
    isKanji: hasKanji
  }
}

// Dynamic text component props generator
export function getResponsiveTextProps(text, options = {}) {
  const {
    containerWidth = 200,
    type = 'name', // name, title, japanese, label
    breakpoints = {
      xs: 320,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  } = options

  const configs = {
    name: {
      xs: { maxSize: 12, minSize: 10 },
      sm: { maxSize: 14, minSize: 11 },
      md: { maxSize: 16, minSize: 12 },
      lg: { maxSize: 18, minSize: 14 },
      xl: { maxSize: 20, minSize: 14 }
    },
    title: {
      xs: { maxSize: 18, minSize: 14 },
      sm: { maxSize: 22, minSize: 16 },
      md: { maxSize: 28, minSize: 18 },
      lg: { maxSize: 36, minSize: 22 },
      xl: { maxSize: 48, minSize: 28 }
    },
    japanese: {
      xs: { maxSize: 24, minSize: 18 },
      sm: { maxSize: 32, minSize: 22 },
      md: { maxSize: 40, minSize: 28 },
      lg: { maxSize: 48, minSize: 32 },
      xl: { maxSize: 64, minSize: 40 }
    },
    label: {
      xs: { maxSize: 11, minSize: 9 },
      sm: { maxSize: 12, minSize: 10 },
      md: { maxSize: 13, minSize: 11 },
      lg: { maxSize: 14, minSize: 12 },
      xl: { maxSize: 15, minSize: 12 }
    }
  }

  const config = configs[type] || configs.name

  // Generate CSS custom properties for each breakpoint
  const cssVars = {}
  Object.entries(breakpoints).forEach(([bp, width]) => {
    const { maxSize, minSize } = config[bp]
    const fontSize = calculateFitFontSize(text, containerWidth, { maxSize, minSize })
    cssVars[`--text-size-${bp}`] = `${fontSize}px`
  })

  return {
    cssVars,
    defaultSize: config.md.maxSize
  }
}

// Truncation prevention - smart ellipsis
export function smartTruncate(text, maxChars, options = {}) {
  const {
    ellipsis = '...',
    preserveWords = true,
    minDisplay = 5
  } = options

  if (text.length <= maxChars) {
    return { text, truncated: false }
  }

  if (!preserveWords) {
    return {
      text: text.slice(0, maxChars - ellipsis.length) + ellipsis,
      truncated: true
    }
  }

  // Find last space before maxChars
  const truncatePoint = maxChars - ellipsis.length
  const lastSpace = text.lastIndexOf(' ', truncatePoint)

  if (lastSpace > minDisplay) {
    return {
      text: text.slice(0, lastSpace) + ellipsis,
      truncated: true
    }
  }

  return {
    text: text.slice(0, truncatePoint) + ellipsis,
    truncated: true
  }
}

// Get line height based on golden ratio
export function getGoldenLineHeight(fontSize) {
  // Line height should be font size * PHI for optimal readability
  // But we cap it for larger fonts
  if (fontSize <= 14) return fontSize * 1.6
  if (fontSize <= 18) return fontSize * 1.5
  if (fontSize <= 24) return fontSize * 1.4
  return fontSize * 1.3
}

// Typography CSS generator
export function generateTypographyCSS(baseFontSize = 16) {
  const scales = {}
  let current = baseFontSize

  // Generate scale going up
  scales.base = current
  scales.lg = Math.round(current * PHI * 0.7) // ~18
  scales.xl = Math.round(scales.lg * PHI * 0.7) // ~22
  scales['2xl'] = Math.round(scales.xl * PHI * 0.7) // ~28
  scales['3xl'] = Math.round(scales['2xl'] * PHI * 0.7) // ~36
  scales['4xl'] = Math.round(scales['3xl'] * PHI * 0.7) // ~48
  scales['5xl'] = Math.round(scales['4xl'] * PHI * 0.7) // ~64

  // Generate scale going down
  scales.sm = Math.round(current / PHI * 1.3) // ~12
  scales.xs = Math.round(scales.sm / PHI * 1.3) // ~11
  scales['2xs'] = Math.round(scales.xs / PHI * 1.3) // ~10

  return scales
}

// Check if text will overflow container
export function willTextOverflow(text, containerWidth, fontSize, options = {}) {
  const { fontFamily = 'system-ui', padding = 0 } = options

  // Create temporary span to measure
  if (typeof document !== 'undefined') {
    const span = document.createElement('span')
    span.style.cssText = `
      position: absolute;
      visibility: hidden;
      white-space: nowrap;
      font-family: ${fontFamily};
      font-size: ${fontSize}px;
    `
    span.textContent = text
    document.body.appendChild(span)
    const textWidth = span.offsetWidth
    document.body.removeChild(span)

    return textWidth > (containerWidth - padding * 2)
  }

  // Fallback estimation for SSR
  const estimatedWidth = text.length * fontSize * 0.55
  return estimatedWidth > (containerWidth - padding * 2)
}

// Auto-sizing hook helper
export function useAutoFontSize(text, containerRef, options = {}) {
  const {
    minSize = 10,
    maxSize = 24,
    step = 1
  } = options

  // This would be used with useEffect in React
  // Returns function to calculate optimal size
  return () => {
    if (!containerRef?.current) return maxSize

    const containerWidth = containerRef.current.offsetWidth

    for (let size = maxSize; size >= minSize; size -= step) {
      if (!willTextOverflow(text, containerWidth, size)) {
        return size
      }
    }

    return minSize
  }
}

export default {
  goldenScale,
  calculateFitFontSize,
  fitVietnameseName,
  fitJapaneseText,
  getResponsiveTextProps,
  smartTruncate,
  getGoldenLineHeight,
  generateTypographyCSS,
  willTextOverflow,
  useAutoFontSize,
  PHI
}
