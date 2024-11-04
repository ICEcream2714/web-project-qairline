# web-project-qairline

## Tổng Quan

Đây là dự án **QAirline** cho môn học **INT3306 - Phát triển Ứng dụng Web**. Dự án bao gồm cả hai phần **frontend** (Vite, React, TailwindCSS, ShadCN, Zustand) và **backend** (Express.js, SQLite, Sequelize).

Website cho phép người dùng đặt vé máy bay, xem thông tin chuyến bay, và thực hiện các chức năng liên quan. Quản trị viên có thể quản lý dữ liệu chuyến bay và cập nhật hệ thống.

---

## Cấu Trúc Dự Án

```bash
web-project-qairline/
├── client/      # Mã nguồn frontend (Vite, React, TailwindCSS, ShadCN, Zustand)
└── server/      # Mã nguồn backend (Express.js, SQLite, Sequelize)
```

---

## Yêu Cầu Hệ Thống

- **Node.js** (phiên bản 16 trở lên)
- **NPM** (đi kèm với Node.js)
- **SQLite3** (quản lý cơ sở dữ liệu)

---

## Branches

- `main`: Nhánh ổn định, dùng cho production
- `dev`: Nhánh phát triển, chứa các tính năng thử nghiệm và log cho dev

---

## Hướng Dẫn Cài Đặt

### 1. Clone Repository

Để bắt đầu, clone repository về máy:

```bash
git clone https://github.com/ICEcream2714/web-project-qairline.git
cd web-project-qairline
```

### 2. Cài Đặt Frontend

1. Di chuyển đến thư mục `client`:

   ```bash
   cd client
   ```

2. Cài đặt các gói cần thiết:

   ```bash
   npm install
   ```

3. Chạy server phát triển frontend:

   ```bash
   npm run dev
   ```

   Frontend sẽ chạy tại **`http://localhost:5173`**. Trang sẽ tự động tải lại nếu bạn thay đổi mã nguồn.

### 3. Cài Đặt Backend

1. Di chuyển đến thư mục `server`:

   ```bash
   cd server
   ```

2. Cài đặt các gói cần thiết cho backend:

   ```bash
   npm install
   ```

3. Chạy server backend:

   ```bash
   npm start
   ```

   Backend sẽ chạy tại **`http://localhost:5000`**.

### 4. Cài Đặt Cơ Sở Dữ Liệu

Backend sử dụng SQLite làm cơ sở dữ liệu. Nếu file cơ sở dữ liệu (`database.sqlite`) chưa tồn tại, nó sẽ được tạo tự động khi server backend chạy lần đầu tiên.

---

## Cách Đóng Góp (Làm Việc Nhóm Hiệu Quả)

### 1. **Chiến Lược Branching**

Để tránh xung đột mã nguồn, các thành viên nên tuân thủ chiến lược **branching**:

- **Nhánh Chính (`main`)**: Luôn chứa mã nguồn ổn định và sẵn sàng cho sản xuất. Không commit trực tiếp vào nhánh này.
- **Nhánh Phát Triển (`dev`)**: Dùng để phát triển, các tính năng sẽ được merge vào sau khi review. Hoàng sẽ là người review và merge. Không commit trực tiếp vào nhánh này.
- **Nhánh Tính Năng**: Mỗi thành viên tạo một nhánh riêng khi làm việc trên một task cụ thể. Ví dụ:
  - `feature/flight-booking`
  - `feature/admin-dashboard`

#### Các bước tạo và làm việc trên nhánh tính năng:

1. Lấy các thay đổi mới nhất từ nhánh `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   ```

2. Tạo một nhánh tính năng mới:

   ```bash
   git checkout -b feature/my-feature
   ```

3. Sau khi hoàn thành, commit và đẩy thay đổi lên:

   ```bash
   git add .
   git commit -m "feat: implement feature X"
   git push origin feature/my-feature
   ```

4. Nhắn Hoàng để review và merge hoặc tạo pull request.

### 2. **Quy Tắc Đặt Tên Commit**

Sử dụng các thông báo commit rõ ràng và nhất quán:

- **feat:** cho tính năng mới
- **fix:** cho sửa lỗi
- **refactor:** cho cấu trúc lại mã
- **chore:** cho công việc liên quan đến build tools hoặc dependencies
- **docs:** cho các thay đổi về tài liệu

Ví dụ:

```bash
feat: Thêm form đặt vé máy bay với validation
fix: Sửa lỗi chuyển đổi múi giờ cho giờ khởi hành
```

### 3. **Quy Trình Code Review**

- Mỗi pull request cần được review trước khi merge vào `main` hoặc `dev`.
- Hoàng sẽ là người chịu trách nhiệm merge.
- Sử dụng **GitHub Issues** hoặc bình luận trên pull request để thảo luận (hoặc nhắn Messenger khi cần).

## Môi Trường Phát Triển

### 1. **Frontend**

- **URL**: `http://localhost:5173`
- **Công Nghệ Sử Dụng**:
  - React (với Vite)
  - TailwindCSS
  - ShadCN
  - Zustand (Dùng khi cần thiết)

### 2. **Backend**

- **URL**: `http://localhost:5000`
- **Công Nghệ Sử Dụng**:
  - Express.js
  - SQLite (Cơ sở dữ liệu)
  - Sequelize

---

## Tài Liệu API

Chúng ta sẽ có các API để xử lý thông tin chuyến bay, đặt vé, và xác thực người dùng. Hãy đảm bảo tài liệu API được cập nhật khi có tính năng mới.

- Sử dụng **Postman** hoặc **Insomnia** để kiểm tra API.
- Tài liệu API sẽ được bổ sung trong thư mục backend khi dự án tiến triển.

---

## Liên Hệ

Nhắn vào nhóm Messenger.
