import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function BookAFlight() {
  const [tripType, setTripType] = useState("return");
  const [isOpen, setIsOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    class: "economy",
  });

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: operation === "increase" ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  const handleClassChange = (value) => {
    setPassengers((prev) => ({ ...prev, class: value }));
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {/* Trip Type Options */}
      <RadioGroup
        value={tripType}
        onValueChange={(value) => setTripType(value)}
        className="flex items-center space-x-8"
      >
        {["return", "one-way", "multi-city"].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <RadioGroupItem
              value={type}
              id={`trip-type-${type}`}
              className="text-purple-600"
            />
            <Label
              htmlFor={`trip-type-${type}`}
              className={`text-lg font-medium`}
            >
              {type === "return" ? "Return" : type === "one-way" ? "One way" : "Multi-city"}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="relative">
          <Label htmlFor="from" className="block text-sm text-gray-600 mb-1">
            From
          </Label>
          <Input id="from" type="text" placeholder="From" className="pl-10" />
          <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">⇄</span>
        </div>
        <div>
          <Label htmlFor="to" className="block text-sm text-gray-600 mb-1">
            To
          </Label>
          <Input id="to" type="text" placeholder="To" />
        </div>
        <div>
          <Label htmlFor="departure" className="block text-sm text-gray-600 mb-1">
            Departure
          </Label>
          <Input id="departure" type="date" />
        </div>
        {tripType === "return" && (
          <div>
            <Label htmlFor="return" className="block text-sm text-gray-600 mb-1">
              Return
            </Label>
            <Input id="return" type="date" />
          </div>
        )}
      </div>

      {/* Passenger Selector */}
      <div className="mt-6 flex justify-between items-center">
      <div className="relative w-full max-w-xs">
      <Button
        onClick={toggleDropdown}
        className="w-full border border-gray-300 rounded-md p-2 text-left bg-white text-gray-700"
      >
        {`${passengers.adults + passengers.children + passengers.infants} Passenger${
          passengers.adults + passengers.children + passengers.infants > 1 ? "s" : ""
        } ${passengers.class === "economy" ? "Economy" : "Premium"}`}
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Passengers Section */}
          <div className="p-4 space-y-4">
            <Label className="text-sm font-medium">Passengers</Label>

            {[
              { label: "Adults", type: "adults", age: "12+ years" },
              { label: "Child", type: "children", age: "2-11 years" },
              { label: "Infant", type: "infants", age: "Under 2 years" },
            ].map(({ label, type, age }) => (
              <div key={type} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700">{label}</p>
                  <p className="text-xs text-gray-500">{age}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePassengerChange(type, "decrease")}
                  >
                    −
                  </Button>
                  <span>{passengers[type]}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePassengerChange(type, "increase")}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Class Section */}
          <div className="p-4 border-t space-y-4">
            <Label className="text-sm font-medium">Class</Label>
            <RadioGroup
              value={passengers.class}
              onValueChange={handleClassChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="economy" id="economy" />
                <Label htmlFor="economy" className="text-gray-700">
                  Economy
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="premium" id="premium" />
                <Label htmlFor="premium" className="text-gray-700">
                  Premium (Business/First)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Confirm Button */}
          <div className="p-4 border-t">
            <Button
              className="w-full bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => setIsOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </div>
        <Button className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-lg">
          Search flights
        </Button>
      </div>
    </div>
  );
}
