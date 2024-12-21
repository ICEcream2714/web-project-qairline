import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BookingCard from './BookingCard';
import Navbar from '@/layouts/Navbar/Navbar';
import { NavbarSimple } from '@/layouts/Navbar/NavbarSimple';
import Footer from '@/layouts/Footer';

function MyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      // If the current scroll position is greater than the last scroll position, hide the Navbar
      if (currentScrollY >= lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Fetching bookings with token:', token); // Debug log

        const response = await fetch(
          'http://localhost:5000/api/customer/my-bookings',
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

        console.log('Response status:', response.status); // Debug log

        const data = await response.json();
        console.log('Fetched bookings:', data); // Debug log

        if (response.ok) {
          // Sort bookings: confirmed first, cancelled last
          const sortedBookings = data.sort((a, b) => {
            if (a.status === 'Cancelled' && b.status !== 'Cancelled') return 1;
            if (a.status !== 'Cancelled' && b.status === 'Cancelled') return -1;
            return 0;
          });
          setBookings(sortedBookings);
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="to- h-full bg-gradient-to-r from-secondary-foreground to-[#ad5389]">
      {isVisible && <Navbar />}
      <div className="container mx-auto px-3 py-8 pt-24 md:px-28">
        <h1 className="mb-7 text-3xl font-bold text-white">Manage booking</h1>

        <div className="space-y-6">
          {loading && <div className="py-8 text-center">Loading...</div>}
          {error && (
            <div className="py-8 text-center text-red-500">Error: {error}</div>
          )}
          {!loading && !error && bookings.length === 0 && (
            <div className="py-8 text-center">No bookings found!</div>
          )}
          {!loading &&
            !error &&
            bookings.length > 0 &&
            bookings.map((booking, index) => (
              <BookingCard key={booking.id} booking={booking} index={index} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyBookingPage;
