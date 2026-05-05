"use client";

import { forwardRef } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS, Moment } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";

interface PosterSquareProps {
  moment: Moment;
}

const PosterSquare = forwardRef<HTMLDivElement, PosterSquareProps>(
  ({ moment }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[600px] h-[600px] bg-white relative overflow-hidden select-none flex flex-col"
      >
        {/* Top accent bar */}
        <div className="h-3 bg-yes-yellow" />

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
          <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-6">
            Yes Man Diary
          </p>

          <p className="text-4xl font-black text-yes-black leading-tight mb-8">
            {moment.content}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{formatDate(moment.completed_at)}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className={cn("px-3 py-1 rounded-full text-xs font-medium", CATEGORY_COLORS[moment.category])}>
              {CATEGORY_LABELS[moment.category]}
            </span>
          </div>
        </div>

        {/* Bottom brand bar */}
        <div className="bg-yes-black py-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yes-yellow rounded-full" />
            <span className="text-white font-bold text-sm">Yes Man Diary</span>
          </div>
          <span className="text-white/50 text-xs">今天你说 Yes 了吗？</span>
        </div>
      </div>
    );
  }
);

PosterSquare.displayName = "PosterSquare";
export default PosterSquare;
