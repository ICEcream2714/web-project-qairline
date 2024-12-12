import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button'; // Import Button từ ShadCN
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import UserProfile from '@/layouts/Navbar/UserProfile'; // Import UserProfile từ ShadCN
import { CircleUserRound } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false); // Trạng thái để mở menu trong màn hình thu nhỏ
  const [dropdownOpen, setDropdownOpen] = useState(null); // Trạng thái để mở dropdown
  const [isScrolled, setIsScrolled] = useState(false); // Trạng thái để thay đổi nền khi cuộn
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra nếu người dùng đã đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Người dùng đã đăng nhập
    } else {
      setIsLoggedIn(false); // Người dùng chưa đăng nhập
    }
  }, []);

  // Hàm bật/tắt dropdown
  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  // Lắng nghe sự kiện cuộn để thay đổi trạng thái
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-30 w-full p-4 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <button
          className={`text-lg font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          onClick={handleLogoClick}
        >
          QAirlines
        </button>

        {/* Desktop Menu */}
        <div className="hidden space-x-8 md:flex">
          <div className="relative">
            <Button
              variant="link" // Sử dụng Button với variant "link"
              onClick={() => toggleDropdown(1)}
              className={`${
                isScrolled ? 'text-gray-800' : 'text-white'
              } font-semibold hover:text-purple-600`}
            >
              Book
            </Button>
            {dropdownOpen === 1 && (
              <div className="absolute mt-2 w-48 rounded-md bg-white py-2 shadow-md">
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Flights
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Manage Booking
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Special Offers
                </a>
              </div>
            )}
          </div>
          <Button
            variant="link"
            className={`${isScrolled ? 'text-gray-800' : 'text-white'} font-semibold hover:text-purple-600`}
          >
            Discover
          </Button>
          <div className="">
            <Button
              variant="link"
              onClick={() => toggleDropdown(2)}
              className={`${
                isScrolled ? 'text-gray-800' : 'text-white'
              } font-semibold hover:text-purple-600`}
            >
              Experience
            </Button>
            {dropdownOpen === 2 && (
              <div className="absolute mt-2 w-48 rounded-md bg-white py-2 shadow-md">
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Onboard
                </a>
                <a
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Lounge
                </a>
              </div>
            )}
          </div>
          <Button
            variant="link"
            className={`${isScrolled ? 'text-gray-800' : 'text-white'} font-semibold hover:text-purple-600`}
          >
            Help
          </Button>
          <Button
            variant="link"
            className={`${isScrolled ? 'text-gray-800' : 'text-white'} font-semibold hover:text-purple-600`}
          >
            Privilege Club
          </Button>
          <div className="relative m-0 p-0">
            {!isLoggedIn ? (
              <Button
                variant="link"
                onClick={handleLoginClick}
                className={`${isScrolled ? 'text-gray-800' : 'text-white'} font-semibold hover:text-purple-600`}
              >
                Login / Sign Up
              </Button>
            ) : (
              <UserProfile
                name="Hoang Nguyen"
                id="681897319"
                tier="Burgundy"
                avios={0}
                qpoints={0}
                isScrolled={isScrolled}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="link" // Sử dụng Button với variant "link"
            onClick={() => setIsOpen(!isOpen)}
            className={`${isScrolled ? 'text-gray-800' : 'text-white'} focus:outline-none`}
          >
            <svg
              className="h-6 w-6"
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
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-16 flex flex-col items-start space-y-4 bg-white p-4 shadow-md md:hidden">
          <Button
            variant="link"
            onClick={() => toggleDropdown(1)}
            className="font-semibold text-gray-800"
          >
            Book
          </Button>
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
          <Button variant="link" className="font-semibold text-gray-800">
            Discover
          </Button>
          <Button
            variant="link"
            onClick={() => toggleDropdown(2)}
            className="font-semibold text-gray-800"
          >
            Experience
          </Button>
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
          <Button variant="link" className="font-semibold text-gray-800">
            Help
          </Button>
          <Button variant="link" className="font-semibold text-gray-800">
            Privilege Club
          </Button>
          {}
          <Button variant="link" className="font-semibold text-gray-800">
            Login / Sign Up
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
