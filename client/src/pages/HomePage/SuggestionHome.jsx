import { useState } from "react";

const tabs = [
  {
    id: "privilege",
    title: "Privilege Club",
    description:
      "Earn Avios and use them towards shopping at Qatar Duty Free, flights, upgrades, extra baggage, and more exclusive benefits.",
    buttonText: "Join now",
    image:
      "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/privilege-club/cards-circle/h1-ffp-cards-qsuite-crew.jpg", // Replace with actual link
  },
  {
    id: "mobile",
    title: "Mobile App",
    description:
      "Access exclusive features with our mobile app. Book flights, check-in, and manage your booking seamlessly.",
    buttonText: "Download now",
    image:
      "https://www.qatarairways.com/content/dam/images/renditions/horizontal-1/campaigns/global/mobile/H1-Mobile-App-QRcode-en2.jpg", // Replace with actual link
  },
  {
    id: "stopover",
    title: "Qatar Stopover",
    description:
      "Experience the best of Qatar with our stopover packages starting at $14. Discover the country like never before.",
    buttonText: "Explore more",
    image:
      "https://www.qatarairways.com/content/dam/images/mobile/campaign/gobal/feel-more-in-qatar/h1-visit-qatar-mia-family-dhow-qta-hn.jpg", // Replace with actual link
  },
  {
    id: "student",
    title: "Student Club",
    description:
      "Enjoy special discounts and benefits as a student. Travel smarter with exclusive offers designed just for you.",
    buttonText: "Join now",
    image:
      "https://www.qatarairways.com/content/dam/images/mobile/campaign/gobal/feel-more-in-qatar/h1-visit-qatar-mia-family-dhow-qta-hn.jpg", // Replace with actual link
  },
];
const DynamicBanner = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div
    className="relative bg-cover bg-center min-h-[225px] md:min-h-[300px] lg:min-h-[375px] text-white my-8 rounded-lg shadow-lg overflow-hidden"
      style={{
        backgroundImage: `url(${activeTab.image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex space-x-6 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`text-sm md:text-base font-medium pb-1 border-b-2 ${
                activeTab.id === tab.id
                  ? "text-white border-white"
                  : "text-gray-300 border-transparent hover:border-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Information Section */}
        <div className="max-w-md bg-black bg-opacity-50 p-6 rounded-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {activeTab.title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed mb-6">
            {activeTab.description}
          </p>
          <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200">
            {activeTab.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicBanner;
