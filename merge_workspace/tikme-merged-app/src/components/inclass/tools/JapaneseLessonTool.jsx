import { useState, useEffect } from 'react'
import { ToolLoader } from '@/components/common/LoadingStates'
import { japaneseVocabulary, grammarPatterns, exampleSentences } from '@/utils/japaneseData'
import './JapaneseLessonTool.css'

function JapaneseLessonTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('vocabulary') // vocabulary, grammar, examples
  const [selectedItem, setSelectedItem] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300)
    return () => clearTimeout(timer)
  }, [])

  // Text-to-Speech function
  const playPronunciation = (text, lang = 'ja-JP') => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = 0.75 // Slower for learning
      utterance.pitch = 1.0

      window.speechSynthesis.speak(utterance)
    } else {
      alert('Trình duyệt của bạn không hỗ trợ phát âm tự động.')
    }
  }

  // Filter vocabulary
  const filteredVocabulary = japaneseVocabulary.filter(word => {
    const matchesFilter = filter === 'all' || word.category === filter
    const matchesSearch = searchQuery === '' ||
      word.kanji.includes(searchQuery) ||
      word.hiragana.includes(searchQuery) ||
      word.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.vietnamese.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Get unique categories for vocabulary
  const vocabularyCategories = [
    { id: 'all', name: 'Tất cả', count: japaneseVocabulary.length },
    { id: 'daily', name: 'Hàng ngày', count: japaneseVocabulary.filter(w => w.category === 'daily').length },
    { id: 'adjective', name: 'Tính từ', count: japaneseVocabulary.filter(w => w.category === 'adjective').length },
    { id: 'place', name: 'Địa điểm', count: japaneseVocabulary.filter(w => w.category === 'place').length },
    { id: 'object', name: 'Đồ vật', count: japaneseVocabulary.filter(w => w.category === 'object').length },
    { id: 'time', name: 'Thời gian', count: japaneseVocabulary.filter(w => w.category === 'time').length },
    { id: 'family', name: 'Gia đình', count: japaneseVocabulary.filter(w => w.category === 'family').length }
  ]

  if (isLoading) {
    return <ToolLoader toolName="Bài học Tiếng Nhật" />
  }

  return (
    <div className="japanese-lesson-tool">
      {/* Header Stats */}
      <div className="lesson-header">
        <div className="header-stats">
          <div className="stat-badge">
            <span className="stat-icon">📚</span>
            <span className="stat-value">{japaneseVocabulary.length}</span>
            <span className="stat-label">Từ vựng</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">📝</span>
            <span className="stat-value">{grammarPatterns.length}</span>
            <span className="stat-label">Ngữ pháp</span>
          </div>
          <div className="stat-badge">
            <span className="stat-icon">💬</span>
            <span className="stat-value">{exampleSentences.length}</span>
            <span className="stat-label">Câu mẫu</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="lesson-tabs">
        <button
          className={`lesson-tab ${activeTab === 'vocabulary' ? 'active' : ''}`}
          onClick={() => setActiveTab('vocabulary')}
        >
          <span className="tab-icon">📚</span>
          <span>Từ vựng</span>
        </button>
        <button
          className={`lesson-tab ${activeTab === 'grammar' ? 'active' : ''}`}
          onClick={() => setActiveTab('grammar')}
        >
          <span className="tab-icon">📝</span>
          <span>Ngữ pháp</span>
        </button>
        <button
          className={`lesson-tab ${activeTab === 'examples' ? 'active' : ''}`}
          onClick={() => setActiveTab('examples')}
        >
          <span className="tab-icon">💬</span>
          <span>Câu mẫu</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="lesson-content">
        {/* VOCABULARY TAB */}
        {activeTab === 'vocabulary' && (
          <div className="vocabulary-tab">
            {/* Search and Filter */}
            <div className="vocab-controls">
              <input
                type="text"
                className="vocab-search"
                placeholder="Tìm kiếm từ vựng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="category-filters">
                {vocabularyCategories.map(cat => (
                  <button
                    key={cat.id}
                    className={`category-btn ${filter === cat.id ? 'active' : ''}`}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Vocabulary Grid */}
            <div className="vocabulary-grid">
              {filteredVocabulary.map(word => (
                <div key={word.id} className="vocab-card">
                  <div className="vocab-japanese" onClick={() => playPronunciation(word.kanji)}>
                    <div className="vocab-kanji">{word.kanji}</div>
                    <div className="vocab-hiragana">{word.hiragana}</div>
                  </div>
                  <div className="vocab-meta">
                    <div className="vocab-romaji">{word.romaji}</div>
                    <div className="vocab-vietnamese">{word.vietnamese}</div>
                    <div className="vocab-type">{word.type}</div>
                  </div>
                  <button
                    className="vocab-audio-btn"
                    onClick={() => playPronunciation(word.kanji)}
                    title="Nghe phát âm"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>

            {filteredVocabulary.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">🔍</span>
                <p>Không tìm thấy từ vựng nào</p>
              </div>
            )}
          </div>
        )}

        {/* GRAMMAR TAB */}
        {activeTab === 'grammar' && (
          <div className="grammar-tab">
            <div className="grammar-list">
              {grammarPatterns.map(pattern => (
                <div key={pattern.id} className="grammar-card">
                  <div className="grammar-header">
                    <div className="grammar-pattern-title">
                      <span className="grammar-pattern-jp" onClick={() => playPronunciation(pattern.pattern)}>
                        {pattern.pattern}
                      </span>
                      <button
                        className="pattern-audio-btn"
                        onClick={() => playPronunciation(pattern.pattern)}
                      >
                        🔊
                      </button>
                    </div>
                    <span className="grammar-level">{pattern.level}</span>
                  </div>
                  <h4 className="grammar-name">{pattern.name}</h4>
                  <p className="grammar-meaning">{pattern.meaning}</p>

                  {/* Formation */}
                  <div className="grammar-formation">
                    <h5>Cách tạo:</h5>
                    <ul>
                      {pattern.formation.map((rule, idx) => (
                        <li key={idx}>{rule}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div className="grammar-examples">
                    <h5>Ví dụ:</h5>
                    {pattern.examples.map((ex, idx) => (
                      <div key={idx} className="example-item">
                        <div className="example-japanese" onClick={() => playPronunciation(ex.japanese)}>
                          {ex.japanese}
                          <button
                            className="example-audio-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              playPronunciation(ex.japanese)
                            }}
                          >
                            🔊
                          </button>
                        </div>
                        <div className="example-romaji">{ex.romaji}</div>
                        <div className="example-vietnamese">{ex.vietnamese}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXAMPLES TAB */}
        {activeTab === 'examples' && (
          <div className="examples-tab">
            <div className="examples-grid">
              {exampleSentences.map(sentence => (
                <div key={sentence.id} className="example-card">
                  <div className="example-number">#{sentence.id}</div>
                  <div className="example-japanese-main" onClick={() => playPronunciation(sentence.jp)}>
                    {sentence.jp}
                  </div>
                  <div className="example-romaji-main">{sentence.romaji}</div>
                  <div className="example-vietnamese-main">{sentence.vn}</div>
                  <div className="example-footer">
                    <span className="example-category">{sentence.category}</span>
                    <button
                      className="example-play-btn"
                      onClick={() => playPronunciation(sentence.jp)}
                    >
                      🔊 Nghe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JapaneseLessonTool
