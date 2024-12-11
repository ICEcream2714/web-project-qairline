import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import DatePicker from '@/components/DatePicker';

const FlightStatus = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [activeTab, setActiveTab] = useState('route');
  const [route, setRoute] = useState({ from: '', to: '' });
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (activeTab === 'route' && (!route.from || !route.to || !date)) {
      alert('Please fill in all required fields for route search.');
    } else if (activeTab === 'flightNumber' && (!flightNumber || !date)) {
      alert('Please fill in all required fields for flight number search.');
    } else {
      alert(
        activeTab === 'route'
          ? `Searching flights from ${route.from} to ${route.to} on ${date}.`
          : `Searching flight ${flightNumber} on ${date}.`
      );
    }
  };

  return (
    <Card className="rounded-lg bg-white p-0 shadow-md">
      {/* Header Tabs */}
      <CardHeader className="mb-4 border-b">
        <div className="flex justify-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setActiveTab('route')}
            className={`flex-1 py-2 text-center text-lg font-medium ${
              activeTab === 'route'
                ? 'border-b-2 border-purple-600 text-purple-600 hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-purple-500'
            }`}
          >
            By Route
          </Button>
          <Button
            variant="ghost"
            onClick={() => setActiveTab('flightNumber')}
            className={`flex-1 py-2 text-center text-lg font-medium ${
              activeTab === 'flightNumber'
                ? 'border-b-2 border-purple-600 text-purple-600 hover:bg-transparent'
                : 'text-gray-600 hover:bg-transparent hover:text-purple-500'
            }`}
          >
            By Flight Number
          </Button>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {activeTab === 'route' ? (
          <form className="flex flex-col gap-3 md:flex-row">
            {/* From */}
              <div className="flex-1">
                <Label htmlFor="from" className="mb-1 block text-sm text-gray-600">
                  From
                </Label>
                <Input
                  id="from"
                  placeholder="Enter departure city"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              {/* Switch Arrow */}
                <span
                  className="mx-2 pt-7 cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => {
                  // Swap From and To values
                  setFrom(to);
                  setTo(from);
                  }}
                >
                  ⇄
                </span>

                {/* To */}
              <div className="flex-1">
                <Label htmlFor="to" className="mb-1 block text-sm text-gray-600">
                  To
                </Label>
                <Input
                  id="to"
                  placeholder="Enter destination city"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
        
            {/* Date */}
            <div className="flex-1">
              <Label htmlFor="date">Date</Label>
              <DatePicker date={date} setDate={setDate} />
              {date && <p className="mt-4 text-gray-600">Selected Date: {date}</p>}
            </div>
            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleSearch}
                className="rounded-lg bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
              >
                Check Status
              </Button>
            </div>
          </form>
        ) : (
          <form className="flex flex-col gap-4 md:flex-row">
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
              <DatePicker date={date} setDate={setDate} />
              {date && <p className="mt-4 text-gray-600">Selected Date: {date}</p>}
            </div>
            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={handleSearch}
                className="rounded-lg bg-purple-600 px-8 py-3 text-white hover:bg-purple-700"
              >
                Check Status
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default FlightStatus;
