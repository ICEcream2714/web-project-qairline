import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Stopover = () => {
  const [activeTab, setActiveTab] = useState("stopover"); // Tab mặc định là Stopover
  const [tripType, setTripType] = useState("round-trip"); // Mặc định là round-trip

  return (
    <div className="bg-gray-100 py-8 px-6 md:px-12 rounded-lg shadow-md">
      {/* Tabs điều hướng */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("stopover")}
          className={`px-6 py-2 text-sm font-medium rounded-lg ${
            activeTab === "stopover"
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Stopover
        </button>
        <button
          onClick={() => setActiveTab("flights-hotel")}
          className={`px-6 py-2 text-sm font-medium rounded-lg ${
            activeTab === "flights-hotel"
              ? "bg-blue-900 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Flights + Hotel
        </button>
      </div>

      {/* Nội dung tương ứng */}
      <div>
        {/* Tab Stopover */}
        {activeTab === "stopover" && (
          <div>
            <form className="space-y-6">
              {/* Trip Type (One Way / Round Trip) */}
              <div className="flex space-x-6 mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="round-trip"
                    checked={tripType === "round-trip"}
                    onChange={() => setTripType("round-trip")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">Round Trip</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tripType"
                    value="one-way"
                    checked={tripType === "one-way"}
                    onChange={() => setTripType("one-way")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">One Way</span>
                </label>
              </div>

              {/* From, To, Departure Date, and Return Date (Liền nhau trong 1 dòng) */}
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
                  <label className="text-gray-700">Departure Date</label>
                  <Input type="date" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-gray-700">Return Date</label>
                  <Input type="date" />
                </div>
              </div>

              {/* Passengers và Class trong cùng 1 dòng */}
              <div className="flex justify-between mb-6">
                <div className="flex flex-col space-y-2 w-1/2 pr-4">
                  <label className="text-gray-700">Number of Passengers</label>
                  <Select>
                    <SelectTrigger placeholder="Select passengers" />
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2 w-1/2 pl-4">
                  <label className="text-gray-700">Class</label>
                  <Select>
                    <SelectTrigger placeholder="Select class" />
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-blue-900 text-white hover:bg-blue-800"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Tab Flights + Hotel */}
        {activeTab === "flights-hotel" && (
          <div>
            <form className="space-y-6">
              {/* From, To, Departure Date, and Return Date (Liền nhau trong 1 dòng) */}
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
                  <label className="text-gray-700">Departure Date</label>
                  <Input type="date" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-gray-700">Return Date</label>
                  <Input type="date" />
                </div>
              </div>

              {/* Passengers và Class trong cùng 1 dòng */}
              <div className="flex justify-between mb-6">
                <div className="flex flex-col space-y-2 w-1/2 pr-4">
                  <label className="text-gray-700">Number of Passengers</label>
                  <Select>
                    <SelectTrigger placeholder="Select passengers" />
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4 Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2 w-1/2 pl-4">
                  <label className="text-gray-700">Class</label>
                  <Select>
                    <SelectTrigger placeholder="Select class" />
                    <SelectContent>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <div className="text-center">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-blue-900 text-white hover:bg-blue-800"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopover;
