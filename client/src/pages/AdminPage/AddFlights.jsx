import { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DatePicker from '@/components/DatePicker';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const FlightsPage = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      flight_number: 'VN123',
      origin: 'Ha Noi',
      destination: 'Ho Chi Minh',
      departure_time: '2024-06-25',
      arrival_time: '2024-06-25',
      duration: '2:30',
      status: 'Scheduled',
      aircraft_type: 'Airbus A320',
      seat_number: 150,
    },
  ]);

  const [newFlight, setNewFlight] = useState({
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

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleAddFlight = () => {
    const newFlightData = {
      ...newFlight,
      id: flights.length + 1,
    };
    setFlights([...flights, newFlightData]);
    resetForm();
  };

  const handleDeleteFlight = (id) => {
    const updatedFlights = flights.filter((flight) => flight.id !== id);
    setFlights(updatedFlights);
  };

  const handleEditFlight = (flight) => {
    setSelectedFlight(flight);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setFlights(
      flights.map((flight) =>
        flight.id === selectedFlight.id ? selectedFlight : flight
      )
    );
    setIsEditOpen(false);
  };

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
    <div className="container mx-auto p-4 md:p-6">
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">Flights Management</h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm chuyến bay */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Input
                value={newFlight.flight_number}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, flight_number: e.target.value })
                }
                placeholder="Flight Number"
              />
              <Input
                value={newFlight.origin}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, origin: e.target.value })
                }
                placeholder="Origin"
              />
              <Input
                value={newFlight.destination}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, destination: e.target.value })
                }
                placeholder="Destination"
              />
              <DatePicker
                date={newFlight.departure_time}
                setDate={(date) =>
                  setNewFlight({ ...newFlight, departure_time: date })
                }
                title="Departure Time"
              />
              <DatePicker
                date={newFlight.arrival_time}
                setDate={(date) =>
                  setNewFlight({ ...newFlight, arrival_time: date })
                }
                title="Arrival Time"
              />
              <Input
                value={newFlight.duration}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, duration: e.target.value })
                }
                placeholder="Duration (e.g., 2:30)"
              />
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
              <select
                value={newFlight.aircraft_type}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, aircraft_type: e.target.value })
                }
                className="w-full rounded-md border p-2"
              >
                <option value="">Select Aircraft Type</option>
                <option value="Airbus A320">Airbus A320</option>
                <option value="Boeing 737">Boeing 737</option>
                <option value="Airbus A321">Airbus A321</option>
              </select>
              <Input
                type="number"
                value={newFlight.seat_number}
                onChange={(e) =>
                  setNewFlight({ ...newFlight, seat_number: e.target.value })
                }
                placeholder="Number of Seats"
              />
            </div>
            <div className="text-right">
              <Button
                onClick={handleAddFlight}
                className="bg-blue-600 text-white hover:bg-blue-700"
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
                  <TableHead>Flight Number</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>Arrival</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aircraft</TableHead>
                  <TableHead>Seats</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flights.map((flight) => (
                  <TableRow key={flight.id}>
                    <TableCell>{flight.flight_number}</TableCell>
                    <TableCell>{flight.origin}</TableCell>
                    <TableCell>{flight.destination}</TableCell>
                    <TableCell>{flight.departure_time}</TableCell>
                    <TableCell>{flight.arrival_time}</TableCell>
                    <TableCell>{flight.status}</TableCell>
                    <TableCell>{flight.aircraft_type}</TableCell>
                    <TableCell>{flight.seat_number}</TableCell>
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
        <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Flight Information</DialogTitle>
            </DialogHeader>
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
              <DatePicker
                date={selectedFlight.departure_time}
                setDate={(date) =>
                  setSelectedFlight({ ...selectedFlight, departure_time: date })
                }
                title="Departure Time"
              />
              <DatePicker
                date={selectedFlight.arrival_time}
                setDate={(date) =>
                  setSelectedFlight({ ...selectedFlight, arrival_time: date })
                }
                title="Arrival Time"
              />
              <Input
                value={selectedFlight.duration}
                onChange={(e) =>
                  setSelectedFlight({
                    ...selectedFlight,
                    duration: e.target.value,
                  })
                }
                placeholder="Duration (e.g., 2:30)"
              />
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
                <option value="Airbus A320">Airbus A320</option>
                <option value="Boeing 737">Boeing 737</option>
                <option value="Airbus A321">Airbus A321</option>
              </select>
              <Input
                type="number"
                value={selectedFlight.seat_number}
                onChange={(e) =>
                  setSelectedFlight({
                    ...selectedFlight,
                    seat_number: e.target.value,
                  })
                }
                placeholder="Number of Seats"
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FlightsPage;
