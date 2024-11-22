
const destinations = [
  {
    id: 1,
    city: "Nairobi",
    dateRange: "16 Feb 2025 - 23 Feb 2025",
    price: "Economy from USD 1401*",
    image:
      "https://via.placeholder.com/400x250?text=Nairobi", // Replace with actual image URL
  },
  {
    id: 2,
    city: "Zagreb",
    dateRange: "27 Nov 2024 - 02 Dec 2024",
    price: "Economy from USD 1172*",
    image:
      "https://via.placeholder.com/400x250?text=Zagreb", // Replace with actual image URL
  },
  {
    id: 3,
    city: "Brussels",
    dateRange: "25 Nov 2024 - 01 Dec 2024",
    price: "Economy from USD 887*",
    image:
      "https://via.placeholder.com/400x250?text=Brussels", // Replace with actual image URL
  },
];

const DestinationCard = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Title Section */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Find great fares
        </h1>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group"
          >
            {/* Background Image */}
            <img
              src={destination.image}
              alt={destination.city}
              className="w-full h-40 md:h-48 object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div
                className="absolute bottom-4 left-4 text-white transition-all duration-300 group-hover:bottom-16"
              >
                <h2 className="text-lg font-semibold">{destination.city}</h2>
                <p className="text-sm">{destination.dateRange}</p>
                <p className="text-sm font-semibold">{destination.price}</p>
              </div>

              {/* Buttons (Visible on hover) */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="px-4 py-2 bg-white text-black font-medium rounded-md shadow hover:bg-gray-200">
                  Book Now
                </button>
                <button className="px-4 py-2 bg-white text-black font-medium rounded-md shadow hover:bg-gray-200">
                  Discover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationCard;
