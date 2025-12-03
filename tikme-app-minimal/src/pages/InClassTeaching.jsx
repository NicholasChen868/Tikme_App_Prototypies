import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './InClassTeaching.css';

        // ========== CUSTOM HOOKS ==========
        const useSpeech = () => {
            const [isSpeaking, setIsSpeaking] = useState(false);
            const [speed, setSpeed] = useState(1.0);
            const [volume, setVolume] = useState(0.8);
            const [isMuted, setIsMuted] = useState(false);
            const [hasJapaneseVoice, setHasJapaneseVoice] = useState(true);
            
            useEffect(() => {
                const checkVoices = () => {
                    const voices = window.speechSynthesis?.getVoices() || [];
                    const jpVoice = voices.find(v => v.lang.startsWith('ja'));
                    setHasJapaneseVoice(!!jpVoice);
                };
                checkVoices();
                window.speechSynthesis?.addEventListener('voiceschanged', checkVoices);
                return () => window.speechSynthesis?.removeEventListener('voiceschanged', checkVoices);
            }, []);

            const speak = useCallback((text, options = {}) => {
                return new Promise((resolve) => {
                    if (!window.speechSynthesis || isMuted) { resolve(); return; }
                    window.speechSynthesis.cancel();
                    const utterance = new SpeechSynthesisUtterance(text);
                    const voices = window.speechSynthesis.getVoices();
                    const jpVoice = voices.find(v => v.lang.startsWith('ja'));
                    if (jpVoice) utterance.voice = jpVoice;
                    utterance.lang = 'ja-JP';
                    utterance.rate = options.rate || speed;
                    utterance.volume = options.volume || volume;
                    utterance.pitch = options.pitch || 1;
                    utterance.onstart = () => setIsSpeaking(true);
                    utterance.onend = () => { setIsSpeaking(false); resolve(); };
                    utterance.onerror = () => { setIsSpeaking(false); resolve(); };
                    window.speechSynthesis.speak(utterance);
                });
            }, [speed, volume, isMuted]);

            const speakMultiple = useCallback(async (text, times = 5, delay = 700, onProgress) => {
                for (let i = 0; i < times; i++) {
                    await speak(text);
                    if (onProgress) onProgress(i + 1);
                    if (i < times - 1) await new Promise(r => setTimeout(r, delay));
                }
            }, [speak]);

            const cancel = useCallback(() => { window.speechSynthesis?.cancel(); setIsSpeaking(false); }, []);
            const toggleMute = useCallback(() => setIsMuted(m => !m), []);

            return { speak, speakMultiple, cancel, isSpeaking, hasJapaneseVoice, speed, setSpeed, volume, setVolume, isMuted, toggleMute };
        };

        // ========== CONSTANTS - 90 PHÚT TIMELINE ==========
        const CLASS_DURATION = 90; // phút
        const TOTAL_SECONDS = CLASS_DURATION * 60;

        // 5 GIAI ĐOẠN CHOPCHEP
        const PHASES = [
            { id: 'warmup', name: 'Khởi Động', icon: '🎯', duration: 15, startMin: 0, endMin: 15, color: 'warmup', activities: ['Ice Breaker', 'Pre-Class Check', 'Mục Tiêu Bài Học'] },
            { id: 'check', name: 'Kiểm Tra', icon: '📋', duration: 25, startMin: 15, endMin: 40, color: 'check', activities: ['Vocab Check', 'Grammar Check', 'Listening Check'] },
            { id: 'drill', name: 'Luyện Tập', icon: '⚡', duration: 25, startMin: 40, endMin: 65, color: 'drill', activities: ['Rapid Fire', 'Pronunciation', 'Grammar Drill'] },
            { id: 'practice', name: 'Thực Hành', icon: '💪', duration: 15, startMin: 65, endMin: 80, color: 'practice', activities: ['Role-Play', 'Situation', 'Peer Practice'] },
            { id: 'wrapup', name: 'Tổng Kết', icon: '🎉', duration: 10, startMin: 80, endMin: 90, color: 'wrapup', activities: ['Recap', 'Q&A', 'Homework'] }
        ];

        // 12 TOOLS
        const TOOLS = [
            { id: 'warmup', name: 'Khởi Động', icon: '🎯', color: 'var(--tool-warmup)', shortcut: '`', phase: 'warmup' },
            { id: 'vocab', name: 'Từ Vựng', icon: '📚', color: 'var(--tool-vocab)', shortcut: '1', phase: 'check' },
            { id: 'grammar', name: 'Ngữ Pháp', icon: '📐', color: 'var(--tool-grammar)', shortcut: '2', phase: 'check' },
            { id: 'listen', name: 'Nghe', icon: '👂', color: 'var(--tool-listen)', shortcut: '3', phase: 'check' },
            { id: 'rapid', name: 'Rapid Fire', icon: '⚡', color: 'var(--tool-rapid)', shortcut: '4', phase: 'drill' },
            { id: 'pronun', name: 'Phát Âm', icon: '🗣️', color: 'var(--tool-pronun)', shortcut: '5', phase: 'drill' },
            { id: 'roleplay', name: 'Đóng Vai', icon: '🎭', color: 'var(--tool-roleplay)', shortcut: '6', phase: 'practice' },
            { id: 'situation', name: 'Tình Huống', icon: '💬', color: 'var(--tool-situation)', shortcut: '7', phase: 'practice' },
            { id: 'quiz', name: 'Quiz', icon: '❓', color: 'var(--tool-quiz)', shortcut: '8', phase: 'drill' },
            { id: 'reading', name: 'Đọc', icon: '📖', color: 'var(--tool-reading)', shortcut: '9', phase: 'practice' },
            { id: 'writing', name: 'Viết', icon: '✍️', color: 'var(--tool-writing)', shortcut: '0', phase: 'wrapup' }
        ];

        // CHOPCHEP 7 STEPS
        const CHOPCHEP_STEPS = [
            { num: 1, label: 'Hiện Việt', icon: '🇻🇳', desc: 'Hiển thị nghĩa tiếng Việt' },
            { num: 2, label: 'Gọi HV', icon: '🎤', desc: 'Gọi học viên phát âm' },
            { num: 3, label: 'Đánh Giá', icon: '⭐', desc: 'Đánh giá phát âm' },
            { num: 4, label: 'Mở Nhật', icon: '🇯🇵', desc: 'Hiển thị tiếng Nhật' },
            { num: 5, label: 'Phát 5x', icon: '🔊', desc: 'Thầy phát 5 lần' },
            { num: 6, label: 'Lớp 5x', icon: '👥', desc: 'Cả lớp lặp 5 lần' },
            { num: 7, label: 'Xác Nhận', icon: '✅', desc: 'Hoàn thành từ' }
        ];

        // EVALUATION RATINGS
        const RATINGS = [
            { id: 'excellent', label: 'Rất Tốt', icon: '🌟', range: '80-100%', color: 'success', key: '1', score: 95 },
            { id: 'good', label: 'Khá', icon: '👍', range: '70-80%', color: 'info', key: '2', score: 75 },
            { id: 'fair', label: 'Cần Cố Gắng', icon: '💪', range: '60-70%', color: 'warning', key: '3', score: 65 },
            { id: 'weak', label: 'Yếu', icon: '📚', range: '<60%', color: 'danger', key: '4', score: 50 }
        ];

        const COMMON_ISSUES = ['Âm dài/ngắn', 'Âm っ (tsu nhỏ)', 'Thanh điệu', 'Âm ん', 'Phụ âm kép', 'Ngữ điệu câu', 'Tốc độ nói', 'Âm R/L'];

        // KEYBOARD SHORTCUTS
        const SHORTCUTS = [
            { section: 'Điều khiển chính', shortcuts: [
                { keys: ['Space'], desc: 'Bắt đầu / Tạm dừng' },
                { keys: ['C'], desc: 'Gọi học viên ngẫu nhiên' },
                { keys: ['?'], desc: 'Hiện phím tắt' },
                { keys: ['Esc'], desc: 'Đóng modal / Hủy' }
            ]},
            { section: 'Đánh giá nhanh', shortcuts: [
                { keys: ['1'], desc: 'Rất Tốt (80-100%)' },
                { keys: ['2'], desc: 'Khá (70-80%)' },
                { keys: ['3'], desc: 'Cần Cố Gắng (60-70%)' },
                { keys: ['4'], desc: 'Yếu (<60%)' }
            ]},
            { section: 'Chuyển công cụ', shortcuts: [
                { keys: ['`'], desc: 'Khởi Động' },
                { keys: ['1-9'], desc: 'Công cụ 1-9' },
                { keys: ['0'], desc: 'Công cụ Viết' }
            ]},
            { section: 'Điều hướng', shortcuts: [
                { keys: ['←', '→'], desc: 'Chuyển giai đoạn' },
                { keys: ['Tab'], desc: 'Từ tiếp theo' }
            ]}
        ];

        // ========== MOCK DATA - CLASS INFO ==========
        const mockClassInfo = {
            className: 'N4-05',
            lessonNumber: 20,
            lessonTitle: 'Mua Sắm 買い物',
            meetingId: 'TM-2024-1234',
            duration: 90,
            totalStudents: 13,
            date: new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })
        };

        // ========== MOCK DATA - STUDENTS ==========
        const mockStudents = [
            { id: 1, name: 'Nguyễn Văn An', avatar: '👨', status: 'online', activeScore: 92, pronunciationScore: 88, testScore: 95, rank: 1, micOn: true, cameraOn: true },
            { id: 2, name: 'Trần Thị Bình', avatar: '👩', status: 'online', activeScore: 88, pronunciationScore: 90, testScore: 85, rank: 2, micOn: true, cameraOn: true },
            { id: 3, name: 'Lê Hoàng Cường', avatar: '👨', status: 'online', activeScore: 85, pronunciationScore: 82, testScore: 88, rank: 3, micOn: true, cameraOn: false },
            { id: 4, name: 'Phạm Thị Dung', avatar: '👩', status: 'online', activeScore: 78, pronunciationScore: 75, testScore: 80, rank: 4, micOn: false, cameraOn: true },
            { id: 5, name: 'Hoàng Văn Em', avatar: '👨', status: 'online', activeScore: 72, pronunciationScore: 70, testScore: 75, rank: 5, micOn: true, cameraOn: true },
            { id: 6, name: 'Ngô Thị Phượng', avatar: '👩', status: 'online', activeScore: 68, pronunciationScore: 65, testScore: 70, rank: 6, micOn: true, cameraOn: true },
            { id: 7, name: 'Đỗ Văn Giang', avatar: '👨', status: 'online', activeScore: 65, pronunciationScore: 68, testScore: 62, rank: 7, micOn: false, cameraOn: false },
            { id: 8, name: 'Vũ Thị Hương', avatar: '👩', status: 'online', activeScore: 55, pronunciationScore: 58, testScore: 52, rank: 8, micOn: true, cameraOn: true },
            { id: 9, name: 'Bùi Văn Inh', avatar: '👨', status: 'away', activeScore: 52, pronunciationScore: 50, testScore: 55, rank: 9, micOn: false, cameraOn: false },
            { id: 10, name: 'Lý Thị Kim', avatar: '👩', status: 'online', activeScore: 48, pronunciationScore: 45, testScore: 50, rank: 10, micOn: true, cameraOn: true },
            { id: 11, name: 'Mai Văn Long', avatar: '👨', status: 'online', activeScore: 45, pronunciationScore: 48, testScore: 42, rank: 11, micOn: true, cameraOn: false },
            { id: 12, name: 'Trương Thị Mai', avatar: '👩', status: 'online', activeScore: 40, pronunciationScore: 42, testScore: 38, rank: 12, micOn: false, cameraOn: true },
            { id: 13, name: 'Đinh Văn Nam', avatar: '👨', status: 'offline', activeScore: 35, pronunciationScore: 38, testScore: 32, rank: 13, micOn: false, cameraOn: false }
        ];

        // ========== MOCK DATA - VOCABULARY (15 từ với ví dụ cụm từ đầy đủ) ==========
        const vocabularyData = [
            { 
                id: 1, vietnamese: 'Cửa hàng / Tiệm', hint: 'Nơi mua bán hàng hóa',
                kanji: '店', hiragana: 'みせ', romaji: 'mise', audioText: 'みせ',
                examples: ['Cửa hàng quần áo', 'Cửa hàng tiện lợi', 'Đi ra cửa hàng', 'Cửa hàng mở cửa'],
                exampleSentence: { jp: '店の前で待ってください。', vn: 'Hãy đợi trước cửa hàng.' }
            },
            { 
                id: 2, vietnamese: 'Giá tiền', hint: 'Số tiền phải trả khi mua',
                kanji: '値段', hiragana: 'ねだん', romaji: 'nedan', audioText: 'ねだん',
                examples: ['Hỏi giá tiền', 'Giá tiền hợp lý', 'Giá tiền cao', 'So sánh giá tiền'],
                exampleSentence: { jp: '値段はいくらですか。', vn: 'Giá bao nhiêu?' }
            },
            { 
                id: 3, vietnamese: 'Mua', hint: 'Đổi tiền để lấy hàng',
                kanji: '買う', hiragana: 'かう', romaji: 'kau', audioText: 'かう',
                examples: ['Mua sắm', 'Mua hàng online', 'Mua quà tặng', 'Đi mua đồ'],
                exampleSentence: { jp: 'これを買いたいです。', vn: 'Tôi muốn mua cái này.' }
            },
            { 
                id: 4, vietnamese: 'Bán', hint: 'Đổi hàng để lấy tiền',
                kanji: '売る', hiragana: 'うる', romaji: 'uru', audioText: 'うる',
                examples: ['Bán hàng', 'Đang bán', 'Bán chạy', 'Bán giá rẻ'],
                exampleSentence: { jp: 'ここで売っています。', vn: 'Đang bán ở đây.' }
            },
            { 
                id: 5, vietnamese: 'Rẻ', hint: 'Giá thấp, không đắt',
                kanji: '安い', hiragana: 'やすい', romaji: 'yasui', audioText: 'やすい',
                examples: ['Giá rẻ', 'Rẻ hơn', 'Rẻ bất ngờ', 'Mua được giá rẻ'],
                exampleSentence: { jp: 'これは安いですね。', vn: 'Cái này rẻ nhỉ.' }
            },
            { 
                id: 6, vietnamese: 'Đắt / Cao', hint: 'Giá cao, không rẻ',
                kanji: '高い', hiragana: 'たかい', romaji: 'takai', audioText: 'たかい',
                examples: ['Quá đắt', 'Đắt tiền', 'Hơi đắt', 'Đắt đỏ'],
                exampleSentence: { jp: 'ちょっと高いですね。', vn: 'Hơi đắt nhỉ.' }
            },
            { 
                id: 7, vietnamese: 'Tiền mặt', hint: 'Tiền giấy, tiền xu',
                kanji: '現金', hiragana: 'げんきん', romaji: 'genkin', audioText: 'げんきん',
                examples: ['Trả tiền mặt', 'Chỉ nhận tiền mặt', 'Rút tiền mặt', 'Có tiền mặt'],
                exampleSentence: { jp: '現金で払います。', vn: 'Tôi trả bằng tiền mặt.' }
            },
            { 
                id: 8, vietnamese: 'Thẻ', hint: 'Thẻ tín dụng, thẻ ATM',
                kanji: 'カード', hiragana: 'カード', romaji: 'kaado', audioText: 'カード',
                examples: ['Thẻ tín dụng', 'Quẹt thẻ', 'Thanh toán thẻ', 'Dùng thẻ'],
                exampleSentence: { jp: 'カードで払えますか。', vn: 'Trả bằng thẻ được không?' }
            },
            { 
                id: 9, vietnamese: 'Tiền thối', hint: 'Tiền trả lại sau khi mua',
                kanji: 'お釣り', hiragana: 'おつり', romaji: 'otsuri', audioText: 'おつり',
                examples: ['Tiền thối lại', 'Nhận tiền thối', 'Không cần thối', 'Đếm tiền thối'],
                exampleSentence: { jp: 'お釣りをください。', vn: 'Cho tôi tiền thối.' }
            },
            { 
                id: 10, vietnamese: 'Túi', hint: 'Đựng đồ mua sắm',
                kanji: '袋', hiragana: 'ふくろ', romaji: 'fukuro', audioText: 'ふくろ',
                examples: ['Túi giấy', 'Túi nilon', 'Bỏ vào túi', 'Cần túi không'],
                exampleSentence: { jp: '袋をください。', vn: 'Cho tôi túi.' }
            },
            { 
                id: 11, vietnamese: 'Hóa đơn', hint: 'Giấy xác nhận mua hàng',
                kanji: 'レシート', hiragana: 'レシート', romaji: 'reshiito', audioText: 'レシート',
                examples: ['In hóa đơn', 'Giữ hóa đơn', 'Xuất hóa đơn', 'Cần hóa đơn'],
                exampleSentence: { jp: 'レシートをください。', vn: 'Cho tôi hóa đơn.' }
            },
            { 
                id: 12, vietnamese: 'Giảm giá', hint: 'Bớt giá, khuyến mãi',
                kanji: '割引', hiragana: 'わりびき', romaji: 'waribiki', audioText: 'わりびき',
                examples: ['Đang giảm giá', 'Giảm giá 50%', 'Mùa giảm giá', 'Có giảm giá không'],
                exampleSentence: { jp: '割引はありますか。', vn: 'Có giảm giá không?' }
            },
            { 
                id: 13, vietnamese: 'Thử đồ', hint: 'Mặc thử trước khi mua',
                kanji: '試着', hiragana: 'しちゃく', romaji: 'shichaku', audioText: 'しちゃく',
                examples: ['Phòng thử đồ', 'Thử đồ miễn phí', 'Muốn thử đồ', 'Đi thử đồ'],
                exampleSentence: { jp: '試着してもいいですか。', vn: 'Tôi thử được không?' }
            },
            { 
                id: 14, vietnamese: 'Kích cỡ / Size', hint: 'Size S, M, L, XL',
                kanji: 'サイズ', hiragana: 'サイズ', romaji: 'saizu', audioText: 'サイズ',
                examples: ['Size lớn hơn', 'Đổi size', 'Hết size', 'Size phù hợp'],
                exampleSentence: { jp: '他のサイズはありますか。', vn: 'Có size khác không?' }
            },
            { 
                id: 15, vietnamese: 'Màu sắc', hint: 'Đỏ, xanh, vàng...',
                kanji: '色', hiragana: 'いろ', romaji: 'iro', audioText: 'いろ',
                examples: ['Màu khác', 'Màu đẹp', 'Chọn màu', 'Thích màu nào'],
                exampleSentence: { jp: '他の色はありますか。', vn: 'Có màu khác không?' }
            }
        ];

        // ========== MOCK DATA - GRAMMAR (6 mẫu câu) ==========
        const grammarData = [
            { 
                id: 1, pattern: '〜てもいいですか', meaning: 'Có thể... được không? (Xin phép)',
                structure: 'Động từ thể て + もいいですか',
                explanation: 'Dùng để xin phép làm điều gì đó một cách lịch sự. Rất thường dùng khi mua sắm, hỏi nhân viên.',
                examples: [
                    { jp: '試着してもいいですか。', vn: 'Tôi thử (quần áo) được không?' },
                    { jp: '写真を撮ってもいいですか。', vn: 'Tôi chụp ảnh được không?' },
                    { jp: 'ここに座ってもいいですか。', vn: 'Tôi ngồi đây được không?' },
                    { jp: 'これを見てもいいですか。', vn: 'Tôi xem cái này được không?' }
                ]
            },
            { 
                id: 2, pattern: '〜てください', meaning: 'Hãy làm... / Xin hãy...',
                structure: 'Động từ thể て + ください',
                explanation: 'Dùng để yêu cầu, nhờ vả ai đó làm việc gì một cách lịch sự.',
                examples: [
                    { jp: '見せてください。', vn: 'Cho tôi xem.' },
                    { jp: '安くしてください。', vn: 'Làm ơn giảm giá.' },
                    { jp: '袋に入れてください。', vn: 'Bỏ vào túi giúp tôi.' },
                    { jp: 'もう一度言ってください。', vn: 'Nói lại một lần nữa.' }
                ]
            },
            { 
                id: 3, pattern: '〜がほしい', meaning: 'Muốn có... (vật)',
                structure: 'Danh từ + がほしいです',
                explanation: 'Diễn đạt mong muốn sở hữu một thứ gì đó. Chỉ dùng với danh từ.',
                examples: [
                    { jp: '新しい服がほしいです。', vn: 'Tôi muốn quần áo mới.' },
                    { jp: 'これがほしいです。', vn: 'Tôi muốn cái này.' },
                    { jp: 'もっと大きいサイズがほしいです。', vn: 'Tôi muốn size lớn hơn.' },
                    { jp: '違う色がほしいです。', vn: 'Tôi muốn màu khác.' }
                ]
            },
            { 
                id: 4, pattern: '〜たいです', meaning: 'Muốn làm... (hành động)',
                structure: 'Động từ thể ます (bỏ ます) + たいです',
                explanation: 'Diễn đạt mong muốn làm một hành động. VD: 食べます → 食べたいです',
                examples: [
                    { jp: '買いたいです。', vn: 'Tôi muốn mua.' },
                    { jp: '試着したいです。', vn: 'Tôi muốn thử (quần áo).' },
                    { jp: 'カードで払いたいです。', vn: 'Tôi muốn trả bằng thẻ.' },
                    { jp: 'もっと見たいです。', vn: 'Tôi muốn xem thêm.' }
                ]
            },
            { 
                id: 5, pattern: '〜は〜より〜', meaning: 'A... hơn B',
                structure: 'A は B より + tính từ + です',
                explanation: 'So sánh giữa hai thứ. A là chủ ngữ, B là đối tượng so sánh.',
                examples: [
                    { jp: 'これはそれより安いです。', vn: 'Cái này rẻ hơn cái kia.' },
                    { jp: 'この店はあの店より大きいです。', vn: 'Cửa hàng này lớn hơn cửa hàng kia.' },
                    { jp: 'Mサイズは Sサイズより大きいです。', vn: 'Size M lớn hơn size S.' }
                ]
            },
            { 
                id: 6, pattern: '〜ている', meaning: 'Đang làm... / Trạng thái',
                structure: 'Động từ thể て + いる/います',
                explanation: 'Diễn tả hành động đang diễn ra hoặc trạng thái kéo dài.',
                examples: [
                    { jp: '店は開いています。', vn: 'Cửa hàng đang mở.' },
                    { jp: '売っています。', vn: 'Đang bán (có bán).' },
                    { jp: 'セールをしています。', vn: 'Đang có khuyến mãi.' },
                    { jp: 'カードを使っています。', vn: 'Đang dùng thẻ.' }
                ]
            }
        ];

        // ========== MOCK DATA - RAPID FIRE (20 câu) ==========
        const rapidFireData = [
            { q: '店', a: 'Cửa hàng (みせ)', type: 'jp' },
            { q: 'Giá tiền', a: '値段 (ねだん)', type: 'vn' },
            { q: 'かう', a: 'Mua', type: 'jp' },
            { q: 'Bán', a: '売る (うる)', type: 'vn' },
            { q: 'やすい', a: 'Rẻ', type: 'jp' },
            { q: '高い', a: 'Đắt / Cao', type: 'jp' },
            { q: 'Tiền mặt', a: '現金 (げんきん)', type: 'vn' },
            { q: 'カード', a: 'Thẻ', type: 'jp' },
            { q: 'Tiền thối', a: 'お釣り (おつり)', type: 'vn' },
            { q: 'ふくろ', a: 'Túi', type: 'jp' },
            { q: 'レシート', a: 'Hóa đơn', type: 'jp' },
            { q: '割引', a: 'Giảm giá', type: 'jp' },
            { q: 'Thử đồ', a: '試着 (しちゃく)', type: 'vn' },
            { q: 'サイズ', a: 'Kích cỡ / Size', type: 'jp' },
            { q: 'Màu sắc', a: '色 (いろ)', type: 'vn' },
            { q: 'いくら', a: 'Bao nhiêu (tiền)', type: 'jp' },
            { q: 'Đổi', a: '交換 (こうかん)', type: 'vn' },
            { q: 'Trả lại', a: '返品 (へんぴん)', type: 'vn' },
            { q: '大きい', a: 'To / Lớn', type: 'jp' },
            { q: '小さい', a: 'Nhỏ', type: 'jp' }
        ];

        // ========== MOCK DATA - ROLEPLAY (4 scenarios) ==========
        const roleplayData = [
            { 
                id: 1, title: 'Mua quần áo', icon: '👔', 
                context: 'Bạn đang ở cửa hàng quần áo và muốn mua một chiếc áo sơ mi.',
                dialogues: [
                    { role: 'customer', jp: 'すみません、このシャツを見せてください。', vn: 'Xin lỗi, cho tôi xem cái áo này.' },
                    { role: 'staff', jp: 'はい、どうぞ。サイズは何ですか。', vn: 'Vâng, mời xem. Size bao nhiêu ạ?' },
                    { role: 'customer', jp: 'Mサイズをお願いします。', vn: 'Cho tôi size M.' },
                    { role: 'staff', jp: 'こちらです。試着しますか。', vn: 'Đây ạ. Anh/chị thử không?' },
                    { role: 'customer', jp: 'はい、試着してもいいですか。', vn: 'Vâng, tôi thử được không?' },
                    { role: 'staff', jp: '試着室はあちらです。', vn: 'Phòng thử đằng kia ạ.' }
                ]
            },
            { 
                id: 2, title: 'Tại siêu thị', icon: '🛒',
                context: 'Bạn đang mua sắm ở siêu thị và cần hỏi vị trí sản phẩm.',
                dialogues: [
                    { role: 'customer', jp: 'すみません、牛乳はどこですか。', vn: 'Xin lỗi, sữa ở đâu?' },
                    { role: 'staff', jp: '冷蔵コーナーにあります。あちらです。', vn: 'Ở khu tủ lạnh ạ. Đằng kia.' },
                    { role: 'customer', jp: 'ありがとうございます。袋はありますか。', vn: 'Cảm ơn. Có túi không?' },
                    { role: 'staff', jp: 'はい、袋は１枚５円です。', vn: 'Vâng, túi 5 yên một cái ạ.' },
                    { role: 'customer', jp: 'カードで払えますか。', vn: 'Trả bằng thẻ được không?' },
                    { role: 'staff', jp: 'はい、大丈夫です。', vn: 'Vâng, được ạ.' }
                ]
            },
            { 
                id: 3, title: 'Đổi/Trả hàng', icon: '🔄',
                context: 'Bạn muốn đổi sản phẩm vì size không vừa.',
                dialogues: [
                    { role: 'customer', jp: 'すみません、サイズが合いません。交換できますか。', vn: 'Xin lỗi, size không vừa. Đổi được không?' },
                    { role: 'staff', jp: 'レシートはありますか。', vn: 'Anh/chị có hóa đơn không?' },
                    { role: 'customer', jp: 'はい、これです。', vn: 'Có, đây ạ.' },
                    { role: 'staff', jp: '大丈夫です。どのサイズがいいですか。', vn: 'Được ạ. Muốn đổi size nào?' },
                    { role: 'customer', jp: 'Lサイズをお願いします。', vn: 'Cho tôi size L.' },
                    { role: 'staff', jp: 'かしこまりました。少々お待ちください。', vn: 'Vâng ạ. Xin chờ một chút.' }
                ]
            },
            { 
                id: 4, title: 'Mặc cả', icon: '💰',
                context: 'Bạn đang ở chợ và muốn thương lượng giá.',
                dialogues: [
                    { role: 'customer', jp: 'すみません、これはいくらですか。', vn: 'Xin lỗi, cái này bao nhiêu?' },
                    { role: 'staff', jp: '３０００円です。', vn: '3000 yên ạ.' },
                    { role: 'customer', jp: 'ちょっと高いですね。安くできますか。', vn: 'Hơi đắt nhỉ. Giảm được không?' },
                    { role: 'staff', jp: 'そうですね...２５００円はどうですか。', vn: 'Để xem... 2500 yên được không?' },
                    { role: 'customer', jp: '２０００円でお願いします。', vn: 'Cho 2000 yên đi.' },
                    { role: 'staff', jp: 'わかりました。２０００円です。', vn: 'Được rồi. 2000 yên.' }
                ]
            }
        ];

        // ========== MOCK DATA - QUIZ (10 câu) ==========
        const quizData = [
            { q: '「店」の読み方は？', options: ['みせ', 'てん', 'たな', 'いえ'], correct: 0, type: 'reading' },
            { q: '「買う」の意味は？', options: ['Bán', 'Mua', 'Đổi', 'Thử'], correct: 1, type: 'meaning' },
            { q: 'Từ nào nghĩa là "giảm giá"?', options: ['値段', '現金', '割引', 'お釣り'], correct: 2, type: 'vocab' },
            { q: '「高い」có nghĩa là gì?', options: ['Thấp', 'Rẻ', 'Đắt/Cao', 'Vừa'], correct: 2, type: 'meaning' },
            { q: 'Cách đọc của「色」là?', options: ['しき', 'いろ', 'しろ', 'あお'], correct: 1, type: 'reading' },
            { q: '試着してもいいですか nghĩa là gì?', options: ['Có giảm giá không?', 'Tôi thử được không?', 'Bao nhiêu tiền?', 'Có màu khác không?'], correct: 1, type: 'grammar' },
            { q: 'カードで払えますか。 - Câu trả lời phù hợp?', options: ['5000円です', 'Mサイズです', 'はい、大丈夫です', '試着室はあちらです'], correct: 2, type: 'conversation' },
            { q: '「レシート」nghĩa là gì?', options: ['Tiền thối', 'Túi', 'Hóa đơn', 'Thẻ'], correct: 2, type: 'vocab' },
            { q: 'Muốn nói "Cho tôi xem" bằng tiếng Nhật?', options: ['買ってください', '見せてください', '安くしてください', '払ってください'], correct: 1, type: 'grammar' },
            { q: '「お釣り」có nghĩa là?', options: ['Tiền mặt', 'Thẻ tín dụng', 'Hóa đơn', 'Tiền thối'], correct: 3, type: 'vocab' }
        ];

        // ========== MOCK DATA - SITUATION (4 tình huống) ==========
        const situationData = [
            { 
                id: 1, title: 'Hỏi giá', icon: '💰', context: 'Khi muốn biết giá sản phẩm',
                phrases: [
                    { jp: 'これはいくらですか。', romaji: 'Kore wa ikura desu ka.', vn: 'Cái này bao nhiêu?', note: '🔰 Cơ bản' },
                    { jp: '値段を教えてください。', romaji: 'Nedan o oshiete kudasai.', vn: 'Cho tôi biết giá.', note: '📝 Lịch sự' },
                    { jp: 'おいくらですか。', romaji: 'Oikura desu ka.', vn: 'Giá bao nhiêu ạ?', note: '🎩 Kính ngữ' },
                    { jp: '全部でいくらですか。', romaji: 'Zenbu de ikura desu ka.', vn: 'Tất cả bao nhiêu?', note: '🛒 Tổng cộng' }
                ]
            },
            { 
                id: 2, title: 'Thanh toán', icon: '💳', context: 'Khi thanh toán tại quầy',
                phrases: [
                    { jp: 'カードで払えますか。', romaji: 'Kaado de haraemasu ka.', vn: 'Trả bằng thẻ được không?', note: '💳 Thẻ' },
                    { jp: '現金でお願いします。', romaji: 'Genkin de onegaishimasu.', vn: 'Tôi trả tiền mặt.', note: '💵 Tiền mặt' },
                    { jp: 'レシートをください。', romaji: 'Reshiito o kudasai.', vn: 'Cho tôi hóa đơn.', note: '🧾 Hóa đơn' },
                    { jp: '袋をください。', romaji: 'Fukuro o kudasai.', vn: 'Cho tôi túi.', note: '🛍️ Túi đựng' },
                    { jp: 'お釣りはいりません。', romaji: 'Otsuri wa irimasen.', vn: 'Không cần tiền thối.', note: '💰 Tip' }
                ]
            },
            { 
                id: 3, title: 'Thử đồ', icon: '👗', context: 'Khi muốn thử quần áo',
                phrases: [
                    { jp: '試着してもいいですか。', romaji: 'Shichaku shite mo ii desu ka.', vn: 'Tôi thử được không?', note: '👕 Xin phép' },
                    { jp: '試着室はどこですか。', romaji: 'Shichakushitsu wa doko desu ka.', vn: 'Phòng thử ở đâu?', note: '🚪 Hỏi chỗ' },
                    { jp: 'サイズが合いません。', romaji: 'Saizu ga aimasen.', vn: 'Size không vừa.', note: '📏 Phản hồi' },
                    { jp: '他のサイズはありますか。', romaji: 'Hoka no saizu wa arimasu ka.', vn: 'Có size khác không?', note: '🔄 Yêu cầu' }
                ]
            },
            { 
                id: 4, title: 'Màu sắc & Size', icon: '🎨', context: 'Khi hỏi về màu và kích cỡ',
                phrases: [
                    { jp: '他の色はありますか。', romaji: 'Hoka no iro wa arimasu ka.', vn: 'Có màu khác không?', note: '🎨 Màu' },
                    { jp: 'もっと大きいサイズはありますか。', romaji: 'Motto ookii saizu wa arimasu ka.', vn: 'Có size lớn hơn không?', note: '⬆️ Lớn hơn' },
                    { jp: 'もっと小さいサイズはありますか。', romaji: 'Motto chiisai saizu wa arimasu ka.', vn: 'Có size nhỏ hơn không?', note: '⬇️ Nhỏ hơn' },
                    { jp: '赤い色がほしいです。', romaji: 'Akai iro ga hoshii desu.', vn: 'Tôi muốn màu đỏ.', note: '❤️ Chọn màu' }
                ]
            }
        ];

        // ========== WARMUP GREETINGS ==========
        const warmupGreetings = [
            { jp: 'おはようございます！', vn: 'Chào buổi sáng!' },
            { jp: 'こんにちは！', vn: 'Xin chào!' },
            { jp: 'こんばんは！', vn: 'Chào buổi tối!' },
            { jp: '元気ですか？', vn: 'Bạn khỏe không?' },
            { jp: 'お元気ですか？', vn: 'Bạn có khỏe không? (lịch sự)' },
            { jp: '久しぶりですね！', vn: 'Lâu rồi không gặp!' }
        ];

        const warmupActivities = [
            { icon: '👋', title: 'Chào hỏi tiếng Nhật', desc: 'Luyện các câu chào hỏi thông dụng' },
            { icon: '🎮', title: 'Trò chơi nhanh', desc: 'Word association, quick quiz' },
            { icon: '📝', title: 'Review bài trước', desc: 'Rapid-fire questions' }
        ];
        // ========== HELPER COMPONENTS ==========
        
        // Toast Component
        const Toast = ({ toast, onClose }) => {
            useEffect(() => {
                const timer = setTimeout(() => onClose(toast.id), 4000);
                return () => clearTimeout(timer);
            }, [toast.id, onClose]);

            const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
            return (
                <div className={`toast ${toast.type}`}>
                    <span className="toast-icon">{icons[toast.type]}</span>
                    <div className="toast-content">
                        <div className="toast-title">{toast.title}</div>
                        {toast.message && <div className="toast-message">{toast.message}</div>}
                    </div>
                    <button className="toast-close" onClick={() => onClose(toast.id)}>×</button>
                </div>
            );
        };

        // Evaluation Modal Component
        const EvaluationModal = ({ student, vocab, onRate, onClose }) => {
            const [selectedIssues, setSelectedIssues] = useState([]);
            const [note, setNote] = useState('');

            const toggleIssue = (issue) => {
                setSelectedIssues(prev => prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev, issue]);
            };

            const handleRate = (rating) => {
                onRate({ rating, issues: selectedIssues, note });
            };

            useEffect(() => {
                const handleKey = (e) => {
                    if (e.key === 'Escape') onClose();
                    if (['1', '2', '3', '4'].includes(e.key)) {
                        const rating = RATINGS[parseInt(e.key) - 1];
                        if (rating) handleRate(rating);
                    }
                };
                window.addEventListener('keydown', handleKey);
                return () => window.removeEventListener('keydown', handleKey);
            }, [selectedIssues, note]);

            return (
                <div className="modal-overlay" onClick={onClose}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-avatar">{student?.avatar}</div>
                            <div className="modal-info">
                                <div className="modal-student-name">{student?.name}</div>
                                <div className="modal-word-badge">📚 {vocab?.vietnamese}</div>
                            </div>
                        </div>
                        <div className="modal-body">
                            <div className="modal-title">⭐ Đánh Giá Phát Âm</div>
                            
                            <div style={{ marginBottom: 'var(--space-4)' }}>
                                <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>Vấn đề thường gặp:</div>
                                <div className="issues-grid">
                                    {COMMON_ISSUES.map(issue => (
                                        <span key={issue} className={`issue-chip ${selectedIssues.includes(issue) ? 'selected' : ''}`} onClick={() => toggleIssue(issue)}>{issue}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <textarea className="quick-note" placeholder="Ghi chú nhanh cho học viên..." rows="2" value={note} onChange={e => setNote(e.target.value)} />
                            
                            <div className="rating-grid">
                                {RATINGS.map(rating => (
                                    <button key={rating.id} className={`rating-btn ${rating.id}`} onClick={() => handleRate(rating)}>
                                        <div className="rating-icon">{rating.icon}</div>
                                        <div className="rating-label">{rating.label}</div>
                                        <div className="rating-range">{rating.range}</div>
                                        <div className="rating-key">Phím {rating.key}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-skip" onClick={onClose}>Bỏ qua (ESC)</button>
                        </div>
                    </div>
                </div>
            );
        };

        // Shortcuts Modal Component
        const ShortcutsModal = ({ onClose }) => (
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content shortcuts-modal" onClick={e => e.stopPropagation()}>
                    <div className="shortcuts-title">⌨️ Phím Tắt</div>
                    <div className="shortcuts-body">
                        {SHORTCUTS.map(section => (
                            <div key={section.section} className="shortcuts-section">
                                <div className="shortcuts-section-title">{section.section}</div>
                                {section.shortcuts.map((shortcut, idx) => (
                                    <div key={idx} className="shortcut-row">
                                        <div className="shortcut-keys">
                                            {shortcut.keys.map(key => <span key={key} className="shortcut-key">{key}</span>)}
                                        </div>
                                        <div className="shortcut-desc">{shortcut.desc}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

        // Mini Dashboard Component
        const MiniDashboard = ({ stats }) => (
            <div className="mini-dashboard">
                <div className="dashboard-card">
                    <div className="dashboard-icon primary">📚</div>
                    <div className="dashboard-content">
                        <div className="dashboard-value">{stats.completedVocab}/{stats.totalVocab}</div>
                        <div className="dashboard-label">Từ hoàn thành</div>
                        <div className={`dashboard-trend ${stats.completedVocab > 0 ? 'up' : ''}`}>
                            {stats.completedVocab > 0 ? '↑ Đang tiến bộ' : '○ Chưa bắt đầu'}
                        </div>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="dashboard-icon success">🎤</div>
                    <div className="dashboard-content">
                        <div className="dashboard-value">{stats.totalCalls}</div>
                        <div className="dashboard-label">Lượt gọi</div>
                        <div className={`dashboard-trend ${stats.totalCalls >= 10 ? 'up' : ''}`}>
                            {stats.totalCalls >= 10 ? '✓ Tích cực' : '○ Cần gọi thêm'}
                        </div>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="dashboard-icon warning">⭐</div>
                    <div className="dashboard-content">
                        <div className={`dashboard-value ${stats.avgScore >= 80 ? 'good' : stats.avgScore >= 60 ? 'medium' : 'weak'}`}>{stats.avgScore}%</div>
                        <div className="dashboard-label">Điểm TB</div>
                        <div className={`dashboard-trend ${stats.avgScore >= 80 ? 'up' : 'down'}`}>
                            {stats.avgScore >= 80 ? '★ Xuất sắc' : stats.avgScore >= 60 ? '◐ Khá' : '↓ Cần cải thiện'}
                        </div>
                    </div>
                </div>
                <div className="dashboard-card">
                    <div className="dashboard-icon accent">⏱️</div>
                    <div className="dashboard-content">
                        <div className="dashboard-value">{stats.timeSpent}</div>
                        <div className="dashboard-label">Phút đã học</div>
                        <div className="dashboard-trend">📈 Thời gian thực</div>
                    </div>
                </div>
            </div>
        );

        // Audio Controls Component
        const AudioControls = ({ speech }) => (
            <div className="audio-controls">
                <div className="audio-group">
                    <span className="audio-label">Tốc độ:</span>
                    <div className="speed-btns">
                        {[0.7, 0.8, 0.9, 1.0, 1.2].map(s => (
                            <button key={s} className={`speed-btn ${speech.speed === s ? 'active' : ''}`} onClick={() => speech.setSpeed(s)}>{s}x</button>
                        ))}
                    </div>
                </div>
                <div className="audio-group">
                    <span className="audio-label">Âm lượng:</span>
                    <div className="volume-control">
                        <button className={`volume-btn ${speech.isMuted ? 'muted' : ''}`} onClick={speech.toggleMute}>{speech.isMuted ? '🔇' : '🔊'}</button>
                        <input type="range" className="volume-slider" min="0" max="1" step="0.1" value={speech.volume} onChange={e => speech.setVolume(parseFloat(e.target.value))} disabled={speech.isMuted} />
                    </div>
                </div>
                {!speech.hasJapaneseVoice && (
                    <div className="audio-warning">⚠️ Không tìm thấy giọng Nhật. Vui lòng cài đặt thêm.</div>
                )}
            </div>
        );

        // ChopChep Flow Indicator
        const FlowIndicator = ({ currentStep, completedSteps = [] }) => (
            <div className="flow-indicator">
                {CHOPCHEP_STEPS.map((step, idx) => {
                    const isActive = step.num === currentStep;
                    const isCompleted = completedSteps.includes(step.num) || step.num < currentStep;
                    return (
                        <React.Fragment key={step.num}>
                            <div className={`flow-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} title={step.desc}>
                                <div className="step-num">{isCompleted && !isActive ? '✓' : step.num}</div>
                                <div className="step-icon">{step.icon}</div>
                                <div className="step-label">{step.label}</div>
                            </div>
                            {idx < CHOPCHEP_STEPS.length - 1 && <span className="flow-arrow">→</span>}
                        </React.Fragment>
                    );
                })}
            </div>
        );

        // ========== VOCAB CARD COMPONENT - NÂNG CẤP CHOPCHEP ==========
        const VocabCard = ({ vocab, state, onAction, speech, isActive }) => {
            const {
                currentStep = 1,
                isRevealed = false,
                teacherPlayCount = 0,
                classPlayCount = 0,
                isPlaying = false,
                assignedStudent = null,
                rating = null,
                isConfirmed = false
            } = state || {};

            const getStatusText = () => {
                if (isConfirmed) return { text: 'Hoàn thành', class: 'completed' };
                if (isActive) return { text: 'Đang học', class: 'active' };
                return { text: 'Chờ học', class: 'pending' };
            };

            const getSmartButtonConfig = () => {
                if (isConfirmed) return { label: 'Đã hoàn thành', icon: '✅', action: 'done', class: 'done' };
                if (currentStep === 1) return { label: 'Gọi học viên', icon: '🎤', action: 'call', class: 'call', shortcut: 'C' };
                if (currentStep === 2 || currentStep === 3) return { label: 'Chờ đánh giá...', icon: '⏳', action: 'wait', class: 'call' };
                if (currentStep === 4 && teacherPlayCount < 5) return { label: `Thầy phát (${teacherPlayCount}/5)`, icon: '🔊', action: 'teacherPlay', class: 'play', shortcut: 'P' };
                if (currentStep === 5 || (currentStep === 4 && teacherPlayCount >= 5)) return { label: `Cả lớp lặp (${classPlayCount}/5)`, icon: '👥', action: 'classRepeat', class: 'repeat', shortcut: 'R' };
                if (currentStep === 6 || (currentStep === 5 && classPlayCount >= 5)) return { label: 'Xác nhận hoàn thành', icon: '✓', action: 'confirm', class: 'confirm', shortcut: 'Enter' };
                return { label: 'Tiếp tục', icon: '→', action: 'next', class: 'call' };
            };

            const status = getStatusText();
            const btnConfig = getSmartButtonConfig();

            const handlePlayExample = () => {
                if (vocab.exampleSentence?.jp) {
                    speech.speak(vocab.exampleSentence.jp, { rate: 0.9 });
                }
            };

            return (
                <div className={`vocab-card ${isActive ? 'active' : ''} ${isConfirmed ? 'completed' : ''} ${isPlaying ? 'speaking' : ''}`}>
                    {/* Card Header */}
                    <div className="vocab-card-header">
                        <div className="vocab-number">{vocab.id}</div>
                        <div className={`vocab-status ${status.class}`}>
                            {status.class === 'active' && <span style={{ marginRight: '4px' }}>●</span>}
                            {status.text}
                        </div>
                    </div>

                    {/* Vietnamese Section */}
                    <div className="vocab-vn-section">
                        <div className="vocab-vn-flag">🇻🇳 Tiếng Việt</div>
                        <div className="vocab-vn-text">{vocab.vietnamese}</div>
                        <div className="vocab-vn-hint">💡 {vocab.hint}</div>
                        
                        {/* VÍ DỤ CỤM TỪ - PHẦN QUAN TRỌNG */}
                        {vocab.examples && vocab.examples.length > 0 && (
                            <div className="vocab-examples">
                                <div className="vocab-examples-header">
                                    <span className="vocab-examples-title">📌 Ví dụ cụm từ</span>
                                    <span className="vocab-examples-count">{vocab.examples.length} cụm từ</span>
                                </div>
                                <div className="vocab-example-list">
                                    {vocab.examples.map((ex, idx) => (
                                        <div key={idx} className="vocab-example-item">{ex}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Assigned Student */}
                        {assignedStudent && (
                            <div className="vocab-assigned">
                                <div className="vocab-assigned-avatar">{assignedStudent.avatar}</div>
                                <div className="vocab-assigned-info">
                                    <div className="vocab-assigned-name">{assignedStudent.name}</div>
                                    <div className="vocab-assigned-time">Vừa trả lời</div>
                                </div>
                                {rating && <div className="vocab-assigned-rating">{rating.icon}</div>}
                            </div>
                        )}
                    </div>

                    {/* Japanese Section */}
                    <div className="vocab-jp-section">
                        {!isRevealed ? (
                            <div className="vocab-jp-locked">
                                <div className="vocab-jp-locked-icon">🔒</div>
                                <div className="vocab-jp-locked-text">Phần tiếng Nhật đang ẩn</div>
                                <div className="vocab-jp-locked-hint">Đánh giá học viên để mở khóa</div>
                            </div>
                        ) : (
                            <div className="vocab-jp-revealed">
                                <div className="vocab-jp-kanji">{vocab.kanji}</div>
                                <div className="vocab-jp-hiragana">{vocab.hiragana}</div>
                                <div className="vocab-jp-romaji">{vocab.romaji}</div>
                                
                                {/* CÂU VÍ DỤ TIẾNG NHẬT */}
                                {vocab.exampleSentence && (
                                    <div className="vocab-jp-example">
                                        <div className="vocab-jp-example-jp">{vocab.exampleSentence.jp}</div>
                                        <div className="vocab-jp-example-vn">{vocab.exampleSentence.vn}</div>
                                        <button className="vocab-jp-example-audio" onClick={handlePlayExample}>
                                            🔊 Nghe câu ví dụ
                                        </button>
                                    </div>
                                )}

                                {/* Play Counters - LẶP LẠI 5 LẦN */}
                                <div className="vocab-play-counters">
                                    <div className="counter-group">
                                        <div className="counter-label">🔊 Thầy phát</div>
                                        <div className="counter-dots">
                                            {[1,2,3,4,5].map(n => (
                                                <div key={n} className={`counter-dot ${n <= teacherPlayCount ? 'filled' : ''} ${n === teacherPlayCount + 1 && isPlaying && currentStep === 4 ? 'active' : ''}`} />
                                            ))}
                                        </div>
                                        <div className="counter-progress">{teacherPlayCount}/5 lần</div>
                                    </div>
                                    <div className="counter-group">
                                        <div className="counter-label">👥 Cả lớp lặp</div>
                                        <div className="counter-dots">
                                            {[1,2,3,4,5].map(n => (
                                                <div key={n} className={`counter-dot ${n <= classPlayCount ? 'filled' : ''} ${n === classPlayCount + 1 && isPlaying && currentStep === 5 ? 'active' : ''}`} />
                                            ))}
                                        </div>
                                        <div className="counter-progress">{classPlayCount}/5 lần</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Smart Action Button */}
                    <button 
                        className={`vocab-action-btn ${btnConfig.class}`}
                        onClick={() => onAction(vocab.id, btnConfig.action)}
                        disabled={btnConfig.action === 'done' || btnConfig.action === 'wait'}
                    >
                        <span className="vocab-action-btn-icon">{btnConfig.icon}</span>
                        <span>{btnConfig.label}</span>
                        {btnConfig.shortcut && <span className="vocab-action-btn-shortcut">{btnConfig.shortcut}</span>}
                    </button>
                </div>
            );
        };

        // ========== STUDENT PANEL COMPONENT ==========
        const StudentPanel = ({ students, studentsData, selectedStudent, setSelectedStudent, speakingStudent, onRandomPick, onCallStudent, collapsed, setCollapsed }) => {
            const [filter, setFilter] = useState('all');
            const [sortBy, setSortBy] = useState('rank');

            const filteredStudents = useMemo(() => {
                let result = [...students];
                
                // Filter
                if (filter === 'online') result = result.filter(s => s.status === 'online');
                else if (filter === 'weak') result = result.filter(s => s.activeScore < 60);
                else if (filter === 'notCalled') result = result.filter(s => !studentsData[s.id]?.callCount);
                
                // Sort
                if (sortBy === 'rank') result.sort((a, b) => a.rank - b.rank);
                else if (sortBy === 'score') result.sort((a, b) => b.activeScore - a.activeScore);
                else if (sortBy === 'calls') result.sort((a, b) => (studentsData[b.id]?.callCount || 0) - (studentsData[a.id]?.callCount || 0));
                
                return result;
            }, [students, studentsData, filter, sortBy]);

            const onlineCount = students.filter(s => s.status === 'online').length;
            const weakStudents = students.filter(s => s.activeScore < 60);
            const notCalledStudents = students.filter(s => !studentsData[s.id]?.callCount);

            // AI Suggestion
            const suggestedStudent = useMemo(() => {
                const online = students.filter(s => s.status === 'online');
                const notCalled = online.filter(s => !studentsData[s.id]?.callCount);
                if (notCalled.length > 0) return { student: notCalled[0], reason: 'Chưa được gọi' };
                const weak = online.filter(s => s.activeScore < 60);
                if (weak.length > 0) return { student: weak[0], reason: 'Cần hỗ trợ thêm' };
                return { student: online[Math.floor(Math.random() * online.length)], reason: 'Gọi ngẫu nhiên' };
            }, [students, studentsData]);

            const getScoreClass = (score) => score >= 80 ? 'good' : score >= 60 ? 'medium' : 'weak';
            const getRankBadge = (rank) => rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

            // Collapsed View
            if (collapsed) {
                return (
                    <aside className="student-panel collapsed">
                        <div className="collapsed-panel">
                            <button className="collapsed-btn" onClick={() => setCollapsed(false)} title="Mở rộng">◀️</button>
                            <button className="collapsed-btn" onClick={() => onRandomPick('random')} title="Gọi ngẫu nhiên">🎲</button>
                            <button className="collapsed-btn" onClick={() => onRandomPick('weak')} title="Gọi HV yếu">🎯</button>
                            <div className="collapsed-count">{onlineCount} online</div>
                            <div className="collapsed-avatars">
                                {weakStudents.slice(0, 3).map(s => (
                                    <div key={s.id} className="collapsed-avatar weak" onClick={() => onCallStudent(s)} title={`${s.name} - Yếu`}>{s.avatar}</div>
                                ))}
                            </div>
                        </div>
                    </aside>
                );
            }

            return (
                <aside className="student-panel">
                    {/* Header */}
                    <div className="panel-header">
                        <div className="panel-title">👥 Học Viên <span className="panel-count">{onlineCount}/{students.length}</span></div>
                        <button className="panel-toggle" onClick={() => setCollapsed(true)}>▶️</button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="filter-tabs">
                        <button className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất cả ({students.length})</button>
                        <button className={`filter-tab ${filter === 'online' ? 'active' : ''}`} onClick={() => setFilter('online')}>Online ({onlineCount})</button>
                        <button className={`filter-tab ${filter === 'notCalled' ? 'active' : ''}`} onClick={() => setFilter('notCalled')}>Chưa gọi ({notCalledStudents.length})</button>
                        <button className={`filter-tab ${filter === 'weak' ? 'active' : ''}`} onClick={() => setFilter('weak')}>Yếu ({weakStudents.length})</button>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <button className="quick-btn" onClick={() => onRandomPick('random')}><span className="quick-btn-icon">🎲</span>Ngẫu nhiên</button>
                        <button className="quick-btn" onClick={() => onRandomPick('weak')}><span className="quick-btn-icon">🎯</span>HV Yếu</button>
                        <button className="quick-btn" onClick={() => onRandomPick('notCalled')}><span className="quick-btn-icon">📢</span>Chưa gọi</button>
                    </div>

                    {/* AI Suggestion */}
                    {suggestedStudent.student && (
                        <div className="ai-suggestion">
                            <div className="ai-suggestion-header">
                                <span className="ai-suggestion-icon">🤖</span>
                                <span className="ai-suggestion-title">Gợi ý AI</span>
                            </div>
                            <div className="ai-suggestion-content">
                                <strong>{suggestedStudent.student.name}</strong> - {suggestedStudent.reason}
                            </div>
                            <button className="ai-suggestion-btn" onClick={() => onCallStudent(suggestedStudent.student)}>
                                🎤 Gọi học viên này
                            </button>
                        </div>
                    )}

                    {/* Student List */}
                    <div className="student-list thin-scrollbar">
                        {filteredStudents.map(student => {
                            const data = studentsData[student.id] || { callCount: 0, history: [] };
                            const isSelected = selectedStudent?.id === student.id;
                            const isSpeaking = speakingStudent?.id === student.id;
                            const isWeak = student.activeScore < 60;
                            const notCalled = !data.callCount;

                            return (
                                <div 
                                    key={student.id} 
                                    className={`student-card ${isSelected ? 'selected' : ''} ${isSpeaking ? 'speaking' : ''} ${isWeak ? 'weak' : ''} ${notCalled ? 'not-called' : ''}`}
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    {/* Called Badge */}
                                    {data.callCount > 0 ? (
                                        <span className="called-badge called">✓ {data.callCount}x</span>
                                    ) : (
                                        <span className="called-badge not-called">Chưa gọi</span>
                                    )}

                                    {/* Main Info */}
                                    <div className="student-main">
                                        <div className="student-avatar">
                                            {student.avatar}
                                            <span className={`student-status-dot ${student.status}`}></span>
                                        </div>
                                        <div className="student-info">
                                            <div className="student-name">
                                                {student.name}
                                                {getRankBadge(student.rank) && <span className="student-rank">{getRankBadge(student.rank)}</span>}
                                            </div>
                                            <div className="student-status-text">
                                                {student.status === 'online' ? '● Trực tuyến' : student.status === 'away' ? '○ Tạm vắng' : '○ Ngoại tuyến'}
                                            </div>
                                        </div>
                                        <div className="student-icons">
                                            <span className={student.micOn ? 'on' : 'off'}>🎤</span>
                                            <span className={student.cameraOn ? 'on' : 'off'}>📹</span>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="student-metrics">
                                        <div className="metric">
                                            <div className={`metric-value ${getScoreClass(student.activeScore)}`}>{student.activeScore}%</div>
                                            <div className="metric-label">Tích Cực</div>
                                        </div>
                                        <div className="metric">
                                            <div className={`metric-value ${getScoreClass(student.pronunciationScore)}`}>{student.pronunciationScore}%</div>
                                            <div className="metric-label">Phát Âm</div>
                                        </div>
                                        <div className="metric">
                                            <div className={`metric-value ${getScoreClass(student.testScore)}`}>{student.testScore}%</div>
                                            <div className="metric-label">Bài Test</div>
                                        </div>
                                    </div>

                                    {/* History */}
                                    {data.history && data.history.length > 0 && (
                                        <div className="student-history">
                                            {data.history.slice(-2).map((h, idx) => (
                                                <div key={idx} className="history-item">
                                                    <span className="history-word">{h.word}</span>
                                                    <span className="history-rating">{h.rating}</span>
                                                    <span>{h.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </aside>
            );
        };

        // ========== EXTENDED TOOL COMPONENTS ==========

        // Warmup Tool Component
        const WarmupTool = ({ speech, addToast }) => {
            const [currentGreeting, setCurrentGreeting] = useState(0);
            
            const handleGreeting = () => {
                const greeting = warmupGreetings[currentGreeting];
                speech.speak(greeting.jp);
                addToast({ type: 'info', title: '🎯 Chào hỏi', message: greeting.vn });
            };

            const nextGreeting = () => {
                setCurrentGreeting((currentGreeting + 1) % warmupGreetings.length);
            };

            return (
                <div className="warmup-container content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--gradient-warmup)', color: 'white' }}>Giai đoạn 1</span>
                            <h2 className="section-title">🎯 Khởi Động - Phá Băng</h2>
                            <p className="section-subtitle">Tạo không khí thoải mái, học viên "vào flow" - Target: 100% mở miệng ít nhất 1 lần</p>
                        </div>
                    </div>

                    <div className="warmup-greeting">
                        <div className="warmup-greeting-jp">{warmupGreetings[currentGreeting].jp}</div>
                        <div className="warmup-greeting-vn">{warmupGreetings[currentGreeting].vn}</div>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginTop: 'var(--space-5)' }}>
                            <button className="rapid-btn start" onClick={handleGreeting}>🔊 Phát âm</button>
                            <button className="rapid-btn next" onClick={nextGreeting}>→ Câu tiếp</button>
                        </div>
                    </div>

                    <div className="warmup-activities">
                        {warmupActivities.map((act, idx) => (
                            <div key={idx} className="warmup-activity">
                                <div className="warmup-activity-icon">{act.icon}</div>
                                <div className="warmup-activity-title">{act.title}</div>
                                <div className="warmup-activity-desc">{act.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        // Grammar Tool Component
        const GrammarTool = ({ speech, addToast }) => {
            const navigate = useNavigate();

            const handlePlayExample = (jp) => {
                speech.speak(jp);
                addToast({ type: 'success', title: '🔊 Đang phát', message: 'Nghe và lặp lại theo' });
            };

            return (
                <div className="content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--tool-grammar)' }}>CHECK</span>
                            <h2 className="section-title">📐 Ngữ Pháp - Mẫu Câu</h2>

                            <button
                                className="grammar-library-btn"
                                onClick={() => navigate('/grammar-library')}
                                title="Xem thư viện ngữ pháp N5, N4"
                            >
                                📚 Thư Viện
                                <span className="badge">2 bài</span>
                            </button>

                            <p className="section-subtitle">6 mẫu câu thông dụng khi mua sắm - Target: 80%+ học viên làm đúng cấu trúc</p>
                        </div>
                        <div className="canvas-stats">
                            <span className="stat-badge info">📐 6 Mẫu câu</span>
                            <span className="stat-badge success">✓ Check + Giảng</span>
                        </div>
                    </div>

                    <div className="grammar-grid">
                        {grammarData.map(grammar => (
                            <div key={grammar.id} className="grammar-card">
                                <div className="grammar-header">
                                    <div className="grammar-pattern">{grammar.pattern}</div>
                                    <div className="grammar-meaning">{grammar.meaning}</div>
                                </div>
                                <div className="grammar-body">
                                    <div className="grammar-structure">{grammar.structure}</div>
                                    <div className="grammar-explanation">💡 {grammar.explanation}</div>
                                    <div className="grammar-examples">
                                        {grammar.examples.map((ex, idx) => (
                                            <div key={idx} className="grammar-example">
                                                <div className="grammar-example-jp">{ex.jp}</div>
                                                <div className="grammar-example-vn">{ex.vn}</div>
                                                <button className="grammar-example-audio" onClick={() => handlePlayExample(ex.jp)}>
                                                    🔊 Nghe
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        // Rapid Fire Tool Component
        const RapidFireTool = ({ speech, addToast }) => {
            const [gameState, setGameState] = useState('idle'); // idle, countdown, playing, finished
            const [currentQ, setCurrentQ] = useState(0);
            const [showAnswer, setShowAnswer] = useState(false);
            const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0 });
            const [countdown, setCountdown] = useState(3);
            const [timePerQ, setTimePerQ] = useState(5);
            const [questionTimer, setQuestionTimer] = useState(5);
            const [shuffledQuestions, setShuffledQuestions] = useState([]);

            useEffect(() => {
                if (gameState === 'countdown' && countdown > 0) {
                    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                    return () => clearTimeout(timer);
                }
                if (gameState === 'countdown' && countdown === 0) {
                    setGameState('playing');
                    setQuestionTimer(timePerQ);
                }
            }, [gameState, countdown, timePerQ]);

            useEffect(() => {
                if (gameState === 'playing' && !showAnswer && questionTimer > 0) {
                    const timer = setTimeout(() => setQuestionTimer(questionTimer - 1), 1000);
                    return () => clearTimeout(timer);
                }
            }, [gameState, showAnswer, questionTimer]);

            const startGame = () => {
                const shuffled = [...rapidFireData].sort(() => Math.random() - 0.5);
                setShuffledQuestions(shuffled);
                setCurrentQ(0);
                setShowAnswer(false);
                setStats({ correct: 0, wrong: 0, total: 0 });
                setCountdown(3);
                setGameState('countdown');
            };

            const revealAnswer = () => {
                setShowAnswer(true);
                if (shuffledQuestions[currentQ]) {
                    speech.speak(shuffledQuestions[currentQ].type === 'jp' ? shuffledQuestions[currentQ].q : shuffledQuestions[currentQ].a.split(' ')[0]);
                }
            };

            const markAnswer = (isCorrect) => {
                setStats(prev => ({
                    correct: prev.correct + (isCorrect ? 1 : 0),
                    wrong: prev.wrong + (isCorrect ? 0 : 1),
                    total: prev.total + 1
                }));
                addToast({ type: isCorrect ? 'success' : 'error', title: isCorrect ? '✓ Chính xác!' : '✗ Sai rồi' });
                nextQuestion();
            };

            const nextQuestion = () => {
                if (currentQ < shuffledQuestions.length - 1) {
                    setCurrentQ(currentQ + 1);
                    setShowAnswer(false);
                    setQuestionTimer(timePerQ);
                } else {
                    setGameState('finished');
                }
            };

            const currentQuestion = shuffledQuestions[currentQ];

            return (
                <div className="rapid-container content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--gradient-drill)', color: 'white' }}>DRILL</span>
                            <h2 className="section-title">⚡ Rapid Fire - Luyện Phản Xạ</h2>
                            <p className="section-subtitle">Trả lời nhanh để tăng tốc độ phản xạ ngôn ngữ - Target: 3-5 câu/học viên</p>
                        </div>
                    </div>

                    {gameState === 'idle' && (
                        <>
                            <div className="rapid-settings">
                                <div className="rapid-setting">
                                    <span className="rapid-setting-label">⏱️ Thời gian/câu:</span>
                                    <select value={timePerQ} onChange={e => setTimePerQ(parseInt(e.target.value))}>
                                        <option value="3">3 giây</option>
                                        <option value="5">5 giây</option>
                                        <option value="8">8 giây</option>
                                        <option value="10">10 giây</option>
                                    </select>
                                </div>
                                <div className="rapid-setting">
                                    <span className="rapid-setting-label">📊 Số câu:</span>
                                    <span style={{ fontWeight: '700' }}>{rapidFireData.length} câu</span>
                                </div>
                            </div>
                            <div className="rapid-display">
                                <div className="rapid-question">🎮 Sẵn sàng chưa?</div>
                            </div>
                            <div className="rapid-controls">
                                <button className="rapid-btn start" onClick={startGame}>🚀 Bắt Đầu Game</button>
                            </div>
                        </>
                    )}

                    {gameState === 'countdown' && (
                        <div className="rapid-display">
                            <div className="rapid-countdown">{countdown}</div>
                        </div>
                    )}

                    {gameState === 'playing' && currentQuestion && (
                        <>
                            <div className="rapid-display">
                                <div className={`rapid-timer ${questionTimer <= 2 ? 'danger' : ''}`}>⏱️ {questionTimer}s</div>
                                <div className={`rapid-question ${currentQuestion.type === 'jp' ? 'jp' : ''}`}>{currentQuestion.q}</div>
                                {showAnswer && <div className="rapid-answer">→ {currentQuestion.a}</div>}
                            </div>
                            <div className="rapid-controls">
                                {!showAnswer ? (
                                    <button className="rapid-btn reveal" onClick={revealAnswer}>👁️ Hiện đáp án</button>
                                ) : (
                                    <>
                                        <button className="rapid-btn correct" onClick={() => markAnswer(true)}>✓ Đúng</button>
                                        <button className="rapid-btn wrong" onClick={() => markAnswer(false)}>✗ Sai</button>
                                    </>
                                )}
                            </div>
                            <div style={{ textAlign: 'center', marginTop: 'var(--space-4)', color: 'var(--text-muted)' }}>
                                Câu {currentQ + 1}/{shuffledQuestions.length}
                            </div>
                        </>
                    )}

                    {gameState === 'finished' && (
                        <>
                            <div className="rapid-display">
                                <div className="rapid-question">🎉 Hoàn Thành!</div>
                            </div>
                            <div className="rapid-stats">
                                <div className="rapid-stat">
                                    <div className="rapid-stat-value correct">{stats.correct}</div>
                                    <div className="rapid-stat-label">✓ Đúng</div>
                                </div>
                                <div className="rapid-stat">
                                    <div className="rapid-stat-value wrong">{stats.wrong}</div>
                                    <div className="rapid-stat-label">✗ Sai</div>
                                </div>
                                <div className="rapid-stat">
                                    <div className="rapid-stat-value total">{Math.round(stats.correct / stats.total * 100) || 0}%</div>
                                    <div className="rapid-stat-label">Tỉ lệ</div>
                                </div>
                            </div>
                            <div className="rapid-controls" style={{ marginTop: 'var(--space-5)' }}>
                                <button className="rapid-btn start" onClick={startGame}>🔄 Chơi Lại</button>
                                <button className="rapid-btn next" onClick={() => setGameState('idle')}>✓ Kết Thúc</button>
                            </div>
                        </>
                    )}
                </div>
            );
        };

        // Roleplay Tool Component
        const RoleplayTool = ({ speech, addToast }) => {
            const [activeScenario, setActiveScenario] = useState(1);
            const scenario = roleplayData.find(s => s.id === activeScenario);

            const handlePlay = (jp, rate = 1.0) => {
                speech.speak(jp, { rate });
            };

            return (
                <div className="roleplay-container content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--gradient-practice)', color: 'white' }}>PRACTICE</span>
                            <h2 className="section-title">🎭 Đóng Vai - Thực Hành Hội Thoại</h2>
                            <p className="section-subtitle">4 tình huống thực tế - Target: 100% practice ít nhất 1 lần</p>
                        </div>
                    </div>

                    <div className="roleplay-scenarios">
                        {roleplayData.map(s => (
                            <button key={s.id} className={`scenario-tab ${activeScenario === s.id ? 'active' : ''}`} onClick={() => setActiveScenario(s.id)}>
                                <span>{s.icon}</span>
                                <span>{s.title}</span>
                            </button>
                        ))}
                    </div>

                    {scenario && (
                        <div className="roleplay-dialogue">
                            <div className="dialogue-header">
                                <div className="dialogue-title">{scenario.icon} {scenario.title}</div>
                            </div>
                            <div className="dialogue-context">📍 {scenario.context}</div>
                            <div className="dialogue-lines">
                                {scenario.dialogues.map((line, idx) => (
                                    <div key={idx} className={`dialogue-line ${line.role}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                                        <div className="dialogue-avatar">{line.role === 'customer' ? '🧑' : '👨‍💼'}</div>
                                        <div className="dialogue-content">
                                            <div className="dialogue-role">{line.role === 'customer' ? 'Khách hàng' : 'Nhân viên'}</div>
                                            <div className="dialogue-jp">{line.jp}</div>
                                            <div className="dialogue-vn">{line.vn}</div>
                                            <div className="dialogue-actions">
                                                <button className="dialogue-btn play" onClick={() => handlePlay(line.jp)}>🔊 Nghe</button>
                                                <button className="dialogue-btn slow" onClick={() => handlePlay(line.jp, 0.7)}>🐢 Chậm</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        // Quiz Tool Component
        const QuizTool = ({ addToast }) => {
            const [quizState, setQuizState] = useState('idle'); // idle, playing, result
            const [currentQ, setCurrentQ] = useState(0);
            const [selected, setSelected] = useState(null);
            const [answered, setAnswered] = useState(false);
            const [answers, setAnswers] = useState([]);
            const [timer, setTimer] = useState(15);

            useEffect(() => {
                if (quizState === 'playing' && !answered && timer > 0) {
                    const t = setTimeout(() => setTimer(timer - 1), 1000);
                    return () => clearTimeout(t);
                }
                if (timer === 0 && !answered) {
                    handleSubmit();
                }
            }, [quizState, answered, timer]);

            const startQuiz = () => {
                setQuizState('playing');
                setCurrentQ(0);
                setSelected(null);
                setAnswered(false);
                setAnswers([]);
                setTimer(15);
            };

            const handleSelect = (idx) => {
                if (!answered) setSelected(idx);
            };

            const handleSubmit = () => {
                const q = quizData[currentQ];
                const isCorrect = selected === q.correct;
                setAnswered(true);
                setAnswers([...answers, { q: currentQ, selected, correct: q.correct, isCorrect }]);
                addToast({ type: isCorrect ? 'success' : 'error', title: isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng!' });
            };

            const nextQuestion = () => {
                if (currentQ < quizData.length - 1) {
                    setCurrentQ(currentQ + 1);
                    setSelected(null);
                    setAnswered(false);
                    setTimer(15);
                } else {
                    setQuizState('result');
                }
            };

            const question = quizData[currentQ];
            const correctCount = answers.filter(a => a.isCorrect).length;
            const scorePercent = Math.round((correctCount / quizData.length) * 100);

            return (
                <div className="quiz-container content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--tool-quiz)' }}>DRILL</span>
                            <h2 className="section-title">❓ Quiz - Trắc Nghiệm</h2>
                            <p className="section-subtitle">10 câu hỏi kiểm tra - Target: 90%+ điểm trung bình</p>
                        </div>
                    </div>

                    {quizState === 'idle' && (
                        <div className="quiz-question-card" style={{ textAlign: 'center', padding: 'var(--space-10)' }}>
                            <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)' }}>📝</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: 'var(--space-4)' }}>Sẵn sàng làm Quiz?</div>
                            <div style={{ color: 'var(--text-tertiary)', marginBottom: 'var(--space-6)' }}>{quizData.length} câu hỏi • 15 giây/câu</div>
                            <button className="rapid-btn start" onClick={startQuiz}>🚀 Bắt Đầu</button>
                        </div>
                    )}

                    {quizState === 'playing' && question && (
                        <div className="quiz-question-card">
                            <div className="quiz-header">
                                <span className="quiz-question-num">Câu {currentQ + 1}/{quizData.length}</span>
                                <div className={`quiz-timer ${timer <= 5 ? 'danger' : ''}`}>
                                    ⏱️ {timer}s
                                    <div className="quiz-timer-bar">
                                        <div className="quiz-timer-fill" style={{ width: `${(timer / 15) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={`quiz-question-text ${question.type === 'reading' ? 'jp' : ''}`}>{question.q}</div>
                            <div className="quiz-options">
                                {question.options.map((opt, idx) => {
                                    let optClass = '';
                                    if (answered) {
                                        if (idx === question.correct) optClass = 'correct';
                                        else if (idx === selected) optClass = 'wrong';
                                        optClass += ' disabled';
                                    } else if (idx === selected) {
                                        optClass = 'selected';
                                    }
                                    return (
                                        <div key={idx} className={`quiz-option ${optClass}`} onClick={() => handleSelect(idx)}>
                                            <span className="quiz-option-letter">{['A', 'B', 'C', 'D'][idx]}</span>
                                            <span className={`quiz-option-text ${['reading', 'grammar'].includes(question.type) ? 'jp' : ''}`}>{opt}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            {!answered ? (
                                <button className="quiz-submit" onClick={handleSubmit} disabled={selected === null}>Xác Nhận</button>
                            ) : (
                                <button className="quiz-submit" onClick={nextQuestion}>{currentQ < quizData.length - 1 ? 'Câu Tiếp →' : 'Xem Kết Quả'}</button>
                            )}
                        </div>
                    )}

                    {quizState === 'result' && (
                        <div className="quiz-result">
                            <div className="quiz-result-icon">{scorePercent >= 90 ? '🏆' : scorePercent >= 70 ? '👍' : scorePercent >= 50 ? '💪' : '📚'}</div>
                            <div className={`quiz-result-score ${scorePercent >= 90 ? 'excellent' : scorePercent >= 70 ? 'good' : scorePercent >= 50 ? 'fair' : 'poor'}`}>{scorePercent}%</div>
                            <div className="quiz-result-label">
                                {scorePercent >= 90 ? 'Xuất sắc!' : scorePercent >= 70 ? 'Khá tốt!' : scorePercent >= 50 ? 'Cần cố gắng thêm!' : 'Hãy ôn lại bài nhé!'}
                            </div>
                            <div className="quiz-result-stats">
                                <div className="quiz-result-stat">
                                    <div className="quiz-result-stat-value" style={{ color: 'var(--success-600)' }}>{correctCount}</div>
                                    <div className="quiz-result-stat-label">Đúng</div>
                                </div>
                                <div className="quiz-result-stat">
                                    <div className="quiz-result-stat-value" style={{ color: 'var(--danger-600)' }}>{quizData.length - correctCount}</div>
                                    <div className="quiz-result-stat-label">Sai</div>
                                </div>
                                <div className="quiz-result-stat">
                                    <div className="quiz-result-stat-value" style={{ color: 'var(--info-600)' }}>{quizData.length}</div>
                                    <div className="quiz-result-stat-label">Tổng</div>
                                </div>
                            </div>
                            <button className="quiz-retry" onClick={startQuiz}>🔄 Làm Lại</button>
                        </div>
                    )}
                </div>
            );
        };

        // Situation Tool Component
        const SituationTool = ({ speech }) => {
            const [activeSituation, setActiveSituation] = useState(1);
            const situation = situationData.find(s => s.id === activeSituation);

            const handlePlay = (jp, rate = 1.0) => {
                speech.speak(jp, { rate });
            };

            return (
                <div className="situation-container content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--tool-situation)' }}>PRACTICE</span>
                            <h2 className="section-title">💬 Tình Huống Thực Tế</h2>
                            <p className="section-subtitle">Các cụm từ ứng dụng ngay - Target: 70%+ không cần dịch</p>
                        </div>
                    </div>

                    <div className="situation-tabs">
                        {situationData.map(s => (
                            <button key={s.id} className={`situation-tab ${activeSituation === s.id ? 'active' : ''}`} onClick={() => setActiveSituation(s.id)}>
                                <span>{s.icon}</span>
                                <span>{s.title}</span>
                            </button>
                        ))}
                    </div>

                    {situation && (
                        <>
                            <div className="dialogue-context" style={{ marginBottom: 'var(--space-5)' }}>📍 {situation.context}</div>
                            <div className="situation-phrases">
                                {situation.phrases.map((phrase, idx) => (
                                    <div key={idx} className="phrase-card">
                                        <div className="phrase-header">
                                            <div className="phrase-number">{idx + 1}</div>
                                            <div className="phrase-context">{phrase.note}</div>
                                        </div>
                                        <div className="phrase-jp">{phrase.jp}</div>
                                        <div className="phrase-romaji">{phrase.romaji}</div>
                                        <div className="phrase-vn">{phrase.vn}</div>
                                        <div className="phrase-actions">
                                            <button className="phrase-btn play" onClick={() => handlePlay(phrase.jp)}>🔊 Nghe</button>
                                            <button className="phrase-btn slow" onClick={() => handlePlay(phrase.jp, 0.7)}>🐢 Chậm</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            );
        };

        // Pronunciation Tool Component
        const PronunciationTool = ({ speech }) => {
            const [selectedWord, setSelectedWord] = useState(0);
            const [isRecording, setIsRecording] = useState(false);
            const words = vocabularyData.slice(0, 10);
            const word = words[selectedWord];

            const handleListen = (rate = 1.0) => {
                if (word) speech.speak(word.audioText, { rate });
            };

            const handleRecord = () => {
                setIsRecording(true);
                setTimeout(() => setIsRecording(false), 3000);
            };

            return (
                <div className="pronun-container content-section">
                    <div className="section-header">
                        <div className="section-title-area">
                            <span className="section-badge" style={{ background: 'var(--tool-pronun)' }}>DRILL</span>
                            <h2 className="section-title">🗣️ Luyện Phát Âm</h2>
                            <p className="section-subtitle">Nghe và lặp lại - Target: 90%+ phát âm chấp nhận được</p>
                        </div>
                    </div>

                    <div className="pronun-selector">
                        {words.map((w, idx) => (
                            <button key={w.id} className={`pronun-word-btn ${selectedWord === idx ? 'active' : ''}`} onClick={() => setSelectedWord(idx)}>
                                {w.kanji}
                            </button>
                        ))}
                    </div>

                    {word && (
                        <div className="pronun-display">
                            <div className="pronun-kanji">{word.kanji}</div>
                            <div className="pronun-hiragana">{word.hiragana}</div>
                            <div className="pronun-romaji">{word.romaji}</div>
                            <div className="pronun-meaning">{word.vietnamese}</div>
                            
                            {isRecording && (
                                <div className="pronun-waveform">
                                    {[1,2,3,4,5].map(n => (
                                        <div key={n} className="pronun-wave-bar" style={{ height: `${20 + Math.random() * 40}px`, animationDelay: `${n * 0.1}s` }}></div>
                                    ))}
                                </div>
                            )}

                            <div className="pronun-controls">
                                <button className="pronun-btn listen" onClick={() => handleListen(1.0)}>🔊 Nghe (1.0x)</button>
                                <button className="pronun-btn listen" onClick={() => handleListen(0.7)}>🐢 Chậm (0.7x)</button>
                                <button className={`pronun-btn record ${isRecording ? 'recording' : ''}`} onClick={handleRecord}>
                                    {isRecording ? '⏺️ Đang ghi...' : '🎤 Ghi âm'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        };

        // Placeholder Tool
        const PlaceholderTool = ({ title, icon, description }) => (
            <div className="content-section">
                <div className="placeholder-content">
                    <div className="placeholder-icon">{icon}</div>
                    <div className="placeholder-text">{title}</div>
                    <div className="placeholder-subtext">{description}</div>
                </div>
            </div>
        );

        


// ========== ADDITIONAL VOCABULARY DATA (10 từ thêm) ==========
const additionalVocabulary = [
    { 
        id: 16, vietnamese: 'Chất lượng', hint: 'Tốt hay xấu của sản phẩm',
        kanji: '品質', hiragana: 'ひんしつ', romaji: 'hinshitsu', audioText: 'ひんしつ',
        examples: ['Chất lượng cao', 'Đảm bảo chất lượng', 'Kiểm tra chất lượng', 'Chất lượng Nhật Bản'],
        exampleSentence: { jp: 'この製品は品質がいいです。', vn: 'Sản phẩm này chất lượng tốt.' }
    },
    { 
        id: 17, vietnamese: 'Đắt tiền', hint: 'Giá cao cấp, sang trọng',
        kanji: '高級', hiragana: 'こうきゅう', romaji: 'koukyuu', audioText: 'こうきゅう',
        examples: ['Hàng cao cấp', 'Nhà hàng cao cấp', 'Đồ hiệu cao cấp', 'Chất liệu cao cấp'],
        exampleSentence: { jp: '高級なブランドですね。', vn: 'Thương hiệu cao cấp nhỉ.' }
    },
    { 
        id: 18, vietnamese: 'Rẻ tiền', hint: 'Giá rẻ, bình dân',
        kanji: '安物', hiragana: 'やすもの', romaji: 'yasumono', audioText: 'やすもの',
        examples: ['Đồ rẻ tiền', 'Hàng bình dân', 'Giá phải chăng', 'Mua đồ rẻ'],
        exampleSentence: { jp: '安物買いの銭失い。', vn: 'Của rẻ là của ôi.' }
    },
    { 
        id: 19, vietnamese: 'Khuyến mãi', hint: 'Sale, giảm giá đặc biệt',
        kanji: 'セール', hiragana: 'セール', romaji: 'seeru', audioText: 'セール',
        examples: ['Đang khuyến mãi', 'Mùa khuyến mãi', 'Khuyến mãi lớn', 'Khuyến mãi cuối năm'],
        exampleSentence: { jp: 'セール中ですか。', vn: 'Có đang khuyến mãi không?' }
    },
    { 
        id: 20, vietnamese: 'Mặc cả', hint: 'Thương lượng giá',
        kanji: '値切る', hiragana: 'ねぎる', romaji: 'negiru', audioText: 'ねぎる',
        examples: ['Mặc cả giá', 'Trả giá', 'Thương lượng', 'Đàm phán giá'],
        exampleSentence: { jp: '値切ってもいいですか。', vn: 'Tôi mặc cả được không?' }
    },
    { 
        id: 21, vietnamese: 'Đặt hàng', hint: 'Order sản phẩm',
        kanji: '注文', hiragana: 'ちゅうもん', romaji: 'chuumon', audioText: 'ちゅうもん',
        examples: ['Đặt hàng online', 'Đơn đặt hàng', 'Đặt trước', 'Xác nhận đơn hàng'],
        exampleSentence: { jp: '注文してもいいですか。', vn: 'Tôi đặt hàng được không?' }
    },
    { 
        id: 22, vietnamese: 'Giao hàng', hint: 'Vận chuyển đến nhà',
        kanji: '配達', hiragana: 'はいたつ', romaji: 'haitatsu', audioText: 'はいたつ',
        examples: ['Giao hàng tận nơi', 'Phí giao hàng', 'Giao hàng miễn phí', 'Thời gian giao hàng'],
        exampleSentence: { jp: '配達できますか。', vn: 'Giao hàng được không?' }
    },
    { 
        id: 23, vietnamese: 'Bảo hành', hint: 'Warranty, cam kết sửa chữa',
        kanji: '保証', hiragana: 'ほしょう', romaji: 'hoshou', audioText: 'ほしょう',
        examples: ['Bảo hành 1 năm', 'Thẻ bảo hành', 'Bảo hành chính hãng', 'Hết bảo hành'],
        exampleSentence: { jp: '保証はありますか。', vn: 'Có bảo hành không?' }
    },
    { 
        id: 24, vietnamese: 'Đóng gói', hint: 'Bọc, gói sản phẩm',
        kanji: '包装', hiragana: 'ほうそう', romaji: 'housou', audioText: 'ほうそう',
        examples: ['Đóng gói quà tặng', 'Bao bì đẹp', 'Đóng gói cẩn thận', 'Hộp đóng gói'],
        exampleSentence: { jp: 'プレゼント用に包装してください。', vn: 'Gói quà tặng giúp tôi.' }
    },
    { 
        id: 25, vietnamese: 'Miễn thuế', hint: 'Tax free cho khách du lịch',
        kanji: '免税', hiragana: 'めんぜい', romaji: 'menzei', audioText: 'めんぜい',
        examples: ['Cửa hàng miễn thuế', 'Mua miễn thuế', 'Giá miễn thuế', 'Thủ tục miễn thuế'],
        exampleSentence: { jp: '免税できますか。', vn: 'Được miễn thuế không?' }
    }
];

// ========== ADDITIONAL QUIZ DATA (10 câu thêm) ==========
const additionalQuizData = [
    { q: '「品質」có nghĩa là gì?', options: ['Số lượng', 'Chất lượng', 'Giá cả', 'Kích cỡ'], correct: 1, type: 'vocab' },
    { q: 'Cách đọc của「注文」là?', options: ['ちゅうぶん', 'ちゅうもん', 'しゅうもん', 'じゅうもん'], correct: 1, type: 'reading' },
    { q: '「セール」nghĩa là?', options: ['Bán hàng', 'Mua hàng', 'Khuyến mãi', 'Đổi trả'], correct: 2, type: 'vocab' },
    { q: '配達できますか có nghĩa là?', options: ['Thanh toán được không?', 'Giao hàng được không?', 'Đổi được không?', 'Thử được không?'], correct: 1, type: 'grammar' },
    { q: '「高級」có nghĩa là?', options: ['Cao cấp', 'Cấp cao', 'Cao lớn', 'Cấp thấp'], correct: 0, type: 'vocab' },
    { q: 'Cách nói "Có bảo hành không?" bằng tiếng Nhật?', options: ['割引はありますか', '保証はありますか', 'サイズはありますか', '色はありますか'], correct: 1, type: 'grammar' },
    { q: '「免税」đọc là?', options: ['めんぜい', 'めんせい', 'みんぜい', 'ぶんぜい'], correct: 0, type: 'reading' },
    { q: '包装してください có nghĩa là?', options: ['Gói giúp tôi', 'Đổi giúp tôi', 'Mở giúp tôi', 'Đóng giúp tôi'], correct: 0, type: 'grammar' },
    { q: 'Từ nào nghĩa là "mặc cả"?', options: ['買う', '売る', '値切る', '返す'], correct: 2, type: 'vocab' },
    { q: '「安物」có nghĩa là?', options: ['Đồ an toàn', 'Đồ rẻ tiền', 'Đồ đắt tiền', 'Đồ cũ'], correct: 1, type: 'vocab' }
];

// ========== ADDITIONAL SITUATION DATA (2 tình huống thêm) ==========
const additionalSituationData = [
    { 
        id: 5, title: 'Online Shopping', icon: '💻', context: 'Khi mua hàng trực tuyến',
        phrases: [
            { jp: 'オンラインで買えますか。', romaji: 'Onrain de kaemasu ka.', vn: 'Mua online được không?', note: '💻 Online' },
            { jp: '送料はいくらですか。', romaji: 'Souryou wa ikura desu ka.', vn: 'Phí ship bao nhiêu?', note: '📦 Ship' },
            { jp: '何日で届きますか。', romaji: 'Nan nichi de todokimasu ka.', vn: 'Mấy ngày thì nhận được?', note: '📅 Thời gian' },
            { jp: 'キャンセルできますか。', romaji: 'Kyanseru dekimasu ka.', vn: 'Hủy đơn được không?', note: '❌ Hủy' },
            { jp: 'クーポンはありますか。', romaji: 'Kuupon wa arimasu ka.', vn: 'Có coupon không?', note: '🎟️ Coupon' }
        ]
    },
    { 
        id: 6, title: 'Bảo hành & Đổi trả', icon: '🔧', context: 'Khi có vấn đề với sản phẩm',
        phrases: [
            { jp: '壊れています。', romaji: 'Kowarete imasu.', vn: 'Bị hỏng rồi.', note: '💔 Hỏng' },
            { jp: '交換してください。', romaji: 'Koukan shite kudasai.', vn: 'Đổi cho tôi.', note: '🔄 Đổi' },
            { jp: '返金できますか。', romaji: 'Henkin dekimasu ka.', vn: 'Hoàn tiền được không?', note: '💰 Hoàn tiền' },
            { jp: '修理できますか。', romaji: 'Shuuri dekimasu ka.', vn: 'Sửa được không?', note: '🔧 Sửa' },
            { jp: '保証期間内です。', romaji: 'Hoshou kikan nai desu.', vn: 'Còn trong bảo hành.', note: '✅ Bảo hành' }
        ]
    }
];

// ========== ADDITIONAL ROLEPLAY DATA (2 tình huống thêm) ==========
const additionalRoleplayData = [
    { 
        id: 5, title: 'Tại cửa hàng điện tử', icon: '📱',
        context: 'Bạn đang mua điện thoại mới tại cửa hàng điện tử.',
        dialogues: [
            { role: 'customer', jp: 'すみません、新しいスマホを探しています。', vn: 'Xin lỗi, tôi đang tìm điện thoại mới.' },
            { role: 'staff', jp: 'どんな機能がほしいですか。', vn: 'Bạn muốn chức năng gì?' },
            { role: 'customer', jp: 'カメラがいいのがほしいです。', vn: 'Tôi muốn camera tốt.' },
            { role: 'staff', jp: 'こちらはカメラが優れています。', vn: 'Cái này camera xuất sắc.' },
            { role: 'customer', jp: '保証はありますか。', vn: 'Có bảo hành không?' },
            { role: 'staff', jp: 'はい、一年間の保証があります。', vn: 'Vâng, bảo hành 1 năm.' }
        ]
    },
    { 
        id: 6, title: 'Tại cửa hàng mỹ phẩm', icon: '💄',
        context: 'Bạn đang mua mỹ phẩm làm quà tặng.',
        dialogues: [
            { role: 'customer', jp: 'プレゼント用の化粧品を探しています。', vn: 'Tôi tìm mỹ phẩm làm quà tặng.' },
            { role: 'staff', jp: '誰へのプレゼントですか。', vn: 'Quà tặng cho ai ạ?' },
            { role: 'customer', jp: '母へのプレゼントです。', vn: 'Quà cho mẹ tôi.' },
            { role: 'staff', jp: 'この美容液はいかがですか。', vn: 'Serum này thì sao ạ?' },
            { role: 'customer', jp: 'いいですね。包装してもらえますか。', vn: 'Được đấy. Gói quà được không?' },
            { role: 'staff', jp: 'はい、プレゼント用に包装します。', vn: 'Vâng, sẽ gói thành quà tặng.' }
        ]
    }
];

// ========== LISTENING DATA (Bài nghe) ==========
const listeningData = [
    {
        id: 1,
        title: 'Tại cửa hàng quần áo',
        duration: '1:30',
        transcript: [
            { speaker: 'A', jp: 'いらっしゃいませ。何かお探しですか。', vn: 'Chào mừng quý khách. Quý khách tìm gì ạ?', time: '0:00' },
            { speaker: 'B', jp: 'はい、シャツを探しています。', vn: 'Vâng, tôi đang tìm áo sơ mi.', time: '0:05' },
            { speaker: 'A', jp: 'サイズは何ですか。', vn: 'Size bao nhiêu ạ?', time: '0:09' },
            { speaker: 'B', jp: 'Mサイズをお願いします。', vn: 'Cho tôi size M.', time: '0:12' },
            { speaker: 'A', jp: 'こちらはいかがですか。今セール中で、20%オフです。', vn: 'Cái này thì sao ạ? Đang sale 20% ạ.', time: '0:16' },
            { speaker: 'B', jp: '試着してもいいですか。', vn: 'Tôi thử được không?', time: '0:23' },
            { speaker: 'A', jp: 'はい、どうぞ。試着室はあちらです。', vn: 'Vâng, mời. Phòng thử đằng kia.', time: '0:26' }
        ],
        questions: [
            { q: 'Khách hàng đang tìm gì?', options: ['Quần', 'Áo sơ mi', 'Váy', 'Áo khoác'], correct: 1 },
            { q: 'Khách hàng muốn size gì?', options: ['S', 'M', 'L', 'XL'], correct: 1 },
            { q: 'Cửa hàng đang giảm giá bao nhiêu %?', options: ['10%', '15%', '20%', '30%'], correct: 2 }
        ]
    },
    {
        id: 2,
        title: 'Thanh toán tại siêu thị',
        duration: '1:15',
        transcript: [
            { speaker: 'A', jp: 'お会計は2500円になります。', vn: 'Tổng cộng 2500 yên ạ.', time: '0:00' },
            { speaker: 'B', jp: 'カードで払えますか。', vn: 'Trả bằng thẻ được không?', time: '0:04' },
            { speaker: 'A', jp: 'はい、大丈夫です。', vn: 'Vâng, được ạ.', time: '0:07' },
            { speaker: 'B', jp: '袋をください。', vn: 'Cho tôi túi.', time: '0:10' },
            { speaker: 'A', jp: '袋は一枚5円ですが、よろしいですか。', vn: 'Túi 5 yên một cái, được không ạ?', time: '0:13' },
            { speaker: 'B', jp: 'はい、お願いします。', vn: 'Vâng, cho tôi.', time: '0:18' },
            { speaker: 'A', jp: 'レシートはいりますか。', vn: 'Cần hóa đơn không ạ?', time: '0:21' },
            { speaker: 'B', jp: 'いいえ、結構です。', vn: 'Không, không cần.', time: '0:24' }
        ],
        questions: [
            { q: 'Tổng tiền là bao nhiêu?', options: ['2000 yên', '2500 yên', '3000 yên', '3500 yên'], correct: 1 },
            { q: 'Khách trả bằng gì?', options: ['Tiền mặt', 'Thẻ', 'Điểm tích lũy', 'Coupon'], correct: 1 },
            { q: 'Túi bao nhiêu tiền?', options: ['3 yên', '5 yên', '10 yên', 'Miễn phí'], correct: 1 }
        ]
    }
];

// ========== READING DATA (Bài đọc) ==========
const readingData = [
    {
        id: 1,
        title: 'Mua sắm ở Nhật Bản',
        level: 'N4',
        text: `日本で買い物をするのは楽しいです。デパートやショッピングモールには、いろいろな店があります。

服を買うときは、試着室で試着することができます。「試着してもいいですか」と聞いてください。

日本の店員さんはとても親切です。「いらっしゃいませ」と言って、お客さんを歓迎します。

買い物の後、「ありがとうございました」とお礼を言いましょう。`,
        translation: `Mua sắm ở Nhật rất vui. Trong các cửa hàng bách hóa và trung tâm mua sắm có nhiều loại cửa hàng.

Khi mua quần áo, bạn có thể thử trong phòng thử đồ. Hãy hỏi "Tôi thử được không?".

Nhân viên cửa hàng Nhật rất thân thiện. Họ nói "Chào mừng" để đón khách.

Sau khi mua sắm, hãy nói "Cảm ơn".`,
        vocabulary: [
            { word: '買い物', reading: 'かいもの', meaning: 'mua sắm' },
            { word: '楽しい', reading: 'たのしい', meaning: 'vui' },
            { word: '試着室', reading: 'しちゃくしつ', meaning: 'phòng thử đồ' },
            { word: '店員', reading: 'てんいん', meaning: 'nhân viên cửa hàng' },
            { word: '親切', reading: 'しんせつ', meaning: 'thân thiện' }
        ],
        questions: [
            { q: 'Mua sắm ở Nhật như thế nào?', options: ['Khó', 'Đắt', 'Vui', 'Chán'], correct: 2 },
            { q: 'Khi muốn thử đồ, nói gì?', options: ['いくらですか', '試着してもいいですか', 'これをください', 'ありがとう'], correct: 1 },
            { q: 'Nhân viên Nhật được mô tả thế nào?', options: ['Lạnh lùng', 'Thân thiện', 'Bận rộn', 'Im lặng'], correct: 1 }
        ]
    }
];

// ========== WRITING DATA (Bài viết) ==========
const writingData = {
    hiragana: {
        title: 'Luyện Hiragana',
        characters: [
            { char: 'あ', romaji: 'a', strokes: 3 },
            { char: 'い', romaji: 'i', strokes: 2 },
            { char: 'う', romaji: 'u', strokes: 2 },
            { char: 'え', romaji: 'e', strokes: 2 },
            { char: 'お', romaji: 'o', strokes: 3 },
            { char: 'か', romaji: 'ka', strokes: 3 },
            { char: 'き', romaji: 'ki', strokes: 4 },
            { char: 'く', romaji: 'ku', strokes: 1 },
            { char: 'け', romaji: 'ke', strokes: 3 },
            { char: 'こ', romaji: 'ko', strokes: 2 }
        ]
    },
    katakana: {
        title: 'Luyện Katakana',
        characters: [
            { char: 'ア', romaji: 'a', strokes: 2 },
            { char: 'イ', romaji: 'i', strokes: 2 },
            { char: 'ウ', romaji: 'u', strokes: 3 },
            { char: 'エ', romaji: 'e', strokes: 3 },
            { char: 'オ', romaji: 'o', strokes: 3 },
            { char: 'カ', romaji: 'ka', strokes: 2 },
            { char: 'キ', romaji: 'ki', strokes: 3 },
            { char: 'ク', romaji: 'ku', strokes: 2 },
            { char: 'ケ', romaji: 'ke', strokes: 3 },
            { char: 'コ', romaji: 'ko', strokes: 2 }
        ]
    },
    kanji: {
        title: 'Luyện Kanji N4',
        characters: [
            { char: '店', reading: 'みせ', meaning: 'cửa hàng', strokes: 8 },
            { char: '買', reading: 'かう', meaning: 'mua', strokes: 12 },
            { char: '売', reading: 'うる', meaning: 'bán', strokes: 7 },
            { char: '安', reading: 'やすい', meaning: 'rẻ', strokes: 6 },
            { char: '高', reading: 'たかい', meaning: 'cao/đắt', strokes: 10 },
            { char: '金', reading: 'かね', meaning: 'tiền', strokes: 8 },
            { char: '色', reading: 'いろ', meaning: 'màu', strokes: 6 },
            { char: '品', reading: 'しな', meaning: 'hàng hóa', strokes: 9 }
        ]
    }
};

// ========== CULTURE CORNER DATA ==========
const cultureData = [
    {
        id: 1,
        title: 'Văn hóa phục vụ Nhật Bản',
        icon: '🎎',
        content: `Ở Nhật, dịch vụ khách hàng rất được coi trọng. Nhân viên luôn cúi đầu chào khách với câu "いらっしゃいませ" (Irasshaimase - Chào mừng quý khách).

Điểm đặc biệt:
• Nhân viên dùng 2 tay khi đưa tiền thối và hóa đơn
• Luôn nói cảm ơn nhiều lần
• Đóng gói hàng rất cẩn thận và đẹp mắt
• Không có văn hóa tip (tiền boa)

Khách hàng Việt Nam nên:
• Nói "ありがとうございます" sau khi mua
• Không mặc cả ở các cửa hàng có giá niêm yết
• Xếp hàng trật tự khi thanh toán`,
        quiz: { q: 'Ở Nhật có văn hóa tip không?', a: 'Không', options: ['Có', 'Không', 'Tùy nơi'] }
    },
    {
        id: 2,
        title: 'Thuế tiêu dùng & Miễn thuế',
        icon: '💰',
        content: `Thuế tiêu dùng ở Nhật hiện là 10% (8% cho thực phẩm).

Miễn thuế (Tax-Free):
• Áp dụng cho khách du lịch nước ngoài
• Mua từ 5,000 yên trở lên (tại 1 cửa hàng/1 ngày)
• Cần xuất trình hộ chiếu
• Có biển "Tax-Free" ở cửa hàng

Cách xin miễn thuế:
1. Mua hàng đủ 5,000 yên
2. Đến quầy Tax-Free
3. Xuất trình hộ chiếu
4. Nhận lại tiền thuế hoặc trả giá đã trừ thuế`,
        quiz: { q: 'Mua bao nhiêu yên để được miễn thuế?', a: '5,000 yên', options: ['3,000 yên', '5,000 yên', '10,000 yên'] }
    }
];

console.log('Additional content loaded:', {
    additionalVocabulary: additionalVocabulary.length,
    additionalQuizData: additionalQuizData.length,
    additionalSituationData: additionalSituationData.length,
    additionalRoleplayData: additionalRoleplayData.length,
    listeningData: listeningData.length,
    readingData: readingData.length,
    cultureData: cultureData.length
});



// ========== ADDITIONAL COMPONENTS ==========

// Listening Tool Component - Full Implementation
const ListeningToolFull = ({ speech, addToast }) => {
    const [currentBai, setCurrentBai] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showTranscript, setShowTranscript] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [speed, setSpeed] = React.useState(1.0);
    const [answers, setAnswers] = React.useState({});
    const [showResults, setShowResults] = React.useState(false);
    
    const bai = listeningData[currentBai];
    
    const handlePlay = () => {
        setIsPlaying(!isPlaying);
        if (!isPlaying && bai) {
            // Simulate audio playing
            let prog = 0;
            const interval = setInterval(() => {
                prog += 1;
                setProgress(prog);
                if (prog >= 100) {
                    clearInterval(interval);
                    setIsPlaying(false);
                }
            }, 500);
        }
    };
    
    const handleAnswer = (qIdx, optIdx) => {
        setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    };
    
    const checkAnswers = () => {
        setShowResults(true);
        const correct = bai.questions.filter((q, i) => answers[i] === q.correct).length;
        addToast({ type: correct === bai.questions.length ? 'success' : 'info', 
                   title: `🎧 Kết quả: ${correct}/${bai.questions.length}` });
    };

    if (!bai) return null;

    return (
        <div className="listening-container content-section">
            <div className="section-header">
                <div className="section-title-area">
                    <span className="section-badge" style={{ background: 'var(--tool-listen)' }}>CHECK</span>
                    <h2 className="section-title">👂 Luyện Nghe</h2>
                    <p className="section-subtitle">Nghe và trả lời câu hỏi - Target: 70%+ hiểu ý chính</p>
                </div>
            </div>

            <div className="listening-player">
                <div className="listening-player-header">
                    <div className="listening-title">🎧 {bai.title}</div>
                    <div className="listening-duration">⏱️ {bai.duration}</div>
                </div>
                
                <div className="listening-waveform">
                    {Array(30).fill(0).map((_, i) => (
                        <div key={i} className="wave-bar" style={{ 
                            height: `${20 + Math.random() * 40}px`,
                            animationDelay: `${i * 0.05}s`,
                            opacity: isPlaying ? 1 : 0.3
                        }}></div>
                    ))}
                </div>
                
                <div className="listening-progress">
                    <div className="listening-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                
                <div className="listening-controls">
                    <button className="listening-btn control">⏮️</button>
                    <button className="listening-btn play" onClick={handlePlay}>
                        {isPlaying ? '⏸️' : '▶️'}
                    </button>
                    <button className="listening-btn control">⏭️</button>
                    <div className="listening-speed">
                        {[0.75, 1.0, 1.25].map(s => (
                            <button key={s} className={`listening-speed-btn ${speed === s ? 'active' : ''}`}
                                    onClick={() => setSpeed(s)}>{s}x</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="listening-transcript">
                <div className="listening-transcript-header">
                    <span className="listening-transcript-title">📝 Transcript</span>
                    <button className="listening-transcript-toggle" onClick={() => setShowTranscript(!showTranscript)}>
                        {showTranscript ? 'Ẩn' : 'Hiện'}
                    </button>
                </div>
                {showTranscript && (
                    <div>
                        {bai.transcript.map((line, idx) => (
                            <div key={idx} className="transcript-line">
                                <div className={`transcript-speaker ${line.speaker.toLowerCase()}`}>{line.speaker}</div>
                                <div className="transcript-content">
                                    <div className="transcript-jp">{line.jp}</div>
                                    <div className="transcript-vn">{line.vn}</div>
                                </div>
                                <div className="transcript-time">{line.time}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="listening-questions">
                <div className="listening-questions-title">❓ Câu hỏi</div>
                {bai.questions.map((q, qIdx) => (
                    <div key={qIdx} className="listening-question">
                        <div className="listening-question-text">{qIdx + 1}. {q.q}</div>
                        <div className="listening-options">
                            {q.options.map((opt, optIdx) => {
                                let cls = '';
                                if (showResults) {
                                    if (optIdx === q.correct) cls = 'correct';
                                    else if (answers[qIdx] === optIdx) cls = 'wrong';
                                } else if (answers[qIdx] === optIdx) {
                                    cls = 'selected';
                                }
                                return (
                                    <div key={optIdx} className={`listening-option ${cls}`}
                                         onClick={() => !showResults && handleAnswer(qIdx, optIdx)}>
                                        {opt}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {!showResults && Object.keys(answers).length === bai.questions.length && (
                    <button className="rapid-btn start" style={{ marginTop: 'var(--space-4)', width: '100%' }}
                            onClick={checkAnswers}>
                        ✓ Kiểm tra đáp án
                    </button>
                )}
            </div>
        </div>
    );
};

// Reading Tool Component - Full Implementation
const ReadingToolFull = ({ speech, addToast }) => {
    const [showTranslation, setShowTranslation] = React.useState(false);
    const [answers, setAnswers] = React.useState({});
    const [showResults, setShowResults] = React.useState(false);
    
    const reading = readingData[0];

    const handleAnswer = (qIdx, optIdx) => {
        setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    };

    const checkAnswers = () => {
        setShowResults(true);
        const correct = reading.questions.filter((q, i) => answers[i] === q.correct).length;
        addToast({ type: correct === reading.questions.length ? 'success' : 'info', 
                   title: `📖 Kết quả: ${correct}/${reading.questions.length}` });
    };

    return (
        <div className="reading-container content-section">
            <div className="section-header">
                <div className="section-title-area">
                    <span className="section-badge" style={{ background: 'var(--tool-reading)' }}>PRACTICE</span>
                    <h2 className="section-title">📖 Luyện Đọc</h2>
                    <p className="section-subtitle">Đọc hiểu văn bản - ChopChep reading method</p>
                </div>
            </div>

            <div className="reading-card">
                <div className="reading-card-header">
                    <div className="reading-card-title">{reading.title}</div>
                    <div className="reading-card-meta">
                        <span className="reading-level">{reading.level}</span>
                    </div>
                </div>
                
                <div className="reading-text-area">
                    <div className="reading-text" dangerouslySetInnerHTML={{ 
                        __html: reading.text.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') 
                    }} />
                    
                    <div className="reading-translation">
                        <div className="reading-translation-header">
                            🇻🇳 Bản dịch 
                            <button className="listening-transcript-toggle" onClick={() => setShowTranslation(!showTranslation)}>
                                {showTranslation ? 'Ẩn' : 'Hiện'}
                            </button>
                        </div>
                        {showTranslation && (
                            <div className="reading-translation-text" dangerouslySetInnerHTML={{ 
                                __html: reading.translation.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') 
                            }} />
                        )}
                    </div>

                    <div style={{ marginBottom: 'var(--space-4)' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: 'var(--space-3)' }}>📚 Từ vựng quan trọng</div>
                        <div className="reading-vocabulary">
                            {reading.vocabulary.map((v, idx) => (
                                <div key={idx} className="reading-vocab-item" onClick={() => speech.speak(v.reading)}>
                                    <div className="reading-vocab-word">{v.word}</div>
                                    <div className="reading-vocab-reading">{v.reading}</div>
                                    <div className="reading-vocab-meaning">{v.meaning}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="reading-questions">
                    <div className="reading-questions-title">❓ Câu hỏi đọc hiểu</div>
                    {reading.questions.map((q, qIdx) => (
                        <div key={qIdx} className="reading-question">
                            <div className="reading-question-text">{qIdx + 1}. {q.q}</div>
                            <div className="reading-options">
                                {q.options.map((opt, optIdx) => {
                                    let cls = '';
                                    if (showResults && optIdx === q.correct) cls = 'correct';
                                    else if (answers[qIdx] === optIdx) cls = showResults ? '' : 'selected';
                                    return (
                                        <div key={optIdx} className={`reading-option ${cls}`}
                                             onClick={() => !showResults && handleAnswer(qIdx, optIdx)}>
                                            {opt}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {!showResults && Object.keys(answers).length === reading.questions.length && (
                        <button className="rapid-btn start" style={{ marginTop: 'var(--space-4)', width: '100%' }}
                                onClick={checkAnswers}>
                            ✓ Kiểm tra đáp án
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Writing Tool Component - Full Implementation
const WritingToolFull = ({ speech, addToast }) => {
    const [activeTab, setActiveTab] = React.useState('hiragana');
    const [selectedChar, setSelectedChar] = React.useState(null);

    const data = writingData[activeTab];

    return (
        <div className="writing-container content-section">
            <div className="section-header">
                <div className="section-title-area">
                    <span className="section-badge" style={{ background: 'var(--tool-writing)' }}>PRACTICE</span>
                    <h2 className="section-title">✍️ Luyện Viết</h2>
                    <p className="section-subtitle">Luyện viết Hiragana, Katakana, Kanji theo ChopChep</p>
                </div>
            </div>

            <div className="writing-tabs">
                <button className={`writing-tab ${activeTab === 'hiragana' ? 'active' : ''}`} onClick={() => setActiveTab('hiragana')}>あ Hiragana</button>
                <button className={`writing-tab ${activeTab === 'katakana' ? 'active' : ''}`} onClick={() => setActiveTab('katakana')}>ア Katakana</button>
                <button className={`writing-tab ${activeTab === 'kanji' ? 'active' : ''}`} onClick={() => setActiveTab('kanji')}>漢 Kanji</button>
            </div>

            <div className="writing-practice">
                {data.characters.map((char, idx) => (
                    <div key={idx} className={`writing-char-card ${selectedChar === idx ? 'selected' : ''}`}
                         onClick={() => { setSelectedChar(idx); speech.speak(char.romaji); }}>
                        <div className="writing-char">{char.char}</div>
                        <div className="writing-romaji">{char.romaji || char.reading}</div>
                        <div className="writing-strokes">{char.strokes} nét</div>
                        {char.meaning && <div className="writing-kanji-meaning">{char.meaning}</div>}
                    </div>
                ))}
            </div>

            {selectedChar !== null && (
                <div className="writing-canvas">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                        <div style={{ fontFamily: 'var(--font-jp)', fontSize: '80px' }}>{data.characters[selectedChar].char}</div>
                        <div style={{ color: 'var(--text-tertiary)' }}>Viết theo mẫu - {data.characters[selectedChar].strokes} nét</div>
                    </div>
                    <div className="writing-canvas-area">
                        <div className="writing-canvas-placeholder">
                            <div className="writing-canvas-icon">✍️</div>
                            <div>Nhấn để bắt đầu viết</div>
                        </div>
                    </div>
                    <div className="writing-canvas-controls">
                        <button className="writing-canvas-btn">↩️ Hoàn tác</button>
                        <button className="writing-canvas-btn">🗑️ Xóa</button>
                        <button className="writing-canvas-btn primary" onClick={() => addToast({ type: 'success', title: '✓ Đã lưu!' })}>💾 Lưu</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Culture Corner Component
const CultureTool = ({ addToast }) => {
    const [selectedCulture, setSelectedCulture] = React.useState(0);
    const [quizAnswer, setQuizAnswer] = React.useState(null);
    const [showAnswer, setShowAnswer] = React.useState(false);

    const culture = cultureData[selectedCulture];

    const handleQuizAnswer = (opt) => {
        setQuizAnswer(opt);
        setShowAnswer(true);
        if (opt === culture.quiz.a) {
            addToast({ type: 'success', title: '✓ Chính xác!' });
        } else {
            addToast({ type: 'error', title: '✗ Chưa đúng', message: `Đáp án: ${culture.quiz.a}` });
        }
    };

    return (
        <div className="culture-container content-section">
            <div className="section-header">
                <div className="section-title-area">
                    <span className="section-badge" style={{ background: 'var(--gradient-gold)', color: 'white' }}>WRAP-UP</span>
                    <h2 className="section-title">🎎 Góc Văn Hóa</h2>
                    <p className="section-subtitle">Hiểu văn hóa Nhật Bản qua mua sắm</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)', justifyContent: 'center' }}>
                {cultureData.map((c, idx) => (
                    <button key={idx} className={`scenario-tab ${selectedCulture === idx ? 'active' : ''}`} 
                            style={{ '--active-bg': 'var(--warning-500)' }}
                            onClick={() => { setSelectedCulture(idx); setQuizAnswer(null); setShowAnswer(false); }}>
                        <span>{c.icon}</span>
                        <span>{c.title}</span>
                    </button>
                ))}
            </div>

            <div className="culture-card">
                <div className="culture-card-header">
                    <div className="culture-icon">{culture.icon}</div>
                    <div className="culture-title">{culture.title}</div>
                </div>
                <div className="culture-content" dangerouslySetInnerHTML={{ 
                    __html: culture.content.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>').replace(/•/g, '<br>•') 
                }} />
                <div className="culture-quiz">
                    <div className="culture-quiz-question">❓ {culture.quiz.q}</div>
                    <div className="culture-quiz-options">
                        {culture.quiz.options.map((opt, idx) => (
                            <button key={idx} className={`culture-quiz-option ${showAnswer && opt === culture.quiz.a ? 'correct' : ''}`}
                                    onClick={() => !showAnswer && handleQuizAnswer(opt)}
                                    disabled={showAnswer}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

console.log('Additional components loaded: ListeningToolFull, ReadingToolFull, WritingToolFull, CultureTool');



// ========== EXTENDED VOCABULARY DATA - THÊM 20 TỪ NỮA ==========
const extendedVocabulary = [
    // Shopping verbs
    { id: 26, vietnamese: 'Xem hàng', hint: 'Ngắm nhìn sản phẩm', kanji: '見る', hiragana: 'みる', romaji: 'miru', audioText: 'みる',
      examples: ['Xem áo', 'Xem giày', 'Chỉ xem thôi', 'Xem giá'], exampleSentence: { jp: 'ちょっと見てもいいですか。', vn: 'Tôi xem một chút được không?' } },
    { id: 27, vietnamese: 'Chọn', hint: 'Lựa chọn sản phẩm', kanji: '選ぶ', hiragana: 'えらぶ', romaji: 'erabu', audioText: 'えらぶ',
      examples: ['Chọn màu', 'Chọn size', 'Khó chọn', 'Chọn cái nào'], exampleSentence: { jp: 'どれを選びますか。', vn: 'Bạn chọn cái nào?' } },
    { id: 28, vietnamese: 'Đổi', hint: 'Exchange - thay đổi sản phẩm', kanji: '交換', hiragana: 'こうかん', romaji: 'koukan', audioText: 'こうかん',
      examples: ['Đổi size', 'Đổi màu', 'Đổi sản phẩm', 'Không đổi được'], exampleSentence: { jp: '交換できますか。', vn: 'Đổi được không?' } },
    { id: 29, vietnamese: 'Trả lại', hint: 'Return - hoàn trả sản phẩm', kanji: '返品', hiragana: 'へんぴん', romaji: 'henpin', audioText: 'へんぴん',
      examples: ['Trả hàng', 'Chính sách trả hàng', 'Muốn trả lại', 'Không trả được'], exampleSentence: { jp: '返品したいのですが。', vn: 'Tôi muốn trả lại hàng.' } },
    { id: 30, vietnamese: 'Thanh toán', hint: 'Payment - trả tiền', kanji: '支払い', hiragana: 'しはらい', romaji: 'shiharai', audioText: 'しはらい',
      examples: ['Thanh toán tiền mặt', 'Thanh toán thẻ', 'Quầy thanh toán', 'Cách thanh toán'], exampleSentence: { jp: 'お支払いはどうなさいますか。', vn: 'Quý khách thanh toán bằng gì ạ?' } },
    
    // Clothing items
    { id: 31, vietnamese: 'Áo sơ mi', hint: 'Shirt - áo có cổ', kanji: 'シャツ', hiragana: 'シャツ', romaji: 'shatsu', audioText: 'シャツ',
      examples: ['Áo sơ mi trắng', 'Áo sơ mi công sở', 'Áo sơ mi nam', 'Áo sơ mi nữ'], exampleSentence: { jp: '白いシャツはありますか。', vn: 'Có áo sơ mi trắng không?' } },
    { id: 32, vietnamese: 'Quần', hint: 'Pants/Trousers', kanji: 'ズボン', hiragana: 'ズボン', romaji: 'zubon', audioText: 'ズボン',
      examples: ['Quần dài', 'Quần jean', 'Quần tây', 'Quần ngắn'], exampleSentence: { jp: 'このズボンを試着したいです。', vn: 'Tôi muốn thử quần này.' } },
    { id: 33, vietnamese: 'Váy', hint: 'Skirt - đồ nữ', kanji: 'スカート', hiragana: 'スカート', romaji: 'sukaato', audioText: 'スカート',
      examples: ['Váy ngắn', 'Váy dài', 'Váy công sở', 'Váy đẹp'], exampleSentence: { jp: 'このスカートはいくらですか。', vn: 'Váy này bao nhiêu tiền?' } },
    { id: 34, vietnamese: 'Áo khoác', hint: 'Jacket/Coat', kanji: 'ジャケット', hiragana: 'ジャケット', romaji: 'jaketto', audioText: 'ジャケット',
      examples: ['Áo khoác mùa đông', 'Áo khoác da', 'Áo blazer', 'Áo khoác nhẹ'], exampleSentence: { jp: 'このジャケットは暖かいですか。', vn: 'Áo khoác này có ấm không?' } },
    { id: 35, vietnamese: 'Giày', hint: 'Shoes - đi chân', kanji: '靴', hiragana: 'くつ', romaji: 'kutsu', audioText: 'くつ',
      examples: ['Giày da', 'Giày thể thao', 'Giày cao gót', 'Giày đẹp'], exampleSentence: { jp: '靴のサイズは何ですか。', vn: 'Size giày bao nhiêu?' } },
    
    // Shopping descriptors
    { id: 36, vietnamese: 'Mới', hint: 'New - sản phẩm mới', kanji: '新しい', hiragana: 'あたらしい', romaji: 'atarashii', audioText: 'あたらしい',
      examples: ['Hàng mới', 'Mẫu mới', 'Cửa hàng mới', 'Sản phẩm mới'], exampleSentence: { jp: '新しいのはありますか。', vn: 'Có cái mới không?' } },
    { id: 37, vietnamese: 'Cũ', hint: 'Old - đã qua sử dụng', kanji: '古い', hiragana: 'ふるい', romaji: 'furui', audioText: 'ふるい',
      examples: ['Đồ cũ', 'Mẫu cũ', 'Kiểu cũ', 'Hàng cũ'], exampleSentence: { jp: 'これは古いモデルですか。', vn: 'Đây là mẫu cũ à?' } },
    { id: 38, vietnamese: 'Đẹp', hint: 'Beautiful/Pretty', kanji: '綺麗', hiragana: 'きれい', romaji: 'kirei', audioText: 'きれい',
      examples: ['Rất đẹp', 'Màu đẹp', 'Thiết kế đẹp', 'Đẹp quá'], exampleSentence: { jp: 'とても綺麗ですね。', vn: 'Đẹp quá nhỉ.' } },
    { id: 39, vietnamese: 'Vừa vặn', hint: 'Fit - vừa size', kanji: 'ぴったり', hiragana: 'ぴったり', romaji: 'pittari', audioText: 'ぴったり',
      examples: ['Vừa vặn', 'Vừa size', 'Vừa khít', 'Rất vừa'], exampleSentence: { jp: 'サイズはぴったりです。', vn: 'Size vừa vặn.' } },
    { id: 40, vietnamese: 'Chật', hint: 'Tight - bó sát', kanji: 'きつい', hiragana: 'きつい', romaji: 'kitsui', audioText: 'きつい',
      examples: ['Hơi chật', 'Chật quá', 'Bó sát', 'Không thoải mái'], exampleSentence: { jp: 'ちょっときついです。', vn: 'Hơi chật.' } },
    
    // Numbers & Money
    { id: 41, vietnamese: 'Một trăm', hint: '100 - hyaku', kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', audioText: 'ひゃく',
      examples: ['100 yên', '100 cái', '100 gram', '100 mét'], exampleSentence: { jp: '百円です。', vn: 'Là 100 yên.' } },
    { id: 42, vietnamese: 'Một ngàn', hint: '1000 - sen', kanji: '千', hiragana: 'せん', romaji: 'sen', audioText: 'せん',
      examples: ['1000 yên', '2000 yên', '3000 yên', '5000 yên'], exampleSentence: { jp: '三千円です。', vn: 'Là 3000 yên.' } },
    { id: 43, vietnamese: 'Một vạn', hint: '10000 - man', kanji: '万', hiragana: 'まん', romaji: 'man', audioText: 'まん',
      examples: ['10,000 yên', '20,000 yên', '50,000 yên', '100,000 yên'], exampleSentence: { jp: '一万円でお願いします。', vn: 'Tôi trả bằng tờ 10,000 yên.' } },
    { id: 44, vietnamese: 'Phần trăm', hint: 'Percent - %', kanji: 'パーセント', hiragana: 'パーセント', romaji: 'paasento', audioText: 'パーセント',
      examples: ['10%', '20%', '50% off', 'Giảm 30%'], exampleSentence: { jp: '二十パーセントオフです。', vn: 'Giảm 20%.' } },
    { id: 45, vietnamese: 'Tất cả', hint: 'Total/All', kanji: '全部', hiragana: 'ぜんぶ', romaji: 'zenbu', audioText: 'ぜんぶ',
      examples: ['Tất cả bao nhiêu', 'Tổng cộng', 'Mua hết', 'Lấy hết'], exampleSentence: { jp: '全部でいくらですか。', vn: 'Tất cả bao nhiêu?' } }
];

// ========== EXTENDED GRAMMAR DATA - THÊM 6 MẪU CÂU ==========
const extendedGrammarData = [
    {
        id: 7, pattern: '〜ませんか', meaning: 'Mời/Rủ ai làm gì (lịch sự)',
        structure: 'Động từ thể ます bỏ ます + ませんか',
        explanation: 'Cách mời hoặc rủ ai làm gì một cách lịch sự. Thường dùng khi muốn rủ khách hàng xem thử sản phẩm.',
        examples: [
            { jp: 'こちらを見ませんか。', vn: 'Quý khách xem cái này không ạ?' },
            { jp: '試着しませんか。', vn: 'Quý khách thử không ạ?' },
            { jp: '一緒に買い物しませんか。', vn: 'Đi mua sắm cùng không?' },
            { jp: 'お茶を飲みませんか。', vn: 'Uống trà không?' }
        ]
    },
    {
        id: 8, pattern: '〜ましょう', meaning: 'Cùng làm gì đi (đề nghị)',
        structure: 'Động từ thể ます bỏ ます + ましょう',
        explanation: 'Đề nghị cùng làm gì đó, hoặc tự đề nghị giúp đỡ. Nhân viên hay dùng để đề nghị giúp khách.',
        examples: [
            { jp: '包装しましょう。', vn: 'Để tôi gói cho.' },
            { jp: '計算しましょう。', vn: 'Để tôi tính.' },
            { jp: '一緒に探しましょう。', vn: 'Cùng tìm nhé.' },
            { jp: '確認しましょう。', vn: 'Để xác nhận nhé.' }
        ]
    },
    {
        id: 9, pattern: '〜のほうが〜', meaning: 'Cái này ... hơn',
        structure: 'A のほうが B より + Tính từ',
        explanation: 'So sánh hai thứ, nói cái nào hơn. Rất hữu ích khi so sánh sản phẩm.',
        examples: [
            { jp: 'こちらのほうが安いです。', vn: 'Cái này rẻ hơn.' },
            { jp: 'そちらのほうが大きいです。', vn: 'Cái kia to hơn.' },
            { jp: '赤のほうが綺麗です。', vn: 'Màu đỏ đẹp hơn.' },
            { jp: 'Mサイズのほうがいいです。', vn: 'Size M tốt hơn.' }
        ]
    },
    {
        id: 10, pattern: '〜と思います', meaning: 'Tôi nghĩ rằng...',
        structure: 'Câu thường + と思います',
        explanation: 'Nói ý kiến cá nhân một cách khiêm tốn. Dùng khi đưa ra lời khuyên hoặc nhận xét.',
        examples: [
            { jp: 'これがいいと思います。', vn: 'Tôi nghĩ cái này tốt.' },
            { jp: 'ちょっと高いと思います。', vn: 'Tôi nghĩ hơi đắt.' },
            { jp: 'このサイズがぴったりだと思います。', vn: 'Tôi nghĩ size này vừa.' },
            { jp: '似合うと思います。', vn: 'Tôi nghĩ hợp với bạn.' }
        ]
    },
    {
        id: 11, pattern: '〜かどうか', meaning: 'Có ... hay không',
        structure: 'Động từ/Tính từ thường + かどうか',
        explanation: 'Hỏi hoặc nói về việc có hay không. Dùng khi không chắc chắn về điều gì đó.',
        examples: [
            { jp: 'あるかどうか確認します。', vn: 'Tôi xác nhận xem có không.' },
            { jp: '合うかどうか試してみてください。', vn: 'Hãy thử xem có vừa không.' },
            { jp: '在庫があるかどうか聞いてみます。', vn: 'Để tôi hỏi xem còn hàng không.' },
            { jp: '使えるかどうかわかりません。', vn: 'Tôi không biết dùng được không.' }
        ]
    },
    {
        id: 12, pattern: '〜ようにする', meaning: 'Cố gắng để...',
        structure: 'Động từ từ điển + ようにする',
        explanation: 'Thể hiện sự cố gắng, nỗ lực làm gì đó. Dùng khi hứa hoặc cam kết.',
        examples: [
            { jp: '明日届くようにします。', vn: 'Sẽ cố gắng giao ngày mai.' },
            { jp: '安くするようにします。', vn: 'Sẽ cố gắng giảm giá.' },
            { jp: '早く準備するようにします。', vn: 'Sẽ cố gắng chuẩn bị sớm.' },
            { jp: '連絡するようにします。', vn: 'Sẽ cố gắng liên lạc.' }
        ]
    }
];

// ========== EXTENDED RAPID FIRE DATA - THÊM 20 CÂU ==========
const extendedRapidFireData = [
    // Vocab recall
    { q: '「店」đọc là gì?', a: 'みせ (mise)', type: 'vn' },
    { q: '「買う」nghĩa là gì?', a: 'Mua', type: 'jp' },
    { q: '"Bán" tiếng Nhật là?', a: '売る (うる)', type: 'vn' },
    { q: '「安い」nghĩa là gì?', a: 'Rẻ', type: 'jp' },
    { q: '"Đắt" tiếng Nhật là?', a: '高い (たかい)', type: 'vn' },
    
    // Grammar application
    { q: 'Dịch: "Xin phép thử được không?"', a: '試着してもいいですか', type: 'vn' },
    { q: '「これをください」nghĩa là?', a: 'Cho tôi cái này', type: 'jp' },
    { q: 'Dịch: "Cái này bao nhiêu?"', a: 'これはいくらですか', type: 'vn' },
    { q: '「カードで払えますか」nghĩa là?', a: 'Trả bằng thẻ được không?', type: 'jp' },
    { q: 'Dịch: "Có size M không?"', a: 'Mサイズはありますか', type: 'vn' },
    
    // Listening comprehension style
    { q: '「いらっしゃいませ」ai nói?', a: 'Nhân viên (Chào khách)', type: 'jp' },
    { q: '「少々お待ちください」nghĩa là?', a: 'Xin đợi một chút', type: 'jp' },
    { q: 'Khách nói "ちょっと考えます" nghĩa là?', a: 'Để tôi suy nghĩ một chút', type: 'jp' },
    { q: '「ありがとうございました」ai nói?', a: 'Cả hai (Cảm ơn)', type: 'jp' },
    { q: '「また来てください」nghĩa là?', a: 'Mời quay lại', type: 'jp' },
    
    // Numbers
    { q: '「五千円」là bao nhiêu?', a: '5000 yên', type: 'jp' },
    { q: '10,000 yên tiếng Nhật là?', a: '一万円 (いちまんえん)', type: 'vn' },
    { q: '「二十パーセントオフ」nghĩa là?', a: 'Giảm 20%', type: 'jp' },
    { q: '"3500 yên" tiếng Nhật là?', a: '三千五百円', type: 'vn' },
    { q: '「全部で八百円」nghĩa là?', a: 'Tổng cộng 800 yên', type: 'jp' }
];

// ========== EXTENDED QUIZ DATA - THÊM 15 CÂU ==========
const extendedQuizData = [
    { q: '「試着」đọc như thế nào?', options: ['しちゃく', 'しちょく', 'ためぎ', 'こころみ'], correct: 0, type: 'reading' },
    { q: 'Khi muốn hỏi giá, nói gì?', options: ['これをください', 'いくらですか', 'ありがとう', 'すみません'], correct: 1, type: 'grammar' },
    { q: '「お釣り」là gì?', options: ['Hóa đơn', 'Túi', 'Tiền thối', 'Thẻ'], correct: 2, type: 'vocab' },
    { q: 'Cách đọc của「割引」là?', options: ['わりびき', 'かっぴき', 'われひき', 'わるひき'], correct: 0, type: 'reading' },
    { q: '"Không cần túi" nói thế nào?', options: ['袋をください', '袋はいりません', '袋がほしい', '袋がない'], correct: 1, type: 'grammar' },
    { q: '「レシート」nghĩa là?', options: ['Thẻ', 'Hóa đơn', 'Túi', 'Tiền'], correct: 1, type: 'vocab' },
    { q: 'Size lớn tiếng Nhật là?', options: ['Sサイズ', 'Mサイズ', 'Lサイズ', 'XLサイズ'], correct: 2, type: 'vocab' },
    { q: '「ぴったり」nghĩa là gì?', options: ['Chật', 'Rộng', 'Vừa vặn', 'Dài'], correct: 2, type: 'vocab' },
    { q: 'Khi đồ chật, nói gì?', options: ['大きいです', 'きついです', 'ゆるいです', 'ぴったりです'], correct: 1, type: 'grammar' },
    { q: '「返品」có nghĩa là?', options: ['Đổi hàng', 'Trả hàng', 'Mua hàng', 'Bán hàng'], correct: 1, type: 'vocab' },
    { q: 'Câu nào đúng khi muốn đổi size?', options: ['返品したいです', '交換したいです', '試着したいです', '支払いしたいです'], correct: 1, type: 'grammar' },
    { q: '「きれい」nghĩa là?', options: ['Sạch sẽ', 'Đẹp', 'Cả hai', 'Mới'], correct: 2, type: 'vocab' },
    { q: '"Có màu khác không?" nói thế nào?', options: ['違う色がありますか', '他の色がありますか', '別の色がありますか', 'Tất cả đều đúng'], correct: 3, type: 'grammar' },
    { q: '「新しい」đối nghĩa với?', options: ['大きい', '小さい', '古い', '高い'], correct: 2, type: 'vocab' },
    { q: 'Khi nhân viên nói "少々お待ちください", bạn nên?', options: ['Đi luôn', 'Đợi một chút', 'Trả tiền', 'Hỏi lại'], correct: 1, type: 'conversation' }
];

console.log('Extended data loaded:', {
    extendedVocabulary: extendedVocabulary.length,
    extendedGrammarData: extendedGrammarData.length,
    extendedRapidFireData: extendedRapidFireData.length,
    extendedQuizData: extendedQuizData.length
});



// ========== MORE ROLEPLAY SCENARIOS - THÊM 4 TÌNH HUỐNG ==========
const moreRoleplayData = [
    {
        id: 7, title: 'Tại tiệm bánh', icon: '🍰',
        context: 'Bạn đang mua bánh ngọt tại một tiệm bánh Nhật Bản nổi tiếng.',
        dialogues: [
            { role: 'staff', jp: 'いらっしゃいませ。何になさいますか。', vn: 'Chào mừng quý khách. Quý khách dùng gì ạ?' },
            { role: 'customer', jp: 'このケーキは何ですか。', vn: 'Bánh này là bánh gì?' },
            { role: 'staff', jp: 'これはストロベリーショートケーキです。一番人気です。', vn: 'Đây là bánh dâu tây. Được yêu thích nhất đấy ạ.' },
            { role: 'customer', jp: 'じゃ、それを一つください。', vn: 'Vậy cho tôi một cái.' },
            { role: 'staff', jp: '店内でお召し上がりですか。', vn: 'Quý khách dùng tại đây ạ?' },
            { role: 'customer', jp: 'いいえ、持ち帰りでお願いします。', vn: 'Không, cho tôi mang về.' },
            { role: 'staff', jp: 'かしこまりました。450円になります。', vn: 'Vâng ạ. Là 450 yên ạ.' },
            { role: 'customer', jp: '500円でお願いします。', vn: 'Tôi trả 500 yên.' }
        ]
    },
    {
        id: 8, title: 'Mua quà lưu niệm', icon: '🎁',
        context: 'Bạn đang ở cửa hàng quà lưu niệm và muốn mua quà cho gia đình.',
        dialogues: [
            { role: 'customer', jp: 'すみません、お土産を探しています。', vn: 'Xin lỗi, tôi đang tìm quà lưu niệm.' },
            { role: 'staff', jp: 'どなたへのお土産ですか。', vn: 'Quà cho ai ạ?' },
            { role: 'customer', jp: '家族へのお土産です。', vn: 'Quà cho gia đình.' },
            { role: 'staff', jp: 'こちらのお菓子はいかがですか。日本で有名です。', vn: 'Bánh kẹo này thì sao ạ? Nổi tiếng ở Nhật đấy.' },
            { role: 'customer', jp: 'これは何個入りですか。', vn: 'Hộp này có mấy cái?' },
            { role: 'staff', jp: '12個入りです。', vn: '12 cái ạ.' },
            { role: 'customer', jp: 'いいですね。2箱ください。', vn: 'Được đấy. Cho tôi 2 hộp.' },
            { role: 'staff', jp: 'ギフト用に包装しますか。', vn: 'Gói thành quà tặng không ạ?' }
        ]
    },
    {
        id: 9, title: 'Tại cửa hàng giày', icon: '👟',
        context: 'Bạn đang mua giày thể thao tại cửa hàng giày.',
        dialogues: [
            { role: 'customer', jp: 'すみません、スニーカーを探しています。', vn: 'Xin lỗi, tôi đang tìm giày sneaker.' },
            { role: 'staff', jp: 'サイズはおいくつですか。', vn: 'Size bao nhiêu ạ?' },
            { role: 'customer', jp: '26センチです。', vn: '26cm.' },
            { role: 'staff', jp: 'こちらはいかがですか。今人気のモデルです。', vn: 'Mẫu này thì sao ạ? Đang hot lắm.' },
            { role: 'customer', jp: '履いてみてもいいですか。', vn: 'Tôi thử được không?' },
            { role: 'staff', jp: 'どうぞ。こちらでお掛けください。', vn: 'Mời. Ngồi đây ạ.' },
            { role: 'customer', jp: 'ちょっとゆるいですね。', vn: 'Hơi rộng nhỉ.' },
            { role: 'staff', jp: 'では、25.5センチをお持ちしましょうか。', vn: 'Vậy để tôi lấy size 25.5 nhé.' }
        ]
    },
    {
        id: 10, title: 'Tại hiệu sách', icon: '📚',
        context: 'Bạn đang tìm sách tiếng Nhật tại hiệu sách.',
        dialogues: [
            { role: 'customer', jp: 'すみません、日本語の教科書はどこですか。', vn: 'Xin lỗi, sách giáo khoa tiếng Nhật ở đâu?' },
            { role: 'staff', jp: '2階の語学コーナーにございます。', vn: 'Ở góc ngoại ngữ tầng 2 ạ.' },
            { role: 'customer', jp: 'N4レベルの本を探しています。', vn: 'Tôi đang tìm sách trình độ N4.' },
            { role: 'staff', jp: 'こちらが人気です。CD付きです。', vn: 'Cuốn này được ưa chuộng. Có kèm CD.' },
            { role: 'customer', jp: '音声はダウンロードできますか。', vn: 'Download audio được không?' },
            { role: 'staff', jp: 'はい、QRコードでダウンロードできます。', vn: 'Vâng, quét QR code là download được.' },
            { role: 'customer', jp: 'じゃ、これをください。', vn: 'Vậy cho tôi cuốn này.' },
            { role: 'staff', jp: 'ブックカバーをお付けしますか。', vn: 'Bọc bìa sách không ạ?' }
        ]
    }
];

// ========== MORE SITUATION DATA - THÊM 4 TÌNH HUỐNG ==========
const moreSituationData = [
    {
        id: 7, title: 'Tại quầy thanh toán', icon: '💵', context: 'Các cụm từ khi thanh toán tiền',
        phrases: [
            { jp: 'お会計お願いします。', romaji: 'Okaikei onegaishimasu.', vn: 'Cho tôi thanh toán.', note: '💰 Thanh toán' },
            { jp: '現金でお願いします。', romaji: 'Genkin de onegaishimasu.', vn: 'Tôi trả tiền mặt.', note: '💵 Tiền mặt' },
            { jp: '一万円でお願いします。', romaji: 'Ichiman en de onegaishimasu.', vn: 'Tôi trả bằng tờ 10,000.', note: '💴 Tờ lớn' },
            { jp: 'ポイントカードはお持ちですか。', romaji: 'Pointo kaado wa omochi desu ka.', vn: 'Có thẻ tích điểm không?', note: '💳 Thẻ điểm' },
            { jp: '別々に払えますか。', romaji: 'Betsubetsu ni haraemasu ka.', vn: 'Trả riêng được không?', note: '👥 Chia bill' }
        ]
    },
    {
        id: 8, title: 'Hỏi về sản phẩm', icon: '❓', context: 'Hỏi thông tin chi tiết về sản phẩm',
        phrases: [
            { jp: 'これは何ですか。', romaji: 'Kore wa nan desu ka.', vn: 'Cái này là gì?', note: '❓ Hỏi chung' },
            { jp: 'どこ製ですか。', romaji: 'Doko sei desu ka.', vn: 'Sản xuất ở đâu?', note: '🌍 Xuất xứ' },
            { jp: '素材は何ですか。', romaji: 'Sozai wa nan desu ka.', vn: 'Chất liệu là gì?', note: '🧵 Chất liệu' },
            { jp: '洗濯できますか。', romaji: 'Sentaku dekimasu ka.', vn: 'Giặt được không?', note: '🧺 Giặt' },
            { jp: '使い方を教えてください。', romaji: 'Tsukaikata wo oshiete kudasai.', vn: 'Hướng dẫn cách dùng.', note: '📖 Hướng dẫn' }
        ]
    },
    {
        id: 9, title: 'Xin giúp đỡ', icon: '🙋', context: 'Khi cần nhân viên hỗ trợ',
        phrases: [
            { jp: 'すみません、ちょっといいですか。', romaji: 'Sumimasen, chotto ii desu ka.', vn: 'Xin lỗi, phiền một chút.', note: '🙋 Gọi NV' },
            { jp: '手伝ってもらえますか。', romaji: 'Tetsudatte moraemasu ka.', vn: 'Giúp tôi được không?', note: '🤝 Nhờ giúp' },
            { jp: '日本語がわかりません。', romaji: 'Nihongo ga wakarimasen.', vn: 'Tôi không hiểu tiếng Nhật.', note: '🗣️ Ngôn ngữ' },
            { jp: '英語を話せますか。', romaji: 'Eigo wo hanasemasu ka.', vn: 'Nói tiếng Anh được không?', note: '🇬🇧 English' },
            { jp: 'もう一度言ってください。', romaji: 'Mou ichido itte kudasai.', vn: 'Nói lại một lần nữa.', note: '🔄 Nhắc lại' }
        ]
    },
    {
        id: 10, title: 'Kết thúc mua sắm', icon: '👋', context: 'Các câu nói khi rời cửa hàng',
        phrases: [
            { jp: 'ありがとうございました。', romaji: 'Arigatou gozaimashita.', vn: 'Cảm ơn.', note: '🙏 Cảm ơn' },
            { jp: 'また来ます。', romaji: 'Mata kimasu.', vn: 'Tôi sẽ quay lại.', note: '👋 Tạm biệt' },
            { jp: 'とても助かりました。', romaji: 'Totemo tasukarimashita.', vn: 'Giúp tôi rất nhiều.', note: '💖 Biết ơn' },
            { jp: '楽しかったです。', romaji: 'Tanoshikatta desu.', vn: 'Rất vui.', note: '😊 Vui vẻ' },
            { jp: 'お世話になりました。', romaji: 'Osewa ni narimashita.', vn: 'Cảm ơn đã giúp đỡ.', note: '🎎 Lịch sự' }
        ]
    }
];

// ========== MORE LISTENING DATA - THÊM 2 BÀI NGHE ==========
const moreListeningData = [
    {
        id: 3, title: 'Mua điện thoại', duration: '2:00',
        transcript: [
            { speaker: 'A', jp: 'いらっしゃいませ。何をお探しですか。', vn: 'Chào mừng. Quý khách tìm gì ạ?', time: '0:00' },
            { speaker: 'B', jp: 'スマホを探しています。', vn: 'Tôi đang tìm điện thoại.', time: '0:05' },
            { speaker: 'A', jp: 'ご予算はおいくらぐらいですか。', vn: 'Ngân sách khoảng bao nhiêu ạ?', time: '0:09' },
            { speaker: 'B', jp: '5万円ぐらいで考えています。', vn: 'Tôi đang nghĩ khoảng 50,000 yên.', time: '0:14' },
            { speaker: 'A', jp: 'こちらのモデルはいかがですか。カメラがとてもいいですよ。', vn: 'Mẫu này thì sao ạ? Camera rất tốt.', time: '0:20' },
            { speaker: 'B', jp: 'バッテリーはどうですか。', vn: 'Pin thế nào?', time: '0:28' },
            { speaker: 'A', jp: '一日中使っても大丈夫です。', vn: 'Dùng cả ngày vẫn ổn.', time: '0:32' },
            { speaker: 'B', jp: '色は何色がありますか。', vn: 'Có màu gì?', time: '0:37' },
            { speaker: 'A', jp: '黒、白、青があります。', vn: 'Có đen, trắng, xanh.', time: '0:41' },
            { speaker: 'B', jp: 'じゃ、青をください。', vn: 'Vậy cho tôi màu xanh.', time: '0:46' }
        ],
        questions: [
            { q: 'Khách đang tìm gì?', options: ['Máy tính', 'Điện thoại', 'Máy ảnh', 'Tai nghe'], correct: 1 },
            { q: 'Ngân sách của khách là bao nhiêu?', options: ['30,000 yên', '40,000 yên', '50,000 yên', '60,000 yên'], correct: 2 },
            { q: 'Điểm mạnh của sản phẩm là gì?', options: ['Pin', 'Camera', 'Màn hình', 'Giá rẻ'], correct: 1 },
            { q: 'Khách chọn màu gì?', options: ['Đen', 'Trắng', 'Xanh', 'Đỏ'], correct: 2 }
        ]
    },
    {
        id: 4, title: 'Tại tiệm thuốc', duration: '1:45',
        transcript: [
            { speaker: 'A', jp: 'いらっしゃいませ。', vn: 'Chào mừng quý khách.', time: '0:00' },
            { speaker: 'B', jp: 'すみません、風邪薬はどこですか。', vn: 'Xin lỗi, thuốc cảm ở đâu?', time: '0:03' },
            { speaker: 'A', jp: 'こちらでございます。どんな症状ですか。', vn: 'Ở đây ạ. Triệu chứng thế nào ạ?', time: '0:08' },
            { speaker: 'B', jp: '熱があって、喉が痛いです。', vn: 'Sốt và đau họng.', time: '0:14' },
            { speaker: 'A', jp: 'こちらの薬がおすすめです。', vn: 'Thuốc này được khuyên dùng.', time: '0:19' },
            { speaker: 'B', jp: '一日何回飲みますか。', vn: 'Ngày uống mấy lần?', time: '0:24' },
            { speaker: 'A', jp: '一日三回、食後に飲んでください。', vn: 'Ngày 3 lần, uống sau bữa ăn.', time: '0:28' },
            { speaker: 'B', jp: 'わかりました。これをください。', vn: 'Tôi hiểu rồi. Cho tôi cái này.', time: '0:35' }
        ],
        questions: [
            { q: 'Khách đang tìm thuốc gì?', options: ['Thuốc đau đầu', 'Thuốc cảm', 'Thuốc dạ dày', 'Vitamin'], correct: 1 },
            { q: 'Triệu chứng của khách là gì?', options: ['Đau bụng', 'Đau đầu', 'Sốt và đau họng', 'Ho'], correct: 2 },
            { q: 'Uống thuốc mấy lần/ngày?', options: ['1 lần', '2 lần', '3 lần', '4 lần'], correct: 2 },
            { q: 'Uống thuốc khi nào?', options: ['Trước ăn', 'Sau ăn', 'Lúc đói', 'Trước ngủ'], correct: 1 }
        ]
    }
];

// ========== MORE CULTURE DATA - THÊM 3 CHỦ ĐỀ ==========
const moreCultureData = [
    {
        id: 3, title: 'Phép lịch sự khi mua sắm', icon: '🎀',
        content: `Khi mua sắm ở Nhật, có một số phép lịch sự cần lưu ý:

Khi vào cửa hàng:
• Đáp lại "いらっしゃいませ" bằng cách gật đầu nhẹ
• Không cần nói gì, chỉ cần mỉm cười

Khi xem hàng:
• Xin phép trước khi chạm vào sản phẩm
• Nói "見てもいいですか" (Xem được không?)
• Cẩn thận với đồ dễ vỡ

Khi thanh toán:
• Đặt tiền vào khay nhỏ, không đưa tay trực tiếp
• Chờ nhận tiền thối và hóa đơn
• Nói "ありがとうございます" khi nhận hàng

Khi rời cửa hàng:
• Nói "ありがとうございました" hoặc gật đầu
• Đừng vội vàng, từ từ rời đi`,
        quiz: { q: 'Khi trả tiền ở Nhật, bạn nên?', a: 'Đặt vào khay', options: ['Đưa tay trực tiếp', 'Đặt vào khay', 'Để trên bàn'] }
    },
    {
        id: 4, title: 'Konbini - Cửa hàng tiện lợi', icon: '🏪',
        content: `Konbini (コンビニ) là một phần không thể thiếu của cuộc sống Nhật Bản.

Ba chuỗi lớn nhất:
• 7-Eleven (セブンイレブン)
• Lawson (ローソン)  
• FamilyMart (ファミリーマート)

Dịch vụ tại Konbini:
• Mua đồ ăn nhanh, nước uống
• Rút tiền ATM 24/7
• Gửi/nhận bưu kiện
• In ấn, photocopy
• Mua vé concert, sự kiện
• Thanh toán hóa đơn điện, nước

Tiếng Nhật hữu ích:
• 温めますか (Atatame masu ka) - Hâm nóng không?
• 袋は要りますか - Cần túi không?
• お箸 (Ohashi) - Đũa
• スプーン (Supuun) - Thìa`,
        quiz: { q: '「温めますか」nghĩa là gì?', a: 'Hâm nóng không?', options: ['Cần túi không?', 'Hâm nóng không?', 'Trả bằng gì?'] }
    },
    {
        id: 5, title: 'Thẻ tích điểm ở Nhật', icon: '💳',
        content: `Ở Nhật, hệ thống thẻ tích điểm (ポイントカード) rất phổ biến.

Các loại thẻ phổ biến:
• T-Point - Dùng ở TSUTAYA, FamilyMart
• Ponta - Dùng ở Lawson
• Rakuten Point - Dùng online và offline
• dポイント - Của NTT Docomo

Lợi ích:
• Tích điểm để đổi quà hoặc giảm giá
• Nhiều nơi cho phép tích điểm chéo
• App điện thoại thay thế thẻ vật lý

Câu hỏi thường gặp:
• ポイントカードはお持ちですか - Có thẻ điểm không?
• ポイントを使いますか - Dùng điểm không?
• ポイントが貯まります - Sẽ tích được điểm`,
        quiz: { q: 'T-Point dùng được ở đâu?', a: 'FamilyMart', options: ['Lawson', 'FamilyMart', '7-Eleven'] }
    }
];

console.log('More data loaded:', {
    moreRoleplayData: moreRoleplayData.length,
    moreSituationData: moreSituationData.length,
    moreListeningData: moreListeningData.length,
    moreCultureData: moreCultureData.length
});



// ========== COMPREHENSIVE JAPANESE PHRASES FOR SHOPPING ==========
const comprehensivePhrasesData = {
    // ENTERING A STORE
    enteringStore: {
        title: 'Khi vào cửa hàng',
        icon: '🚪',
        phrases: [
            { jp: 'いらっしゃいませ。', romaji: 'Irasshaimase.', vn: 'Chào mừng quý khách. (NV nói)', note: 'Greeting' },
            { jp: 'こんにちは。', romaji: 'Konnichiwa.', vn: 'Xin chào.', note: 'Reply' },
            { jp: '見ているだけです。', romaji: 'Mite iru dake desu.', vn: 'Tôi chỉ xem thôi.', note: 'Just looking' },
            { jp: '何かお探しですか。', romaji: 'Nanika osagashi desu ka.', vn: 'Quý khách tìm gì ạ?', note: 'NV hỏi' },
            { jp: '〜を探しています。', romaji: '~ wo sagashite imasu.', vn: 'Tôi đang tìm ~.', note: 'Looking for ~' }
        ]
    },
    
    // ASKING ABOUT PRODUCTS
    askingProducts: {
        title: 'Hỏi về sản phẩm',
        icon: '❓',
        phrases: [
            { jp: 'これは何ですか。', romaji: 'Kore wa nan desu ka.', vn: 'Cái này là gì?', note: 'What is this?' },
            { jp: 'いくらですか。', romaji: 'Ikura desu ka.', vn: 'Bao nhiêu tiền?', note: 'How much?' },
            { jp: '他の色はありますか。', romaji: 'Hoka no iro wa arimasu ka.', vn: 'Có màu khác không?', note: 'Other colors?' },
            { jp: 'もっと大きいのはありますか。', romaji: 'Motto ookii no wa arimasu ka.', vn: 'Có cái lớn hơn không?', note: 'Bigger?' },
            { jp: 'もっと小さいのはありますか。', romaji: 'Motto chiisai no wa arimasu ka.', vn: 'Có cái nhỏ hơn không?', note: 'Smaller?' },
            { jp: 'もっと安いのはありますか。', romaji: 'Motto yasui no wa arimasu ka.', vn: 'Có cái rẻ hơn không?', note: 'Cheaper?' },
            { jp: 'これは日本製ですか。', romaji: 'Kore wa nihonsei desu ka.', vn: 'Cái này sản xuất ở Nhật à?', note: 'Made in Japan?' },
            { jp: '素材は何ですか。', romaji: 'Sozai wa nan desu ka.', vn: 'Chất liệu là gì?', note: 'Material?' }
        ]
    },
    
    // TRYING ON CLOTHES
    tryingClothes: {
        title: 'Thử đồ',
        icon: '👔',
        phrases: [
            { jp: '試着してもいいですか。', romaji: 'Shichaku shite mo ii desu ka.', vn: 'Tôi thử được không?', note: 'May I try?' },
            { jp: '試着室はどこですか。', romaji: 'Shichakushitsu wa doko desu ka.', vn: 'Phòng thử ở đâu?', note: 'Fitting room?' },
            { jp: 'サイズが合いません。', romaji: 'Saizu ga aimasen.', vn: 'Size không vừa.', note: 'Doesnt fit' },
            { jp: 'ちょっときついです。', romaji: 'Chotto kitsui desu.', vn: 'Hơi chật.', note: 'Too tight' },
            { jp: 'ちょっとゆるいです。', romaji: 'Chotto yurui desu.', vn: 'Hơi rộng.', note: 'Too loose' },
            { jp: 'ぴったりです。', romaji: 'Pittari desu.', vn: 'Vừa vặn.', note: 'Perfect fit' },
            { jp: 'Sサイズはありますか。', romaji: 'Esu saizu wa arimasu ka.', vn: 'Có size S không?', note: 'Size S?' },
            { jp: '鏡はありますか。', romaji: 'Kagami wa arimasu ka.', vn: 'Có gương không?', note: 'Mirror?' }
        ]
    },
    
    // PAYMENT
    payment: {
        title: 'Thanh toán',
        icon: '💰',
        phrases: [
            { jp: 'これをください。', romaji: 'Kore wo kudasai.', vn: 'Cho tôi cái này.', note: 'Ill take this' },
            { jp: 'お会計お願いします。', romaji: 'Okaikei onegaishimasu.', vn: 'Cho tôi thanh toán.', note: 'Bill please' },
            { jp: 'カードで払えますか。', romaji: 'Kaado de haraemasu ka.', vn: 'Trả bằng thẻ được không?', note: 'Card OK?' },
            { jp: '現金でお願いします。', romaji: 'Genkin de onegaishimasu.', vn: 'Tôi trả tiền mặt.', note: 'Cash' },
            { jp: '袋をください。', romaji: 'Fukuro wo kudasai.', vn: 'Cho tôi túi.', note: 'Bag please' },
            { jp: '袋は結構です。', romaji: 'Fukuro wa kekkō desu.', vn: 'Không cần túi.', note: 'No bag' },
            { jp: 'レシートをください。', romaji: 'Reshiito wo kudasai.', vn: 'Cho tôi hóa đơn.', note: 'Receipt' },
            { jp: '全部でいくらですか。', romaji: 'Zenbu de ikura desu ka.', vn: 'Tất cả bao nhiêu?', note: 'Total?' },
            { jp: '消費税込みですか。', romaji: 'Shouhizei komi desu ka.', vn: 'Đã gồm thuế chưa?', note: 'Tax included?' },
            { jp: 'おつりです。', romaji: 'Otsuri desu.', vn: 'Tiền thối đây ạ.', note: 'Change' }
        ]
    },
    
    // DISCOUNTS AND SALES
    discounts: {
        title: 'Giảm giá & Khuyến mãi',
        icon: '🏷️',
        phrases: [
            { jp: 'セール中ですか。', romaji: 'Seeru chuu desu ka.', vn: 'Đang sale à?', note: 'On sale?' },
            { jp: '割引はありますか。', romaji: 'Waribiki wa arimasu ka.', vn: 'Có giảm giá không?', note: 'Discount?' },
            { jp: '何パーセントオフですか。', romaji: 'Nan paasento ofu desu ka.', vn: 'Giảm bao nhiêu %?', note: 'What %?' },
            { jp: 'クーポンは使えますか。', romaji: 'Kuupon wa tsukaemasu ka.', vn: 'Dùng coupon được không?', note: 'Coupon OK?' },
            { jp: 'ポイントカードはありますか。', romaji: 'Pointo kaado wa arimasu ka.', vn: 'Có thẻ tích điểm không?', note: 'Point card?' },
            { jp: '免税できますか。', romaji: 'Menzei dekimasu ka.', vn: 'Được miễn thuế không?', note: 'Tax free?' },
            { jp: 'パスポートを見せてください。', romaji: 'Pasupooto wo misete kudasai.', vn: 'Cho xem hộ chiếu.', note: 'Show passport' },
            { jp: '特価品ですか。', romaji: 'Tokkahin desu ka.', vn: 'Đây là hàng giá đặc biệt à?', note: 'Special price?' }
        ]
    },
    
    // RETURNS AND EXCHANGES
    returnsExchanges: {
        title: 'Đổi trả hàng',
        icon: '🔄',
        phrases: [
            { jp: '交換できますか。', romaji: 'Koukan dekimasu ka.', vn: 'Đổi được không?', note: 'Exchange?' },
            { jp: '返品したいのですが。', romaji: 'Henpin shitai no desu ga.', vn: 'Tôi muốn trả hàng.', note: 'Return' },
            { jp: 'レシートはありますか。', romaji: 'Reshiito wa arimasu ka.', vn: 'Có hóa đơn không?', note: 'Receipt?' },
            { jp: 'サイズを交換したいです。', romaji: 'Saizu wo koukan shitai desu.', vn: 'Tôi muốn đổi size.', note: 'Change size' },
            { jp: '色を交換したいです。', romaji: 'Iro wo koukan shitai desu.', vn: 'Tôi muốn đổi màu.', note: 'Change color' },
            { jp: '壊れています。', romaji: 'Kowarete imasu.', vn: 'Nó bị hỏng.', note: 'Its broken' },
            { jp: '返金できますか。', romaji: 'Henkin dekimasu ka.', vn: 'Hoàn tiền được không?', note: 'Refund?' },
            { jp: '保証期間内です。', romaji: 'Hoshou kikan nai desu.', vn: 'Còn trong bảo hành.', note: 'Under warranty' }
        ]
    },
    
    // POLITE EXPRESSIONS
    politeExpressions: {
        title: 'Câu lịch sự',
        icon: '🎎',
        phrases: [
            { jp: 'すみません。', romaji: 'Sumimasen.', vn: 'Xin lỗi / Cho phép hỏi.', note: 'Excuse me' },
            { jp: 'ありがとうございます。', romaji: 'Arigatou gozaimasu.', vn: 'Cảm ơn.', note: 'Thank you' },
            { jp: 'どうも。', romaji: 'Doumo.', vn: 'Cảm ơn (casual).', note: 'Thanks' },
            { jp: 'ちょっと待ってください。', romaji: 'Chotto matte kudasai.', vn: 'Xin đợi một chút.', note: 'Please wait' },
            { jp: '大丈夫です。', romaji: 'Daijoubu desu.', vn: 'Không sao / Được rồi.', note: 'Its OK' },
            { jp: 'いいえ、結構です。', romaji: 'Iie, kekkō desu.', vn: 'Không, không cần.', note: 'No thanks' },
            { jp: 'また来ます。', romaji: 'Mata kimasu.', vn: 'Tôi sẽ quay lại.', note: 'Ill come again' },
            { jp: 'お世話になりました。', romaji: 'Osewa ni narimashita.', vn: 'Cảm ơn đã giúp đỡ.', note: 'Thank you for help' }
        ]
    },
    
    // ASKING FOR HELP
    askingHelp: {
        title: 'Nhờ giúp đỡ',
        icon: '🙋',
        phrases: [
            { jp: '手伝ってもらえますか。', romaji: 'Tetsudatte moraemasu ka.', vn: 'Giúp tôi được không?', note: 'Can you help?' },
            { jp: '日本語がわかりません。', romaji: 'Nihongo ga wakarimasen.', vn: 'Tôi không hiểu tiếng Nhật.', note: 'Dont understand' },
            { jp: 'もう一度言ってください。', romaji: 'Mou ichido itte kudasai.', vn: 'Nói lại lần nữa.', note: 'Repeat please' },
            { jp: 'ゆっくり話してください。', romaji: 'Yukkuri hanashite kudasai.', vn: 'Nói chậm hơn.', note: 'Speak slowly' },
            { jp: '書いてもらえますか。', romaji: 'Kaite moraemasu ka.', vn: 'Viết ra được không?', note: 'Write it?' },
            { jp: 'これは何と読みますか。', romaji: 'Kore wa nan to yomimasu ka.', vn: 'Cái này đọc thế nào?', note: 'How to read?' },
            { jp: '英語を話せますか。', romaji: 'Eigo wo hanasemasu ka.', vn: 'Nói tiếng Anh được không?', note: 'English?' },
            { jp: '近くに〜はありますか。', romaji: 'Chikaku ni ~ wa arimasu ka.', vn: 'Gần đây có ~ không?', note: 'Nearby?' }
        ]
    }
};

// ========== NUMBERS AND COUNTING IN JAPANESE ==========
const numbersData = {
    basic: {
        title: 'Số đếm cơ bản',
        numbers: [
            { num: 1, kanji: '一', reading: 'いち', romaji: 'ichi' },
            { num: 2, kanji: '二', reading: 'に', romaji: 'ni' },
            { num: 3, kanji: '三', reading: 'さん', romaji: 'san' },
            { num: 4, kanji: '四', reading: 'よん/し', romaji: 'yon/shi' },
            { num: 5, kanji: '五', reading: 'ご', romaji: 'go' },
            { num: 6, kanji: '六', reading: 'ろく', romaji: 'roku' },
            { num: 7, kanji: '七', reading: 'なな/しち', romaji: 'nana/shichi' },
            { num: 8, kanji: '八', reading: 'はち', romaji: 'hachi' },
            { num: 9, kanji: '九', reading: 'きゅう/く', romaji: 'kyuu/ku' },
            { num: 10, kanji: '十', reading: 'じゅう', romaji: 'juu' }
        ]
    },
    hundreds: {
        title: 'Hàng trăm',
        numbers: [
            { num: 100, kanji: '百', reading: 'ひゃく', romaji: 'hyaku' },
            { num: 200, kanji: '二百', reading: 'にひゃく', romaji: 'nihyaku' },
            { num: 300, kanji: '三百', reading: 'さんびゃく', romaji: 'sanbyaku' },
            { num: 400, kanji: '四百', reading: 'よんひゃく', romaji: 'yonhyaku' },
            { num: 500, kanji: '五百', reading: 'ごひゃく', romaji: 'gohyaku' },
            { num: 600, kanji: '六百', reading: 'ろっぴゃく', romaji: 'roppyaku' },
            { num: 700, kanji: '七百', reading: 'ななひゃく', romaji: 'nanahyaku' },
            { num: 800, kanji: '八百', reading: 'はっぴゃく', romaji: 'happyaku' },
            { num: 900, kanji: '九百', reading: 'きゅうひゃく', romaji: 'kyuuhyaku' }
        ]
    },
    thousands: {
        title: 'Hàng ngàn',
        numbers: [
            { num: 1000, kanji: '千', reading: 'せん', romaji: 'sen' },
            { num: 2000, kanji: '二千', reading: 'にせん', romaji: 'nisen' },
            { num: 3000, kanji: '三千', reading: 'さんぜん', romaji: 'sanzen' },
            { num: 4000, kanji: '四千', reading: 'よんせん', romaji: 'yonsen' },
            { num: 5000, kanji: '五千', reading: 'ごせん', romaji: 'gosen' },
            { num: 8000, kanji: '八千', reading: 'はっせん', romaji: 'hassen' },
            { num: 10000, kanji: '一万', reading: 'いちまん', romaji: 'ichiman' }
        ]
    },
    counters: {
        title: 'Trợ số từ (Counters)',
        items: [
            { counter: '〜円', reading: '〜えん', usage: 'Tiền (yên)', example: '500円' },
            { counter: '〜個', reading: '〜こ', usage: 'Đồ vật nhỏ', example: '3個' },
            { counter: '〜枚', reading: '〜まい', usage: 'Đồ mỏng, phẳng', example: '2枚' },
            { counter: '〜本', reading: '〜ほん', usage: 'Đồ dài, tròn', example: '1本' },
            { counter: '〜つ', reading: '〜つ', usage: 'Đếm chung', example: '一つ' },
            { counter: '〜着', reading: '〜ちゃく', usage: 'Quần áo', example: '2着' },
            { counter: '〜足', reading: '〜そく', usage: 'Giày, tất', example: '1足' },
            { counter: '〜箱', reading: '〜はこ', usage: 'Hộp', example: '3箱' }
        ]
    },
    priceExamples: {
        title: 'Ví dụ giá tiền',
        examples: [
            { price: '￥150', reading: 'ひゃくごじゅうえん', romaji: 'hyaku gojuu en' },
            { price: '￥980', reading: 'きゅうひゃくはちじゅうえん', romaji: 'kyuuhyaku hachijuu en' },
            { price: '￥1,500', reading: 'せんごひゃくえん', romaji: 'sen gohyaku en' },
            { price: '￥2,980', reading: 'にせんきゅうひゃくはちじゅうえん', romaji: 'nisen kyuuhyaku hachijuu en' },
            { price: '￥5,400', reading: 'ごせんよんひゃくえん', romaji: 'gosen yonhyaku en' },
            { price: '￥10,800', reading: 'いちまんはっぴゃくえん', romaji: 'ichiman happyaku en' },
            { price: '￥32,000', reading: 'さんまんにせんえん', romaji: 'sanman nisen en' },
            { price: '￥108,000', reading: 'じゅうまんはっせんえん', romaji: 'juuman hassen en' }
        ]
    }
};

// ========== SHOPPING VOCABULARY BY CATEGORY ==========
const shoppingVocabByCategory = {
    clothing: {
        title: '服 (Quần áo)',
        icon: '👕',
        words: [
            { jp: 'シャツ', vn: 'Áo sơ mi', romaji: 'shatsu' },
            { jp: 'Tシャツ', vn: 'Áo thun', romaji: 'T-shatsu' },
            { jp: 'セーター', vn: 'Áo len', romaji: 'seetaa' },
            { jp: 'ジャケット', vn: 'Áo khoác', romaji: 'jaketto' },
            { jp: 'コート', vn: 'Áo choàng', romaji: 'kooto' },
            { jp: 'ズボン', vn: 'Quần dài', romaji: 'zubon' },
            { jp: 'ジーンズ', vn: 'Quần jean', romaji: 'jiinzu' },
            { jp: 'スカート', vn: 'Váy', romaji: 'sukaato' },
            { jp: 'ワンピース', vn: 'Váy liền', romaji: 'wanpiisu' },
            { jp: '下着', vn: 'Đồ lót', romaji: 'shitagi' }
        ]
    },
    accessories: {
        title: 'アクセサリー (Phụ kiện)',
        icon: '💍',
        words: [
            { jp: '帽子', vn: 'Mũ', romaji: 'boushi' },
            { jp: 'ベルト', vn: 'Thắt lưng', romaji: 'beruto' },
            { jp: 'ネクタイ', vn: 'Cà vạt', romaji: 'nekutai' },
            { jp: 'スカーフ', vn: 'Khăn quàng', romaji: 'sukaafu' },
            { jp: '手袋', vn: 'Găng tay', romaji: 'tebukuro' },
            { jp: '時計', vn: 'Đồng hồ', romaji: 'tokei' },
            { jp: 'サングラス', vn: 'Kính râm', romaji: 'sangurasu' },
            { jp: 'イヤリング', vn: 'Bông tai', romaji: 'iyaringu' },
            { jp: 'ネックレス', vn: 'Vòng cổ', romaji: 'nekkuresu' },
            { jp: '指輪', vn: 'Nhẫn', romaji: 'yubiwa' }
        ]
    },
    footwear: {
        title: '靴 (Giày dép)',
        icon: '👟',
        words: [
            { jp: '靴', vn: 'Giày', romaji: 'kutsu' },
            { jp: 'スニーカー', vn: 'Giày sneaker', romaji: 'suniikaa' },
            { jp: 'サンダル', vn: 'Sandal', romaji: 'sandaru' },
            { jp: 'ブーツ', vn: 'Bốt', romaji: 'buutsu' },
            { jp: 'スリッパ', vn: 'Dép lê', romaji: 'surippa' },
            { jp: 'ハイヒール', vn: 'Giày cao gót', romaji: 'haihiiru' },
            { jp: '革靴', vn: 'Giày da', romaji: 'kawagutsu' },
            { jp: '靴下', vn: 'Tất', romaji: 'kutsushita' }
        ]
    },
    colors: {
        title: '色 (Màu sắc)',
        icon: '🎨',
        words: [
            { jp: '赤', vn: 'Đỏ', romaji: 'aka' },
            { jp: '青', vn: 'Xanh dương', romaji: 'ao' },
            { jp: '黄色', vn: 'Vàng', romaji: 'kiiro' },
            { jp: '緑', vn: 'Xanh lá', romaji: 'midori' },
            { jp: '白', vn: 'Trắng', romaji: 'shiro' },
            { jp: '黒', vn: 'Đen', romaji: 'kuro' },
            { jp: 'ピンク', vn: 'Hồng', romaji: 'pinku' },
            { jp: 'オレンジ', vn: 'Cam', romaji: 'orenji' },
            { jp: '紫', vn: 'Tím', romaji: 'murasaki' },
            { jp: 'グレー', vn: 'Xám', romaji: 'guree' },
            { jp: '茶色', vn: 'Nâu', romaji: 'chairo' },
            { jp: 'ベージュ', vn: 'Be', romaji: 'beeju' }
        ]
    },
    sizes: {
        title: 'サイズ (Kích cỡ)',
        icon: '📏',
        words: [
            { jp: 'Sサイズ', vn: 'Size S', romaji: 'esu saizu' },
            { jp: 'Mサイズ', vn: 'Size M', romaji: 'emu saizu' },
            { jp: 'Lサイズ', vn: 'Size L', romaji: 'eru saizu' },
            { jp: 'XLサイズ', vn: 'Size XL', romaji: 'ekusueru saizu' },
            { jp: '大きい', vn: 'Lớn', romaji: 'ookii' },
            { jp: '小さい', vn: 'Nhỏ', romaji: 'chiisai' },
            { jp: '長い', vn: 'Dài', romaji: 'nagai' },
            { jp: '短い', vn: 'Ngắn', romaji: 'mijikai' },
            { jp: 'ぴったり', vn: 'Vừa vặn', romaji: 'pittari' },
            { jp: 'きつい', vn: 'Chật', romaji: 'kitsui' },
            { jp: 'ゆるい', vn: 'Rộng', romaji: 'yurui' }
        ]
    },
    electronics: {
        title: '電子製品 (Đồ điện tử)',
        icon: '📱',
        words: [
            { jp: 'スマホ', vn: 'Điện thoại', romaji: 'sumaho' },
            { jp: 'パソコン', vn: 'Máy tính', romaji: 'pasokon' },
            { jp: 'タブレット', vn: 'Máy tính bảng', romaji: 'taburetto' },
            { jp: 'カメラ', vn: 'Máy ảnh', romaji: 'kamera' },
            { jp: 'テレビ', vn: 'Tivi', romaji: 'terebi' },
            { jp: 'イヤホン', vn: 'Tai nghe', romaji: 'iyahon' },
            { jp: '充電器', vn: 'Sạc', romaji: 'juudenki' },
            { jp: 'バッテリー', vn: 'Pin', romaji: 'batterii' },
            { jp: 'ケース', vn: 'Ốp lưng', romaji: 'keesu' },
            { jp: 'アダプター', vn: 'Adapter', romaji: 'adaputaa' }
        ]
    }
};

console.log('Comprehensive data loaded:', {
    phraseCategories: Object.keys(comprehensivePhrasesData).length,
    numberCategories: Object.keys(numbersData).length,
    vocabCategories: Object.keys(shoppingVocabByCategory).length
});



// ========== COMPLETE LESSON PLAN DATA ==========
const lessonPlanData = {
    bai20: {
        id: 20,
        title: '買い物 - Mua Sắm',
        level: 'N4',
        duration: 90,
        objectives: [
            'Nắm vững 15+ từ vựng về mua sắm',
            'Sử dụng được 6 mẫu câu cơ bản',
            'Thực hành hội thoại tại cửa hàng',
            'Hiểu văn hóa mua sắm Nhật Bản'
        ],
        phases: [
            {
                phase: 1,
                name: 'Khởi Động',
                duration: 15,
                activities: [
                    { name: 'Ice Breaker', duration: 5, desc: 'Chào hỏi bằng tiếng Nhật' },
                    { name: 'Pre-Class Check', duration: 5, desc: 'Kiểm tra bài tập về nhà' },
                    { name: 'Mục Tiêu Bài Học', duration: 5, desc: 'Giới thiệu nội dung hôm nay' }
                ]
            },
            {
                phase: 2,
                name: 'CHECK - Kiểm Tra',
                duration: 25,
                activities: [
                    { name: 'Vocab Check', duration: 8, desc: 'Kiểm tra 15 từ vựng mua sắm' },
                    { name: 'Grammar Check', duration: 12, desc: 'Kiểm tra 6 mẫu câu' },
                    { name: 'Listening Check', duration: 5, desc: 'Nghe hội thoại ngắn' }
                ]
            },
            {
                phase: 3,
                name: 'DRILL - Luyện Tập',
                duration: 25,
                activities: [
                    { name: 'Rapid Fire', duration: 10, desc: 'Hỏi đáp nhanh vocab + grammar' },
                    { name: 'Pronunciation', duration: 7, desc: 'Luyện phát âm từ khó' },
                    { name: 'Grammar Drill', duration: 8, desc: 'Luyện đặt câu' }
                ]
            },
            {
                phase: 4,
                name: 'PRACTICE - Thực Hành',
                duration: 15,
                activities: [
                    { name: 'Role-Play', duration: 10, desc: 'Đóng vai mua bán' },
                    { name: 'Situation', duration: 5, desc: 'Tình huống thực tế' }
                ]
            },
            {
                phase: 5,
                name: 'Tổng Kết',
                duration: 10,
                activities: [
                    { name: 'Recap', duration: 4, desc: 'Ôn lại trọng tâm' },
                    { name: 'Q&A', duration: 4, desc: 'Giải đáp thắc mắc' },
                    { name: 'Homework', duration: 2, desc: 'Giao bài tập về nhà' }
                ]
            }
        ],
        homework: {
            preClass: [
                'Học thuộc 15 từ vựng qua app',
                'Xem video về mua sắm ở Nhật',
                'Làm bài tập grammar online'
            ],
            postClass: [
                'Ôn lại từ vựng đã học',
                'Luyện đọc to hội thoại',
                'Chuẩn bị câu hỏi cho buổi sau'
            ]
        },
        materials: [
            'Slide bài giảng',
            'Audio hội thoại',
            'Flashcard từ vựng',
            'Worksheet grammar'
        ]
    }
};

// ========== ACHIEVEMENT SYSTEM DATA ==========
const achievementData = {
    badges: [
        { id: 'first_word', name: 'Từ Đầu Tiên', icon: '🌱', desc: 'Học từ vựng đầu tiên', points: 10 },
        { id: 'vocab_10', name: 'Người Siêng Năng', icon: '📚', desc: 'Học 10 từ vựng', points: 50 },
        { id: 'vocab_50', name: 'Nhà Sưu Tầm Từ', icon: '📖', desc: 'Học 50 từ vựng', points: 200 },
        { id: 'vocab_100', name: 'Bậc Thầy Từ Vựng', icon: '🎓', desc: 'Học 100 từ vựng', points: 500 },
        { id: 'perfect_quiz', name: 'Hoàn Hảo', icon: '💯', desc: 'Đạt 100% quiz', points: 100 },
        { id: 'streak_7', name: 'Kiên Trì', icon: '🔥', desc: '7 ngày liên tiếp', points: 150 },
        { id: 'streak_30', name: 'Không Gì Cản Nổi', icon: '🏆', desc: '30 ngày liên tiếp', points: 500 },
        { id: 'early_bird', name: 'Chim Sớm', icon: '🐦', desc: 'Học trước 7 giờ sáng', points: 30 },
        { id: 'night_owl', name: 'Cú Đêm', icon: '🦉', desc: 'Học sau 11 giờ tối', points: 30 },
        { id: 'social', name: 'Bạn Học Giỏi', icon: '🤝', desc: 'Giúp bạn cùng lớp', points: 75 },
        { id: 'speaker', name: 'Người Phát Biểu', icon: '🎤', desc: 'Phát biểu 10 lần', points: 80 },
        { id: 'listener', name: 'Người Nghe Tốt', icon: '👂', desc: 'Hoàn thành 10 bài nghe', points: 80 }
    ],
    levels: [
        { level: 1, name: 'Người Mới', minPoints: 0, maxPoints: 100, icon: '🌱' },
        { level: 2, name: 'Học Viên', minPoints: 100, maxPoints: 300, icon: '📗' },
        { level: 3, name: 'Người Học Chăm Chỉ', minPoints: 300, maxPoints: 600, icon: '📘' },
        { level: 4, name: 'Người Tiến Bộ', minPoints: 600, maxPoints: 1000, icon: '📙' },
        { level: 5, name: 'Người Thành Thạo', minPoints: 1000, maxPoints: 1500, icon: '📕' },
        { level: 6, name: 'Chuyên Gia', minPoints: 1500, maxPoints: 2500, icon: '🎖️' },
        { level: 7, name: 'Bậc Thầy', minPoints: 2500, maxPoints: 4000, icon: '🏅' },
        { level: 8, name: 'Huyền Thoại', minPoints: 4000, maxPoints: 6000, icon: '🥇' },
        { level: 9, name: 'Cao Thủ', minPoints: 6000, maxPoints: 10000, icon: '👑' },
        { level: 10, name: 'Thần Thoại', minPoints: 10000, maxPoints: Infinity, icon: '🌟' }
    ]
};

// ========== KEIGO (KÍNH NGỮ) GUIDE ==========
const keigoGuide = {
    title: 'Kính Ngữ Cơ Bản Khi Mua Sắm',
    intro: 'Kính ngữ là cách nói tôn kính, lịch sự trong tiếng Nhật. Khi mua sắm, nhân viên thường dùng kính ngữ với khách.',
    categories: [
        {
            type: 'teineigo',
            name: 'Thể Lịch Sự (丁寧語)',
            desc: 'Cách nói lịch sự cơ bản, dùng です/ます',
            examples: [
                { normal: 'これ、何?', polite: 'これは何ですか。', vn: 'Cái này là gì?' },
                { normal: 'いくら?', polite: 'いくらですか。', vn: 'Bao nhiêu tiền?' },
                { normal: 'ある?', polite: 'ありますか。', vn: 'Có không?' }
            ]
        },
        {
            type: 'sonkeigo',
            name: 'Tôn Kính Ngữ (尊敬語)',
            desc: 'Cách nói tôn kính người khác (nhân viên dùng với khách)',
            examples: [
                { normal: '見る', polite: 'ご覧になる', vn: 'Xem (kính ngữ)' },
                { normal: '言う', polite: 'おっしゃる', vn: 'Nói (kính ngữ)' },
                { normal: '来る', polite: 'いらっしゃる', vn: 'Đến (kính ngữ)' }
            ]
        },
        {
            type: 'kenjougo',
            name: 'Khiêm Nhường Ngữ (謙譲語)',
            desc: 'Cách nói hạ mình, khiêm tốn (dùng khi nói về hành động của mình)',
            examples: [
                { normal: '見る', polite: '拝見する', vn: 'Xem (khiêm nhường)' },
                { normal: '言う', polite: '申す', vn: 'Nói (khiêm nhường)' },
                { normal: '行く', polite: '参る', vn: 'Đi (khiêm nhường)' }
            ]
        }
    ],
    commonPhrases: [
        { jp: 'いらっしゃいませ', reading: 'irasshaimase', vn: 'Chào mừng quý khách', usage: 'Nhân viên chào khách' },
        { jp: 'かしこまりました', reading: 'kashikomarimashita', vn: 'Vâng ạ, tôi hiểu', usage: 'Nhân viên xác nhận' },
        { jp: '少々お待ちください', reading: 'shoushou omachi kudasai', vn: 'Xin vui lòng đợi', usage: 'Nhân viên nhờ chờ' },
        { jp: 'ありがとうございました', reading: 'arigatou gozaimashita', vn: 'Xin cảm ơn', usage: 'Sau khi mua xong' },
        { jp: 'またお越しくださいませ', reading: 'mata okoshi kudasaimase', vn: 'Mời quay lại', usage: 'Nhân viên tiễn khách' }
    ]
};

// ========== TIPS AND TRICKS ==========
const tipsAndTricks = {
    shopping: [
        {
            title: 'Mua sắm Tax-Free',
            icon: '🛍️',
            tips: [
                'Mang theo hộ chiếu khi mua sắm',
                'Mua từ 5,000 yên trở lên để được miễn thuế',
                'Tìm biển "Tax-Free" ở cửa hàng',
                'Không mở niêm phong trước khi rời Nhật'
            ]
        },
        {
            title: 'Mặc cả ở Nhật',
            icon: '💰',
            tips: [
                'Chỉ có thể mặc cả ở chợ đồ cũ, đồ điện tử',
                'Không mặc cả ở cửa hàng có giá niêm yết',
                'Nói "もう少し安くなりますか" để hỏi giảm giá',
                'Mua nhiều để có thể xin giảm giá'
            ]
        },
        {
            title: 'Thanh toán',
            icon: '💳',
            tips: [
                'Hầu hết nơi nhận tiền mặt',
                'Thẻ tín dụng phổ biến ở cửa hàng lớn',
                'Konbini và siêu thị nhận IC card',
                'Kiểm tra biểu tượng thanh toán trước khi mua'
            ]
        },
        {
            title: 'Thời điểm mua sắm',
            icon: '📅',
            tips: [
                'Tháng 1: Hatsuuri (初売り) - Sale đầu năm',
                'Tháng 7: Summer Sale',
                'Cuối tuần: Chợ trời, chợ đồ cũ',
                'Black Friday bắt đầu phổ biến ở Nhật'
            ]
        }
    ],
    pronunciation: [
        {
            sound: '長音 (Âm dài)',
            examples: ['おばさん vs おばあさん', 'ビル vs ビール'],
            tip: 'Kéo dài nguyên âm gấp đôi thời gian'
        },
        {
            sound: '促音 (Âm っ)',
            examples: ['きて vs きって', 'いた vs いった'],
            tip: 'Dừng hơi thở một nhịp trước phụ âm tiếp theo'
        },
        {
            sound: 'Âm ん',
            examples: ['せんえん', 'にほんご'],
            tip: 'Phát âm như "ng" trong tiếng Việt'
        },
        {
            sound: 'Âm R/L',
            examples: ['らりるれろ'],
            tip: 'Lưỡi chạm nhẹ vòm miệng, giữa L và R'
        }
    ],
    memory: [
        {
            title: 'Học Kanji',
            tips: [
                'Học theo bộ thủ',
                'Nhớ câu chuyện cho mỗi kanji',
                'Viết đi viết lại nhiều lần',
                'Dùng flashcard với SRS'
            ]
        },
        {
            title: 'Học Từ Vựng',
            tips: [
                'Học trong ngữ cảnh, không học riêng lẻ',
                'Tạo câu ví dụ cho mỗi từ',
                'Nghe và lặp lại nhiều lần',
                'Review hàng ngày theo ChopChep'
            ]
        },
        {
            title: 'Học Grammar',
            tips: [
                'Hiểu cấu trúc trước khi nhớ',
                'Tạo nhiều câu ví dụ',
                'Nghe native speakers dùng',
                'Thực hành trong hội thoại thực'
            ]
        }
    ]
};

// ========== COMMON MISTAKES DATA ==========
const commonMistakesData = [
    {
        category: 'Phát âm',
        mistakes: [
            { wrong: 'おかあさん (phát âm ngắn)', correct: 'おかあさん (âm dài ở あ)', explain: 'Âm dài rất quan trọng, thay đổi nghĩa hoàn toàn' },
            { wrong: 'きて (cut)', correct: 'きって (stamp)', explain: 'Âm っ tạo khoảng dừng ngắn' },
            { wrong: 'R như tiếng Anh', correct: 'R như giữa L và R', explain: 'Lưỡi chạm nhẹ vòm miệng' }
        ]
    },
    {
        category: 'Grammar',
        mistakes: [
            { wrong: '私は買い物が好き', correct: '私は買い物が好きです', explain: 'Luôn dùng です/ます trong giao tiếp lịch sự' },
            { wrong: '何を探しますか', correct: '何をお探しですか', explain: 'Nhân viên dùng kính ngữ với khách' },
            { wrong: 'これ、いくら?', correct: 'これはいくらですか。', explain: 'Thêm は và ですか để lịch sự hơn' }
        ]
    },
    {
        category: 'Văn hóa',
        mistakes: [
            { wrong: 'Đưa tiền trực tiếp', correct: 'Đặt tiền vào khay', explain: 'Phép lịch sự khi thanh toán ở Nhật' },
            { wrong: 'Tip cho nhân viên', correct: 'Không tip', explain: 'Văn hóa Nhật không có tip, có thể gây khó xử' },
            { wrong: 'Mặc cả ở mọi nơi', correct: 'Chỉ ở nơi cho phép', explain: 'Không mặc cả ở cửa hàng có giá niêm yết' }
        ]
    }
];

// ========== SAMPLE DIALOGUES FOR PRACTICE ==========
const practiceDialogues = [
    {
        id: 1,
        situation: 'Mua áo sơ mi',
        difficulty: 'Dễ',
        lines: [
            { role: 'staff', jp: 'いらっしゃいませ。', vn: 'Chào mừng quý khách.', audio: true },
            { role: 'you', jp: 'すみません、シャツを探しています。', vn: 'Xin lỗi, tôi đang tìm áo sơ mi.', audio: true },
            { role: 'staff', jp: 'サイズは何ですか。', vn: 'Size bao nhiêu ạ?', audio: true },
            { role: 'you', jp: 'Mサイズをお願いします。', vn: 'Cho tôi size M.', audio: true },
            { role: 'staff', jp: 'こちらはいかがですか。', vn: 'Cái này thì sao ạ?', audio: true },
            { role: 'you', jp: '試着してもいいですか。', vn: 'Tôi thử được không?', audio: true },
            { role: 'staff', jp: 'はい、どうぞ。', vn: 'Vâng, mời.', audio: true }
        ]
    },
    {
        id: 2,
        situation: 'Thanh toán bằng thẻ',
        difficulty: 'Dễ',
        lines: [
            { role: 'you', jp: 'これをください。', vn: 'Cho tôi cái này.', audio: true },
            { role: 'staff', jp: '3000円になります。', vn: 'Là 3000 yên ạ.', audio: true },
            { role: 'you', jp: 'カードで払えますか。', vn: 'Trả bằng thẻ được không?', audio: true },
            { role: 'staff', jp: 'はい、大丈夫です。', vn: 'Vâng, được ạ.', audio: true },
            { role: 'you', jp: '袋をください。', vn: 'Cho tôi túi.', audio: true },
            { role: 'staff', jp: 'はい、少々お待ちください。', vn: 'Vâng, xin đợi chút.', audio: true },
            { role: 'staff', jp: 'ありがとうございました。', vn: 'Cảm ơn quý khách.', audio: true }
        ]
    },
    {
        id: 3,
        situation: 'Đổi size',
        difficulty: 'Trung bình',
        lines: [
            { role: 'you', jp: 'すみません、サイズを交換したいのですが。', vn: 'Xin lỗi, tôi muốn đổi size.', audio: true },
            { role: 'staff', jp: 'レシートはありますか。', vn: 'Có hóa đơn không ạ?', audio: true },
            { role: 'you', jp: 'はい、これです。', vn: 'Có, đây ạ.', audio: true },
            { role: 'staff', jp: '何サイズに交換しますか。', vn: 'Đổi sang size gì ạ?', audio: true },
            { role: 'you', jp: 'Lサイズをお願いします。', vn: 'Cho tôi size L.', audio: true },
            { role: 'staff', jp: 'かしこまりました。少々お待ちください。', vn: 'Vâng ạ. Xin đợi chút.', audio: true }
        ]
    }
];

console.log('Final data loaded:', {
    lessonPlanData: Object.keys(lessonPlanData).length,
    achievementBadges: achievementData.badges.length,
    achievementLevels: achievementData.levels.length,
    keigoCategories: keigoGuide.categories.length,
    tipsCategories: Object.keys(tipsAndTricks).length,
    commonMistakesCategories: commonMistakesData.length,
    practiceDialogues: practiceDialogues.length
});



// ========== FINAL ADDITIONS - N4 KANJI LIST ==========
const n4KanjiList = [
    // Shopping related kanji
    { kanji: '店', on: 'テン', kun: 'みせ', meaning: 'Cửa hàng', examples: ['店員', '書店', '店長'] },
    { kanji: '買', on: 'バイ', kun: 'かう', meaning: 'Mua', examples: ['買い物', '購買', '売買'] },
    { kanji: '売', on: 'バイ', kun: 'うる', meaning: 'Bán', examples: ['売り場', '販売', '特売'] },
    { kanji: '品', on: 'ヒン', kun: 'しな', meaning: 'Hàng hóa', examples: ['食品', '品質', '商品'] },
    { kanji: '物', on: 'ブツ', kun: 'もの', meaning: 'Vật', examples: ['買い物', '食べ物', '物語'] },
    { kanji: '金', on: 'キン', kun: 'かね', meaning: 'Tiền/Vàng', examples: ['お金', '金曜日', '金額'] },
    { kanji: '銀', on: 'ギン', kun: 'しろがね', meaning: 'Bạc', examples: ['銀行', '銀色', '銀座'] },
    { kanji: '円', on: 'エン', kun: 'まるい', meaning: 'Yên/Tròn', examples: ['百円', '円安', '円高'] },
    { kanji: '安', on: 'アン', kun: 'やすい', meaning: 'Rẻ/An toàn', examples: ['安い', '安全', '安心'] },
    { kanji: '高', on: 'コウ', kun: 'たかい', meaning: 'Cao/Đắt', examples: ['高い', '高校', '最高'] },
    { kanji: '多', on: 'タ', kun: 'おおい', meaning: 'Nhiều', examples: ['多い', '多分', '多数'] },
    { kanji: '少', on: 'ショウ', kun: 'すこし', meaning: 'Ít', examples: ['少ない', '少し', '少年'] },
    { kanji: '色', on: 'ショク', kun: 'いろ', meaning: 'Màu sắc', examples: ['色', '景色', '特色'] },
    { kanji: '赤', on: 'セキ', kun: 'あか', meaning: 'Đỏ', examples: ['赤い', '赤ちゃん', '赤道'] },
    { kanji: '青', on: 'セイ', kun: 'あお', meaning: 'Xanh dương', examples: ['青い', '青年', '青空'] },
    { kanji: '白', on: 'ハク', kun: 'しろ', meaning: 'Trắng', examples: ['白い', '白紙', '告白'] },
    { kanji: '黒', on: 'コク', kun: 'くろ', meaning: 'Đen', examples: ['黒い', '黒板', '黒字'] },
    { kanji: '着', on: 'チャク', kun: 'きる', meaning: 'Mặc/Đến', examples: ['着る', '到着', '着物'] },
    { kanji: '服', on: 'フク', kun: '', meaning: 'Quần áo', examples: ['洋服', '和服', '制服'] },
    { kanji: '持', on: 'ジ', kun: 'もつ', meaning: 'Cầm/Có', examples: ['持つ', '気持ち', '持ち物'] }
];

// ========== GREETING VARIATIONS ==========
const greetingVariations = {
    morning: [
        { jp: 'おはようございます', romaji: 'Ohayou gozaimasu', vn: 'Chào buổi sáng (lịch sự)', level: 'Formal' },
        { jp: 'おはよう', romaji: 'Ohayou', vn: 'Chào buổi sáng (thân mật)', level: 'Casual' }
    ],
    afternoon: [
        { jp: 'こんにちは', romaji: 'Konnichiwa', vn: 'Xin chào (buổi chiều)', level: 'Standard' }
    ],
    evening: [
        { jp: 'こんばんは', romaji: 'Konbanwa', vn: 'Chào buổi tối', level: 'Standard' }
    ],
    goodbye: [
        { jp: 'さようなら', romaji: 'Sayounara', vn: 'Tạm biệt (lâu)', level: 'Formal' },
        { jp: 'じゃあね', romaji: 'Jaa ne', vn: 'Tạm biệt (thân mật)', level: 'Casual' },
        { jp: 'また明日', romaji: 'Mata ashita', vn: 'Hẹn gặp lại ngày mai', level: 'Casual' },
        { jp: 'お先に失礼します', romaji: 'Osaki ni shitsurei shimasu', vn: 'Xin phép đi trước', level: 'Formal' },
        { jp: 'お疲れ様でした', romaji: 'Otsukaresama deshita', vn: 'Cảm ơn đã làm việc vất vả', level: 'Formal' }
    ],
    thanks: [
        { jp: 'ありがとうございます', romaji: 'Arigatou gozaimasu', vn: 'Cảm ơn (lịch sự)', level: 'Formal' },
        { jp: 'ありがとう', romaji: 'Arigatou', vn: 'Cảm ơn (thân mật)', level: 'Casual' },
        { jp: 'どうも', romaji: 'Doumo', vn: 'Cảm ơn (rất casual)', level: 'Very Casual' },
        { jp: '助かりました', romaji: 'Tasukarimashita', vn: 'Giúp tôi rất nhiều', level: 'Formal' }
    ],
    sorry: [
        { jp: 'すみません', romaji: 'Sumimasen', vn: 'Xin lỗi / Cho phép hỏi', level: 'Standard' },
        { jp: 'ごめんなさい', romaji: 'Gomen nasai', vn: 'Xin lỗi', level: 'Standard' },
        { jp: 'ごめん', romaji: 'Gomen', vn: 'Xin lỗi (thân mật)', level: 'Casual' },
        { jp: '申し訳ありません', romaji: 'Moushiwake arimasen', vn: 'Rất xin lỗi', level: 'Very Formal' }
    ]
};

// ========== PAYMENT METHODS IN JAPAN ==========
const paymentMethodsJapan = {
    cash: {
        name: '現金 (Genkin)',
        vn: 'Tiền mặt',
        icon: '💴',
        notes: [
            'Vẫn là phương thức phổ biến nhất',
            'Nhật Bản vẫn là xã hội tiền mặt',
            'Luôn mang theo tiền mặt để backup'
        ],
        phrases: [
            { jp: '現金でお願いします', vn: 'Tôi trả tiền mặt' },
            { jp: 'お釣りをください', vn: 'Cho tôi tiền thối' }
        ]
    },
    creditCard: {
        name: 'クレジットカード (Credit Card)',
        vn: 'Thẻ tín dụng',
        icon: '💳',
        notes: [
            'Visa, Mastercard, JCB được chấp nhận rộng rãi',
            'American Express ít phổ biến hơn',
            'Cửa hàng nhỏ có thể không nhận thẻ'
        ],
        phrases: [
            { jp: 'カードで払えますか', vn: 'Trả bằng thẻ được không?' },
            { jp: '一回払いでお願いします', vn: 'Thanh toán một lần' }
        ]
    },
    icCard: {
        name: 'ICカード (IC Card)',
        vn: 'Thẻ IC',
        icon: '🎫',
        types: ['Suica', 'PASMO', 'ICOCA', 'Kitaca'],
        notes: [
            'Rất tiện lợi cho giao thông và mua sắm nhỏ',
            'Chạm và thanh toán nhanh',
            'Nạp tiền tại máy bán vé hoặc konbini'
        ],
        phrases: [
            { jp: 'Suicaで払います', vn: 'Tôi trả bằng Suica' },
            { jp: 'チャージしたいです', vn: 'Tôi muốn nạp tiền' }
        ]
    },
    qrCode: {
        name: 'QRコード決済 (QR Payment)',
        vn: 'Thanh toán QR',
        icon: '📱',
        types: ['PayPay', 'LINE Pay', 'Rakuten Pay', 'au PAY'],
        notes: [
            'Ngày càng phổ biến, đặc biệt sau COVID',
            'Nhiều chiến dịch khuyến mãi',
            'Cần app và tài khoản Nhật'
        ],
        phrases: [
            { jp: 'PayPayで払えますか', vn: 'Trả bằng PayPay được không?' },
            { jp: 'QRコードはどこですか', vn: 'Mã QR ở đâu?' }
        ]
    }
};

// ========== STORE TYPES IN JAPAN ==========
const storeTypesJapan = [
    { jp: 'デパート', romaji: 'depaato', vn: 'Cửa hàng bách hóa', desc: 'Cao cấp, nhiều tầng, dịch vụ tốt', examples: ['Isetan', 'Takashimaya', 'Mitsukoshi'] },
    { jp: 'ショッピングモール', romaji: 'shopping mooru', vn: 'Trung tâm mua sắm', desc: 'Nhiều cửa hàng, khu ăn uống', examples: ['AEON Mall', 'LaLaport', 'Parco'] },
    { jp: 'コンビニ', romaji: 'konbini', vn: 'Cửa hàng tiện lợi', desc: '24/7, mọi thứ', examples: ['7-Eleven', 'Lawson', 'FamilyMart'] },
    { jp: 'スーパー', romaji: 'suupaa', vn: 'Siêu thị', desc: 'Thực phẩm, đồ gia dụng', examples: ['AEON', 'Ito-Yokado', 'Life'] },
    { jp: '100円ショップ', romaji: 'hyakuen shoppu', vn: 'Cửa hàng 100 yên', desc: 'Mọi thứ giá rẻ', examples: ['Daiso', 'Seria', 'Can Do'] },
    { jp: 'ドラッグストア', romaji: 'doraggu sutoa', vn: 'Hiệu thuốc', desc: 'Thuốc, mỹ phẩm, snack', examples: ['Matsumoto Kiyoshi', 'Sundrug', 'Welcia'] },
    { jp: '家電量販店', romaji: 'kaden ryouhanten', vn: 'Cửa hàng điện máy', desc: 'Điện tử, gia dụng', examples: ['Yodobashi Camera', 'Bic Camera', 'Yamada Denki'] },
    { jp: 'アウトレット', romaji: 'autoretto', vn: 'Outlet', desc: 'Hàng hiệu giảm giá', examples: ['Gotemba', 'Rinku', 'Mitsui'] },
    { jp: '古着屋', romaji: 'furugiya', vn: 'Cửa hàng đồ cũ', desc: 'Vintage, second-hand', examples: ['2nd Street', 'Book Off', 'Mode Off'] },
    { jp: '商店街', romaji: 'shoutengai', vn: 'Phố mua sắm', desc: 'Cửa hàng địa phương', examples: ['Ameyoko', 'Nakano Broadway'] }
];

// ========== SEASONAL SALES IN JAPAN ==========
const seasonalSalesJapan = [
    { season: '正月 (Shougatsu)', time: 'Tháng 1', event: '初売り (Hatsuuri)', desc: 'Sale đầu năm, fukubukuro (túi may mắn)' },
    { season: '春 (Haru)', time: 'Tháng 3-4', event: '決算セール', desc: 'Sale cuối năm tài chính' },
    { season: 'ゴールデンウィーク', time: 'Cuối tháng 4', event: 'GW Sale', desc: 'Sale tuần lễ vàng' },
    { season: '夏 (Natsu)', time: 'Tháng 7-8', event: 'サマーセール', desc: 'Summer sale lớn' },
    { season: 'お盆 (Obon)', time: 'Tháng 8', event: 'お盆セール', desc: 'Sale lễ Obon' },
    { season: '秋 (Aki)', time: 'Tháng 10-11', event: '秋セール', desc: 'Sale mùa thu' },
    { season: 'ブラックフライデー', time: 'Tháng 11', event: 'Black Friday', desc: 'Ngày càng phổ biến ở Nhật' },
    { season: '年末 (Nenmatsu)', time: 'Tháng 12', event: '年末セール', desc: 'Sale cuối năm' }
];

// ========== SYSTEM MESSAGES (VIETNAMESE) ==========
const systemMessages = {
    welcome: 'Chào mừng đến với TikMe - Nền tảng học tiếng Nhật theo phương pháp ChopChep!',
    lessonStart: 'Bài học đã bắt đầu! Hãy chuẩn bị tinh thần học tập nhé!',
    phaseChange: (phase) => `Chuyển sang giai đoạn: ${phase}`,
    timeWarning: (mins) => `Còn ${mins} phút nữa!`,
    studentCalled: (name) => `${name} đã được gọi trả lời!`,
    correctAnswer: 'Chính xác! Xuất sắc lắm!',
    wrongAnswer: 'Chưa đúng, cố gắng thêm nhé!',
    vocabComplete: (word) => `Đã hoàn thành từ vựng: ${word}`,
    lessonEnd: 'Kết thúc buổi học! Cảm ơn các bạn đã tham gia!',
    achievementUnlocked: (badge) => `🎉 Mở khóa thành tựu: ${badge}!`,
    levelUp: (level) => `🎊 Lên cấp! Bạn đã đạt cấp ${level}!`,
    streakBonus: (days) => `🔥 Streak ${days} ngày! Tiếp tục cố gắng!`,
    encouragement: [
        '頑張って！ - Ganbatte! - Cố lên!',
        'いいですね！ - Ii desu ne! - Tốt lắm!',
        'すごい！ - Sugoi! - Tuyệt vời!',
        'もう少し！ - Mou sukoshi! - Một chút nữa thôi!',
        '上手ですね！ - Jouzu desu ne! - Giỏi quá!'
    ]
};

console.log('TikMe V5 Ultimate - All data loaded successfully!', {
    n4Kanji: n4KanjiList.length,
    greetingCategories: Object.keys(greetingVariations).length,
    paymentMethods: Object.keys(paymentMethodsJapan).length,
    storeTypes: storeTypesJapan.length,
    seasonalSales: seasonalSalesJapan.length
});



// ========== JAPANESE COUNTERS COMPREHENSIVE ==========
const japaneseCounters = {
    general: {
        title: 'Đếm chung (つ)',
        items: [
            { num: 1, reading: 'ひとつ', romaji: 'hitotsu' },
            { num: 2, reading: 'ふたつ', romaji: 'futatsu' },
            { num: 3, reading: 'みっつ', romaji: 'mittsu' },
            { num: 4, reading: 'よっつ', romaji: 'yottsu' },
            { num: 5, reading: 'いつつ', romaji: 'itsutsu' },
            { num: 6, reading: 'むっつ', romaji: 'muttsu' },
            { num: 7, reading: 'ななつ', romaji: 'nanatsu' },
            { num: 8, reading: 'やっつ', romaji: 'yattsu' },
            { num: 9, reading: 'ここのつ', romaji: 'kokonotsu' },
            { num: 10, reading: 'とお', romaji: 'too' }
        ],
        usage: 'Dùng cho đồ vật nhỏ, trừu tượng, hoặc khi không biết counter phù hợp'
    },
    ko: {
        title: 'Đồ vật nhỏ (個)',
        items: [
            { num: 1, reading: 'いっこ', romaji: 'ikko' },
            { num: 2, reading: 'にこ', romaji: 'niko' },
            { num: 3, reading: 'さんこ', romaji: 'sanko' },
            { num: 4, reading: 'よんこ', romaji: 'yonko' },
            { num: 5, reading: 'ごこ', romaji: 'goko' },
            { num: 6, reading: 'ろっこ', romaji: 'rokko' },
            { num: 7, reading: 'ななこ', romaji: 'nanako' },
            { num: 8, reading: 'はっこ', romaji: 'hakko' },
            { num: 9, reading: 'きゅうこ', romaji: 'kyuuko' },
            { num: 10, reading: 'じゅっこ', romaji: 'jukko' }
        ],
        usage: 'Trái cây, bánh, trứng, đồ nhỏ tròn'
    },
    mai: {
        title: 'Đồ mỏng phẳng (枚)',
        items: [
            { num: 1, reading: 'いちまい', romaji: 'ichimai' },
            { num: 2, reading: 'にまい', romaji: 'nimai' },
            { num: 3, reading: 'さんまい', romaji: 'sanmai' },
            { num: 4, reading: 'よんまい', romaji: 'yonmai' },
            { num: 5, reading: 'ごまい', romaji: 'gomai' },
            { num: 6, reading: 'ろくまい', romaji: 'rokumai' },
            { num: 7, reading: 'ななまい', romaji: 'nanamai' },
            { num: 8, reading: 'はちまい', romaji: 'hachimai' },
            { num: 9, reading: 'きゅうまい', romaji: 'kyuumai' },
            { num: 10, reading: 'じゅうまい', romaji: 'juumai' }
        ],
        usage: 'Giấy, áo, đĩa, vé, ảnh'
    },
    hon: {
        title: 'Đồ dài tròn (本)',
        items: [
            { num: 1, reading: 'いっぽん', romaji: 'ippon' },
            { num: 2, reading: 'にほん', romaji: 'nihon' },
            { num: 3, reading: 'さんぼん', romaji: 'sanbon' },
            { num: 4, reading: 'よんほん', romaji: 'yonhon' },
            { num: 5, reading: 'ごほん', romaji: 'gohon' },
            { num: 6, reading: 'ろっぽん', romaji: 'roppon' },
            { num: 7, reading: 'ななほん', romaji: 'nanahon' },
            { num: 8, reading: 'はっぽん', romaji: 'happon' },
            { num: 9, reading: 'きゅうほん', romaji: 'kyuuhon' },
            { num: 10, reading: 'じゅっぽん', romaji: 'juppon' }
        ],
        usage: 'Bút, chai, cây, ô, cà vạt'
    },
    satsu: {
        title: 'Sách, tạp chí (冊)',
        items: [
            { num: 1, reading: 'いっさつ', romaji: 'issatsu' },
            { num: 2, reading: 'にさつ', romaji: 'nisatsu' },
            { num: 3, reading: 'さんさつ', romaji: 'sansatsu' },
            { num: 4, reading: 'よんさつ', romaji: 'yonsatsu' },
            { num: 5, reading: 'ごさつ', romaji: 'gosatsu' }
        ],
        usage: 'Sách, tạp chí, notebook'
    },
    dai: {
        title: 'Máy móc, xe (台)',
        items: [
            { num: 1, reading: 'いちだい', romaji: 'ichidai' },
            { num: 2, reading: 'にだい', romaji: 'nidai' },
            { num: 3, reading: 'さんだい', romaji: 'sandai' },
            { num: 4, reading: 'よんだい', romaji: 'yondai' },
            { num: 5, reading: 'ごだい', romaji: 'godai' }
        ],
        usage: 'Xe, máy tính, TV, tủ lạnh'
    },
    chaku: {
        title: 'Quần áo (着)',
        items: [
            { num: 1, reading: 'いっちゃく', romaji: 'icchaku' },
            { num: 2, reading: 'にちゃく', romaji: 'nichaku' },
            { num: 3, reading: 'さんちゃく', romaji: 'sanchaku' },
            { num: 4, reading: 'よんちゃく', romaji: 'yonchaku' },
            { num: 5, reading: 'ごちゃく', romaji: 'gochaku' }
        ],
        usage: 'Áo, váy, bộ đồ'
    },
    soku: {
        title: 'Giày, tất (足)',
        items: [
            { num: 1, reading: 'いっそく', romaji: 'issoku' },
            { num: 2, reading: 'にそく', romaji: 'nisoku' },
            { num: 3, reading: 'さんぞく', romaji: 'sanzoku' },
            { num: 4, reading: 'よんそく', romaji: 'yonsoku' },
            { num: 5, reading: 'ごそく', romaji: 'gosoku' }
        ],
        usage: 'Giày, dép, tất (theo đôi)'
    }
};

// ========== ADJECTIVE CONJUGATIONS ==========
const adjectiveConjugations = {
    iAdjectives: {
        title: 'Tính từ đuôi い (i-adjectives)',
        examples: [
            {
                word: '高い', reading: 'たかい', meaning: 'Đắt/Cao',
                forms: {
                    present_aff: { form: '高いです', reading: 'たかいです', meaning: 'Đắt (lịch sự)' },
                    present_neg: { form: '高くないです', reading: 'たかくないです', meaning: 'Không đắt' },
                    past_aff: { form: '高かったです', reading: 'たかかったです', meaning: 'Đã đắt' },
                    past_neg: { form: '高くなかったです', reading: 'たかくなかったです', meaning: 'Đã không đắt' },
                    te_form: { form: '高くて', reading: 'たかくて', meaning: 'Đắt và...' }
                }
            },
            {
                word: '安い', reading: 'やすい', meaning: 'Rẻ',
                forms: {
                    present_aff: { form: '安いです', reading: 'やすいです', meaning: 'Rẻ' },
                    present_neg: { form: '安くないです', reading: 'やすくないです', meaning: 'Không rẻ' },
                    past_aff: { form: '安かったです', reading: 'やすかったです', meaning: 'Đã rẻ' },
                    past_neg: { form: '安くなかったです', reading: 'やすくなかったです', meaning: 'Đã không rẻ' },
                    te_form: { form: '安くて', reading: 'やすくて', meaning: 'Rẻ và...' }
                }
            },
            {
                word: '大きい', reading: 'おおきい', meaning: 'To/Lớn',
                forms: {
                    present_aff: { form: '大きいです', reading: 'おおきいです', meaning: 'To' },
                    present_neg: { form: '大きくないです', reading: 'おおきくないです', meaning: 'Không to' },
                    past_aff: { form: '大きかったです', reading: 'おおきかったです', meaning: 'Đã to' },
                    past_neg: { form: '大きくなかったです', reading: 'おおきくなかったです', meaning: 'Đã không to' },
                    te_form: { form: '大きくて', reading: 'おおきくて', meaning: 'To và...' }
                }
            }
        ],
        rule: 'Bỏ い → thêm くない (phủ định), かった (quá khứ), くて (nối)'
    },
    naAdjectives: {
        title: 'Tính từ đuôi な (na-adjectives)',
        examples: [
            {
                word: '綺麗', reading: 'きれい', meaning: 'Đẹp/Sạch',
                forms: {
                    present_aff: { form: '綺麗です', reading: 'きれいです', meaning: 'Đẹp' },
                    present_neg: { form: '綺麗じゃないです', reading: 'きれいじゃないです', meaning: 'Không đẹp' },
                    past_aff: { form: '綺麗でした', reading: 'きれいでした', meaning: 'Đã đẹp' },
                    past_neg: { form: '綺麗じゃなかったです', reading: 'きれいじゃなかったです', meaning: 'Đã không đẹp' },
                    te_form: { form: '綺麗で', reading: 'きれいで', meaning: 'Đẹp và...' }
                }
            },
            {
                word: '有名', reading: 'ゆうめい', meaning: 'Nổi tiếng',
                forms: {
                    present_aff: { form: '有名です', reading: 'ゆうめいです', meaning: 'Nổi tiếng' },
                    present_neg: { form: '有名じゃないです', reading: 'ゆうめいじゃないです', meaning: 'Không nổi tiếng' },
                    past_aff: { form: '有名でした', reading: 'ゆうめいでした', meaning: 'Đã nổi tiếng' },
                    past_neg: { form: '有名じゃなかったです', reading: 'ゆうめいじゃなかったです', meaning: 'Đã không nổi tiếng' },
                    te_form: { form: '有名で', reading: 'ゆうめいで', meaning: 'Nổi tiếng và...' }
                }
            }
        ],
        rule: 'Thêm じゃない (phủ định), でした (quá khứ), で (nối)'
    }
};

// ========== VERB CONJUGATIONS FOR SHOPPING ==========
const verbConjugations = {
    group1: {
        title: 'Động từ nhóm 1 (u-verbs)',
        verbs: [
            {
                dict: '買う', reading: 'かう', meaning: 'Mua',
                masu: '買います', te: '買って', ta: '買った', nai: '買わない',
                potential: '買える', volitional: '買おう'
            },
            {
                dict: '売る', reading: 'うる', meaning: 'Bán',
                masu: '売ります', te: '売って', ta: '売った', nai: '売らない',
                potential: '売れる', volitional: '売ろう'
            },
            {
                dict: '持つ', reading: 'もつ', meaning: 'Cầm/Có',
                masu: '持ちます', te: '持って', ta: '持った', nai: '持たない',
                potential: '持てる', volitional: '持とう'
            },
            {
                dict: '払う', reading: 'はらう', meaning: 'Trả tiền',
                masu: '払います', te: '払って', ta: '払った', nai: '払わない',
                potential: '払える', volitional: '払おう'
            },
            {
                dict: '探す', reading: 'さがす', meaning: 'Tìm kiếm',
                masu: '探します', te: '探して', ta: '探した', nai: '探さない',
                potential: '探せる', volitional: '探そう'
            }
        ]
    },
    group2: {
        title: 'Động từ nhóm 2 (ru-verbs)',
        verbs: [
            {
                dict: '見る', reading: 'みる', meaning: 'Xem',
                masu: '見ます', te: '見て', ta: '見た', nai: '見ない',
                potential: '見られる', volitional: '見よう'
            },
            {
                dict: '着る', reading: 'きる', meaning: 'Mặc',
                masu: '着ます', te: '着て', ta: '着た', nai: '着ない',
                potential: '着られる', volitional: '着よう'
            },
            {
                dict: '見せる', reading: 'みせる', meaning: 'Cho xem',
                masu: '見せます', te: '見せて', ta: '見せた', nai: '見せない',
                potential: '見せられる', volitional: '見せよう'
            }
        ]
    },
    group3: {
        title: 'Động từ bất quy tắc',
        verbs: [
            {
                dict: 'する', reading: 'する', meaning: 'Làm',
                masu: 'します', te: 'して', ta: 'した', nai: 'しない',
                potential: 'できる', volitional: 'しよう',
                compounds: ['買い物する', '試着する', '交換する', '返品する']
            },
            {
                dict: '来る', reading: 'くる', meaning: 'Đến',
                masu: '来ます', te: '来て', ta: '来た', nai: '来ない',
                potential: '来られる', volitional: '来よう',
                note: 'Đọc là きます, きて, きた, こない, こられる, こよう'
            }
        ]
    }
};

// ========== SENTENCE PATTERNS EXPANSION ==========
const sentencePatterns = {
    asking: [
        { pattern: '〜はありますか', example: 'Mサイズはありますか', meaning: 'Có ~ không?', usage: 'Hỏi có hàng' },
        { pattern: '〜をください', example: 'これをください', meaning: 'Cho tôi ~', usage: 'Yêu cầu mua' },
        { pattern: '〜はどこですか', example: 'トイレはどこですか', meaning: '~ ở đâu?', usage: 'Hỏi vị trí' },
        { pattern: '〜はいくらですか', example: 'これはいくらですか', meaning: '~ bao nhiêu tiền?', usage: 'Hỏi giá' },
        { pattern: '〜を探しています', example: 'シャツを探しています', meaning: 'Đang tìm ~', usage: 'Nhờ tìm hàng' }
    ],
    permission: [
        { pattern: '〜てもいいですか', example: '試着してもいいですか', meaning: 'Làm ~ được không?', usage: 'Xin phép' },
        { pattern: '〜ていただけますか', example: '見せていただけますか', meaning: 'Có thể ~ được không?', usage: 'Xin phép lịch sự hơn' },
        { pattern: '〜てください', example: '見せてください', meaning: 'Hãy ~', usage: 'Yêu cầu lịch sự' }
    ],
    describing: [
        { pattern: '〜すぎます', example: '高すぎます', meaning: 'Quá ~', usage: 'Nói quá mức' },
        { pattern: '〜のほうが〜', example: 'こちらのほうが安いです', meaning: 'Cái này ~ hơn', usage: 'So sánh' },
        { pattern: '〜と同じです', example: 'これと同じです', meaning: 'Giống như ~', usage: 'Nói giống nhau' },
        { pattern: '〜より〜', example: 'これよりこちらがいいです', meaning: '~ hơn ~', usage: 'So sánh' }
    ],
    expressing: [
        { pattern: '〜たいです', example: '買いたいです', meaning: 'Muốn ~', usage: 'Nói mong muốn' },
        { pattern: '〜と思います', example: 'いいと思います', meaning: 'Tôi nghĩ ~', usage: 'Nói ý kiến' },
        { pattern: '〜つもりです', example: '買うつもりです', meaning: 'Định ~', usage: 'Nói dự định' },
        { pattern: '〜ようにします', example: '届くようにします', meaning: 'Sẽ cố gắng ~', usage: 'Hứa hẹn' }
    ]
};

console.log('Boost 1 loaded - Counters, Adjectives, Verbs, Sentence Patterns');



// ========== INTEGRATED FULL TOOL COMPONENTS ==========

// PhrasesTool - Displays comprehensive shopping phrases
const PhrasesTool = () => {
    const [activeCategory, setActiveCategory] = React.useState('enteringStore');
    const categories = Object.entries(comprehensivePhrasesData);
    const currentCategory = comprehensivePhrasesData[activeCategory];
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="phrases-container">
            <div className="phrases-category-tabs">
                {categories.map(([key, cat]) => (
                    <button
                        key={key}
                        className={`phrases-category-tab ${activeCategory === key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(key)}
                    >
                        <span className="phrases-category-icon">{cat.icon}</span>
                        <span>{cat.title}</span>
                    </button>
                ))}
            </div>
            
            <div className="phrases-list">
                {currentCategory.phrases.map((phrase, idx) => (
                    <div key={idx} className="phrases-item" style={{animationDelay: `${idx * 0.05}s`}}>
                        <div className="phrases-content">
                            <div className="phrases-jp">{phrase.jp}</div>
                            <div className="phrases-romaji">{phrase.romaji}</div>
                            <div className="phrases-vn">{phrase.vn}</div>
                            {phrase.note && <span className="phrases-note">{phrase.note}</span>}
                        </div>
                        <button 
                            className="phrases-play-btn"
                            onClick={() => handleSpeak(phrase.jp)}
                        >
                            🔊
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// NumbersTool - Displays Japanese numbers and counters
const NumbersTool = () => {
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="numbers-container">
            {/* Basic Numbers */}
            <div className="numbers-section">
                <h3 className="numbers-section-title">🔢 {numbersData.basic.title}</h3>
                <div className="numbers-grid">
                    {numbersData.basic.numbers.map((num, idx) => (
                        <div 
                            key={idx} 
                            className="number-card"
                            onClick={() => handleSpeak(num.reading)}
                        >
                            <div className="number-kanji">{num.kanji}</div>
                            <div className="number-reading">{num.reading}</div>
                            <div className="number-romaji">{num.romaji}</div>
                            <div className="number-value">{num.num}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Hundreds */}
            <div className="numbers-section">
                <h3 className="numbers-section-title">💯 {numbersData.hundreds.title}</h3>
                <div className="numbers-grid">
                    {numbersData.hundreds.numbers.map((num, idx) => (
                        <div 
                            key={idx} 
                            className="number-card"
                            onClick={() => handleSpeak(num.reading)}
                        >
                            <div className="number-kanji">{num.kanji}</div>
                            <div className="number-reading">{num.reading}</div>
                            <div className="number-value">{num.num.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Thousands */}
            <div className="numbers-section">
                <h3 className="numbers-section-title">🔢 {numbersData.thousands.title}</h3>
                <div className="numbers-grid">
                    {numbersData.thousands.numbers.map((num, idx) => (
                        <div 
                            key={idx} 
                            className="number-card"
                            onClick={() => handleSpeak(num.reading)}
                        >
                            <div className="number-kanji">{num.kanji}</div>
                            <div className="number-reading">{num.reading}</div>
                            <div className="number-value">{num.num.toLocaleString()}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Counters */}
            <div className="numbers-section">
                <h3 className="numbers-section-title">📏 {numbersData.counters.title}</h3>
                <div className="counters-grid">
                    {numbersData.counters.items.map((counter, idx) => (
                        <div key={idx} className="counter-card">
                            <div className="counter-jp">{counter.counter} ({counter.reading})</div>
                            <div className="counter-usage">{counter.usage}</div>
                            <div className="counter-example">Ví dụ: {counter.example}</div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Price Examples */}
            <div className="numbers-section">
                <h3 className="numbers-section-title">💰 {numbersData.priceExamples.title}</h3>
                <div className="price-examples-list">
                    {numbersData.priceExamples.examples.map((ex, idx) => (
                        <div 
                            key={idx} 
                            className="price-example-item"
                            onClick={() => handleSpeak(ex.reading)}
                            style={{cursor: 'pointer'}}
                        >
                            <div className="price-example-price">{ex.price}</div>
                            <div className="price-example-reading">{ex.reading}</div>
                            <div className="price-example-romaji">{ex.romaji}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// VocabCategoryTool - Displays vocab organized by category
const VocabCategoryTool = () => {
    const [activeCategory, setActiveCategory] = React.useState('clothing');
    const categories = Object.entries(shoppingVocabByCategory);
    const currentCategory = shoppingVocabByCategory[activeCategory];
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="vocab-category-container">
            <div className="vocab-category-tabs">
                {categories.map(([key, cat]) => (
                    <button
                        key={key}
                        className={`vocab-category-tab ${activeCategory === key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(key)}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.title}</span>
                    </button>
                ))}
            </div>
            
            <div className="vocab-category-words">
                {currentCategory.words.map((word, idx) => (
                    <div 
                        key={idx} 
                        className="vocab-category-word"
                        onClick={() => handleSpeak(word.jp)}
                        style={{animationDelay: `${idx * 0.03}s`}}
                    >
                        <div className="vocab-category-jp">{word.jp}</div>
                        <div className="vocab-category-romaji">{word.romaji}</div>
                        <div className="vocab-category-vn">{word.vn}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// KeigoTool - Displays keigo (polite language) guide
const KeigoTool = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="keigo-container">
            <div className="keigo-intro">
                <h3>🎎 {keigoGuide.title}</h3>
                <p>{keigoGuide.intro}</p>
            </div>
            
            <div className="keigo-tabs">
                {keigoGuide.categories.map((cat, idx) => (
                    <button
                        key={idx}
                        className={`keigo-tab ${activeTab === idx ? 'active' : ''}`}
                        onClick={() => setActiveTab(idx)}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            
            <div className="keigo-content">
                <div className="keigo-category">
                    <p className="keigo-desc">{keigoGuide.categories[activeTab].desc}</p>
                    <div className="keigo-examples">
                        {keigoGuide.categories[activeTab].examples.map((ex, idx) => (
                            <div key={idx} className="keigo-example">
                                <div className="keigo-normal">
                                    <span className="keigo-label">Thường:</span>
                                    <span className="keigo-text" onClick={() => handleSpeak(ex.normal)}>{ex.normal}</span>
                                </div>
                                <div className="keigo-arrow">→</div>
                                <div className="keigo-polite">
                                    <span className="keigo-label">Kính ngữ:</span>
                                    <span className="keigo-text" onClick={() => handleSpeak(ex.polite)}>{ex.polite}</span>
                                </div>
                                <div className="keigo-vn">{ex.vn}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="keigo-common">
                <h4>📝 Cụm từ thường gặp</h4>
                <div className="keigo-common-list">
                    {keigoGuide.commonPhrases.map((phrase, idx) => (
                        <div key={idx} className="keigo-common-item" onClick={() => handleSpeak(phrase.jp)}>
                            <div className="keigo-common-jp">{phrase.jp}</div>
                            <div className="keigo-common-reading">{phrase.reading}</div>
                            <div className="keigo-common-vn">{phrase.vn}</div>
                            <div className="keigo-common-usage">{phrase.usage}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// TipsTool - Displays shopping tips and tricks
const TipsTool = () => {
    const [activeSection, setActiveSection] = React.useState('shopping');
    
    return (
        <div className="tips-container">
            <div className="tips-tabs">
                <button 
                    className={`tips-tab ${activeSection === 'shopping' ? 'active' : ''}`}
                    onClick={() => setActiveSection('shopping')}
                >
                    🛍️ Mua sắm
                </button>
                <button 
                    className={`tips-tab ${activeSection === 'pronunciation' ? 'active' : ''}`}
                    onClick={() => setActiveSection('pronunciation')}
                >
                    🗣️ Phát âm
                </button>
                <button 
                    className={`tips-tab ${activeSection === 'memory' ? 'active' : ''}`}
                    onClick={() => setActiveSection('memory')}
                >
                    🧠 Ghi nhớ
                </button>
            </div>
            
            <div className="tips-content">
                {activeSection === 'shopping' && (
                    <div className="tips-grid">
                        {tipsAndTricks.shopping.map((tip, idx) => (
                            <div key={idx} className="tip-card">
                                <div className="tip-header">
                                    <span className="tip-icon">{tip.icon}</span>
                                    <span className="tip-title">{tip.title}</span>
                                </div>
                                <ul className="tip-list">
                                    {tip.tips.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
                
                {activeSection === 'pronunciation' && (
                    <div className="tips-grid">
                        {tipsAndTricks.pronunciation.map((tip, idx) => (
                            <div key={idx} className="tip-card pronunciation">
                                <div className="tip-sound">{tip.sound}</div>
                                <div className="tip-examples">
                                    {tip.examples.map((ex, i) => (
                                        <span key={i} className="tip-example">{ex}</span>
                                    ))}
                                </div>
                                <div className="tip-advice">💡 {tip.tip}</div>
                            </div>
                        ))}
                    </div>
                )}
                
                {activeSection === 'memory' && (
                    <div className="tips-grid">
                        {tipsAndTricks.memory.map((tip, idx) => (
                            <div key={idx} className="tip-card memory">
                                <div className="tip-title">{tip.title}</div>
                                <ul className="tip-list">
                                    {tip.tips.map((t, i) => (
                                        <li key={i}>{t}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// MistakesTool - Displays common mistakes
const MistakesTool = () => {
    return (
        <div className="mistakes-container">
            {commonMistakesData.map((category, idx) => (
                <div key={idx} className="mistakes-category">
                    <h3 className="mistakes-category-title">⚠️ {category.category}</h3>
                    <div className="mistakes-list">
                        {category.mistakes.map((mistake, i) => (
                            <div key={i} className="mistake-item">
                                <div className="mistake-wrong">
                                    <span className="mistake-label">❌ Sai:</span>
                                    <span>{mistake.wrong}</span>
                                </div>
                                <div className="mistake-correct">
                                    <span className="mistake-label">✅ Đúng:</span>
                                    <span>{mistake.correct}</span>
                                </div>
                                <div className="mistake-explain">
                                    💡 {mistake.explain}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// DialoguePracticeTool - Practice dialogues
const DialoguePracticeTool = () => {
    const [activeDialogue, setActiveDialogue] = React.useState(0);
    const [currentLine, setCurrentLine] = React.useState(0);
    const [showVn, setShowVn] = React.useState(true);
    
    const dialogue = practiceDialogues[activeDialogue];
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    const handleNext = () => {
        if (currentLine < dialogue.lines.length - 1) {
            setCurrentLine(currentLine + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentLine > 0) {
            setCurrentLine(currentLine - 1);
        }
    };
    
    const handleReset = () => {
        setCurrentLine(0);
    };
    
    return (
        <div className="dialogue-container">
            <div className="dialogue-tabs">
                {practiceDialogues.map((d, idx) => (
                    <button
                        key={idx}
                        className={`dialogue-tab ${activeDialogue === idx ? 'active' : ''}`}
                        onClick={() => { setActiveDialogue(idx); setCurrentLine(0); }}
                    >
                        {d.situation}
                    </button>
                ))}
            </div>
            
            <div className="dialogue-header">
                <h3>{dialogue.situation}</h3>
                <span className="dialogue-difficulty">{dialogue.difficulty}</span>
                <button 
                    className="dialogue-toggle-vn"
                    onClick={() => setShowVn(!showVn)}
                >
                    {showVn ? '🔓 Ẩn tiếng Việt' : '🔒 Hiện tiếng Việt'}
                </button>
            </div>
            
            <div className="dialogue-lines">
                {dialogue.lines.map((line, idx) => (
                    <div 
                        key={idx} 
                        className={`dialogue-line ${line.role} ${idx === currentLine ? 'current' : ''} ${idx < currentLine ? 'passed' : ''}`}
                    >
                        <div className="dialogue-role">
                            {line.role === 'staff' ? '👤 Nhân viên' : '🙋 Bạn'}
                        </div>
                        <div className="dialogue-content">
                            <div className="dialogue-jp" onClick={() => handleSpeak(line.jp)}>
                                {line.jp}
                            </div>
                            {showVn && <div className="dialogue-vn">{line.vn}</div>}
                        </div>
                        <button 
                            className="dialogue-play"
                            onClick={() => handleSpeak(line.jp)}
                        >
                            🔊
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="dialogue-controls">
                <button onClick={handlePrev} disabled={currentLine === 0}>⬅️ Trước</button>
                <span className="dialogue-progress">{currentLine + 1} / {dialogue.lines.length}</span>
                <button onClick={handleNext} disabled={currentLine === dialogue.lines.length - 1}>Tiếp ➡️</button>
                <button onClick={handleReset}>🔄 Lại từ đầu</button>
            </div>
        </div>
    );
};

console.log('Integrated tool components loaded!');



// ========== STORE TYPES TOOL ==========
const StoreTypesTool = () => {
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="store-types-container">
            <div className="store-types-grid">
                {storeTypesJapan.map((store, idx) => (
                    <div key={idx} className="store-type-card" style={{animationDelay: `${idx * 0.05}s`}}>
                        <div className="store-type-header">
                            <span 
                                className="store-type-jp"
                                onClick={() => handleSpeak(store.jp)}
                                style={{cursor: 'pointer'}}
                            >
                                {store.jp}
                            </span>
                            <span className="store-type-romaji">({store.romaji})</span>
                        </div>
                        <div className="store-type-vn">{store.vn}</div>
                        <div className="store-type-desc">{store.desc}</div>
                        <div className="store-type-examples">
                            {store.examples.map((ex, i) => (
                                <span key={i} className="store-type-example">{ex}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========== SEASONAL SALES TOOL ==========
const SeasonalSalesTool = () => {
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="sales-container">
            <div className="sales-timeline">
                {seasonalSalesJapan.map((sale, idx) => (
                    <div key={idx} className="sales-item" style={{animationDelay: `${idx * 0.1}s`}}>
                        <div 
                            className="sales-season"
                            onClick={() => handleSpeak(sale.season)}
                            style={{cursor: 'pointer'}}
                        >
                            {sale.season}
                        </div>
                        <div className="sales-time">📅 {sale.time}</div>
                        <div 
                            className="sales-event"
                            onClick={() => handleSpeak(sale.event)}
                            style={{cursor: 'pointer'}}
                        >
                            {sale.event}
                        </div>
                        <div className="sales-desc">{sale.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========== PAYMENT METHODS TOOL ==========
const PaymentMethodsTool = () => {
    const methods = Object.values(paymentMethodsJapan);
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="payment-container">
            <div className="payment-grid">
                {methods.map((method, idx) => (
                    <div key={idx} className="payment-card">
                        <div className="payment-header">
                            <span className="payment-icon">{method.icon}</span>
                            <div className="payment-info">
                                <h4>{method.name}</h4>
                                <span>{method.vn}</span>
                            </div>
                        </div>
                        <div className="payment-body">
                            <div className="payment-notes">
                                <h5>📋 Lưu ý:</h5>
                                <ul>
                                    {method.notes.map((note, i) => (
                                        <li key={i}>{note}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="payment-phrases">
                                <h5>💬 Cụm từ hữu ích:</h5>
                                {method.phrases.map((phrase, i) => (
                                    <div 
                                        key={i} 
                                        className="payment-phrase"
                                        onClick={() => handleSpeak(phrase.jp)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <div className="payment-phrase-jp">{phrase.jp}</div>
                                        <div className="payment-phrase-vn">{phrase.vn}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========== N4 KANJI TOOL ==========
const N4KanjiTool = () => {
    const [selectedKanji, setSelectedKanji] = React.useState(null);
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="kanji-container">
            <div className="kanji-grid">
                {n4KanjiList.map((kanji, idx) => (
                    <div 
                        key={idx} 
                        className={`kanji-card ${selectedKanji === idx ? 'selected' : ''}`}
                        onClick={() => {
                            setSelectedKanji(idx);
                            handleSpeak(kanji.kun || kanji.on);
                        }}
                    >
                        <div className="kanji-char">{kanji.kanji}</div>
                        <div className="kanji-readings">
                            <span className="kanji-on">音: {kanji.on}</span>
                            {kanji.kun && <span className="kanji-kun">訓: {kanji.kun}</span>}
                        </div>
                        <div className="kanji-meaning">{kanji.meaning}</div>
                        <div className="kanji-examples">
                            {kanji.examples.map((ex, i) => (
                                <span key={i} className="kanji-example" onClick={(e) => {e.stopPropagation(); handleSpeak(ex)}}>{ex}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========== GREETING TOOL ==========
const GreetingTool = () => {
    const [activeCategory, setActiveCategory] = React.useState('morning');
    const categories = Object.entries(greetingVariations);
    const categoryLabels = {
        morning: '🌅 Buổi sáng',
        afternoon: '☀️ Buổi chiều',
        evening: '🌙 Buổi tối',
        goodbye: '👋 Tạm biệt',
        thanks: '🙏 Cảm ơn',
        sorry: '🙇 Xin lỗi'
    };
    
    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };
    
    return (
        <div className="greeting-container">
            <div className="greeting-tabs">
                {categories.map(([key, _]) => (
                    <button
                        key={key}
                        className={`greeting-tab ${activeCategory === key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(key)}
                    >
                        {categoryLabels[key]}
                    </button>
                ))}
            </div>
            
            <div className="greeting-list">
                {greetingVariations[activeCategory].map((greeting, idx) => (
                    <div 
                        key={idx} 
                        className="greeting-card"
                        onClick={() => handleSpeak(greeting.jp)}
                    >
                        <div className="greeting-jp">{greeting.jp}</div>
                        <div className="greeting-romaji">{greeting.romaji}</div>
                        <div className="greeting-vn">{greeting.vn}</div>
                        <span className={`greeting-level ${greeting.level.toLowerCase().replace(' ', '-')}`}>
                            {greeting.level}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========== ACHIEVEMENT DISPLAY COMPONENT ==========
const AchievementDisplay = ({ userPoints = 450, earnedBadges = ['first_word', 'vocab_10', 'streak_7'] }) => {
    const currentLevel = achievementData.levels.find(l => userPoints >= l.minPoints && userPoints < l.maxPoints);
    const nextLevel = achievementData.levels.find(l => l.minPoints > userPoints);
    const progressToNext = nextLevel ? ((userPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 : 100;
    
    return (
        <div className="achievement-display">
            <div className="level-card">
                <div className="level-icon">{currentLevel?.icon}</div>
                <div className="level-info">
                    <div className="level-name">Cấp {currentLevel?.level}: {currentLevel?.name}</div>
                    <div className="level-points">{userPoints} điểm</div>
                </div>
                {nextLevel && (
                    <div className="level-progress">
                        <div className="level-progress-bar">
                            <div className="level-progress-fill" style={{width: `${progressToNext}%`}}></div>
                        </div>
                        <div className="level-progress-text">
                            Còn {nextLevel.minPoints - userPoints} điểm đến cấp {nextLevel.level}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="badges-section">
                <h4>🏆 Thành tựu đã đạt</h4>
                <div className="badges-grid">
                    {achievementData.badges.map((badge, idx) => {
                        const isEarned = earnedBadges.includes(badge.id);
                        return (
                            <div 
                                key={idx} 
                                className={`badge-card ${isEarned ? 'earned' : 'locked'}`}
                            >
                                <div className="badge-icon">{isEarned ? badge.icon : '🔒'}</div>
                                <div className="badge-name">{badge.name}</div>
                                <div className="badge-desc">{badge.desc}</div>
                                <div className="badge-points">+{badge.points} điểm</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// ========== LESSON PLAN DISPLAY ==========
const LessonPlanDisplay = () => {
    const lesson = lessonPlanData.bai20;
    
    return (
        <div className="lesson-plan-display">
            <div className="lesson-header">
                <h2>📚 {lesson.title}</h2>
                <div className="lesson-meta">
                    <span className="lesson-level">Trình độ: {lesson.level}</span>
                    <span className="lesson-duration">⏱️ {lesson.duration} phút</span>
                </div>
            </div>
            
            <div className="lesson-objectives">
                <h4>🎯 Mục tiêu bài học</h4>
                <ul>
                    {lesson.objectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                    ))}
                </ul>
            </div>
            
            <div className="lesson-phases">
                <h4>📋 Tiến trình bài học</h4>
                {lesson.phases.map((phase, idx) => (
                    <div key={idx} className="phase-card">
                        <div className="phase-header">
                            <span className="phase-number">Giai đoạn {phase.phase}</span>
                            <span className="phase-name">{phase.name}</span>
                            <span className="phase-duration">{phase.duration} phút</span>
                        </div>
                        <div className="phase-activities">
                            {phase.activities.map((act, i) => (
                                <div key={i} className="activity-item">
                                    <span className="activity-name">{act.name}</span>
                                    <span className="activity-duration">{act.duration}p</span>
                                    <span className="activity-desc">{act.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="lesson-homework">
                <div className="homework-section">
                    <h4>📖 Bài tập trước buổi học</h4>
                    <ul>
                        {lesson.homework.preClass.map((hw, idx) => (
                            <li key={idx}>{hw}</li>
                        ))}
                    </ul>
                </div>
                <div className="homework-section">
                    <h4>✍️ Bài tập sau buổi học</h4>
                    <ul>
                        {lesson.homework.postClass.map((hw, idx) => (
                            <li key={idx}>{hw}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

console.log('Additional components loaded: StoreTypes, SeasonalSales, PaymentMethods, N4Kanji, Greeting, Achievement, LessonPlan');


// ========== MAIN APP COMPONENT ==========
        const InClassTeaching = () => {
            // ===== CORE STATES =====
            const [isLive, setIsLive] = useState(false);
            const [elapsedSeconds, setElapsedSeconds] = useState(0);
            const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
            const [activeTool, setActiveTool] = useState('warmup');
            const [activeVocabId, setActiveVocabId] = useState(null);

            // ===== STUDENT STATES =====
            const [students] = useState(mockStudents);
            const [studentsData, setStudentsData] = useState({});
            const [selectedStudent, setSelectedStudent] = useState(null);
            const [speakingStudent, setSpeakingStudent] = useState(null);
            const [panelCollapsed, setPanelCollapsed] = useState(false);

            // ===== VOCAB STATES =====
            const [vocabStates, setVocabStates] = useState({});

            // ===== MODAL STATES =====
            const [showEvalModal, setShowEvalModal] = useState(false);
            const [evalVocabId, setEvalVocabId] = useState(null);
            const [showShortcutsModal, setShowShortcutsModal] = useState(false);

            // ===== HEADER CONTROL STATES =====
            const [isMicOn, setIsMicOn] = useState(false);
            const [isCamOn, setIsCamOn] = useState(false);
            const [isSharing, setIsSharing] = useState(false);

            // ===== TOAST STATES =====
            const [toasts, setToasts] = useState([]);
            const addToast = useCallback((toast) => {
                const id = Date.now();
                setToasts(prev => [...prev, { ...toast, id }]);
            }, []);
            const removeToast = useCallback((id) => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, []);

            // ===== SPEECH HOOK =====
            const speech = useSpeech();

            // ===== TIMER LOGIC - 90 PHÚT THỜI GIAN THỰC =====
            useEffect(() => {
                let interval;
                if (isLive) {
                    interval = setInterval(() => {
                        setElapsedSeconds(prev => {
                            const next = prev + 1;
                            const elapsedMin = Math.floor(next / 60);
                            
                            // Auto switch phase based on time
                            const newPhaseIndex = PHASES.findIndex(p => elapsedMin >= p.startMin && elapsedMin < p.endMin);
                            if (newPhaseIndex !== -1 && newPhaseIndex !== currentPhaseIndex) {
                                setCurrentPhaseIndex(newPhaseIndex);
                                addToast({ type: 'info', title: `🔄 Chuyển sang: ${PHASES[newPhaseIndex].name}`, message: `${PHASES[newPhaseIndex].duration} phút` });
                            }
                            
                            // Warning at 2 minutes before phase end
                            const currentPhase = PHASES[currentPhaseIndex];
                            if (currentPhase) {
                                const phaseEndSec = currentPhase.endMin * 60;
                                const timeLeftInPhase = phaseEndSec - next;
                                if (timeLeftInPhase === 120) {
                                    addToast({ type: 'warning', title: '⏰ Còn 2 phút!', message: `${currentPhase.name} sắp kết thúc` });
                                }
                            }
                            
                            return next;
                        });
                    }, 1000);
                }
                return () => clearInterval(interval);
            }, [isLive, currentPhaseIndex]);

            // ===== KEYBOARD SHORTCUTS =====
            useEffect(() => {
                const handleKeyDown = (e) => {
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                    
                    if (e.code === 'Space' && !e.ctrlKey && !e.shiftKey) {
                        e.preventDefault();
                        setIsLive(prev => !prev);
                    }
                    if (e.key === '?' || (e.shiftKey && e.key === '/')) {
                        e.preventDefault();
                        setShowShortcutsModal(true);
                    }
                    if ((e.key === 'c' || e.key === 'C') && !e.ctrlKey) {
                        e.preventDefault();
                        handleRandomPick('random');
                    }
                    if (e.key === 'Escape') {
                        setShowEvalModal(false);
                        setShowShortcutsModal(false);
                    }
                    
                    // Tool shortcuts
                    const toolShortcuts = { '`': 'warmup', '1': 'vocab', '2': 'grammar', '3': 'listen', '4': 'rapid', '5': 'pronun', '6': 'roleplay', '7': 'situation', '8': 'quiz', '9': 'reading', '0': 'writing' };
                    if (toolShortcuts[e.key] && !showEvalModal) {
                        setActiveTool(toolShortcuts[e.key]);
                    }
                    
                    // Phase navigation
                    if (e.key === 'ArrowLeft' && currentPhaseIndex > 0) {
                        setCurrentPhaseIndex(currentPhaseIndex - 1);
                    }
                    if (e.key === 'ArrowRight' && currentPhaseIndex < PHASES.length - 1) {
                        setCurrentPhaseIndex(currentPhaseIndex + 1);
                    }
                };
                
                window.addEventListener('keydown', handleKeyDown);
                return () => window.removeEventListener('keydown', handleKeyDown);
            }, [currentPhaseIndex, showEvalModal]);

            // ===== HANDLERS =====
            const handleRandomPick = useCallback((mode = 'random') => {
                const onlineStudents = students.filter(s => s.status === 'online');
                let candidates = onlineStudents;
                
                if (mode === 'weak') {
                    candidates = onlineStudents.filter(s => s.activeScore < 60);
                } else if (mode === 'notCalled') {
                    candidates = onlineStudents.filter(s => !studentsData[s.id]?.callCount);
                }
                
                if (candidates.length === 0) candidates = onlineStudents;
                if (candidates.length === 0) {
                    addToast({ type: 'warning', title: 'Không có học viên online' });
                    return;
                }
                
                const randomStudent = candidates[Math.floor(Math.random() * candidates.length)];
                setSpeakingStudent(randomStudent);
                setSelectedStudent(randomStudent);
                
                if (activeVocabId) {
                    setEvalVocabId(activeVocabId);
                    setShowEvalModal(true);
                    addToast({ type: 'info', title: `🎤 Gọi ${randomStudent.name}`, message: 'Hãy đánh giá phát âm' });
                } else {
                    addToast({ type: 'info', title: `🎤 Đã chọn: ${randomStudent.name}` });
                }
            }, [students, studentsData, activeVocabId]);

            const handleCallStudent = useCallback((student) => {
                setSpeakingStudent(student);
                setSelectedStudent(student);
                if (activeVocabId) {
                    setEvalVocabId(activeVocabId);
                    setShowEvalModal(true);
                }
                addToast({ type: 'info', title: `🎤 Gọi ${student.name}` });
            }, [activeVocabId]);

            const handleVocabAction = useCallback(async (vocabId, action) => {
                const vocab = vocabularyData.find(v => v.id === vocabId);
                const state = vocabStates[vocabId] || {};

                if (action === 'call') {
                    setActiveVocabId(vocabId);
                    setVocabStates(prev => ({
                        ...prev,
                        [vocabId]: { ...prev[vocabId], currentStep: 2 }
                    }));
                    addToast({ type: 'info', title: `📚 ${vocab.vietnamese}`, message: 'Chọn học viên để kiểm tra' });
                }

                if (action === 'teacherPlay') {
                    setVocabStates(prev => ({
                        ...prev,
                        [vocabId]: { ...prev[vocabId], isPlaying: true }
                    }));
                    
                    await speech.speakMultiple(vocab.audioText, 5, 700, (count) => {
                        setVocabStates(prev => ({
                            ...prev,
                            [vocabId]: { ...prev[vocabId], teacherPlayCount: count }
                        }));
                    });
                    
                    setVocabStates(prev => ({
                        ...prev,
                        [vocabId]: { ...prev[vocabId], isPlaying: false, currentStep: 5 }
                    }));
                    addToast({ type: 'success', title: '🔊 Đã phát 5 lần', message: 'Giờ cả lớp lặp lại' });
                }

                if (action === 'classRepeat') {
                    setVocabStates(prev => ({
                        ...prev,
                        [vocabId]: { ...prev[vocabId], isPlaying: true }
                    }));
                    
                    await speech.speakMultiple(vocab.audioText, 5, 900, (count) => {
                        setVocabStates(prev => ({
                            ...prev,
                            [vocabId]: { ...prev[vocabId], classPlayCount: count }
                        }));
                    });
                    
                    setVocabStates(prev => ({
                        ...prev,
                        [vocabId]: { ...prev[vocabId], isPlaying: false, currentStep: 6 }
                    }));
                    addToast({ type: 'success', title: '👥 Cả lớp đã lặp 5 lần', message: 'Xác nhận để hoàn thành' });
                }

                if (action === 'confirm') {
                    setVocabStates(prev => ({
                        ...prev,
                        [vocabId]: { ...prev[vocabId], isConfirmed: true, currentStep: 7 }
                    }));
                    setActiveVocabId(null);
                    addToast({ type: 'success', title: '✅ Hoàn thành!', message: `${vocab.vietnamese} - Chuyển từ tiếp theo` });
                }
            }, [vocabStates, speech]);

            const handleEvaluate = useCallback(({ rating, issues, note }) => {
                const vocab = vocabularyData.find(v => v.id === evalVocabId);
                
                // Update vocab state
                setVocabStates(prev => ({
                    ...prev,
                    [evalVocabId]: {
                        ...prev[evalVocabId],
                        isRevealed: true,
                        rating: rating,
                        assignedStudent: speakingStudent,
                        currentStep: 4,
                        teacherPlayCount: 0,
                        classPlayCount: 0
                    }
                }));

                // Update student data
                if (speakingStudent) {
                    setStudentsData(prev => ({
                        ...prev,
                        [speakingStudent.id]: {
                            ...prev[speakingStudent.id],
                            callCount: (prev[speakingStudent.id]?.callCount || 0) + 1,
                            history: [
                                ...(prev[speakingStudent.id]?.history || []),
                                { word: vocab?.vietnamese, rating: rating.icon, time: 'Vừa xong', issues }
                            ]
                        }
                    }));
                }

                setShowEvalModal(false);
                setSpeakingStudent(null);
                addToast({ type: 'success', title: `${rating.icon} ${rating.label}`, message: `${speakingStudent?.name} - ${vocab?.vietnamese}` });

                // Auto play after evaluation
                setTimeout(() => {
                    if (vocab) speech.speak(vocab.audioText);
                }, 500);
            }, [evalVocabId, speakingStudent, speech]);

            // ===== COMPUTED VALUES =====
            const currentPhase = PHASES[currentPhaseIndex];
            const elapsedMinutes = Math.floor(elapsedSeconds / 60);
            const elapsedSecs = elapsedSeconds % 60;
            const totalProgress = (elapsedSeconds / TOTAL_SECONDS) * 100;
            
            // Phase progress
            const phaseElapsedSec = elapsedSeconds - (currentPhase?.startMin || 0) * 60;
            const phaseTotalSec = (currentPhase?.duration || 1) * 60;
            const phaseProgress = Math.min((phaseElapsedSec / phaseTotalSec) * 100, 100);
            const phaseTimeLeft = Math.max(0, phaseTotalSec - phaseElapsedSec);
            const phaseTimeLeftMin = Math.floor(phaseTimeLeft / 60);
            const phaseTimeLeftSec = phaseTimeLeft % 60;

            // Timer class
            const getTimerClass = () => {
                if (elapsedMinutes >= 90) return 'overtime';
                if (elapsedMinutes >= 80) return 'danger';
                if (elapsedMinutes >= 60) return 'warning';
                return 'normal';
            };

            // Stats
            const completedVocab = Object.values(vocabStates).filter(v => v.isConfirmed).length;
            const totalCalls = Object.values(studentsData).reduce((sum, s) => sum + (s.callCount || 0), 0);
            const avgScore = totalCalls > 0 ? Math.round(Object.values(studentsData).flatMap(s => s.history || []).filter(h => h.rating).length / totalCalls * 100) : 0;
            const onlineCount = students.filter(s => s.status === 'online').length;

            // ===== RENDER =====
            return (
                <div className="app-container">
                    {/* ========== HEADER BAR ========== */}
                    <header className="header-bar">
                        {/* Breadcrumb Navigation */}
                        <nav className="breadcrumb-nav">
                            <Link to="/" className="breadcrumb-logo">
                                <div className="logo-icon">T</div>
                                <span className="logo-title">TikMe</span>
                            </Link>
                            <span className="breadcrumb-sep">›</span>
                            <Link to="/preclass" className="breadcrumb-link">Pre-Class</Link>
                            <span className="breadcrumb-sep">›</span>
                            <span className="breadcrumb-current">In-Class</span>
                        </nav>

                        <div className="header-divider"></div>

                        {/* Class Info */}
                        <div className="class-info">
                            <span className="class-badge">{mockClassInfo.className}</span>
                            <div className="class-details">
                                <div className="class-lesson">Bài {mockClassInfo.lessonNumber}: {mockClassInfo.lessonTitle}</div>
                                <div className="class-meta">
                                    <span>📅 {mockClassInfo.date}</span>
                                    <span>•</span>
                                    <span>🎯 90 phút</span>
                                </div>
                            </div>
                        </div>

                        <div className="header-spacer"></div>

                        {/* Phase Timer */}
                        <div className="phase-timer-box">
                            <div className="phase-current">
                                <div className="phase-name">{currentPhase?.name || 'Chờ bắt đầu'}</div>
                                <div className="phase-time-left">Còn {phaseTimeLeftMin}:{phaseTimeLeftSec.toString().padStart(2, '0')}</div>
                            </div>
                            <div className="phase-progress-ring">
                                <svg width="44" height="44">
                                    <circle className="bg" cx="22" cy="22" r="18" />
                                    <circle 
                                        className={`progress ${currentPhase?.color || ''}`} 
                                        cx="22" cy="22" r="18" 
                                        strokeDasharray={`${2 * Math.PI * 18}`}
                                        strokeDashoffset={`${2 * Math.PI * 18 * (1 - phaseProgress / 100)}`}
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Main Timer */}
                        <div className={`main-timer ${getTimerClass()}`}>
                            <div className="timer-display">
                                <div className="timer-value">{elapsedMinutes.toString().padStart(2, '0')}:{elapsedSecs.toString().padStart(2, '0')}</div>
                                <div className="timer-label">/ 90:00</div>
                            </div>
                            <div className="timer-progress-bar">
                                <div className="timer-progress-fill" style={{ width: `${Math.min(totalProgress, 100)}%` }}></div>
                            </div>
                        </div>

                        {/* Online Count */}
                        <div className="online-badge">
                            <span className="online-dot"></span>
                            <span className="online-text">{onlineCount}/{students.length} online</span>
                        </div>

                        {/* Header Controls */}
                        <div className="header-controls">
                            <button
                                className={`control-btn ${isMicOn ? 'active' : 'muted'}`}
                                onClick={() => setIsMicOn(!isMicOn)}
                                title="Bật/Tắt Mic (Ctrl+M)"
                            >
                                <span className="control-icon">{isMicOn ? '🎤' : '🔇'}</span>
                                <span className="control-label">{isMicOn ? 'Mic On' : 'Mic Off'}</span>
                            </button>

                            <button
                                className={`control-btn ${isCamOn ? 'active' : ''}`}
                                onClick={() => setIsCamOn(!isCamOn)}
                                title="Bật/Tắt Camera (Ctrl+V)"
                            >
                                <span className="control-icon">{isCamOn ? '📹' : '📷'}</span>
                                <span className="control-label">{isCamOn ? 'Cam On' : 'Cam Off'}</span>
                            </button>

                            <button
                                className={`control-btn ${isSharing ? 'active sharing' : ''}`}
                                onClick={() => {
                                    setIsSharing(!isSharing);
                                    if (!isSharing) {
                                        addToast({ type: 'info', title: '🖥️ Chia sẻ màn hình', message: 'Demo mode - Chức năng đang phát triển' });
                                    }
                                }}
                                title="Chia sẻ màn hình"
                            >
                                <span className="control-icon">{isSharing ? '🔴' : '🖥️'}</span>
                                <span className="control-label">{isSharing ? 'Đang Share' : 'Share'}</span>
                            </button>

                            <button
                                className="control-btn"
                                onClick={() => setShowShortcutsModal(true)}
                                title="Phím tắt (?)"
                            >
                                <span className="control-icon">⌨️</span>
                                <span className="control-label">Phím tắt</span>
                            </button>

                            <button
                                className="control-btn end-class"
                                onClick={() => {
                                    // navigate('/postclass')  // TODO: Uncomment khi có B4
                                    alert('Chức năng Post-Class (B4) chưa được triển khai')
                                }}
                                title="Kết Thúc Lớp Học"
                            >
                                <span className="control-icon">✅</span>
                                <span className="control-label">Kết thúc</span>
                            </button>
                        </div>

                        {/* Start/Live Button */}
                        <button className={`live-btn ${isLive ? 'live' : 'start'}`} onClick={() => setIsLive(!isLive)}>
                            {isLive ? (
                                <>
                                    <span className="live-dot"></span>
                                    <span>LIVE</span>
                                </>
                            ) : (
                                <>
                                    <span>▶️</span>
                                    <span>Bắt Đầu</span>
                                </>
                            )}
                        </button>
                    </header>

                    {/* ========== PHASE BAR - TIMELINE 90 PHÚT ========== */}
                    <div className="phase-bar">
                        <div className="phase-timeline">
                            {PHASES.map((phase, idx) => {
                                const isActive = idx === currentPhaseIndex;
                                const isCompleted = elapsedMinutes >= phase.endMin;
                                const phaseElapsed = Math.max(0, Math.min(elapsedMinutes - phase.startMin, phase.duration));
                                const phasePercent = (phaseElapsed / phase.duration) * 100;
                                const isWarning = isActive && phaseTimeLeft < 120 && phaseTimeLeft > 0;

                                return (
                                    <div 
                                        key={phase.id} 
                                        className={`phase-item ${phase.color} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isWarning ? 'warning' : ''}`}
                                        onClick={() => setCurrentPhaseIndex(idx)}
                                    >
                                        <div className="phase-icon">{phase.icon}</div>
                                        <div className="phase-info">
                                            <div className="phase-title">{phase.name}</div>
                                            <div className="phase-duration">{phase.duration} phút ({phase.startMin}-{phase.endMin})</div>
                                            {isActive && (
                                                <div className="phase-progress-mini">
                                                    <div className="phase-progress-mini-fill" style={{ width: `${phasePercent}%` }}></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="phase-nav-btns">
                            <button className="phase-nav-btn" onClick={() => setCurrentPhaseIndex(Math.max(0, currentPhaseIndex - 1))} disabled={currentPhaseIndex === 0}>◀</button>
                            <button className="phase-nav-btn" onClick={() => setCurrentPhaseIndex(Math.min(PHASES.length - 1, currentPhaseIndex + 1))} disabled={currentPhaseIndex === PHASES.length - 1}>▶</button>
                        </div>
                    </div>

                    {/* ========== APP BODY ========== */}
                    <div className="app-body">
                        {/* ===== TOOL PALETTE ===== */}
                        <nav className="tool-palette">
                            {TOOLS.map((tool, idx) => {
                                // Add dividers between phases
                                const prevTool = TOOLS[idx - 1];
                                const showDivider = prevTool && prevTool.phase !== tool.phase;
                                
                                return (
                                    <React.Fragment key={tool.id}>
                                        {showDivider && <div className="tool-divider"></div>}
                                        <button 
                                            className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                                            onClick={() => setActiveTool(tool.id)}
                                            title={`${tool.name} (${tool.shortcut})`}
                                            style={{ '--tool-color': tool.color }}
                                        >
                                            <span className="tool-btn-icon">{tool.icon}</span>
                                            <span className="tool-btn-label">{tool.name}</span>
                                            <span className="tool-btn-shortcut">{tool.shortcut}</span>
                                        </button>
                                    </React.Fragment>
                                );
                            })}
                        </nav>

                        {/* ===== MAIN CANVAS ===== */}
                        <main className="main-canvas">
                            {/* Canvas Header */}
                            <div className="canvas-header">
                                <div className="canvas-title-area">
                                    <div className="canvas-icon" style={{ background: TOOLS.find(t => t.id === activeTool)?.color || 'var(--slate-400)' }}>
                                        {TOOLS.find(t => t.id === activeTool)?.icon || '📚'}
                                    </div>
                                    <div className="canvas-title-text">
                                        <div className="canvas-title">{TOOLS.find(t => t.id === activeTool)?.name || 'Công cụ'}</div>
                                        <div className="canvas-subtitle">
                                            {activeTool === 'vocab' && `${completedVocab}/${vocabularyData.length} từ hoàn thành`}
                                            {activeTool === 'grammar' && `${grammarData.length} mẫu câu`}
                                            {activeTool === 'rapid' && `${rapidFireData.length} câu hỏi`}
                                            {activeTool === 'roleplay' && `${roleplayData.length} tình huống`}
                                            {activeTool === 'quiz' && `${quizData.length} câu trắc nghiệm`}
                                            {activeTool === 'situation' && `${situationData.length} chủ đề`}
                                            {activeTool === 'pronun' && `10 từ luyện phát âm`}
                                            {activeTool === 'warmup' && `3 hoạt động khởi động`}
                                            {['listen', 'reading', 'writing'].includes(activeTool) && `Đang phát triển...`}
                                        </div>
                                    </div>
                                </div>
                                <div className="canvas-stats">
                                    <span className="stat-badge primary">📚 {completedVocab}/{vocabularyData.length}</span>
                                    <span className="stat-badge success">🎤 {totalCalls} lượt</span>
                                    <span className="stat-badge info">⏱️ {elapsedMinutes} phút</span>
                                </div>
                            </div>

                            {/* Canvas Content */}
                            <div className="canvas-content thin-scrollbar">
                                {/* WARMUP TOOL */}
                                {activeTool === 'warmup' && (
                                    <WarmupTool speech={speech} addToast={addToast} />
                                )}

                                {/* VOCAB TOOL */}
                                {activeTool === 'vocab' && (
                                    <div className="content-section">
                                        <div className="section-header">
                                            <div className="section-title-area">
                                                <span className="section-badge">CHECK</span>
                                                <h2 className="section-title">📚 Kiểm Tra Từ Vựng</h2>
                                                <p className="section-subtitle">15 từ vựng chủ đề Mua Sắm - Target: 85%+ đọc đúng, 90%+ nhớ nghĩa</p>
                                            </div>
                                        </div>

                                        {/* Mini Dashboard */}
                                        <MiniDashboard stats={{ completedVocab, totalVocab: vocabularyData.length, totalCalls, avgScore: avgScore || 75, timeSpent: elapsedMinutes }} />

                                        {/* ChopChep Flow Indicator */}
                                        <FlowIndicator
                                            currentStep={activeVocabId ? (vocabStates[activeVocabId]?.currentStep || 1) : 1}
                                            completedSteps={[]}
                                        />

                                        {/* Audio Controls */}
                                        <AudioControls speech={speech} />

                                        {/* Vocab Grid */}
                                        <div className="vocab-grid">
                                            {vocabularyData.map(vocab => (
                                                <VocabCard
                                                    key={vocab.id}
                                                    vocab={vocab}
                                                    state={vocabStates[vocab.id]}
                                                    onAction={handleVocabAction}
                                                    speech={speech}
                                                    isActive={activeVocabId === vocab.id}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* GRAMMAR TOOL */}
                                {activeTool === 'grammar' && <GrammarTool speech={speech} addToast={addToast} />}

                                {/* RAPID FIRE TOOL */}
                                {activeTool === 'rapid' && <RapidFireTool speech={speech} addToast={addToast} />}

                                {/* ROLEPLAY TOOL */}
                                {activeTool === 'roleplay' && <RoleplayTool speech={speech} addToast={addToast} />}

                                {/* QUIZ TOOL */}
                                {activeTool === 'quiz' && <QuizTool addToast={addToast} />}

                                {/* SITUATION TOOL */}
                                {activeTool === 'situation' && <SituationTool speech={speech} />}

                                {/* PRONUNCIATION TOOL */}
                                {activeTool === 'pronun' && <PronunciationTool speech={speech} />}

                                {/* PLACEHOLDER TOOLS */}
                                {activeTool === 'listen' && <PlaceholderTool title="Luyện Nghe" icon="👂" description="Đang phát triển - Sẽ có bài nghe với câu hỏi comprehension" />}
                                {activeTool === 'reading' && <PlaceholderTool title="Luyện Đọc" icon="📖" description="Đang phát triển - Sẽ có đoạn văn với ChopChep reading" />}
                                {activeTool === 'writing' && <PlaceholderTool title="Luyện Viết" icon="✍️" description="Đang phát triển - Sẽ có bài tập viết Hiragana, Katakana, Kanji" />}
                            </div>
                        </main>

                        {/* ===== STUDENT PANEL ===== */}
                        <StudentPanel
                            students={students}
                            studentsData={studentsData}
                            selectedStudent={selectedStudent}
                            setSelectedStudent={setSelectedStudent}
                            speakingStudent={speakingStudent}
                            onRandomPick={handleRandomPick}
                            onCallStudent={handleCallStudent}
                            collapsed={panelCollapsed}
                            setCollapsed={setPanelCollapsed}
                        />
                    </div>

                    {/* ========== BOTTOM CONTROLLER ========== */}
                    <footer className="bottom-controller">
                        {/* Left - Phase Badge */}
                        <div className="ctrl-section">
                            <div className={`ctrl-phase-badge ${currentPhase?.color || 'check'}`}>
                                <span>{currentPhase?.icon}</span>
                                <span>{currentPhase?.name || 'Chờ'}</span>
                                <div className="ctrl-phase-nav">
                                    <button className="ctrl-phase-nav-btn" onClick={() => setCurrentPhaseIndex(Math.max(0, currentPhaseIndex - 1))} disabled={currentPhaseIndex === 0}>◀</button>
                                    <button className="ctrl-phase-nav-btn" onClick={() => setCurrentPhaseIndex(Math.min(PHASES.length - 1, currentPhaseIndex + 1))} disabled={currentPhaseIndex === PHASES.length - 1}>▶</button>
                                </div>
                            </div>
                        </div>

                        {/* Center - Progress */}
                        <div className="ctrl-section">
                            <div className="ctrl-progress">
                                <span className="ctrl-progress-text">Tiến độ: {completedVocab}/{vocabularyData.length} từ</span>
                                <div className="ctrl-progress-bar">
                                    <div className="ctrl-progress-fill" style={{ width: `${(completedVocab / vocabularyData.length) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Summary & Actions */}
                        <div className="ctrl-section">
                            <div className="ctrl-summary">
                                <div className="summary-item">
                                    <span className="summary-icon">🎤</span>
                                    <span className="summary-value">{totalCalls}</span>
                                    <span className="summary-label">Lượt gọi</span>
                                </div>
                                <div className="summary-item">
                                    <span className="summary-icon">✅</span>
                                    <span className="summary-value good">{completedVocab}</span>
                                    <span className="summary-label">Hoàn thành</span>
                                </div>
                            </div>
                            <div className="ctrl-actions">
                                <button className="ctrl-btn">📊 Xuất báo cáo</button>
                                <button className="ctrl-btn danger" onClick={() => {
                                    if (confirm('Kết thúc lớp học?')) {
                                        setIsLive(false);
                                        addToast({ type: 'success', title: '🎉 Kết thúc lớp học', message: `Hoàn thành ${completedVocab} từ trong ${elapsedMinutes} phút` });
                                    }
                                }}>🛑 Kết thúc</button>
                            </div>
                        </div>
                    </footer>

                    {/* ========== TOAST CONTAINER ========== */}
                    <div className="toast-container">
                        {toasts.map(toast => (
                            <Toast key={toast.id} toast={toast} onClose={removeToast} />
                        ))}
                    </div>

                    {/* ========== MODALS ========== */}
                    {showEvalModal && speakingStudent && (
                        <EvaluationModal
                            student={speakingStudent}
                            vocab={vocabularyData.find(v => v.id === evalVocabId)}
                            onRate={handleEvaluate}
                            onClose={() => { setShowEvalModal(false); setSpeakingStudent(null); }}
                        />
                    )}

                    {showShortcutsModal && (
                        <ShortcutsModal onClose={() => setShowShortcutsModal(false)} />
                    )}
                </div>
            );
        };


export default InClassTeaching;
