import type { Metadata } from "next";
import { AppsPageClient } from "@/components/AppsPageClient";

export const metadata: Metadata = {
  title: "Apps | yurirxmos portfolio.",
  description:
    "Apps by Yuri Ramos: Feather, an AI writing assistant, and Metria, AI usage at a glance.",
};

export default function AppsPage() {
  return <AppsPageClient />;
}
