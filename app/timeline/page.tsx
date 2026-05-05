import { getPublicMoments } from "@/lib/actions";
import MomentList from "@/components/moments/MomentList";
import { Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TimelinePage() {
  const moments = await getPublicMoments();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 py-4">
        <Clock className="w-6 h-6 text-yes-orange" />
        <h1 className="text-2xl font-bold text-yes-black">时间线</h1>
        <span className="text-sm text-gray-500">所有公开的 Yes 时刻</span>
      </div>

      <MomentList moments={moments} />
    </div>
  );
}
