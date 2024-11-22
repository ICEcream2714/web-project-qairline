import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's UI library.
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/ui/toast"; // Assuming you're using ShadCN's Toast for error handling

const ManageBooking = () => {
  const [bookingCode, setBookingCode] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    // Logic to handle booking search
    if (!bookingCode || !lastName || !birthDate) {
      setErrorMessage("Please fill in all fields.");
      setIsError(true);
    } else {
      // Assume success in finding booking
      setIsError(false);
      // Here you would typically handle a successful booking search.
    }
  };

  return (
    <div className="bg-gray-100 py-8 px-6 md:px-12 rounded-lg shadow-md max-w-lg mx-auto">

      {/* Booking Search Form */}
      <form className="space-y-6">
        {/* Booking Reference */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Booking Reference</label>
          <Input
            placeholder="Enter your booking reference"
            value={bookingCode}
            onChange={(e) => setBookingCode(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Last Name</label>
          <Input
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleSubmit}
            className="bg-blue-900 text-white hover:bg-blue-800"
          >
            Search Booking
          </Button>
        </div>
      </form>

      {/* Error Toast */}
      {isError && (
        <Toast variant="error" className="mt-6">
          <div className="text-red-600">{errorMessage}</div>
        </Toast>
      )}

      {/* Success Message or Results would appear here */}
      {!isError && bookingCode && lastName && birthDate && (
        <div className="mt-6 text-center text-green-600">
          <p>Booking found for {lastName}, {bookingCode}!</p>
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
