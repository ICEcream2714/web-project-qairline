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
} from '@/components/ui/dialog';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { format } from 'date-fns';

function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Nhận dữ liệu từ location

  const [outgoingFlights, setOutgoingFlights] = useState([]); // Mảng các chuyến bay đi
  const [returnFlights, setReturnFlights] = useState([]); // Mảng các chuyến bay về
  const [outgoingDates, setOutgoingDates] = useState([]); // Mảng ngày chuyến bay đi
  const [returnDates, setReturnDates] = useState([]); // Mảng ngày chuyến bay về
  const [selectedOutgoingDate, setSelectedOutgoingDate] = useState(null); // Ngày chuyến bay đi được chọn
  const [selectedReturnDate, setSelectedReturnDate] = useState(null); // Ngày chuyến bay về được chọn
  const [selectedOutgoingFlight, setSelectedOutgoingFlight] = useState(null); // Chuyến bay đi được chọn
  const [selectedReturnFlight, setSelectedReturnFlight] = useState(null); // Chuyến bay về được chọn
  const [showFareDetails, setShowFareDetails] = useState(false); // Hiển thị dialog fare details
  const [isSelectingReturnFlight, setIsSelectingReturnFlight] = useState(false); // State to track if selecting return flight
  const [origin, setOrigin] = useState('Doha'); // Default origin
  const [destination, setDestination] = useState('Al-Baha'); // Default destination
  const [totalPrice, setTotalPrice] = useState(0); // State to track total price

  // Lấy dữ liệu chuyến bay từ location.state
  useEffect(() => {
    if (location.state) {
      const { flights, origin, destination } = location.state;
      if (flights) {
        setOutgoingFlights(flights.flights.outgoing || flights.flights);
        setReturnFlights(flights.flights.return || []);
      }
      if (origin) setOrigin(origin);
      if (destination) setDestination(destination);
    }
  }, [location.state]);

  // Tạo mảng outgoingDates và returnDates từ outgoingFlights và returnFlights
  useEffect(() => {
    if (outgoingFlights.length > 0) {
      const outgoingDates = outgoingFlights.map((flight) => {
        const departureDate = new Date(flight.departure_time);
        return departureDate.toISOString().split('T')[0];
      });
      const uniqueOutgoingDates = [...new Set(outgoingDates)];
      uniqueOutgoingDates.sort((a, b) => new Date(a) - new Date(b));
      setOutgoingDates(uniqueOutgoingDates);
      setSelectedOutgoingDate(uniqueOutgoingDates[0]);
    }

    if (returnFlights.length > 0) {
      const returnDates = returnFlights.map((flight) => {
        const returnDate = new Date(flight.departure_time);
        return returnDate.toISOString().split('T')[0];
      });
      const uniqueReturnDates = [...new Set(returnDates)];
      uniqueReturnDates.sort((a, b) => new Date(a) - new Date(b));
      setReturnDates(uniqueReturnDates);
      setSelectedReturnDate(uniqueReturnDates[0]);
    }
  }, [outgoingFlights, returnFlights]);

  const handleSelectFare = (flight, fare) => {
    const selectedSeat = flight.Seats.find((seat) => seat.seat_type === fare);
    if (selectedSeat) {
      if (isSelectingReturnFlight) {
        setSelectedReturnFlight({
          ...flight,
          fare,
          seatId: selectedSeat.id, // Store the seat ID
        });
      } else {
        setSelectedOutgoingFlight({
          ...flight,
          fare,
          seatId: selectedSeat.id, // Store the seat ID
        });
      }
      setTotalPrice((prevPrice) => prevPrice + selectedSeat.price);
      setShowFareDetails(true);
    }
  };

  const handleConfirmBooking = () => {
    if (returnFlights.length > 0 && !isSelectingReturnFlight) {
      setIsSelectingReturnFlight(true);
      setSelectedOutgoingDate(null);
      setShowFareDetails(false);
    } else {
      navigate('/booking/passenger-details', {
        state: {
          totalPrice,
          outboundFlight: {
            ...selectedOutgoingFlight,
            seatId: selectedOutgoingFlight.seatId, // Pass the seat ID
          },
          returnFlight: selectedReturnFlight
            ? {
                ...selectedReturnFlight,
                seatId: selectedReturnFlight.seatId, // Pass the seat ID if return flight exists
              }
            : null,
        },
      });
    }
  };

  return (
    <div className="h-screen min-h-screen bg-slate-50">
      <Navbar />
      <main className="h-full bg-slate-200 pt-28 md:px-10">
        <div className="mb-8">
          <h1 className="text-2xl font-medium">
            {isSelectingReturnFlight
              ? 'Select your return flight'
              : 'Select your departure flight'}
          </h1>
          <p className="text-lg text-muted-foreground">
            from{' '}
            <span className="text-purple-600">
              {isSelectingReturnFlight ? destination : origin}
            </span>{' '}
            to{' '}
            <span className="text-purple-600">
              {isSelectingReturnFlight ? origin : destination}
            </span>
          </p>
        </div>

        <div className="mb-8 overflow-x-auto">
          {/* Date picker for outgoing or return flights */}
          {(isSelectingReturnFlight ? returnDates : outgoingDates)?.length >
            0 && (
            <Tabs
              value={
                isSelectingReturnFlight
                  ? selectedReturnDate
                  : selectedOutgoingDate
              }
              onValueChange={
                isSelectingReturnFlight
                  ? setSelectedReturnDate
                  : setSelectedOutgoingDate
              }
            >
              <TabsList className="h-auto w-full gap-0 rounded-t-lg">
                {(isSelectingReturnFlight ? returnDates : outgoingDates).map(
                  (date, index) => (
                    <TabsTrigger
                      key={`${date}-${index}`}
                      value={date}
                      className="flex w-full flex-col gap-1 rounded-t-lg p-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
                    >
                      <span className="text-sm">
                        {format(new Date(date), 'EEE, d MMM')}
                      </span>
                    </TabsTrigger>
                  )
                )}
              </TabsList>
              {/* Filter and display flights for the selected date */}
              <TabsContent
                value={
                  isSelectingReturnFlight
                    ? selectedReturnDate
                    : selectedOutgoingDate
                }
              >
                {(isSelectingReturnFlight ? returnFlights : outgoingFlights)
                  .filter(
                    (flight) =>
                      new Date(flight.departure_time)
                        .toISOString()
                        .split('T')[0] ===
                      (isSelectingReturnFlight
                        ? selectedReturnDate
                        : selectedOutgoingDate)
                  )
                  .map((flight) => {
                    const economySeat = flight.Seats.find(
                      (seat) => seat.seat_type === 'economy'
                    );
                    const premiumSeat = flight.Seats.find(
                      (seat) => seat.seat_type === 'premium'
                    );
                    return (
                      <Card key={flight.id} className="mb-3">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-8">
                              <div>
                                <p className="text-2xl font-bold">
                                  {format(
                                    new Date(flight.departure_time),
                                    'HH:mm'
                                  )}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {flight.origin}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {flight.duration}
                              </div>
                              <div>
                                <p className="text-2xl font-bold">
                                  {format(
                                    new Date(flight.arrival_time),
                                    'HH:mm'
                                  )}
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
                                  USD {economySeat ? economySeat.price : 'N/A'}
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleSelectFare(flight, 'economy')
                                  }
                                >
                                  Select fare
                                </Button>
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-500">First</p>
                                <p className="text-lg font-bold">
                                  USD {premiumSeat ? premiumSeat.price : 'N/A'}
                                </p>
                                <Button
                                  variant="outline"
                                  onClick={() =>
                                    handleSelectFare(flight, 'premium')
                                  }
                                >
                                  Select fare
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Fare Details Dialog */}
        <Dialog open={showFareDetails} onOpenChange={setShowFareDetails}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Fare Details</DialogTitle>
              <DialogDescription>
                Review your selected fare details before proceeding
              </DialogDescription>
            </DialogHeader>
            {(selectedOutgoingFlight || selectedReturnFlight) && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Flight Details</p>
                  <p>
                    {isSelectingReturnFlight && selectedReturnFlight
                      ? `${selectedReturnFlight.origin} → ${selectedReturnFlight.destination}`
                      : selectedOutgoingFlight
                        ? `${selectedOutgoingFlight.origin} → ${selectedOutgoingFlight.destination}`
                        : ''}
                  </p>
                  <p>
                    {format(
                      new Date(
                        isSelectingReturnFlight && selectedReturnFlight
                          ? selectedReturnFlight.departure_time
                          : selectedOutgoingFlight.departure_time
                      ),
                      'HH:mm'
                    )}{' '}
                    -{' '}
                    {format(
                      new Date(
                        isSelectingReturnFlight && selectedReturnFlight
                          ? selectedReturnFlight.arrival_time
                          : selectedOutgoingFlight.arrival_time
                      ),
                      'HH:mm'
                    )}
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
        {/* Footer */}
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
