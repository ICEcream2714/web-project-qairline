import Booking from "@/pages/HomePage/Booking";
import PlanningCard from "@/pages/HomePage/PlanningCard";
import SuggestionHome from "@/pages/HomePage/SuggestionHome"
import Fares from "@/pages/HomePage/Fares"
import SubscribeForm from "@/pages/HomePage/SubcribeForm";
import Footer from "@/layouts/Footer";
import FlightTabs from "@/pages/HomePage/BookingTab";

function HomePage() {
  return (
    <div className="-pt-20">
       <div className="relative">
        {/* Booking Section */}
        <Booking />

        {/* FlightTab Section */}
          <div className="relative z-20 -mt-24">
            <FlightTabs />
          </div>
    </div>

      <PlanningCard/>
      <Fares/>
      <SuggestionHome/>
      <SubscribeForm/>
      <Footer/>
    </div>
  );
}

export default HomePage;