import { useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;

      // If the current scroll position is greater than the last scroll position, hide the Navbar
      if (currentScrollY >= lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="-mt-11">
      {/* Conditionally render Navbar based on scroll direction */}
      {isVisible && <Navbar />}

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
