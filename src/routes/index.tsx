import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Services from "@/components/landing/Services";
import WhyUs from "@/components/landing/WhyUs";
import TechStack from "@/components/landing/TechStack";
import Testimonials from "@/components/landing/Testimonials";
import Process from "@/components/landing/Process";
import Footer from "@/components/landing/Footer";
import ScrollProgress from "@/components/landing/ScrollProgress";
import AdsCarousel from "@/components/landing/AdsCarousel";
import SplashScreen from "@/components/landing/SplashScreen";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title: "D Sites Infosolutions | Top IT & Web Development Company in Coimbatore & Namakkal",
      },
      {
        name: "description",
        content:
          "D Sites Infosolutions builds premium websites, scalable software, mobile apps, and digital marketing strategies. Ranked as the best IT company in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "Web development Coimbatore, Software company Namakkal, Digital marketing Coimbatore, Best IT company Namakkal, App development Coimbatore",
      },
      { property: "og:title", content: "D Sites Infosolutions | Smart Digital Solutions" },
      {
        property: "og:description",
        content:
          "Custom software, web, mobile, cloud, and digital marketing in Coimbatore and Namakkal — engineered to grow your business.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <SplashScreen />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <AdsCarousel />
      <Stats />
      <Services compact limit={4} />
      <WhyUs />
      <TechStack />
      <Testimonials />
      <Process />
      <Footer />
    </main>
  );
}
