// Complete Mock data for PreClass Dashboard - 15 Students with Full Data Structure

export const mockStudents = [
  {
    id: 1,
    name: "Nguyễn Văn An",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=An",
    phone: "0901234567",
    email: "an.nguyen@email.com",
    enrollDate: "2024-09-15",
    attendanceStatus: "present",
    absentCount: { withReason: 1, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 85, average: 82, sessions: 18, trend: [78, 80, 82, 83, 85, 85], learned: 850, total: 1000, lastScore: 88, bestScore: 92 },
      grammar: { current: 88, average: 85, sessions: 18, trend: [82, 84, 85, 87, 88, 88], learned: 145, total: 180, lastScore: 90, bestScore: 94 },
      listening: { current: 82, average: 80, sessions: 18, trend: [77, 79, 80, 81, 82, 82], learned: 42, total: 50, lastScore: 84, bestScore: 88 },
      pronunciation: { current: 87, average: 84, sessions: 18, trend: [81, 83, 84, 86, 87, 87], learned: 320, total: 400, lastScore: 89, bestScore: 91 },
      timeSpent: { current: 90, average: 85, sessions: 18, trend: [82, 84, 86, 88, 90, 90], learned: 54, total: 60, lastScore: 92, bestScore: 95 }
    },
    testScores: { avg: 86, last5: [85, 84, 88, 87, 86], highest: 88, lowest: 84 },
    streak: 15,
    totalSessions: 18,
    lastActive: "5 phút trước",
    classRank: 3,
    progressRate: 3,
    weakPoints: ["Phát âm âm thanh đặc biệt"],
    strengths: ["Ngữ pháp tốt", "Đều đặn"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "absent-with-reason", reason: "Ốm" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 2,
    name: "Trần Thị Bình",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Binh",
    phone: "0902345678",
    email: "binh.tran@email.com",
    enrollDate: "2024-08-20",
    attendanceStatus: "present",
    absentCount: { withReason: 0, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 92, average: 90, sessions: 22, trend: [88, 89, 90, 91, 92, 92], learned: 920, total: 1000, lastScore: 94, bestScore: 96 },
      grammar: { current: 94, average: 92, sessions: 22, trend: [90, 91, 92, 93, 94, 94], learned: 172, total: 180, lastScore: 96, bestScore: 98 },
      listening: { current: 90, average: 88, sessions: 22, trend: [86, 87, 88, 89, 90, 90], learned: 48, total: 50, lastScore: 92, bestScore: 94 },
      pronunciation: { current: 93, average: 91, sessions: 22, trend: [89, 90, 91, 92, 93, 93], learned: 380, total: 400, lastScore: 95, bestScore: 97 },
      timeSpent: { current: 95, average: 92, sessions: 22, trend: [90, 91, 92, 94, 95, 95], learned: 58, total: 60, lastScore: 97, bestScore: 100 }
    },
    testScores: { avg: 93, last5: [92, 91, 94, 95, 93], highest: 95, lowest: 91 },
    streak: 22,
    totalSessions: 22,
    lastActive: "2 phút trước",
    classRank: 1,
    progressRate: 2,
    weakPoints: [],
    strengths: ["Xuất sắc toàn diện", "Top 1 lớp"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 3,
    name: "Lê Hoàng Cường",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cuong",
    phone: "0903456789",
    email: "cuong.le@email.com",
    enrollDate: "2024-09-01",
    attendanceStatus: "late",
    absentCount: { withReason: 2, noReason: 1 },
    absentReason: "",
    readinessStatus: "partial",
    metrics: {
      vocabulary: { current: 68, average: 70, sessions: 15, trend: [72, 71, 70, 69, 68, 68], learned: 680, total: 1000, lastScore: 65, bestScore: 74 },
      grammar: { current: 65, average: 68, sessions: 15, trend: [70, 69, 68, 66, 65, 65], learned: 110, total: 180, lastScore: 62, bestScore: 72 },
      listening: { current: 70, average: 72, sessions: 15, trend: [74, 73, 72, 71, 70, 70], learned: 35, total: 50, lastScore: 68, bestScore: 76 },
      pronunciation: { current: 67, average: 69, sessions: 15, trend: [71, 70, 69, 68, 67, 67], learned: 260, total: 400, lastScore: 64, bestScore: 73 },
      timeSpent: { current: 60, average: 65, sessions: 15, trend: [68, 66, 65, 63, 60, 60], learned: 36, total: 60, lastScore: 58, bestScore: 70 }
    },
    testScores: { avg: 68, last5: [67, 66, 70, 69, 68], highest: 70, lowest: 66 },
    streak: 8,
    totalSessions: 15,
    lastActive: "1 giờ trước",
    classRank: 11,
    progressRate: -2,
    weakPoints: ["Ngữ pháp", "Từ vựng", "Thời gian học ít"],
    strengths: ["Đang cải thiện"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "late" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "absent-no-reason" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "absent-with-reason", reason: "Công tác" }
    ]
  },
  {
    id: 4,
    name: "Phạm Thị Dung",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dung",
    phone: "0904567890",
    email: "dung.pham@email.com",
    enrollDate: "2024-08-25",
    attendanceStatus: "present",
    absentCount: { withReason: 0, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 89, average: 87, sessions: 20, trend: [85, 86, 87, 88, 89, 89], learned: 890, total: 1000, lastScore: 91, bestScore: 93 },
      grammar: { current: 86, average: 84, sessions: 20, trend: [82, 83, 84, 85, 86, 86], learned: 155, total: 180, lastScore: 88, bestScore: 90 },
      listening: { current: 91, average: 89, sessions: 20, trend: [87, 88, 89, 90, 91, 91], learned: 46, total: 50, lastScore: 93, bestScore: 95 },
      pronunciation: { current: 88, average: 86, sessions: 20, trend: [84, 85, 86, 87, 88, 88], learned: 355, total: 400, lastScore: 90, bestScore: 92 },
      timeSpent: { current: 92, average: 88, sessions: 20, trend: [86, 87, 88, 90, 92, 92], learned: 55, total: 60, lastScore: 94, bestScore: 96 }
    },
    testScores: { avg: 89, last5: [88, 87, 90, 91, 89], highest: 91, lowest: 87 },
    streak: 18,
    totalSessions: 20,
    lastActive: "3 phút trước",
    classRank: 2,
    progressRate: 2,
    weakPoints: ["Ngữ pháp phức tạp"],
    strengths: ["Nghe tốt", "Chăm chỉ"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 5,
    name: "Võ Minh Em",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Em",
    phone: "0905678901",
    email: "em.vo@email.com",
    enrollDate: "2024-09-05",
    attendanceStatus: "present",
    absentCount: { withReason: 1, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 84, average: 82, sessions: 19, trend: [80, 81, 82, 83, 84, 84], learned: 840, total: 1000, lastScore: 86, bestScore: 88 },
      grammar: { current: 87, average: 85, sessions: 19, trend: [83, 84, 85, 86, 87, 87], learned: 153, total: 180, lastScore: 89, bestScore: 91 },
      listening: { current: 86, average: 84, sessions: 19, trend: [82, 83, 84, 85, 86, 86], learned: 43, total: 50, lastScore: 88, bestScore: 90 },
      pronunciation: { current: 85, average: 83, sessions: 19, trend: [81, 82, 83, 84, 85, 85], learned: 340, total: 400, lastScore: 87, bestScore: 89 },
      timeSpent: { current: 88, average: 85, sessions: 19, trend: [83, 84, 85, 87, 88, 88], learned: 53, total: 60, lastScore: 90, bestScore: 92 }
    },
    testScores: { avg: 86, last5: [85, 84, 87, 88, 86], highest: 88, lowest: 84 },
    streak: 16,
    totalSessions: 19,
    lastActive: "7 phút trước",
    classRank: 5,
    progressRate: 2,
    weakPoints: ["Từ vựng chuyên ngành"],
    strengths: ["Toàn diện tốt"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "absent-with-reason", reason: "Việc gia đình" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 6,
    name: "Hoàng Văn Phong",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phong",
    phone: "0906789012",
    email: "phong.hoang@email.com",
    enrollDate: "2024-09-10",
    attendanceStatus: "present",
    absentCount: { withReason: 3, noReason: 0 },
    absentReason: "",
    readinessStatus: "partial",
    metrics: {
      vocabulary: { current: 72, average: 75, sessions: 16, trend: [77, 76, 75, 73, 72, 72], learned: 720, total: 1000, lastScore: 70, bestScore: 79 },
      grammar: { current: 70, average: 73, sessions: 16, trend: [75, 74, 73, 71, 70, 70], learned: 126, total: 180, lastScore: 68, bestScore: 77 },
      listening: { current: 74, average: 76, sessions: 16, trend: [78, 77, 76, 75, 74, 74], learned: 38, total: 50, lastScore: 72, bestScore: 80 },
      pronunciation: { current: 71, average: 74, sessions: 16, trend: [76, 75, 74, 72, 71, 71], learned: 285, total: 400, lastScore: 69, bestScore: 78 },
      timeSpent: { current: 68, average: 72, sessions: 16, trend: [74, 73, 72, 70, 68, 68], learned: 41, total: 60, lastScore: 66, bestScore: 76 }
    },
    testScores: { avg: 71, last5: [70, 69, 73, 72, 71], highest: 73, lowest: 69 },
    streak: 10,
    totalSessions: 16,
    lastActive: "45 phút trước",
    classRank: 9,
    progressRate: -3,
    weakPoints: ["Ngữ pháp", "Phát âm", "Thiếu thời gian"],
    strengths: ["Đang cố gắng"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "absent-with-reason", reason: "Khám bệnh" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "absent-with-reason", reason: "Công việc" }
    ]
  },
  {
    id: 7,
    name: "Đặng Thị Giang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giang",
    phone: "0907890123",
    email: "giang.dang@email.com",
    enrollDate: "2024-08-15",
    attendanceStatus: "present",
    absentCount: { withReason: 0, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 90, average: 88, sessions: 21, trend: [86, 87, 88, 89, 90, 90], learned: 900, total: 1000, lastScore: 92, bestScore: 94 },
      grammar: { current: 92, average: 90, sessions: 21, trend: [88, 89, 90, 91, 92, 92], learned: 166, total: 180, lastScore: 94, bestScore: 96 },
      listening: { current: 89, average: 87, sessions: 21, trend: [85, 86, 87, 88, 89, 89], learned: 45, total: 50, lastScore: 91, bestScore: 93 },
      pronunciation: { current: 91, average: 89, sessions: 21, trend: [87, 88, 89, 90, 91, 91], learned: 365, total: 400, lastScore: 93, bestScore: 95 },
      timeSpent: { current: 93, average: 90, sessions: 21, trend: [88, 89, 90, 92, 93, 93], learned: 56, total: 60, lastScore: 95, bestScore: 97 }
    },
    testScores: { avg: 91, last5: [90, 89, 92, 93, 91], highest: 93, lowest: 89 },
    streak: 21,
    totalSessions: 21,
    lastActive: "4 phút trước",
    classRank: 2,
    progressRate: 2,
    weakPoints: [],
    strengths: ["Xuất sắc", "Top 2 lớp"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 8,
    name: "Bùi Văn Hải",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hai",
    phone: "0908901234",
    email: "hai.bui@email.com",
    enrollDate: "2024-09-20",
    attendanceStatus: "present",
    absentCount: { withReason: 1, noReason: 2 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 86, average: 84, sessions: 17, trend: [82, 83, 84, 85, 86, 86], learned: 860, total: 1000, lastScore: 88, bestScore: 90 },
      grammar: { current: 84, average: 82, sessions: 17, trend: [80, 81, 82, 83, 84, 84], learned: 148, total: 180, lastScore: 86, bestScore: 88 },
      listening: { current: 88, average: 86, sessions: 17, trend: [84, 85, 86, 87, 88, 88], learned: 44, total: 50, lastScore: 90, bestScore: 92 },
      pronunciation: { current: 85, average: 83, sessions: 17, trend: [81, 82, 83, 84, 85, 85], learned: 345, total: 400, lastScore: 87, bestScore: 89 },
      timeSpent: { current: 87, average: 84, sessions: 17, trend: [82, 83, 84, 86, 87, 87], learned: 52, total: 60, lastScore: 89, bestScore: 91 }
    },
    testScores: { avg: 86, last5: [85, 84, 87, 88, 86], highest: 88, lowest: 84 },
    streak: 14,
    totalSessions: 17,
    lastActive: "6 phút trước",
    classRank: 4,
    progressRate: 2,
    weakPoints: ["Ngữ pháp"],
    strengths: ["Nghe tốt", "Phát âm tốt"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "absent-no-reason" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "absent-no-reason" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 9,
    name: "Lý Thị Lan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lan",
    phone: "0909012345",
    email: "lan.ly@email.com",
    enrollDate: "2024-10-01",
    attendanceStatus: "absent-with-reason",
    absentCount: { withReason: 2, noReason: 0 },
    absentReason: "Đi công tác công ty",
    readinessStatus: "partial",
    metrics: {
      vocabulary: { current: 75, average: 78, sessions: 14, trend: [80, 79, 78, 76, 75, 75], learned: 750, total: 1000, lastScore: 73, bestScore: 82 },
      grammar: { current: 73, average: 76, sessions: 14, trend: [78, 77, 76, 74, 73, 73], learned: 131, total: 180, lastScore: 71, bestScore: 80 },
      listening: { current: 77, average: 80, sessions: 14, trend: [82, 81, 80, 78, 77, 77], learned: 39, total: 50, lastScore: 75, bestScore: 84 },
      pronunciation: { current: 74, average: 77, sessions: 14, trend: [79, 78, 77, 75, 74, 74], learned: 295, total: 400, lastScore: 72, bestScore: 81 },
      timeSpent: { current: 70, average: 75, sessions: 14, trend: [77, 76, 75, 72, 70, 70], learned: 42, total: 60, lastScore: 68, bestScore: 79 }
    },
    testScores: { avg: 74, last5: [73, 72, 76, 75, 74], highest: 76, lowest: 72 },
    streak: 9,
    totalSessions: 14,
    lastActive: "5 giờ trước",
    classRank: 8,
    progressRate: -3,
    weakPoints: ["Ngữ pháp", "Thiếu thời gian"],
    strengths: ["Nghe khá tốt"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "absent-with-reason", reason: "Công tác" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "absent-with-reason", reason: "Họp công ty" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 10,
    name: "Ngô Văn Minh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Minh",
    phone: "0910123456",
    email: "minh.ngo@email.com",
    enrollDate: "2024-09-08",
    attendanceStatus: "present",
    absentCount: { withReason: 0, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 88, average: 86, sessions: 19, trend: [84, 85, 86, 87, 88, 88], learned: 880, total: 1000, lastScore: 90, bestScore: 92 },
      grammar: { current: 89, average: 87, sessions: 19, trend: [85, 86, 87, 88, 89, 89], learned: 160, total: 180, lastScore: 91, bestScore: 93 },
      listening: { current: 87, average: 85, sessions: 19, trend: [83, 84, 85, 86, 87, 87], learned: 44, total: 50, lastScore: 89, bestScore: 91 },
      pronunciation: { current: 88, average: 86, sessions: 19, trend: [84, 85, 86, 87, 88, 88], learned: 355, total: 400, lastScore: 90, bestScore: 92 },
      timeSpent: { current: 91, average: 88, sessions: 19, trend: [86, 87, 88, 90, 91, 91], learned: 55, total: 60, lastScore: 93, bestScore: 95 }
    },
    testScores: { avg: 88, last5: [87, 86, 89, 90, 88], highest: 90, lowest: 86 },
    streak: 17,
    totalSessions: 19,
    lastActive: "4 phút trước",
    classRank: 3,
    progressRate: 2,
    weakPoints: [],
    strengths: ["Toàn diện tốt", "Đều đặn"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 11,
    name: "Trương Thị Nga",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nga",
    phone: "0911234567",
    email: "nga.truong@email.com",
    enrollDate: "2024-10-10",
    attendanceStatus: "late",
    absentCount: { withReason: 1, noReason: 1 },
    absentReason: "",
    readinessStatus: "partial",
    metrics: {
      vocabulary: { current: 70, average: 72, sessions: 13, trend: [74, 73, 72, 71, 70, 70], learned: 700, total: 1000, lastScore: 68, bestScore: 76 },
      grammar: { current: 68, average: 70, sessions: 13, trend: [72, 71, 70, 69, 68, 68], learned: 122, total: 180, lastScore: 66, bestScore: 74 },
      listening: { current: 72, average: 74, sessions: 13, trend: [76, 75, 74, 73, 72, 72], learned: 36, total: 50, lastScore: 70, bestScore: 78 },
      pronunciation: { current: 69, average: 71, sessions: 13, trend: [73, 72, 71, 70, 69, 69], learned: 275, total: 400, lastScore: 67, bestScore: 75 },
      timeSpent: { current: 65, average: 68, sessions: 13, trend: [70, 69, 68, 66, 65, 65], learned: 39, total: 60, lastScore: 63, bestScore: 72 }
    },
    testScores: { avg: 69, last5: [68, 67, 71, 70, 69], highest: 71, lowest: 67 },
    streak: 7,
    totalSessions: 13,
    lastActive: "2 giờ trước",
    classRank: 10,
    progressRate: -2,
    weakPoints: ["Ngữ pháp", "Phát âm"],
    strengths: ["Đang cố gắng"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "late" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "absent-no-reason" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "absent-with-reason", reason: "Ốm" }
    ]
  },
  {
    id: 12,
    name: "Phan Văn Oanh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oanh",
    phone: "0912345678",
    email: "oanh.phan@email.com",
    enrollDate: "2024-08-28",
    attendanceStatus: "present",
    absentCount: { withReason: 0, noReason: 0 },
    absentReason: "",
    readinessStatus: "ready",
    metrics: {
      vocabulary: { current: 87, average: 85, sessions: 20, trend: [83, 84, 85, 86, 87, 87], learned: 870, total: 1000, lastScore: 89, bestScore: 91 },
      grammar: { current: 85, average: 83, sessions: 20, trend: [81, 82, 83, 84, 85, 85], learned: 153, total: 180, lastScore: 87, bestScore: 89 },
      listening: { current: 89, average: 87, sessions: 20, trend: [85, 86, 87, 88, 89, 89], learned: 45, total: 50, lastScore: 91, bestScore: 93 },
      pronunciation: { current: 86, average: 84, sessions: 20, trend: [82, 83, 84, 85, 86, 86], learned: 348, total: 400, lastScore: 88, bestScore: 90 },
      timeSpent: { current: 90, average: 87, sessions: 20, trend: [85, 86, 87, 89, 90, 90], learned: 54, total: 60, lastScore: 92, bestScore: 94 }
    },
    testScores: { avg: 87, last5: [86, 85, 88, 89, 87], highest: 89, lowest: 85 },
    streak: 18,
    totalSessions: 20,
    lastActive: "5 phút trước",
    classRank: 4,
    progressRate: 2,
    weakPoints: ["Ngữ pháp"],
    strengths: ["Nghe xuất sắc", "Chăm chỉ"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "present" }
    ]
  },
  {
    id: 13,
    name: "Đỗ Thị Phượng",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phuong",
    phone: "0913456789",
    email: "phuong.do@email.com",
    enrollDate: "2024-10-15",
    attendanceStatus: "present",
    absentCount: { withReason: 2, noReason: 4 },
    absentReason: "",
    readinessStatus: "not_ready",
    metrics: {
      vocabulary: { current: 52, average: 58, sessions: 10, trend: [62, 60, 58, 55, 52, 52], learned: 520, total: 1000, lastScore: 48, bestScore: 64 },
      grammar: { current: 48, average: 54, sessions: 10, trend: [58, 56, 54, 51, 48, 48], learned: 86, total: 180, lastScore: 44, bestScore: 60 },
      listening: { current: 55, average: 60, sessions: 10, trend: [64, 62, 60, 57, 55, 55], learned: 28, total: 50, lastScore: 52, bestScore: 66 },
      pronunciation: { current: 50, average: 56, sessions: 10, trend: [60, 58, 56, 53, 50, 50], learned: 200, total: 400, lastScore: 46, bestScore: 62 },
      timeSpent: { current: 40, average: 50, sessions: 10, trend: [54, 52, 50, 45, 40, 40], learned: 24, total: 60, lastScore: 36, bestScore: 56 }
    },
    testScores: { avg: 51, last5: [50, 48, 54, 52, 51], highest: 54, lowest: 48 },
    streak: 4,
    totalSessions: 10,
    lastActive: "3 giờ trước",
    classRank: 15,
    progressRate: -6,
    weakPoints: ["Tất cả kỹ năng", "Vắng nhiều", "Thiếu thời gian"],
    strengths: ["Cần hỗ trợ gấp"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "absent-no-reason" },
      { date: "2024-11-15", status: "absent-no-reason" },
      { date: "2024-11-13", status: "absent-no-reason" },
      { date: "2024-11-11", status: "absent-no-reason" }
    ]
  },
  {
    id: 14,
    name: "Cao Văn Quân",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quan",
    phone: "0914567890",
    email: "quan.cao@email.com",
    enrollDate: "2024-09-12",
    attendanceStatus: "absent-no-reason",
    absentCount: { withReason: 1, noReason: 3 },
    absentReason: "",
    readinessStatus: "not_ready",
    metrics: {
      vocabulary: { current: 58, average: 62, sessions: 12, trend: [66, 64, 62, 60, 58, 58], learned: 580, total: 1000, lastScore: 55, bestScore: 68 },
      grammar: { current: 55, average: 60, sessions: 12, trend: [64, 62, 60, 57, 55, 55], learned: 99, total: 180, lastScore: 52, bestScore: 66 },
      listening: { current: 60, average: 64, sessions: 12, trend: [68, 66, 64, 62, 60, 60], learned: 30, total: 50, lastScore: 58, bestScore: 70 },
      pronunciation: { current: 56, average: 61, sessions: 12, trend: [65, 63, 61, 58, 56, 56], learned: 225, total: 400, lastScore: 53, bestScore: 67 },
      timeSpent: { current: 45, average: 55, sessions: 12, trend: [60, 58, 55, 50, 45, 45], learned: 27, total: 60, lastScore: 42, bestScore: 62 }
    },
    testScores: { avg: 55, last5: [58, 56, 54, 53, 55], highest: 58, lowest: 53 },
    streak: 3,
    totalSessions: 12,
    lastActive: "1 ngày trước",
    classRank: 14,
    progressRate: -5,
    weakPoints: ["Thiếu động lực", "Vắng nhiều", "Thời gian học"],
    strengths: [],
    coachNotes: ["Cần liên hệ phụ huynh"],
    attendanceHistory: [
      { date: "2024-11-20", status: "absent-no-reason" },
      { date: "2024-11-18", status: "absent-no-reason" },
      { date: "2024-11-15", status: "present" },
      { date: "2024-11-13", status: "absent-no-reason" },
      { date: "2024-11-11", status: "absent-with-reason", reason: "Bệnh" }
    ]
  },
  {
    id: 15,
    name: "Vũ Thị Rồng",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rong",
    phone: "0915678901",
    email: "rong.vu@email.com",
    enrollDate: "2024-09-18",
    attendanceStatus: "present",
    absentCount: { withReason: 2, noReason: 0 },
    absentReason: "",
    readinessStatus: "partial",
    metrics: {
      vocabulary: { current: 78, average: 76, sessions: 17, trend: [74, 75, 76, 77, 78, 78], learned: 780, total: 1000, lastScore: 80, bestScore: 82 },
      grammar: { current: 76, average: 74, sessions: 17, trend: [72, 73, 74, 75, 76, 76], learned: 137, total: 180, lastScore: 78, bestScore: 80 },
      listening: { current: 80, average: 78, sessions: 17, trend: [76, 77, 78, 79, 80, 80], learned: 40, total: 50, lastScore: 82, bestScore: 84 },
      pronunciation: { current: 77, average: 75, sessions: 17, trend: [73, 74, 75, 76, 77, 77], learned: 308, total: 400, lastScore: 79, bestScore: 81 },
      timeSpent: { current: 82, average: 79, sessions: 17, trend: [77, 78, 79, 81, 82, 82], learned: 49, total: 60, lastScore: 84, bestScore: 86 }
    },
    testScores: { avg: 79, last5: [77, 78, 80, 81, 79], highest: 81, lowest: 77 },
    streak: 12,
    totalSessions: 17,
    lastActive: "20 phút trước",
    classRank: 6,
    progressRate: 2,
    weakPoints: ["Ngữ pháp nâng cao"],
    strengths: ["Nghe tốt", "Tiến bộ đều"],
    coachNotes: [],
    attendanceHistory: [
      { date: "2024-11-20", status: "present" },
      { date: "2024-11-18", status: "present" },
      { date: "2024-11-15", status: "absent-with-reason", reason: "Du lịch" },
      { date: "2024-11-13", status: "present" },
      { date: "2024-11-11", status: "absent-with-reason", reason: "Họp gia đình" }
    ]
  }
];

export const skillIcons = {
  vocabulary: '📚',
  grammar: '📖',
  listening: '👂',
  pronunciation: '🗣️',
  timeSpent: '⏱️'
};

export const skillLabels = {
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  listening: 'Nghe hiểu',
  pronunciation: 'Phát âm',
  timeSpent: 'Thời gian'
};

// Calculate average score from metrics
export const calculateAvgScore = (metrics) => {
  return Math.round(
    (metrics.vocabulary.current +
     metrics.grammar.current +
     metrics.listening.current +
     metrics.pronunciation.current +
     metrics.timeSpent.current) / 5
  );
};
