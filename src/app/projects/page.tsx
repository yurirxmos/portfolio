import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Projects | yurirxmos portfolio.",
  description:
    "Selected software engineering projects from Yuri Ramos, fetched directly from GitHub.",
};

export default async function ProjectsPage() {
  redirect("/#projects");
}
