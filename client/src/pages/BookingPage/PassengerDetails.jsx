import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { NavbarSimple } from '@/layouts/Navbar/NavbarSimple';
import Footer from '@/layouts/Footer';

export default function PassengerDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice, outboundFlight, returnFlight } = location.state || {
    totalPrice: 0,
    outboundFlight: null,
    returnFlight: null,
  }; // Retrieve total price from location.state

  console.log('Outbound Seat ID:', outboundFlight?.seatId);
  console.log('Return Seat ID:', returnFlight?.seatId);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/booking/payment', {
      state: {
        totalPrice,
        outboundFlight: {
          ...outboundFlight,
          seatId: outboundFlight.seatId,
        },
        returnFlight: returnFlight
          ? {
              ...returnFlight,
              seatId: returnFlight.seatId,
            }
          : null,
        passengerDetails: formData,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarSimple />
      <div className="container mx-auto px-28 py-36">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Passenger Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="rounded-lg border border-gray-200 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-primary">
                  Your trip review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Outbound Flight */}
                {outboundFlight && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Outbound flight
                    </h3>
                    <div className="flex justify-between text-sm font-medium">
                      <div className="w-1/3 text-center">
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(outboundFlight.departure_time),
                            'EEE, dd MMM yyyy'
                          )}
                        </p>
                        <p className="text-lg font-bold">
                          {format(
                            new Date(outboundFlight.departure_time),
                            'HH:mm'
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {outboundFlight.origin}
                        </p>
                      </div>
                      <div className="flex w-1/3 flex-col items-center justify-center">
                        <span className="text-gray-500">
                          {outboundFlight.duration}
                        </span>
                        <div className="h-px w-full bg-gray-300"></div>
                      </div>
                      <div className="w-1/3 text-center">
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(outboundFlight.arrival_time),
                            'EEE, dd MMM yyyy'
                          )}
                        </p>
                        <p className="text-lg font-bold">
                          {format(
                            new Date(outboundFlight.arrival_time),
                            'HH:mm'
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {outboundFlight.destination}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Return Flight */}
                {returnFlight && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Return flight
                    </h3>
                    <div className="flex justify-between text-sm font-medium">
                      <div className="w-1/3 text-center">
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(returnFlight.departure_time),
                            'EEE, dd MMM yyyy'
                          )}
                        </p>
                        <p className="text-lg font-bold">
                          {format(
                            new Date(returnFlight.departure_time),
                            'HH:mm'
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {returnFlight.origin}
                        </p>
                      </div>
                      <div className="flex w-1/3 flex-col items-center justify-center">
                        <span className="text-gray-500">
                          {returnFlight.duration}
                        </span>
                        <div className="my-1 h-px w-full bg-gray-300"></div>
                      </div>
                      <div className="w-1/3 text-center">
                        <p className="text-sm text-gray-500">
                          {format(
                            new Date(returnFlight.arrival_time),
                            'EEE, dd MMM yyy'
                          )}
                        </p>
                        <p className="text-lg font-bold">
                          {format(new Date(returnFlight.arrival_time), 'HH:mm')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {returnFlight.destination}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Price */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">
                      Total trip price:
                    </span>
                    <span className="text-xl font-bold">
                      {totalPrice.toFixed(2)} USD
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
