import { useEffect, } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [setSidebarOpen, sidebarOpen]);

  return (
    <aside
      className={`absolute left-0 top-0 z-50 flex h-screen w-72 flex-col bg-black p-5 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <Button
          className="lg:hidden text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ✕
        </Button>
      </div>

      <nav className="flex flex-col space-y-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/post-information"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-gray-700 ${
                pathname.includes("post-information") ? "bg-gray-700" : ""
              }`}
            >
              <span>📋</span>
              Post Information
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-airplanes"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-gray-700 ${
                pathname.includes("add-airplanes") ? "bg-gray-700" : ""
              }`}
            >
              <span>✈️</span>
              Add Airplane Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-flights"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-gray-700 ${
                pathname.includes("add-flights") ? "bg-gray-700" : ""
              }`}
            >
              <span>🛫</span>
              Add Flight Data
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/view-statistics"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-gray-700 ${
                pathname.includes("view-statistics") ? "bg-gray-700" : ""
              }`}
            >
              <span>📊</span>
              View and Analyze Bookings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/edit-flights"
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition hover:bg-gray-700 ${
                pathname.includes("edit-flights") ? "bg-gray-700" : ""
              }`}
            >
              <span>📝</span>
              Edit Flight Information
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
