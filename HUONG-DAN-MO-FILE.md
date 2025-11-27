# Hướng Dẫn Mở File TikMe HTML

## 🚀 3 Cách Mở File HTML

### ✅ CÁCH 1: Sử dụng Script Tự Động (Khuyến nghị)

#### Trên Linux/Mac:
```bash
./open-tikme.sh
```

#### Trên Windows:
```bash
open-tikme.bat
```
Hoặc **double-click** vào file `open-tikme.bat`

---

### ✅ CÁCH 2: Mở Trực Tiếp Trong Trình Duyệt

1. **Chuột phải** vào file `tikme-v5-ultimate.html`
2. Chọn **"Open with"** (Mở bằng)
3. Chọn trình duyệt:
   - Google Chrome
   - Firefox
   - Microsoft Edge
   - Safari (trên Mac)

Hoặc **kéo thả** file vào cửa sổ trình duyệt.

---

### ✅ CÁCH 3: Sử dụng Local Server (Tốt nhất cho development)

#### Khởi động server:
```bash
python3 -m http.server 8000
```

#### Mở trong trình duyệt:
```
http://localhost:8000/tikme-v5-ultimate.html
```

---

## 🔧 Khắc Phục Sự Cố

### ❌ File không mở được?

**Nguyên nhân có thể:**
1. ❌ Chưa cài trình duyệt web
2. ❌ Trình duyệt không được đặt làm mặc định
3. ❌ File bị chặn bởi hệ thống

**Giải pháp:**
1. ✅ Cài đặt trình duyệt (Chrome, Firefox, Edge)
2. ✅ Sử dụng cách 2 hoặc cách 3 ở trên
3. ✅ Kiểm tra quyền truy cập file

---

### ❌ Trang web không hiển thị đúng?

**Kiểm tra:**
1. ✅ Đảm bảo có kết nối Internet (để tải React, fonts)
2. ✅ Sử dụng trình duyệt hiện đại (Chrome 90+, Firefox 88+, Edge 90+)
3. ✅ Xóa cache trình duyệt (Ctrl+Shift+Delete)
4. ✅ Thử chế độ ẩn danh/Incognito (Ctrl+Shift+N)

---

## 📋 Thông Tin File

- **File chính:** `tikme-v5-ultimate.html`
- **File backup:** `tikme-v5-ultimate.backup.html`
- **Kích thước:** ~456 KB
- **Công nghệ:** React 18, HTML5, CSS3
- **Yêu cầu:** Trình duyệt hiện đại + Internet

---

## 💡 Lưu Ý

- ✅ File hoàn toàn standalone (không cần cài đặt gì thêm)
- ✅ Cần Internet lần đầu để tải React và fonts từ CDN
- ✅ Hoạt động offline sau khi đã cache
- ✅ Tương thích mọi hệ điều hành (Windows, Mac, Linux)

---

## 📞 Hỗ Trợ

Nếu vẫn gặp vấn đề, vui lòng cung cấp:
1. Hệ điều hành đang dùng
2. Trình duyệt đang dùng
3. Thông báo lỗi (nếu có)
4. Cách mở file đã thử
