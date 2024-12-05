import { Button } from '@/components/ui/button'; // Button từ shadcn

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
            src="https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/black-friday/hn-black-friday-window-no-text-ar.jpg"
            alt="Qatar Airways"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Lớp phủ tối */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Phần thông tin */}
        <div className="relative z-10 ml-2 w-full pt-20 text-left text-white sm:ml-4 md:ml-10">
          <h1 className="mb-4 text-2xl font-bold md:mb-6 md:text-4xl">
            Save up to 30% with our Black Friday Exclusive
          </h1>
          <p className="mb-4 text-sm md:mb-6 md:text-lg">
            Amazing offers await
          </p>
          {/* Sử dụng Button từ shadcn */}
          <Button
            variant="default"
            size="lg"
            className="w-3/4 bg-blue-800 text-white hover:bg-blue-900 md:w-auto"
          >
            Book now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSection;
