import { formatDate } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_COLORS, Moment } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Calendar, Share2 } from "lucide-react";
import Link from "next/link";

interface MomentItemProps {
  moment: Moment;
}

export default function MomentItem({ moment }: MomentItemProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-yes-black font-medium leading-relaxed mb-2">
            {moment.content}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", CATEGORY_COLORS[moment.category])}>
              {CATEGORY_LABELS[moment.category]}
            </span>
            {moment.source === "recommended" && (
              <span className="text-xs text-gray-400">系统推荐</span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(moment.completed_at)}
          </span>
          <Link
            href={`/share/${moment.id}`}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-yes-orange transition-colors"
            aria-label="分享"
          >
            <Share2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
