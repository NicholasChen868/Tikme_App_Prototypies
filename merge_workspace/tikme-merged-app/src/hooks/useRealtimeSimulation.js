import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Real-time simulation hooks for classroom activities
 * Simulates live student interactions without backend
 */

// ============================================
// STUDENT ACTIVITY SIMULATION
// ============================================

export function useStudentActivitySimulation(initialStudents, options = {}) {
  const {
    handRaiseFrequency = 10000, // ms between random hand raises
    statusChangeFrequency = 15000, // ms between status changes
    enabled = true
  } = options

  const [students, setStudents] = useState(initialStudents)

  useEffect(() => {
    if (!enabled) return

    // Simulate random hand raises
    const handRaiseInterval = setInterval(() => {
      setStudents(prev => {
        const activeStudents = prev.filter(s => s.status === 'active' && !s.handRaised)
        if (activeStudents.length === 0) return prev

        // 30% chance of a hand raise
        if (Math.random() > 0.3) return prev

        const randomStudent = activeStudents[Math.floor(Math.random() * activeStudents.length)]
        return prev.map(s =>
          s.id === randomStudent.id ? { ...s, handRaised: true } : s
        )
      })
    }, handRaiseFrequency)

    // Simulate status changes (active/idle)
    const statusInterval = setInterval(() => {
      setStudents(prev => {
        const student = prev[Math.floor(Math.random() * prev.length)]
        if (Math.random() > 0.2) return prev // 20% chance

        const newStatus = student.status === 'active' ? 'idle' : 'active'
        return prev.map(s =>
          s.id === student.id ? { ...s, status: newStatus } : s
        )
      })
    }, statusChangeFrequency)

    return () => {
      clearInterval(handRaiseInterval)
      clearInterval(statusInterval)
    }
  }, [enabled, handRaiseFrequency, statusChangeFrequency])

  const lowerHand = useCallback((studentId) => {
    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, handRaised: false } : s)
    )
  }, [])

  const awardStar = useCallback((studentId, amount = 1) => {
    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, stars: (s.stars || 0) + amount } : s)
    )
  }, [])

  const toggleMic = useCallback((studentId) => {
    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, mic: !s.mic } : s)
    )
  }, [])

  const toggleCamera = useCallback((studentId) => {
    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, camera: !s.camera } : s)
    )
  }, [])

  return {
    students,
    setStudents,
    lowerHand,
    awardStar,
    toggleMic,
    toggleCamera,
    handRaisedCount: students.filter(s => s.handRaised).length,
    activeCount: students.filter(s => s.status === 'active').length
  }
}

// ============================================
// POLL VOTING SIMULATION
// ============================================

export function usePollSimulation(options = {}) {
  const {
    totalVoters = 12,
    voteFrequency = 1500, // ms between votes
    enabled = true
  } = options

  const [votes, setVotes] = useState({})
  const [voterCount, setVoterCount] = useState(0)
  const [isVoting, setIsVoting] = useState(false)

  const startVoting = useCallback((optionIds) => {
    // Reset votes
    const initialVotes = {}
    optionIds.forEach(id => { initialVotes[id] = 0 })
    setVotes(initialVotes)
    setVoterCount(0)
    setIsVoting(true)
  }, [])

  const stopVoting = useCallback(() => {
    setIsVoting(false)
  }, [])

  useEffect(() => {
    if (!enabled || !isVoting) return

    const interval = setInterval(() => {
      setVoterCount(prev => {
        if (prev >= totalVoters) {
          setIsVoting(false)
          return prev
        }

        // Simulate a vote
        setVotes(prevVotes => {
          const optionIds = Object.keys(prevVotes)
          const randomOption = optionIds[Math.floor(Math.random() * optionIds.length)]
          return {
            ...prevVotes,
            [randomOption]: prevVotes[randomOption] + 1
          }
        })

        return prev + 1
      })
    }, voteFrequency)

    return () => clearInterval(interval)
  }, [enabled, isVoting, totalVoters, voteFrequency])

  return {
    votes,
    voterCount,
    isVoting,
    startVoting,
    stopVoting,
    totalVoters,
    progress: (voterCount / totalVoters) * 100
  }
}

// ============================================
// QUIZ ANSWER SIMULATION
// ============================================

export function useQuizSimulation(options = {}) {
  const {
    totalParticipants = 12,
    answerFrequency = 2000,
    correctRate = 0.7, // 70% correct answers
    enabled = true
  } = options

  const [answers, setAnswers] = useState([])
  const [isQuizActive, setIsQuizActive] = useState(false)
  const correctAnswer = useRef(null)

  const startQuiz = useCallback((correct) => {
    correctAnswer.current = correct
    setAnswers([])
    setIsQuizActive(true)
  }, [])

  const endQuiz = useCallback(() => {
    setIsQuizActive(false)
  }, [])

  useEffect(() => {
    if (!enabled || !isQuizActive) return

    const interval = setInterval(() => {
      setAnswers(prev => {
        if (prev.length >= totalParticipants) {
          setIsQuizActive(false)
          return prev
        }

        // Simulate an answer
        const isCorrect = Math.random() < correctRate
        const answerIndex = isCorrect
          ? correctAnswer.current
          : Math.floor(Math.random() * 4)

        return [...prev, {
          studentId: prev.length + 1,
          answer: answerIndex,
          isCorrect: answerIndex === correctAnswer.current,
          time: Date.now()
        }]
      })
    }, answerFrequency)

    return () => clearInterval(interval)
  }, [enabled, isQuizActive, totalParticipants, answerFrequency, correctRate])

  const correctCount = answers.filter(a => a.isCorrect).length
  const incorrectCount = answers.length - correctCount

  return {
    answers,
    isQuizActive,
    startQuiz,
    endQuiz,
    totalParticipants,
    answeredCount: answers.length,
    correctCount,
    incorrectCount,
    accuracy: answers.length > 0 ? (correctCount / answers.length) * 100 : 0
  }
}

// ============================================
// TIMER SIMULATION
// ============================================

export function useTimerSimulation(initialSeconds = 60) {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('countdown') // countdown or stopwatch

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (mode === 'countdown') {
          if (prev <= 0) {
            setIsRunning(false)
            return 0
          }
          return prev - 1
        } else {
          return prev + 1
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, mode])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback((seconds = initialSeconds) => {
    setTimeRemaining(seconds)
    setIsRunning(false)
  }, [initialSeconds])
  const setTime = useCallback((seconds) => setTimeRemaining(seconds), [])
  const toggleMode = useCallback(() => {
    setMode(prev => prev === 'countdown' ? 'stopwatch' : 'countdown')
    setTimeRemaining(0)
    setIsRunning(false)
  }, [])

  const isWarning = mode === 'countdown' && timeRemaining <= 60 && timeRemaining > 10
  const isCritical = mode === 'countdown' && timeRemaining <= 10

  return {
    timeRemaining,
    isRunning,
    mode,
    start,
    pause,
    reset,
    setTime,
    toggleMode,
    isWarning,
    isCritical,
    formatted: formatTime(timeRemaining)
  }
}

// ============================================
// CONNECTION SIMULATION
// ============================================

export function useConnectionSimulation(options = {}) {
  const {
    disconnectChance = 0.05, // 5% chance of disconnect
    checkInterval = 30000, // Check every 30s
    enabled = true
  } = options

  const [connectionStatus, setConnectionStatus] = useState('connected')
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!enabled) return

    const interval = setInterval(() => {
      if (connectionStatus === 'connected' && Math.random() < disconnectChance) {
        setConnectionStatus('reconnecting')
        setEvents(prev => [...prev, {
          type: 'disconnect',
          time: Date.now(),
          message: 'Connection lost, reconnecting...'
        }])

        // Auto-reconnect after 2-5 seconds
        setTimeout(() => {
          setConnectionStatus('connected')
          setEvents(prev => [...prev, {
            type: 'reconnect',
            time: Date.now(),
            message: 'Connection restored'
          }])
        }, 2000 + Math.random() * 3000)
      }
    }, checkInterval)

    return () => clearInterval(interval)
  }, [enabled, connectionStatus, disconnectChance, checkInterval])

  const simulateJoin = useCallback((studentName) => {
    setEvents(prev => [...prev, {
      type: 'join',
      time: Date.now(),
      message: `${studentName} joined the class`
    }])
  }, [])

  const simulateLeave = useCallback((studentName) => {
    setEvents(prev => [...prev, {
      type: 'leave',
      time: Date.now(),
      message: `${studentName} left the class`
    }])
  }, [])

  return {
    connectionStatus,
    events,
    simulateJoin,
    simulateLeave,
    isConnected: connectionStatus === 'connected'
  }
}

// ============================================
// NOTIFICATION SIMULATION
// ============================================

export function useNotificationSimulation() {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { ...notification, id }])

    // Auto-remove after duration
    const duration = notification.duration || 5000
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, duration)

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const success = useCallback((message, options = {}) => {
    return addNotification({ type: 'success', message, ...options })
  }, [addNotification])

  const error = useCallback((message, options = {}) => {
    return addNotification({ type: 'error', message, ...options })
  }, [addNotification])

  const info = useCallback((message, options = {}) => {
    return addNotification({ type: 'info', message, ...options })
  }, [addNotification])

  const warning = useCallback((message, options = {}) => {
    return addNotification({ type: 'warning', message, ...options })
  }, [addNotification])

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
    warning
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// Export all hooks
export default {
  useStudentActivitySimulation,
  usePollSimulation,
  useQuizSimulation,
  useTimerSimulation,
  useConnectionSimulation,
  useNotificationSimulation
}
