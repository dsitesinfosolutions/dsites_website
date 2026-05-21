import { createFileRoute } from "@tanstack/react-router";
import ServiceDetail from "./ServiceDetail";

function UiUxDesignPage() {
  return <ServiceDetail serviceId="ui-ux-design" />;
}

export const Route = createFileRoute("/services/ui-ux-design")({
  component: UiUxDesignPage,
  head: () => ({
    meta: [
      { title: "Top UI/UX Design Agency in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Deliver exceptional user experiences with our expert UI/UX design services in Coimbatore and Namakkal. We design intuitive and engaging interfaces.",
      },
      {
        name: "keywords",
        content:
          "UI/UX design Coimbatore, Web design agency Namakkal, User experience design Coimbatore, UI designers Namakkal",
      },
    ],
  }),
});
