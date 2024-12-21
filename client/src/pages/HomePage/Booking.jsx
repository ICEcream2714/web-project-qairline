

const BookingSection = () => {
  return (
    <div className="font-sans">
      {/* Nội dung phần "Đặt vé ngay" */}
      <div
        className="relative my-8 flex flex-col items-start justify-center overflow-hidden rounded-lg bg-gray-100 px-6 py-12 shadow-lg md:flex-row"
        style={{ minHeight: '400px' }} // Tăng chiều cao phần Booking
      >
        {/* Hình ảnh */}
        <div className="absolute inset-0">
          <img
            src="https://genk.mediacdn.vn/thumb_w/640/139269124445442048/2022/5/24/take-photo-out-an-airplane-window-800x534-1653368460753-1653368460868632169694.jpg"
            alt="Qatar Airways"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Phần thông tin */}
        <div className="relative z-10 ml-2 w-full pt-15 text-left text-white sm:ml-4 md:ml-10 md:pt-20">
  <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
    Welcome aboard QAirline! <br />
    Thank you for choosing to fly with us!
  </h1>
  <p className="mb-4 text-sm md:mb-6 md:text-lg">
    Amazing offers await
  </p>
  {/* Sử dụng Button từ shadcn */}
</div>

      </div>
    </div>
  );
};

export default BookingSection;
