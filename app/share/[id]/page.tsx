import { notFound } from "next/navigation";
import { getMomentById } from "@/lib/actions";
import SharePageClient from "./SharePageClient";

export const dynamic = "force-dynamic";

interface SharePageProps {
  params: { id: string };
}

export default async function SharePage({ params }: SharePageProps) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    notFound();
  }

  const moment = await getMomentById(id);
  if (!moment) {
    notFound();
  }

  return <SharePageClient moment={moment} />;
}
