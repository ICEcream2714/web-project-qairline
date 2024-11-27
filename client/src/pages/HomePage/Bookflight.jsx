import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const BookAFlight = () => {
  const [travelType, setTravelType] = useState("round-trip");

  return (
    <div className="bg-gray-100 py-8 px-6 md:px-12 rounded-lg shadow-md">
      <form className="space-y-6">
        {/* Travel Type (Radio Buttons) */}
        <RadioGroup
          value={travelType}
          onValueChange={(value) => setTravelType(value)}
          className="flex justify-between items-center space-x-6"
        >
          {["round-trip", "one-way", "multi-city"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <RadioGroupItem id={type} value={type} className="text-blue-600" />
              <Label htmlFor={type} className="text-sm capitalize">
                {type.replace("-", " ")}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* From, To, Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="from">From</Label>
            <Input id="from" placeholder="Enter departure city" />
          </div>
          <div>
            <Label htmlFor="to">To</Label>
            <Input id="to" placeholder="Enter destination city" />
          </div>
          <div>
            <Label htmlFor="departure">Departure</Label>
            <Input id="departure" type="date" />
          </div>
          {travelType === "round-trip" && (
            <div>
              <Label htmlFor="return">Return</Label>
              <Input id="return" type="date" />
            </div>
          )}
        </div>

        {/* Passengers & Class */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Passengers */}
  <div>
    <Label htmlFor="passengers">Passengers</Label>
    <select
      id="passengers"
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    >
      {[1, 2, 3, 4].map((count) => (
        <option key={count} value={count}>
          {count} {count > 1 ? "Passengers" : "Passenger"}
        </option>
      ))}
    </select>
  </div>

  {/* Class */}
  <div>
    <Label htmlFor="class">Class</Label>
    <select
      id="class"
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
    >
      {["economy", "business", "first"].map((cls) => (
        <option key={cls} value={cls}>
          {cls.charAt(0).toUpperCase() + cls.slice(1)}
        </option>
      ))}
    </select>
  </div>
</div>


        {/* Promo Code */}
        <div className="text-center">
          <Button variant="link" className="text-blue-600">
            + Add promo code
          </Button>
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
