import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const SubscriptionForm = () => {
  return (
    <div
      className="relative bg-cover bg-center text-white rounded-lg max-w-6xl mx-auto overflow-hidden min-h-screen lg:min-h-0 flex flex-col justify-center"
      style={{
        backgroundImage: `url('https://www.qatarairways.com/content/dam/images/custom/enl-subscribe-component/NL_Background_Mobile.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Content */}
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 p-8 lg:p-16 overflow-y-auto">
        {/* Form section */}
        <div className="w-full lg:w-1/2 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-center lg:text-left">
            Never miss an offer
          </h2>
          <p className="text-lg mb-6 text-center lg:text-left">
            Subscribe and be the first to receive our exclusive offers.
          </p>
          <form className="space-y-4">
            {/* Inputs */}
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-white text-black focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
              <Input
                type="text"
                placeholder="Preferred city of departure"
                className="flex-1 bg-white text-black focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox id="agreement" required />
              <Label
                htmlFor="agreement"
                className="text-sm text-gray-300 leading-relaxed"
              >
                I would like to get offers and news from Qatar Airways. I have
                read and understood the{" "}
                <a
                  href="#"
                  className="text-blue-500 hover:underline focus:outline-none"
                >
                  privacy notice
                </a>
                .
              </Label>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full py-3 text-lg bg-white text-black rounded-md hover:bg-gray-200"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
