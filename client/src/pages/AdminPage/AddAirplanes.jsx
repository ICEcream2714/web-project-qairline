import { useState } from "react";
import { Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AirplanePage = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({
    model: "",
    manufacturer: "",
    seat_count: "",
  });
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleAddAirplane = () => {
    if (!newAirplane.model || !newAirplane.seat_count) return;
    const newAirplaneData = {
      ...newAirplane,
      id: airplanes.length + 1,
      seat_count: parseInt(newAirplane.seat_count, 10),
    };
    setAirplanes([...airplanes, newAirplaneData]);
    setNewAirplane({ model: "", manufacturer: "", seat_count: "" });
  };

  const handleDeleteAirplane = (id) => {
    setAirplanes(airplanes.filter((plane) => plane.id !== id));
  };

  const handleEditAirplane = (plane) => {
    setSelectedAirplane(plane);
    setIsEditOpen(true);
  };

  const handleSaveEdit = () => {
    setAirplanes(
      airplanes.map((plane) =>
        plane.id === selectedAirplane.id ? selectedAirplane : plane
      )
    );
    setIsEditOpen(false);
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Airplane Management</h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm máy bay */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                value={newAirplane.model}
                onChange={(e) =>
                  setNewAirplane({ ...newAirplane, model: e.target.value })
                }
                placeholder="Airplane Model"
                required
              />
              <Input
                value={newAirplane.manufacturer}
                onChange={(e) =>
                  setNewAirplane({ ...newAirplane, manufacturer: e.target.value })
                }
                placeholder="Manufacturer (Optional)"
              />
              <Input
                type="number"
                value={newAirplane.seat_count}
                onChange={(e) =>
                  setNewAirplane({ ...newAirplane, seat_count: e.target.value })
                }
                placeholder="Seat Count"
                required
              />
            </div>
            <div className="text-right">
              <Button
                onClick={handleAddAirplane}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add Airplane
              </Button>
            </div>
          </div>

          {/* Table hiển thị danh sách máy bay */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center w-1/4">Model</TableHead>
                  <TableHead className="text-center w-1/4">Manufacturer</TableHead>
                  <TableHead className="text-center w-1/4">Seat Count</TableHead>
                  <TableHead className="text-center w-1/4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {airplanes.length > 0 ? (
                  airplanes.map((plane) => (
                    <TableRow
                      key={plane.id}
                      className="hover:bg-gray-50 transition duration-300"
                    >
                      <TableCell className="text-center">{plane.model}</TableCell>
                      <TableCell className="text-center">
                        {plane.manufacturer || "N/A"}
                      </TableCell>
                      <TableCell className="text-center">
                        {plane.seat_count}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            onClick={() => handleEditAirplane(plane)}
                            className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-md"
                            size="icon"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteAirplane(plane.id)}
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-md"
                            size="icon"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan="4"
                      className="text-center italic text-gray-500"
                    >
                      No airplanes available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal chỉnh sửa máy bay */}
      {selectedAirplane && (
        <Dialog open={isEditOpen} onOpenChange={() => setIsEditOpen(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Airplane</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={selectedAirplane.model}
                onChange={(e) =>
                  setSelectedAirplane({ ...selectedAirplane, model: e.target.value })
                }
                placeholder="Airplane Model"
                required
              />
              <Input
                value={selectedAirplane.manufacturer}
                onChange={(e) =>
                  setSelectedAirplane({
                    ...selectedAirplane,
                    manufacturer: e.target.value,
                  })
                }
                placeholder="Manufacturer (Optional)"
              />
              <Input
                type="number"
                value={selectedAirplane.seat_count}
                onChange={(e) =>
                  setSelectedAirplane({
                    ...selectedAirplane,
                    seat_count: e.target.value,
                  })
                }
                placeholder="Seat Count"
                required
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSaveEdit} className="bg-blue-600 text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AirplanePage;
