import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FlightInfo from './FlightInfo';
import PaymentInfo from './PaymentInfo';
import PassengerInfo from './PassengerInfo';

const BookingCard = ({ booking }) => {
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelled, setIsCancelled] = useState(
    booking.status === 'Cancelled'
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleCancel = async () => {
    setIsCancelling(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/customer/cancel/${booking.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      setIsCancelled(true);
      booking.status = 'Cancelled'; // Update booking status locally
    } catch (error) {
      console.error('Error cancelling booking:', error);
      // Handle error state or display a message to the user
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Booking #{booking.id}</span>
          <Badge
            variant={booking.status === 'Confirmed' ? 'success' : 'warning'}
          >
            {booking.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Outbound Flight</h3>
            <FlightInfo
              flight={booking.outboundFlight}
              seat={booking.outboundSeat}
            />
          </div>
          {booking.returnFlight && (
            <div>
              <h3 className="mb-2 text-lg font-semibold">Return Flight</h3>
              <FlightInfo
                flight={booking.returnFlight}
                seat={booking.returnSeat}
              />
            </div>
          )}
        </div>
        <Separator className="my-4" />
        <div>
          <h3 className="mb-2 text-lg font-semibold">Booking Details</h3>
          <p>Booking Date: {formatDate(booking.booking_date)}</p>
          <p>Passengers: {booking.passengers}</p>
          <p>Total Price: ${booking.total_price}</p>
        </div>
        <Separator className="my-4" />
        <PaymentInfo payment={booking} />
        <Separator className="my-4" />
        <PassengerInfo passengers={booking.Passengers} />
        {!isCancelled && (
          <div className="mt-4">
            <Button
              onClick={handleCancel}
              disabled={isCancelling}
              variant="destructive"
            >
              {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          </div>
        )}
        {isCancelled && (
          <div className="mt-4 font-semibold text-red-500">
            This booking has been cancelled.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
