import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/grammar-n5-wa.css';

export default function GrammarN5WA() {
        const navigate = useNavigate();

        // ==================== TEXT-TO-SPEECH ENGINE ====================
        const SpeechEngine = {
            speak: (text, lang = 'ja-JP', rate = 0.85) => {
                return new Promise((resolve, reject) => {
                    if (!('speechSynthesis' in window)) {
                        console.warn('Speech synthesis not supported');
                        resolve();
                        return;
                    }
                    
                    window.speechSynthesis.cancel();
                    
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.lang = lang;
                    utterance.rate = rate;
                    utterance.pitch = 1;
                    utterance.volume = 1;
                    
                    const voices = window.speechSynthesis.getVoices();
                    const japaneseVoice = voices.find(v => v.lang.includes('ja')) || 
                                         voices.find(v => v.lang.includes('JP'));
                    if (japaneseVoice) {
                        utterance.voice = japaneseVoice;
                    }
                    
                    utterance.onend = () => resolve();
                    utterance.onerror = (e) => {
                        console.warn('Speech error:', e);
                        resolve();
                    };
                    
                    window.speechSynthesis.speak(utterance);
                });
            },
            
            stop: () => {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                }
            }
        };

        // ==================== AI PRONUNCIATION EVALUATOR ====================
        const PronunciationAI = {
            evaluate: (targetText) => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const baseScore = 70 + Math.random() * 25;
                        const score = Math.round(baseScore);
                        const feedback = score >= 90 ? 'Xuất sắc! Phát âm rất chuẩn!' :
                                        score >= 80 ? 'Tốt lắm! Tiếp tục phát huy!' :
                                        score >= 70 ? 'Khá tốt! Cần luyện thêm một chút.' :
                                        'Cố gắng thêm! Nghe và lặp lại nhiều hơn nhé.';
                        resolve({ score, feedback, passed: score >= 70 });
                    }, 1500);
                });
            }
        };

        // ==================== ICONS ====================
        const Icons = {
            Star: () => <span style={{fontSize: '1.2em'}}>⭐</span>,
            Fire: () => <span style={{fontSize: '1.2em'}}>🔥</span>,
            Check: () => <span style={{fontSize: '1.2em'}}>✅</span>,
            Cross: () => <span style={{fontSize: '1.2em'}}>❌</span>,
            Bulb: () => <span style={{fontSize: '1.2em'}}>💡</span>,
            Book: () => <span style={{fontSize: '1.2em'}}>📖</span>,
            Mic: () => <span style={{fontSize: '1.2em'}}>🎤</span>,
            Speaker: () => <span style={{fontSize: '1.2em'}}>🔊</span>,
            Brain: () => <span style={{fontSize: '1.2em'}}>🧠</span>,
            Trophy: () => <span style={{fontSize: '1.2em'}}>🏆</span>,
            Rocket: () => <span style={{fontSize: '1.2em'}}>🚀</span>,
            Heart: () => <span style={{fontSize: '1.2em'}}>💖</span>,
            Sad: () => <span style={{fontSize: '1.2em'}}>😢</span>,
            Happy: () => <span style={{fontSize: '1.2em'}}>😊</span>,
            Target: () => <span style={{fontSize: '1.2em'}}>🎯</span>,
            Lightning: () => <span style={{fontSize: '1.2em'}}>⚡</span>,
            Pencil: () => <span style={{fontSize: '1.2em'}}>✏️</span>,
            Medal: () => <span style={{fontSize: '1.2em'}}>🏅</span>,
            Sparkle: () => <span style={{fontSize: '1.2em'}}>✨</span>,
            Warning: () => <span style={{fontSize: '1.2em'}}>⚠️</span>,
            Info: () => <span style={{fontSize: '1.2em'}}>ℹ️</span>,
            ArrowRight: () => <span style={{fontSize: '1em'}}>→</span>,
            Play: () => <span style={{fontSize: '1.2em'}}>▶️</span>,
            Headphone: () => <span style={{fontSize: '1.2em'}}>🎧</span>,
            Repeat: () => <span style={{fontSize: '1.2em'}}>🔁</span>,
            ThumbsUp: () => <span style={{fontSize: '1.2em'}}>👍</span>,
            Clap: () => <span style={{fontSize: '1.2em'}}>👏</span>,
            Gem: () => <span style={{fontSize: '1.2em'}}>💎</span>,
            Crown: () => <span style={{fontSize: '1.2em'}}>👑</span>,
            Key: () => <span style={{fontSize: '1.2em'}}>🔑</span>,
            Lock: () => <span style={{fontSize: '1.2em'}}>🔒</span>,
            Unlock: () => <span style={{fontSize: '1.2em'}}>🔓</span>,
            Muscle: () => <span style={{fontSize: '1.2em'}}>💪</span>,
            World: () => <span style={{fontSize: '1.2em'}}>🌍</span>,
            Graduate: () => <span style={{fontSize: '1.2em'}}>🎓</span>,
            Person: () => <span style={{fontSize: '1.2em'}}>👤</span>,
            School: () => <span style={{fontSize: '1.2em'}}>🏫</span>,
            Japan: () => <span style={{fontSize: '1.2em'}}>🗾</span>,
            Wave: () => <span style={{fontSize: '1.2em'}}>👋</span>,
        };

        // ==================== COLORS ====================
        const colors = {
            orange: {
                50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74',
                400: '#FB923C', 500: '#F97316', 600: '#EA580C', 700: '#C2410C',
                800: '#9A3412', 900: '#7C2D12',
            },
            red: {
                50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5',
                400: '#F87171', 500: '#EF4444', 600: '#DC2626', 700: '#B91C1C',
                800: '#991B1B', 900: '#7F1D1D',
            },
            green: {
                50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 300: '#86EFAC',
                400: '#4ADE80', 500: '#22C55E', 600: '#16A34A', 700: '#15803D',
                800: '#166534', 900: '#14532D',
            },
            slate: {
                50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
                400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
                800: '#1E293B', 900: '#0F172A',
            },
            amber: {
                50: '#FFFBEB', 100: '#FEF3C7', 200: '#FDE68A', 300: '#FCD34D',
                400: '#FBBF24', 500: '#F59E0B', 600: '#D97706',
            },
            purple: {
                50: '#FAF5FF', 100: '#F3E8FF', 400: '#C084FC', 500: '#A855F7', 600: '#9333EA',
            },
            blue: {
                50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD',
                400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8',
            }
        };

        // ==================== SPEAKER BUTTON COMPONENT ====================
        function SpeakerButton({ text, size = 'medium', label = '', showLabel = true, onPlay }) {
            const [isPlaying, setIsPlaying] = useState(false);
            
            const sizes = {
                small: { button: 36, icon: 18 },
                medium: { button: 48, icon: 24 },
                large: { button: 60, icon: 32 },
            };
            
            const handleSpeak = async () => {
                if (isPlaying) {
                    SpeechEngine.stop();
                    setIsPlaying(false);
                    return;
                }
                
                setIsPlaying(true);
                if (onPlay) onPlay();
                await SpeechEngine.speak(text);
                setIsPlaying(false);
            };
            
            return (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={handleSpeak}
                        className={`speaker-btn ${isPlaying ? 'speaker-active' : ''}`}
                        style={{
                            width: sizes[size].button,
                            height: sizes[size].button,
                            borderRadius: '50%',
                            border: 'none',
                            background: isPlaying 
                                ? `linear-gradient(135deg, ${colors.orange[500]}, ${colors.red[500]})`
                                : `linear-gradient(135deg, ${colors.orange[400]}, ${colors.orange[600]})`,
                            color: 'white',
                            fontSize: sizes[size].icon,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: isPlaying 
                                ? `0 0 20px ${colors.orange[400]}` 
                                : `0 4px 15px ${colors.orange[300]}`,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {isPlaying ? '⏸️' : '🔊'}
                    </button>
                    {showLabel && label && (
                        <span style={{ 
                            fontSize: '14px', 
                            color: colors.slate[600],
                            fontWeight: '500'
                        }}>
                            {label}
                        </span>
                    )}
                </div>
            );
        }

        // ==================== MIC BUTTON WITH AI EVALUATION ====================
        function MicButton({ targetText, onEvaluationComplete, size = 'medium', disabled = false }) {
            const [isRecording, setIsRecording] = useState(false);
            const [isEvaluating, setIsEvaluating] = useState(false);
            const [result, setResult] = useState(null);
            
            const sizes = {
                small: { button: 36, icon: 18 },
                medium: { button: 48, icon: 24 },
                large: { button: 60, icon: 32 },
            };
            
            const handleRecord = async () => {
                if (disabled) return;
                
                if (isRecording) {
                    setIsRecording(false);
                    setIsEvaluating(true);
                    
                    const evaluation = await PronunciationAI.evaluate(targetText);
                    setResult(evaluation);
                    setIsEvaluating(false);
                    
                    if (onEvaluationComplete) {
                        onEvaluationComplete(evaluation);
                    }
                } else {
                    setResult(null);
                    setIsRecording(true);
                    
                    setTimeout(() => {
                        setIsRecording(false);
                        setIsEvaluating(true);
                        PronunciationAI.evaluate(targetText).then(evaluation => {
                            setResult(evaluation);
                            setIsEvaluating(false);
                            if (onEvaluationComplete) {
                                onEvaluationComplete(evaluation);
                            }
                        });
                    }, 3000);
                }
            };
            
            return (
                <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <button
                        onClick={handleRecord}
                        disabled={disabled || isEvaluating}
                        className={`mic-btn ${isRecording ? 'recording' : ''}`}
                        style={{
                            width: sizes[size].button,
                            height: sizes[size].button,
                            borderRadius: '50%',
                            border: 'none',
                            background: disabled ? colors.slate[300] :
                                isRecording ? `linear-gradient(135deg, ${colors.red[500]}, ${colors.red[600]})` :
                                isEvaluating ? `linear-gradient(135deg, ${colors.amber[400]}, ${colors.amber[500]})` :
                                `linear-gradient(135deg, ${colors.blue[400]}, ${colors.blue[600]})`,
                            color: 'white',
                            fontSize: sizes[size].icon,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            boxShadow: isRecording 
                                ? `0 0 20px ${colors.red[400]}` 
                                : `0 4px 15px ${colors.blue[300]}`,
                            transition: 'all 0.3s ease',
                            opacity: disabled ? 0.5 : 1,
                        }}
                    >
                        {isEvaluating ? '⏳' : isRecording ? '⏹️' : '🎤'}
                    </button>
                    
                    {isRecording && (
                        <div style={{ 
                            display: 'flex', 
                            gap: '3px', 
                            alignItems: 'center',
                            height: '30px'
                        }}>
                            {[1,2,3,4,5].map(i => (
                                <div key={i} className="waveform-bar" style={{
                                    animationDelay: `${i * 0.1}s`
                                }} />
                            ))}
                        </div>
                    )}
                    
                    {isEvaluating && (
                        <span style={{ fontSize: '12px', color: colors.amber[600] }}>
                            AI đang đánh giá...
                        </span>
                    )}
                </div>
            );
        }

        // ==================== PRONUNCIATION PRACTICE COMPONENT (3 ATTEMPTS) ====================
        function PronunciationPractice({ sentences, onComplete, addScore }) {
            const [currentIndex, setCurrentIndex] = useState(0);
            const [attempts, setAttempts] = useState({});
            const [currentAttempt, setCurrentAttempt] = useState(0);
            const [hasListened, setHasListened] = useState(false);
            const [showResult, setShowResult] = useState(false);
            const [lastScore, setLastScore] = useState(null);
            
            const currentSentence = sentences[currentIndex];
            const maxAttempts = 3;
            const attemptKey = `${currentIndex}-${currentAttempt}`;
            
            const handleListen = () => {
                setHasListened(true);
            };
            
            const handleEvaluation = (result) => {
                setLastScore(result.score);
                setShowResult(true);
                
                const newAttempts = {
                    ...attempts,
                    [attemptKey]: result
                };
                setAttempts(newAttempts);
                
                if (result.passed) {
                    addScore(10 + Math.floor(result.score / 10));
                }
            };
            
            const handleNextAttempt = () => {
                setShowResult(false);
                setLastScore(null);
                
                if (currentAttempt < maxAttempts - 1) {
                    setCurrentAttempt(currentAttempt + 1);
                    setHasListened(false);
                } else {
                    if (currentIndex < sentences.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                        setCurrentAttempt(0);
                        setHasListened(false);
                    } else {
                        if (onComplete) onComplete();
                    }
                }
            };
            
            const handleNextSentence = () => {
                setShowResult(false);
                setLastScore(null);
                
                if (currentIndex < sentences.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                    setCurrentAttempt(0);
                    setHasListened(false);
                } else {
                    if (onComplete) onComplete();
                }
            };
            
            const isComplete = currentIndex >= sentences.length;
            
            if (isComplete) {
                return (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎉</div>
                        <h3 style={{ color: colors.green[600] }}>Hoàn thành luyện phát âm!</h3>
                    </div>
                );
            }
            
            return (
                <div>
                    {/* Progress indicator */}
                    <div style={{ 
                        display: 'flex', 
                        gap: '8px', 
                        marginBottom: '20px',
                        justifyContent: 'center'
                    }}>
                        {sentences.map((_, idx) => (
                            <div key={idx} style={{
                                width: '40px',
                                height: '6px',
                                borderRadius: '3px',
                                background: idx < currentIndex ? colors.green[500] :
                                           idx === currentIndex ? colors.orange[500] :
                                           colors.slate[200],
                                transition: 'all 0.3s ease'
                            }} />
                        ))}
                    </div>
                    
                    {/* Current sentence */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '15px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        border: `2px solid ${colors.orange[200]}`
                    }}>
                        <div style={{ 
                            fontSize: '13px', 
                            color: colors.orange[600], 
                            marginBottom: '10px',
                            fontWeight: '600'
                        }}>
                            Câu {currentIndex + 1}/{sentences.length} • Lần {currentAttempt + 1}/{maxAttempts}
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px',
                            marginBottom: '15px',
                            flexWrap: 'wrap'
                        }}>
                            <SpeakerButton 
                                text={currentSentence.jp} 
                                size="large" 
                                onPlay={handleListen}
                            />
                            <div>
                                <div className="japanese" style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: colors.slate[800]
                                }}>
                                    {currentSentence.jp}
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: colors.slate[500],
                                    marginTop: '5px'
                                }}>
                                    {currentSentence.meaning}
                                </div>
                            </div>
                        </div>
                        
                        {/* Attempt indicators */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '10px',
                            marginBottom: '15px'
                        }}>
                            {[0, 1, 2].map(i => {
                                const attemptResult = attempts[`${currentIndex}-${i}`];
                                return (
                                    <div key={i} style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        background: attemptResult 
                                            ? (attemptResult.passed ? colors.green[100] : colors.red[100])
                                            : i === currentAttempt ? colors.orange[100] : colors.slate[100],
                                        color: attemptResult
                                            ? (attemptResult.passed ? colors.green[600] : colors.red[600])
                                            : i === currentAttempt ? colors.orange[600] : colors.slate[400],
                                        border: `2px solid ${
                                            attemptResult 
                                                ? (attemptResult.passed ? colors.green[400] : colors.red[400])
                                                : i === currentAttempt ? colors.orange[400] : colors.slate[200]
                                        }`
                                    }}>
                                        {attemptResult ? (attemptResult.passed ? '✔' : '×') : i + 1}
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* Recording section */}
                        {!showResult ? (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '20px',
                                    marginBottom: '10px'
                                }}>
                                    <div>
                                        <div style={{ 
                                            fontSize: '12px', 
                                            color: colors.slate[500], 
                                            marginBottom: '5px' 
                                        }}>
                                            1. Nghe mẫu
                                        </div>
                                        <SpeakerButton 
                                            text={currentSentence.jp} 
                                            size="medium" 
                                            onPlay={handleListen}
                                        />
                                    </div>
                                    <div style={{ fontSize: '24px', color: colors.slate[300] }}>→</div>
                                    <div>
                                        <div style={{ 
                                            fontSize: '12px', 
                                            color: colors.slate[500], 
                                            marginBottom: '5px' 
                                        }}>
                                            2. Đọc theo
                                        </div>
                                        <MicButton 
                                            targetText={currentSentence.jp}
                                            onEvaluationComplete={handleEvaluation}
                                            size="medium"
                                            disabled={!hasListened}
                                        />
                                    </div>
                                </div>
                                {!hasListened && (
                                    <div style={{ 
                                        fontSize: '13px', 
                                        color: colors.amber[600],
                                        background: colors.amber[50],
                                        padding: '8px 16px',
                                        borderRadius: '8px',
                                        display: 'inline-block'
                                    }}>
                                        <Icons.Warning /> Nghe mẫu trước khi đọc nhé!
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="animate-scale" style={{ textAlign: 'center' }}>
                                <div style={{
                                    padding: '20px',
                                    borderRadius: '12px',
                                    background: lastScore >= 70 ? colors.green[50] : colors.amber[50],
                                    border: `2px solid ${lastScore >= 70 ? colors.green[300] : colors.amber[300]}`,
                                    marginBottom: '15px'
                                }}>
                                    <div style={{
                                        fontSize: '48px',
                                        fontWeight: '900',
                                        color: lastScore >= 90 ? colors.green[600] :
                                               lastScore >= 70 ? colors.green[500] :
                                               colors.amber[600]
                                    }}>
                                        {lastScore}%
                                    </div>
                                    <div style={{
                                        fontSize: '16px',
                                        color: colors.slate[600],
                                        marginTop: '5px'
                                    }}>
                                        {lastScore >= 90 ? '🌟 Xuất sắc!' :
                                         lastScore >= 80 ? '👍 Tốt lắm!' :
                                         lastScore >= 70 ? '✔ Đạt!' :
                                         '💪 Cố gắng thêm!'}
                                    </div>
                                </div>
                                
                                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {currentAttempt < maxAttempts - 1 && (
                                        <Button onClick={handleNextAttempt} variant="outline">
                                            <Icons.Repeat /> Thử lại ({maxAttempts - currentAttempt - 1} lần còn)
                                        </Button>
                                    )}
                                    <Button onClick={handleNextSentence} variant={lastScore >= 70 ? "success" : "primary"}>
                                        {currentIndex < sentences.length - 1 ? (
                                            <>Câu tiếp theo <Icons.ArrowRight /></>
                                        ) : (
                                            <>Hoàn thành <Icons.Check /></>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // ==================== SCORE POPUP ====================
        function ScorePopup({ points, show }) {
            if (!show) return null;
            
            return (
                <div 
                    className="score-pop"
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: `linear-gradient(135deg, ${colors.orange[500]}, ${colors.red[500]})`,
                        color: 'white',
                        padding: '20px 40px',
                        borderRadius: '20px',
                        fontSize: '32px',
                        fontWeight: '800',
                        zIndex: 1000,
                        boxShadow: `0 10px 50px ${colors.orange[400]}`,
                    }}
                >
                    +{points} <Icons.Star />
                </div>
            );
        }

        // ==================== MAIN APP ====================
        function App() {
            const [currentStep, setCurrentStep] = useState(0);
            const [score, setScore] = useState(0);
            const [streak, setStreak] = useState(0);
            const [showScorePopup, setShowScorePopup] = useState(false);
            const [lastPoints, setLastPoints] = useState(0);
            const [completedSteps, setCompletedSteps] = useState([]);
            const [totalQuestions, setTotalQuestions] = useState(0);

            useEffect(() => {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.getVoices();
                    window.speechSynthesis.onvoiceschanged = () => {
                        window.speechSynthesis.getVoices();
                    };
                }
            }, []);

            const steps = [
                { id: 0, title: 'Khởi động', icon: <Icons.Rocket />, color: colors.orange[500] },
                { id: 1, title: 'Ý nghĩa', icon: <Icons.Bulb />, color: colors.amber[500] },
                { id: 2, title: 'Cấu trúc', icon: <Icons.Book />, color: colors.green[500] },
                { id: 3, title: 'Luyện tập loại từ', icon: <Icons.Brain />, color: colors.purple[500] },
                { id: 4, title: 'Nghe - Nói', icon: <Icons.Headphone />, color: colors.red[500] },
                { id: 5, title: 'Thực hành', icon: <Icons.Pencil />, color: colors.orange[600] },
                { id: 6, title: 'Kiểm tra', icon: <Icons.Target />, color: colors.red[600] },
                { id: 7, title: 'Kết quả', icon: <Icons.Trophy />, color: colors.amber[500] },
            ];

            const addScore = (points) => {
                setScore(prev => prev + points);
                setLastPoints(points);
                setStreak(prev => prev + 1);
                setShowScorePopup(true);
                setTimeout(() => setShowScorePopup(false), 800);
            };

            const resetStreak = () => setStreak(0);

            const completeStep = (stepId) => {
                if (!completedSteps.includes(stepId)) {
                    setCompletedSteps([...completedSteps, stepId]);
                }
            };

            const nextStep = () => {
                completeStep(currentStep);
                setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            const prevStep = () => {
                setCurrentStep(prev => Math.max(prev - 1, 0));
                window.scrollTo({ top: 0, behavior: 'smooth' });
            };

            return (
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: '16px',
                    minHeight: '100vh',
                    paddingBottom: '100px',
                }}>
                    <ScorePopup points={lastPoints} show={showScorePopup} />
                    
                    <Header 
                        score={score} 
                        streak={streak}
                        currentStep={currentStep} 
                        steps={steps} 
                        completedSteps={completedSteps} 
                    />
                    
                    <ProgressBar current={currentStep} total={steps.length} steps={steps} />
                    
                    <div className="animate-in" key={currentStep}>
                        {currentStep === 0 && <Step0_Intro onNext={nextStep} />}
                        {currentStep === 1 && <Step1_Meaning onNext={nextStep} onPrev={prevStep} addScore={addScore} />}
                        {currentStep === 2 && <Step2_Structure onNext={nextStep} onPrev={prevStep} addScore={addScore} />}
                        {currentStep === 3 && <Step3_WordTypes onNext={nextStep} onPrev={prevStep} addScore={addScore} />}
                        {currentStep === 4 && <Step4_ListenSpeak onNext={nextStep} onPrev={prevStep} addScore={addScore} />}
                        {currentStep === 5 && <Step5_Practice onNext={nextStep} onPrev={prevStep} addScore={addScore} resetStreak={resetStreak} />}
                        {currentStep === 6 && <Step6_FinalTest onNext={nextStep} onPrev={prevStep} addScore={addScore} setTotalQuestions={setTotalQuestions} resetStreak={resetStreak} />}
                        {currentStep === 7 && <Step7_Results score={score} streak={streak} totalQuestions={totalQuestions} onRestart={() => {
                            setCurrentStep(0);
                            setScore(0);
                            setStreak(0);
                            setCompletedSteps([]);
                        }} />}
                    </div>
                </div>
            );
        }

        // ==================== HEADER ====================
        function Header({ score, streak, currentStep, steps, completedSteps }) {
            return (
                <div style={{
                    background: 'linear-gradient(135deg, ' + colors.orange[600] + ' 0%, ' + colors.red[600] + ' 50%, ' + colors.red[700] + ' 100%)',
                    borderRadius: '24px',
                    padding: '20px',
                    marginBottom: '16px',
                    color: 'white',
                    boxShadow: '0 15px 50px rgba(234, 88, 12, 0.35)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0, right: 0, bottom: 0, left: 0,
                        background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                        pointerEvents: 'none',
                    }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative' }}>
                        <div>
                            <div style={{ 
                                fontSize: '12px', 
                                opacity: 0.9, 
                                marginBottom: '4px',
                                letterSpacing: '1px',
                                fontWeight: '600'
                            }}>
                                NGỮ PHÁP N5 | TIKME PRO
                            </div>
                            <div style={{ 
                                fontSize: '32px', 
                                fontWeight: '900',
                                textShadow: '2px 2px 0 rgba(0,0,0,0.1)'
                            }} className="japanese">
                                ～は
                            </div>
                            <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '4px' }}>
                                Trợ từ chủ đề • G001
                            </div>
                        </div>
                        
                        <div style={{ textAlign: 'right' }}>
                            <div style={{
                                background: 'rgba(255,255,255,0.2)',
                                borderRadius: '16px',
                                padding: '12px 20px',
                                backdropFilter: 'blur(10px)',
                                marginBottom: '8px',
                            }}>
                                <div style={{ fontSize: '11px', opacity: 0.9, letterSpacing: '0.5px' }}>ĐIỂM SỐ</div>
                                <div style={{ fontSize: '28px', fontWeight: '800' }}>{score} <Icons.Star /></div>
                            </div>
                            {streak > 1 && (
                                <div style={{
                                    background: colors.amber[400],
                                    color: colors.slate[900],
                                    borderRadius: '20px',
                                    padding: '4px 12px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                }} className="pulse">
                                    <Icons.Fire /> {streak} streak!
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', position: 'relative' }}>
                        {steps.map((step, idx) => (
                            <div key={idx} style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '12px',
                                background: idx === currentStep 
                                    ? 'white' 
                                    : completedSteps.includes(idx) 
                                        ? 'rgba(255,255,255,0.9)' 
                                        : 'rgba(255,255,255,0.15)',
                                color: idx === currentStep || completedSteps.includes(idx) ? step.color : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                transform: idx === currentStep ? 'scale(1.15)' : 'scale(1)',
                                boxShadow: idx === currentStep ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
                            }}>
                                {completedSteps.includes(idx) ? '✔' : step.icon}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // ==================== PROGRESS BAR ====================
        function ProgressBar({ current, total, steps }) {
            const progress = ((current + 1) / total) * 100;
            return (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: colors.slate[600],
                        fontWeight: '500',
                    }}>
                        <span>Bước {current + 1}/{total}: {steps[current].title}</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div style={{
                        background: colors.slate[200],
                        borderRadius: '12px',
                        height: '10px',
                        overflow: 'hidden',
                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                    }}>
                        <div style={{
                            background: `linear-gradient(90deg, ${colors.orange[400]}, ${colors.orange[500]}, ${colors.red[500]})`,
                            height: '100%',
                            width: progress + '%',
                            transition: 'width 0.5s ease',
                            borderRadius: '12px',
                            boxShadow: '0 0 10px rgba(249, 115, 22, 0.5)',
                        }} />
                    </div>
                </div>
            );
        }

        // ==================== CARD COMPONENT ====================
        function Card({ children, style = {}, highlight = false, variant = 'default', glow = false }) {
            const variants = {
                default: { background: 'white', border: 'none' },
                orange: { background: `linear-gradient(135deg, ${colors.orange[50]}, ${colors.amber[50]})`, border: `2px solid ${colors.orange[200]}` },
                green: { background: `linear-gradient(135deg, ${colors.green[50]}, #E8F5E9)`, border: `2px solid ${colors.green[200]}` },
                red: { background: `linear-gradient(135deg, ${colors.red[50]}, #FFEBEE)`, border: `2px solid ${colors.red[200]}` },
                amber: { background: `linear-gradient(135deg, ${colors.amber[50]}, ${colors.amber[100]})`, border: `2px solid ${colors.amber[300]}` },
                purple: { background: `linear-gradient(135deg, ${colors.purple[50]}, #F3E5F5)`, border: `2px solid ${colors.purple[400]}` },
                blue: { background: `linear-gradient(135deg, ${colors.blue[50]}, #E3F2FD)`, border: `2px solid ${colors.blue[200]}` },
                gradient: { background: `linear-gradient(135deg, ${colors.orange[500]}, ${colors.red[500]})`, border: 'none' },
            };
            
            return (
                <div 
                    className={glow ? 'glow' : ''}
                    style={{
                        ...variants[variant],
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '16px',
                        boxShadow: highlight 
                            ? `0 0 0 3px ${colors.orange[400]}, 0 10px 40px rgba(249, 115, 22, 0.2)` 
                            : '0 4px 20px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        ...style,
                    }}
                >
                    {children}
                </div>
            );
        }

        // ==================== BUTTON ====================
        function Button({ children, onClick, variant = 'primary', disabled = false, fullWidth = false, size = 'medium' }) {
            const variants = {
                primary: {
                    background: `linear-gradient(135deg, ${colors.orange[500]}, ${colors.red[500]})`,
                    color: 'white',
                    boxShadow: `0 4px 15px ${colors.orange[300]}`,
                },
                secondary: {
                    background: colors.slate[100],
                    color: colors.slate[700],
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
                success: {
                    background: `linear-gradient(135deg, ${colors.green[500]}, ${colors.green[600]})`,
                    color: 'white',
                    boxShadow: `0 4px 15px ${colors.green[300]}`,
                },
                outline: {
                    background: 'white',
                    color: colors.orange[600],
                    border: `2px solid ${colors.orange[400]}`,
                    boxShadow: 'none',
                },
                ghost: {
                    background: 'transparent',
                    color: colors.slate[600],
                    boxShadow: 'none',
                },
            };
            
            const sizes = {
                small: { padding: '10px 18px', fontSize: '14px', borderRadius: '10px' },
                medium: { padding: '14px 28px', fontSize: '16px', borderRadius: '14px' },
                large: { padding: '18px 36px', fontSize: '18px', borderRadius: '16px' },
            };
            
            return (
                <button
                    onClick={onClick}
                    disabled={disabled}
                    style={{
                        ...variants[variant],
                        ...sizes[size],
                        border: variants[variant].border || 'none',
                        fontWeight: '600',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled ? 0.5 : 1,
                        width: fullWidth ? '100%' : 'auto',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseOver={(e) => {
                        if (!disabled) {
                            e.target.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    {children}
                </button>
            );
        }

        // ==================== JAPANESE TEXT WITH SPEAKER ====================
        function JapaneseText({ text, reading, meaning, size = 'large', showMeaning = true, showReading = true }) {
            const sizes = {
                small: { jp: 20, reading: 12, meaning: 14 },
                medium: { jp: 26, reading: 14, meaning: 16 },
                large: { jp: 32, reading: 14, meaning: 16 },
                xlarge: { jp: 40, reading: 16, meaning: 18 },
            };
            
            return (
                <div style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <SpeakerButton text={text} size="medium" showLabel={false} />
                        <span 
                            className="japanese" 
                            style={{ 
                                fontSize: sizes[size].jp, 
                                fontWeight: '700',
                                color: colors.slate[800],
                            }}
                        >
                            {text}
                        </span>
                    </div>
                    {showReading && reading && (
                        <div style={{ 
                            fontSize: sizes[size].reading, 
                            color: colors.slate[500],
                            marginLeft: '60px',
                            marginBottom: '4px',
                            fontStyle: 'italic',
                        }} className="japanese">
                            {reading}
                        </div>
                    )}
                    {showMeaning && meaning && (
                        <div style={{ 
                            fontSize: sizes[size].meaning,
                            color: colors.slate[600],
                            marginLeft: '60px',
                        }}>
                            → {meaning}
                        </div>
                    )}
                </div>
            );
        }

        // ==================== STEP 0: INTRO ====================
        function Step0_Intro({ onNext }) {
            const [stage, setStage] = useState(0);
            
            return (
                <div>
                    {stage === 0 && (
                        <Card variant="orange" style={{ textAlign: 'center', padding: '30px 20px' }}>
                            <div style={{ fontSize: '70px', marginBottom: '20px' }}>👋</div>
                            <h2 style={{ color: colors.orange[700], marginBottom: '20px', fontSize: '26px' }}>
                                Câu chuyện của bạn...
                            </h2>
                            <p style={{ color: colors.slate[600], lineHeight: '2', fontSize: '18px', marginBottom: '15px' }}>
                                Khi gặp người Nhật, bạn muốn giới thiệu <strong style={{color: colors.green[600], fontSize: '20px'}}>bản thân</strong>?
                            </p>
                            <p style={{ color: colors.slate[600], lineHeight: '2', fontSize: '18px' }}>
                                "<strong style={{color: colors.blue[600], fontSize: '20px'}}>Tôi là...</strong>", "<strong style={{color: colors.purple[600], fontSize: '20px'}}>Tên tôi là...</strong>", "<strong style={{color: colors.orange[600], fontSize: '20px'}}>Còn tôi thì...</strong>"
                            </p>
                            <div style={{ marginTop: '30px' }}>
                                <Button onClick={() => setStage(1)} size="large">
                                    <Icons.Sparkle /> Khám phá bí mật
                                </Button>
                            </div>
                        </Card>
                    )}
                    
                    {stage === 1 && (
                        <div className="animate-scale">
                            <Card highlight glow style={{ textAlign: 'center', padding: '30px 20px' }}>
                                <div style={{ 
                                    fontSize: '18px', 
                                    color: colors.orange[600], 
                                    marginBottom: '20px',
                                    fontWeight: '600'
                                }}>
                                    <Icons.Bulb /> Người Nhật dùng MỘT trợ từ đặc biệt để NÊU CHỦ ĐỀ!
                                </div>
                                
                                <div style={{
                                    fontSize: '48px',
                                    fontWeight: '900',
                                    color: colors.blue[700],
                                    margin: '25px 0',
                                    textShadow: `3px 3px 0 ${colors.blue[200]}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '15px',
                                    flexWrap: 'wrap'
                                }} className="japanese">
                                    <SpeakerButton text="は" size="large" showLabel={false} />
                                    ～は
                                </div>
                                
                                <div style={{
                                    fontSize: '20px',
                                    color: colors.slate[600],
                                    marginBottom: '20px'
                                }}>
                                    = "Còn ... thì ..." / "Nói về ... thì ..."
                                </div>
                                
                                <Button onClick={() => setStage(2)} size="large" variant="success">
                                    <Icons.Key /> Mở khóa bí quyết nhớ
                                </Button>
                            </Card>
                        </div>
                    )}
                    
                    {stage === 2 && (
                        <div className="animate-in">
                            <Card variant="amber" style={{ padding: '25px' }}>
                                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                    <span style={{ fontSize: '50px' }}>🧠</span>
                                </div>
                                <h3 style={{ 
                                    color: colors.slate[800], 
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    fontSize: '22px'
                                }}>
                                    <Icons.Lightning /> MẸO NHỚ SIÊU DỄ
                                </h3>
                                
                                <div style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    padding: '25px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                }}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <SpeakerButton text="私は学生です" size="large" label="Nghe phát âm" />
                                    </div>
                                    <div style={{ 
                                        fontSize: '36px', 
                                        fontWeight: '900',
                                        marginBottom: '15px'
                                    }} className="japanese">
                                        私<span style={{color: colors.red[500], fontSize: '42px'}}>は</span>学生です。
                                    </div>
                                    <div style={{ 
                                        fontSize: '24px',
                                        color: colors.slate[600],
                                        marginBottom: '15px'
                                    }}>
                                        phát âm: <strong style={{color: colors.blue[600]}}>wa-ta-shi <span style={{color: colors.red[500]}}>wa</span> ga-ku-sei de-su</strong>
                                    </div>
                                    <div style={{
                                        fontSize: '24px',
                                        color: colors.green[600],
                                        fontWeight: '800',
                                        padding: '15px',
                                        background: colors.green[50],
                                        borderRadius: '12px',
                                        border: `2px dashed ${colors.green[300]}`,
                                    }}>
                                        "は" = "WA" = "thì, còn..." 🎯
                                    </div>
                                    <div style={{
                                        marginTop: '15px',
                                        fontSize: '18px',
                                        color: colors.slate[700],
                                    }}>
                                        → <strong>Tôi</strong> thì là sinh viên. (Tôi là sinh viên)
                                    </div>
                                </div>
                            </Card>
                            
                            <div style={{ textAlign: 'center' }}>
                                <Button onClick={onNext} size="large" variant="success">
                                    <Icons.Rocket /> Bắt đầu học ngay!
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // ==================== STEP 1: MEANING ====================
        function Step1_Meaning({ onNext, onPrev, addScore }) {
            const [quizAnswer, setQuizAnswer] = useState(null);
            const [showResult, setShowResult] = useState(false);
            const [pronunciationComplete, setPronunciationComplete] = useState(false);
            
            const sentences = [
                { jp: '私は学生です。', meaning: 'Tôi là sinh viên.' },
                { jp: '田中さんは先生です。', meaning: 'Anh Tanaka là giáo viên.' },
            ];

            const checkAnswer = (answer) => {
                setQuizAnswer(answer);
                setShowResult(true);
                if (answer === 'topic') {
                    addScore(15);
                }
            };

            const canProceed = showResult && pronunciationComplete;

            return (
                <div>
                    <Card variant="orange">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ 
                                background: colors.orange[500], 
                                color: 'white', 
                                padding: '6px 14px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '700',
                                letterSpacing: '0.5px'
                            }}>
                                CHUNK 1
                            </span>
                            <h2 style={{ color: colors.orange[700], margin: 0, fontSize: '20px' }}>
                                <Icons.Bulb /> Khám phá ý nghĩa
                            </h2>
                        </div>
                    </Card>

                    {/* Main Meaning */}
                    <Card variant="blue">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${colors.blue[400]}, ${colors.blue[600]})`,
                                color: 'white',
                                width: '56px',
                                height: '56px',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                flexShrink: 0,
                                boxShadow: `0 4px 15px ${colors.blue[300]}`,
                            }}>
                                🎯
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ color: colors.blue[700], marginBottom: '10px', fontSize: '20px' }}>
                                    NÊU CHỦ ĐỀ CÂU
                                </h3>
                                <p style={{ color: colors.slate[600], marginBottom: '12px', lineHeight: '1.7' }}>
                                    <strong style={{color: colors.blue[600]}}>は</strong> là trợ từ đánh dấu <strong>chủ đề</strong> của câu - thứ bạn muốn nói về. Nó giống như nói "Còn ... thì ..." hoặc "Nói về ... thì ..."
                                </p>
                                
                                <div style={{
                                    background: 'white',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    marginBottom: '15px',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                                }}>
                                    <div style={{ color: colors.slate[500], fontSize: '13px', marginBottom: '6px' }}>
                                        Tương đương tiếng Việt:
                                    </div>
                                    <div style={{ color: colors.blue[700], fontWeight: '700', fontSize: '18px' }}>
                                        "Còn ... thì ...", "Nói về ... thì ...", "... là ..."
                                    </div>
                                </div>
                                
                                <div style={{
                                    background: colors.amber[100],
                                    borderRadius: '10px',
                                    padding: '12px',
                                    border: `1px solid ${colors.amber[300]}`
                                }}>
                                    <Icons.Warning /> <strong>Lưu ý:</strong> Viết là "は" (ha) nhưng đọc là "wa" khi làm trợ từ chủ đề!
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Pronunciation Practice */}
                    <Card variant="green">
                        <h3 style={{ color: colors.green[700], marginBottom: '15px', fontSize: '18px' }}>
                            <Icons.Mic /> Luyện phát âm (+20 điểm)
                        </h3>
                        <PronunciationPractice 
                            sentences={sentences}
                            onComplete={() => setPronunciationComplete(true)}
                            addScore={addScore}
                        />
                    </Card>

                    {/* Quick Quiz */}
                    <Card highlight>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                background: `linear-gradient(135deg, ${colors.orange[100]}, ${colors.amber[100]})`,
                                padding: '10px 20px',
                                borderRadius: '25px',
                                marginBottom: '20px'
                            }}>
                                <Icons.Target /> <strong style={{color: colors.orange[700]}}>MINI QUIZ (+15 điểm)</strong>
                            </div>
                            
                            <h3 style={{ color: colors.slate[800], marginBottom: '25px', fontSize: '20px' }}>
                                ～は dùng để làm gì trong câu?
                            </h3>
                            
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {[
                                    { text: 'Nêu chủ đề', value: 'topic' },
                                    { text: 'Chỉ đối tượng', value: 'object' },
                                    { text: 'Nêu địa điểm', value: 'place' }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => checkAnswer(opt.value)}
                                        disabled={showResult}
                                        style={{
                                            padding: '18px 35px',
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            color: colors.slate[800],
                                            border: '3px solid ' + (
                                                showResult && opt.value === 'topic' ? colors.green[500] :
                                                showResult && quizAnswer === opt.value && opt.value !== 'topic' ? colors.red[500] :
                                                colors.slate[300]
                                            ),
                                            borderRadius: '16px',
                                            background: showResult && opt.value === 'topic' ? colors.green[100] :
                                                showResult && quizAnswer === opt.value && opt.value !== 'topic' ? colors.red[100] :
                                                'white',
                                            cursor: showResult ? 'default' : 'pointer',
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                            
                            {showResult && (
                                <div style={{
                                    marginTop: '25px',
                                    padding: '18px',
                                    borderRadius: '14px',
                                    background: quizAnswer === 'topic' ? colors.green[100] : colors.red[100],
                                }} className="animate-scale">
                                    {quizAnswer === 'topic' ? (
                                        <div style={{ color: colors.green[700], fontSize: '17px' }}>
                                            <Icons.Check /> <strong>Chính xác! +15 điểm</strong>
                                            <br />
                                            <span style={{ fontSize: '15px' }}>
                                                ～は đánh dấu chủ đề câu - điều bạn muốn nói về 🎯
                                            </span>
                                        </div>
                                    ) : (
                                        <div style={{ color: colors.red[700] }}>
                                            <Icons.Cross /> Đáp án đúng là <strong>Nêu chủ đề</strong>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={onPrev}>← Quay lại</Button>
                        <Button onClick={onNext} disabled={!canProceed}>
                            Tiếp theo <Icons.ArrowRight />
                        </Button>
                    </div>
                    
                    {!canProceed && showResult && (
                        <div style={{ 
                            textAlign: 'center', 
                            marginTop: '12px', 
                            color: colors.orange[600],
                            fontSize: '14px',
                            padding: '10px',
                            background: colors.orange[50],
                            borderRadius: '10px'
                        }}>
                            <Icons.Warning /> Hoàn thành luyện phát âm để tiếp tục nhé!
                        </div>
                    )}
                </div>
            );
        }

        // ==================== STEP 2: STRUCTURE ====================
        function Step2_Structure({ onNext, onPrev, addScore }) {
            const [showNegative, setShowNegative] = useState(false);
            const [quizDone, setQuizDone] = useState(false);
            const [selectedAnswer, setSelectedAnswer] = useState(null);

            const handleQuiz = (answer) => {
                setSelectedAnswer(answer);
                setQuizDone(true);
                if (answer === 'correct') {
                    addScore(15);
                }
            };

            return (
                <div>
                    <Card variant="orange">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ 
                                background: colors.green[500], 
                                color: 'white', 
                                padding: '6px 14px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '700'
                            }}>
                                CHUNK 2
                            </span>
                            <h2 style={{ color: colors.orange[700], margin: 0, fontSize: '20px' }}>
                                <Icons.Book /> Cấu trúc ngữ pháp
                            </h2>
                        </div>
                    </Card>

                    {/* Main Structure */}
                    <Card highlight glow style={{ textAlign: 'center', padding: '30px 20px' }}>
                        <div style={{ fontSize: '13px', color: colors.slate[500], marginBottom: '12px', letterSpacing: '1px' }}>
                            ✨ CÔNG THỨC VÀNG ✨
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <SpeakerButton text="私は学生です" size="large" label="Nghe ví dụ" />
                        </div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: colors.slate[800],
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            flexWrap: 'wrap',
                        }}>
                            <span style={{ 
                                background: `linear-gradient(135deg, ${colors.green[100]}, ${colors.green[200]})`, 
                                padding: '10px 20px', 
                                borderRadius: '12px',
                                color: colors.green[700],
                                border: `2px solid ${colors.green[300]}`
                            }} className="japanese">
                                Chủ đề
                            </span>
                            <span style={{ color: colors.slate[400], fontSize: '24px' }}>＋</span>
                            <span style={{ 
                                background: `linear-gradient(135deg, ${colors.red[100]}, ${colors.red[200]})`, 
                                padding: '10px 20px', 
                                borderRadius: '12px',
                                color: colors.red[700],
                                border: `2px solid ${colors.red[300]}`
                            }} className="japanese">
                                は
                            </span>
                            <span style={{ color: colors.slate[400], fontSize: '24px' }}>＋</span>
                            <span style={{ 
                                background: `linear-gradient(135deg, ${colors.blue[100]}, ${colors.blue[200]})`, 
                                padding: '10px 20px', 
                                borderRadius: '12px',
                                color: colors.blue[700],
                                border: `2px solid ${colors.blue[300]}`
                            }} className="japanese">
                                Thông tin
                            </span>
                        </div>
                        
                        <div style={{
                            background: colors.amber[100],
                            borderRadius: '12px',
                            padding: '15px',
                            marginTop: '25px',
                            border: `2px dashed ${colors.amber[400]}`,
                        }}>
                            <Icons.Lightning /> <strong>Nhớ siêu nhanh:</strong> Chủ đề + は + Thông tin = <strong style={{color: colors.blue[600]}}>CÂU HOÀN CHỈNH!</strong>
                        </div>
                    </Card>

                    {/* Examples */}
                    <Card variant="green">
                        <h3 style={{ color: colors.green[700], marginBottom: '15px', fontSize: '18px' }}>
                            <Icons.Bulb /> Ví dụ minh họa
                        </h3>
                        
                        {[
                            { topic: '私', wa: 'は', info: '学生です', meaning: 'Tôi là sinh viên', full: '私は学生です' },
                            { topic: '田中さん', wa: 'は', info: '先生です', meaning: 'Anh Tanaka là giáo viên', full: '田中さんは先生です' },
                            { topic: 'これ', wa: 'は', info: '本です', meaning: 'Đây là sách', full: 'これは本です' },
                        ].map((ex, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '14px',
                                background: idx % 2 === 0 ? 'white' : colors.green[50],
                                borderRadius: '12px',
                                marginBottom: '10px',
                                border: `1px solid ${colors.green[200]}`,
                                flexWrap: 'wrap'
                            }}>
                                <SpeakerButton text={ex.full} size="small" showLabel={false} />
                                <span className="japanese" style={{ 
                                    color: colors.green[700], 
                                    fontWeight: '700',
                                    fontSize: '18px'
                                }}>
                                    {ex.topic}
                                </span>
                                <span className="japanese" style={{ 
                                    color: colors.red[600], 
                                    fontWeight: '800',
                                    fontSize: '20px'
                                }}>
                                    {ex.wa}
                                </span>
                                <span className="japanese" style={{ 
                                    color: colors.blue[600], 
                                    fontWeight: '600',
                                    fontSize: '16px'
                                }}>
                                    {ex.info}
                                </span>
                                <span style={{ color: colors.slate[400] }}>=</span>
                                <span style={{ 
                                    color: colors.slate[700],
                                    fontWeight: '500'
                                }}>
                                    {ex.meaning}
                                </span>
                            </div>
                        ))}
                    </Card>

                    {/* Question Form Toggle */}
                    <Card>
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            marginBottom: showNegative ? '20px' : 0
                        }}>
                            <h3 style={{ color: colors.slate[800], fontSize: '18px' }}>
                                <Icons.Fire /> Thể nghi vấn (Câu hỏi)
                            </h3>
                            <Button 
                                variant={showNegative ? "success" : "primary"} 
                                size="small"
                                onClick={() => {
                                    if (!showNegative) addScore(5);
                                    setShowNegative(true);
                                }}
                            >
                                {showNegative ? <><Icons.Unlock /> Đã mở!</> : <><Icons.Lock /> Mở khóa +5đ</>}
                            </Button>
                        </div>
                        
                        {showNegative && (
                            <div className="animate-in">
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '12px',
                                    marginBottom: '15px'
                                }}>
                                    <div style={{
                                        background: colors.green[100],
                                        borderRadius: '14px',
                                        padding: '18px',
                                        textAlign: 'center',
                                        border: `2px solid ${colors.green[300]}`
                                    }}>
                                        <div style={{ fontSize: '12px', color: colors.green[600], marginBottom: '8px' }}>
                                            Khẳng định ✔
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <SpeakerButton text="これは本です" size="small" showLabel={false} />
                                            <span style={{ fontSize: '16px', fontWeight: '700', color: colors.green[700] }} className="japanese">
                                                ～は～です
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{
                                        background: colors.purple[100],
                                        borderRadius: '14px',
                                        padding: '18px',
                                        textAlign: 'center',
                                        border: `2px solid ${colors.purple[400]}`
                                    }}>
                                        <div style={{ fontSize: '12px', color: colors.purple[600], marginBottom: '8px' }}>
                                            Nghi vấn ？
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <SpeakerButton text="これは本ですか" size="small" showLabel={false} />
                                            <span style={{ fontSize: '16px', fontWeight: '700', color: colors.purple[600] }} className="japanese">
                                                ～は～ですか
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{
                                    padding: '14px',
                                    background: colors.amber[50],
                                    borderRadius: '12px',
                                    borderLeft: `4px solid ${colors.amber[500]}`
                                }}>
                                    <Icons.Info /> <strong style={{color: colors.amber[700]}}>Ví dụ:</strong>
                                    <div className="japanese" style={{marginTop: '8px', color: colors.slate[700]}}>
                                        あなた<strong style={{color: colors.red[600]}}>は</strong>学生です<strong style={{color: colors.purple[600]}}>か</strong>。= Bạn là sinh viên phải không?
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Quiz */}
                    {showNegative && (
                        <Card variant="amber" className="animate-in">
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <Icons.Target /> <strong>THỰC HÀNH (+15 điểm)</strong>
                                </div>
                                <div style={{ fontSize: '18px', marginBottom: '20px', color: colors.slate[800] }}>
                                    "Tôi là người Việt Nam" = ?
                                </div>
                                
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    {[
                                        { text: '私はベトナム人です', value: 'correct' },
                                        { text: '私がベトナム人です', value: 'wrong1' },
                                        { text: '私をベトナム人です', value: 'wrong2' },
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleQuiz(opt.value)}
                                            disabled={quizDone}
                                            className="japanese"
                                            style={{
                                                padding: '15px 20px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                border: '3px solid ' + (
                                                    quizDone && opt.value === 'correct' ? colors.green[500] :
                                                    quizDone && selectedAnswer === opt.value && opt.value !== 'correct' ? colors.red[500] :
                                                    colors.slate[300]
                                                ),
                                                borderRadius: '14px',
                                                background: quizDone && opt.value === 'correct' ? colors.green[100] :
                                                    quizDone && selectedAnswer === opt.value && opt.value !== 'correct' ? colors.red[100] :
                                                    'white',
                                                cursor: quizDone ? 'default' : 'pointer',
                                                transition: 'all 0.2s ease',
                                                width: '100%',
                                                maxWidth: '350px'
                                            }}
                                        >
                                            {opt.text}
                                        </button>
                                    ))}
                                </div>
                                
                                {quizDone && (
                                    <div style={{ marginTop: '20px', fontSize: '17px' }} className="animate-scale">
                                        {selectedAnswer === 'correct' ? (
                                            <span style={{color: colors.green[600]}}><Icons.Check /> <strong>Xuất sắc! +15 điểm</strong></span>
                                        ) : (
                                            <span style={{color: colors.red[600]}}>
                                                <Icons.Cross /> Đáp án: <strong className="japanese">私はベトナム人です</strong>
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={onPrev}>← Quay lại</Button>
                        <Button onClick={onNext} disabled={!quizDone}>
                            Tiếp theo <Icons.ArrowRight />
                        </Button>
                    </div>
                </div>
            );
        }

        // ==================== STEP 3: WORD TYPES (thay cho Conjugation vì は là trợ từ) ====================
        function Step3_WordTypes({ onNext, onPrev, addScore }) {
            const [activeGroup, setActiveGroup] = useState(1);
            const [groupScores, setGroupScores] = useState({ 1: null, 2: null, 3: null });
            const [currentQuizIndex, setCurrentQuizIndex] = useState({ 1: 0, 2: 0, 3: 0 });
            const [quizAnswers, setQuizAnswers] = useState({});

            const groups = {
                1: {
                    title: 'Với Danh từ (名詞)',
                    subtitle: 'Giới thiệu người, vật, nơi chốn',
                    color: colors.orange,
                    icon: '📦',
                    rules: [
                        { sentence: '私は学生です', topic: '私', meaning: 'Tôi là sinh viên' },
                        { sentence: 'これは本です', topic: 'これ', meaning: 'Đây là sách' },
                        { sentence: '田中さんは先生です', topic: '田中さん', meaning: 'Anh Tanaka là giáo viên' },
                    ],
                    quizItems: [
                        { topic: '山田さん', hint: '(ông Yamada)', info: '医者', answer: '山田さんは医者です', meaning: 'bác sĩ' },
                        { topic: 'あれ', hint: '(cái kia)', info: '車', answer: 'あれは車です', meaning: 'xe hơi' },
                        { topic: '東京', hint: '(Tokyo)', info: '日本の首都', answer: '東京は日本の首都です', meaning: 'thủ đô Nhật' },
                    ]
                },
                2: {
                    title: 'Với Tính từ (形容詞)',
                    subtitle: 'Mô tả đặc điểm, tính chất',
                    color: colors.green,
                    icon: '🌈',
                    rules: [
                        { sentence: '日本語は難しいです', topic: '日本語', meaning: 'Tiếng Nhật thì khó' },
                        { sentence: 'この本は面白いです', topic: 'この本', meaning: 'Quyển sách này thú vị' },
                        { sentence: '富士山は高いです', topic: '富士山', meaning: 'Núi Phú Sĩ thì cao' },
                    ],
                    quizItems: [
                        { topic: '寿司', hint: '(sushi)', info: 'おいしい', answer: '寿司はおいしいです', meaning: 'ngon' },
                        { topic: 'この部屋', hint: '(căn phòng này)', info: '広い', answer: 'この部屋は広いです', meaning: 'rộng' },
                        { topic: '桜', hint: '(hoa anh đào)', info: 'きれい', answer: '桜はきれいです', meaning: 'đẹp' },
                    ]
                },
                3: {
                    title: 'Với Động từ (動詞)',
                    subtitle: 'Nói về hành động, hoạt động',
                    color: colors.red,
                    icon: '🏃',
                    rules: [
                        { sentence: '私は毎日勉強します', topic: '私', meaning: 'Tôi học mỗi ngày' },
                        { sentence: '田中さんは働きます', topic: '田中さん', meaning: 'Anh Tanaka làm việc' },
                        { sentence: '猫は寝ます', topic: '猫', meaning: 'Con mèo ngủ' },
                    ],
                    quizItems: [
                        { topic: '母', hint: '(mẹ)', info: '料理します', answer: '母は料理します', meaning: 'nấu ăn' },
                        { topic: '兄', hint: '(anh trai)', info: '泳ぎます', answer: '兄は泳ぎます', meaning: 'bơi' },
                        { topic: '彼', hint: '(anh ấy)', info: '歌います', answer: '彼は歌います', meaning: 'hát' },
                    ]
                }
            };

            const handleQuizAnswer = (group, answer) => {
                const quizItem = groups[group].quizItems[currentQuizIndex[group]];
                const isCorrect = answer.trim() === quizItem.answer;
                
                const key = `${group}-${currentQuizIndex[group]}`;
                setQuizAnswers({ ...quizAnswers, [key]: { answer, isCorrect } });
                
                if (isCorrect) {
                    addScore(10);
                }
                
                setTimeout(() => {
                    if (currentQuizIndex[group] < groups[group].quizItems.length - 1) {
                        setCurrentQuizIndex({
                            ...currentQuizIndex,
                            [group]: currentQuizIndex[group] + 1
                        });
                    } else {
                        let correct = 0;
                        for (let i = 0; i <= currentQuizIndex[group]; i++) {
                            const k = `${group}-${i}`;
                            if (quizAnswers[k]?.isCorrect || (i === currentQuizIndex[group] && isCorrect)) {
                                correct++;
                            }
                        }
                        setGroupScores({ ...groupScores, [group]: correct });
                    }
                }, 1000);
            };

            const allGroupsComplete = groupScores[1] !== null && groupScores[2] !== null && groupScores[3] !== null;

            return (
                <div>
                    <Card variant="orange">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ 
                                background: colors.purple[500], 
                                color: 'white', 
                                padding: '6px 14px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '700'
                            }}>
                                CHUNK 3
                            </span>
                            <h2 style={{ color: colors.orange[700], margin: 0, fontSize: '20px' }}>
                                <Icons.Brain /> は với các loại từ
                            </h2>
                        </div>
                    </Card>

                    {/* Important Note */}
                    <Card variant="amber">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <span style={{ fontSize: '24px' }}>💡</span>
                            <div>
                                <strong style={{ color: colors.amber[700] }}>Tin vui!</strong>
                                <p style={{ color: colors.slate[600], marginTop: '5px' }}>
                                    Trợ từ <strong>は</strong> có thể dùng với <strong>danh từ, tính từ, và động từ</strong>. Công thức luôn giống nhau: <strong>Chủ đề + は + Thông tin</strong>!
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Group Tabs */}
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                        {[1, 2, 3].map(g => (
                            <button
                                key={g}
                                onClick={() => setActiveGroup(g)}
                                style={{
                                    flex: 1,
                                    padding: '14px 10px',
                                    border: 'none',
                                    borderRadius: '14px',
                                    background: activeGroup === g 
                                        ? `linear-gradient(135deg, ${groups[g].color[500]}, ${groups[g].color[600]})` 
                                        : groups[g].color[100],
                                    color: activeGroup === g ? 'white' : groups[g].color[700],
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: activeGroup === g ? `0 4px 15px ${groups[g].color[300]}` : 'none',
                                    transform: activeGroup === g ? 'scale(1.02)' : 'scale(1)',
                                    position: 'relative',
                                    fontSize: '13px'
                                }}
                            >
                                {groups[g].icon} {g === 1 ? 'Danh từ' : g === 2 ? 'Tính từ' : 'Động từ'}
                                {groupScores[g] !== null && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: colors.green[500],
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                        ✔
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Active Group Content */}
                    <Card style={{ 
                        borderTop: `4px solid ${groups[activeGroup].color[500]}`,
                        background: `linear-gradient(180deg, ${groups[activeGroup].color[50]} 0%, white 100%)`
                    }}>
                        <h3 style={{ color: groups[activeGroup].color[700], marginBottom: '8px', fontSize: '20px' }}>
                            {groups[activeGroup].title}
                        </h3>
                        <p style={{ color: colors.slate[600], marginBottom: '20px', fontSize: '15px' }}>
                            {groups[activeGroup].subtitle}
                        </p>
                        
                        {/* Examples */}
                        <div style={{ marginBottom: '20px' }}>
                            <div style={{ fontSize: '14px', color: colors.slate[500], marginBottom: '10px', fontWeight: '600' }}>
                                Ví dụ:
                            </div>
                            {groups[activeGroup].rules.map((rule, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '12px',
                                    background: idx % 2 === 0 ? 'white' : groups[activeGroup].color[50],
                                    borderRadius: '10px',
                                    marginBottom: '8px',
                                    border: `1px solid ${groups[activeGroup].color[200]}`,
                                    flexWrap: 'wrap'
                                }}>
                                    <SpeakerButton text={rule.sentence} size="small" showLabel={false} />
                                    <span className="japanese" style={{ 
                                        fontWeight: '700', 
                                        color: groups[activeGroup].color[700],
                                        fontSize: '18px'
                                    }}>
                                        {rule.sentence}
                                    </span>
                                    <span style={{ color: colors.slate[400] }}>=</span>
                                    <span style={{ 
                                        color: colors.slate[700],
                                        fontWeight: '500'
                                    }}>
                                        {rule.meaning}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Quiz Section */}
                        <div style={{
                            background: groups[activeGroup].color[100],
                            borderRadius: '12px',
                            padding: '20px',
                            border: `2px solid ${groups[activeGroup].color[300]}`
                        }}>
                            <div style={{ 
                                fontSize: '16px', 
                                fontWeight: '700', 
                                color: groups[activeGroup].color[700],
                                marginBottom: '15px',
                                textAlign: 'center'
                            }}>
                                <Icons.Pencil /> LUYỆN TẬP NHANH (+10đ mỗi câu đúng)
                            </div>
                            
                            {/* Progress dots */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                gap: '8px',
                                marginBottom: '15px'
                            }}>
                                {groups[activeGroup].quizItems.map((_, idx) => {
                                    const key = `${activeGroup}-${idx}`;
                                    const answered = quizAnswers[key];
                                    return (
                                        <div key={idx} style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            background: answered 
                                                ? (answered.isCorrect ? colors.green[500] : colors.red[500])
                                                : idx === currentQuizIndex[activeGroup] 
                                                    ? groups[activeGroup].color[500] 
                                                    : colors.slate[300],
                                            transition: 'all 0.3s ease'
                                        }} />
                                    );
                                })}
                            </div>
                            
                            {groupScores[activeGroup] === null ? (
                                <div>
                                    {(() => {
                                        const item = groups[activeGroup].quizItems[currentQuizIndex[activeGroup]];
                                        const key = `${activeGroup}-${currentQuizIndex[activeGroup]}`;
                                        const answered = quizAnswers[key];
                                        
                                        return (
                                            <div style={{
                                                background: 'white',
                                                borderRadius: '10px',
                                                padding: '15px',
                                                textAlign: 'center'
                                            }}>
                                                <div style={{ marginBottom: '10px' }}>
                                                    <span className="japanese" style={{ 
                                                        fontSize: '20px', 
                                                        fontWeight: '700',
                                                        color: colors.green[700]
                                                    }}>
                                                        {item.topic}
                                                    </span>
                                                    <span style={{ 
                                                        color: colors.slate[500], 
                                                        fontSize: '14px',
                                                        marginLeft: '10px'
                                                    }}>
                                                        {item.hint}
                                                    </span>
                                                    <span className="japanese" style={{ 
                                                        fontSize: '20px', 
                                                        fontWeight: '800',
                                                        color: colors.red[600],
                                                        margin: '0 8px'
                                                    }}>
                                                        は
                                                    </span>
                                                    <span className="japanese" style={{ 
                                                        fontSize: '20px', 
                                                        fontWeight: '700',
                                                        color: colors.blue[700]
                                                    }}>
                                                        {item.info}
                                                    </span>
                                                    <span style={{ 
                                                        color: colors.slate[500], 
                                                        fontSize: '14px',
                                                        marginLeft: '10px'
                                                    }}>
                                                        ({item.meaning})
                                                    </span>
                                                </div>
                                                
                                                <div style={{ 
                                                    display: 'flex', 
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    gap: '10px',
                                                    marginBottom: '10px',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <span style={{ fontSize: '16px', color: colors.slate[600] }}>
                                                        Ghép thành câu hoàn chỉnh:
                                                    </span>
                                                </div>
                                                
                                                <input
                                                    type="text"
                                                    placeholder="Nhập đáp án..."
                                                    className="japanese"
                                                    disabled={!!answered}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' && !answered) {
                                                            handleQuizAnswer(activeGroup, e.target.value);
                                                        }
                                                    }}
                                                    style={{
                                                        padding: '12px 16px',
                                                        fontSize: '18px',
                                                        border: `2px solid ${
                                                            answered 
                                                                ? (answered.isCorrect ? colors.green[400] : colors.red[400])
                                                                : colors.slate[300]
                                                        }`,
                                                        borderRadius: '10px',
                                                        width: '100%',
                                                        maxWidth: '350px',
                                                        background: answered 
                                                            ? (answered.isCorrect ? colors.green[50] : colors.red[50])
                                                            : 'white',
                                                        textAlign: 'center'
                                                    }}
                                                />
                                                
                                                {answered && (
                                                    <div style={{
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        background: answered.isCorrect ? colors.green[100] : colors.red[100],
                                                        marginTop: '10px'
                                                    }}>
                                                        {answered.isCorrect ? (
                                                            <span style={{ color: colors.green[700] }}>
                                                                <Icons.Check /> Chính xác! +10đ
                                                            </span>
                                                        ) : (
                                                            <span style={{ color: colors.red[700] }}>
                                                                <Icons.Cross /> Đáp án: <strong className="japanese">{item.answer}</strong>
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                                
                                                {!answered && (
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Button 
                                                            size="small" 
                                                            variant="primary"
                                                            onClick={() => {
                                                                const input = document.querySelector('input[type="text"]');
                                                                if (input && input.value) {
                                                                    handleQuizAnswer(activeGroup, input.value);
                                                                }
                                                            }}
                                                        >
                                                            Kiểm tra
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })()}
                                </div>
                            ) : (
                                <div style={{ 
                                    textAlign: 'center',
                                    padding: '20px',
                                    background: colors.green[100],
                                    borderRadius: '12px'
                                }}>
                                    <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
                                    <div style={{ 
                                        fontSize: '20px', 
                                        fontWeight: '700',
                                        color: colors.green[700]
                                    }}>
                                        Hoàn thành {groups[activeGroup].title}!
                                    </div>
                                    <div style={{ color: colors.slate[600], marginTop: '5px' }}>
                                        Điểm: {groupScores[activeGroup]}/3 câu đúng
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={onPrev}>← Quay lại</Button>
                        <Button onClick={onNext} disabled={!allGroupsComplete}>
                            Tiếp theo <Icons.ArrowRight />
                        </Button>
                    </div>
                    
                    {!allGroupsComplete && (
                        <div style={{ 
                            textAlign: 'center', 
                            marginTop: '12px', 
                            color: colors.orange[600],
                            fontSize: '14px',
                            padding: '10px',
                            background: colors.orange[50],
                            borderRadius: '10px'
                        }}>
                            <Icons.Warning /> Hoàn thành luyện tập cả 3 loại từ để tiếp tục!
                        </div>
                    )}
                </div>
            );
        }

        // ==================== STEP 4: LISTEN & SPEAK ====================
        function Step4_ListenSpeak({ onNext, onPrev, addScore }) {
            const [completedSentences, setCompletedSentences] = useState({});
            const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
            
            const sentences = [
                {
                    jp: '私は学生です。',
                    reading: 'わたし は がくせい です',
                    meaning: 'Tôi là sinh viên.',
                    emotion: 'proud',
                    tip: 'Nói với giọng tự tin, rõ ràng!',
                    color: colors.blue,
                    icon: '🎓'
                },
                {
                    jp: '田中さんは先生です。',
                    reading: 'たなかさん は せんせい です',
                    meaning: 'Anh Tanaka là giáo viên.',
                    emotion: 'respectful',
                    tip: 'Nhấn mạnh "は" rõ ràng!',
                    color: colors.green,
                    icon: '👨‍🏫'
                },
                {
                    jp: 'これは本ですか。',
                    reading: 'これ は ほん です か',
                    meaning: 'Đây là sách phải không?',
                    emotion: 'curious',
                    tip: 'Nâng giọng ở cuối câu hỏi!',
                    color: colors.amber,
                    icon: '📚'
                },
                {
                    jp: '日本語は難しいです。',
                    reading: 'にほんご は むずかしい です',
                    meaning: 'Tiếng Nhật thì khó.',
                    emotion: 'thoughtful',
                    tip: 'Giọng nhẹ nhàng, suy ngẫm!',
                    color: colors.purple,
                    icon: '🗾'
                },
            ];

            const handleSentenceComplete = (index) => {
                setCompletedSentences({
                    ...completedSentences,
                    [index]: true
                });
                
                if (index < sentences.length - 1) {
                    setTimeout(() => {
                        setCurrentSentenceIndex(index + 1);
                    }, 500);
                }
            };

            const completedCount = Object.keys(completedSentences).length;
            const canProceed = completedCount >= sentences.length;

            return (
                <div>
                    <Card variant="orange">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <span style={{ 
                                background: colors.red[500], 
                                color: 'white', 
                                padding: '6px 14px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '700'
                            }}>
                                CHUNK 4
                            </span>
                            <h2 style={{ color: colors.orange[700], margin: 0, fontSize: '20px' }}>
                                <Icons.Headphone /> Luyện nghe - nói
                            </h2>
                        </div>
                        <p style={{ color: colors.slate[600], fontSize: '14px' }}>
                            Nghe → Đọc theo 3 lần → AI đánh giá phát âm
                        </p>
                    </Card>

                    {/* Visual Progress Grid - 4 examples */}
                    <Card style={{ marginBottom: '20px' }}>
                        <div style={{ 
                            fontSize: '14px', 
                            fontWeight: '600', 
                            color: colors.slate[700],
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>
                            <Icons.Target /> Tiến độ: {completedCount}/{sentences.length} câu
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(4, 1fr)',
                            gap: '10px'
                        }}>
                            {sentences.map((s, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => !completedSentences[idx] && setCurrentSentenceIndex(idx)}
                                    style={{
                                        padding: '15px 10px',
                                        borderRadius: '12px',
                                        background: completedSentences[idx] 
                                            ? colors.green[100]
                                            : idx === currentSentenceIndex
                                                ? s.color[100]
                                                : colors.slate[50],
                                        border: `2px solid ${
                                            completedSentences[idx]
                                                ? colors.green[400]
                                                : idx === currentSentenceIndex
                                                    ? s.color[400]
                                                    : colors.slate[200]
                                        }`,
                                        textAlign: 'center',
                                        cursor: completedSentences[idx] ? 'default' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        transform: idx === currentSentenceIndex ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                                        {completedSentences[idx] ? '✅' : s.icon}
                                    </div>
                                    <div style={{ 
                                        fontSize: '11px', 
                                        color: completedSentences[idx] ? colors.green[700] : colors.slate[600],
                                        fontWeight: '600'
                                    }}>
                                        Câu {idx + 1}
                                    </div>
                                    <div style={{ 
                                        fontSize: '10px', 
                                        color: colors.slate[500],
                                        marginTop: '3px'
                                    }} className="japanese">
                                        {s.jp.substring(0, 6)}...
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Current Sentence Practice */}
                    {!canProceed && (
                        <Card 
                            style={{
                                borderLeft: `4px solid ${sentences[currentSentenceIndex].color[500]}`,
                                background: `linear-gradient(135deg, ${sentences[currentSentenceIndex].color[50]} 0%, white 100%)`,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{
                                    fontSize: '36px',
                                    flexShrink: 0,
                                }}>
                                    {sentences[currentSentenceIndex].icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ 
                                        fontSize: '13px', 
                                        color: sentences[currentSentenceIndex].color[600], 
                                        marginBottom: '10px',
                                        fontWeight: '600'
                                    }}>
                                        Câu {currentSentenceIndex + 1}/{sentences.length}
                                    </div>
                                    
                                    <JapaneseText 
                                        text={sentences[currentSentenceIndex].jp}
                                        reading={sentences[currentSentenceIndex].reading}
                                        meaning={sentences[currentSentenceIndex].meaning}
                                        size="medium"
                                    />
                                    
                                    <div style={{
                                        background: colors.amber[100],
                                        padding: '12px',
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        marginBottom: '15px',
                                        border: `1px solid ${colors.amber[300]}`
                                    }}>
                                        <Icons.Bulb /> <strong>Mẹo phát âm:</strong> {sentences[currentSentenceIndex].tip}
                                    </div>
                                    
                                    <PronunciationPractice 
                                        sentences={[sentences[currentSentenceIndex]]}
                                        onComplete={() => handleSentenceComplete(currentSentenceIndex)}
                                        addScore={addScore}
                                    />
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Completion Message */}
                    {canProceed && (
                        <Card variant="green" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎉</div>
                            <h3 style={{ color: colors.green[700], marginBottom: '10px' }}>
                                Xuất sắc! Hoàn thành luyện nghe - nói!
                            </h3>
                            <p style={{ color: colors.slate[600] }}>
                                Bạn đã luyện tập cả {sentences.length} câu với AI đánh giá phát âm.
                            </p>
                        </Card>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={onPrev}>← Quay lại</Button>
                        <Button onClick={onNext} disabled={!canProceed}>
                            Tiếp theo <Icons.ArrowRight />
                        </Button>
                    </div>
                </div>
            );
        }

        // ==================== STEP 5: PRACTICE ====================
        function Step5_Practice({ onNext, onPrev, addScore, resetStreak }) {
            const [currentQ, setCurrentQ] = useState(0);
            const [answers, setAnswers] = useState({});
            const [showFeedback, setShowFeedback] = useState(false);

            const questions = [
                {
                    type: 'translate',
                    question: 'Dịch sang tiếng Nhật: "Tôi là người Việt Nam"',
                    sentence: '私はベトナム人です。',
                    audio: '私はベトナム人です',
                    options: ['私はベトナム人です', '私がベトナム人です', '私をベトナム人です'],
                    correct: 0,
                    explanation: '私 (tôi) + は + ベトナム人です (là người Việt Nam) = Tôi là người Việt Nam'
                },
                {
                    type: 'fill',
                    question: 'Điền vào chỗ trống: 田中さん___先生です。',
                    sentence: '田中さんは先生です。',
                    audio: '田中さんは先生です',
                    options: ['は', 'が', 'を'],
                    correct: 0,
                    explanation: 'Dùng は để nêu chủ đề "Anh Tanaka" - người mà chúng ta đang nói về'
                },
                {
                    type: 'question',
                    question: 'Chuyển sang câu hỏi: これは本です',
                    sentence: 'これは本ですか。',
                    audio: 'これは本ですか',
                    options: ['これは本ですか', 'これが本ですか', 'これは本です'],
                    correct: 0,
                    explanation: 'Thêm か vào cuối câu để tạo câu hỏi: これは本です → これは本ですか'
                },
                {
                    type: 'meaning',
                    question: 'Câu này có nghĩa gì: あなたは学生ですか。',
                    sentence: 'あなたは学生ですか。',
                    audio: 'あなたは学生ですか',
                    options: ['Bạn là sinh viên phải không?', 'Tôi là sinh viên', 'Đây là sinh viên'],
                    correct: 0,
                    explanation: 'あなた (bạn) + は + 学生ですか (là sinh viên phải không) = Bạn là sinh viên phải không?'
                },
            ];

            const handleAnswer = (optionIdx) => {
                const newAnswers = { ...answers, [currentQ]: optionIdx };
                setAnswers(newAnswers);
                setShowFeedback(true);
                
                if (optionIdx === questions[currentQ].correct) {
                    addScore(12);
                } else {
                    resetStreak();
                }
            };

            const nextQuestion = () => {
                setShowFeedback(false);
                if (currentQ < questions.length - 1) {
                    setCurrentQ(currentQ + 1);
                }
            };

            const q = questions[currentQ];

            return (
                <div>
                    <Card variant="orange">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <span style={{ 
                                background: colors.orange[600], 
                                color: 'white', 
                                padding: '6px 14px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '700'
                            }}>
                                CHUNK 5
                            </span>
                            <h2 style={{ color: colors.orange[700], margin: 0, fontSize: '20px' }}>
                                <Icons.Pencil /> Thực hành tổng hợp
                            </h2>
                        </div>
                        <div style={{ color: colors.slate[600], fontSize: '14px' }}>
                            Câu {currentQ + 1}/{questions.length} | +12đ mỗi câu đúng
                        </div>
                    </Card>

                    <Card highlight>
                        <div style={{ 
                            fontSize: '13px', 
                            color: colors.orange[600],
                            marginBottom: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {q.type === 'translate' ? '🔄 Dịch câu' : 
                             q.type === 'fill' ? '✏️ Điền vào chỗ trống' : 
                             q.type === 'question' ? '❓ Chuyển câu hỏi' : '🔍 Hiểu nghĩa'}
                        </div>
                        
                        <div style={{ fontSize: '18px', marginBottom: '20px', color: colors.slate[700] }}>
                            {q.question}
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px',
                            padding: '25px',
                            background: colors.slate[50],
                            borderRadius: '16px',
                            marginBottom: '25px',
                        }}>
                            <SpeakerButton text={q.audio} size="large" showLabel={false} />
                            {q.type !== 'translate' && (
                                <span className="japanese" style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: colors.slate[800]
                                }}>
                                    {q.sentence}
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {q.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !showFeedback && handleAnswer(idx)}
                                    disabled={showFeedback}
                                    className={q.type !== 'meaning' ? 'japanese' : ''}
                                    style={{
                                        padding: '16px 20px',
                                        fontSize: '18px',
                                        border: '3px solid ' + (
                                            showFeedback && idx === q.correct ? colors.green[500] :
                                            showFeedback && answers[currentQ] === idx && idx !== q.correct ? colors.red[500] :
                                            colors.slate[300]
                                        ),
                                        borderRadius: '14px',
                                        background: showFeedback && idx === q.correct ? colors.green[100] :
                                            showFeedback && answers[currentQ] === idx && idx !== q.correct ? colors.red[100] :
                                            'white',
                                        cursor: showFeedback ? 'default' : 'pointer',
                                        textAlign: 'left',
                                        transition: 'all 0.2s ease',
                                        fontWeight: '500',
                                    }}
                                >
                                    {opt}
                                    {showFeedback && idx === q.correct && ' ✅'}
                                    {showFeedback && answers[currentQ] === idx && idx !== q.correct && ' ❌'}
                                </button>
                            ))}
                        </div>

                        {showFeedback && (
                            <div style={{
                                marginTop: '25px',
                                padding: '18px',
                                background: answers[currentQ] === q.correct ? colors.green[50] : colors.amber[100],
                                borderRadius: '14px',
                                borderLeft: '4px solid ' + (answers[currentQ] === q.correct ? colors.green[500] : colors.amber[500])
                            }} className="animate-scale">
                                <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '16px' }}>
                                    {answers[currentQ] === q.correct ? (
                                        <span style={{color: colors.green[700]}}><Icons.Check /> Chính xác! +12 điểm</span>
                                    ) : (
                                        <span style={{color: colors.amber[700]}}><Icons.Bulb /> Giải thích:</span>
                                    )}
                                </div>
                                <div style={{ color: colors.slate[600], lineHeight: '1.6' }}>{q.explanation}</div>
                            </div>
                        )}
                    </Card>

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={onPrev}>← Quay lại</Button>
                        {showFeedback && currentQ < questions.length - 1 ? (
                            <Button onClick={nextQuestion}>
                                Câu tiếp theo <Icons.ArrowRight />
                            </Button>
                        ) : showFeedback && currentQ === questions.length - 1 ? (
                            <Button onClick={onNext} variant="success">
                                <Icons.Trophy /> Kiểm tra cuối
                            </Button>
                        ) : null}
                    </div>
                </div>
            );
        }

        // ==================== STEP 6: FINAL TEST ====================
        function Step6_FinalTest({ onNext, onPrev, addScore, setTotalQuestions, resetStreak }) {
            const [answers, setAnswers] = useState({});
            const [submitted, setSubmitted] = useState(false);
            const [testScore, setTestScore] = useState(0);

            const questions = [
                { q: '～は dùng để làm gì?', opts: ['Nêu chủ đề', 'Chỉ đối tượng', 'Nêu nơi chốn'], correct: 0, audio: 'は' },
                { q: '私___学生です。', opts: ['は', 'が', 'を'], correct: 0, jp: true, audio: '私は学生です' },
                { q: 'Phát âm của は khi làm trợ từ?', opts: ['wa', 'ha', 'wo'], correct: 0, audio: 'は' },
                { q: 'これ___本です。', opts: ['は', 'が', 'に'], correct: 0, jp: true, audio: 'これは本です' },
                { q: '「田中さんは先生です」nghĩa là?', opts: ['Anh Tanaka là giáo viên', 'Tôi là Tanaka', 'Đây là Tanaka'], correct: 0, audio: '田中さんは先生です' },
                { q: 'Câu hỏi của 「これは本です」?', opts: ['これは本ですか', 'これが本ですか', 'これは本でした'], correct: 0, jp: true, audio: 'これは本ですか' },
            ];

            useEffect(() => {
                setTotalQuestions(questions.length);
            }, []);

            const handleSubmit = () => {
                let correct = 0;
                questions.forEach((q, idx) => {
                    if (answers[idx] === q.correct) correct++;
                });
                setTestScore(correct);
                addScore(correct * 15);
                setSubmitted(true);
            };

            return (
                <div>
                    <Card style={{
                        background: `linear-gradient(135deg, ${colors.red[500]}, ${colors.orange[500]})`,
                        color: 'white'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <span style={{ 
                                background: 'rgba(255,255,255,0.2)', 
                                color: 'white', 
                                padding: '6px 14px', 
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: '700',
                                backdropFilter: 'blur(10px)'
                            }}>
                                BÀI KIỂM TRA
                            </span>
                            <h2 style={{ margin: 0, fontSize: '20px' }}>
                                <Icons.Target /> Kiểm tra tổng hợp
                            </h2>
                        </div>
                        <p style={{ opacity: 0.9, fontSize: '14px' }}>
                            {questions.length} câu hỏi | +15đ mỗi câu đúng | Tổng: +{questions.length * 15}đ
                        </p>
                    </Card>

                    {questions.map((q, idx) => (
                        <Card 
                            key={idx} 
                            style={{
                                borderLeft: submitted 
                                    ? `4px solid ${answers[idx] === q.correct ? colors.green[500] : colors.red[500]}`
                                    : `4px solid ${colors.slate[300]}`,
                                background: submitted && answers[idx] === q.correct 
                                    ? colors.green[50] 
                                    : submitted && answers[idx] !== q.correct 
                                        ? colors.red[50] 
                                        : 'white'
                            }}
                        >
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                fontWeight: '600', 
                                marginBottom: '15px', 
                                color: colors.slate[800] 
                            }}>
                                <SpeakerButton text={q.audio} size="small" showLabel={false} />
                                <span>Câu {idx + 1}: {q.q}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {q.opts.map((opt, optIdx) => (
                                    <label 
                                        key={optIdx}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '14px',
                                            borderRadius: '12px',
                                            cursor: submitted ? 'default' : 'pointer',
                                            background: submitted && optIdx === q.correct ? colors.green[100] :
                                                submitted && answers[idx] === optIdx && optIdx !== q.correct ? colors.red[100] :
                                                answers[idx] === optIdx ? colors.orange[100] : colors.slate[50],
                                            border: '2px solid ' + (
                                                submitted && optIdx === q.correct ? colors.green[400] :
                                                submitted && answers[idx] === optIdx && optIdx !== q.correct ? colors.red[400] :
                                                answers[idx] === optIdx ? colors.orange[400] : 'transparent'
                                            ),
                                            transition: 'all 0.2s ease',
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name={`q${idx}`}
                                            checked={answers[idx] === optIdx}
                                            onChange={() => !submitted && setAnswers({...answers, [idx]: optIdx})}
                                            disabled={submitted}
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        <span className={q.jp ? 'japanese' : ''} style={{ fontSize: '17px' }}>
                                            {opt}
                                        </span>
                                        {submitted && optIdx === q.correct && <span style={{marginLeft: 'auto'}}>✅</span>}
                                        {submitted && answers[idx] === optIdx && optIdx !== q.correct && <span style={{marginLeft: 'auto'}}>❌</span>}
                                    </label>
                                ))}
                            </div>
                        </Card>
                    ))}

                    {!submitted ? (
                        <Button 
                            onClick={handleSubmit} 
                            fullWidth 
                            size="large"
                            disabled={Object.keys(answers).length < questions.length}
                        >
                            <Icons.Check /> Nộp bài kiểm tra
                        </Button>
                    ) : (
                        <Card variant="amber" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '56px', marginBottom: '15px' }}>
                                {testScore === questions.length ? '🏆' : testScore >= questions.length * 0.8 ? '🌟' : testScore >= questions.length * 0.6 ? '👍' : '💪'}
                            </div>
                            <div style={{ fontSize: '26px', fontWeight: '800', color: colors.slate[800] }}>
                                Kết quả: {testScore}/{questions.length} câu đúng
                            </div>
                            <div style={{ fontSize: '20px', color: colors.orange[600], marginTop: '10px', fontWeight: '600' }}>
                                +{testScore * 15} điểm
                            </div>
                            <div style={{ marginTop: '25px' }}>
                                <Button onClick={onNext} variant="success" size="large">
                                    <Icons.Trophy /> Xem kết quả tổng
                                </Button>
                            </div>
                        </Card>
                    )}

                    {!submitted && (
                        <div style={{ marginTop: '20px' }}>
                            <Button variant="ghost" onClick={onPrev}>← Quay lại ôn tập</Button>
                        </div>
                    )}
                </div>
            );
        }

        // ==================== STEP 7: RESULTS ====================
        function Step7_Results({ score, streak, totalQuestions, onRestart }) {
            const maxScore = 300;
            const percentage = Math.min(Math.round((score / maxScore) * 100), 100);
            
            const getGrade = () => {
                if (percentage >= 95) return { grade: 'S+', color: colors.amber[500], text: 'HUYỀN THOẠI!', emoji: '👑' };
                if (percentage >= 90) return { grade: 'S', color: colors.orange[500], text: 'XUẤT SẮC!', emoji: '🏆' };
                if (percentage >= 80) return { grade: 'A', color: colors.green[500], text: 'Giỏi lắm!', emoji: '⭐' };
                if (percentage >= 70) return { grade: 'B', color: colors.green[400], text: 'Tốt!', emoji: '👍' };
                if (percentage >= 60) return { grade: 'C', color: colors.amber[500], text: 'Khá!', emoji: '💪' };
                return { grade: 'D', color: colors.red[500], text: 'Cần ôn thêm', emoji: '📚' };
            };

            const result = getGrade();

            return (
                <div>
                    <Card style={{
                        background: `linear-gradient(135deg, ${colors.orange[500]} 0%, ${colors.red[500]} 50%, ${colors.red[600]} 100%)`,
                        color: 'white',
                        textAlign: 'center',
                        padding: '40px 20px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0, right: 0, bottom: 0, left: 0,
                            background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
                            pointerEvents: 'none',
                        }} />
                        
                        <div style={{ fontSize: '80px', marginBottom: '20px', position: 'relative' }} className="bounce">{result.emoji}</div>
                        <h1 style={{ fontSize: '36px', marginBottom: '10px', position: 'relative' }}>HOÀN THÀNH!</h1>
                        <p style={{ fontSize: '18px', opacity: 0.9, position: 'relative' }}>Bạn đã học xong trợ từ chủ đề</p>
                        <div style={{ fontSize: '32px', fontWeight: '900', marginTop: '10px', position: 'relative' }} className="japanese">
                            ～は
                        </div>
                    </Card>

                    <Card style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '160px',
                            height: '160px',
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${result.color}, ${colors.slate[300]})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 25px',
                            fontSize: '60px',
                            fontWeight: '900',
                            color: 'white',
                            boxShadow: `0 15px 50px ${result.color}50`,
                        }}>
                            {result.grade}
                        </div>
                        
                        <div style={{ fontSize: '28px', fontWeight: '700', color: colors.slate[800], marginBottom: '10px' }}>
                            {result.text}
                        </div>
                        
                        <div style={{ fontSize: '52px', fontWeight: '900', color: colors.orange[600], marginBottom: '10px' }}>
                            {score}
                        </div>
                        <div style={{ fontSize: '18px', color: colors.slate[500], marginBottom: '25px' }}>
                            điểm tổng cộng
                        </div>

                        {/* Stats */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(3, 1fr)', 
                            gap: '12px',
                        }}>
                            <div style={{ 
                                background: colors.green[50], 
                                padding: '18px 12px', 
                                borderRadius: '14px',
                                border: `1px solid ${colors.green[200]}`
                            }}>
                                <div style={{ fontSize: '28px', marginBottom: '5px' }}><Icons.Book /></div>
                                <div style={{ fontWeight: '700', color: colors.green[700], fontSize: '20px' }}>8</div>
                                <div style={{ fontSize: '13px', color: colors.slate[500] }}>phần đã học</div>
                            </div>
                            <div style={{ 
                                background: colors.orange[50], 
                                padding: '18px 12px', 
                                borderRadius: '14px',
                                border: `1px solid ${colors.orange[200]}`
                            }}>
                                <div style={{ fontSize: '28px', marginBottom: '5px' }}><Icons.Mic /></div>
                                <div style={{ fontWeight: '700', color: colors.orange[700], fontSize: '20px' }}>12+</div>
                                <div style={{ fontSize: '13px', color: colors.slate[500] }}>câu đã đọc</div>
                            </div>
                            <div style={{ 
                                background: colors.red[50], 
                                padding: '18px 12px', 
                                borderRadius: '14px',
                                border: `1px solid ${colors.red[200]}`
                            }}>
                                <div style={{ fontSize: '28px', marginBottom: '5px' }}><Icons.Fire /></div>
                                <div style={{ fontWeight: '700', color: colors.red[700], fontSize: '20px' }}>{streak}</div>
                                <div style={{ fontSize: '13px', color: colors.slate[500] }}>streak cao nhất</div>
                            </div>
                        </div>
                    </Card>

                    {/* Key Takeaways */}
                    <Card variant="amber">
                        <h3 style={{ color: colors.slate[800], marginBottom: '18px', fontSize: '18px' }}>
                            <Icons.Brain /> Ghi nhớ chính
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { icon: '🔑', text: 'Công thức: Chủ đề + は + Thông tin' },
                                { icon: '🎯', text: 'Ý nghĩa: Nêu chủ đề câu - "Còn ... thì ..."' },
                                { icon: '📝', text: 'Viết は (ha) nhưng đọc "wa" khi làm trợ từ' },
                                { icon: '❓', text: 'Câu hỏi: Thêm か vào cuối câu' },
                                { icon: '🧠', text: 'Dùng với: Danh từ, Tính từ, Động từ' },
                            ].map((item, idx) => (
                                <div key={idx} style={{ 
                                    display: 'flex', 
                                    gap: '12px', 
                                    alignItems: 'center',
                                    padding: '12px',
                                    background: 'white',
                                    borderRadius: '10px',
                                }}>
                                    <span style={{ fontSize: '22px' }}>{item.icon}</span>
                                    <span style={{ color: colors.slate[700], fontSize: '15px' }}>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                        <Button variant="secondary" onClick={onRestart} fullWidth>
                            <Icons.Repeat /> Học lại
                        </Button>
                        <Button variant="primary" fullWidth>
                            <Icons.Rocket /> Bài tiếp theo
                        </Button>
                    </div>

                    {/* Footer */}
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: '35px', 
                        color: colors.slate[500],
                        fontSize: '14px',
                        padding: '20px',
                        borderTop: `1px solid ${colors.slate[200]}`
                    }}>
                        <div style={{ marginBottom: '8px' }}>01 tháng 12 năm 2025</div>
                        <div style={{ fontWeight: '700', color: colors.orange[600], fontSize: '16px' }}>
                            Lê Long Sơn | TIKME Learning Pro
                        </div>
                    </div>
                </div>
            );
        }

        // ==================== MAIN RENDER ====================
        return (
            <div className="grammar-n5-wa-container">
                {/* ✅ BACK BUTTON TO GRAMMAR LIBRARY */}
                <button
                    onClick={() => navigate('/grammar-library')}
                    style={{
                        position: 'fixed',
                        top: '60px',
                        left: '20px',
                        background: 'white',
                        border: '2px solid #E5E7EB',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        color: '#1F2937',
                        fontWeight: '600',
                        fontSize: '14px',
                        zIndex: 1000,
                        transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F3F4F6';
                        e.currentTarget.style.borderColor = '#D1D5DB';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                    }}
                >
                    ← Thư Viện
                </button>

                <App />
            </div>
        );
}
