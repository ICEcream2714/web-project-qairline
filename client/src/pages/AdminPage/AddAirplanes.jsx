import { useState, useEffect } from 'react';
import { Pencil, Trash, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import ConfirmDialog from '@/components/ConfirmDialog';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const AirplanePage = () => {
  const [airplanes, setAirplanes] = useState([]);
  const [newAirplane, setNewAirplane] = useState({
    model: '',
    manufacturer: '',
    seat_count: '',
  });
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'model',
    direction: 'asc',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    message: '',
    onConfirm: null,
  });
  useEffect(() => {
    // Fetch airplane data from the server
    const fetchAirplanes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/airplanes/');
        const data = await response.json();
        setAirplanes(data);
      } catch (error) {
        toast.error('Failed to fetch airplanes.');
        console.error('Error fetching airplane data:', error);
      }
    };

    fetchAirplanes();
  }, []);

  const handleAddAirplane = async () => {
    if (!newAirplane.model || !newAirplane.seat_count) {
      toast.error('Please fill in all fields.');
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: 'Add Airplane',
      message: 'Are you sure you want to add this airplane?',
      onConfirm: async () => {
        try {
          const response = await fetch('http://localhost:5000/api/airplanes/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAirplane),
          });

          if (response.ok) {
            const addedAirplane = await response.json();
            setAirplanes([...airplanes, addedAirplane]);
            setNewAirplane({ model: '', manufacturer: '', seat_count: '' });
            toast.success('Airplane added successfully!');
          } else {
            console.error('Failed to add airplane');
          }
        } catch (error) {
          toast.error('Failed to add airplane.');
          console.error('Error adding airplane:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleDeleteAirplane = async (id) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Airplane',
      message: 'Are you sure you want to delete this airplane?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/airplanes/${id}`,
            {
              method: 'DELETE',
            }
          );

          if (response.ok) {
            toast.success('Airplane deleted successfully!');
            setAirplanes(airplanes.filter((plane) => plane.id !== id));
          } else {
            toast.error('Failed to delete airplane.');
            console.error('Failed to delete airplane');
          }
        } catch (error) {
          console.error('Error deleting airplane:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleEditAirplane = (plane) => {
    setSelectedAirplane(plane);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Save Changes',
      message: 'Are you sure you want to save changes to this airplane?',
      onConfirm: async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/airplanes/${selectedAirplane.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(selectedAirplane),
            }
          );

          if (response.ok) {
            const updatedAirplane = await response.json();
            setAirplanes(
              airplanes.map((plane) =>
                plane.id === updatedAirplane.id ? updatedAirplane : plane
              )
            );
            toast.success('Airplane updated successfully!');
            setIsEditOpen(false);
          } else {
            console.error('Failed to update airplane');
          }
        } catch (error) {
          toast.error('Failed to update airplane.');
          console.error('Error updating airplane:', error);
        }
        setConfirmDialog({ ...confirmDialog, isOpen: false });
      },
      onCancel: () => setConfirmDialog({ ...confirmDialog, isOpen: false }),
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAirplanes = [...airplanes].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <Card className="shadow-md">
        <CardHeader>
          <h1 className="text-center text-2xl font-bold">
            Airplane Management
          </h1>
        </CardHeader>
        <CardContent>
          {/* Form thêm máy bay */}
          <div className="mb-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                  setNewAirplane({
                    ...newAirplane,
                    manufacturer: e.target.value,
                  })
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
                className={`text-white ${
                  !newAirplane.model || !newAirplane.seat_count
                    ? 'cursor-not-allowed bg-gray-400 opacity-50'
                    : ''
                }`}
                disabled={!newAirplane.model || !newAirplane.seat_count}
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
                  <TableHead
                    className="w-1/4 cursor-pointer text-center"
                    onClick={() => handleSort('model')}
                  >
                    Model
                    {sortConfig.key === 'model' &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="w-1/4 cursor-pointer text-center"
                    onClick={() => handleSort('manufacturer')}
                  >
                    Manufacturer
                    {sortConfig.key === 'manufacturer' &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead
                    className="w-1/4 cursor-pointer text-center"
                    onClick={() => handleSort('seat_count')}
                  >
                    Seat Count
                    {sortConfig.key === 'seat_count' &&
                      (sortConfig.direction === 'asc' ? (
                        <ArrowUp className="ml-1 inline" size={16} />
                      ) : (
                        <ArrowDown className="ml-1 inline" size={16} />
                      ))}
                  </TableHead>
                  <TableHead className="w-1/4 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAirplanes.length > 0 ? (
                  sortedAirplanes.map((plane) => (
                    <TableRow
                      key={plane.id}
                      className="transition duration-300 hover:bg-gray-50"
                    >
                      <TableCell className="text-center">
                        {plane.model}
                      </TableCell>
                      <TableCell className="text-center">
                        {plane.manufacturer || 'N/A'}
                      </TableCell>
                      <TableCell className="text-center">
                        {plane.seat_count}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center space-x-2">
                          <Button
                            onClick={() => handleEditAirplane(plane)}
                            className="rounded-md bg-green-400 p-2 hover:bg-green-500"
                            size="icon"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteAirplane(plane.id)}
                            className="rounded-md bg-red-400 p-2 hover:bg-red-500"
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
                  setSelectedAirplane({
                    ...selectedAirplane,
                    model: e.target.value,
                  })
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
              <Button onClick={handleSaveEdit} className="text-white">
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />
    </div>
  );
};

export default AirplanePage;
