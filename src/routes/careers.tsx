import { createFileRoute } from "@tanstack/react-router";
import CareersPage from "@/components/landing/Careers";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers & Internships in Coimbatore & Namakkal | D Sites Infosolutions" },
      {
        name: "description",
        content:
          "Join the team at D Sites Infosolutions. Explore job postings, developer internships, and career programs in Coimbatore and Namakkal.",
      },
      {
        name: "keywords",
        content:
          "IT careers Coimbatore, software developer jobs Namakkal, web development internships Coimbatore, tech jobs Coimbatore, D Sites careers",
      },
    ],
  }),
});
