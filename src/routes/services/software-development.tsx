import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function SoftwareDevelopmentPage() {
  return <ServiceDetail serviceId="software-development" />;
}

export const Route = createFileRoute("/services/software-development")({
  component: SoftwareDevelopmentPage,
  head: () => ({
    meta: [
      { title: "Custom Software Development Company in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Leading software development company in Coimbatore and Namakkal. We build scalable SaaS, ERP, and custom software solutions tailored to your business needs.",
      },
      {
        name: "keywords",
        content:
          "Software development Coimbatore, Custom software Namakkal, SaaS development Coimbatore, ERP solutions Namakkal",
      },
    ],
  }),
});
