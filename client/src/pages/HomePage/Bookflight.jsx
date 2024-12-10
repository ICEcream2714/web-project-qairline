import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export default function BookAFlight() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [tripType, setTripType] = useState('return');
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    class: 'economy',
  });
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => ({
      ...prev,
      [type]:
        operation === 'increase' ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  const handleClassChange = (value) => {
    setPassengers((prev) => ({ ...prev, class: value }));
  };

  const handleSearchFlights = async () => {
    const encodedFrom = encodeURIComponent(from);
    const encodedTo = encodeURIComponent(to);

    // Tạo URL API dựa trên thông tin người dùng nhập
    let apiUrl = `http://localhost:5000/api/customer/search-flights?origin=${encodedFrom}&destination=${encodedTo}`;

    if (departure) {
      apiUrl += `&departure_date=${departure}`;
    }

    if (tripType === 'return' && returnDate) {
      apiUrl += `&return_date=${returnDate}`;
    }

    // if (passengers.class) {
    //   apiUrl += `&seat_type=${passengers.class}`;
    // }

    console.log('API URL:', apiUrl);

    // Gọi API để tìm kiếm chuyến bay
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        // Truyền data về flights qua navigate
        navigate('/booking', {
          state: { flights: data, origin: from, destination: to },
        });
        console.log('Flights:', data);
      } else {
        console.error('Error fetching flights:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md">
      {/* Trip Type Options */}
      <RadioGroup
        value={tripType}
        onValueChange={(value) => setTripType(value)}
        className="flex items-center space-x-8"
      >
        {['return', 'one-way', 'multi-city'].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <RadioGroupItem
              value={type}
              id={`trip-type-${type}`}
              className="text-purple-600"
            />
            <Label
              htmlFor={`trip-type-${type}`}
              className={`text-lg font-medium`}
            >
              {type === 'return'
                ? 'Return'
                : type === 'one-way'
                  ? 'One way'
                  : 'Multi-city'}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {/* Input Fields */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* From and To with switch arrow */}
        <div className="col-span-2 flex items-center">
          <div className="relative w-full">
            <Label htmlFor="from" className="mb-1 block text-sm text-gray-600">
              From
            </Label>
            <Input
              id="from"
              type="text"
              placeholder="From"
              value={from}
              className=" w-full"
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <span
            className="mx-4 pt-4 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={() => {
            // Hoán đổi giá trị from và to
            setFrom(to);
            setTo(from);
            }}
          >
            ⇄
          </span>
          <div className="relative w-full">
            <Label htmlFor="to" className="mb-1 block text-sm text-gray-600">
              To
            </Label>
            <Input
              id="to"
              type="text"
              placeholder="To"
              value={to}
              className="w-full"
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        {/* Departure */}
        <div>
          <Label htmlFor="departure" className="mb-1 block text-sm text-gray-600">
            Departure
          </Label>
          <Input
            id="departure"
            type="date"
            className="w-full rounded-lg border bg-white p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(e) => setDeparture(e.target.value)}
          />
      </div>

      {/* Return (only for "return" trip type) */}
      {tripType === 'return' && (
        <div>
          <Label htmlFor="return" className="mb-1 block text-sm text-gray-600">
            Return
          </Label>
          <Input
            id="return"
            type="date"
            className="w-full rounded-lg border bg-white p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </div>
       )}
    </div>


      {/* Passenger Selector */}
      <div className="mt-6 flex items-center justify-between">
        <div className="relative w-full max-w-xs">
          <Button
            onClick={toggleDropdown}
            className="w-full rounded-md border border-gray-300 bg-white p-2 text-left text-gray-700"
          >
            {`${passengers.adults + passengers.children + passengers.infants} Passenger${
              passengers.adults + passengers.children + passengers.infants > 1
                ? 's'
                : ''
            } ${passengers.class === 'economy' ? 'Economy' : 'Premium'}`}
          </Button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
              {/* Passengers Section */}
              <div className="space-y-4 p-4">
                <Label className="text-sm font-medium">Passengers</Label>

                {[
                  { label: 'Adults', type: 'adults', age: '12+ years' },
                  { label: 'Child', type: 'children', age: '2-11 years' },
                  { label: 'Infant', type: 'infants', age: 'Under 2 years' },
                ].map(({ label, type, age }) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">{label}</p>
                      <p className="text-xs text-gray-500">{age}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePassengerChange(type, 'decrease')}
                      >
                        −
                      </Button>
                      <span>{passengers[type]}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePassengerChange(type, 'increase')}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Class Section */}
              <div className="space-y-4 border-t p-4">
                <Label className="text-sm font-medium">Class</Label>
                <RadioGroup
                  value={passengers.class}
                  onValueChange={handleClassChange}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="economy" id="economy" />
                    <Label htmlFor="economy" className="text-gray-700">
                      Economy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="premium" id="premium" />
                    <Label htmlFor="premium" className="text-gray-700">
                      Premium (Business/First)
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Confirm Button */}
              <div className="border-t p-4">
                <Button
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  onClick={() => setIsOpen(false)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button
          className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
          onClick={handleSearchFlights}
        >
          Search flights
        </Button>
      </div>
    </div>
  );
}
