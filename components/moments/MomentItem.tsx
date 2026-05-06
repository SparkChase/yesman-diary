import { formatDate } from "@/lib/utils";
import { CATEGORY_LABELS, CATEGORY_COLORS, Moment } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Calendar, Share2, Sparkles } from "lucide-react";
import Link from "next/link";

interface MomentItemProps {
  moment: Moment;
}

export default function MomentItem({ moment }: MomentItemProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-yes-cream/50 hover:shadow-md hover:border-yes-cream transition-all relative overflow-hidden">
      {/* Cute decoration */}
      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yes-pink/20" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-yes-black font-medium leading-relaxed mb-3">
            {moment.content}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("px-3 py-1 rounded-full text-xs font-bold", CATEGORY_COLORS[moment.category])}>
              {CATEGORY_LABELS[moment.category]}
            </span>
            {moment.source === "recommended" && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                系统推荐
              </span>
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
            className="p-1.5 rounded-xl hover:bg-yes-pink/10 text-gray-400 hover:text-yes-pink transition-colors"
            aria-label="分享"
          >
            <Share2 className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
