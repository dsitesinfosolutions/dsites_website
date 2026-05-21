import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function BrandingPage() {
  return <ServiceDetail serviceId="branding" />;
}

export const Route = createFileRoute("/services/branding")({
  component: BrandingPage,
  head: () => ({
    meta: [
      { title: "Creative Branding Agency in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Build a memorable brand with our professional branding and identity design services in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "Branding agency Coimbatore, Logo design Namakkal, Brand identity Coimbatore, Creative agency Namakkal",
      },
    ],
  }),
});
