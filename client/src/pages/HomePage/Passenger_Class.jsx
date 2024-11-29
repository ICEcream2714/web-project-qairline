import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const Passengers = ({ passengers, setPassengers }) => {
  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: operation === "increase" ? prev[type] + 1 : Math.max(prev[type] - 1, 0),
    }));
  };

  const handleClassChange = (value) => {
    setPassengers((prev) => ({ ...prev, class: value }));
  };

  return (
    <div className="p-4 space-y-4">
      <Label className="text-sm font-medium">Passengers</Label>
      {["adults", "children", "infants"].map((type) => (
        <div key={type} className="flex justify-between items-center">
          <div>
            <p className="text-gray-700">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            <p className="text-xs text-gray-500">
              {type === "adults" ? "12+ years" : type === "children" ? "2-11 years" : "Under 2 years"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePassengerChange(type, "decrease")}
            >
              −
            </Button>
            <span>{passengers[type]}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePassengerChange(type, "increase")}
            >
              +
            </Button>
          </div>
        </div>
      ))}

      {/* Class Section */}
      <div className="p-4 border-t space-y-4">
        <Label className="text-sm font-medium">Class</Label>
        <RadioGroup
          value={passengers.class}
          onValueChange={handleClassChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="economy" id="economy" />
            <Label htmlFor="economy" className="text-gray-700">Economy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="premium" id="premium" />
            <Label htmlFor="premium" className="text-gray-700">Premium (Business/First)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default Passengers;
