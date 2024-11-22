import { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);            // Trạng thái để mở menu trong màn hình thu nhỏ
  const [dropdownOpen, setDropdownOpen] = useState(null); // Trạng thái để mở dropdown
  const [isScrolled, setIsScrolled] = useState(false);    // Trạng thái để thay đổi nền khi cuộn

  // Hàm bật/tắt dropdown
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  // Lắng nghe sự kiện cuộn để thay đổi trạng thái
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 p-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-800 font-bold text-lg">Qatar Airways</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <div className="relative">
            <button
              onClick={() => toggleDropdown(1)}
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-purple-600 font-semibold`}
            >
              Book
            </button>
            {dropdownOpen === 1 && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-48">
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Flights
                </a>
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Manage Booking
                </a>
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Special Offers
                </a>
              </div>
            )}
          </div>
          <a href="/" className={`${isScrolled ? "text-gray-800" : "text-white"} hover:text-purple-600 font-semibold`}>
            Discover
          </a>
          <div className="relative">
            <button
              onClick={() => toggleDropdown(2)}
              className={`${
                isScrolled ? "text-gray-800" : "text-white"
              } hover:text-purple-600 font-semibold`}
            >
              Experience
            </button>
            {dropdownOpen === 2 && (
              <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-48">
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Onboard
                </a>
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Lounge
                </a>
              </div>
            )}
          </div>
          <a href="/" className={`${isScrolled ? "text-gray-800" : "text-white"} hover:text-purple-600 font-semibold`}>
            Help
          </a>
          <a href="/" className={`${isScrolled ? "text-gray-800" : "text-white"} hover:text-purple-600 font-semibold`}>
            Privilege Club
          </a>
          <a href="/" className={`${isScrolled ? "text-gray-800" : "text-white"} hover:text-purple-600 font-semibold`}>
            Login / Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`${isScrolled ? "text-gray-800" : "text-white"} focus:outline-none`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md flex flex-col items-start p-4 space-y-4">
          <button onClick={() => toggleDropdown(1)} className="text-gray-800 font-semibold">
            Book
          </button>
          {dropdownOpen === 1 && (
            <div className="ml-4 flex flex-col space-y-2">
              <a href="/" className="text-gray-700">
                Flights
              </a>
              <a href="/" className="text-gray-700">
                Manage Booking
              </a>
              <a href="/" className="text-gray-700">
                Special Offers
              </a>
            </div>
          )}
          <a href="/" className="text-gray-800 font-semibold">
            Discover
          </a>
          <button onClick={() => toggleDropdown(2)} className="text-gray-800 font-semibold">
            Experience
          </button>
          {dropdownOpen === 2 && (
            <div className="ml-4 flex flex-col space-y-2">
              <a href="/" className="text-gray-700">
                Onboard
              </a>
              <a href="/" className="text-gray-700">
                Lounge
              </a>
            </div>
          )}
          <a href="/" className="text-gray-800 font-semibold">
            Help
          </a>
          <a href="/" className="text-gray-800 font-semibold">
            Privilege Club
          </a>
          <a href="/" className="text-gray-800 font-semibold">
            Login / Sign Up
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
