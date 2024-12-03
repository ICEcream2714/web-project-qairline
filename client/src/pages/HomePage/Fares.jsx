import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const destinations = [
  {
    id: 1,
    city: "Nairobi",
    dateRange: "16 Feb 2025 - 23 Feb 2025",
    price: "Economy from USD 1401*",
    image: "https://via.placeholder.com/400x250?text=Nairobi",
  },
  {
    id: 2,
    city: "Zagreb",
    dateRange: "27 Nov 2024 - 02 Dec 2024",
    price: "Economy from USD 1172*",
    image: "https://via.placeholder.com/400x250?text=Zagreb",
  },
  {
    id: 3,
    city: "Brussels",
    dateRange: "25 Nov 2024 - 01 Dec 2024",
    price: "Economy from USD 887*",
    image: "https://via.placeholder.com/400x250?text=Brussels",
  },
];

const DestinationCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title Section */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Find Great Fares</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="group relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            {/* Background Image */}
            <div className="relative w-full h-40 md:h-48">
              <img
                src={destination.image}
                alt={destination.city}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>

            {/* Card Content */}
            <CardContent className="absolute inset-0 flex flex-col justify-end p-4 group-hover:z-10 group-active:scale-110 group-active:translate-y-[-10%] transition-transform duration-300">
              <div className="text-white space-y-1">
                <h2 className="text-lg font-semibold">{destination.city}</h2>
                <p className="text-sm">{destination.dateRange}</p>
                <p className="text-sm font-semibold">{destination.price}</p>
              </div>
            </CardContent>

            {/* Buttons */}
            <CardFooter className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 group-active:translate-y-[-10%] group-active:scale-110 z-20 transition-all duration-300">
              <Button variant="secondary" className="bg-white text-black shadow-md">
                Book Now
              </Button>
              <Button variant="secondary" className="bg-white text-black shadow-md">
                Discover
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationCard;
