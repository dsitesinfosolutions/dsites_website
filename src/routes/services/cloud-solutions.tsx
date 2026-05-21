import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function CloudSolutionsPage() {
  return <ServiceDetail serviceId="cloud-solutions" />;
}

export const Route = createFileRoute("/services/cloud-solutions")({
  component: CloudSolutionsPage,
  head: () => ({
    meta: [
      { title: "Cloud Solutions & Services in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Scale your business with secure and reliable cloud solutions in Coimbatore and Namakkal. We offer AWS, Azure, and Google Cloud services.",
      },
      {
        name: "keywords",
        content:
          "Cloud solutions Coimbatore, AWS consulting Namakkal, Cloud migration Coimbatore, Cloud hosting Namakkal",
      },
    ],
  }),
});
