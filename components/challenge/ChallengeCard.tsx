"use client";

import { motion } from "framer-motion";
import { RefreshCw, Check, Sparkles } from "lucide-react";
import { Category, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Challenge {
  id: number;
  content: string;
  category: Category;
}

interface ChallengeCardProps {
  challenge: Challenge | null;
  onRefresh: () => void;
  onAccept: () => void;
  isSubmitting?: boolean;
}

export default function ChallengeCard({
  challenge,
  onRefresh,
  onAccept,
  isSubmitting = false,
}: ChallengeCardProps) {
  if (!challenge) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative bg-white rounded-2xl shadow-lg border-2 border-yes-yellow overflow-hidden"
    >
      {/* Ticket tear edge effect */}
      <div className="absolute top-0 left-0 right-0 h-3 flex justify-between">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-yes-gray -mt-2"
          />
        ))}
      </div>

      <div className="pt-6 pb-8 px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yes-orange" />
            <span className="text-sm font-medium text-gray-600">今日推荐挑战</span>
          </div>
          <span className={cn("px-3 py-1 rounded-full text-xs font-medium", CATEGORY_COLORS[challenge.category])}>
            {CATEGORY_LABELS[challenge.category]}
          </span>
        </div>

        {/* Content */}
        <motion.p
          key={challenge.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-yes-black text-center mb-8 leading-relaxed"
        >
          {challenge.content}
        </motion.p>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={onRefresh}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">换一条</span>
          </button>
          <button
            onClick={onAccept}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yes-black text-white hover:bg-yes-black/90 transition-all disabled:opacity-50 shadow-lg shadow-yes-black/20"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isSubmitting ? "保存中..." : "接受挑战"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom tear edge */}
      <div className="absolute bottom-0 left-0 right-0 h-3 flex justify-between">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-yes-gray -mb-2"
          />
        ))}
      </div>
    </motion.div>
  );
}
