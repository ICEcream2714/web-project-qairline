import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Users,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';

export function NavbarSimple() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Kiểm tra nếu người dùng đã đăng nhập
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Người dùng đã đăng nhập
    } else {
      setIsLoggedIn(false); // Người dùng chưa đăng nhập
    }
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
      className={`fixed left-0 right-0 top-0 z-50 bg-gradient-to-r from-gray-500 to-slate-300 transition-colors duration-300`}
    >
      <div className="container mx-auto flex h-16 w-full items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            className={`hidden text-lg font-bold lg:block ${isScrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={handleLogoClick}
          >
            QAirlines
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Button
              variant="link"
              onClick={handleLoginClick}
              className={`${
                isScrolled ? 'text-gray-800' : 'text-white'
              } font-semibold hover:text-purple-600`}
            >
              Login / Sign Up
            </Button>
          ) : (
            <UserProfile
              name="Ngoc Bao"
              id="681897319"
              tier="Burgundy"
              avios={0}
              qpoints={0}
              isScrolled={isScrolled}
              onLogout={handleLogout}
            />
          )}
          <span className="hidden text-sm lg:block">
            {isLoggedIn ? 'Ngoc Bao' : ''}
          </span>
        </div>
      </div>
    </nav>
  );
}
