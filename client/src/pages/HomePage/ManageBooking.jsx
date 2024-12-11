import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/DatePicker';

const ManageBooking = () => {
  const [activeTab, setActiveTab] = useState('manage_booking');
  const [bookingCode, setBookingCode] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!bookingCode || !lastName || !birthDate) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
    } else {
      toast({
        title:
          activeTab === 'manage_booking'
            ? 'Booking Found'
            : 'Check-in Successful',
        description:
          activeTab === 'manage_booking'
            ? `Booking for ${lastName} with reference ${bookingCode} retrieved.`
            : `Check-in for ${lastName} with reference ${bookingCode} completed.`,
        variant: 'success',
      });
    }
  };

  return (
    <Card className="rounded-lg bg-white p-0 shadow-md">
      <CardHeader className="border-b">
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('manage_booking')}
            className={`flex-1 py-1 text-center text-lg font-medium ${
              activeTab === 'manage_booking'
                ? 'border-b-2 border-purple-600 text-purple-600 hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-purple-500'
            }`}
          >
            Manage Booking
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('checkin')}
            className={`flex-1 py-2 text-center text-lg font-medium ${
              activeTab === 'checkin'
                ? 'border-b-2 border-purple-600 text-purple-600 hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-purple-500'
            }`}
          >
            Checkin
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form className="flex pt-4 flex-col gap-4 md:flex-row md:gap-6">
          {/* Booking Reference */}
          <div className="w-full flex-1 md:w-auto">
            <Label htmlFor="bookingCode">Booking Reference</Label>
            <Input
              id="bookingCode"
              placeholder="Enter your booking reference"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Last Name */}
          <div className="w-full flex-1 md:w-auto">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Date of Birth */}
          <div className="w-full flex-1 md:w-auto">
            <Label htmlFor="birthDate">Date of Birth</Label>
            <DatePicker id = "birthDate" date = {birthDate} setDate={setBirthDate}/>
              {birthDate && <p className="mt-4 text-gray-600">Selected Date: {birthDate}</p>}
          </div>

          {/* Submit Button */}
          <div className="mt-5 w-full md:w-auto">
            <Button
              onClick={handleSubmit}
              className="w-full rounded-lg bg-purple-600 py-3 text-white hover:bg-purple-700 md:w-auto"
            >
              {activeTab === 'manage_booking' ? 'Retrieve Booking' : 'Checkin'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageBooking;
