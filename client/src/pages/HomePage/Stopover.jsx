import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Stopover = () => {
  const [activeTab, setActiveTab] = useState("stopover");
  const [tripType, setTripType] = useState("round-trip");
  const [isOpen, setIsOpen] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    class: "economy",
    rooms: 1, // Add rooms state
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

  const handleRoomChange = (operation) => {
    setPassengers((prev) => ({
      ...prev,
      rooms: operation === "increase" ? prev.rooms + 1 : Math.max(prev.rooms - 1, 1),
    }));
  };

  return (
    <Card className="bg-white rounded-lg shadow-md p-6">
      {/* Tabs điều hướng */}
      <CardHeader className="border-b">
  <div className="flex">
    <Button
      variant="ghost"
      onClick={() => setActiveTab("stopover")}
      className={`flex-1 py-2 text-center text-lg font-medium transition-all duration-300 ${
        activeTab === "stopover"
          ? "text-purple-600 border-b-4 border-purple-600"
          : "text-gray-600 hover:text-purple-500"
      }`}
    >
      Stopover
    </Button>
    <Button
      variant="ghost"
      onClick={() => setActiveTab("flights-hotel")}
      className={`flex-1 py-2 text-center text-lg font-medium transition-all duration-300 ${
        activeTab === "flights-hotel"
          ? "text-purple-600 border-b-4 border-purple-600"
          : "text-gray-600 hover:text-purple-500"
      }`}
    >
      Flights + Hotel
    </Button>
  </div>
</CardHeader>


      {/* Nội dung tab */}
      <CardContent className="py-6">
        {activeTab === "stopover" && (
          <div className="space-y-6">
            {/* Trip Type */}
            <RadioGroup
              value={tripType}
              onValueChange={(value) => setTripType(value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" className="text-purple-600" />
                <Label htmlFor="round-trip" className="text-lg font-medium">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" className="text-purple-600"/>
                <Label htmlFor="one-way" className="text-lg font-medium">One Way</Label>
              </div>
            </RadioGroup>

            {/* From, To, Departure Date, Return Date */}
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
                <Label htmlFor="departure">Departure Date</Label>
                <Input id="departure" type="date" />
              </div>
              <div>
                <Label htmlFor="return">Return Date</Label>
                <Input id="return" type="date" />
              </div>
            </div>

            {/* Passengers and Class */}
            <div className="mt-6 flex justify-between items-center">
              <div className="relative w-full max-w-xs">
                <Button
                  onClick={toggleDropdown}
                  className="w-full border border-gray-300 rounded-md p-2 text-left bg-white text-gray-700"
                >
                  {`${passengers.adults + passengers.children + passengers.infants} Passenger${
                    passengers.adults + passengers.children + passengers.infants > 1 ? "s" : ""
                  } ${passengers.class === "economy" ? "Economy" : "Premium"} | ${passengers.rooms} Room${
                    passengers.rooms >= 1 ? "s" : "1 Room"
                  }`}
                </Button>

                {isOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {/* Passengers Section */}
                    <div className="p-4 space-y-4">
                      <Label className="text-sm font-medium">Passengers</Label>

                      {[{ label: "Adults", type: "adults", age: "12+ years" },
                        { label: "Child", type: "children", age: "2-11 years" },
                        { label: "Infant", type: "infants", age: "Under 2 years" }]
                        .map(({ label, type, age }) => (
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

                    {/* Room Section */}
                    <div className="p-4 border-t space-y-4">
                      <Label className="text-sm font-medium">Rooms</Label>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange("decrease")}
                        >
                          −
                        </Button>
                        <span>{passengers.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange("increase")}
                        >
                          +
                        </Button>
                      </div>
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
        )}

        {activeTab === "flights-hotel" && (
          <div className="space-y-6">
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
                <Label htmlFor="departure">Departure Date</Label>
                <Input id="departure" type="date" />
              </div>
              <div>
                <Label htmlFor="return">Return Date</Label>
                <Input id="return" type="date" />
              </div>
            </div>

            {/* Passengers and Rooms Section */}
            <div className="mt-6 flex justify-between items-center">
              <div className="relative w-full max-w-xs">
                <Button
                  onClick={toggleDropdown}
                  className="w-full border border-gray-300 rounded-md p-2 text-left bg-white text-gray-700"
                >
                  {`${passengers.adults + passengers.children + passengers.infants} Passenger${
                    passengers.adults + passengers.children + passengers.infants > 1 ? "s" : ""
                  } ${passengers.class === "economy" ? "Economy" : "Premium"} | ${passengers.rooms} Room${
                    passengers.rooms >= 1 ? "s" : "1 Room"
                  }`}
                </Button>

                {isOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    {/* Passengers Section */}
                    <div className="p-4 space-y-4">
                      <Label className="text-sm font-medium">Passengers</Label>

                      {[{ label: "Adults", type: "adults", age: "12+ years" },
                        { label: "Child", type: "children", age: "2-11 years" },
                        { label: "Infant", type: "infants", age: "Under 2 years" }]
                        .map(({ label, type, age }) => (
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

                    {/* Room Section */}
                    <div className="p-4 border-t space-y-4">
                      <Label className="text-sm font-medium">Rooms</Label>
                      <div className="flex justify-between items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange("decrease")}
                        >
                          −
                        </Button>
                        <span>{passengers.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRoomChange("increase")}
                        >
                          +
                        </Button>
                      </div>
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
        )}
      </CardContent>
    </Card>
  );
};

export default Stopover;
