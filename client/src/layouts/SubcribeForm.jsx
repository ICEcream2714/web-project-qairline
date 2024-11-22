
const SubscriptionForm = () => {
  return (
    <div
      className="bg-cover bg-center text-white py-15 px-10 rounded-lg max-w-5xl mx-auto"
      style={{
        backgroundImage: `url('https://www.qatarairways.com/content/dam/images/custom/enl-subscribe-component/NL_Background_Mobile.png')`,
      }}
    >
      <div className="bg-black/70 p-10 rounded-lg max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-bold">Never miss an offer</h2>
          <p className="text-lg text-gray-300">
            Subscribe and be the first to receive our exclusive offers.
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-6 py-4 bg-gray-800 text-white text-base rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Preferred city of departure"
              className="flex-1 px-6 py-4 bg-gray-800 text-white text-base rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="agreement"
              className="mt-1 bg-gray-800 border-gray-700 text-blue-500 focus:ring-blue-500 focus:ring-2 w-5 h-5 rounded"
              required
            />
            <label htmlFor="agreement" className="text-sm text-gray-300">
              I would like to get offers and news from Qatar Airways. I have
              read and understood the{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline focus:outline-none"
              >
                privacy notice
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
