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

export function NavbarBooking() {
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
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 w-full items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-10">
            <ChevronLeft className="h-5 w-5" />
            <button
              className={`hidden text-lg font-bold lg:block ${isScrolled ? 'text-gray-800' : 'text-white'}`}
              onClick={handleLogoClick}
            >
              QAirlines
            </button>
          </a>
        </div>

        {/* Center section */}
        <div
          className={`flex flex-col items-center rounded-2xl px-5 pt-1 md:flex-row md:gap-3 md:border md:py-2 ${
            isScrolled ? 'border-primary' : 'border-gray-500'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">HAN</span>
            <ChevronRight className="h-5 w-5 text-primary" />
            <span className="font-medium">SGN</span>
          </div>
          <div className="hidden h-6 w-px bg-primary/20 xl:block" />
          <div className="hidden items-center gap-2 xl:block">
            <Calendar className="h-4 w-4" />
            <span>Mon, 9 Dec</span>
          </div>
          <div className="hidden h-6 w-px bg-primary/20 xl:block" />
          <div className="hidden items-center gap-2 xl:block">
            <Users className="h-4 w-4" />
            <span>1 passenger</span>
          </div>
          <div className="hidden h-6 w-px bg-primary/20 lg:block" />
          <div>
            <Button
              variant="ghost"
              className="text-primary hover:bg-primary/5 hover:text-primary"
            >
              <Search className="mr-2 h-4 w-4" />
              Modify search
            </Button>
          </div>
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
