# TikMe Prototype Management - Project Charter

## Tổng Quan Dự Án

**Tên dự án:** TikMe Prototype Management System  
**Phiên bản:** 2.0  
**Ngày bắt đầu:** 29/11/2025  
**Ngày cập nhật:** 29/11/2025  
**Trạng thái:** Active  
**Location:** `D:\TECH_BOX\Tikme_App_Prototypies`

---

## Vision - Tầm Nhìn

Xây dựng hệ thống quản lý nghiệp vụ R&D hoàn chỉnh để:
1. **Track iterations** từ ý tưởng CPO → nhiều versions → version chốt APPROVED
2. **Organize prototypes** theo module và version
3. **Merge prototypes APPROVED** thành app hoàn chỉnh
4. **Handoff package** chỉ chứa version chốt cuối cho CTO & team DEV

---

## Phân Biệt Hai Giai Đoạn

### GIAI ĐOẠN 1: R&D (Quản lý nghiệp vụ - Repo này)

**Workflow:**
```
CPO Ý tưởng
  ↓
Prompt ChatLong (Claude Mobile)
  ↓
Generated V1 → Review → Retry
  ↓
Generated V2 → Review → Retry
  ↓
...Iterate nhiều lần...
  ↓
Generated Vn → CPO Approve ✅
  ↓
Status: APPROVED (chốt module)
```

**Nội dung repo:**
- Tất cả versions (V1, V2, V3...Vn)
- Conversation logs
- Iteration notes
- Version comparison
- CPO feedback

**Repo location:** `D:\TECH_BOX\Tikme_App_Prototypies` (Local, không OneDrive)

### GIAI ĐOẠN 2: Product Development (Handoff - Repo riêng)

**Workflow:**
```
Prototypes APPROVED only
  ↓
Merge thành app hoàn chỉnh
  ↓
Technical documentation
  ↓
Handoff package → CTO
  ↓
Team DEV triển khai (15 devs Ấn Độ)
```

**Nội dung handoff:**
- CHỈ file APPROVED cuối cùng
- KHÔNG có quá trình iterations
- Technical specs
- Deployment guides

**Repo location:** Riêng biệt (không lẫn với R&D repo)

---

## Stakeholders - Các Bên Liên Quan

### Nội Bộ

**Product Owner:** Lê Long Sơn (CPO)
- Vai trò: Tạo ý tưởng, prompt specs, approve iterations
- Tool: Claude Mobile (ChatLong)
- Workflow: R&D iterations (V1→V2→...→Approved)

**Project Manager:** Hoàng Kha (CEO Assistant)
- Vai trò: Quản lý R&D workflow, track versions, QC, prepare handoff
- Tool: Claude Chat/Project, Notion, Git
- Workflow: Cả R&D và Handoff

**Technical Lead:** Sandeep Kumar (CTO)
- Vai trò: Nhận handoff packages, lead implementation
- Team: 15 developers (India)
- Workflow: Chỉ nhận APPROVED versions

### Tools & Systems

**R&D Phase:**
- Claude Mobile (CPO tạo prototypes)
- Local folder (track iterations)
- Notion (track status, versions)
- Git (version control R&D)

**Handoff Phase:**
- Merge scripts (combine APPROVED prototypes)
- Documentation generator
- Git (separate handoff repo)
- Email/Telegram (CTO notification)

---

## Success Criteria - Tiêu Chí Thành Công

### Phải Đạt Được (Must Have)

1. ✅ **Version tracking:** Tất cả iterations được track (V1, V2...Vn)
2. ✅ **Status APPROVED:** Notion có option "Approved" để đánh dấu version chốt
3. ✅ **Separation clear:** R&D repo ≠ Handoff repo
4. ✅ **Merge APPROVED only:** Chỉ merge prototypes có Status="Approved"
5. ✅ **Clean handoff:** CTO chỉ nhận file chốt, không thấy quá trình iterations

### Nên Có (Should Have)

6. ⭐ **Iteration comparison:** So sánh V1 vs V2 vs V3...
7. ⭐ **CPO notes:** Log feedback tại mỗi iteration
8. ⭐ **Auto-notification:** Notify khi CPO approve version
9. ⭐ **Version timeline:** Visualize timeline iterations

### Tốt Nếu Có (Nice to Have)

10. 🎯 **AI-powered diff:** Highlight changes giữa versions
11. 🎯 **Automated merge preview:** Preview app sau merge
12. 🎯 **Regression testing:** Test tự động khi merge

---

## Scope - Phạm Vi

### In Scope - Trong Phạm Vi

**Phase 1: R&D Infrastructure (Week 1)**
- Folder structure cho iterations tracking
- Notion schema với Status "Approved"
- Git setup cho R&D repo
- Version organization system

**Phase 2: Iteration Management (Week 2)**
- Scripts track versions (V1, V2, V3...)
- Notion sync automation
- CPO approval workflow
- Version comparison tools

**Phase 3: Merge System (Week 3)**
- Filter prototypes Status="Approved"
- Merge APPROVED prototypes
- React Router setup
- State management (Context API)

**Phase 4: Handoff Workflow (Week 4)**
- Extract APPROVED only
- Technical spec generation
- Package builder
- CTO notification system

### Out of Scope - Ngoài Phạm Vi

❌ Actual React development (do CTO team)  
❌ Backend API development  
❌ Production deployment infrastructure  
❌ CPO's prompt engineering process  
❌ Team DEV training materials  
❌ Mobile app development  

---

## Timeline - Lịch Trình

**Tổng thời gian:** 4 weeks

| Week | Phase | Deliverables | Status |
|------|-------|--------------|--------|
| W1 | R&D Infrastructure | Folder structure, Notion "Approved" status, Git | 🟡 In Progress |
| W2 | Iteration Management | Version tracking, Comparison tools | ⚪ Not Started |
| W3 | Merge System | APPROVED filter, App shell, Navigation | ⚪ Not Started |
| W4 | Handoff | Clean package, Tech specs, Documentation | ⚪ Not Started |

---

## Resources - Nguồn Lực

### Human Resources

- **PM/QC:** Hoàng Kha (full-time)
- **Automation:** ClaudeCode (as needed)
- **CPO:** Lê Long Sơn (R&D iterations & approval)
- **Stakeholder:** Sandeep Kumar (handoff review)

### Technical Resources

- Claude Chat/Project (PM workspace)
- Desktop Commander (ClaudeCode)
- Notion workspace (với Status "Approved")
- Github repository (R&D local)
- Python 3.x environment
- Node.js + npm (cho merge builds)

### Budget

- **Time:** 4 weeks × 40 hours = 160 hours
- **Tools:** Existing (no additional cost)
- **Infrastructure:** Local development (no hosting cost)

---

## Risks & Mitigation - Rủi Ro

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| CPO approval bottleneck | Medium | High | Clear approval criteria, async review |
| Version tracking errors | Low | High | Automated scripts, Notion validation |
| Merge conflicts (APPROVED versions) | Medium | Medium | Manual mapping, component registry |
| Missing iterations history | Low | High | Git commit every version, backup |
| CTO team confused by iterations | Low | High | Separate repos, clean handoff |

---

## Assumptions - Giả Định

1. **CPO Workflow Stable:**
   - Sếp Sơn tiếp tục dùng Claude Mobile
   - Iterate nhiều lần trước khi approve
   - Prototypes vẫn share qua Signal/manual save

2. **Technical Assumptions:**
   - Local folder `D:\TECH_BOX\Tikme_App_Prototypies` stable
   - Notion API ổn định
   - Desktop Commander có đủ quyền file system
   - Python scripts có thể chạy locally

3. **Process Assumptions:**
   - Có sự phân biệt rõ R&D vs Product
   - Status "Approved" được enforce nghiêm
   - KHÔNG commit iterations vào handoff repo
   - CTO team chấp nhận handoff format

---

## Constraints - Ràng Buộc

### Technical Constraints

- Desktop Commander chỉ access local files
- Notion API có rate limits
- Git repo size limitations
- KHÔNG được dùng OneDrive (conflict risk)

### Process Constraints

- Không được delay prototypes từ CPO
- Không được skip iterations tracking
- Không được merge prototypes chưa APPROVED
- Handoff format phải được CTO approve

### Resource Constraints

- PM (Kha) là single point of contact
- No dedicated QA team
- No staging environment
- Limited testing resources

---

## Communication Plan - Kế Hoạch Giao Tiếp

### Daily

- **Tool:** Claude Chat (PM ↔ Dev)
- **Format:** Task briefs, progress updates
- **Frequency:** As needed

### Weekly

- **Tool:** Notion dashboard
- **Audience:** Anh Kha → Sếp Sơn
- **Content:** Progress summary, blockers, next steps

### Ad-hoc

- **Tool:** Signal/Manual
- **Trigger:** New prototype version from CPO
- **Action:** Immediate intake workflow

### Handoff

- **Tool:** Email + Git
- **Audience:** Anh Kha → CTO Sandeep
- **Content:** Package ready notification (APPROVED only)

---

## Success Metrics - Chỉ Số Đo Lường

### Efficiency Metrics

- **Version Intake Time:** < 15 minutes per version
- **Iteration Tracking:** 100% versions logged
- **Approval Turnaround:** < 24 hours from CPO
- **Merge Build Time:** < 1 hour for APPROVED prototypes
- **Handoff Prep Time:** < 2 hours per package

### Quality Metrics

- **Version Tracking Accuracy:** 100% versions in system
- **Status Compliance:** 100% use "Approved" status
- **Merge Success Rate:** > 95% first-time success
- **Handoff Acceptance:** 100% approved by CTO
- **No Iterations Leak:** 0 iterations in handoff repo

### Process Metrics

- **Manual Errors:** 0 per week
- **Automation Coverage:** > 80% of workflow
- **Documentation Completeness:** 100% workflows documented

---

## Current Status - Hiện Trạng

**Folder:** `D:\TECH_BOX\Tikme_App_Prototypies`

**Đã có:**
- ✅ Git initialized
- ✅ 9 docs (01-09)
- ✅ Notion scripts (create_pages, verify, debug)
- ✅ 2 prototypes: PreClass V14, InClass V5
- ✅ Templates folders structure

**Cần bổ sung:**
- ⚠️ Folder structure cho iterations
- ⚠️ Notion Status "Approved" option
- ⚠️ Version tracking scripts
- ⚠️ Merge APPROVED-only scripts
- ⚠️ Handoff separation workflow

---

## Approval

**Prepared by:** ClaudeK (PM)  
**Date:** 29/11/2025  
**Approved by:** Hoàng Kha (CEO Assistant)  
**Date:** _____________  

---

**Last Updated:** 29/11/2025  
**Version:** 2.0 (Updated with R&D vs Product separation)  
**Next Review:** 06/12/2025
