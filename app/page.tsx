import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import WhyJoin from "@/components/sections/WhyJoin";
import LatestNews from "@/components/sections/LatestNews";
import Brands from "@/components/sections/Brands";
import CommissionRates from "@/components/sections/CommissionRates";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <WhyJoin />
        <LatestNews />
        <Brands />
        <CommissionRates />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
