const StartPlanningCard = ({ image, title, cta }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Hình ảnh */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />
      {/* Nội dung */}
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      {/* Dòng CTA */}
      <button
        className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
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
