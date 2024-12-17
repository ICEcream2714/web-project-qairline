import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FaPlane, FaHotel, FaUserCheck, FaInfoCircle } from 'react-icons/fa'; // Import icon từ react-icons
import { useState } from 'react'; // Dùng useState để xử lý menu dropdown
import BookAFlight from './Bookflight';
import Stopover from './Stopover';
import ManageBooking from './ManageBooking';
import FlightStatus from './FlightStatus';

function FlightTabs() {
  const [activeTab, setActiveTab] = useState('book');

  return (
    <div className="mx-auto mt-10 max-w-6xl rounded-lg bg-gray-50 shadow-lg">
      {/* Tabs Header cho màn hình lớn */}
      <Tabs
        defaultValue="book"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="hidden md:block">
          <TabsList className="flex justify-between rounded-lg">
            <TabsTrigger
              value="book"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              <FaPlane className="text-xl" /> Book a flight
            </TabsTrigger>
            <TabsTrigger
              value="stopover"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              <FaHotel className="text-xl" /> Stopover / Packages
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              <FaUserCheck className="text-xl" /> Manage / Check in
            </TabsTrigger>
            <TabsTrigger
              value="status"
              className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-4 text-gray-700 transition duration-200 ease-in-out hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              <FaInfoCircle className="text-xl" /> Flight status
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Dropdown Menu cho màn hình nhỏ */}
        <div className="block md:hidden">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 focus:outline-none"
          >
            <option value="book">Book a flight</option>
            <option value="stopover">Stopover / Packages</option>
            <option value="manage">Manage / Check in</option>
            <option value="status">Flight status</option>
          </select>
        </div>

        {/* Tab Content */}
        <TabsContent value="book">
          <BookAFlight />
        </TabsContent>
        <TabsContent value="stopover">
          <Stopover />
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
}

export default FlightTabs;
