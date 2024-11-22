import Booking from "@/layouts/Booking";
import FlightTab from "@/layouts/FlightTab";
import PlanningCard from "@/layouts/PlanningCard";
import SuggestionHome from "@/layouts/SuggestionHome"
import Fares from "@/layouts/Fares"
import SubscribeForm from "@/layouts/SubcribeForm";
import Footer from "@/layouts/Footer";

function HomePage() {
  return (
    <div>
      <Booking/>
      <FlightTab/>
      <PlanningCard/>
      <Fares/>
      <SuggestionHome/>
      <SubscribeForm/>
      <Footer/>
    </div>
  );
}

export default HomePage;
