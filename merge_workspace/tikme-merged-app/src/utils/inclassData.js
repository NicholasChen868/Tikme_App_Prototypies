// Mock data for InClass Teaching - Enhanced with 8 Core Tools

export const phases = [
  { id: 'warmup', name: 'Warm Up', duration: 10, color: '#F97316', gradient: 'linear-gradient(135deg, #FFEDD5, #FED7AA)' },
  { id: 'check', name: 'Check', duration: 20, color: '#6366F1', gradient: 'linear-gradient(135deg, #E0E7FF, #C7D2FE)' },
  { id: 'drill', name: 'Drill', duration: 25, color: '#F59E0B', gradient: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' },
  { id: 'practice', name: 'Practice', duration: 25, color: '#EC4899', gradient: 'linear-gradient(135deg, #FCE7F3, #FBCFE8)' },
  { id: 'wrapup', name: 'Wrap Up', duration: 10, color: '#10B981', gradient: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)' }
];

export const mockClassStudents = [
  { id: 1, name: "Nguyễn Văn An", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=An1", status: "active", mic: true, camera: true, stars: 5, handRaised: false, attendance: 'present' },
  { id: 2, name: "Trần Thị Bình", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binh1", status: "active", mic: true, camera: false, stars: 3, handRaised: true, attendance: 'present' },
  { id: 3, name: "Lê Hoàng Cường", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong1", status: "active", mic: false, camera: true, stars: 4, handRaised: false, attendance: 'present' },
  { id: 4, name: "Phạm Minh Đức", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Duc1", status: "active", mic: true, camera: true, stars: 6, handRaised: false, attendance: 'present' },
  { id: 5, name: "Võ Thị Hà", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ha1", status: "idle", mic: false, camera: false, stars: 2, handRaised: false, attendance: 'late' },
  { id: 6, name: "Hoàng Văn Khoa", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khoa1", status: "active", mic: true, camera: true, stars: 7, handRaised: true, attendance: 'present' },
  { id: 7, name: "Đặng Thị Lan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lan1", status: "idle", mic: false, camera: true, stars: 3, handRaised: false, attendance: 'absent' },
  { id: 8, name: "Bùi Văn Long", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Long1", status: "active", mic: true, camera: false, stars: 5, handRaised: false, attendance: 'present' },
  { id: 9, name: "Ngô Thị Mai", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mai1", status: "active", mic: true, camera: true, stars: 4, handRaised: true, attendance: 'present' },
  { id: 10, name: "Trương Văn Nam", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nam1", status: "active", mic: false, camera: true, stars: 3, handRaised: false, attendance: 'present' },
  { id: 11, name: "Lý Thị Oanh", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oanh1", status: "idle", mic: false, camera: false, stars: 1, handRaised: false, attendance: 'absent' },
  { id: 12, name: "Đỗ Văn Phúc", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phuc1", status: "active", mic: true, camera: true, stars: 8, handRaised: false, attendance: 'present' }
];

// 13 Teaching Tools (8 Core + 5 Advanced) - 100% Vietnamese
export const teachingTools = [
  // Core Tools
  { id: 'timer', name: 'Đồng hồ', icon: '⏱️', color: '#EF4444', description: 'Đồng hồ đếm ngược và bấm giờ' },
  { id: 'picker', name: 'Chọn ngẫu nhiên', icon: '🎯', color: '#8B5CF6', description: 'Chọn học sinh ngẫu nhiên' },
  { id: 'poll', name: 'Bình chọn', icon: '📊', color: '#3B82F6', description: 'Bình chọn trực tiếp' },
  { id: 'quiz', name: 'Trắc nghiệm', icon: '❓', color: '#10B981', description: 'Câu hỏi và trắc nghiệm nhanh' },
  { id: 'whiteboard', name: 'Bảng vẽ', icon: '🎨', color: '#64748B', description: 'Bảng vẽ và ghi chú' },
  { id: 'flashcard', name: 'Thẻ học', icon: '📇', color: '#F59E0B', description: 'Thẻ học từ vựng' },
  { id: 'attendance', name: 'Điểm danh', icon: '✅', color: '#06B6D4', description: 'Điểm danh nhanh' },
  { id: 'behavior', name: 'Quản lý hành vi', icon: '⭐', color: '#EC4899', description: 'Theo dõi sao và điểm' },
  // Advanced Tools
  { id: 'groups', name: 'Chia nhóm', icon: '👥', color: '#059669', description: 'Quản lý nhóm học' },
  { id: 'breakout', name: 'Phòng nhỏ', icon: '🚪', color: '#0891B2', description: 'Phòng học nhỏ' },
  { id: 'screen', name: 'Chia sẻ màn hình', icon: '🖥️', color: '#7C3AED', description: 'Chia sẻ màn hình' },
  { id: 'progress1', name: 'Tiến độ bài học', icon: '📋', color: '#0D9488', description: 'Tiến độ bài học' },
  { id: 'progress2', name: 'Tiến độ học sinh', icon: '📈', color: '#DC2626', description: 'Tiến độ từng học sinh' }
];

export const lessonInfo = {
  level: 'N3 Grammar',
  lesson: 'Lesson 12: Causative Form',
  topic: '使役形 (Causative)',
  duration: 90,
  students: 12
};

// Timer presets
export const timerPresets = [
  { id: 1, label: '30s', seconds: 30, color: '#EF4444' },
  { id: 2, label: '1m', seconds: 60, color: '#F59E0B' },
  { id: 3, label: '2m', seconds: 120, color: '#10B981' },
  { id: 4, label: '5m', seconds: 300, color: '#3B82F6' },
  { id: 5, label: '10m', seconds: 600, color: '#8B5CF6' },
  { id: 6, label: '15m', seconds: 900, color: '#EC4899' }
];

// Poll templates
export const pollTemplates = [
  {
    id: 1,
    question: 'Bạn hiểu bài hôm nay không?',
    type: 'emoji',
    options: [
      { id: 'a', text: '😊 Hiểu rõ', votes: 0 },
      { id: 'b', text: '🤔 Còn mơ hồ', votes: 0 },
      { id: 'c', text: '😵 Không hiểu', votes: 0 }
    ]
  },
  {
    id: 2,
    question: 'Câu nào đúng?',
    type: 'choice',
    options: [
      { id: 'a', text: 'A. 食べさせる', votes: 0 },
      { id: 'b', text: 'B. 食べられる', votes: 0 },
      { id: 'c', text: 'C. 食べれる', votes: 0 },
      { id: 'd', text: 'D. 食べせる', votes: 0 }
    ]
  },
  {
    id: 3,
    question: 'Tốc độ bài giảng?',
    type: 'scale',
    options: [
      { id: 'a', text: '🐢 Quá chậm', votes: 0 },
      { id: 'b', text: '👍 Vừa phải', votes: 0 },
      { id: 'c', text: '🚀 Quá nhanh', votes: 0 }
    ]
  }
];

// Quiz questions
export const quizQuestions = [
  {
    id: 1,
    type: 'multiple',
    question: '「食べる」の使役形は何ですか？',
    options: ['食べさせる', '食べられる', '食べれる', '食べせる'],
    correct: 0,
    explanation: '使役形: 食べる → 食べさせる'
  },
  {
    id: 2,
    type: 'multiple',
    question: '「行く」の使役形は何ですか？',
    options: ['行かせる', '行ける', '行かれる', '行きせる'],
    correct: 0,
    explanation: '使役形: 行く → 行かせる'
  },
  {
    id: 3,
    type: 'text',
    question: '「読む」の使役形を書いてください',
    answer: '読ませる',
    explanation: '使役形: 読む → 読ませる'
  },
  {
    id: 4,
    type: 'multiple',
    question: '先生は学生に本を＿＿。',
    options: ['読ませた', '読んだ', '読められた', '読みた'],
    correct: 0,
    explanation: '使役形を使って「先生が学生に読ませる」'
  }
];

// Flashcards
export const flashcardDecks = [
  {
    id: 1,
    name: '使役形 - Nhóm 1',
    cards: [
      { id: 1, front: '食べる', back: '食べさせる\n(Cho ăn / Bắt ăn)', hint: 'たべる → たべさせる' },
      { id: 2, front: '見る', back: '見させる\n(Cho xem / Bắt xem)', hint: 'みる → みさせる' },
      { id: 3, front: '起きる', back: '起きさせる\n(Cho dậy / Bắt dậy)', hint: 'おきる → おきさせる' },
      { id: 4, front: '寝る', back: '寝させる\n(Cho ngủ / Bắt ngủ)', hint: 'ねる → ねさせる' }
    ]
  },
  {
    id: 2,
    name: '使役形 - Nhóm 2',
    cards: [
      { id: 1, front: '書く', back: '書かせる\n(Cho viết / Bắt viết)', hint: 'かく → かかせる' },
      { id: 2, front: '読む', back: '読ませる\n(Cho đọc / Bắt đọc)', hint: 'よむ → よませる' },
      { id: 3, front: '行く', back: '行かせる\n(Cho đi / Bắt đi)', hint: 'いく → いかせる' },
      { id: 4, front: '帰る', back: '帰らせる\n(Cho về / Bắt về)', hint: 'かえる → かえらせる' }
    ]
  }
];

// Behavior actions
export const behaviorActions = [
  { id: 'star', icon: '⭐', label: 'Ngôi sao', points: 1, color: '#F59E0B' },
  { id: 'excellent', icon: '🌟', label: 'Xuất sắc', points: 2, color: '#EAB308' },
  { id: 'good', icon: '👍', label: 'Tốt lắm', points: 1, color: '#10B981' },
  { id: 'participation', icon: '🙋', label: 'Tham gia', points: 1, color: '#3B82F6' },
  { id: 'homework', icon: '📚', label: 'Bài tập', points: 1, color: '#8B5CF6' },
  { id: 'warning', icon: '⚠️', label: 'Cảnh báo', points: -1, color: '#EF4444' }
];

// Attendance statuses
export const attendanceStatuses = [
  { id: 'present', icon: '✅', label: 'Có mặt', color: '#10B981' },
  { id: 'late', icon: '⏰', label: 'Đi trễ', color: '#F59E0B' },
  { id: 'absent', icon: '❌', label: 'Vắng mặt', color: '#EF4444' },
  { id: 'excused', icon: '📝', label: 'Có phép', color: '#3B82F6' }
];
