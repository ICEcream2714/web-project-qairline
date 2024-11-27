import Booking from "@/pages/HomePage/Booking";
import FlightTab from "@/pages/HomePage/FlightTab";
import PlanningCard from "@/pages/HomePage/PlanningCard";
import SuggestionHome from "@/pages/HomePage/SuggestionHome"
import Fares from "@/pages/HomePage/Fares"
import SubscribeForm from "@/pages/HomePage/SubcribeForm";
import Footer from "@/layouts/Footer";

function HomePage() {
  return (
    <div>
       <div className="relative">
        {/* Booking Section */}
        <Booking />

        {/* FlightTab Section */}
          <div className="relative z-20 -mt-24">
            <FlightTab />
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