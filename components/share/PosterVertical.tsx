"use client";

import { forwardRef } from "react";
import { CATEGORY_LABELS, CATEGORY_COLORS, Moment } from "@/lib/constants";
import { cn, formatDate } from "@/lib/utils";

interface PosterVerticalProps {
  moment: Moment;
}

const PosterVertical = forwardRef<HTMLDivElement, PosterVerticalProps>(
  ({ moment }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[375px] bg-yes-yellow relative overflow-hidden select-none"
        style={{ minHeight: "667px" }}
      >
        {/* Top zigzag edge */}
        <div className="absolute top-0 left-0 right-0 h-4 flex justify-between">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-white -mt-3" />
          ))}
        </div>

        <div className="pt-10 pb-8 px-8 flex flex-col h-full" style={{ minHeight: "667px" }}>
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-widest text-yes-black/60 uppercase mb-1">
              Yes Man Diary
            </p>
            <h2 className="text-2xl font-black text-yes-black leading-tight">
              今日<br />挑战票根
            </h2>
          </div>

          {/* Clapperboard style content */}
          <div className="bg-yes-black rounded-xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-yes-yellow rotate-45" />
              <span className="text-xs text-white/60 font-mono">SCENE: {moment.id}</span>
            </div>
            <p className="text-white text-lg font-bold leading-relaxed mb-4">
              {moment.content}
            </p>
            <div className="flex items-center justify-between text-xs text-white/50 font-mono">
              <span>{formatDate(moment.completed_at)}</span>
              <span className={cn("px-2 py-0.5 rounded", CATEGORY_COLORS[moment.category])}>
                {CATEGORY_LABELS[moment.category]}
              </span>
            </div>
          </div>

          {/* Tear line */}
          <div className="flex items-center gap-2 mb-8">
            <div className="flex-1 border-t-2 border-dashed border-yes-black/20" />
            <span className="text-xs text-yes-black/40">撕下此票</span>
            <div className="flex-1 border-t-2 border-dashed border-yes-black/20" />
          </div>

          {/* Bottom info */}
          <div className="mt-auto text-center">
            <p className="text-3xl font-black text-yes-black mb-2">YES!</p>
            <p className="text-sm text-yes-black/70 mb-6">
              你今天说 Yes 了吗？
            </p>
            <div className="inline-block bg-white p-3 rounded-lg">
              {/* QR Code placeholder - simple styled square */}
              <div className="w-24 h-24 bg-yes-black rounded flex items-center justify-center">
                <span className="text-white text-xs">QR</span>
              </div>
            </div>
            <p className="text-xs text-yes-black/50 mt-3">
              扫码查看这条 Yes 时刻
            </p>
          </div>
        </div>

        {/* Bottom zigzag edge */}
        <div className="absolute bottom-0 left-0 right-0 h-4 flex justify-between">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-white -mb-3" />
          ))}
        </div>
      </div>
    );
  }
);

PosterVertical.displayName = "PosterVertical";
export default PosterVertical;
