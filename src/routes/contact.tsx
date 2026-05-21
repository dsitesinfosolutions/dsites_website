import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/components/landing/Contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact D Sites Infosolutions | IT Company in Coimbatore & Namakkal" },
      {
        name: "description",
        content:
          "Get in touch with D Sites Infosolutions. We are the leading IT, web, and software development company serving clients in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "Contact IT company Coimbatore, Web developers near me Namakkal, Software development consultation Coimbatore",
      },
    ],
  }),
});
