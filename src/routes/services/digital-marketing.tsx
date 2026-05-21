import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function DigitalMarketingPage() {
  return <ServiceDetail serviceId="digital-marketing" />;
}

export const Route = createFileRoute("/services/digital-marketing")({
  component: DigitalMarketingPage,
  head: () => ({
    meta: [
      { title: "Best Digital Marketing Agency in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Grow your business with the top digital marketing agency in Coimbatore and Namakkal. We specialize in SEO, SMM, PPC, and content marketing.",
      },
      {
        name: "keywords",
        content:
          "Digital marketing agency Coimbatore, SEO services Namakkal, Social media marketing Coimbatore, Best digital marketing Namakkal",
      },
    ],
  }),
});
