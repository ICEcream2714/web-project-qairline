import { useState } from 'react';

const tabs = [
  {
    id: 'privilege',
    title: 'Privilege Club',
    description:
      'Earn Avios and enjoy exclusive benefits such as free flights, upgrades, priority check-in, and more. Elevate your travel experience with QAirline.',
    buttonText: 'Join now',
    image:
      'https://c.ekstatic.net/ecl/photo-gallery/a380/economy-class/dining/emirates-a380-economy-class-dining-inflight-meal-720x480.jpg?h=SH-0t5qnKXrW539DzbBbqge',
  },
  {
    id: 'mobile',
    title: 'Mobile App',
    description:
      'Book flights, manage bookings, and access your e-boarding pass all in one place. Download the QAirline app for ultimate convenience.',
    buttonText: 'Download now',
    image:
      'https://vnn-imgs-f.vgcloud.vn/2019/06/19/14/ly-ky-vu-mat-tich-may-bay-mh370.jpg',
  },
  {
    id: 'stopover',
    title: 'QAirline Stopover',
    description:
      'Experience the best of our hub city with our stopover packages starting at $14. Discover the culture, cuisine, and attractions like never before.',
    buttonText: 'Explore more',
    image:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2023/07/hinh-nen-ai-1.jpg',
  },
  {
    id: 'student',
    title: 'Student Club',
    description:
      'Enjoy special discounts and benefits as a student. Travel smarter with exclusive offers designed just for you.',
    buttonText: 'Join now',
    image:
      'https://cdn.baohatinh.vn/images/77aa7d2e98b7f36166ba739628db583d914ebed3e3a748f37b351256ef230d3b0c4bae7e2d2e7774ea2fb1eedeed2720/105d3145200t51452205l4.jpg',
  },
];

const DynamicBanner = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div
      className="relative my-8 min-h-[225px] overflow-hidden bg-cover bg-center text-white shadow-lg md:min-h-[300px] lg:min-h-[375px]"
      style={{
        backgroundImage: `url(${activeTab.image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-6">
        {/* Tabs */}
        <div className="mb-6 flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`border-b-2 pb-1 text-sm font-medium md:text-base ${
                activeTab.id === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-300 hover:border-gray-400'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Information Section */}
        <div className="max-w-md rounded-lg bg-black bg-opacity-50 p-6">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">
            {activeTab.title}
          </h2>
          <p className="mb-6 text-sm leading-relaxed md:text-base">
            {activeTab.description}
          </p>
          <button className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white hover:bg-secondary-foreground">
            {activeTab.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicBanner;
