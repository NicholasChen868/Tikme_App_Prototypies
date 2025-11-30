import './JapaneseText.css'

/**
 * JapaneseText Component
 * Displays Japanese text with furigana (reading) and romaji (romanization)
 *
 * Features:
 * - Furigana: Hiragana reading above kanji (using <ruby> tag)
 * - Romaji: Latinh transliteration below
 * - Flexible display options
 *
 * Usage:
 * <JapaneseText
 *   kanji="勉強"
 *   hiragana="べんきょう"
 *   romaji="benkyou"
 *   showFurigana={true}
 *   showRomaji={true}
 * />
 */
function JapaneseText({
  kanji,
  hiragana,
  romaji,
  showFurigana = true,
  showRomaji = false,
  size = 'md', // sm, md, lg, xl
  className = '',
  ...props
}) {
  // If only hiragana provided, show it directly
  if (!kanji && hiragana) {
    return (
      <div className={`japanese-text ${size} ${className}`} {...props}>
        <span className="japanese-main">{hiragana}</span>
        {showRomaji && romaji && (
          <span className="romaji">({romaji})</span>
        )}
      </div>
    )
  }

  // If no kanji, romaji or hiragana, return null
  if (!kanji) {
    return null
  }

  return (
    <div className={`japanese-text ${size} ${className}`} {...props}>
      <div className="japanese-main">
        {showFurigana && hiragana ? (
          <ruby>
            {kanji}
            <rt className="furigana">{hiragana}</rt>
          </ruby>
        ) : (
          kanji
        )}
      </div>

      {showRomaji && romaji && (
        <div className="romaji">({romaji})</div>
      )}
    </div>
  )
}

/**
 * JapaneseWord Component
 * Simplified version for single words
 */
export function JapaneseWord({ text, className = '', ...props }) {
  if (!text) return null

  // Support both object and string format
  if (typeof text === 'string') {
    return <span className={`japanese-word ${className}`} {...props}>{text}</span>
  }

  return (
    <JapaneseText
      kanji={text.kanji}
      hiragana={text.hiragana}
      romaji={text.romaji}
      showFurigana={true}
      showRomaji={false}
      className={className}
      {...props}
    />
  )
}

/**
 * JapaneseSentence Component
 * For displaying full sentences with multiple words
 */
export function JapaneseSentence({ words = [], showRomaji = false, className = '', ...props }) {
  if (!words || words.length === 0) return null

  return (
    <div className={`japanese-sentence ${className}`} {...props}>
      {words.map((word, index) => (
        <JapaneseText
          key={index}
          kanji={word.kanji}
          hiragana={word.hiragana}
          romaji={word.romaji}
          showFurigana={true}
          showRomaji={showRomaji}
        />
      ))}
    </div>
  )
}

export default JapaneseText
