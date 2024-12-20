import { useState, useEffect } from 'react';
import { Pencil, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner'; 
import { toast } from "sonner"
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DateTimePicker from '@/components/ui/DateTimePicker';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ResponsiveDialog from '@/components/ui/ResponsiveDialog';

const calculateDuration = (departure, arrival) => {
  const departureTime = new Date(departure);
  const arrivalTime = new Date(arrival);
  const duration = Math.abs(arrivalTime - departureTime) / 36e5; // convert milliseconds to hours
  const hours = Math.floor(duration);
  const minutes = Math.round((duration - hours) * 60);
  return `${hours}h ${minutes}m`;
};

const formatDateTime = (dateTime) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateTime).toLocaleDateString(undefined, options);
};

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [airplaneModels, setAirplaneModels] = useState([]);
  const [newFlight, setNewFlight] = useState({
    flight_number: '',
    origin: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
    status: 'Scheduled',
    aircraft_type: '',
  });

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flights');
      const data = await response.json();
      setFlights(data);
      // console.log(data);
    } catch (error) {
      toast.error('Failed to fetch flights.');
      console.error('Error fetching flights:', error);
    }
  };

  const fetchAirplaneModels = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/airplanes/models'
      );
      const data = await response.json();
      setAirplaneModels(data);
    } catch (error) {
      toast.error('Failed to fetch airplane models.');
      console.error('Error fetching airplane models:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchAirplaneModels();
  }, []);

  const handleAddFlight = async () => {
    if (
      !newFlight.arrival_time ||
      !newFlight.departure_time ||
      !newFlight.destination ||
      !newFlight.flight_number ||
      !newFlight.origin||
      !newFlight.aircraft_type
    ) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      console.log('newFlight', newFlight); // Debug log
      const response = await fetch('http://localhost:5000/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flightNumber: newFlight.flight_number,
          origin: newFlight.origin,
          destination: newFlight.destination,
          departureTime: newFlight.departure_time,
          arrivalTime: newFlight.arrival_time,
          status: newFlight.status,
          airplaneModel: newFlight.aircraft_type, // Sending airplane model instead of ID
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add flight');
      }

      const addedFlight = await response.json();
      setFlights([...flights, addedFlight]);
      resetForm();
      toast.success('Flight added successfully!');
    } catch (error) {
      toast.success('Failed to add flight');
      console.error('Error adding flight:', error);
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      // console.log('id', id);
      const response = await fetch(`http://localhost:5000/api/flights/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete flight');
      }

      const updatedFlights = flights.filter((flight) => flight.id !== id);
      setFlights(updatedFlights);
      toast.success('Flight deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete flight.');
      console.error('Error deleting flight:', error);
    }
  };

  const handleEditFlight = (flight) => {
    setSelectedFlight({
      ...flight,
      aircraft_type: flight.Airplane ? flight.Airplane.model : '',
    });
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    console.log('selected flight', selectedFlight);
    if (!selectedFlight || !selectedFlight.id) {
      console.error('No flight ID found');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/flights/${selectedFlight.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            flightNumber: selectedFlight.flight_number,
            origin: selectedFlight.origin,
            destination: selectedFlight.destination,
            departureTime: selectedFlight.departure_time,
            arrivalTime: selectedFlight.arrival_time,
            status: selectedFlight.status,
            airplaneModel: selectedFlight.aircraft_type, // Sending airplane model instead of ID
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update flight');
      }

      const updatedFlight = await response.json();
      setFlights(
        flights.map((flight) =>
          flight.id === updatedFlight.id ? updatedFlight : flight
        )
      );
      toast.success('Flight updated successfully!');
      setIsEditOpen(false);
    } catch (error) {
      toast.error('Failed to update flight.');
      console.error('Error updating flight:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedFlights = [...flights].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const resetForm = () => {
    setNewFlight({
      flight_number: '',
      origin: '',
      destination: '',
      departure_time: '',
      arrival_time: '',
      duration: '',
      status: 'Scheduled',
      aircraft_type: '',
      seat_number: '',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster/> 
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">Flights Management</h1>
          <span className="text-sm text-gray-500">
            TODO:
            <ul className="ml-4 list-disc">
              <li>Confirm add, edit, delete flight</li>
              <li>done Toast/sooner notification when add, edit, delete</li>
              <li>done Disable nút Add khi thông tin chưa được nhập đủ</li>
              <li>Sửa lại nút sort</li>
              <li>Chỉnh lại sắp xếp giao diện (optional)</li>
            </ul>
          </span>
        </CardHeader>
        <CardContent>
          {/* Form thêm chuyến bay */}
          <div className="mb-6 space-y-6">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    {/* Flight Number */}
    <Input
      value={newFlight.flight_number}
      onChange={(e) =>
        setNewFlight({ ...newFlight, flight_number: e.target.value })
      }
      placeholder="Flight Number"
    />

    {/* Origin */}
    <Input
      value={newFlight.origin}
      onChange={(e) =>
        setNewFlight({ ...newFlight, origin: e.target.value })
      }
      placeholder="Origin"
    />

    {/* Destination */}
    <Input
      value={newFlight.destination}
      onChange={(e) =>
        setNewFlight({ ...newFlight, destination: e.target.value })
      }
      placeholder="Destination"
    />

    {/* Departure Time */}
    <DateTimePicker
      dateTime={newFlight.departure_time}
      setDateTime={(date) =>
        setNewFlight({ ...newFlight, departure_time: date })
      }
      title="Departure Time"
    />

    {/* Arrival Time */}
    <DateTimePicker
      dateTime={newFlight.arrival_time}
      setDateTime={(date) =>
        setNewFlight({ ...newFlight, arrival_time: date })
      }
      title="Arrival Time"
    />

    {/* Duration */}
    <div className="flex items-center">
      <span className="text-gray-700">Duration:</span>
      <span className="ml-2">
        {newFlight.departure_time && newFlight.arrival_time
          ? calculateDuration(
              newFlight.departure_time,
              newFlight.arrival_time
            )
          : '0h 0m'}
      </span>
    </div>
  </div>

  {/* Status and Aircraft Type */}
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {/* Flight Status */}
    <select
      value={newFlight.status}
      onChange={(e) =>
        setNewFlight({ ...newFlight, status: e.target.value })
      }
      className="w-full rounded-md border p-2"
    >
      <option value="Scheduled">Scheduled</option>
      <option value="Delayed">Delayed</option>
      <option value="Cancelled">Cancelled</option>
    </select>

    {/* Aircraft Type */}
    <select
      value={newFlight.aircraft_type}
      onChange={(e) => {
        setNewFlight({ ...newFlight, aircraft_type: e.target.value });
        console.log('aircraft_type:', e.target.value);
      }}
      className="w-full rounded-md border p-2"
    >
      <option value="">Select Aircraft Type</option>
      {airplaneModels.map((airplane) => (
        <option key={airplane.model} value={airplane.model}>
          {airplane.model}
        </option>
      ))}
    </select>
  </div>

            <div className="text-right">
              <Button
                onClick={handleAddFlight}
                className={`bg-blue-600 text-white hover:bg-blue-700 ${
                  !newFlight.arrival_time ||
                  !newFlight.departure_time ||
                  !newFlight.destination ||
                  !newFlight.flight_number ||
                  !newFlight.origin ||
                  !newFlight.aircraft_type? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!newFlight.arrival_time ||
                  !newFlight.departure_time ||
                  !newFlight.destination ||
                  !newFlight.flight_number ||
                  !newFlight.origin||
                  !newFlight.aircraft_type}
              >
                Add Flight
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách chuyến bay */}
          <div className="overflow-x-auto">
            <Table>
            <TableHeader>
  <TableRow className="bg-gray-100">
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('flight_number')}
    >
      Flight Number
      {sortConfig.key === 'flight_number' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('origin')}
    >
      Origin
      {sortConfig.key === 'origin' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('destination')}
    >
      Destination
      {sortConfig.key === 'destination' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('departure_time')}
    >
      Departure
      {sortConfig.key === 'departure_time' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('arrival_time')}
    >
      Arrival
      {sortConfig.key === 'arrival_time' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('status')}
    >
      Status
      {sortConfig.key === 'status' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('aircraft_type')}
    >
      Aircraft
      {sortConfig.key === 'aircraft_type' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead
      className="cursor-pointer whitespace-nowrap text-center px-4 py-2"
      onClick={() => handleSort('duration')}
    >
      Duration
      {sortConfig.key === 'duration' &&
        (sortConfig.direction === 'ascending' ? (
          <ArrowUp className="ml-1 inline" size={16} />
        ) : (
          <ArrowDown className="ml-1 inline" size={16} />
        ))}
    </TableHead>
    <TableHead className="whitespace-nowrap text-center px-4 py-2">
      Actions
    </TableHead>
  </TableRow>
</TableHeader>

              <TableBody>
                {sortedFlights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.flight_number}</TableCell>
                    <TableCell>{flight.origin}</TableCell>
                    <TableCell>{flight.destination}</TableCell>
                    <TableCell className="min-w-[200px]">
                      {formatDateTime(flight.departure_time)}
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      {formatDateTime(flight.arrival_time)}
                    </TableCell>
                    <TableCell>{flight.status}</TableCell>
                    <TableCell>
                      {flight.Airplane ? flight.Airplane.model : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {calculateDuration(
                        flight.departure_time,
                        flight.arrival_time
                      )}
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        onClick={() => handleEditFlight(flight)}
                        className="rounded-md bg-yellow-500 p-2 hover:bg-yellow-600"
                        size="icon"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteFlight(flight.id)}
                        className="rounded-md bg-red-500 p-2 hover:bg-red-600"
                        size="icon"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal chỉnh sửa chuyến bay */}
      {selectedFlight && (
        <ResponsiveDialog
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          title="Edit Flight Information"
        >
          <div className="grid grid-cols-1 gap-4">
            <Input
              value={selectedFlight.flight_number}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  flight_number: e.target.value,
                })
              }
              placeholder="Flight Number"
            />
            <Input
              value={selectedFlight.origin}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  origin: e.target.value,
                })
              }
              placeholder="Origin"
            />
            <Input
              value={selectedFlight.destination}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  destination: e.target.value,
                })
              }
              placeholder="Destination"
            />
            <DateTimePicker
              dateTime={selectedFlight.departure_time}
              setDateTime={(date) =>
                setSelectedFlight({ ...selectedFlight, departure_time: date })
              }
              title="Departure Time"
            />
            <DateTimePicker
              dateTime={selectedFlight.arrival_time}
              setDateTime={(date) =>
                setSelectedFlight({ ...selectedFlight, arrival_time: date })
              }
              title="Arrival Time"
            />
            <div className="flex items-center text-center">
              <span className="text-gray-700"> Duration: </span>
              <span className="ml-2">
                {selectedFlight.departure_time && selectedFlight.arrival_time
                  ? calculateDuration(
                      selectedFlight.departure_time,
                      selectedFlight.arrival_time
                    )
                  : '00'}
              </span>
            </div>
            <select
              value={selectedFlight.status}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  status: e.target.value,
                })
              }
              className="w-full rounded-md border p-2"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Delayed">Delayed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={selectedFlight.aircraft_type}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  aircraft_type: e.target.value,
                })
              }
              className="w-full rounded-md border p-2"
            >
              <option value="">Select Aircraft Type</option>
              {airplaneModels.map((airplane) => (
                <option key={airplane.model} value={airplane.model}>
                  {airplane.model}
                </option>
              ))}
            </select>
            {/* <Input
              type="number"
              value={selectedFlight.seat_number}
              onChange={(e) =>
                setSelectedFlight({
                  ...selectedFlight,
                  seat_number: e.target.value,
                })
              }
              placeholder="Number of Seats"
            /> */}
          </div>
          <div className="mt-4 text-right">
            <Button onClick={handleSaveEdit} className="bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </ResponsiveDialog>
      )}
    </div>
  );
};

export default FlightsPage;
