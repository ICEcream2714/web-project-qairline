import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BookingCard from './BookingCard';
import Navbar from '@/layouts/Navbar/Navbar';
import { NavbarSimple } from '@/layouts/Navbar/NavbarSimple';

function MyBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          'http://localhost:5000/api/customer/bookings',
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        // Sort bookings: confirmed first, cancelled last
        const sortedBookings = data.sort((a, b) => {
          if (a.status === 'Cancelled' && b.status !== 'Cancelled') return 1;
          if (a.status !== 'Cancelled' && b.status === 'Cancelled') return -1;
          return 0;
        });
        setBookings(sortedBookings);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading...</div>;
  if (error)
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;

  return (
    <>
      <NavbarSimple />
      <div className="container mx-auto px-4 py-8 pt-40">
        <h1 className="mb-6 text-3xl font-bold">My Bookings</h1>
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyBookingPage;
