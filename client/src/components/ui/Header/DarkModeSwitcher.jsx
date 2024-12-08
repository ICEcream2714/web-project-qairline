import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FiSun, FiMoon } from 'react-icons/fi';

const DarkModeSwitcher = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Lấy trạng thái từ localStorage khi component được mount
    const savedMode = localStorage.getItem('theme') === 'dark';
    setIsDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Lưu trạng thái vào localStorage
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    // Cập nhật class trên <html>
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggleDarkMode}
        className="relative inline-flex items-center justify-between w-14 h-7 rounded-full bg-gray-300 dark:bg-gray-700 cursor-pointer transition-all duration-300"
      >
        {/* Background */}
        <div
          className={`absolute top-1/2 left-1 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
            isDarkMode ? 'translate-x-7 bg-yellow-400' : 'translate-x-0'
          }`}
        >
          {/* Mặt trời khi sáng */}
          <span className={`${isDarkMode ? 'hidden' : 'block'} w-full h-full flex items-center justify-center`}>
            <FiSun className="w-4 h-4 text-yellow-500" />
          </span>

          {/* Mặt trăng khi tối */}
          <span className={`${isDarkMode ? 'block' : 'hidden'} w-full h-full flex items-center justify-center`}>
            <FiMoon className="w-4 h-4 text-blue-500" />
          </span>
        </div>
      </Button>
    </div>
  );
};

export default DarkModeSwitcher;
