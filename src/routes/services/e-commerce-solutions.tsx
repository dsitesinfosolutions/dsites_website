import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function EcommerceSolutionsPage() {
  return <ServiceDetail serviceId="e-commerce-solutions" />;
}

export const Route = createFileRoute("/services/e-commerce-solutions")({
  component: EcommerceSolutionsPage,
  head: () => ({
    meta: [
      { title: "E-Commerce Development in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Start selling online with powerful E-Commerce solutions. We are the top E-Commerce website developers in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "E-commerce development Coimbatore, Online store setup Namakkal, Shopify developers Coimbatore, E-commerce solutions Namakkal",
      },
    ],
  }),
});
