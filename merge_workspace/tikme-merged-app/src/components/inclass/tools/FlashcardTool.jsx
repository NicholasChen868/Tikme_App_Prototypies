import { useState, useEffect } from 'react'
import { flashcardDecks } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './FlashcardTool.css'

function FlashcardTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [masteredCards, setMasteredCards] = useState([])

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const currentDeck = selectedDeck ? flashcardDecks.find(d => d.id === selectedDeck) : null
  const currentCard = currentDeck?.cards[currentCardIndex]

  const handleSelectDeck = (deckId) => {
    setSelectedDeck(deckId)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setShowHint(false)
    setMasteredCards([])
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    setShowHint(false)
  }

  const handleNext = () => {
    if (currentCardIndex < currentDeck.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setIsFlipped(false)
      setShowHint(false)
    }
  }

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1)
      setIsFlipped(false)
      setShowHint(false)
    }
  }

  const handleMastered = () => {
    if (currentCard && !masteredCards.includes(currentCard.id)) {
      setMasteredCards(prev => [...prev, currentCard.id])
    }
    handleNext()
  }

  const handleShuffle = () => {
    // Just reset to random position for demo
    const randomIndex = Math.floor(Math.random() * currentDeck.cards.length)
    setCurrentCardIndex(randomIndex)
    setIsFlipped(false)
    setShowHint(false)
  }

  const handleBackToDeck = () => {
    setSelectedDeck(null)
    setCurrentCardIndex(0)
    setIsFlipped(false)
    setMasteredCards([])
  }

  // Loading state
  if (isLoading) {
    return <ToolLoader toolName="Thẻ học" />
  }

  // Deck Selection View
  if (!selectedDeck) {
    return (
      <div className="flashcard-tool">
        <div className="deck-selection">
          <h2>📇 Chọn bộ thẻ</h2>
          <div className="decks-grid">
            {flashcardDecks.map(deck => (
              <div
                key={deck.id}
                className="deck-card"
                onClick={() => handleSelectDeck(deck.id)}
              >
                <div className="deck-icon">📚</div>
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} thẻ</p>
                <button className="select-btn">Chọn</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Flashcard View
  return (
    <div className="flashcard-tool">
      {/* Header */}
      <div className="flashcard-header">
        <button className="back-btn" onClick={handleBackToDeck}>
          ← Quay lại
        </button>
        <div className="deck-info">
          <h3>{currentDeck.name}</h3>
          <span className="progress-text">
            {currentCardIndex + 1} / {currentDeck.cards.length}
          </span>
        </div>
        <div className="mastered-count">
          ✅ {masteredCards.length} đã thuộc
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flashcard-progress">
        <div
          className="progress-fill"
          style={{ width: `${((currentCardIndex + 1) / currentDeck.cards.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="card-container" onClick={handleFlip}>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          <div className="card-front">
            <span className="card-label">Mặt trước</span>
            <div className="card-content">
              <span className="japanese-text">{currentCard?.front}</span>
            </div>
            <span className="flip-hint">Nhấn để lật thẻ</span>
          </div>
          <div className="card-back">
            <span className="card-label">Mặt sau</span>
            <div className="card-content">
              <span className="answer-text">{currentCard?.back}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hint */}
      {!isFlipped && (
        <div className="hint-section">
          {showHint ? (
            <div className="hint-display">
              💡 {currentCard?.hint}
            </div>
          ) : (
            <button className="hint-btn" onClick={(e) => { e.stopPropagation(); setShowHint(true); }}>
              💡 Xem gợi ý
            </button>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flashcard-controls">
        <button
          className="nav-btn prev"
          onClick={handlePrev}
          disabled={currentCardIndex === 0}
        >
          ← Trước
        </button>

        <button className="action-btn shuffle" onClick={handleShuffle}>
          🔀 Xáo trộn
        </button>

        <button
          className={`action-btn mastered ${masteredCards.includes(currentCard?.id) ? 'done' : ''}`}
          onClick={handleMastered}
        >
          {masteredCards.includes(currentCard?.id) ? '✅ Đã thuộc' : '✓ Thuộc rồi'}
        </button>

        <button
          className="nav-btn next"
          onClick={handleNext}
          disabled={currentCardIndex === currentDeck.cards.length - 1}
        >
          Sau →
        </button>
      </div>

      {/* Card Dots */}
      <div className="card-dots">
        {currentDeck.cards.map((card, index) => (
          <button
            key={card.id}
            className={`dot ${index === currentCardIndex ? 'active' : ''} ${masteredCards.includes(card.id) ? 'mastered' : ''}`}
            onClick={() => { setCurrentCardIndex(index); setIsFlipped(false); setShowHint(false); }}
          />
        ))}
      </div>
    </div>
  )
}

export default FlashcardTool
