import { createFileRoute } from "@tanstack/react-router";
import UpdatesPage from "@/components/landing/Updates";

export const Route = createFileRoute("/updates")({
  component: UpdatesPage,
  head: () => ({
    meta: [
      { title: "Updates, Offers & Tech Events in Coimbatore & Namakkal | D Sites" },
      {
        name: "description",
        content:
          "Stay up to date with the latest IT offers, company news, and developer internship opportunities in Coimbatore and Namakkal at D Sites Infosolutions.",
      },
      {
        name: "keywords",
        content:
          "IT internships Coimbatore, Web development offers Namakkal, Tech events Coimbatore, D Sites news",
      },
    ],
  }),
});
