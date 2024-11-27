import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Stopover = () => {
  const [activeTab, setActiveTab] = useState("stopover"); // Tab mặc định là Stopover
  const [tripType, setTripType] = useState("round-trip"); // Mặc định là round-trip

  return (
    <Card className="bg-gray-100 rounded-lg shadow-md">
      {/* Tabs điều hướng */}
      <CardHeader className="border-b">
        <div className="flex justify-center space-x-4 py-4">
          <Button
            variant={activeTab === "stopover" ? "default" : "outline"}
            onClick={() => setActiveTab("stopover")}
          >
            Stopover
          </Button>
          <Button
            variant={activeTab === "flights-hotel" ? "default" : "outline"}
            onClick={() => setActiveTab("flights-hotel")}
          >
            Flights + Hotel
          </Button>
        </div>
      </CardHeader>

      {/* Nội dung tab */}
      <CardContent className="py-6">
        {activeTab === "stopover" && (
          <form className="space-y-6">
            {/* Trip Type */}
            <RadioGroup
              value={tripType}
              onValueChange={(value) => setTripType(value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="round-trip" id="round-trip" />
                <Label htmlFor="round-trip">Round Trip</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-way" id="one-way" />
                <Label htmlFor="one-way">One Way</Label>
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

            {/* Passengers và Class */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Passengers */}
  <div>
    <Label htmlFor="passengers">Number of Passengers</Label>
    <select
      id="passengers"
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      defaultValue=""
    >
      <option value="" disabled>
        Select passengers
      </option>
      <option value="1">1 Passenger</option>
      <option value="2">2 Passengers</option>
      <option value="3">3 Passengers</option>
      <option value="4">4 Passengers</option>
    </select>
  </div>

  {/* Class */}
  <div>
    <Label htmlFor="class">Class</Label>
    <select
      id="class"
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      defaultValue=""
    >
      <option value="" disabled>
        Select class
      </option>
      <option value="economy">Economy</option>
      <option value="business">Business</option>
      <option value="first">First Class</option>
    </select>
  </div>
</div>

          </form>
        )}

        {activeTab === "flights-hotel" && (
          <form className="space-y-6">
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

           {/* Passengers và Class */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Passengers */}
  <div>
    <Label htmlFor="passengers">Number of Passengers</Label>
    <select
      id="passengers"
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      defaultValue=""
    >
      <option value="" disabled>
        Select passengers
      </option>
      <option value="1">1 Passenger</option>
      <option value="2">2 Passengers</option>
      <option value="3">3 Passengers</option>
      <option value="4">4 Passengers</option>
    </select>
  </div>

  {/* Class */}
  <div>
    <Label htmlFor="class">Class</Label>
    <select
      id="class"
      className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      defaultValue=""
    >
      <option value="" disabled>
        Select class
      </option>
      <option value="economy">Economy</option>
      <option value="business">Business</option>
      <option value="first">First Class</option>
    </select>
  </div>
</div>

          </form>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="text-center">
        <Button className="w-full bg-blue-900 text-white hover:bg-blue-800">
          Search
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Stopover;
