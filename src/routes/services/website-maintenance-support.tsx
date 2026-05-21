import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function WebsiteMaintenanceSupportPage() {
  return <ServiceDetail serviceId="website-maintenance-support" />;
}

export const Route = createFileRoute("/services/website-maintenance-support")({
  component: WebsiteMaintenanceSupportPage,
  head: () => ({
    meta: [
      { title: "Website Maintenance & Support in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Keep your website secure, fast, and up-to-date with our reliable website maintenance and support services in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "Website maintenance Coimbatore, Website support Namakkal, Web hosting support Coimbatore, WordPress maintenance Namakkal",
      },
    ],
  }),
});
