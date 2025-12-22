import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StorySection from "@/components/home/StorySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>קשישי - מחברים בין קשישים למשפחות לארוחות שישי</title>
        <meta 
          name="description" 
          content="עמותת קשישי מפיגה בדידות של קשישים באמצעות חיבור למשפחות מהשכונה לארוחות שישי ביתיות. הצטרפו כמשפחה מארחת או כקשיש/ה וצרו קשר משמעותי." 
        />
        <meta name="keywords" content="קשישים, בדידות, ארוחת שישי, משפחות מארחות, עמותה, קהילה, חיבור בין-דורי" />
        <meta property="og:title" content="קשישי - פותחים את הבית והלב" />
        <meta property="og:description" content="מחברים בין קשישים למשפחות לארוחות שישי ביתיות" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://keshishi.org.il" />
      </Helmet>

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
    </>
  );
};

export default Index;
