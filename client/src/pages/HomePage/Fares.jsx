import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const destinations = [
  {
    id: 1,
    city: 'Nairobi',
    dateRange: '16 Feb 2025 - 23 Feb 2025',
    price: 'Economy from USD 1401*',
    image: 'https://via.placeholder.com/400x250?text=Nairobi',
  },
  {
    id: 2,
    city: 'Zagreb',
    dateRange: '27 Nov 2024 - 02 Dec 2024',
    price: 'Economy from USD 1172*',
    image: 'https://via.placeholder.com/400x250?text=Zagreb',
  },
  {
    id: 3,
    city: 'Brussels',
    dateRange: '25 Nov 2024 - 01 Dec 2024',
    price: 'Economy from USD 887*',
    image: 'https://via.placeholder.com/400x250?text=Brussels',
  },
];

const DestinationCard = () => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      {/* Title Section */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold md:text-3xl">Find Great Fares</h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {/* Background Image */}
            <div className="relative h-40 w-full md:h-48">
              <img
                src={destination.image}
                alt={destination.city}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            </div>

            {/* Card Content */}
            <CardContent className="absolute inset-0 flex flex-col justify-end p-4 transition-transform duration-300 group-hover:z-10 group-active:translate-y-[-10%] group-active:scale-110">
              <div className="space-y-1 text-white">
                <h2 className="text-lg font-semibold">{destination.city}</h2>
                <p className="text-sm">{destination.dateRange}</p>
                <p className="text-sm font-semibold">{destination.price}</p>
              </div>
            </CardContent>

            {/* Buttons */}
            <CardFooter className="absolute bottom-4 left-4 right-4 z-20 flex justify-between opacity-0 group-hover:opacity-100 group-active:translate-y-[-10%] group-active:scale-110">
              <Button
                variant="secondary"
                className="bg-white text-black shadow-md"
              >
                Book Now
              </Button>
              <Button
                variant="secondary"
                className="bg-white text-black shadow-md"
              >
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
