import { useState } from "react";
import { Input } from "@/components/ui/input"; // Giả sử bạn đã có component Input trong ứng dụng
import { Button } from "@/components/ui/button"; // Giả sử bạn đã có component Button trong ứng dụng

const FlightStatus = () => {
  const [statusType, setStatusType] = useState("route"); // Mặc định là "By Route"
  const [route, setRoute] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="bg-gray-100 py-6 px-6 md:px-16 max-w-4xl mx-auto rounded-lg shadow-md">
      {/* Tabs lựa chọn */}
      <div className="flex justify-center space-x-8 mb-6">
        <button
          className={`px-6 py-2 text-sm font-medium ${statusType === "route" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"}`}
          onClick={() => setStatusType("route")}
        >
          By Route
        </button>
        <button
          className={`px-6 py-2 text-sm font-medium ${statusType === "flightNumber" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"}`}
          onClick={() => setStatusType("flightNumber")}
        >
          By Flight Number
        </button>
      </div>

      {/* Nội dung theo từng lựa chọn */}
      {statusType === "route" && (
        <div>
          <div className="flex space-x-4 mb-6">
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">From</label>
              <Input
                placeholder="Departure City"
                value={route.split(" ")[0]} // Giả sử user nhập "New York to Doha"
                onChange={(e) => setRoute(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">To</label>
              <Input
                placeholder="Destination City"
                value={route.split(" ")[1]} // Giả sử user nhập "New York to Doha"
                onChange={(e) => setRoute(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button className="bg-blue-900 text-white hover:bg-blue-800">
              Check Status
            </Button>
          </div>
        </div>
      )}

      {statusType === "flightNumber" && (
        <div className="flex mb-6 space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Flight Number</label>
            <Input
              placeholder="Enter Flight Number"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full" />
          </div>
        </div>
      )}

      {/* Nút "Check Status" cho "By Flight Number" */}
      {statusType === "flightNumber" && (
        <div className="flex justify-center">
          <Button className="bg-blue-900 text-white hover:bg-blue-800">
            Check Status
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlightStatus;
