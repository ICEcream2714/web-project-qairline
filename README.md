# web-project-qairline

## Tổng Quan

Đây là dự án **QAirline** cho môn học **INT3306 - Phát triển Ứng dụng Web**. Dự án bao gồm cả hai phần **frontend** (React, Vite, TailwindCSS) và **backend** (Express.js, SQLite).

Website cho phép người dùng đặt vé máy bay, xem thông tin chuyến bay, và thực hiện các chức năng liên quan. Quản trị viên có thể quản lý dữ liệu chuyến bay và cập nhật hệ thống...

---

## Cấu Trúc Dự Án

```
web-project-qairline/
├── client/      # Mã nguồn frontend (React, Vite, TailwindCSS)
└── server/       # Mã nguồn backend (Express.js, SQLite)
```

---

## Yêu Cầu Hệ Thống

- **Node.js** (phiên bản 16 trở lên)
- **NPM** (đi kèm với Node.js)
- **SQLite3** (để quản lý cơ sở dữ liệu)

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

Backend sử dụng SQLite làm cơ sở dữ liệu. Nếu file cơ sở dữ liệu (`qairline.db`) chưa tồn tại, nó sẽ được tạo tự động khi server backend chạy lần đầu tiên.

---

## Cách Đóng Góp (Làm Việc Nhóm Hiệu Quả)

### 1. **Cách Branching**

Để tránh xung đột mã nguồn, tất cả thành viên nên tuân theo chiến lược **branching** nhất quán:

- **Nhánh Chính (`main`)**: Nhánh này luôn chứa mã nguồn ổn định và sẵn sàng cho môi trường sản xuất. Không commit trực tiếp vào nhánh này.
- **Nhánh Dev (`dev`)**: Nhánh này dùng để phát triển, các feature sau khi được review sẽ được merge vào nhánh này. Hoàng là người review và merge sau khi các thành viên đã phát triển xong tính năng trên các branch feature. Không commit trực tiếp vào nhánh này.
- **Nhánh Tính Năng**: Mỗi thành viên nên tạo một nhánh tính năng khi làm việc trên một task cụ thể. Ví dụ:
  - `feature/flight-booking`
  - `feature/admin-dashboard`

#### Các bước để tạo và làm việc trên một nhánh tính năng:

1. Lấy các thay đổi mới nhất từ nhánh `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   ```

2. Tạo một nhánh tính năng mới:

   ```bash
   git checkout -b feature/my-feature
   ```

3. Sau khi hoàn thành công việc, commit và đẩy các thay đổi lên:

   ```bash
   git add .
   git commit -m "feat: implement feature X"
   git push origin feature/my-feature
   ```

4. Nhắn Hoàng để Hoàng review và merge vào (`dev`) hay tạo pull request vào (`main`)

### 2. **Quy Tắc Đặt Tên Commit**

Hãy sử dụng các thông báo commit rõ ràng và nhất quán để dễ dàng theo dõi các thay đổi. Sử dụng các từ khóa sau:

- **feat:** cho các tính năng mới
- **fix:** cho các bản sửa lỗi
- **refactor:** cho việc cấu trúc lại mã
- **chore:** cho các công việc liên quan đến build tools, dependencies, ...
- **docs:** cho các thay đổi về tài liệu

Ví dụ:

```
feat: Thêm form đặt vé máy bay với validation
fix: Sửa lỗi chuyển đổi múi giờ cho giờ khởi hành chuyến bay
```

### 3. **Quy Trình Code Review**

- Trước khi merge vào nhánh `main` hay `dev`, mỗi **pull request** cần được review bởi ít nhất một thành viên khác.
- Hoàng thường sẽ là người merge.
- Sử dụng **GitHub Issues** hoặc các bình luận trên pull request để thảo luận về các vấn đề hoặc đề xuất. (Or nhắn mess cho nhanh tùy tình huống)
- Hãy kiểm tra tính năng cẩn thận trên môi trường local trước khi gửi pull request.

### 4. **Prettier và ESLint**

Hãy đảm bảo mã của bạn được định dạng đúng và tuân thủ các tiêu chuẩn code bằng cách sử dụng **Prettier** và **ESLint** (nếu đã được cấu hình). Bạn có thể chạy các công cụ này trước khi commit mã:

- Định dạng code:

  ```bash
  npm run format
  ```

- Kiểm tra lỗi mã:
  ```bash
  npm run lint
  ```

---

## Môi Trường Phát Triển

### 1. **Frontend**

- **URL**: `http://localhost:5173`
- **Công Nghệ Sử Dụng**:
  - React (với Vite)
  - TailwindCSS

### 2. **Backend**

- **URL**: `http://localhost:5000`
- **Công Nghệ Sử Dụng**:
  - Express.js
  - SQLite (Cơ sở dữ liệu)

---

## Tài Liệu API

Chúng ta sẽ có các API để xử lý thông tin chuyến bay, đặt vé, xác thực người dùng, v.v. Hãy đảm bảo tài liệu API được cập nhật khi bạn thêm tính năng mới.

- Sử dụng các công cụ như **Postman** hoặc **Insomnia** để kiểm tra các yêu cầu API.
- Tài liệu API sẽ được bổ sung trong thư mục backend khi dự án tiến triển (có thể sử dụng **Swagger** hoặc markdown).

---

## Liên Hệ

Nhắn vào nhóm messenger.
