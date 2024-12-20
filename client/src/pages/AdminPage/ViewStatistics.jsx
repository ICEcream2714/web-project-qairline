import { useEffect, useState } from 'react';
import { Users, CreditCard, Plane, Calendar } from 'lucide-react';
import { StatisticsCard } from '@/components/Statistics/StatisticsCard';
import { BookingsTable } from '@/components/Statistics/BookingTable';

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
    return <div>Loading...</div>;
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
    <div className="container">
      <h1 className="mb-8 text-3xl font-bold">Booking Analytics</h1>

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

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Recent Bookings</h2>
        <BookingsTable bookings={bookingsData} />
      </div>
    </div>
  );
};

export default Loader;
