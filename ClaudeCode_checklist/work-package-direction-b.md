# WORK PACKAGE: Hướng B - Giữ Nguyên Prototype + Thêm Router

**Mã số:** WP-2025-1130-B
**Ngày tạo:** 30/11/2025
**Owner:** ClaudeK (PM)
**Executor:** ClaudeCode (Dev)
**Ưu tiên:** Cao
**Thời lượng ước tính:** 2-3 giờ

---

## 1. MỤC TIÊU

**Nguyên tắc cốt lõi:** 
> Giữ nguyên 100% code của Sếp, chỉ thêm khả năng điều hướng giữa các trang.

**Kết quả mong đợi:**
- Ứng dụng React chạy được với 2 trang: PreClass Dashboard + InClass Teaching
- Giao diện KHÔNG thay đổi bất kỳ điều gì so với prototype gốc
- Có thể click điều hướng qua lại giữa các trang

---

## 2. INPUT FILES (Prototype gốc của Sếp)

| File | Đường dẫn | Kích thước |
|------|-----------|------------|
| B2 PreClass | `approved/PROTO_SM6.1_WF4_B2_PreClassDashboard_V14_APPROVED.html` | 1,841 dòng |
| B3 InClass | `approved/PROTO_SM6.1_WF4_B3_InClassTeaching_V5_APPROVED.html` | 7,274 dòng |

---

## 3. CẤU TRÚC OUTPUT

```
tikme-app-minimal/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # Entry point + Router setup
│   ├── App.jsx               # Router wrapper
│   ├── pages/
│   │   ├── PreClassDashboard.jsx   # Copy nguyên từ B2
│   │   ├── PreClassDashboard.css   # Extract CSS từ B2
│   │   ├── InClassTeaching.jsx     # Copy nguyên từ B3
│   │   └── InClassTeaching.css     # Extract CSS từ B3
│   └── components/
│       └── NavigationBar.jsx       # Thanh điều hướng đơn giản (MỚI)
```

---

## 4. HƯỚNG DẪN THỰC HIỆN CHI TIẾT

### Bước 1: Tạo React App Shell (15 phút)

```bash
cd D:\TECH_BOX\Tikme_App_Prototypies
mkdir tikme-app-minimal
cd tikme-app-minimal
npm create vite@latest . -- --template react
npm install react-router-dom
```

### Bước 2: Extract CSS từ file gốc (20 phút)

**Từ file B2 (dòng 12-150 ước tính):**
- Tìm block `<style>...</style>`
- Copy nguyên vào file `PreClassDashboard.css`
- KHÔNG sửa bất kỳ dòng nào

**Từ file B3 (dòng 13-400 ước tính):**
- Tìm block `<style>...</style>`
- Copy nguyên vào file `InClassTeaching.css`
- KHÔNG sửa bất kỳ dòng nào

### Bước 3: Extract JSX Component từ file gốc (30 phút)

**Quy tắc QUAN TRỌNG:**

1. Tìm block `<script type="text/babel">...</script>`
2. Copy NGUYÊN toàn bộ code bên trong
3. CHỈ thay đổi những điểm SAU:

**Thay đổi cho phép:**

| Vị trí | Từ | Thành |
|--------|-----|-------|
| Đầu file | (không có) | `import './PreClassDashboard.css'` |
| Đầu file | (không có) | `import { useNavigate } from 'react-router-dom'` |
| Cuối file | `ReactDOM.createRoot(...).render(...)` | `export default PreClassDashboard` |

4. Thêm hook navigate trong component:
```jsx
const navigate = useNavigate();
```

### Bước 4: Thêm điểm điều hướng (30 phút)

**Tìm các nút cần thêm điều hướng:**

Trong B2 PreClass Dashboard:
- Tìm nút "Vào lớp" hoặc "Bắt đầu giảng dạy"
- Thêm: `onClick={() => navigate('/inclass')}`

Trong B3 InClass Teaching:
- Tìm nút "Quay lại" hoặc logo TikMe
- Thêm: `onClick={() => navigate('/preclass')}`

**LƯU Ý:** Chỉ thêm onClick, KHÔNG thay đổi style hay text của nút.

### Bước 5: Tạo Navigation Bar đơn giản (15 phút)

```jsx
// src/components/NavigationBar.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '48px',
      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      zIndex: 9999,
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>
        TikMe
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px' }}>
        <button 
          onClick={() => navigate('/preclass')}
          style={{
            background: location.pathname === '/preclass' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Pre-Class
        </button>
        <button 
          onClick={() => navigate('/inclass')}
          style={{
            background: location.pathname === '/inclass' ? 'rgba(255,255,255,0.2)' : 'transparent',
            border: 'none',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          In-Class
        </button>
      </div>
    </nav>
  );
}
```

### Bước 6: Setup Router (15 phút)

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import PreClassDashboard from './pages/PreClassDashboard';
import InClassTeaching from './pages/InClassTeaching';

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <div style={{ paddingTop: '48px' }}> {/* Offset cho navbar */}
        <Routes>
          <Route path="/" element={<Navigate to="/preclass" replace />} />
          <Route path="/preclass" element={<PreClassDashboard />} />
          <Route path="/inclass" element={<InClassTeaching />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

### Bước 7: Test local (15 phút)

```bash
npm run dev
```

**Checklist kiểm tra:**
- [ ] Trang PreClass hiển thị đúng 100% như file gốc
- [ ] Trang InClass hiển thị đúng 100% như file gốc
- [ ] Click điều hướng hoạt động
- [ ] Không có lỗi console

---

## 5. NHỮNG ĐIỀU KHÔNG ĐƯỢC LÀM

❌ Refactor code của Sếp
❌ Tách components con
❌ Đổi tên biến
❌ Thay đổi logic
❌ Sửa CSS/styling
❌ Thêm tính năng mới
❌ Tối ưu performance

---

## 6. QUALITY GATES

| Checkpoint | Tiêu chí | Người kiểm tra |
|------------|----------|----------------|
| Sau Bước 3 | So sánh dòng code với file gốc (diff) | PM |
| Sau Bước 6 | Chạy app, so sánh visual với file HTML gốc | PM |
| Sau Bước 7 | Điều hướng hoạt động, không lỗi | PM |

---

## 7. DELIVERABLES

1. Thư mục `tikme-app-minimal/` với cấu trúc như mục 3
2. Screenshot so sánh: File gốc vs App mới
3. Báo cáo hoàn thành với checklist

---

## 8. GHI CHÚ

- Hướng tiếp cận này ưu tiên **tốc độ** và **đảm bảo đúng ý Sếp**
- Không cần lo về code quality hay best practices
- Mục tiêu duy nhất: **Hoạt động được + Giống hệt**

---

**Người tạo:** ClaudeK (PM)
**Ngày:** 30/11/2025
**Trạng thái:** Chờ phê duyệt từ Anh Kha
