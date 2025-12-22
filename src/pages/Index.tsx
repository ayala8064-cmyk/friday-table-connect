import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StorySection from "@/components/home/StorySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  useEffect(() => {
    document.title = "קשישי - מחברים בין קשישים למשפחות לארוחות שישי";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'עמותת קשישי מפיגה בדידות של קשישים באמצעות חיבור למשפחות מהשכונה לארוחות שישי ביתיות. הצטרפו כמשפחה מארחת או כקשיש/ה וצרו קשר משמעותי.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StorySection />
        <HowItWorksSection />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
