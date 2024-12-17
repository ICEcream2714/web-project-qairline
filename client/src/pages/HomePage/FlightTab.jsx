import { useState } from "react";
import BookAFlight from "@/pages/HomePage/Bookflight";
import StopoverPackage from "./Stopover";
import ManageBooking from "./ManageBooking";
import FlightStatus from "./FlightStatus";

// shadcn components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FlightTabs = () => {
  const [activeTab, setActiveTab] = useState("book");

  return (
    <div className="relative bg-gray-100 py-6 px-6 md:px-12 max-w-4xl mx-auto rounded-lg shadow-md">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* Tabs List */}
        <TabsList className="flex justify-center space-x-4 mb-6">
          <TabsTrigger
            value="book"
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "book" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"
            }`}
          >
            Book a Flight
          </TabsTrigger>
          <TabsTrigger
            value="stopover"
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "stopover" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"
            }`}
          >
            Stop Over
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "manage" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"
            }`}
          >
            Manage Booking
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className={`px-6 py-2 text-sm font-medium ${
              activeTab === "status" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"
            }`}
          >
            Flight Status
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="book">
          <BookAFlight />
        </TabsContent>
        <TabsContent value="stopover">
          <StopoverPackage />
        </TabsContent>
        <TabsContent value="manage">
          <ManageBooking />
        </TabsContent>
        <TabsContent value="status">
          <FlightStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlightTabs;
