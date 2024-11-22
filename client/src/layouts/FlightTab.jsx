import { useState } from "react";
import BookAFlight from "@/layouts/Bookflight";
import StopoverPackage from "./Stopover";
import ManageBooking from "./ManageBooking";
import FlightStatus from "./FlightStatus";


const FlightTabs = () => {
  const [activeTab, setActiveTab] = useState("book");

  const renderTabContent = () => {
    switch (activeTab) {
      case "book":
        return (
          <BookAFlight/>
        );
      case "stopover":
        return (
          <StopoverPackage/>
        );
      case "manage":
        return (
          <ManageBooking/>
        );
      case "status":
        return (
          <FlightStatus/>
        );
      default:
        return null;
    }
  };

  return (
<div className="bg-gray-100 py-6 px-6 md:px-12 max-w-4xl mx-auto rounded-lg shadow-md">
  {/* Tabs */}
  <div className="flex justify-center space-x-8 mb-6">
    <button
      className={`px-6 py-1 text-sm font-medium ${activeTab === "book" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"}`}
      onClick={() => setActiveTab("book")}
    >
      Book a Flight
    </button>
    <button
      className={`px-6 py-1 text-sm font-medium ${activeTab === "stopover" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"}`}
      onClick={() => setActiveTab("stopover")}
    >
      Stop Over
    </button>
    <button
      className={`px-6 py-1 text-sm font-medium ${activeTab === "manage" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"}`}
      onClick={() => setActiveTab("manage")}
    >
      Manage Booking
    </button>
    <button
      className={`px-6 py-1 text-sm font-medium ${activeTab === "status" ? "text-blue-900 border-b-2 border-blue-900" : "text-gray-600"}`}
      onClick={() => setActiveTab("status")}
    >
      Flight Status
    </button>
  </div>

  {/* Tab Content */}
  <div>{renderTabContent()}</div>
</div>
  );
};

export default FlightTabs;
