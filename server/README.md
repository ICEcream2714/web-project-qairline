## Note

- Đang dùng DB browser cho SQlite để xem database
- TK test login sau khi chạy seed: customer1@example.com | Pass123@
- Có thể tạo tk mới thử cx đc

Trong trường hợp bị lỗi cổng 5000 đang chạy:
Trên Linux/macOS:

```
lsof -i :5000 #Tìm PID
kill -9 <PID> #Gán vào đây
```

Trên Windows:

```
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

---

## Cài Đặt Backend

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

4. Nạp seed data cho database:

   ```bash
   npx sequelize-cli db:seed:all
   ```
