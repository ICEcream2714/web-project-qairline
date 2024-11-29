import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ManageBooking = () => {
  const [activeTab, setActiveTab] = useState("manage_booking");
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
        title: activeTab === "manage_booking" ? "Booking Found" : "Check-in Successful",
        description: activeTab === "manage_booking"
          ? `Booking for ${lastName} with reference ${bookingCode} retrieved.`
          : `Check-in for ${lastName} with reference ${bookingCode} completed.`,
        variant: "success",
      });
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md p-6">
      <CardHeader className="border-b">
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("manage_booking")}
            className={`flex-1 py-2 text-center text-lg font-medium transition-all duration-300 ${
              activeTab === "manage_booking"
                ? "text-purple-600 border-b-4 border-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            Manage Booking
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("checkin")}
            className={`flex-1 py-2 text-center text-lg font-medium transition-all duration-300 ${
              activeTab === "checkin"
                ? "text-purple-600 border-b-4 border-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            Checkin
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form className="flex items-center gap-4">
          {/* Booking Reference */}
          <div className="flex-1">
            <Label htmlFor="bookingCode">Booking Reference</Label>
            <Input
              id="bookingCode"
              placeholder="Enter your booking reference"
              value={bookingCode}
              onChange={(e) => setBookingCode(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="flex-1">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex-1">
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-5">
            <Button
              onClick={handleSubmit}
              className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg"
            >
              {activeTab === "manage_booking" ? "Retrieve Booking" : "Checkin"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManageBooking;
