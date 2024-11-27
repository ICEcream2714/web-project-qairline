import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Sử dụng Label từ shadcn/ui

const FlightStatus = () => {
  const [route, setRoute] = useState({ from: "", to: "" });
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="bg-gray-100 py-6 px-6 md:px-16 max-w-4xl mx-auto rounded-lg shadow-md">
      {/* Tabs Selection */}
      <Tabs defaultValue="route" className="w-full">
        <TabsList className="justify-center">
          <TabsTrigger value="route">By Route</TabsTrigger>
          <TabsTrigger value="flightNumber">By Flight Number</TabsTrigger>
        </TabsList>

        {/* By Route Tab */}
        <TabsContent value="route">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Departure City"
                value={route.from}
                onChange={(e) => setRoute({ ...route, from: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Destination City"
                value={route.to}
                onChange={(e) => setRoute({ ...route, to: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-blue-900 text-white hover:bg-blue-800">
              Check Status
            </Button>
          </div>
        </TabsContent>

        {/* By Flight Number Tab */}
        <TabsContent value="flightNumber">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                placeholder="Enter Flight Number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="flightDate">Date</Label>
              <Input
                id="flightDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-blue-900 text-white hover:bg-blue-800">
              Check Status
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlightStatus;
