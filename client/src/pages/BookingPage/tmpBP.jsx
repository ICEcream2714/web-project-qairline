import Navbar from '@/layouts/Navbar/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
import { Card, CardContent } from '@/components/ui/card';

function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Nhận dữ liệu từ location.state

  const [outgoingFlights, setOutgoingFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);

  const [outgoingDates, setOutgoingDates] = useState([]);
  const [returnDates, setReturnDates] = useState([]);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showFareDetails, setShowFareDetails] = useState(false);

  const [selectedOutgoingDate, setSelectedOutgoingDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);

  // Lấy dữ liệu chuyến bay từ location.state
  useEffect(() => {
    if (location.state && location.state.flights) {
      const flightsData = location.state.flights;

      // Tách mảng outgoing và return
      setOutgoingFlights(flightsData.flights.outgoing);
      setReturnFlights(flightsData.flights.return);
    }
  }, [location.state]);

  // Tạo mảng outgoingDates và returnDates từ outgoingFlights và returnFlights
  useEffect(() => {
    const outgoingDates = outgoingFlights.map((flight) => {
      const departureDate = new Date(flight.departure_time);
      return departureDate.toISOString().split('T')[0]; // Chỉ lấy phần ngày
    });
    outgoingDates.sort((a, b) => new Date(a) - new Date(b));

    const returnDates = returnFlights.map((flight) => {
      const returnDate = new Date(flight.departure_time);
      return returnDate.toISOString().split('T')[0];
    });
    returnDates.sort((a, b) => new Date(a) - new Date(b));

    setOutgoingDates(outgoingDates);
    setReturnDates(returnDates);
  }, [outgoingFlights, returnFlights]);

  const handleOutgoingDateSelect = (date) => {
    setSelectedOutgoingDate(date);
    setSelectedReturnDate(null); // Reset selected return date
  };

  const handleReturnDateSelect = (date) => {
    setSelectedReturnDate(date);
  };

  const handleSelectFare = (flight, fareType) => {
    setSelectedFlight({ ...flight, fareType });
    setShowFareDetails(true);
  };

  const handleConfirmBooking = () => {
    navigate('/booking/passenger-details');
  };

  return (
    <div className="h-auto bg-slate-50">
      <Navbar />
      <main className="bg-slate-200 pt-28 md:px-10">
        {/* Header */}
        <div>
          <p>{`Today: ${new Date().toUTCString()}`}</p>
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

        {/* Tabs for selecting flights */}
        <div className="mb-8 overflow-x-auto">
          <Tabs value={selectedOutgoingDate}>
            <TabsList className="h-auto w-full gap-0 rounded-t-lg">
              {outgoingDates.map((date) => (
                <TabsTrigger
                  key={date}
                  value={date}
                  onClick={() => handleOutgoingDateSelect(date)}
                  className="flex w-full flex-col gap-1 rounded-t-lg p-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
                >
                  <span className="text-sm">
                    {format(new Date(date), 'EEE, d MMM')}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tabs content for outgoing flights */}
            <TabsContent value={selectedOutgoingDate}>
              <div className="grid gap-4">
                {outgoingFlights
                  .filter(
                    (flight) =>
                      new Date(flight.departure_time)
                        .toISOString()
                        .split('T')[0] === selectedOutgoingDate
                  )
                  .map((flight) => (
                    <Card key={flight.id}>
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
                                {format(new Date(flight.arrival_time), 'HH:mm')}
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
                                USD {flight.firstPrice}
                              </p>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleSelectFare(flight, 'first')
                                }
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
            </TabsContent>

            {/* Conditional Tabs for return flights */}
            {selectedOutgoingDate && returnDates.length > 0 && (
              <>
                <TabsList className="h-auto w-full gap-0 rounded-t-lg">
                  {returnDates.map((date) => (
                    <TabsTrigger
                      key={date}
                      value={date}
                      onClick={() => handleReturnDateSelect(date)}
                      className="flex w-full flex-col gap-1 rounded-t-lg p-4 data-[state=active]:border-b-2 data-[state=active]:border-purple-600"
                    >
                      <span className="text-sm">
                        {format(new Date(date), 'EEE, d MMM')}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Tabs content for return flights */}
                <TabsContent value={selectedReturnDate}>
                  <div className="grid gap-4">
                    {returnFlights
                      .filter(
                        (flight) =>
                          new Date(flight.departure_time)
                            .toISOString()
                            .split('T')[0] === selectedReturnDate
                      )
                      .map((flight) => (
                        <Card key={flight.id}>
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
                                  <p className="text-sm text-gray-500">
                                    Economy
                                  </p>
                                  <p className="text-lg font-bold">
                                    USD {flight.economyPrice}
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
                                    USD {flight.firstPrice}
                                  </p>
                                  <Button
                                    variant="outline"
                                    onClick={() =>
                                      handleSelectFare(flight, 'first')
                                    }
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
                </TabsContent>
              </>
            )}
          </Tabs>
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
            {selectedFlight && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Flight Details</p>
                  <p>
                    {selectedFlight.origin} → {selectedFlight.destination}
                  </p>
                  <p>
                    {format(new Date(selectedFlight.departure_time), 'HH:mm')} -{' '}
                    {format(new Date(selectedFlight.arrival_time), 'HH:mm')}
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
