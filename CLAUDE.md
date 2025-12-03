# TIKME PROJECT - CONTEXT FOR CLAUDECODE

> **File này là "bộ nhớ" cho ClaudeCode CLI. Đọc kỹ trước khi làm task.**

---

## 🎯 QUICK REFERENCE

| Thông tin | Giá trị |
|-----------|---------|
| **Project** | TikMe Teacher Dashboard |
| **Approach** | Hướng B - Minimal Router (Decision #25) |
| **Philosophy** | Giữ nguyên 100% code Sếp, chỉ thêm navigation |
| **PM** | ClaudeK (Claude Desktop) |
| **Dev** | ClaudeCode (Claude Code CLI) |
| **Lead** | Anh Kha (CEO Assistant) |

---

## 🗣️ NGÔN NGỮ - 100% TIẾNG VIỆT

### **QUY TẮC BẮT BUỘC:**

**1. Output 100% tiếng Việt:**
- Mọi report, document, communication → Tiếng Việt
- Áp dụng: Docs, Git commits, Vercel notes, task briefs, everything

**2. Thuật ngữ: Giữ nguyên + (giải thích):**
```
✅ Component (thành phần giao diện)
✅ Router (bộ điều hướng)
✅ Build (đóng gói mã nguồn)
✅ Deploy (triển khai lên server)
✅ Props (thuộc tính truyền vào)
```

**3. Đối tượng: Low-code (anh Kha) và No-code (Sếp):**
- Giải thích đơn giản, dễ hiểu
- Tránh jargon phức tạp
- Dùng ví dụ thực tế
- Mọi người đều hiểu

**4. Examples:**
```
❌ SAI: "Refactor component using memoization"
✅ ĐÚNG: "Tối ưu component (thành phần) bằng memoization (tối ưu bộ nhớ)"

❌ SAI: "Update NavigationBar component"  
✅ ĐÚNG: "Cập nhật component (thành phần) NavigationBar"
```

**Philosophy:**
> "Sếp không hiểu → Viết sai. Anh phải tra → Chưa tốt. Mục tiêu: Đọc là hiểu."

---

## 📁 FOLDER STRUCTURE

```
D:\TECH_BOX\Tikme_App_Prototypies\
│
├── tikme-app-minimal/        ← ✅ PRODUCTION (localhost:5174)
│   ├── src/
│   │   ├── App.jsx           # Router
│   │   ├── pages/            # B2, B3 components
│   │   └── components/       # Shared
│   └── package.json
│
├── iterations/               ← R&D prototypes từ Sếp
│   ├── B2_PreClassDashboard/
│   ├── B3_InClassTeaching/
│   │   └── 11_Tools/         # Grammar tools mới
│   └── [other modules]/
│
├── approved/                 ← CEO approved (ready to merge)
│
├── scripts/                  ← Python automation
│   └── organize_prototypes.py
│
├── docs/                     ← Documentation
│   ├── 08_DECISION_LOG.md    # 25 decisions quan trọng
│   └── 14_PROJECT_STATUS.md  # Current status
│
└── .claude/                  ← ClaudeCode config
    └── commands/             # Slash commands
```

---

## ⚠️ CRITICAL RULES

### 1. KHÔNG refactor code Sếp
```
❌ KHÔNG: Tách component, đổi structure
✅ CÓ: Giữ nguyên, chỉ thêm Router/Navigation
```

### 2. ĐÚNG repo
```
❌ SAI: tikme-merged-app (localhost:3000) - KHÔNG DÙNG
✅ ĐÚNG: tikme-app-minimal (localhost:5174) - PRODUCTION
```

### 3. Làm theo Task Brief
```
1. Đọc Task Brief từ PM trước
2. Hỏi nếu unclear
3. KHÔNG tự ý thêm features
4. Report với evidence sau khi done
```

### 4. Build verification
```
npm run build
# PHẢI: 0 errors, 0 warnings
# Nếu có lỗi → Fix trước khi báo done
```

---

## 🔧 AVAILABLE COMMANDS

| Command | Mục đích |
|---------|----------|
| `/review` | Review code changes |
| `/test` | Run test suite |
| `/build` | Build và check errors |
| `/doc-component` | Document React component |

---

## 📊 CURRENT STATUS (Updated: 02/12/2025)

### Đã hoàn thành:
- ✅ B2 PreClass Dashboard - MERGED
- ✅ B3 InClass Teaching (13 tools) - MERGED
- ✅ React Router - INTEGRATED
- ✅ Build - SUCCESS

### Đang pending:
- ⏳ Grammar N5 WA tool - Cần integrate vào đúng repo
- ⏳ Grammar N4 KotoNiSuru - Cần integrate

### Repos:
```
tikme-app-minimal (PORT 5174) ← DÙNG CÁI NÀY
tikme-merged-app (PORT 3000)  ← KHÔNG DÙNG, repo cũ
```

---

## 📋 WORKFLOW

```
┌─────────────────────────────────────┐
│ 1. PM (ClaudeK) gửi Task Brief      │
│    - Qua Anh Kha copy/paste         │
│    - Hoặc đọc từ docs/task_briefs/  │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ 2. ClaudeCode đọc & confirm hiểu    │
│    - Hỏi nếu unclear                │
│    - KHÔNG giả định                 │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ 3. Implement theo Hướng B           │
│    - Giữ 100% code Sếp              │
│    - Chỉ thêm cần thiết             │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ 4. Build & Verify                   │
│    - npm run build                  │
│    - 0 errors required              │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│ 5. Report với evidence              │
│    - Files created/modified         │
│    - Build output                   │
│    - Test results                   │
└─────────────────────────────────────┘
```

---

## 🔗 KEY DECISIONS

### Decision #25: Hướng B (Minimal Router)
```
Lý do: Code Sếp đã hoàn chỉnh, không cần refactor
Approach: Giữ nguyên 100% + thêm Router layer
Result: 2.5h thay vì 40-50h, compliance 98/100
```

### Decision #24: PM Source Verification
```
Lý do: ClaudeCode từng báo 100% nhưng thực tế 77%
Rule: PM sẽ verify source code, không tin report mù quáng
Action: Report với evidence cụ thể
```

### Decision #12: Naming Convention
```
Format cũ: PROTO_SM6.1_WF4_B2_PreClassDashboard_V14
Format mới: PROTO_SM6.1_WF4_B3_Grammar-N5-WA_V1
```

---

## 📞 COMMUNICATION

### Khi cần hỏi PM:
```
"[QUESTION] Tôi cần clarify về [vấn đề]. 
Task Brief nói [X] nhưng tôi thấy [Y]. 
Anh confirm giúp?"
```

### Khi report done:
```
"[DONE] Task [ID] completed.

Files modified:
- path/to/file1.jsx
- path/to/file2.css

Build status: ✅ 0 errors, 0 warnings

Evidence:
[paste build output hoặc screenshot]
"
```

### Khi gặp blocker:
```
"[BLOCKED] Task [ID] bị block.

Issue: [mô tả vấn đề]
Tried: [đã thử gì]
Need: [cần gì để tiếp tục]
"
```

---

## 🚨 COMMON MISTAKES TO AVOID

1. **Dùng sai repo** → Luôn check đang ở tikme-app-minimal
2. **Refactor code Sếp** → KHÔNG, giữ nguyên
3. **Báo done không evidence** → LUÔN kèm build output
4. **Tự ý thêm features** → CHỈ làm trong Task Brief
5. **Không đọc CLAUDE.md** → ĐỌC mỗi session mới

---

**Last Updated:** 02/12/2025  
**Maintained By:** ClaudeK (PM)
