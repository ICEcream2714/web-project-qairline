import Navbar from '@/layouts/Navbar/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useState } from 'react';
import process from 'process';
import { useNavigate } from 'react-router-dom';

import { format } from 'date-fns';

function BookingPage() {
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000/api/customer/search-flights?';

  const date = new Date();
  const dates = [
    new Date(2024, 11, 6),
    new Date(2024, 11, 7),
    new Date(2024, 11, 8),
    new Date(2024, 11, 9),
    new Date(2024, 11, 10),
    new Date(2024, 11, 11),
    new Date(2024, 11, 12),
  ];
  const flights = [
    {
      departureTime: '23:10',
      arrivalTime: '10:00',
      origin: 'DOH',
      destination: 'ABT',
      duration: '1 Stop, 10h 50m',
      economyPrice: 1030,
      firstPrice: 4390,
    },
    {
      departureTime: '18:00',
      arrivalTime: '08:45',
      origin: 'DOH',
      destination: 'ABT',
      duration: '1 Stop, 14h 45m',
      economyPrice: 1370,
      firstPrice: 5990,
    },
    {
      departureTime: '18:05',
      arrivalTime: '10:00',
      origin: 'DOH',
      destination: 'ABT',
      duration: '1 Stop, 15h 55m',
      economyPrice: 1030,
      firstPrice: 4390,
    },
    {
      departureTime: '16:45',
      arrivalTime: '08:45',
      origin: 'DOH',
      destination: 'ABT',
      duration: '1 Stop, 16h',
      economyPrice: 1370,
      firstPrice: 5240,
    },
    {
      departureTime: '15:20',
      arrivalTime: '10:00',
      origin: 'DOH',
      destination: 'ABT',
      duration: '1 Stop, 18h 40m',
      economyPrice: 1260,
      firstPrice: 4390,
    },
  ];

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showFareDetails, setShowFareDetails] = useState(false);

  const handleSelectFare = (flight, fare) => {
    setSelectedFlight({ ...flight, fare });
    setShowFareDetails(true);
  };

  const handleConfirmBooking = () => {
    navigate('/booking/passenger-details');
  };

  return (
    <div className="h-auto bg-slate-50">
      {/* TODO: Need a new navbar */}
      <Navbar />
      <main className="bg-slate-200 pt-28 md:px-10">
        {/* Header */}
        <div>
          <p>{`${date.toUTCString()}`}</p>
          <div></div>
          <div className="mb-8">
            <h1 className="text-2xl font-medium">
              Select your departure flight
            </h1>
            <p className="text-lg text-muted-foreground">
              from <span className="text-purple-600">Doha</span> to{' '}
              <span className="text-purple-600">Al-Baha</span>
            </p>
          </div>
        </div>
        <div className="mb-8 overflow-x-auto">
          {/* /* Date picker */}
          <Tabs defaultValue={dates[0].toISOString()}>
            <TabsList className="h-auto w-full gap-0 rounded-t-lg">
              {dates.map((date) => (
                <TabsTrigger
                  key={date.toISOString()}
                  value={date.toISOString()}
                  className="flex w-full flex-col gap-1 rounded-t-lg p-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
                  // onClick={() =>
                  //   console.log(`Selected date: ${date.toISOString()}`)
                  // }
                >
                  <span className="text-sm">{format(date, 'EEE, d MMM')}</span>
                  <span className="text-xs text-muted-foreground">
                    QAR 1,030
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent
              className="grid w-full gap-4"
              value={date.toISOString()}
            ></TabsContent>
          </Tabs>
          {/* Flights */}
          <div className="grid gap-4">
            {flights.map((flight) => (
              <Card key={flight.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <div>
                        <p className="text-2xl font-bold">
                          {flight.departureTime}
                        </p>
                        <p className="text-sm text-gray-500">{flight.origin}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {flight.duration}
                      </div>
                      <div>
                        <p className="text-2xl font-bold">
                          {flight.arrivalTime}
                        </p>
                        <p className="text-sm text-gray-500">
                          {flight.destination}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Economy</p>
                        <p className="text-lg font-bold">
                          USD {flight.economyPrice}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => handleSelectFare(flight, 'economy')}
                        >
                          Select fare
                        </Button>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">First</p>
                        <p className="text-lg font-bold">
                          USD {flight.firstPrice}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => handleSelectFare(flight, 'first')}
                        >
                          Select fare
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Dialog open={showFareDetails} onOpenChange={setShowFareDetails}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Fare Details</DialogTitle>
              <DialogDescription>
                Review your selected fare details before proceeding
              </DialogDescription>
            </DialogHeader>
            {selectedFlight && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Flight Details</p>
                  <p>
                    {selectedFlight.origin} → {selectedFlight.destination}
                  </p>
                  <p>
                    {selectedFlight.departureTime} -{' '}
                    {selectedFlight.arrivalTime}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Included Benefits</p>
                  <ul className="list-disc pl-4 text-sm">
                    <li>Checked baggage allowance</li>
                    <li>Cabin baggage allowance</li>
                    <li>Complimentary meals</li>
                    <li>Seat selection</li>
                  </ul>
                </div>
                <Button className="w-full" onClick={handleConfirmBooking}>
                  Confirm Selection
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="container mx-auto mt-24 px-4 py-6">
          <div className="flex justify-between text-sm text-gray-500">
            <p>© 2024 Airline Booking. All rights reserved.</p>
            <div className="space-x-4">
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-900">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-900">
                Contact
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BookingPage;
