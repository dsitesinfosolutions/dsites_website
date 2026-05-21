import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function MobileAppDevelopmentPage() {
  return <ServiceDetail serviceId="mobile-app-development" />;
}

export const Route = createFileRoute("/services/mobile-app-development")({
  component: MobileAppDevelopmentPage,
  head: () => ({
    meta: [
      { title: "Mobile App Development Company in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Looking to build an iOS or Android app? We are the leading mobile app development company in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "Mobile app development Coimbatore, Android app developers Namakkal, iOS app development Coimbatore, App developers Namakkal",
      },
    ],
  }),
});
