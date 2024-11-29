import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FaPlane, FaHotel, FaUserCheck, FaInfoCircle } from "react-icons/fa"; // Import icon từ react-icons
import BookAFlight from "./Bookflight";
import Stopover from "./Stopover";
import ManageBooking from "./ManageBooking";
import FlightStatus from "./FlightStatus";

function FlightTabs() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-10">
      {/* Tabs Header */}
      <Tabs defaultValue="book" className="w-full">
        <TabsList className="flex justify-between w-full">
          <TabsTrigger
            value="book"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition duration-200 ease-in-out text-gray-700 hover:text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          >
            <FaPlane className="text-xl" /> Book a flight
          </TabsTrigger>
          <TabsTrigger
            value="stopover"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition duration-200 ease-in-out text-gray-700 hover:text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          >
            <FaHotel className="text-xl" /> Stopover / Packages
          </TabsTrigger>
          <TabsTrigger
            value="manage"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition duration-200 ease-in-out text-gray-700 hover:text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          >
            <FaUserCheck className="text-xl" /> Manage / Check in
          </TabsTrigger>
          <TabsTrigger
            value="status"
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-lg transition duration-200 ease-in-out text-gray-700 hover:text-white hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          >
            <FaInfoCircle className="text-xl" /> Flight status
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="book">
          <BookAFlight />
        </TabsContent>
        <TabsContent value="stopover">
          <Stopover/>
        </TabsContent>
        <TabsContent value="manage">
          <ManageBooking/>
        </TabsContent>
        <TabsContent value="status">
          <FlightStatus/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default FlightTabs;
