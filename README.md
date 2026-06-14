# 🏨 LuxeHaven Resort - Hệ Thống Quản Lý Đặt Phòng Cao Cấp

Ứng dụng web quản lý vận hành và điều phối đặt phòng chuyên nghiệp dành cho resort/khách sạn LuxeHaven, hỗ trợ chạy mượt mà trên môi trường mạng internet thông qua Ngrok.

---

## 🔐 Danh Sách Tài Khoản Vận Hành Hệ Thống (Dữ Liệu SQL Server)

Dưới đây là danh sách toàn bộ tài khoản nhân sự được đồng bộ trực tiếp từ cơ sở dữ liệu dùng để đăng nhập và kiểm thử phân quyền hệ thống:

| ID | Họ và Tên | Tên Đăng Nhập (`username`) | Mật Khẩu (`password`) | Chức Vụ (`role`) | Bộ Phận (`department_id`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | Lê Mai Minh Trọng | `admin_trong` | `hash_pass_123` hoặc `LuxeHaven@2026` | `admin` (Quản trị viên) | `NULL` |
| **2** | Jane Doe | `jane_reception` | `hash_pass_456` hoặc `LuxeHaven@2026` | `receptionist` (Lễ tân) | `NULL` |
| **3** | John Smith | `john_cleaner` | `hash_pass_789` hoặc `LuxeHaven@2026` | `receptionist` (Lễ tân) | `NULL` |
| **4** | Nguyen Van Cleaner | `cleaner_test` | `LuxeHaven@2026` | `cleaner` (Buồng phòng) | `NULL` |
| **5** | Trần Thị Kế Toán | `accountant` | `LuxeHaven@2026` | `accountant` (Kế toán) | `NULL` |
| **6** | Lê Văn Bếp | `cleaner_fb` | `LuxeHaven@2026` | `cleaner` (Buồng phòng) | `F&B` |
| **7** | Nguyễn Thị Spa | `cleaner_spa` | `LuxeHaven@2026` | `cleaner` (Buồng phòng) | `SPA` |
| **8** | Trần Văn Lái | `cleaner_transport` | `LuxeHaven@2026` | `cleaner` (Buồng phòng) | `TRANSPORT` |
| **9** | Nguyễn Hoàng Minh | `tech_minh` | `LuxeHaven@2026` | `technical` (Kỹ thuật viên) | `NULL` |

---

## 🛠️ Công nghệ sử dụng

* **Backend:** Node.js, Express.js (RESTful API)
* **Frontend:** HTML5, CSS3, Tailwind CSS (giao diện terracotta, gold, charcoal sang trọng), JavaScript (ES6+), Chart.js (hệ thống biểu đồ phân tích trực quan)
* **Database:** Microsoft SQL Server (Mssql)
* **Xác thực & Bảo mật:** JSON Web Token (JWT) mã hóa 3 lớp sinh tồn 7 ngày, Middleware phân quyền theo chức vụ nghiêm ngặt (`protect`, `restrictTo`)
* **Môi trường & Mạng:** Ngrok Tunneling, Dotenv

---

## ✨ Tính năng nổi bật

* **Phân quyền vai trò (Role-based Authorization):** Quản trị chặt chẽ quyền truy cập giữa các phân hệ `ADMIN`, `LỄ TÂN`, `BUỒNG PHÒNG`, và `KẾ TOÁN`. Các trang tài chính, lương bổng chỉ mở cho Admin/Kế toán; sơ đồ phòng và phân công mở cho Admin; các API đặt phòng vãng lai mở công khai.
* **Sơ đồ phòng trực tuyến (Real-time Room Grid):** Đồng bộ dữ liệu real-time trạng thái phòng (Trống, Đang sử dụng, Chờ dọn dẹp) từ SQL Server lên giao diện dashboard admin qua link Ngrok mà không bị lỗi crash mạng.
* **Quản lý ca làm & Chấm công (Attendance Pill Subsystem):** Hệ thống nút chấm công động ("Bắt đầu công việc" / "Kết thúc ca làm") tự nhận diện trạng thái nhân sự và đính kèm token auth bảo mật cao.
* **Chống đặt trùng phòng bằng Giao dịch (Concurrency Control):** Sử dụng các câu lệnh transaction cô lập kết hợp khóa `WITH (UPDLOCK, HOLDLOCK)` trong SQL Server, chặn đứng tình trạng race condition khi hai khách hàng bấm đặt cùng một phòng trong cùng một giây.
* **Đồng bộ múi giờ Việt Nam:** Tầng Application layer ép chuẩn thời gian `Asia/Ho_Chi_Minh` thông qua helper, giải quyết triệt để lỗi lệch múi giờ quốc tế khi ghi nhận lịch sử check-in/check-out và chấm công ca làm.
* **Chuông thông báo thông minh (Dynamic Notification Widget):** Component chuông thông báo trên Header tự động tải danh sách sự cố vận hành dựa theo token định danh của người dùng đăng nhập.

---

## 📁 Cấu trúc project

```text
Booking Managment Hotel/
├── backend/
│   ├── config/             # Cấu hình kết nối SQL Server (db.js)
│   ├── controllers/        # Xử lý logic nghiệp vụ (auth, room, booking, housekeeping...)
│   ├── middleware/         # Bộ lọc bảo mật & Phân quyền JWT (authMiddleware.js)
│   ├── models/             # Định nghĩa cấu trúc truy vấn database
│   ├── routes/             # Định tuyến API endpoint bảo mật và công khai
│   ├── utils/              # Các hàm bổ trợ múi giờ (dateHelper.js)
│   ├── .env                # File cấu hình môi trường bảo mật (Mật khẩu DB, Secret Key)
│   └── server.js           # File khởi chạy server chính của Node.js
├── database/
│   └── schema.sql          # File kịch bản khởi tạo cấu trúc bảng SQL Server
├── frontend/
│   ├── html/               # Các trang giao diện chức năng chính
│   │   ├── dashboard_AD.html    # Thống kê doanh thu, tỷ lệ lấp đầy phòng (Chart.js)
│   │   ├── rooms.html           # Sơ đồ phòng trực tuyến & Quản lý phòng
│   │   ├── bookings.html        # Trung tâm điều phối đơn đặt phòng & Check-in
│   │   ├── users.html           # Quản lý tài khoản vận hành hệ thống
│   │   ├── staff_vibe.html      # Nhật ký dọn phòng dành cho nhân viên buồng phòng
│   │   └── login.html           # Cổng đăng nhập hợp nhất cấp mã JWT xịn
│   └── src/                # File cấu hình frontend tĩnh, Tailwind, Vite config
└── .gitignore              # Bộ lọc chặn file nặng (node_modules) và bảo mật (.env)

```
## 🚀 Hướng dẫn chạy project dưới Local máy tính

Yêu cầu hệ thống
Node.js v18+ hoặc v20+

Microsoft SQL Server 

Công cụ Ngrok (https://ngrok.com/download/windows)

```
 Các bước cài đặt
 1. Tải dự án về máy

Bash
git clone [https://github.com/PhasGod/Luxe-Haven-Hotel-Management.git](https://github.com/PhasGod/Luxe-Haven-Hotel-Management.git)
cd "Booking Managment Hotel"

 2. Cài đặt các thư viện phụ thuộc (Dependencies)

Bash
# Cài đặt cho Backend
cd backend
npm install

# Cài đặt cho Frontend
cd ../frontend
npm install
3. Khởi tạo Cơ sở dữ liệu

Mở SQL Server Management Studio (SSMS).

Tạo một database mới tên là LuxeHaven.

Mở và chạy toàn bộ nội dung file database/schema.sql để sinh các bảng và dữ liệu mẫu (nhân viên, phòng có sẵn).

4. Cấu hình file Môi trường

Tạo một file tên là .env nằm bên trong thư mục backend/.

Cấu hình nội dung kết nối như sau:

Plaintext
PORT=3000
DB_USER=sa
DB_PASSWORD=MatKhauSqlServerCuaBan
DB_SERVER=localhost
DB_NAME=LuxeHaven
JWT_SECRET=ChuoiBiMatKyNhanTokenLuxeHaven2026
5. Khởi chạy ứng dụng

Mở Terminal tại thư mục backend/ và gõ lệnh bật server:

Bash
node server.js
Mở một Terminal khác để public cổng bằng Ngrok:

Bash
ngrok http 3000
Copy đường link https://...ngrok-free.dev do Ngrok cấp, dán vào trình duyệt, truy cập vào file /login.html để bắt đầu trải nghiệm hệ thống quản trị khách sạn LuxeHaven Resort cao cấp!
