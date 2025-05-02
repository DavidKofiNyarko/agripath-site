import Navbar from "./components/Navbar";
import AboutSection from "./sections/AboutSection";
import CallToActionSection from "./sections/CallToActionSection";
import ContactSection from "./sections/ContactSection";
import HowItWorksAndFAQ from "./sections/FAQSection";
import AgripathFooter from "./sections/footer";
import HeroSection from "./sections/HeroSection";
import AvailableInvestments from "./sections/InvestmentsSection";
import InvestmentOpportunitiesSection from "./sections/InvestmentOpportunitiesSection";
import { DefaultSeo } from "next-seo";
import SEO from '../../next-seo.config'
const AgriPathLandingPage = () => {
  return (
    <div className="min-h-screen font-sans">
      {/* Navbar Component */}
      {/* <Navbar /> */}

      {/* Hero Section Component */}
      <DefaultSeo SEO />
      <HeroSection />
      <AboutSection />
      <InvestmentOpportunitiesSection />
      {/* <CallToActionSection /> */}
      <AvailableInvestments />
      <HowItWork  ction />
      <AgripathFooter />
      {/* Additional content would be added here */}
    </div>
  );
};

export default AgriPathLandingPage;
