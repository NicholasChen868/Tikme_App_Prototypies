import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PreClassDashboard.css';

        // Mock Data - Coach
        const mockCoach = {
            name: "Nguyễn Minh Châu",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Coach1",
            email: "chau.nguyen@tikme.edu.vn",
            totalClassesToday: 3,
            completedClasses: 1,
            todayClasses: [
                {
                    id: 1,
                    name: "Lớp N4-01",
                    lesson: "Bài 15: Tại Nhà Hàng",
                    time: "08:00 - 09:30",
                    status: "completed",
                    type: "online",
                    platform: "Zoom",
                    meetingId: "123-456-789",
                    totalStudents: 10,
                    present: 8,
                    late: 1,
                    absent: 1,
                    teacher: "Nguyễn Minh Châu",
                    room: ""
                },
                {
                    id: 2,
                    name: "Lớp N4-05",
                    lesson: "Bài 20: Đi Mua Sắm",
                    time: "10:00 - 11:30",
                    status: "active",
                    type: "offline",
                    platform: "",
                    meetingId: "",
                    totalStudents: 13,
                    present: 10,
                    late: 2,
                    absent: 1,
                    teacher: "Nguyễn Minh Châu",
                    room: "Phòng A203"
                },
                {
                    id: 3,
                    name: "Lớp N3-02",
                    lesson: "Bài 8: Giao Tiếp Công Việc",
                    time: "14:00 - 15:30",
                    status: "upcoming",
                    type: "offline",
                    platform: "",
                    meetingId: "",
                    totalStudents: 10,
                    present: 0,
                    late: 0,
                    absent: 0,
                    teacher: "Nguyễn Minh Châu",
                    room: "Phòng B105"
                }
            ]
        };

        // Mock Data - 13 Students with comprehensive data
        const mockStudents = [
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
                    vocabulary: { current: 85, average: 82, sessions: 18, trend: [78, 80, 82, 83, 85], learned: 850, total: 1000, lastScore: 88, bestScore: 92 },
                    grammar: { current: 88, average: 85, sessions: 18, trend: [82, 84, 85, 87, 88], learned: 145, total: 180, lastScore: 90, bestScore: 94 },
                    listening: { current: 82, average: 80, sessions: 18, trend: [77, 79, 80, 81, 82], learned: 42, total: 50, lastScore: 84, bestScore: 88 },
                    pronunciation: { current: 87, average: 84, sessions: 18, trend: [81, 83, 84, 86, 87], learned: 320, total: 400, lastScore: 89, bestScore: 91 },
                    timeSpent: { current: 90, average: 85, sessions: 18, trend: [82, 84, 86, 88, 90], learned: 54, total: 60, lastScore: 92, bestScore: 95 }
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
                    vocabulary: { current: 92, average: 90, sessions: 22, trend: [88, 89, 90, 91, 92], learned: 920, total: 1000, lastScore: 94, bestScore: 96 },
                    grammar: { current: 94, average: 92, sessions: 22, trend: [90, 91, 92, 93, 94], learned: 172, total: 180, lastScore: 96, bestScore: 98 },
                    listening: { current: 90, average: 88, sessions: 22, trend: [86, 87, 88, 89, 90], learned: 48, total: 50, lastScore: 92, bestScore: 94 },
                    pronunciation: { current: 93, average: 91, sessions: 22, trend: [89, 90, 91, 92, 93], learned: 380, total: 400, lastScore: 95, bestScore: 97 },
                    timeSpent: { current: 95, average: 92, sessions: 22, trend: [90, 91, 92, 94, 95], learned: 58, total: 60, lastScore: 97, bestScore: 100 }
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
                    vocabulary: { current: 68, average: 70, sessions: 15, trend: [72, 71, 70, 69, 68], learned: 680, total: 1000, lastScore: 65, bestScore: 74 },
                    grammar: { current: 65, average: 68, sessions: 15, trend: [70, 69, 68, 66, 65], learned: 110, total: 180, lastScore: 62, bestScore: 72 },
                    listening: { current: 70, average: 72, sessions: 15, trend: [74, 73, 72, 71, 70], learned: 35, total: 50, lastScore: 68, bestScore: 76 },
                    pronunciation: { current: 67, average: 69, sessions: 15, trend: [71, 70, 69, 68, 67], learned: 260, total: 400, lastScore: 64, bestScore: 73 },
                    timeSpent: { current: 60, average: 65, sessions: 15, trend: [68, 66, 65, 63, 60], learned: 36, total: 60, lastScore: 58, bestScore: 70 }
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
                    vocabulary: { current: 89, average: 87, sessions: 20, trend: [85, 86, 87, 88, 89], learned: 890, total: 1000, lastScore: 91, bestScore: 93 },
                    grammar: { current: 86, average: 84, sessions: 20, trend: [82, 83, 84, 85, 86], learned: 155, total: 180, lastScore: 88, bestScore: 90 },
                    listening: { current: 91, average: 89, sessions: 20, trend: [87, 88, 89, 90, 91], learned: 46, total: 50, lastScore: 93, bestScore: 95 },
                    pronunciation: { current: 88, average: 86, sessions: 20, trend: [84, 85, 86, 87, 88], learned: 355, total: 400, lastScore: 90, bestScore: 92 },
                    timeSpent: { current: 92, average: 88, sessions: 20, trend: [86, 87, 88, 90, 92], learned: 55, total: 60, lastScore: 94, bestScore: 96 }
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
                    vocabulary: { current: 84, average: 82, sessions: 19, trend: [80, 81, 82, 83, 84], learned: 840, total: 1000, lastScore: 86, bestScore: 88 },
                    grammar: { current: 87, average: 85, sessions: 19, trend: [83, 84, 85, 86, 87], learned: 153, total: 180, lastScore: 89, bestScore: 91 },
                    listening: { current: 86, average: 84, sessions: 19, trend: [82, 83, 84, 85, 86], learned: 43, total: 50, lastScore: 88, bestScore: 90 },
                    pronunciation: { current: 85, average: 83, sessions: 19, trend: [81, 82, 83, 84, 85], learned: 340, total: 400, lastScore: 87, bestScore: 89 },
                    timeSpent: { current: 88, average: 85, sessions: 19, trend: [83, 84, 85, 87, 88], learned: 53, total: 60, lastScore: 90, bestScore: 92 }
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
                    vocabulary: { current: 72, average: 75, sessions: 16, trend: [77, 76, 75, 73, 72], learned: 720, total: 1000, lastScore: 70, bestScore: 79 },
                    grammar: { current: 70, average: 73, sessions: 16, trend: [75, 74, 73, 71, 70], learned: 126, total: 180, lastScore: 68, bestScore: 77 },
                    listening: { current: 74, average: 76, sessions: 16, trend: [78, 77, 76, 75, 74], learned: 38, total: 50, lastScore: 72, bestScore: 80 },
                    pronunciation: { current: 71, average: 74, sessions: 16, trend: [76, 75, 74, 72, 71], learned: 285, total: 400, lastScore: 69, bestScore: 78 },
                    timeSpent: { current: 68, average: 72, sessions: 16, trend: [74, 73, 72, 70, 68], learned: 41, total: 60, lastScore: 66, bestScore: 76 }
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
                    vocabulary: { current: 90, average: 88, sessions: 21, trend: [86, 87, 88, 89, 90], learned: 900, total: 1000, lastScore: 92, bestScore: 94 },
                    grammar: { current: 92, average: 90, sessions: 21, trend: [88, 89, 90, 91, 92], learned: 166, total: 180, lastScore: 94, bestScore: 96 },
                    listening: { current: 89, average: 87, sessions: 21, trend: [85, 86, 87, 88, 89], learned: 45, total: 50, lastScore: 91, bestScore: 93 },
                    pronunciation: { current: 91, average: 89, sessions: 21, trend: [87, 88, 89, 90, 91], learned: 365, total: 400, lastScore: 93, bestScore: 95 },
                    timeSpent: { current: 93, average: 90, sessions: 21, trend: [88, 89, 90, 92, 93], learned: 56, total: 60, lastScore: 95, bestScore: 97 }
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
                    vocabulary: { current: 86, average: 84, sessions: 17, trend: [82, 83, 84, 85, 86], learned: 860, total: 1000, lastScore: 88, bestScore: 90 },
                    grammar: { current: 84, average: 82, sessions: 17, trend: [80, 81, 82, 83, 84], learned: 148, total: 180, lastScore: 86, bestScore: 88 },
                    listening: { current: 88, average: 86, sessions: 17, trend: [84, 85, 86, 87, 88], learned: 44, total: 50, lastScore: 90, bestScore: 92 },
                    pronunciation: { current: 85, average: 83, sessions: 17, trend: [81, 82, 83, 84, 85], learned: 345, total: 400, lastScore: 87, bestScore: 89 },
                    timeSpent: { current: 87, average: 84, sessions: 17, trend: [82, 83, 84, 86, 87], learned: 52, total: 60, lastScore: 89, bestScore: 91 }
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
                    vocabulary: { current: 75, average: 78, sessions: 14, trend: [80, 79, 78, 76, 75], learned: 750, total: 1000, lastScore: 73, bestScore: 82 },
                    grammar: { current: 73, average: 76, sessions: 14, trend: [78, 77, 76, 74, 73], learned: 131, total: 180, lastScore: 71, bestScore: 80 },
                    listening: { current: 77, average: 80, sessions: 14, trend: [82, 81, 80, 78, 77], learned: 39, total: 50, lastScore: 75, bestScore: 84 },
                    pronunciation: { current: 74, average: 77, sessions: 14, trend: [79, 78, 77, 75, 74], learned: 295, total: 400, lastScore: 72, bestScore: 81 },
                    timeSpent: { current: 70, average: 75, sessions: 14, trend: [77, 76, 75, 72, 70], learned: 42, total: 60, lastScore: 68, bestScore: 79 }
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
                    vocabulary: { current: 88, average: 86, sessions: 19, trend: [84, 85, 86, 87, 88], learned: 880, total: 1000, lastScore: 90, bestScore: 92 },
                    grammar: { current: 89, average: 87, sessions: 19, trend: [85, 86, 87, 88, 89], learned: 160, total: 180, lastScore: 91, bestScore: 93 },
                    listening: { current: 87, average: 85, sessions: 19, trend: [83, 84, 85, 86, 87], learned: 44, total: 50, lastScore: 89, bestScore: 91 },
                    pronunciation: { current: 88, average: 86, sessions: 19, trend: [84, 85, 86, 87, 88], learned: 355, total: 400, lastScore: 90, bestScore: 92 },
                    timeSpent: { current: 91, average: 88, sessions: 19, trend: [86, 87, 88, 90, 91], learned: 55, total: 60, lastScore: 93, bestScore: 95 }
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
                    vocabulary: { current: 70, average: 72, sessions: 13, trend: [74, 73, 72, 71, 70], learned: 700, total: 1000, lastScore: 68, bestScore: 76 },
                    grammar: { current: 68, average: 70, sessions: 13, trend: [72, 71, 70, 69, 68], learned: 122, total: 180, lastScore: 66, bestScore: 74 },
                    listening: { current: 72, average: 74, sessions: 13, trend: [76, 75, 74, 73, 72], learned: 36, total: 50, lastScore: 70, bestScore: 78 },
                    pronunciation: { current: 69, average: 71, sessions: 13, trend: [73, 72, 71, 70, 69], learned: 275, total: 400, lastScore: 67, bestScore: 75 },
                    timeSpent: { current: 65, average: 68, sessions: 13, trend: [70, 69, 68, 66, 65], learned: 39, total: 60, lastScore: 63, bestScore: 72 }
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
                    vocabulary: { current: 87, average: 85, sessions: 20, trend: [83, 84, 85, 86, 87], learned: 870, total: 1000, lastScore: 89, bestScore: 91 },
                    grammar: { current: 85, average: 83, sessions: 20, trend: [81, 82, 83, 84, 85], learned: 153, total: 180, lastScore: 87, bestScore: 89 },
                    listening: { current: 89, average: 87, sessions: 20, trend: [85, 86, 87, 88, 89], learned: 45, total: 50, lastScore: 91, bestScore: 93 },
                    pronunciation: { current: 86, average: 84, sessions: 20, trend: [82, 83, 84, 85, 86], learned: 348, total: 400, lastScore: 88, bestScore: 90 },
                    timeSpent: { current: 90, average: 87, sessions: 20, trend: [85, 86, 87, 89, 90], learned: 54, total: 60, lastScore: 92, bestScore: 94 }
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
                    vocabulary: { current: 52, average: 58, sessions: 10, trend: [62, 60, 58, 55, 52], learned: 520, total: 1000, lastScore: 48, bestScore: 64 },
                    grammar: { current: 48, average: 54, sessions: 10, trend: [58, 56, 54, 51, 48], learned: 86, total: 180, lastScore: 44, bestScore: 60 },
                    listening: { current: 55, average: 60, sessions: 10, trend: [64, 62, 60, 57, 55], learned: 28, total: 50, lastScore: 52, bestScore: 66 },
                    pronunciation: { current: 50, average: 56, sessions: 10, trend: [60, 58, 56, 53, 50], learned: 200, total: 400, lastScore: 46, bestScore: 62 },
                    timeSpent: { current: 40, average: 50, sessions: 10, trend: [54, 52, 50, 45, 40], learned: 24, total: 60, lastScore: 36, bestScore: 56 }
                },
                testScores: { avg: 51, last5: [50, 48, 54, 52, 51], highest: 54, lowest: 48 },
                streak: 4,
                totalSessions: 10,
                lastActive: "3 giờ trước",
                classRank: 13,
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
            }
        ];

        // Helper Functions
        const getScoreColor = (score) => {
            if (score >= 80) return 'var(--edu-green)';
            if (score >= 60) return 'var(--edu-orange)';
            return 'var(--edu-red)';
        };

        const getScoreBg = (score) => {
            if (score >= 80) return 'var(--edu-green-bg)';
            if (score >= 60) return 'var(--edu-orange-bg)';
            return 'var(--edu-red-bg)';
        };

        const getStatusInfo = (status) => {
            switch(status) {
                case 'present': return { bg: 'var(--edu-green-bg)', color: 'var(--edu-green)', label: 'Đã vào', icon: '✓' };
                case 'late': return { bg: 'var(--edu-orange-bg)', color: 'var(--edu-orange)', label: 'Chưa vào', icon: '○' };
                case 'absent-with-reason': return { bg: 'var(--edu-blue-bg)', color: 'var(--edu-blue)', label: 'Vắng c/p', icon: '◎' };
                case 'absent-no-reason': return { bg: 'var(--edu-red-bg)', color: 'var(--edu-red)', label: 'Vắng k/p', icon: '✗' };
                default: return { bg: 'var(--bg-light)', color: 'var(--text-muted)', label: 'Chưa rõ', icon: '?' };
            }
        };

        const getReadinessInfo = (status) => {
            switch(status) {
                case 'ready': return { bg: 'var(--edu-green-bg)', color: 'var(--edu-green)', label: 'Sẵn sàng', icon: '✓' };
                case 'partial': return { bg: 'var(--edu-orange-bg)', color: 'var(--edu-orange)', label: 'Chưa đủ', icon: '◐' };
                case 'not_ready': return { bg: 'var(--edu-red-bg)', color: 'var(--edu-red)', label: 'Chưa sẵn sàng', icon: '✗' };
                default: return { bg: 'var(--bg-light)', color: 'var(--text-muted)', label: 'Chưa rõ', icon: '?' };
            }
        };

        // Skill Icons
        const skillIcons = {
            vocabulary: '📚',
            grammar: '📖',
            listening: '👂',
            pronunciation: '🗣️',
            timeSpent: '⏱️'
        };

        const skillLabels = {
            vocabulary: 'Từ vựng',
            grammar: 'Ngữ pháp',
            listening: 'Nghe hiểu',
            pronunciation: 'Phát âm',
            timeSpent: 'Thời gian'
        };

        // Component: SkillDetailCard
        const SkillDetailCard = ({ skillKey, metric }) => {
            const diff = metric.current - metric.average;
            return (
                <div style={{
                    background: 'var(--bg-white)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-base)',
                    border: '1px solid var(--border-light)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span style={{ fontSize: '18px' }}>{skillIcons[skillKey]}</span>
                            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 'var(--text-base)' }}>
                                {skillLabels[skillKey]}
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: getScoreColor(metric.current) }}>
                                {metric.current}%
                            </span>
                            <span style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                background: diff >= 0 ? 'var(--edu-green-light)' : 'var(--edu-red-light)',
                                color: diff >= 0 ? 'var(--edu-green)' : 'var(--edu-red)'
                            }}>
                                {diff >= 0 ? '+' : ''}{diff}
                            </span>
                        </div>
                    </div>
                    <div className="progress-bar" style={{ marginBottom: 'var(--space-sm)' }}>
                        <div className="progress-fill" style={{ width: `${metric.current}%`, background: getScoreColor(metric.current) }} />
                    </div>
                    <div style={{ fontSize: '60%', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                        <span>TB lũy kế: {metric.average}% ({metric.sessions} buổi)</span>
                        <span>Đã học: {metric.learned}/{metric.total}</span>
                    </div>
                    <div style={{ fontSize: '60%', color: 'var(--text-light)', marginTop: '2px' }}>
                        Điểm gần nhất: {metric.lastScore} • Cao nhất: {metric.bestScore}
                    </div>
                </div>
            );
        };

        // Component: StudentCard
        const StudentCard = ({ student, onClick }) => {
            const statusInfo = getStatusInfo(student.attendanceStatus);
            const readinessInfo = getReadinessInfo(student.readinessStatus);
            const hasAlarm = student.absentCount.noReason >= 3;

            const avgScore = Math.round(
                (student.metrics.vocabulary.current +
                 student.metrics.grammar.current +
                 student.metrics.listening.current +
                 student.metrics.pronunciation.current +
                 student.metrics.timeSpent.current) / 5
            );

            return (
                <div
                    onClick={onClick}
                    className="hover-lift"
                    style={{
                        background: 'var(--bg-white)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-base)',
                        border: hasAlarm ? '2px solid var(--edu-red)' : '1px solid var(--border-light)',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        position: 'relative'
                    }}
                >
                    {hasAlarm && (
                        <div className="alert-badge animate-blink" style={{ position: 'absolute', top: '-10px', right: '-10px' }}>
                            🚨 Vắng {student.absentCount.noReason} lần
                        </div>
                    )}

                    {/* Header: Avatar + Name + Badges */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
                        <img
                            src={student.avatar}
                            alt={student.name}
                            style={{
                                width: '52px',
                                height: '52px',
                                borderRadius: 'var(--radius-md)',
                                border: `3px solid ${statusInfo.bg}`
                            }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                {student.name}
                            </h3>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                <span className="badge" style={{ background: statusInfo.bg, color: statusInfo.color }}>
                                    {statusInfo.icon} {statusInfo.label}
                                </span>
                                <span className="badge" style={{ background: readinessInfo.bg, color: readinessInfo.color }}>
                                    {readinessInfo.icon} {readinessInfo.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 'var(--space-sm)',
                        padding: 'var(--space-md)',
                        background: 'var(--bg-light)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: 'var(--space-md)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: getScoreColor(avgScore) }}>{avgScore}%</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Điểm TB</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--edu-orange)' }}>🔥{student.streak}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Streak</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--text-primary)' }}>{student.totalSessions}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Buổi học</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--edu-purple)' }}>#{student.classRank}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Xếp hạng</div>
                        </div>
                    </div>

                    {/* 5 Skills Mini Display */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: 'var(--space-md)' }}>
                        {Object.entries(student.metrics).map(([key, metric]) => (
                            <div key={key} className="skill-mini">
                                <div style={{ fontSize: '14px', marginBottom: '2px' }}>{skillIcons[key]}</div>
                                <div style={{ fontSize: '13px', fontWeight: 800, color: getScoreColor(metric.current) }}>{metric.current}%</div>
                                <div className="progress-bar" style={{ height: '3px', marginTop: '3px' }}>
                                    <div className="progress-fill" style={{ width: `${metric.current}%`, background: getScoreColor(metric.current) }} />
                                </div>
                                <div style={{ fontSize: '9px', color: 'var(--text-light)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {metric.learned}/{metric.total}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Absent Stats */}
                    {(student.absentCount.withReason > 0 || student.absentCount.noReason > 0) && (
                        <div style={{
                            padding: 'var(--space-sm) var(--space-md)',
                            background: hasAlarm ? 'var(--edu-red-bg)' : 'var(--bg-light)',
                            borderRadius: 'var(--radius-sm)',
                            marginBottom: 'var(--space-sm)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '13px',
                            fontWeight: 600
                        }}>
                            <span style={{ color: 'var(--edu-blue)' }}>Vắng c/p: <strong>{student.absentCount.withReason}</strong></span>
                            <span style={{ color: hasAlarm ? 'var(--edu-red)' : 'var(--edu-orange)' }}>Vắng k/p: <strong>{student.absentCount.noReason}</strong></span>
                        </div>
                    )}

                    {/* Weak Points */}
                    {student.weakPoints.length > 0 && (
                        <div style={{ marginBottom: 'var(--space-sm)' }}>
                            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--edu-red)', marginBottom: '4px' }}>⚠ Cần cải thiện:</div>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                {student.weakPoints.slice(0, 2).map((point, idx) => (
                                    <span key={idx} style={{
                                        fontSize: '11px',
                                        padding: '3px 8px',
                                        background: 'var(--edu-red-light)',
                                        color: 'var(--edu-red)',
                                        borderRadius: 'var(--radius-sm)',
                                        fontWeight: 600
                                    }}>{point}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Footer */}
                    <div style={{
                        fontSize: '12px',
                        color: 'var(--text-light)',
                        textAlign: 'center',
                        paddingTop: 'var(--space-sm)',
                        borderTop: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span>🕐 {student.lastActive}</span>
                        <span style={{
                            color: student.progressRate >= 0 ? 'var(--edu-green)' : 'var(--edu-red)',
                            fontWeight: 700
                        }}>
                            {student.progressRate >= 0 ? '↑' : '↓'} {Math.abs(student.progressRate)}% (2 tuần)
                        </span>
                    </div>
                </div>
            );
        };

        // Component: StudentDetailModal
        const StudentDetailModal = ({ student, onClose }) => {
            const [absentType, setAbsentType] = useState('with-reason');
            const [absentReason, setAbsentReason] = useState(student.absentReason || '');
            const [coachNote, setCoachNote] = useState('');

            const avgCurrent = Math.round(
                (student.metrics.vocabulary.current +
                 student.metrics.grammar.current +
                 student.metrics.listening.current +
                 student.metrics.pronunciation.current +
                 student.metrics.timeSpent.current) / 5
            );
            const avgAverage = Math.round(
                (student.metrics.vocabulary.average +
                 student.metrics.grammar.average +
                 student.metrics.listening.average +
                 student.metrics.pronunciation.average +
                 student.metrics.timeSpent.average) / 5
            );
            const progressRate = avgCurrent - avgAverage;
            const hasAlarm = student.absentCount.noReason >= 3;
            const attendanceRate = Math.round(((student.totalSessions - student.absentCount.withReason - student.absentCount.noReason) / student.totalSessions) * 100);

            const getHistoryStatusInfo = (status) => {
                switch(status) {
                    case 'present': return { bg: 'var(--edu-green-light)', color: 'var(--edu-green)', label: 'Có mặt' };
                    case 'late': return { bg: 'var(--edu-orange-light)', color: 'var(--edu-orange)', label: 'Đi trễ' };
                    case 'absent-with-reason': return { bg: 'var(--edu-blue-light)', color: 'var(--edu-blue)', label: 'Vắng c/p' };
                    case 'absent-no-reason': return { bg: 'var(--edu-red-light)', color: 'var(--edu-red)', label: 'Vắng k/p' };
                    default: return { bg: 'var(--bg-light)', color: 'var(--text-muted)', label: 'Chưa rõ' };
                }
            };

            return (
                <div className="modal-overlay animate-fade" onClick={onClose}>
                    <div
                        className="animate-scale"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'var(--bg-white)',
                            borderRadius: 'var(--radius-xl)',
                            width: '90%',
                            maxWidth: '800px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: 'var(--shadow-xl)',
                            position: 'relative'
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            style={{
                                position: 'sticky',
                                top: 'var(--space-md)',
                                left: 'calc(100% - 50px)',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                border: 'none',
                                background: 'var(--bg-light)',
                                color: 'var(--text-secondary)',
                                fontSize: '18px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >✕</button>

                        <div style={{ padding: 'var(--space-lg)' }}>
                            {/* HEADER */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-base)',
                                marginBottom: 'var(--space-base)',
                                paddingBottom: 'var(--space-base)',
                                borderBottom: '2px solid var(--border-light)'
                            }}>
                                <img
                                    src={student.avatar}
                                    alt={student.name}
                                    style={{
                                        width: '64px',
                                        height: '64px',
                                        borderRadius: 'var(--radius-lg)',
                                        border: '3px solid var(--accent-primary)'
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                        {student.name}
                                    </h2>
                                    <div style={{ display: 'flex', gap: 'var(--space-base)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', fontWeight: 600, flexWrap: 'wrap' }}>
                                        <span>📚 {student.totalSessions} buổi</span>
                                        <span>🔥 {student.streak} ngày</span>
                                        <span>📊 #{student.classRank}/13</span>
                                        <span>🕐 {student.lastActive}</span>
                                    </div>
                                </div>
                            </div>

                            {/* OVERALL SCORE */}
                            <div style={{
                                textAlign: 'center',
                                padding: 'var(--space-lg)',
                                background: getScoreBg(avgCurrent),
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-base)'
                            }}>
                                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, color: getScoreColor(avgCurrent), marginBottom: '4px' }}>
                                    {avgCurrent}%
                                </div>
                                <div style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                                    Điểm trung bình hiện tại
                                </div>
                                <div style={{ fontSize: '60%', color: 'var(--text-secondary)' }}>
                                    TB lũy kế: {avgAverage}%
                                    <span style={{ color: progressRate >= 0 ? 'var(--edu-green)' : 'var(--edu-red)', marginLeft: '6px', fontWeight: 700 }}>
                                        ({progressRate >= 0 ? '+' : ''}{progressRate})
                                    </span>
                                </div>
                                <div style={{ fontSize: '60%', color: 'var(--text-muted)', marginTop: '4px' }}>
                                    Điểm kiểm tra TB: {student.testScores.avg} • Cao nhất: {student.testScores.highest} • Thấp nhất: {student.testScores.lowest}
                                </div>
                            </div>

                            {/* SKILL DETAILS */}
                            <div style={{
                                background: 'var(--bg-light)',
                                padding: 'var(--space-base)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-base)'
                            }}>
                                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-base)' }}>
                                    📊 Chi tiết kết quả học tập
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                    {Object.entries(student.metrics).map(([key, metric]) => (
                                        <SkillDetailCard key={key} skillKey={key} metric={metric} />
                                    ))}
                                </div>
                            </div>

                            {/* TREND & ANALYSIS */}
                            <div style={{
                                background: 'var(--bg-light)',
                                padding: 'var(--space-base)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-base)'
                            }}>
                                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-base)' }}>
                                    📈 Xu hướng & Phân tích
                                </h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(5, 1fr)',
                                    gap: 'var(--space-sm)',
                                    marginBottom: 'var(--space-base)'
                                }}>
                                    {Object.entries(student.metrics).map(([key, metric]) => {
                                        const trend = metric.trend;
                                        const isUp = trend[trend.length - 1] >= trend[0];
                                        return (
                                            <div key={key} style={{
                                                background: 'var(--bg-white)',
                                                padding: 'var(--space-sm)',
                                                borderRadius: 'var(--radius-md)',
                                                textAlign: 'center'
                                            }}>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                                                    {skillLabels[key]}
                                                </div>
                                                <div style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: getScoreColor(metric.current) }}>
                                                    {metric.current}%
                                                </div>
                                                <div style={{ fontSize: '12px', color: isUp ? 'var(--edu-green)' : 'var(--edu-red)', fontWeight: 700 }}>
                                                    {isUp ? '↗' : '↘'}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{
                                    padding: 'var(--space-md)',
                                    background: 'var(--edu-blue-bg)',
                                    borderRadius: 'var(--radius-md)',
                                    textAlign: 'center',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 600,
                                    color: 'var(--edu-blue)'
                                }}>
                                    💡 Vị trí trong lớp: <strong>#{student.classRank}/13</strong> • 
                                    Tốc độ tiến bộ: <strong style={{ color: student.progressRate >= 0 ? 'var(--edu-green)' : 'var(--edu-red)' }}>
                                        {student.progressRate >= 0 ? '+' : ''}{student.progressRate}%
                                    </strong> trong 2 tuần
                                </div>
                            </div>

                            {/* STRENGTHS & WEAKNESSES */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-base)', marginBottom: 'var(--space-base)' }}>
                                {student.strengths.length > 0 && (
                                    <div style={{ background: 'var(--edu-green-bg)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--edu-green)', marginBottom: 'var(--space-sm)' }}>
                                            ✓ Điểm mạnh
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {student.strengths.map((s, idx) => (
                                                <div key={idx} style={{
                                                    fontSize: 'var(--text-sm)',
                                                    padding: '4px 8px',
                                                    background: 'white',
                                                    color: 'var(--edu-green)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    fontWeight: 600
                                                }}>• {s}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {student.weakPoints.length > 0 && (
                                    <div style={{ background: 'var(--edu-red-bg)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--edu-red)', marginBottom: 'var(--space-sm)' }}>
                                            ⚠ Cần cải thiện
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {student.weakPoints.map((w, idx) => (
                                                <div key={idx} style={{
                                                    fontSize: 'var(--text-sm)',
                                                    padding: '4px 8px',
                                                    background: 'white',
                                                    color: 'var(--edu-red)',
                                                    borderRadius: 'var(--radius-sm)',
                                                    fontWeight: 600
                                                }}>• {w}</div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ATTENDANCE INFO */}
                            <div style={{
                                background: 'var(--bg-light)',
                                padding: 'var(--space-base)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-base)'
                            }}>
                                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-base)' }}>
                                    📋 Thông tin điểm danh
                                </h3>
                                
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)', marginBottom: 'var(--space-base)' }}>
                                    <div style={{ background: 'var(--edu-blue-bg)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--edu-blue)' }}>{student.absentCount.withReason}</div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 700 }}>Vắng có phép</div>
                                    </div>
                                    <div style={{ background: hasAlarm ? 'var(--edu-red-bg)' : 'var(--edu-orange-bg)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: hasAlarm ? 'var(--edu-red)' : 'var(--edu-orange)' }}>{student.absentCount.noReason}</div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 700 }}>Vắng không phép</div>
                                    </div>
                                    <div style={{ background: 'var(--edu-green-bg)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                        <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--edu-green)' }}>{attendanceRate}%</div>
                                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 700 }}>Tỷ lệ tham dự</div>
                                    </div>
                                </div>

                                {hasAlarm && (
                                    <div className="alert-badge" style={{ width: '100%', justifyContent: 'center', padding: 'var(--space-md)', marginBottom: 'var(--space-base)' }}>
                                        🚨 CẢNH BÁO: Học viên đã vắng không phép {student.absentCount.noReason} lần!
                                    </div>
                                )}

                                {/* Attendance History */}
                                <div style={{ background: 'var(--bg-white)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-base)' }}>
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-sm)' }}>
                                        📅 Lịch sử điểm danh (5 buổi gần nhất)
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                        {student.attendanceHistory.map((h, idx) => {
                                            const info = getHistoryStatusInfo(h.status);
                                            return (
                                                <div key={idx} style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: 'var(--space-sm) var(--space-md)',
                                                    background: 'var(--bg-light)',
                                                    borderRadius: 'var(--radius-sm)'
                                                }}>
                                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{h.date}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                                        <span style={{
                                                            fontSize: '12px',
                                                            padding: '3px 8px',
                                                            background: info.bg,
                                                            color: info.color,
                                                            borderRadius: 'var(--radius-sm)',
                                                            fontWeight: 700
                                                        }}>{info.label}</span>
                                                        {h.reason && <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({h.reason})</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Absent Form */}
                                <div style={{ background: 'var(--bg-white)', padding: 'var(--space-base)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-md)' }}>
                                        📝 Nhập thông tin vắng mặt hôm nay
                                    </div>
                                    <div style={{ display: 'flex', gap: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                                            <input type="radio" name="absentType" checked={absentType === 'with-reason'} onChange={() => setAbsentType('with-reason')} style={{ width: '16px', height: '16px' }} />
                                            ✓ Có phép
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                                            <input type="radio" name="absentType" checked={absentType === 'no-reason'} onChange={() => setAbsentType('no-reason')} style={{ width: '16px', height: '16px' }} />
                                            ✗ Không phép
                                        </label>
                                    </div>
                                    <textarea
                                        value={absentReason}
                                        onChange={(e) => setAbsentReason(e.target.value)}
                                        placeholder="Nhập lý do vắng mặt cụ thể..."
                                        style={{
                                            width: '100%',
                                            minHeight: '60px',
                                            padding: 'var(--space-md)',
                                            border: '1px solid var(--border-light)',
                                            borderRadius: 'var(--radius-md)',
                                            fontSize: 'var(--text-sm)',
                                            fontFamily: 'inherit',
                                            resize: 'vertical',
                                            marginBottom: 'var(--space-md)'
                                        }}
                                    />
                                    <button className="btn btn-primary" style={{ width: '100%' }}>
                                        💾 Lưu thông tin
                                    </button>
                                </div>
                            </div>

                            {/* COACH NOTES */}
                            <div style={{
                                background: 'var(--bg-light)',
                                padding: 'var(--space-base)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-base)'
                            }}>
                                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-base)' }}>
                                    📝 Ghi chú của Coach
                                </h3>
                                <textarea
                                    value={coachNote}
                                    onChange={(e) => setCoachNote(e.target.value)}
                                    placeholder="Ghi chú về tình trạng học tập, điểm cần quan tâm, kế hoạch hỗ trợ..."
                                    style={{
                                        width: '100%',
                                        minHeight: '80px',
                                        padding: 'var(--space-md)',
                                        border: '1px solid var(--border-light)',
                                        borderRadius: 'var(--radius-md)',
                                        fontSize: 'var(--text-sm)',
                                        fontFamily: 'inherit',
                                        resize: 'vertical',
                                        background: 'var(--bg-white)'
                                    }}
                                />
                            </div>

                            {/* ACTION BUTTONS */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)' }}>
                                <button className="btn btn-primary">💬 Nhắn tin</button>
                                <button className="btn btn-success">📧 Gửi email</button>
                                <button className="btn btn-secondary" onClick={onClose}>✓ Lưu & Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };

        // Component: ClassCard
        const ClassCard = ({ classData, isActive, onClick }) => {
            const getStatusStyle = (status) => {
                switch(status) {
                    case 'completed': return { bg: 'var(--bg-light)', border: 'var(--border-light)', label: 'Đã dạy', labelBg: 'var(--edu-green)', labelColor: 'white' };
                    case 'active': return { bg: 'var(--edu-blue-bg)', border: 'var(--accent-primary)', label: 'Đang dạy', labelBg: 'var(--accent-primary)', labelColor: 'white' };
                    case 'upcoming': return { bg: 'var(--edu-orange-bg)', border: 'var(--edu-orange)', label: 'Sắp dạy', labelBg: 'var(--edu-orange)', labelColor: 'white' };
                    default: return { bg: 'var(--bg-white)', border: 'var(--border-light)', label: 'Chưa rõ', labelBg: 'var(--text-muted)', labelColor: 'white' };
                }
            };
            const style = getStatusStyle(classData.status);

            return (
                <div
                    onClick={onClick}
                    className="hover-lift"
                    style={{
                        padding: 'var(--space-base)',
                        borderRadius: 'var(--radius-md)',
                        border: `2px solid ${isActive ? style.border : 'var(--border-light)'}`,
                        background: style.bg,
                        cursor: 'pointer',
                        boxShadow: isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                        marginBottom: 'var(--space-md)'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-sm)' }}>
                        <h4 style={{ fontSize: 'var(--text-md)', fontWeight: 800, color: 'var(--text-primary)' }}>{classData.name}</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                            <span className="badge" style={{ background: style.labelBg, color: style.labelColor }}>{style.label}</span>
                            <span className="badge" style={{
                                background: classData.type === 'online' ? 'linear-gradient(135deg, var(--edu-blue), var(--accent-primary))' : 'linear-gradient(135deg, var(--edu-green), var(--edu-teal))',
                                color: 'white'
                            }}>
                                {classData.type === 'online' ? '💻 Online' : '🏫 Offline'}
                            </span>
                        </div>
                    </div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: '4px', fontWeight: 600 }}>{classData.lesson}</div>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)' }}>🕐 {classData.time}</div>
                    
                    {/* Class Info */}
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: 'var(--space-sm)', padding: 'var(--space-sm)', background: 'var(--bg-white)', borderRadius: 'var(--radius-sm)' }}>
                        {classData.type === 'online' ? (
                            <div>📍 {classData.platform} • ID: {classData.meetingId}</div>
                        ) : (
                            <div>📍 {classData.room}</div>
                        )}
                        <div>👩‍🏫 {classData.teacher}</div>
                    </div>

                    {classData.status !== 'upcoming' && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', padding: 'var(--space-sm)', background: 'var(--bg-white)', borderRadius: 'var(--radius-sm)', fontSize: '12px', fontWeight: 700 }}>
                            <div style={{ textAlign: 'center' }}>
                                <span className="status-dot" style={{ background: 'var(--edu-green)', marginRight: '4px' }}></span>
                                <strong>{classData.present}</strong>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <span className="status-dot" style={{ background: 'var(--edu-orange)', marginRight: '4px' }}></span>
                                <strong>{classData.late}</strong>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <span className="status-dot" style={{ background: 'var(--edu-red)', marginRight: '4px' }}></span>
                                <strong>{classData.absent}</strong>
                            </div>
                        </div>
                    )}
                    {classData.status === 'upcoming' && (
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', textAlign: 'center', padding: 'var(--space-sm)', background: 'var(--bg-white)', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                            Sĩ số: {classData.totalStudents} học viên
                        </div>
                    )}
                </div>
            );
        };

        // ==================== START CLASS CONFIRMATION DIALOG ====================
        const StartClassDialog = ({ isOpen, onClose, onConfirm, issues }) => {
            if (!isOpen) return null;

            return (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10000
                }}
                onClick={onClose}
                >
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '32px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
                            ⚠️ Xác nhận bắt đầu lớp học
                        </h2>

                        {issues.length > 0 && (
                            <>
                                <p style={{ marginBottom: '16px', color: '#6B7280' }}>
                                    Hiện tại có một số điều kiện chưa hoàn thành:
                                </p>
                                <ul style={{
                                    marginBottom: '24px',
                                    paddingLeft: '20px',
                                    color: '#DC2626'
                                }}>
                                    {issues.map((issue, idx) => (
                                        <li key={idx} style={{ marginBottom: '8px' }}>
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {issues.length === 0 && (
                            <p style={{ marginBottom: '24px', color: '#059669', fontWeight: 600 }}>
                                ✅ Tất cả điều kiện đã sẵn sàng!
                            </p>
                        )}

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: '2px solid #E5E7EB',
                                    borderRadius: '8px',
                                    background: 'white',
                                    color: '#1F2937',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                {issues.length > 0 ? '📝 Điểm danh bổ sung' : 'Hủy'}
                            </button>
                            <button
                                onClick={onConfirm}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: issues.length > 0
                                        ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                                        : 'linear-gradient(135deg, #10B981, #059669)',
                                    color: 'white',
                                    fontWeight: 700,
                                    cursor: 'pointer'
                                }}
                            >
                                {issues.length > 0 ? '⚡ Bắt đầu ngay' : '✅ Bắt đầu'}
                            </button>
                        </div>
                    </div>
                </div>
            );
        };

        // Main Dashboard Component
        const PreClassDashboard = () => {
            const navigate = useNavigate();
            const [selectedClass, setSelectedClass] = useState(mockCoach.todayClasses.find(c => c.status === 'active'));
            const [filterStatus, setFilterStatus] = useState('all');
            const [selectedStudent, setSelectedStudent] = useState(null);
            const [classNote, setClassNote] = useState('');
            const [activeMenu, setActiveMenu] = useState('preclass');
            const [showStartDialog, setShowStartDialog] = useState(false);
            const [startIssues, setStartIssues] = useState([]);

            // ==================== HANDLERS ====================
            const handleStartClass = () => {
                // Check all conditions
                const issues = [];

                // Check 1: Attendance (at least 70% present)
                const totalPresent = mockStudents.filter(s =>
                    s.attendanceStatus === 'present'
                ).length;
                if (totalPresent < Math.ceil(mockStudents.length * 0.7)) {
                    issues.push(`Chưa điểm danh đủ (${totalPresent}/${mockStudents.length})`);
                }

                // Check 2: Readiness (at least 70% ready)
                const totalReady = mockStudents.filter(s =>
                    s.readinessStatus === 'ready'
                ).length;
                if (totalReady < Math.ceil(mockStudents.length * 0.7)) {
                    issues.push(`${mockStudents.length - totalReady} học viên chưa sẵn sàng`);
                }

                // Show dialog with issues (or empty if all good)
                setStartIssues(issues);
                setShowStartDialog(true);
            };

            const confirmStartClass = () => {
                setShowStartDialog(false);
                navigate('/inclass');
            };

            const attendanceStats = {
                present: mockStudents.filter(s => s.attendanceStatus === 'present').length,
                late: mockStudents.filter(s => s.attendanceStatus === 'late').length,
                absentWithReason: mockStudents.filter(s => s.attendanceStatus === 'absent-with-reason').length,
                absentNoReason: mockStudents.filter(s => s.attendanceStatus === 'absent-no-reason').length,
                total: mockStudents.length
            };

            const readinessStats = {
                ready: mockStudents.filter(s => s.readinessStatus === 'ready').length,
                partial: mockStudents.filter(s => s.readinessStatus === 'partial').length,
                notReady: mockStudents.filter(s => s.readinessStatus === 'not_ready').length
            };

            const filteredStudents = mockStudents.filter(student => {
                if (filterStatus === 'all') return true;
                return student.readinessStatus === filterStatus;
            });

            const canStartClass = readinessStats.ready >= Math.ceil(attendanceStats.total * 0.7);
            const studentsNeedAttention = mockStudents.filter(s => s.absentCount.noReason >= 3).length;

            return (
                <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
                    {/* LEFT SIDEBAR */}
                    <div style={{
                        width: '280px',
                        background: 'var(--bg-white)',
                        borderRight: '1px solid var(--border-light)',
                        overflowY: 'auto',
                        padding: 'var(--space-lg)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-base)'
                    }}>
                        {/* Logo */}
                        <div style={{ marginBottom: 'var(--space-sm)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--edu-teal))',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '24px',
                                fontWeight: 900,
                                marginBottom: 'var(--space-sm)',
                                boxShadow: 'var(--shadow-md)'
                            }}>T</div>
                            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '2px' }}>TikMe Coach</h1>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 600 }}>Dashboard Trước Lớp Học</p>
                        </div>

                        {/* Navigation Menu */}
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: 'var(--space-sm)' }}>Menu chính</div>
                            <button className={`menu-item ${activeMenu === 'preclass' ? 'active' : ''}`} onClick={() => setActiveMenu('preclass')}>
                                🎯 Trước lớp học
                            </button>
                            <button className={`menu-item ${activeMenu === 'students' ? 'active' : ''}`} onClick={() => setActiveMenu('students')}>
                                👥 Quản lý học viên
                            </button>
                            <button className={`menu-item ${activeMenu === 'classes' ? 'active' : ''}`} onClick={() => setActiveMenu('classes')}>
                                📚 Quản lý lớp
                            </button>
                        </div>

                        {/* Coach Info */}
                        <div style={{
                            padding: 'var(--space-base)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border-light)',
                            background: 'var(--bg-light)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
                                <img src={mockCoach.avatar} alt={mockCoach.name} style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', border: '2px solid var(--accent-primary)' }} />
                                <div>
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--text-primary)' }}>{mockCoach.name}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Coach TikMe</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-light)' }}>{mockCoach.email}</div>
                        </div>

                        {/* Performance Stats */}
                        <div style={{ padding: 'var(--space-base)', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-sm)' }}>📊 Hiệu suất hôm nay</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: 'var(--text-xs)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Buổi dạy:</span>
                                    <span style={{ fontWeight: 800, color: 'var(--edu-green)' }}>{mockCoach.completedClasses}/{mockCoach.totalClassesToday}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Cần quan tâm:</span>
                                    <span style={{ fontWeight: 800, color: studentsNeedAttention > 0 ? 'var(--edu-red)' : 'var(--edu-green)' }}>{studentsNeedAttention} HV</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Note */}
                        <div>
                            <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>📝 Ghi chú nhanh</label>
                            <textarea
                                value={classNote}
                                onChange={(e) => setClassNote(e.target.value)}
                                placeholder="Ghi chú cho lớp hiện tại..."
                                style={{
                                    width: '100%',
                                    minHeight: '50px',
                                    padding: 'var(--space-sm)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: 'var(--text-xs)',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />
                        </div>

                        {/* Shortcuts */}
                        <div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: 'var(--space-sm)' }}>Truy cập nhanh</div>
                            <button className="menu-item">📅 Xem lịch tuần</button>
                            <button className="menu-item">📊 Báo cáo tháng</button>
                        </div>

                        {/* Today's Classes */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 'var(--space-sm)' }}>📅 Lịch dạy hôm nay</div>
                            {mockCoach.todayClasses.map(classData => (
                                <ClassCard
                                    key={classData.id}
                                    classData={classData}
                                    isActive={selectedClass?.id === classData.id}
                                    onClick={() => setSelectedClass(classData)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-lg)' }}>
                        {/* Class Header */}
                        <div className="animate-fade" style={{
                            background: 'var(--bg-white)',
                            padding: 'var(--space-lg)',
                            borderRadius: 'var(--radius-xl)',
                            border: '1px solid var(--border-light)',
                            marginBottom: 'var(--space-lg)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-base)' }}>
                                <div>
                                    <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '4px' }}>{selectedClass.name}</h1>
                                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '4px' }}>{selectedClass.lesson}</div>
                                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>🕐 {selectedClass.time}</div>
                                </div>
                                <button className="btn btn-primary" style={{ padding: 'var(--space-base) var(--space-xl)', fontSize: 'var(--text-md)', fontWeight: 900 }} onClick={handleStartClass}>
                                    🚀 Bắt Đầu Lớp Học
                                </button>
                            </div>

                            {/* Attendance Summary */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: 'var(--space-md)',
                                padding: 'var(--space-base)',
                                background: 'var(--bg-light)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-base)'
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--edu-green)' }}>{attendanceStats.present}</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 700 }}>
                                        <span className="status-dot" style={{ background: 'var(--edu-green)', marginRight: '4px' }}></span>Đã vào lớp
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--edu-orange)' }}>{attendanceStats.late}</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 700 }}>
                                        <span className="status-dot" style={{ background: 'var(--edu-orange)', marginRight: '4px' }}></span>Chưa vào lớp
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--edu-blue)' }}>{attendanceStats.absentWithReason}</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 700 }}>
                                        <span className="status-dot" style={{ background: 'var(--edu-blue)', marginRight: '4px' }}></span>Vắng có phép
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 900, color: 'var(--edu-red)' }}>{attendanceStats.absentNoReason}</div>
                                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-primary)', fontWeight: 700 }}>
                                        <span className="status-dot" style={{ background: 'var(--edu-red)', marginRight: '4px' }}></span>Vắng không phép
                                    </div>
                                </div>
                            </div>

                            {/* Readiness Status */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-md)',
                                padding: 'var(--space-md)',
                                background: canStartClass ? 'var(--edu-green-bg)' : 'var(--edu-orange-bg)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <div style={{ fontSize: '24px' }}>{canStartClass ? '✅' : '⚠️'}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 800, color: canStartClass ? 'var(--edu-green)' : 'var(--edu-orange)', marginBottom: '2px' }}>
                                        {canStartClass ?
                                            `✓ Đã đủ điều kiện bắt đầu (${readinessStats.ready}/${attendanceStats.total} học viên sẵn sàng)` :
                                            `⚠ Cần thêm ${Math.ceil(attendanceStats.total * 0.7) - readinessStats.ready} học viên sẵn sàng`
                                        }
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                                        Sẵn sàng: {readinessStats.ready} • Chưa đủ: {readinessStats.partial} • Chưa sẵn sàng: {readinessStats.notReady}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div style={{ display: 'flex', gap: 'var(--space-md)', marginBottom: 'var(--space-base)', flexWrap: 'wrap' }}>
                            {[
                                { value: 'all', label: 'Tất cả', count: mockStudents.length },
                                { value: 'ready', label: 'Sẵn sàng', count: readinessStats.ready },
                                { value: 'partial', label: 'Chưa đủ', count: readinessStats.partial },
                                { value: 'not_ready', label: 'Chưa sẵn sàng', count: readinessStats.notReady }
                            ].map(tab => (
                                <button
                                    key={tab.value}
                                    onClick={() => setFilterStatus(tab.value)}
                                    className={`tab-btn ${filterStatus === tab.value ? 'active' : ''}`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>

                        {/* Students Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-base)' }}>
                            {filteredStudents.map(student => (
                                <StudentCard
                                    key={student.id}
                                    student={student}
                                    onClick={() => setSelectedStudent(student)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Student Detail Modal */}
                    {selectedStudent && (
                        <StudentDetailModal
                            student={selectedStudent}
                            onClose={() => setSelectedStudent(null)}
                        />
                    )}

                    {/* Start Class Confirmation Dialog */}
                    <StartClassDialog
                        isOpen={showStartDialog}
                        onClose={() => setShowStartDialog(false)}
                        onConfirm={confirmStartClass}
                        issues={startIssues}
                    />
                </div>
            );
        };

export default PreClassDashboard;
