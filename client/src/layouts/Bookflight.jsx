import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const BookAFlight = () => {
  const [travelType, setTravelType] = useState("round-trip");

  return (
    <div className="bg-gray-100 py-8 px-4 md:px-12 rounded-lg shadow-md">
      {/* Nội dung Form */}
      <form className="space-y-6">
        {/* Row 1: Travel Type (Radio buttons) */}
        <div className="flex justify-between items-center mb-6 space-x-6">
          <label className="inline-flex items-center text-sm">
            <input
              type="radio"
              name="travelType"
              value="round-trip"
              checked={travelType === "round-trip"}
              onChange={() => setTravelType("round-trip")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Return</span>
          </label>
          <label className="inline-flex items-center text-sm">
            <input
              type="radio"
              name="travelType"
              value="one-way"
              checked={travelType === "one-way"}
              onChange={() => setTravelType("one-way")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2">One way</span>
          </label>
          <label className="inline-flex items-center text-sm">
            <input
              type="radio"
              name="travelType"
              value="multi-city"
              checked={travelType === "multi-city"}
              onChange={() => setTravelType("multi-city")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2">Multi-city</span>
          </label>
        </div>

        {/* Row 2: From, To, Dates (Các ô nhập liền nhau) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">From</label>
            <Input placeholder="Enter departure city" />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">To</label>
            <Input placeholder="Enter destination city" />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">Departure</label>
            <Input type="date" />
          </div>
          {travelType === "round-trip" && (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700">Return</label>
              <Input type="date" />
            </div>
          )}
        </div>

        {/* Row 3: Passengers & Class */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">Passengers</label>
            <Select>
              <SelectTrigger placeholder="1 Passenger" />
              <SelectContent>
                <SelectItem value="1">1 Passenger</SelectItem>
                <SelectItem value="2">2 Passengers</SelectItem>
                <SelectItem value="3">3 Passengers</SelectItem>
                <SelectItem value="4">4 Passengers</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700">Class</label>
            <Select>
              <SelectTrigger placeholder="Economy" />
              <SelectContent>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="first">First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Add promo code */}
        <div className="text-center mb-6">
          <span className="text-blue-600 cursor-pointer">+ Add promo code</span>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button variant="default" size="lg" className="bg-purple-700 text-white hover:bg-purple-600">
            Search flights
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookAFlight;
