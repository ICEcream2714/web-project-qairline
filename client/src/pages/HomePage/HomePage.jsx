import Booking from '@/pages/HomePage/Booking';
import PlanningCard from '@/pages/HomePage/PlanningCard';
import SuggestionHome from '@/pages/HomePage/SuggestionHome';
import Fares from '@/pages/HomePage/Fares';
import SubscribeForm from '@/pages/HomePage/SubcribeForm';
import Footer from '@/layouts/Footer';
import FlightTabs from '@/pages/HomePage/BookingTab';
import Navbar from '@/layouts/Navbar/Navbar';
import { FlightDeals } from './FilghtDeals';

function HomePage() {
  return (
    <div className="-mt-11">
      <Navbar />
      <div className="relative">
        {/* Booking Section */}
        <Booking />

        {/* FlightTab Section */}
        <div className="relative z-20 -mt-24">
          <FlightTabs />
        </div>
      </div>

      <PlanningCard />
      {/* <Fares /> */}
      <SuggestionHome />
      <FlightDeals />
      <SubscribeForm />
      <Footer />
    </div>
  );
}

export default HomePage;
