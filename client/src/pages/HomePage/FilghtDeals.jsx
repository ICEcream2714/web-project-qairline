import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2 } from 'lucide-react';

const DestinationCard = ({ city, image, dates, price, large = false }) => {
  return (
    <Card
      className={`group relative overflow-hidden ${large ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {/* Image Section */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={city}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-50"></div>
      </div>

      {/* Content Section */}
      <div className="relative flex h-full flex-col justify-end p-4 text-white sm:p-6">
        <h3 className={`mb-1 font-bold ${large ? 'text-2xl' : 'text-xl'}`}>
          {city}
        </h3>
        <p className="mb-2 text-sm opacity-90">{dates}</p>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm opacity-90">Economy from</p>
            <p className={`font-bold ${large ? 'text-xl' : 'text-lg'}`}>
              USD {price}
            </p>
          </div>

          {/* Buttons with hover effect */}
          <div className="translate-y-4 space-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Button
              variant="outline"
              className={`w-full bg-white text-primary hover:bg-white/20 ${large ? 'py-2 text-sm' : 'py-1 text-xs'}`}
            >
              Book now
            </Button>
            <Button
              variant="outline"
              className={`w-full border-white text-primary hover:bg-white/20 ${large ? 'py-2 text-sm' : 'py-1 text-xs'}`}
            >
              Discover
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export function FlightDeals() {
  const destinations = [
    {
      city: 'Athens',
      image:
        'https://i.pinimg.com/736x/6d/2d/60/6d2d60cea7de96a5d2aeaac86478d276.jpg',
      dates: '06 Mar 2025 - 19 Mar 2025',
      price: '977',
      large: true,
    },
    {
      city: 'Barcelona',
      image:
        'https://i.pinimg.com/736x/a8/c5/99/a8c5999494bd2891c1c6b73ddc5f5250.jpg',
      dates: '06 Mar 2025 - 13 Mar 2025',
      price: '922',
    },
    {
      city: 'Larnaca',
      image:
        'https://i.pinimg.com/736x/07/e4/4e/07e44ebe6285349e0f297a894d7f930d.jpg',
      dates: '22 Dec 2024 - 30 Dec 2024',
      price: '1478',
    },
    {
      city: 'Milan',
      image:
        'https://i.pinimg.com/736x/d4/3c/94/d43c94855e46b82281ab895923ad7493.jpg',
      dates: '11 Feb 2025 - 13 Mar 2025',
      price: '934',
    },
    {
      city: 'Nice',
      image:
        'https://i.pinimg.com/736x/6c/df/6b/6cdf6becd7bfb628df4602992fa5eb50.jpg',
      dates: '24 Mar 2025 - 21 Apr 2025',
      price: '938',
    },
    {
      city: 'Bucharest',
      image:
        'https://i.pinimg.com/736x/62/a3/f9/62a3f9965ddceb233ca0141d6c1aba1e.jpg',
      dates: '10 Mar 2025 - 16 Mar 2025',
      price: '1074',
    },
    {
      city: 'Prague',
      image:
        'https://i.pinimg.com/736x/c6/63/6d/c6636dbfb0d5c13a3d978b19db83bc2f.jpg',
      dates: '01 Apr 2025 - 21 Apr 2025',
      price: '805',
    },
    {
      city: 'Sofia',
      image:
        'https://i.pinimg.com/736x/d6/8c/03/d68c032f60b483ece7327591c71dcf3b.jpg',
      dates: '23 Mar 2025 - 21 Apr 2025',
      price: '812',
    },
    {
      city: 'Venice',
      image:
        'https://i.pinimg.com/736x/61/31/39/61313929e6bce1fe19c9ff5831b2734a.jpg',
      dates: '13 Mar 2025 - 18 Mar 2025',
      price: '960',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="mb-6 text-2xl font-bold text-secondary">Find great fares</h2>
      <div className="mb-8 max-w-xs">
        <Label htmlFor="from">From</Label>
        <div className="relative">
          <Input id="from" value="Hanoi HAN" className="pr-10" />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination, index) => (
          <DestinationCard key={destination.city} {...destination} />
        ))}
      </div>
    </div>
  );
}
