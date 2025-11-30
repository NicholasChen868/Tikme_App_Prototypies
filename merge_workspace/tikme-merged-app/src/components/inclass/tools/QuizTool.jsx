import { useState, useEffect, useCallback } from 'react'
import { quizQuestions } from '@/utils/inclassData'
import { ToolLoader } from '@/components/common/LoadingStates'
import './QuizTool.css'

function QuizTool() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [textAnswer, setTextAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [quizMode, setQuizMode] = useState('teacher') // teacher | student
  // Phase 4B: Timer per question
  const TIME_PER_QUESTION = 30 // seconds
  const [timeRemaining, setTimeRemaining] = useState(TIME_PER_QUESTION)

  // Initialize loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

  // Timer color logic
  const getTimerColor = () => {
    if (timeRemaining > 15) return '#10B981' // green
    if (timeRemaining > 5) return '#F59E0B'  // orange
    return '#EF4444' // red
  }

  const getTimerClass = () => {
    if (timeRemaining <= 5) return 'timer-warning'
    if (timeRemaining <= 15) return 'timer-caution'
    return ''
  }

  const handleAnswerSelect = (index) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  // Handle submit - wrapped in useCallback for timer dependency
  const handleSubmit = useCallback(() => {
    if (currentQuestion.type === 'multiple') {
      const correct = selectedAnswer === currentQuestion.correct
      setScore(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1
      }))
    } else {
      const correct = textAnswer.trim() === currentQuestion.answer
      setScore(prev => ({
        correct: prev.correct + (correct ? 1 : 0),
        total: prev.total + 1
      }))
    }
    setShowResult(true)
  }, [currentQuestion, selectedAnswer, textAnswer])

  // Reset timer when question changes
  useEffect(() => {
    setTimeRemaining(TIME_PER_QUESTION)
  }, [currentQuestionIndex])

  // Timer countdown
  useEffect(() => {
    // Don't run if result is showing or time is 0
    if (showResult || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showResult, handleSubmit, timeRemaining])

  const handleNext = () => {
    if (isLastQuestion) {
      // Show final score
      return
    }
    setCurrentQuestionIndex(prev => prev + 1)
    setSelectedAnswer(null)
    setTextAnswer('')
    setShowResult(false)
    // Timer will reset via the effect above
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setTextAnswer('')
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
    setTimeRemaining(TIME_PER_QUESTION)
  }

  const isCorrect = currentQuestion.type === 'multiple'
    ? selectedAnswer === currentQuestion.correct
    : textAnswer.trim() === currentQuestion.answer

  // Final results view
  if (showResult && isLastQuestion) {
    const percentage = Math.round((score.correct / score.total) * 100)
    return (
      <div className="quiz-tool">
        <div className="quiz-results">
          <div className="results-icon">
            {percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '💪'}
          </div>
          <h2>Kết quả Quiz</h2>
          <div className="results-score">
            <span className="score-value">{score.correct}</span>
            <span className="score-separator">/</span>
            <span className="score-total">{score.total}</span>
          </div>
          <div className="results-percentage" style={{
            color: percentage >= 80 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'
          }}>
            {percentage}%
          </div>
          <p className="results-message">
            {percentage >= 80 ? 'Xuất sắc! Bạn nắm vững bài học!' :
             percentage >= 50 ? 'Khá tốt! Cần ôn tập thêm.' :
             'Cố gắng hơn nhé! Hãy xem lại bài.'}
          </p>
          <button className="restart-btn" onClick={handleRestart}>
            🔄 Làm lại
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return <ToolLoader toolName="Quiz" />
  }

  return (
    <div className="quiz-tool">
      {/* Progress Bar */}
      <div className="quiz-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          Câu {currentQuestionIndex + 1} / {quizQuestions.length}
        </span>
      </div>

      {/* Score Display */}
      <div className="quiz-score">
        <span className="score-label">Điểm:</span>
        <span className="score-current">{score.correct}</span>
        <span className="score-divider">/</span>
        <span className="score-total">{score.total}</span>
      </div>

      {/* Question Card */}
      <div className="question-card">
        <div className="question-type-badge">
          {currentQuestion.type === 'multiple' ? '📝 Trắc nghiệm' : '✍️ Tự luận'}
        </div>

        {/* Timer Display */}
        {!showResult && (
          <div
            className={`quiz-timer ${getTimerClass()}`}
            style={{ '--timer-color': getTimerColor() }}
          >
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{timeRemaining}s</span>
          </div>
        )}

        <h2 className="question-text">{currentQuestion.question}</h2>

        {/* Multiple Choice Options */}
        {currentQuestion.type === 'multiple' && (
          <div className="options-list">
            {currentQuestion.options.map((option, index) => {
              let optionClass = 'option-item'
              if (showResult) {
                if (index === currentQuestion.correct) {
                  optionClass += ' correct'
                } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                  optionClass += ' incorrect'
                }
              } else if (index === selectedAnswer) {
                optionClass += ' selected'
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  {showResult && index === currentQuestion.correct && (
                    <span className="correct-icon">✓</span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Text Input */}
        {currentQuestion.type === 'text' && (
          <div className="text-answer-section">
            <input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Nhập câu trả lời..."
              className={`text-input ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
              disabled={showResult}
            />
            {showResult && (
              <div className="correct-answer-display">
                <span className="label">Đáp án đúng:</span>
                <span className="answer">{currentQuestion.answer}</span>
              </div>
            )}
          </div>
        )}

        {/* Result Feedback */}
        {showResult && (
          <div className={`result-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            <span className="feedback-icon">{isCorrect ? '🎉' : '💡'}</span>
            <span className="feedback-text">
              {isCorrect ? 'Chính xác!' : 'Chưa đúng rồi!'}
            </span>
            <p className="explanation">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="quiz-actions">
        {!showResult ? (
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={currentQuestion.type === 'multiple' ? selectedAnswer === null : !textAnswer.trim()}
          >
            ✅ Kiểm tra
          </button>
        ) : (
          <button className="next-btn" onClick={handleNext}>
            {isLastQuestion ? '🏁 Xem kết quả' : '➡️ Câu tiếp theo'}
          </button>
        )}
      </div>
    </div>
  )
}

export default QuizTool
