import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const StartPlanningCard = ({ image, title, cta }) => {
  return (
    <Card className="flex flex-col transition-shadow duration-300 hover:shadow-lg">
      {/* Hình ảnh */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="h-40 w-full rounded-t-lg object-cover"
        />
      </div>
      {/* Nội dung */}
      <CardContent className="flex flex-1 flex-col p-4">
        <CardHeader className="flex-1 p-0">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>
      </CardContent>
      {/* CTA */}
      <CardFooter className="p-0">
        <Button
          variant="ghost"
          className={cn(
            'flex w-full items-center justify-between border-t bg-gray-50 px-4 py-3 hover:bg-gray-100'
          )}
          onClick={() => alert(`Clicked on ${title}`)}
        >
          <span className="text-sm font-medium text-blue-600">{cta}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

const StartPlanning = () => {
  const [cards, setCards] = useState([]);

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

  return (
    <div className="bg-gray-50 px-6 py-12 md:px-16">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Start planning your next trip
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {cards.map((card, index) => (
          <StartPlanningCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default StartPlanning;
