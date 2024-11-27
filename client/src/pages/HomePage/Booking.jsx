import { Button } from "@/components/ui/button"; // Button từ shadcn

const BookingSection = () => {
  return (
    <div className="font-sans">
      {/* Nội dung phần "Đặt vé ngay" */}
      <div
        className="relative flex flex-col items-start justify-center px-6 py-12 md:flex-row bg-gray-100 rounded-lg shadow-lg my-8 overflow-hidden"
        style={{ minHeight: "400px" }}  // Tăng chiều cao phần Booking
      >
        {/* Hình ảnh */}
        <div className="absolute inset-0">
          <img
            src="https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/black-friday/hn-black-friday-window-no-text-ar.jpg"
            alt="Qatar Airways"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Phần thông tin */}
        <div className="relative left-10 top-10 z-10 w-full text-left text-white ml-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Save up to 30% with our Black Friday Exclusive</h1>
          <p className="text-lg mb-6">Amazing offers await</p>
          {/* Sử dụng Button từ shadcn */}
          <Button variant="default" size="lg" className="bg-blue-800 text-white hover:bg-blue-900">
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
