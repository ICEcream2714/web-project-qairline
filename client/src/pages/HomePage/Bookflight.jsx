import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import DatePicker from '@/components/DatePicker';

export default function BookAFlight() {
  const [activeDropdown, setActiveDropdown] = useState(null); // null | "from" | "to"
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);

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

  const handleCitySelect = (city, field) => {
    if (field === 'from') setFrom(city);
    if (field === 'to') setTo(city);
    setActiveDropdown(null); // Đóng dropdown
  };

  const handleOutsideClick = () => setActiveDropdown(null);

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
        className="flex flex-col items-start space-y-4 sm:items-center md:flex-row md:space-x-8 md:space-y-0"
      >
        {['return', 'one-way', 'multi-city'].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <RadioGroupItem
              value={type}
              id={`trip-type-${type}`}
              className="text-secondary"
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
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* From and To with switch arrow */}
        <div
          className="relative col-span-1 flex flex-col items-center md:col-span-2 md:flex-row"
          onClick={(e) => e.stopPropagation()} // Chặn click event không lan ra ngoài
        >
          {/* From Field */}
          <div className="relative w-full">
            <Label htmlFor="from" className="mb-1 block text-sm text-gray-600">
              From
            </Label>
            <Input
              id="from"
              type="text"
              placeholder="From"
              value={from}
              className="w-full"
              onClick={() => setActiveDropdown('from')} // Hiển thị dropdown "from"
              onChange={(e) => setFrom(e.target.value)}
            />
            {activeDropdown === 'from' && (
              <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                {fromCities.map((city) => (
                  <div
                    key={city}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => handleCitySelect(city, 'from')}
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

          {/* To Field */}
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
              onClick={() => setActiveDropdown('to')} // Hiển thị dropdown "to"
              onChange={(e) => setTo(e.target.value)}
            />
            {activeDropdown === 'to' && (
              <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg">
                {toCities.map((city) => (
                  <div
                    key={city}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                    onClick={() => handleCitySelect(city, 'to')}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Departure */}
        <div>
          <Label
            htmlFor="departure"
            className="mb-1 block text-sm text-gray-600"
          >
            Departure
          </Label>
          <DatePicker id="departure" date={departure} setDate={setDeparture} />
        </div>

        {/* Return (only for "return" trip type) */}
        {tripType === 'return' && (
          <div>
            <Label
              htmlFor="return"
              className="mb-1 block text-sm text-gray-600"
            >
              Return
            </Label>
            <DatePicker id="return" date={returnDate} setDate={setReturnDate} />
          </div>
        )}
      </div>

      {/* Passenger Selector */}
      <div className="mt-6 flex flex-col space-y-4 sm:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative w-full pr-0 md:max-w-xs md:pr-4">
          <Button
            onClick={toggleDropdown}
            className="w-full rounded-md border border-gray-300 bg-white p-2 text-left text-gray-700 hover:bg-white hover:text-secondary"
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
                  className="w-full text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
        </div>
        <Button className="text-white" onClick={handleSearchFlights}>
          Search flights
        </Button>
      </div>
      {document.addEventListener('click', handleOutsideClick)}
    </div>
  );
}
