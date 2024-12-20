import { useState, useEffect } from 'react';
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
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flights/');
        const data = await response.json();
        const origins = [...new Set(data.map((flight) => flight.origin))];
        const destinations = [
          ...new Set(data.map((flight) => flight.destination)),
        ];
        setFromCities(origins);
        setToCities(destinations);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

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
            className={`flex-1 py-1 text-center text-lg font-medium ${
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
          <form className="col-span-1 flex flex-col items-center md:col-span-2 md:flex-row">
            {/* From */}
            <div className="relative w-full">
              <Label
                htmlFor="from"
                className="mb-1 block text-sm text-gray-600"
              >
                From
              </Label>
              <Input
                id="from"
                placeholder="Enter departure city"
                value={from}
                onClick={() => setActiveDropdown('from')}
                onChange={(e) => setFrom(e.target.value)}
              />
              {activeDropdown === 'from' && (
                <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                  {fromCities.map((city) => (
                    <div
                      key={city}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                      onClick={() => {
                        setFrom(city);
                        setActiveDropdown(null);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Switch Arrow */}
            <span
              className="mx-0 mt-3 cursor-pointer text-gray-400 hover:text-gray-600 md:mx-4 md:mt-4"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
            >
              ⇄
            </span>

            {/* To */}
            <div className="relative w-full">
              <Label htmlFor="to" className="mb-1 block text-sm text-gray-600">
                To
              </Label>
              <Input
                id="to"
                placeholder="Enter destination city"
                value={to}
                onClick={() => setActiveDropdown('to')}
                onChange={(e) => setTo(e.target.value)}
              />
              {activeDropdown === 'to' && (
                <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                  {toCities.map((city) => (
                    <div
                      key={city}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                      onClick={() => {
                        setTo(city);
                        setActiveDropdown(null);
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date */}
            <div className="relative w-full md:px-4">
              <Label htmlFor="date">Date</Label>
              <DatePicker date={date} setDate={setDate} />
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
