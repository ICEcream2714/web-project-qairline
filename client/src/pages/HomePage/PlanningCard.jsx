import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StartPlanningCard = ({ image, title, cta }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Hình ảnh */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>
      {/* Nội dung */}
      <CardContent className="p-4 flex-1 flex flex-col">
        <CardHeader className="p-0 flex-1">
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
            "flex w-full items-center justify-between border-t px-4 py-3 bg-gray-50 hover:bg-gray-100"
          )}
          onClick={() => alert(`Clicked on ${title}`)}
        >
          <span className="text-blue-600 text-sm font-medium">{cta}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5 text-blue-600"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

const StartPlanning = () => {
  const cards = [
    {
      image: "https://www.qatarairways.com/content/dam/images/enl/assets/campaigns/global/destination-push/e-ss-collage-cpt-mle-cmb.jpg",
      title: "Explore our offers",
      cta: "Find great fares",
    },
    {
      image: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/campaigns/global/destinations-promo/h3-doha.jpg",
      title: "Stopover in Qatar",
      cta: "Discover more",
    },
    {
      image: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-2/privilege-club/partner-images/h2-cardless-Aug-2024-tactical2.jpg",
      title: "Get your Privilege Club Credit Card",
      cta: "Learn more",
    },
    {
      image: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-2/miscellaneous/sponsorships/h2-fifa-intercontinental-cup-2024.jpg",
      title: "FIFA Intercontinental Cup 2024™ packages",
      cta: "Book now",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Start planning your next trip
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <StartPlanningCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default StartPlanning;
