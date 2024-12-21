import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { NavbarSimple } from '@/layouts/Navbar/NavbarSimple';
import AlertDialog from '@/layouts/Notification/alert-dialog';
import Booking from '@/pages/HomePage/Booking';
import StartPlanning from '../HomePage/PlanningCard';
import Navbar from '@/layouts/Navbar/Navbar';
import Footer from '@/layouts/Footer';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const currentScrollY = window.scrollY;

      // If the current scroll position is greater than the last scroll position, hide the Navbar
      if (currentScrollY >= lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  //alert dialog state
  const [alert, setAlert] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  const { totalPrice, outboundFlight, returnFlight, passengerDetails } =
    location.state || {
      totalPrice: 0,
      outboundFlight: null,
      returnFlight: null,
      passengerDetails: {},
    }; // Retrieve total price, flight details, and passenger details from location.state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    paymentMethod: 'Credit Card', // Default payment method
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingData = {
      totalPrice,
      outboundFlight: {
        ...outboundFlight,
        seat_id: outboundFlight.seatId, // Use the seat ID from state
      },
      returnFlight: returnFlight
        ? {
            ...returnFlight,
            seat_id: returnFlight.seatId, // Use the seat ID from state
          }
        : null,
      passengerDetails,
      paymentDetails: paymentData,
    };

    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      console.log('token: ', token);
      const response = await fetch('http://localhost:5000/api/customer/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', // Include token in headers
        },
        body: JSON.stringify(bookingData),
      });
      console.log('bookingData: ', bookingData),
        console.log('Response:', response);

      if (response.ok) {
        setAlert({
          open: true,
          title: 'QAirline',
          message: 'Booking confirmed! Thank you for your purchase.',
          isSuccess: true,
        });

        setTimeout(() => {
          navigate('/');
        }, 3000);
      } else {
        const errorText = await response.text(); // Read response as text
        try {
          const errorData = JSON.parse(errorText); // Try to parse as JSON
          setAlert({
            open: true,
            title: 'QAirline',
            message: `Error: ${errorData.message}`,
            isSuccess: false,
          });
        } catch {
          setAlert({
            open: true,
            title: 'QAirline',
            message: `Error: ${errorText}`,
            isSuccess: false,
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setAlert({
        open: true,
        title: 'QAirline',
        message: `An error occurred while processing your booking.`,
        isSuccess: false,
      });
    }
  };

  return (
    <div className="-mt-11">
      {/* Navbar */}
      {isVisible && <Navbar />}
      <Booking />
      {/* Main */}
      <div className="-mt-20 sm:px-3 md:h-full md:px-10">
        <div className="container relative z-20 mx-auto -mt-24 px-3 md:px-28 lg:px-16">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-3 lg:col-span-2">
              <Card className="px-3 py-7 shadow-lg">
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
                    <AlertDialog
                      open={alert.open}
                      onClose={() => setAlert({ ...alert, open: false })}
                      title={alert.title}
                      message={alert.message}
                      isSuccess={alert.isSuccess}
                    />
                  </form>
                </CardContent>
              </Card>
            </div>
            <div className="col-span-3 lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
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
                            {format(
                              new Date(returnFlight.arrival_time),
                              'HH:mm'
                            )}
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
                      <span className="font-medium">Total trip price:</span>
                      <span className="text-xl font-bold text-secondary">
                        {totalPrice.toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <StartPlanning />
      </div>
      <div className="-mt-10">
        <Footer />
      </div>
    </div>
  );
}
