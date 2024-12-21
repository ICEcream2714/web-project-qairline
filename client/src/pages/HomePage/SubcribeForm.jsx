import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const SubscriptionForm = () => {
  return (
    <div
      className="relative mx-auto flex max-w-6xl flex-col justify-center overflow-hidden rounded-lg bg-cover bg-center text-white lg:min-h-0"
      style={{
        backgroundImage: `url('https://media-api.advertisingvietnam.com/oapi/v1/media?uuid=0fed776e-a3a0-47c3-a26f-962b96a06a6c&resolution=1440x756&type=image')`,
      }}
    >
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative flex h-[55vh] flex-col items-center justify-between gap-8 overflow-y-auto p-8 md:h-auto lg:flex-row lg:items-start lg:p-16">
        {/* Form section */}
        <div className="w-full text-white lg:w-1/2">
          <h2 className="mb-4 text-center text-3xl font-bold lg:text-left lg:text-4xl">
            Never miss an offer
          </h2>
          <p className="mb-6 text-center text-lg lg:text-left">
            Subscribe and be the first to receive our exclusive offers.
          </p>
          <form className="space-y-4">
            {/* Inputs */}
            <div className="flex flex-col gap-4 md:flex-row">
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
                className="text-sm leading-relaxed text-gray-300"
              >
                I would like to get offers and news from QAirline. I have read
                and understood the{' '}
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
              className="w-full rounded-md bg-secondary py-3 text-lg text-white hover:bg-secondary-foreground"
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
