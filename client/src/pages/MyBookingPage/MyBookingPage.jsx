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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'http://localhost:5000/api/customer/my-bookings',
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );
        if (!response.ok) {
          if (response.status === 404) {
            setBookings([]); // No bookings found
          } else {
            throw new Error('Failed to fetch bookings');
          }
        } else {
          const data = await response.json();
          // Sort bookings: confirmed first, cancelled last
          const sortedBookings = data.sort((a, b) => {
            if (a.status === 'Cancelled' && b.status !== 'Cancelled') return 1;
            if (a.status !== 'Cancelled' && b.status === 'Cancelled') return -1;
            return 0;
          });
          setBookings(sortedBookings);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="h-full bg-gradient-to-r from-gray-500 to-slate-300">
      <NavbarSimple />
      <div className="container mx-auto px-3 py-8 pt-24 md:px-28">
        <h1 className="mb-7 text-3xl font-bold text-primary">Manage booking</h1>

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
