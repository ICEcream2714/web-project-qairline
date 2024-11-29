import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const FlightStatus = () => {
  const [activeTab, setActiveTab] = useState("route");
  const [route, setRoute] = useState({ from: "", to: "" });
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (activeTab === "route" && (!route.from || !route.to || !date)) {
      alert("Please fill in all required fields for route search.");
    } else if (activeTab === "flightNumber" && (!flightNumber || !date)) {
      alert("Please fill in all required fields for flight number search.");
    } else {
      alert(
        activeTab === "route"
          ? `Searching flights from ${route.from} to ${route.to} on ${date}.`
          : `Searching flight ${flightNumber} on ${date}.`
      );
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      {/* Header Tabs */}
      <CardHeader className="border-b mb-4">
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => setActiveTab("route")}
            className={`flex-1 py-2 text-center text-lg font-medium transition-all duration-300 ${
              activeTab === "route"
                ? "text-purple-600 border-b-4 border-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            By Route
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("flightNumber")}
            className={`flex-1 py-2 text-center text-lg font-medium transition-all duration-300 ${
              activeTab === "flightNumber"
                ? "text-purple-600 border-b-4 border-purple-600"
                : "text-gray-600 hover:text-purple-500"
            }`}
          >
            By Flight Number
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {activeTab === "route" ? (
          <form className="flex items-center gap-4">
            {/* From */}
            <div className="flex-1">
              <Label htmlFor="from">From</Label>
              <Input
                id="from"
                placeholder="Enter departure city"
                value={route.from}
                onChange={(e) =>
                  setRoute({ ...route, from: e.target.value })
                }
              />
            </div>
            {/* To */}
            <div className="flex-1">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                placeholder="Enter destination city"
                value={route.to}
                onChange={(e) => setRoute({ ...route, to: e.target.value })}
              />
            </div>
            {/* Date */}
            <div className="flex-1">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </form>
        ) : (
          <form className="flex items-center gap-4">
            {/* Flight Number */}
            <div className="flex-1">
              <Label htmlFor="flightNumber">Flight Number</Label>
              <Input
                id="flightNumber"
                placeholder="Enter flight number"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
              />
            </div>
            {/* Date */}
            <div className="flex-1">
              <Label htmlFor="flightDate">Date</Label>
              <Input
                id="flightDate"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </form>
        )}

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSearch}
            className="bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 rounded-lg"
          >
            Check Status
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightStatus;
