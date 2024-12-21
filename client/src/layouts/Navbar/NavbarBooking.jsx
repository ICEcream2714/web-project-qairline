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
import logos from '../../assets/image.png'
import { useNavigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import axios from 'axios';

export function NavbarBooking() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });

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
      fetchUserInfo(token);
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
    setUserInfo({ name: '', email: '' });
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/customer/my-info',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { first_name, last_name, User } = response.data;
      setUserInfo({ name: `${first_name} ${last_name}`, email: User.email });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
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
          <a href="/" className="flex items-center gap-5">
            <ChevronLeft className="h-5 w-5" />
              {/* Logo bên cạnh */}
              <img
                src={logos} // Path to your image
                alt="Logo"
                className="w-12 h-10 " // Adjust size and ensure it fits inside the circle
              />
              {/* Tên hãng */}
              <span className="font-serif text-2xl tracking-wider">
                Q<span className="text-purple-400">Airlines</span>
              </span>
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
              name={userInfo.name}
              id={userInfo.email}
              tier="Burgundy"
              avios={5}
              qpoints={10}
              isScrolled={isScrolled}
              onLogout={handleLogout}
              isBooking={true}
            />
          )}
          <span className="hidden text-sm font-medium text-gray-800 lg:block hover:text-primary transition-colors">
  {isLoggedIn ? userInfo.name : ''}
</span>

        </div>
      </div>
    </nav>
  );
}
