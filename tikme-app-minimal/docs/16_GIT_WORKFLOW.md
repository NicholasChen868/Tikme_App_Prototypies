# Git Workflow - TikMe Project

**Version:** 1.0  
**Date:** 02/12/2025  
**Owner:** ClaudeK (PM)

---

## 🎯 OVERVIEW

TikMe Project sử dụng **2 Git repositories riêng biệt** cho mục đích khác nhau:

```
R&D Repository        →  Development, experiments, full history
Production Repository →  Clean code for CTO handoff & deployment
```

**Philosophy:** Separation of concerns - Development mess ≠ Production clean

---

## 📂 2 REPOSITORIES

### **1. Tikme_App_Prototypies (R&D)**

```yaml
Name: Tikme_App_Prototypies
Owner: NicholasChen868
URL: https://github.com/NicholasChen868/Tikme_App_Prototypies.git
Visibility: Private
Branch: master
```

**Purpose:**
- ✅ R&D workflow (iterations, experiments)
- ✅ Full development history
- ✅ Documentation (all docs/)
- ✅ Automation scripts
- ✅ Internal use only

**Content:**
```
Tikme_App_Prototypies/
├── iterations/          # All prototype versions
├── approved/            # CEO approved prototypes
├── docs/                # Complete documentation
├── scripts/             # Automation (Python)
├── tikme-app-minimal/   # Current development code
├── handoff_staging/     # Generated handoff packages
└── data/                # Configuration files
```

---

### **2. tikme-app-production (Production)**

```yaml
Name: tikme-app-production
Owner: NicholasChen868
URL: https://github.com/NicholasChen868/tikme-app-production
Visibility: Private
Branch: main
Deployed: https://tikme-app-production.vercel.app/
```

**Purpose:**
- ✅ CTO handoff (clean code only)
- ✅ Production deployment
- ✅ Professional history
- ✅ Vercel auto-deploy

**Content:**
```
tikme-app-production/
├── src/                 # React application
├── public/              # Static assets
├── package.json         # Dependencies
├── vite.config.js       # Build config
├── README.md            # Deployment guide
└── CLAUDE.md            # Context for team DEV
```

---

## 🔄 DAILY WORKFLOW

### **Phase 1: Development (Local)**

**Location:** `D:\TECH_BOX\Tikme_App_Prototypies\tikme-app-minimal\`

```bash
# 1. Start dev server
cd tikme-app-minimal
npm run dev
# → localhost:5174

# 2. Make changes
# → Edit src/pages/*.jsx
# → Edit src/styles/*.css

# 3. Test locally
# → Verify features working
# → Check console for errors

# 4. Build
npm run build
# → Verify 0 errors, 0 warnings
```

---

### **Phase 2: Commit to R&D Repo**

**When:** After completing features, adding docs, or daily checkpoint

```bash
# 1. Check status
cd D:\TECH_BOX\Tikme_App_Prototypies
git status

# 2. Stage changes
git add .

# 3. Commit with message
git commit -m "feat(B3): Add Grammar N5-WA tool"

# 4. Push to R&D repo
git push origin master
```

**Commit Message Format:**
```
feat(module): Brief description
docs: Update documentation
fix(B2): Fix student filter bug
chore: Update dependencies
```

---

### **Phase 3: Deploy to Production**

**When:** 
- ✅ Feature complete và tested
- ✅ Before CTO meetings
- ✅ After Grammar tools integrated
- ✅ Monthly minimum

**Process:**

```bash
# 1. Prepare code
cd tikme-app-minimal
npm run build
# → Verify clean build

# 2. Copy to production repo
# → Manual copy entire tikme-app-minimal/ folder
# → To: tikme-app-production local location

# 3. Commit to production repo
cd ../tikme-app-production
git add .
git commit -m "feat: Add Grammar N5-WA & N4-KotoNiSuru"
git push origin main

# 4. Vercel auto-deploys
# → Wait 2-3 minutes
# → Verify: https://tikme-app-production.vercel.app/
```

---

## 📋 COMMIT CHECKLIST

### **Before Committing to R&D:**
- [ ] Code compiles (no syntax errors)
- [ ] Local server runs (npm run dev works)
- [ ] Features tested manually
- [ ] Documentation updated if needed
- [ ] Commit message descriptive

### **Before Deploying to Production:**
- [ ] All features tested thoroughly
- [ ] Build succeeds (npm run build → 0 errors)
- [ ] QC verification done (PM check)
- [ ] CLAUDE.md updated if needed
- [ ] README.md updated if needed

---

## 🚨 COMMON MISTAKES

### ❌ **Mistake 1: Push to wrong repo**
```bash
# WRONG: Push dev code to production
cd tikme-app-production
git push  # ← Contains experiments!
```

**Fix:** Always develop in R&D, only copy tested code to production

---

### ❌ **Mistake 2: Forget to build**
```bash
# WRONG: Deploy without building
git add .
git commit
git push  # ← Code not optimized!
```

**Fix:** Always `npm run build` before deploying

---

### ❌ **Mistake 3: Commit node_modules**
```bash
# WRONG: Add everything including node_modules
git add *  # ← Huge folder!
```

**Fix:** Use `git add .` (respects .gitignore)

---

## 🔧 TROUBLESHOOTING

### **Issue: Git push rejected**
```
! [rejected] master -> master (fetch first)
```

**Solution:**
```bash
git pull --rebase origin master
git push origin master
```

---

### **Issue: Too many uncommitted files**
```
100+ files modified
```

**Solution:**
```bash
# Review changes first
git status

# If cleanup needed
git checkout -- <file>  # Discard changes
# or
git add .
git commit -m "chore: Cleanup and reorganize"
```

---

### **Issue: Vercel deployment failed**
```
Build error on Vercel
```

**Solution:**
1. Check Vercel dashboard logs
2. Verify local build: `npm run build`
3. Check package.json dependencies
4. Re-push if needed

---

## 📊 REPO STATUS DASHBOARD

### **Check R&D Status:**
```bash
cd D:\TECH_BOX\Tikme_App_Prototypies
git status
git log --oneline -10
```

### **Check Production Status:**
```bash
# Visit: https://github.com/NicholasChen868/tikme-app-production
# Check: Last commit date, build status
# Verify: https://tikme-app-production.vercel.app/
```

---

## 📞 WHEN TO SYNC?

### **R&D → Production Sync Schedule:**

**Daily:** Không cần (except urgent fixes)

**Weekly:** Nếu có features mới complete

**Before Events:**
- ✅ CTO meetings
- ✅ Team DEV handoff
- ✅ Demo to clients

**After Milestones:**
- ✅ Grammar tools integrated
- ✅ New modules complete
- ✅ Major bug fixes

**Minimum:** 1x per month

---

## 🎯 BEST PRACTICES

### **1. Commit Often (R&D)**
```
Better: 10 small commits per day
Worse:  1 huge commit per week
```

### **2. Deploy Selectively (Production)**
```
Better: Deploy tested features only
Worse:  Deploy every experiment
```

### **3. Clear Messages**
```
Good: "feat(B3): Add Grammar N5-WA with 8 learning steps"
Bad:  "update files"
```

### **4. Document Changes**
```
Always update:
- SESSION_LOG (what was done)
- CHANGELOG (for CTO)
- README (if deployment changes)
```

---

## 📝 QUICK REFERENCE

### **Common Commands:**

```bash
# R&D Repo
cd D:\TECH_BOX\Tikme_App_Prototypies
git status                    # Check changes
git add .                     # Stage all
git commit -m "message"       # Commit
git push origin master        # Push

# Development
cd tikme-app-minimal
npm run dev                   # Start dev (5174)
npm run build                 # Build production
npm run preview               # Preview build

# Check versions
git --version
node --version
npm --version
```

---

## 🔗 USEFUL LINKS

**GitHub:**
- R&D: https://github.com/NicholasChen868/Tikme_App_Prototypies
- Production: https://github.com/NicholasChen868/tikme-app-production

**Vercel:**
- Live App: https://tikme-app-production.vercel.app/
- Dashboard: https://vercel.com/dashboard

**Documentation:**
- PROJECT_CHARTER: docs/01_PROJECT_CHARTER.md
- ARCHITECTURE: docs/02_SYSTEM_ARCHITECTURE.md
- SESSION_LOG: docs/00_SESSION_LOG.md

---

**Last Updated:** 02/12/2025  
**Version:** 1.0  
**Owner:** ClaudeK (PM)
