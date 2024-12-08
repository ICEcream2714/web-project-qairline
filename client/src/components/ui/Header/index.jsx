import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import { FiMenu, FiSearch } from "react-icons/fi";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu className="w-5 h-5 text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <form className="w-full">
            <div className="relative flex items-center">
              {/* Search Icon */}
              <button
                type="button"
                className="absolute left-0 pl-3 flex items-center h-full text-gray-500 hover:text-gray-700 dark:text-gray-300"
              >
                <FiSearch className="w-5 h-5" />
              </button>
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </form>
        </div>

        {/* Icons & User Profile */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Switcher */}
          <DarkModeSwitcher />

          {/* Notifications */}
          <DropdownNotification />

          {/* Messages */}
          <DropdownMessage />

          {/* User */}
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
