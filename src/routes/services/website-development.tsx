import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function WebsiteDevelopmentPage() {
  return <ServiceDetail serviceId="website-development" />;
}

export const Route = createFileRoute("/services/website-development")({
  component: WebsiteDevelopmentPage,
  head: () => ({
    meta: [
      { title: "Best Website Development Company in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Looking for top-notch website development in Coimbatore and Namakkal? We build fast, responsive, and SEO-optimized websites for your business.",
      },
      {
        name: "keywords",
        content:
          "Website development Coimbatore, Web design Namakkal, Web developers Coimbatore, E-commerce websites Namakkal",
      },
    ],
  }),
});
