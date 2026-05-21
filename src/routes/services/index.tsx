import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/landing/Navbar";
import Services from "@/components/landing/Services";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ScrollProgress from "@/components/landing/ScrollProgress";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Our Services | Web, App & Software Development in Coimbatore & Namakkal" },
      {
        name: "description",
        content:
          "Explore our premium IT services including Web Development, App Development, SEO, and Digital Marketing in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "IT services Coimbatore, Web design Namakkal, App developers Coimbatore, SEO services Namakkal, Software solutions",
      },
    ],
  }),
});

function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground pt-20">
      <ScrollProgress />
      <Navbar />
      <Services />
      <CTA />
      <Footer />
    </main>
  );
}
