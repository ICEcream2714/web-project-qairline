import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import DatePicker from "@/components/DatePicker";

const EditFlightModal = ({ flight, isOpen, onClose, onSave }) => {
  const [editedFlight, setEditedFlight] = useState(flight);

  const handleSave = () => {
    onSave(editedFlight);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">Edit Flight Information</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={editedFlight.flight_number}
            onChange={(e) => setEditedFlight({ ...editedFlight, flight_number: e.target.value })}
            placeholder="Flight Number"
          />
          <Input
            value={editedFlight.origin}
            onChange={(e) => setEditedFlight({ ...editedFlight, origin: e.target.value })}
            placeholder="Origin"
          />
          <Input
            value={editedFlight.destination}
            onChange={(e) => setEditedFlight({ ...editedFlight, destination: e.target.value })}
            placeholder="Destination"
          />
          <DatePicker
            date={editedFlight.departure_time}
            setDate={(date) => setEditedFlight({ ...editedFlight, departure_time: date })}
            title="Departure Time"
          />
          <DatePicker
            date={editedFlight.arrival_time}
            setDate={(date) => setEditedFlight({ ...editedFlight, arrival_time: date })}
            title="Arrival Time"
          />
          <Input
            value={editedFlight.duration}
            onChange={(e) => setEditedFlight({ ...editedFlight, duration: e.target.value })}
            placeholder="Duration (e.g., 2:30)"
          />
          <select
            value={editedFlight.status}
            onChange={(e) => setEditedFlight({ ...editedFlight, status: e.target.value })}
            className="border rounded-md p-2 w-full"
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Delayed">Delayed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <DialogFooter>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
            Save Changes
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFlightModal;
