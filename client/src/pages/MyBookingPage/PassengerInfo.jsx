import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const PassengerInfo = ({ passengers }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold">Passenger Information</h3>
        {passengers && passengers.length > 0 ? (
          passengers.map((passenger, index) => (
            <div key={index} className="mb-2">
              <p>
                Name: {passenger.first_name} {passenger.last_name}
              </p>
              <p>Email: {passenger.email}</p>
              <p>Phone: {passenger.phone}</p>
            </div>
          ))
        ) : (
          <p>No passenger information available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PassengerInfo;
