import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane } from 'lucide-react';

const FlightInfo = ({ flight, seat }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <Plane className="mr-2" size={20} />
            <span className="font-semibold">
              {flight.origin} to {flight.destination}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {flight.status}
          </span>
        </div>
        <div className="mb-2 text-sm text-gray-500">
          <p>Departure: {formatDateTime(flight.departure_time)}</p>
          <p>Arrival: {formatDateTime(flight.arrival_time)}</p>
        </div>
        <div className="mt-2">
          <p className="text-sm">
            Seat: {seat.seat_number} ({seat.seat_type})
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightInfo;
