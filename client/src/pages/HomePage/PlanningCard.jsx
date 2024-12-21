import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

const StartPlanningCard = ({ image, title, cta }) => {
  return (
    <Card className="mx-2 flex flex-[0_0_calc(25%-16px)] flex-col transition-shadow duration-300 hover:shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-56 w-full rounded-t-lg object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="pb-10 text-xl font-semibold text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          variant="ghost"
          className={cn(
            'flex w-full items-center justify-between border-t bg-gray-50 px-4 py-3 hover:bg-gray-100'
          )}
          onClick={() => alert(`Clicked on ${title}`)}
        >
          <span className="text-sm font-medium">{cta}</span>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const StartPlanning = () => {
  const [cards, setCards] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts/');
        const data = await response.json();
        setCards(data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
      }
    };

    fetchPosts();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="bg-transparent px-6 py-12 md:px-28">
      <h2 className="mb-8 text-center text-3xl font-bold text-secondary-foreground">
        Start planning your next trip
      </h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {cards.map((card, index) => (
              <StartPlanningCard key={index} {...card} />
            ))}
          </div>
        </div>
        {/* <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-x-16 -translate-y-1/2 transform rounded-full"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 transform rounded-full"
          onClick={scrollNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button> */}
      </div>
    </div>
  );
};

export default StartPlanning;
