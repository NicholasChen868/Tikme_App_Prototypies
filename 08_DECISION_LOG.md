\# Decision Log - TikMe PM System



\## Purpose



Document tất cả major decisions để:

\- Track lý do tại sao chọn approach này

\- Reference cho tương lai

\- Onboard new team members

\- Avoid repeating discussions



---



\## Template

```markdown

\# DECISION: \[Title]



\*\*Date:\*\* YYYY-MM-DD  

\*\*Decided by:\*\* \[Names]  

\*\*Context:\*\* \[Why we needed to decide]



\## Options Considered:



1\. \*\*Option A:\*\* \[Description]

&nbsp;  - Pros: \[List]

&nbsp;  - Cons: \[List]



2\. \*\*Option B:\*\* \[Description]

&nbsp;  - Pros: \[List]

&nbsp;  - Cons: \[List]



\## Decision:

We chose \*\*\[Option X]\*\* because \[Reasoning]



\## Impact:

\- Code: \[How it affects codebase]

\- Workflow: \[How it affects daily work]

\- Timeline: \[Time implications]



\## Action Items:

\- \[ ] Update docs

\- \[ ] Modify scripts

\- \[ ] Notify team

```



---



\## Decisions



\### \*\*DECISION 001: Naming Convention Format\*\*



\*\*Date:\*\* 2025-11-29  

\*\*Decided by:\*\* Hoàng Kha, ClaudeK  

\*\*Context:\*\* Cần standardize filenames để automation và tracking dễ dàng



\*\*Options:\*\*

1\. \*\*Simple numbering:\*\* `prototype-001.html`

&nbsp;  - Pros: Đơn giản

&nbsp;  - Cons: Không có metadata trong tên



2\. \*\*PROTO\_SM\[X]\_WF\[X]\_\[BLOCK]\_\[FEATURE]\_V\[XX]\*\*

&nbsp;  - Pros: Full metadata, searchable, automation-friendly

&nbsp;  - Cons: Dài, phức tạp hơn



\*\*Decision:\*\* Option 2



\*\*Reasoning:\*\*

\- Cần track sitemap version, wireframe version, block

\- Automation cần parse metadata từ filename

\- Search và filter dễ dàng hơn

\- Professional appearance



\*\*Impact:\*\*

\- Tất cả files phải rename

\- Scripts cần validation logic

\- Longer filenames nhưng acceptable



---



\### \*\*DECISION 002: Notion API vs. Manual Tracking\*\*



\*\*Date:\*\* 2025-11-29  

\*\*Decided by:\*\* Hoàng Kha  

\*\*Context:\*\* Quyết định automation level cho Notion tracking



\*\*Options:\*\*

1\. \*\*Manual entry vào Notion\*\*

&nbsp;  - Pros: Simple, no API complexity

&nbsp;  - Cons: Error-prone, time-consuming



2\. \*\*Full automation với Notion API\*\*

&nbsp;  - Pros: Accurate, fast, scalable

&nbsp;  - Cons: API complexity, rate limits



\*\*Decision:\*\* Option 2 (with careful error handling)



\*\*Reasoning:\*\*

\- Manual entry có high error rate

\- Time savings significant (30 min → 5 min)

\- API stable enough

\- Can fallback to manual if needed



---



\### \*\*DECISION 003: Merge Strategy\*\*



\*\*Date:\*\* 2025-11-29  

\*\*Decided by:\*\* Hoàng Kha, ClaudeK  

\*\*Context:\*\* 2 prototypes đều là SPAs, không phải separate screens



\*\*Options:\*\*

1\. \*\*Extract và merge components\*\*

&nbsp;  - Try to combine into one SPA



2\. \*\*App Shell với navigation\*\*

&nbsp;  - Keep SPAs separate

&nbsp;  - Add router for navigation



\*\*Decision:\*\* Option 2 (App Shell)



\*\*Reasoning:\*\*

\- Prototypes đã hoàn chỉnh, không cần merge

\- Easier to maintain

\- Clear separation of concerns

\- Can add more modules later



---



\### \*\*DECISION 004: ClaudeK (PM) vs ClaudeCode (Dev) Split\*\*



\*\*Date:\*\* 2025-11-29  

\*\*Decided by:\*\* Hoàng Kha  

\*\*Context:\*\* Optimize collaboration giữa PM và Dev roles



\*\*Decision:\*\* Clear role separation



\*\*PM (ClaudeK):\*\*

\- Planning, specs, QC

\- Manual decisions

\- Review và approve



\*\*Dev (ClaudeCode):\*\*

\- Implementation only

\- Follow specs exactly

\- Report issues



\*\*Reasoning:\*\*

\- Clear responsibilities

\- Better quality control

\- Scalable process

\- PM maintains context across projects



---



\*\*Last Updated:\*\* 29/11/2025  

\*\*Version:\*\* 1.0  

\*\*Owner:\*\* ClaudeK (PM)


---

## Decision 8: R&D vs Product Phase Separation

**Date:** 29/11/2025  
**Context:** Clarify scope và workflow cho 2 phases khác nhau

**Decision:** Phân tách rõ ràng R&D workflow và Product Development

**Phase 1 - R&D (Repo này):**
- Track TẤT CẢ iterations (V1, V2, V3...Vn)
- CPO iterate nhiều lần trước khi approve
- Status: Draft → Review → **Approved** (checkpoint)
- Location: `D:\TECH_BOX\Tikme_App_Prototypies`
- Content: Iterations + feedback + comparison

**Phase 2 - Product (Repo riêng):**
- CHỈ chứa prototypes Status="Approved"
- KHÔNG có quá trình iterations
- Merge Approved prototypes thành app
- Handoff clean package cho CTO
- Location: Separate repository

**Reasoning:**
- Tránh lẫn lộn iterations với final product
- CTO team chỉ cần thấy version chốt
- R&D process trong sạch, có history
- Handoff package professional

---

## Decision 9: Status "Approved" là Checkpoint Quan Trọng

**Date:** 29/11/2025  
**Context:** Cần checkpoint rõ ràng giữa iterations và ready-to-merge

**Decision:** Status="Approved" là ĐIỀU KIỆN BẮT BUỘC để merge

**Rule:**
- Script merge_approved.py CHỈ lấy Status="Approved"
- Không merge Draft hoặc Review versions
- CPO phải explicitly approve (không auto)
- Approved = Ready for production merge

**Impact:**
- Workflow rõ ràng: Iterate → Approve → Merge
- Không có ambiguity về version nào để merge
- Quality gate trước merge
- CPO có control cuối cùng

**Reasoning:**
- Tránh merge nhầm version chưa chốt
- Enforce review process
- Clear handoff criteria
- Professional workflow

---

## Decision 10: Move Out of OneDrive

**Date:** 29/11/2025  
**Context:** OneDrive sync gây conflict versions

**Decision:** Di chuyển từ `D:\OneDrive\CEO_CHI_DAO\` sang `D:\TECH_BOX\Tikme_App_Prototypies`

**Problem với OneDrive:**
- Version conflicts khi sync
- File locks during collaboration
- Unpredictable sync timing
- Hard to track true state

**Solution:**
- Local folder: `D:\TECH_BOX\Tikme_App_Prototypies`
- Git for version control
- Manual backups
- No auto-sync conflicts

**Reasoning:**
- Stability > Convenience
- Git > OneDrive for code
- Full control over versions
- Avoid sync nightmares

---

## Decision 11: Two Separate Repositories

**Date:** 29/11/2025  
**Context:** Quản lý nghiệp vụ vs Bàn giao prototype

**Decision:** Không dùng chung repository

**Repository 1 - R&D:**
- Name: `Tikme_App_Prototypies`
- Location: `D:\TECH_BOX\`
- Content: All iterations, feedback, process
- Audience: CPO, PM (internal)

**Repository 2 - Handoff:**
- Name: TBD (separate repo)
- Location: TBD
- Content: Approved versions only, tech docs
- Audience: CTO, DEV team (external)

**Reasoning:**
- Clean separation of concerns
- Professional handoff
- No clutter in production repo
- Different access controls

---

**Last Updated:** 29/11/2025  
**Version:** 2.0  
**Owner:** ClaudeK (PM)
