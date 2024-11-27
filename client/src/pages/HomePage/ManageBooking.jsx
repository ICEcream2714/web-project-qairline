import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ManageBooking = () => {
  const [bookingCode, setBookingCode] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!bookingCode || !lastName || !birthDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Booking Found",
        description: `Booking for ${lastName} with reference ${bookingCode} retrieved.`,
        variant: "success",
      });
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">Manage Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* Booking Reference */}
          <div>
            <Label htmlFor="bookingCode">Booking Reference</Label>
            <Input
              id="bookingCode"
              placeholder="Enter your booking reference"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSubmit} className="w-full bg-blue-600 text-white hover:bg-blue-700">
          Search Booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ManageBooking;
