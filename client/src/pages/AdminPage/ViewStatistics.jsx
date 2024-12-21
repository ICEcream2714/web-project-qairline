import { useEffect, useState } from 'react';
import { Users, CreditCard, Plane, Calendar } from 'lucide-react';
import { StatisticsCard } from '@/components/Statistics/StatisticsCard';
import { BookingsTable } from '@/components/Statistics/BookingTable';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';

const Loader = () => {
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/customer/bookings')
      .then((response) => response.json())
      .then((data) => {
        setBookingsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-500 italic">Loading...</p>
      </div>
    );
  }

  // Calculate statistics
  const totalBookings = bookingsData.length;
  const totalPassengers = bookingsData.reduce(
    (sum, booking) => sum + booking.passengers,
    0
  );
  const totalRevenue = bookingsData.reduce(
    (sum, booking) => sum + booking.total_price,
    0
  );
  const averageBookingValue = totalRevenue / totalBookings;

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">
            Booking Analytics
          </h1>
        </CardHeader>
        <CardContent>
          {/* Statistics Section */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatisticsCard
              title="Total Bookings"
              value={totalBookings}
              icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
            />
            <StatisticsCard
              title="Total Passengers"
              value={totalPassengers}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
            />
            <StatisticsCard
              title="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
            />
            <StatisticsCard
              title="Average Booking Value"
              value={`$${averageBookingValue.toLocaleString()}`}
              icon={<Plane className="h-4 w-4 text-muted-foreground" />}
            />
          </div>

          {/* Bookings Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <BookingsTable bookings={bookingsData} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Loader;
