import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

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
      <div className="container mx-auto px-4 py-8">
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
            <Card>
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outboundFlight && (
                    <div>
                      <h3 className="font-medium">Outbound Flight</h3>
                      <p className="text-sm text-gray-500">
                        {outboundFlight.origin} → {outboundFlight.destination}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(
                          new Date(outboundFlight.departure_time),
                          'EEE, d MMM yyyy'
                        )}
                      </p>
                    </div>
                  )}
                  {returnFlight && (
                    <div>
                      <h3 className="font-medium">Return Flight</h3>
                      <p className="text-sm text-gray-500">
                        {returnFlight.origin} → {returnFlight.destination}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(
                          new Date(returnFlight.departure_time),
                          'EEE, d MMM yyyy'
                        )}
                      </p>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Price</span>
                      <span className="font-bold">USD {totalPrice}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
