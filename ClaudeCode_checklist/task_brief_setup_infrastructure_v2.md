# TASK BRIEF v2.0: Setup R&D Infrastructure

**Assigned to:** ClaudeCode  
**Prepared by:** ClaudeK (PM)  
**Date:** 29/11/2025  
**Priority:** CRITICAL  
**Timeline:** ASAP (Phase 1 - Week 1)  
**Version:** 2.0 (Updated after clarification)

---

## MỤC TIÊU

Hoàn thiện folder structure cho **R&D workflow** trong repo `D:\TECH_BOX\Tikme_App_Prototypies` để track iterations từ CPO → Version APPROVED → Merge → Handoff.

---

## BỐI CẢNH QUAN TRỌNG

### HAI GIAI ĐOẠN KHÁC NHAU:

**GIAI ĐOẠN 1: R&D (Repo này - Priority)**
```
CPO Ý tưởng → Prompt ChatLong
  ↓
V1 (Draft) → Review → Iterate
  ↓
V2 (Draft) → Review → Iterate
  ↓
...nhiều lần...
  ↓
Vn → CPO Approve → Status: APPROVED ✅
```

**GIAI ĐOẠN 2: Product (Repo riêng - Sau này)**
```
Chỉ Approved versions → Merge → Handoff CTO
```

### CHECKPOINT QUAN TRỌNG:
- **Status="Approved"** là điều kiện BẮT BUỘC để merge
- CHỈ prototypes Approved mới vào handoff package
- CTO KHÔNG thấy quá trình iterations

---

## DELIVERABLES - SẢN PHẨM GIAO NỘP

### 1. Folder Structure Bổ sung

Tạo thêm các folders thiếu trong structure hiện tại:

```
D:\TECH_BOX\Tikme_App_Prototypies\
│
├── iterations/                  # ← CẦN TẠO MỚI
│   ├── B2_PreClass/
│   │   ├── V1_PreClassDash.html
│   │   ├── V14_PreClassDash.html
│   │   └── iteration_notes.md
│   ├── B3_InClass/
│   │   ├── V1_InClassTeach.html
│   │   ├── V5_InClassTeach.html
│   │   └── iteration_notes.md
│   └── .gitkeep
│
├── approved/                    # ← CẦN TẠO MỚI
│   ├── PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
│   ├── PROTO_SM6.1_B3_InClass_V5_APPROVED.html
│   ├── approval_log.md
│   └── .gitkeep
│
├── merge_workspace/             # ← CẦN TẠO MỚI
│   ├── components/
│   │   ├── shared/
│   │   ├── preclass/
│   │   └── inclass/
│   ├── app_shell/
│   │   ├── src/
│   │   ├── package.json
│   │   └── README.md
│   └── builds/
│       ├── dev/
│       └── production/
│
├── handoff_staging/             # ← CẦN TẠO MỚI
│   ├── source_code/
│   ├── specs/
│   ├── demos/
│   └── README_HANDOFF.md
│
├── data/                        # ← ĐÃ CÓ, cần tạo files
│   ├── modules.json
│   ├── approved_versions.json
│   ├── component_map.json
│   └── navigation_map.json
│
└── (Folders khác đã có sẵn)
```

### 2. Essential Files

**Tạo các JSON config files:**

`data/modules.json`:
```json
{
  "modules": [
    {
      "code": "B2",
      "name": "Pre-Class Dashboard",
      "current_version": 14,
      "approved_version": 14,
      "status": "Approved"
    },
    {
      "code": "B3",
      "name": "In-Class Teaching",
      "current_version": 5,
      "approved_version": 5,
      "status": "Approved"
    }
  ]
}
```

`data/approved_versions.json`:
```json
{
  "approved": [
    {
      "module": "B2",
      "version": 14,
      "filename": "PROTO_SM6.1_B2_PreClass_V14_APPROVED.html",
      "approved_date": "2025-11-29",
      "approved_by": "Lê Long Sơn"
    },
    {
      "module": "B3",
      "version": 5,
      "filename": "PROTO_SM6.1_B3_InClass_V5_APPROVED.html",
      "approved_date": "2025-11-28",
      "approved_by": "Lê Long Sơn"
    }
  ]
}
```

`approved/approval_log.md`:
```markdown
# Approval Log

## B2 - Pre-Class Dashboard

**Version 14 - APPROVED**
- Date: 2025-11-29
- Approved by: Lê Long Sơn (CPO)
- File: PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
- Iterations: V1 → V14 (14 versions)
- Notes: Final version with readiness tracking

## B3 - In-Class Teaching

**Version 5 - APPROVED**
- Date: 2025-11-28
- Approved by: Lê Long Sơn (CPO)
- File: PROTO_SM6.1_B3_InClass_V5_APPROVED.html
- Iterations: V1 → V5 (5 versions)
- Notes: ChopChep 90min method complete
```

`merge_workspace/app_shell/package.json`:
```json
{
  "name": "tikme-merged-app",
  "version": "1.0.0",
  "description": "Merged TikMe App from Approved Prototypes",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.22.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.1.0"
  }
}
```

### 3. Di Chuyển Files Hiện Có

**Files cần move:**
- `tikme-pre-class-ultimate-v14.html` → `iterations/B2_PreClass/V14_PreClassDash.html`
- `tikme-v5-ultimate.html` → `iterations/B3_InClass/V5_InClassTeach.html`

**Đồng thời copy sang approved:**
- Copy V14 → `approved/PROTO_SM6.1_B2_PreClass_V14_APPROVED.html`
- Copy V5 → `approved/PROTO_SM6.1_B3_InClass_V5_APPROVED.html`

---

## CHI TIẾT THỰC HIỆN

### BƯỚC 1: Tạo Folder Structure

```bash
# Iterations
mkdir -p iterations/B2_PreClass
mkdir -p iterations/B3_InClass

# Approved
mkdir approved

# Merge workspace
mkdir -p merge_workspace/components/shared
mkdir -p merge_workspace/components/preclass
mkdir -p merge_workspace/components/inclass
mkdir -p merge_workspace/app_shell/src
mkdir -p merge_workspace/builds/dev
mkdir -p merge_workspace/builds/production

# Handoff staging
mkdir -p handoff_staging/source_code
mkdir -p handoff_staging/specs
mkdir -p handoff_staging/demos
```

### BƯỚC 2: Tạo Config Files

Tạo các files JSON và MD như đã mô tả ở trên.

### BƯỚC 3: Di Chuyển Files

```bash
# Move to iterations (giữ nguyên tên để dễ track)
mv tikme-pre-class-ultimate-v14.html iterations/B2_PreClass/V14_PreClassDash.html
mv tikme-v5-ultimate.html iterations/B3_InClass/V5_InClassTeach.html

# Copy to approved với naming chuẩn
cp iterations/B2_PreClass/V14_PreClassDash.html approved/PROTO_SM6.1_B2_PreClass_V14_APPROVED.html
cp iterations/B3_InClass/V5_InClassTeach.html approved/PROTO_SM6.1_B3_InClass_V5_APPROVED.html
```

### BƯỚC 4: Git Commit

```bash
git add iterations/ approved/ merge_workspace/ handoff_staging/ data/
git commit -m "feat: Setup R&D infrastructure with iterations and approved folders

- Add iterations/ for version tracking (B2 V14, B3 V5)
- Add approved/ for Approved prototypes only
- Add merge_workspace/ for merging Approved versions
- Add handoff_staging/ for CTO handoff preparation
- Create config files: modules.json, approved_versions.json
- Move existing prototypes to proper locations"

git push origin main
```

---

## ACCEPTANCE CRITERIA - TIÊU CHÍ CHẤP NHẬN

### Must Have (Bắt buộc)

✅ **Folder structure complete**
- `iterations/B2_PreClass/` có V14_PreClassDash.html
- `iterations/B3_InClass/` có V5_InClassTeach.html
- `approved/` có 2 files APPROVED
- `merge_workspace/` structure đầy đủ
- `handoff_staging/` structure đầy đủ

✅ **Config files created**
- `data/modules.json` valid JSON
- `data/approved_versions.json` valid JSON
- `approved/approval_log.md` có entries

✅ **Files moved correctly**
- Root folder KHÔNG còn tikme-*.html
- Files trong `iterations/` có đúng tên
- Files trong `approved/` có suffix _APPROVED

✅ **Git committed**
- Commit message rõ ràng
- All new folders tracked
- Push successful

### Should Have (Nên có)

⭐ **Documentation**
- `iterations/B2_PreClass/iteration_notes.md` template
- `iterations/B3_InClass/iteration_notes.md` template
- `handoff_staging/README_HANDOFF.md` template

⭐ **.gitkeep files**
- Empty folders có .gitkeep để track trong Git

### Nice to Have (Tốt nếu có)

🎯 **Additional structure**
- `merge_workspace/app_shell/vite.config.js`
- `merge_workspace/app_shell/README.md`

---

## VERIFICATION CHECKLIST

Sau khi hoàn thành, check từng item:

- [ ] `iterations/B2_PreClass/V14_PreClassDash.html` exists
- [ ] `iterations/B3_InClass/V5_InClassTeach.html` exists
- [ ] `approved/PROTO_SM6.1_B2_PreClass_V14_APPROVED.html` exists
- [ ] `approved/PROTO_SM6.1_B3_InClass_V5_APPROVED.html` exists
- [ ] `approved/approval_log.md` has 2 entries
- [ ] `data/modules.json` is valid JSON
- [ ] `data/approved_versions.json` has 2 approved records
- [ ] `merge_workspace/components/` folders created
- [ ] `merge_workspace/app_shell/package.json` exists
- [ ] `handoff_staging/` folders created
- [ ] Root folder clean (no tikme-*.html)
- [ ] Git committed successfully
- [ ] All folders tracked in Git
- [ ] No errors in git status

---

## OUTPUT FORMAT - BÁO CÁO

Khi hoàn thành, report theo format:

```markdown
## R&D INFRASTRUCTURE SETUP - COMPLETION REPORT

**Execution Date:** [date]  
**Executed By:** ClaudeCode  

### Tasks Completed

✅ Created folder structure (iterations, approved, merge_workspace, handoff_staging)  
✅ Created config files (modules.json, approved_versions.json, approval_log.md)  
✅ Moved 2 prototypes to iterations/  
✅ Copied 2 APPROVED files to approved/  
✅ Git committed and pushed  

### Folder Structure Verification

[Paste output of list_directory(depth=3)]

### Files Moved

Source → Destination:
1. tikme-pre-class-ultimate-v14.html → iterations/B2_PreClass/V14_PreClassDash.html
2. tikme-v5-ultimate.html → iterations/B3_InClass/V5_InClassTeach.html

### Files Copied to Approved

1. PROTO_SM6.1_B2_PreClass_V14_APPROVED.html (107 KB)
2. PROTO_SM6.1_B3_InClass_V5_APPROVED.html (475 KB)

### Git Status

[Paste git log -1]
[Paste git status]

### Issues Encountered

[None / List issues]

### Next Steps

✅ Infrastructure ready for iteration tracking  
✅ PM can now add new versions to iterations/  
✅ Scripts can filter by Status="Approved"  
→ Ready for Phase 2: Automation Scripts  
```

---

## NOTES - GHI CHÚ

### ⚠️ CRITICAL WARNINGS

1. **ĐỪNG delete files gốc** - Move, không delete
2. **CHECK paths carefully** - iterations/ vs approved/
3. **APPROVED suffix** - Files trong approved/ phải có _APPROVED
4. **Git commit** - Commit sau mỗi major step

### 💡 BEST PRACTICES

1. **Verify trước khi move** - Check file size, content
2. **Test JSON validity** - Parse JSON files trước khi commit
3. **Backup important files** - Copy sang backups/ trước khi move
4. **Commit messages rõ ràng** - Explain what and why

### 🔍 CURRENT STATE CHECK

Before starting, verify:
- [ ] Root folder: `D:\TECH_BOX\Tikme_App_Prototypies`
- [ ] Files exist: `tikme-pre-class-ultimate-v14.html`, `tikme-v5-ultimate.html`
- [ ] Git initialized: `.git/` folder present
- [ ] Scripts folder: `scripts/` with Notion scripts
- [ ] Docs folder: 9 MD files present

---

## QUESTIONS FOR PM (if any)

Nếu gặp vấn đề, hỏi PM:

1. File không tìm thấy ở expected location?
2. Git conflicts khi push?
3. JSON structure không rõ?

---

**Prepared By:** ClaudeK (PM)  
**Date:** 29/11/2025  
**Độ tin cậy:** 98%  
(2% uncertainty: File locations might vary slightly)

---

**Trợ lý thực tập**  
29 Tháng 11 Năm 2025