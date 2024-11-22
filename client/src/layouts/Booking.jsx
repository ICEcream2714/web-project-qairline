import Navbar from "@/layouts/Navbar";
import { Button } from "@/components/ui/button"; // Button từ shadcn

const BookingSection = () => {
  return (
    <div className="font-sans">
      {/* Thanh menu */}
      <Navbar />

      {/* Nội dung phần "Đặt vé ngay" */}
      <div className="relative flex flex-col items-center justify-center px-6 py-12 md:flex-row bg-gray-100 rounded-lg shadow-lg my-8 overflow-hidden" style={{ height: "px" }}>
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
        <div className="relative z-10 w-full md:w-1/2 text-center md:text-left text-white">
          <h1 className="text-3xl font-bold mb-4">Đặt vé ngay</h1>
          <p className="text-lg mb-6">Khám phá thế giới với Qatar Airways</p>
          {/* Sử dụng Button từ shadcn */}
          <Button variant="default" size="lg" className="bg-blue-800 text-white hover:bg-blue-900">
            Đặt vé ngay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
