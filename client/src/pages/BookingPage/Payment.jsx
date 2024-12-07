import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice, outboundFlight, returnFlight } = location.state || {
    totalPrice: 0,
    outboundFlight: null,
    returnFlight: null,
  }; // Retrieve total price and flight details from location.state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment processing here
    alert('Booking confirmed! Thank you for your purchase.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cardholderName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          cardNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            expiryDate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        type="password"
                        maxLength={3}
                        value={paymentData.cvv}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            cvv: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Complete Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
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
                      <span className="font-medium">Total Amount</span>
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
