import Navbar from "./components/Navbar";
import AboutSection from "./sections/AboutSection";
import CallToActionSection from "./sections/CallToActionSection";
import ContactSection from "./sections/ContactSection";
import HowItWorksAndFAQ from "./sections/FAQSection";
import AgripathFooter from "./sections/footer";
import HeroSection from "./sections/HeroSection";
import AvailableInvestments from "./sections/InvestmentsSection";
import InvestmentOpportunitiesSection from "./sections/InvestmentOpportunitiesSection";

const AgriPathLandingPage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Navbar Component */}
      {/* <Navbar /> */}

      {/* Hero Section Component */}
      <HeroSection />
      <AboutSection />
      <InvestmentOpportunitiesSection />
      {/* <CallToActionSection /> */}
      <AvailableInvestments />
      <HowItWorksAndFAQ />
      <ContactSection />
      <AgripathFooter />
      {/* Additional content would be added here */}
    </div>
  );
};

export default AgriPathLandingPage;
